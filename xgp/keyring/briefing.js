/*
 * Generates a brief information of given OpenPGP key, for listing in Keyring
 * Treeview.
 */
import _ from "lodash";
import * as openpgp from "openpgp";

export default async function(key){
    if(!key instanceof openpgp.PublicKey && !key instanceof openpgp.PrivateKey){
        throw Error("error.key.invalid");
    }
    let ret = {
        fingerprint: key.getFingerprint(),
        user: _.get(await key.getPrimaryUser(), "user.userID.userID"),
    }
    console.log(ret);
    return ret;
}
