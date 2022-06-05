import * as openpgp from 'openpgp';
import { ok, err, fromPromise } from 'neverthrow';


async function generate_key(options){

    options.format = "armored";

    let result = fromPromise(
        openpgp.generateKey(options)
    );


    return result;
}


export { generate_key };
