<template>
<div class="container-fluid">

    <Header></Header>

    <div class="row">
        <div class="col-lg-3 col-xl-2">
            <NavbarMain
                :choice="navchoice"
                @changed="on_navbar_changed"
            ></NavbarMain>
        </div>
        <div class="col-lg-9 col-xl-10">

            <Keymgr v-show="'keymgr'==navchoice"></Keymgr>
            
            <Doc v-show="'doc'==navchoice"></Doc>


        </div>
    </div>

</div>
</template>



<script>
import Header from "./header.vue";
import NavbarMain from "./navbar-main.vue";
import Keymgr from "./keymgr/index.vue";
import Doc from "./doc/index.vue";

export default {
    
    components: {
        Header,
        NavbarMain,
        Keymgr,
        Doc
    },

    data: ()=> { return {
        navchoice: "keymgr",
    } },

    methods: {
        on_navbar_changed(choice){
            this.navchoice = choice;
        }
    }
}



</script>
