import * as openpgp from "openpgp";

export default async function({ recipients, passwords, signers, message }){

    let msg = await openpgp.createMessage({
        text: message,
    });

    let encrypted = await openpgp.encrypt({
        message: msg,
        encryptionKeys: [],
        passwords: passwords.map((e)=>e.value),
        signingKeys: [],
    });

    return encrypted;
}
