<i18n>{
    zh: {
        TITLE: "需要密码",
    },

    en: {
        TITLE: "Password Required",
    }
}</i18n>
<style module>
.modal_background{
    background-color: #3b6ea5ee;
    z-index: 1000;
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    backdrop-filter: blur(3px);
}
</style>
<template>
<div :class="$style.modal_background" v-if="visible">

<StandardWindow ref="window"
    normal_width="50vw"
    :always_visible="true"
    :draggable="false"
    :z_index="2000"
    :maximize_button="false"
    :minimize_button="false"
    :close_button="false"
>
    <template #title>{{$t("TITLE")}}</template>
    <form action="#" @submit="$event.preventDefault()" style="padding: 15px">

    <Headline>Please input your password.</Headline>
    <hr />

    <div v-if="'keyring'==context">
        <span v-if="require_repeat">
            Before using XGP, the keyring must be initialized with a personal
            password. Please choose a strong password and continue.
        </span>
        <span v-else>
            Please input your password to unlock keyring.
        </span>
    </div>
    <div v-else>
        Please choose a secure password for encrypting message.
    </div>

    <div v-if="previous_invalid_password" style="color:red">
        Invalid password, please try again.
    </div>
    
    <p />


    <div class="field-row-stacked" style="width: 100%">
        <label for="password-prompt-input1">Password:</label>
        <input id="password-prompt-input1" type="password" v-model="password" />
    </div>
    <br />
    <div v-if="require_repeat" class="field-row-stacked" style="width: 100%">
        <label for="password-prompt-input2">Repeat Password:</label>
        <input id="password-prompt-input2" type="password" v-model="password2"/>
    </div>

    <hr />
    <div style="text-align:right">
        <button type="submit" :disabled="!maybe_ok" @click="ok">OK</button>
        <button @click="cancel" style="margin-left: 5px">Cancel</button>
    </div>

    </form>
</StandardWindow>



</div>
</template>
<script>
import Headline from "./headline.vue";
import StandardWindow from "./standard-window.vue";
import { $desktop$ } from "xgp/channels";

export default {

    mounted(){
        $desktop$.subscribe("password.prompt", (e)=>this.prompt(e));
    },

    data(){ return {
        context: null,
        visible: false,
        require_repeat: false,
        previous_invalid_password: false,
        password: "",
        password2: "",
    } },

    methods: {
        reset(){
            this.password = this.password2 = "";
            this.visible = false;
        },

        prompt({
            require_repeat,
            context,
            previous_invalid_password=false,
        }){
            if(this.visible){
                $desktop$.publish("password.error", "busy");
                return;
            }
            // init
            this.context = context;
            this.require_repeat = require_repeat;
            this.previous_invalid_password = previous_invalid_password;

            this.visible = true;
        },

        ok(){
            $desktop$.publish("password.result", this.password);
            this.reset();
        },

        cancel(){
            $desktop$.publish("password.result", null);
            this.reset();
        }
    },

    computed: {
        maybe_ok(){
            if(this.password == "") return false;
            if(this.require_repeat){
                return this.password == this.password2;
            } else {
                return true;
            }
        }
    },

    components: {
        Headline,
        StandardWindow,
    }
}

</script>
