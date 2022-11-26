<template>
<div>
    <Desktop @start="on_desktop_start" ></Desktop>

    <div>
        <Keymgr ref="keymgr"></Keymgr>
        <Doc ref="doc"></Doc>
    </div>

</div>
</template>



<script>
import Desktop from "./desktop.vue";
import Keymgr from "./keymgr/index.vue";
import Doc from "./doc/index.vue";

export default {

    components: {
        Desktop,
        Keymgr,
        Doc
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
