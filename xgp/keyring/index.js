import _ from "lodash";
import * as openpgp from "openpgp";
import { v4 as uuidv4 } from 'uuid';
import { encode, decode } from "@msgpack/msgpack";
import { Buffer } from "buffer";

import SymmetricBox from "./SymmetricBox";

import save_private_key         from "./save_private_key";
import generate                 from "./generate";








class Keyring {

    driver;
    #unlocked = false;

    crypto = null;

    constructor(localStorageAlike){
        this.driver = localStorageAlike;

        this.save_private_key = save_private_key.bind(this);
        this.generate = generate.bind(this);
    }

    is_unlocked(){
        return !_.isNil(this.crypto);
    }

    assure_unlocked(){
        if(!this.is_unlocked()) throw Error("error.keyring.not-unlocked");
    }

    async need_creation(){
        let previous_header = await this.driver.getItem("HEADER");
        return _.isNil(previous_header);
    }

    async unlock(password){
        let previous_header = await this.driver.getItem("HEADER");
        this.crypto = new SymmetricBox(previous_header);
        await this.crypto.ready(password);

        if(_.isNil(previous_header)){
            this.driver.setItem("HEADER", this.crypto.toString());
        }
    }

    serialize(obj){
        console.log("serialize", obj);
        return Buffer.from(encode(obj)).toString("base64");
    }

    deserialize(b64){
        return decode(Buffer.from(b64, "base64"));
    }

    async reencrypt(newpassword){

    }

    async read(id){

    }

    async remove(id){

    }

    async list(){

    }


}

export default new Keyring(localStorage);
