<template>
<div>
    <Desktop @start="on_desktop_start" ></Desktop>

    <div>
        <Keymgr ref="keymgr"></Keymgr>
        <Newmsg ref="newmsg"></Newmsg>
        <Doc ref="doc"></Doc>
    </div>

</div>
</template>



<script>
import Desktop from "./desktop.vue";
import Keymgr from "./keymgr/index.vue";
import Newmsg from "./newmsg/index.vue";
import Doc from "./doc/index.vue";

export default {

    components: {
        Desktop,
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
