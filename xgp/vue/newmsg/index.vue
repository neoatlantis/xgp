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






</div>
</Wizard></template>
<script>
import Wizard from "sfc/windows/wizard.vue";

import Intro from "./intro.vue";
import EncryptTo from "./encrypt-to.vue";

function new_data(){ return {
    step: "intro",
    /// #if DEV
    step: "encrypt",
    /// #endif


    recipients: [
        { text: "Recipient 1" },
        { text: "Recipient 2" },
        { text: "Recipient 3" },
        { text: "Recipient 4" },
        { text: "Recipient 1" },
        { text: "Recipient 1" },
        { text: "Recipient 1" },
        { text: "Recipient 1" },
        { text: "Recipient 1" },
        { text: "Recipient 1" },
    ],
    passwords: [
        /// #if DEV
        { text: "test", value: "password" },
        /// #endif
    ],
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
                    this.step = 'encrypt';
                    break;
            }
        },

        move_back(){
            switch (this.step) {
                case "encrypt":
                    this.step = "intro"; break;
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
    },

    computed: {

        wizard_buttons(){
            let buttons = ['next', 'back', 'cancel'];
            let ret = {
                buttons: buttons,
                next_button_skip: (
                    this.step == 'encrypt' &&
                    this.recipients.length == 0 &&
                    this.passwords.length == 0
                ),
                next_button: true,
                back_button: true,
                cancel_button: true,
            };

            switch(this.step){
                case 'intro':
                    ret.back_button = false; break;
            }
            return ret;
        }

    },

    components: {
        Wizard,
        Intro, EncryptTo,
    }
}

</script>
