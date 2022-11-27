<template>
<div>
    <Desktop @start="on_desktop_start" ></Desktop>
    <PasswordPrompt></PasswordPrompt>
    <div>
        <Keymgr ref="keymgr"></Keymgr>
        <Newmsg ref="newmsg"></Newmsg>
        <Doc ref="doc"></Doc>
    </div>

</div>
</template>



<script>
import Desktop from "./desktop.vue";
import PasswordPrompt from "./windows/password-prompt.vue";
import Keymgr from "./keymgr/index.vue";
import Newmsg from "./newmsg/index.vue";
import Doc from "./doc/index.vue";

export default {

    components: {
        Desktop,
        PasswordPrompt,
        Keymgr,
        Newmsg,
        Doc,
    },

    data: ()=> { return {

    } },

    methods: {
        on_desktop_start(name){
            this.$refs[name].start();
        }
    }
}



</script>
