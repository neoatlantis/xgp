import _ from "lodash";
import * as openpgp from "openpgp";
import { v4 as uuidv4 } from 'uuid';

import SymmetricBox from "./SymmetricBox";

import save_private_key from "./save_private_key";








class Keyring {

    driver;
    #unlocked = false;

    crypto = null;

    constructor(localStorageAlike){
        this.driver = localStorageAlike;

        this.save_private_key = save_private_key.bind(this);
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

    async reencrypt(newpassword){

    }

    async generate(opts){
        this.assure_unlocked();
        // generates a new pair of PGP key, adds them to keyring, and returns
        // the public key part.
        let { publicKey, privateKey } = await openpgp.generateKey(options);
        await this.save_private_key(privateKey);

        return publicKey;
    }

    async read(id){

    }

    async remove(id){

    }

    async list(){

    }


}

export default new Keyring(localStorage);
