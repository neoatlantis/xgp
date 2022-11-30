/*
 * Generates a pair of new keys based on given options, and save them to the
 * keyring.
 *
 * @opts: Object
 *  Options passed to OpenPGP.js for generating a new key pair.
 */
import * as openpgp from "openpgp";

export default async function generate(options){
    this.assure_unlocked();
    // generates a new pair of PGP key, adds them to keyring, and returns
    // the public key part.
    let { publicKey, privateKey, revocationCertificate } =
        await openpgp.generateKey(options);
    await this.save_private_key(privateKey);

    return { publicKey, revocationCertificate };
}
