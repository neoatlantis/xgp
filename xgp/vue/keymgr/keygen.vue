<template><div>

<!-- Input form for new key -->
<form v-show="!generated" action="#" @submit.prevent="on_submit">
    <div class="form-group row">
        <label class="col-sm-4 col-form-label">Name</label>
        <div class="col-sm-8">
            <input v-model="username" type="text" class="form-control">
        </div>
    </div>
    <div class="form-group row">
        <label class="col-sm-4 col-form-label">Email</label>
        <div class="col-sm-8">
            <input v-model="email" type="email" class="form-control">
        </div>
    </div>
    <div class="form-group row">
        <label class="col-sm-4 col-form-label">Password</label>
        <div class="col-sm-4">
            <input v-model="password" type="password" class="form-control" id="inputPassword">
        </div>
        <div class="col-sm-4">
            <input v-model="password2" type="password" class="form-control" :class='{"is-invalid":!password_match}' id="inputPassword2" placeholder="Repeat your password here">
            <div class="invalid-feedback" v-if="!password_match">
                Password mismatch.
            </div>
        </div>
    </div>
    <div class="form-group row">
        <label for="inputAlgorithm" class="col-sm-4 col-form-label">Algorithm</label>
        <div class="col-sm-8">
            <select v-model="algorithm" id="inputAlgorithm" class="form-control">
                <option value="ecc:curve25519">Curve25519</option>
                <option value="rsa:4096">RSA 4096-bits</option>
                <option value="rsa:2048">RSA 2048-bits</option>
            </select>
        </div>
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

    <div>
        Your new key pair was just generated.
    </div>

    <ul class="nav nav-tabs">
        <li class="nav-item">
            <a class="nav-link" :class='{active:0==result_tab}' @click="result_tab=0" href="#">Private Key</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" :class='{active:1==result_tab}' @click="result_tab=1" href="#">Public Key</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" :class='{active:2==result_tab}' @click="result_tab=2" href="#">Revocation Certificate</a>
        </li>
    </ul>

    <div class="tab-content" id="nav-tabContent">
        <div class="tab-pane fade" :class='{show:0==result_tab,active:0==result_tab}' role="tabpanel">
            <pre>{{ privateKey }}</pre>
        </div>
        <div class="tab-pane fade" :class='{show:1==result_tab,active:1==result_tab}' role="tabpanel">
            <pre>{{ publicKey }}</pre>
        </div>
        <div class="tab-pane fade" :class='{show:2==result_tab,active:2==result_tab}' role="tabpanel">
            <pre>{{ revocationCertificate }}</pre>
        </div>
    </div>

</div>






</div></template> <script>
import { generate_key } from "xgp/openpgp";


export default {

    data(){ return {
        username: "",
        email: "",
        password: "",
        password2: "",
        algorithm: "ecc:curve25519",
        save_after_generation: true,

        result_tab: 0,

        generated: false,
        privateKey: "",
        publicKey: "",
        revocationCertificate: "",

    } },

    computed: {
        password_match(){
            return this.password == this.password2;
        },
    },

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
