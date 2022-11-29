<style module>
.table{
    display:table;
}
.tr{
    display:table-row;
}
.td{
    display:table-cell;
    margin-bottom: 5px;
}
.result_textarea{
    width: 100%; height: 100%; resize: none; font-family: monospace;
}
</style>
<template><div style="width:100%">

<strong>Generating a new keypair...</strong>
<p />
<div>
You can generate a new pair of public and private keys, and share the public key
with anyone you wish to establish contact.
</div>
<p />

<!-- Input form for new key -->
<form v-show="!generated" action="#" @submit.prevent="on_submit" :class="$style.table">
    <div class="field-row" :class="$style.tr">
        <label for="keygen-username" :class="$style.td">Username</label>
        <input v-model="username" :class="$style.td" id="keygen-username" type="text">
    </div>
    <div class="field-row" :class="$style.tr">
        <label for="keygen-email" :class="$style.td">Email</label>
        <input v-model="email" :class="$style.td" id="keygen-email" type="email">
    </div>
    <div class="field-row" :class="$style.tr">
        <label for="keygen-algorithm" :class="$style.td">Algorithm</label>
        <select v-model="algorithm" id="keygen-algorithm" :class="$style.td">
            <option value="ecc:curve25519">Curve25519</option>
            <option value="rsa:4096">RSA 4096-bits</option>
            <option value="rsa:2048">RSA 2048-bits</option>
        </select>
    </div>

    <div class="form-group">
        <div class="col-sm-12 form-check">
            <input type="checkbox" class="form-check-input" v-model="save_after_generation" id="inputSaveAfterGeneration" />
            <label for="inputSaveAfterGeneration" class="form-check-label">
                Save to keyring after generation</label>
        </div>
    </div>

    <div class="form-group row">
        <div class="col-sm-12">
            <button type="submit" class="btn btn-primary">Generate</button>
        </div>
    </div>
</form>


<!-- Result display -->
<div v-show="generated">

    Your new key pair was just generated.
    <p />

    <section class="tabs" style="width: 100%">
        <menu role="tablist" aria-label="Sample Tabs">
            <button role="tab" @click="result_tab=0" aria-controls="tab-keygen-private-key" :aria-selected="0==result_tab">Private Key</button>
            <button role="tab" @click="result_tab=1" aria-controls="tab-keygen-public-key"  :aria-selected="1==result_tab">Public Key</button>
            <button role="tab" @click="result_tab=2" aria-controls="tab-keygen-revocation-cert" :aria-selected="2==result_tab">Revocation Certificate</button>
        </menu>

        <article role="tabpanel" id="tab-keygen-private-key" :hidden="0!=result_tab">
            <textarea rows="10" readonly :class="$style.result_textarea" v-model="privateKey"></textarea>
        </article>

        <article role="tabpanel" id="tab-keygen-public-key" :hidden="1!=result_tab">
            <textarea rows="10" readonly :class="$style.result_textarea" v-model="publicKey"></textarea>
        </article>

        <article role="tabpanel" id="tab-keygen-revocation-cert" :hidden="2!=result_tab">
            <textarea rows="10" readonly :class="$style.result_textarea" v-model="revocationCertificate"></textarea>
        </article>

    </section>


</div>






</div></template> <script>
import { generate_key } from "xgp/openpgp";


export default {

    data(){ return {
        username: "",
        email: "",
        algorithm: "ecc:curve25519",
        save_after_generation: true,

        result_tab: 0,

        generated: false,
        privateKey: "",
        publicKey: "",
        revocationCertificate: "",

    } },

    methods: {
        reset(){
            /// #if DEV
            this.username = this.email = this.password = this.password2 = "test@test.com";
            /// #else
            this.username = this.email = this.password = this.password2 = "";
            /// #endif
            this.algorithm = "ecc:curve25519";

            this.generated = false;
            this.privateKey = this.publicKey = this.revocationCertificate = "";
        },


        async on_submit(){
            const options = {
                userIDs: [
                    { name: this.username, email: this.email },
                ],
                passphrase: this.password,
            };

            const keytype = this.algorithm.split(":")[0];
            const keyargv = this.algorithm.split(":")[1];
            options.type = keytype;

            if("ecc" == keytype){
                options.curve = keyargv;
            }
            if("rsa" == keytype){
                options.rsaBits = parseInt(keyargv, 10);
            }

            let result = await generate_key(options);

            if(result.isOk()){
                let { publicKey, privateKey, revocationCertificate } =
                    result.value;
                this.publicKey = publicKey;
                this.privateKey = privateKey;
                this.revocationCertificate = revocationCertificate;

                this.generated = true;
            } else {
            }

        }
    },


}
</script>
