<i18n>{
    zh: {
        TITLE: '加密或签名消息',
    },

    en: {
        TITLE: 'Encrypt / Sign Messages',
    }
}</i18n>
<template><Wizard
    ref="window" normal_width="50vw"
    :buttons="wizard_buttons.buttons"
    :next_button="wizard_buttons.next_button"
    :next_button_skip="wizard_buttons.next_button_skip"
    :back_button="wizard_buttons.back_button"
    :cancel_button="wizard_buttons.cancel_button"
    :cancel_button_done="wizard_buttons.cancel_button_done"

    @clicked="on_wizard_button_clicked"
>
<template #title>{{$t('TITLE')}}</template>
<div style="padding: 20px">

    <Intro v-if="'intro'==step"></Intro>
    <EncryptTo
        v-if="'encrypt'==step"
        :passwords="passwords"
        :recipients="recipients"
        @passwords="passwords=$event"
        @recipients="recipients=$event"
    ></EncryptTo>
    <SignWith
        v-if="'sign'==step"
        :signers="signers"
        @signers="signers=$event"
    ></SignWith>
    <Compose
        v-if="'compose'==step"
        :will_encrypt="recipients.length>0||passwords.length>0"
        :will_sign="signers.length>0"
        :message="message"
        @message="message=$event"
    ></Compose>
    <Result ref="result"
        v-if="'result'==step"
        :passwords="passwords"
        :recipients="recipients"
        :signers="signers"
        :message="message"
        @center="$refs.window.center()"
    ></Result>
</div>
</Wizard></template>
<script>
import Wizard from "sfc/windows/wizard.vue";

import Intro from "./intro.vue";
import EncryptTo from "./encrypt-to.vue";
import SignWith from "./sign-with.vue";
import Compose from "./compose.vue";
import Result from "./result.vue";

function new_data(){ return {
    step: "intro",
    /// #if DEV
    step: "compose",
    /// #endif

    recipients: [
    ],
    passwords: [
        /// #if DEV
        { text: "test", value: "password" },
        /// #endif
    ],
    signers: [],

    message: "",
}}



export default {

    data(){
        return new_data();
    },

    methods: {
        start(){
            Object.assign(this.$data, new_data());
            this.$refs["window"].show();
        },

        move_next(){
            switch(this.step){
                case "intro":
                    this.step = 'encrypt'; break;
                case "encrypt":
                    this.step = "sign"; break;
                case "sign":
                    this.step = "compose"; break;
                case "compose":
                    this.step = "result";
                    setTimeout(()=>this.generate(), 0);
                    break;
            }
        },

        move_back(){
            switch (this.step) {
                case "encrypt":
                    this.step = "intro"; break;
                case "sign":
                    this.step = "encrypt"; break;
                case "compose":
                    this.step = "sign"; break;
                case "result":
                    this.step = "compose"; break;
            }
        },

        on_wizard_button_clicked(button_name){
            switch(button_name){
                case 'cancel':
                    this.$refs["window"].hide(); break;
                case 'next':
                    this.move_next(); break;
                case 'back':
                    this.move_back(); break;
            }
            this.$refs["window"].center();
        },

        generate(){
            this.$refs["result"].generate();
        },
    },

    computed: {

        wizard_buttons(){
            let buttons = ['next', 'back', 'cancel'];
            let ret = {
                buttons: buttons,
                next_button_skip: (
                    (
                        this.step == 'encrypt' &&
                        this.recipients.length == 0 &&
                        this.passwords.length == 0
                    ) || (
                        this.step == 'sign' &&
                        this.signers.length == 0
                    )
                ),
                next_button: (this.step != "result"),
                back_button: (this.step != "intro"),
                cancel_button: true,
                cancel_button_done: (this.step == "result"),
            };
            return ret;
        }

    },

    components: {
        Wizard,
        Intro, EncryptTo, SignWith, Compose, Result,
    }
}

</script>
