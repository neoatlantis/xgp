<template>
<div class="container-fluid">

    <Header></Header>

    <div class="row">
        <div class="col-3">
            <NavbarMain
                :choice="navchoice"
                @changed="on_navbar_changed"
            ></NavbarMain>
        </div>
        <div class="col-9">

            <Keymgr v-show="'keymgr'==navchoice"></Keymgr>
            


        </div>
    </div>

</div>
</template>



<script>
import Header from "./header.vue";
import NavbarMain from "./navbar-main.vue";
import Keymgr from "./keymgr/index.vue";

export default {
    
    components: {
        Header,
        NavbarMain,
        Keymgr
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
