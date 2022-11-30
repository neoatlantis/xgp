/*
 * Save a private key.
 *
 * @private_key: String|Object
 *   a private key (armored or as OpenPGP.js object)
 * @passphrase: String
 *   a passphrase for unlocking the private key.
 */
import * as openpgp from "openpgp";
import { v4 as uuidv4 } from 'uuid';

export default async function save_private_key(private_key, passphrase){
    this.assure_unlocked();
    // save a private key, if encrypted, decrypt it first
    if(_.isString(private_key)){
        try{
            private_key = await openpgp.readPrivateKey({
                armoredKey: private_key,
            });
        } catch(e){
            throw Error("error.privatekey.invalid");
        }
    } else if(_.isTypedArray(private_key)){
        try{
            private_key = await openpgp.readPrivateKey({
                binaryKey: private_key,
            });
        } catch(e){
            throw Error("error.privatekey.invalid");
        }
    }

    if(
        !private_key instanceof openpgp.PrivateKey ||
        !private_key.isPrivate()
    ){
        throw Error("error.privatekey.invalid");
    }

    // if private key not decrypted, decrypt it first
    let decrypted_private_key = null;
    if(private_key.isDecrypted()){
        decrypted_private_key = private_key;
    } else {
        try{
            decrypted_private_key = await openpgp.decryptKey({
                privateKey: private_key,
                passphrase,
            });
        } catch(e){
            throw Error("error.privatekey.invalid-passphrase");
        }
    }

    // now we have a decrypted private key
    let entry_id = uuidv4();
    let entry_value = this.serialize({
        // TODO save brief information about key
        private: await this.crypto.encrypt(decrypted_private_key.write()),
    })
    await this.driver.setItem(entry_id, entry_value);
    return entry_id;

}
