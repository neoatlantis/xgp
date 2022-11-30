import { Buffer } from "buffer";
import { encode, decode } from "@msgpack/msgpack";
import _ from "lodash";
import * as openpgp from "openpgp";
import nacl from "tweetnacl";



function nacl_encrypt(key, message){
    let nonce = nacl.randomBytes(nacl.secretbox.nonceLength);
    let encrypted = nacl.secretbox(message, nonce, key);
    return encode([nonce, encrypted]);
}

function nacl_decrypt(key, message){
    try{
        let [nonce, encrypted] = decode(message);
        return nacl.secretbox.open(encrypted, nonce, key);
    } catch(e){
        return null;
    }
}


class SymmetricBox {

    #header;
    #secret;

    constructor(previous_storage){
        if(_.isString(previous_storage)){
            this.#header = previous_storage;
        }
    }

    toString(){
        if(!_.isString(this.#header)){
            throw Error("SymmetricBox not ready.");
        }
        return this.#header;
    }

    async ready(password){
        // Generates or loads a SymmetricBox.
        if(this.#header){
            // decrypts the header
            let decrypted = await openpgp.decrypt({
                message: await openpgp.readMessage({
                    armoredMessage: this.#header,
                }),
                passwords: [password],
                format: "binary",
            });
            this.#secret = nacl.hash(decrypted.data);
        } else {
            let master_key_seed = nacl.randomBytes(32);
            this.#secret = nacl.hash(master_key_seed);
            this.#header = await openpgp.encrypt({
                message: await openpgp.createMessage({
                    binary: this.#secret,
                }),
                passwords: [password],
            });
            master_key_seed = null;
        }
        return this;
    }

    async destroy(){
        this.#secret = null;
        return this;
    }

    async encrypt(value){
        if(_.isNil(this.#secret)) throw Error("SymmetricBox not ready.");
        let plainbuffer = encode(value);
        return Buffer.from(nacl_encrypt(
            this.#secret.slice(0, nacl.secretbox.keyLength),
            plainbuffer
        )).toString("base64");
    }

    async decrypt(value){
        if(_.isNil(this.#secret)) throw Error("SymmetricBox not ready.");
        return nacl_decrypt(
            this.#secret.slice(0, nacl.secretbox.keyLength),
            Buffer.from(value, "base64")
        );
    }

}

export default SymmetricBox;
