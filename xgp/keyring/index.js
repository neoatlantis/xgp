import { secretbox, randomBytes } from "tweetnacl";
import { Buffer } from "buffer";
import { encode, decode } from "@msgpack/msgpack";
import _ from "lodash";
import * as openpgp from "openpgp";
import nacl from "tweetnacl";
import { v4 as uuidv4 } from 'uuid';



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





class Keyring {

    #driver;
    #unlocked = false;
    #masterlock = null;

    constructor(localStorageAlike){
        this.#driver = localStorageAlike;
    }

    is_unlocked(){
        return !_.isNil(this.#masterlock);
    }

    async need_creation(){
        let previous_header = await this.#driver.getItem("HEADER");
        return _.isNil(previous_header);
    }

    async unlock(password){
        let previous_header = await this.#driver.getItem("HEADER");
        this.#masterlock = new SymmetricBox(previous_header);
        await this.#masterlock.ready(password);

        if(_.isNil(previous_header)){
            this.#driver.setItem("HEADER", this.#masterlock.toString());
        }
    }

    async reencrypt(newpassword){

    }

    async generate(opts){
        // generates a new pair of PGP key, adds them to keyring, and returns
        // the public key part.
    }

    async save(id, key, opts){
        if(!this.is_unlocked) throw Error("Keyring locked.");
        if(_.isNil(id)){
            id = uuidv4();
        }
        await this.#driver.setItem(id, encode({
            opts,
            encrypted: this.#masterlock.encrypt(value),
        }));
        return id;
    }

    async read(id){

    }

    async remove(id){

    }

    async list(){

    }


}

export default new Keyring(localStorage);
