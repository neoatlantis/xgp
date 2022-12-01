<style module>
.col_left{
    flex: 0 0 33%;
    height: 100%;
    background-color: white;
}
</style>
<template><StandardWindow
    ref="window"
    normal_height="50vh" normal_width="60vw"
>
<template #title>Key Management</template>

<div style="height:100%; display: flex">

        <div :class="$style.col_left">
            <div style="display:flex">
                <button @click="refresh_keyring">&#128472; Refresh</button>
                <input type="text" v-model="keyring_treeview_filter" placeholder="Filter..." style="flex-grow:1"/>
            </div>
            <KeymgrTreeview :filter="keyring_treeview_filter"></KeymgrTreeview>
        </div>
        <div style="padding: 10px; flex-grow:1">
            <Keygen ref="keygen"></Keygen>
        </div>


</div>




<!--<div class="row"><div class="col-12">
    <ul class="nav">
        <li class="nav-item">
            <a class="nav-link" href="#" :class='{"disabled":ui_area_busy}' @click.stop="$refs.keygen.reset();show_create=true">Create...</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#" :class='{"disabled":ui_area_busy}'>Import...</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#" :class='{"disabled":ui_area_busy}'>Export...</a>
        </li>
    </ul>
</div></div>



<ClosableFrame title="Create new PGP key" v-show="show_create" @close="show_create=false">
    <Keygen ref="keygen"></Keygen>
</ClosableFrame>
-->






</StandardWindow></template>
<script>

import keyring from "xgp/keyring";
import { $desktop$ } from "xgp/channels";

import StandardWindow from "sfc/windows/standard-window.vue";
import TwoColumnLayout from "sfc/windows/two-column-layout.vue";
import KeymgrTreeview from "./keymgr-treeview.vue";
import ClosableFrame from "sfc/closable-frame.vue";
import Keygen from "./keygen.vue";

export default {

    data(){ return {

        show_create: false,
        show_import: false,
        show_export: false,

        keyring_treeview_filter: "",

    } },

    methods: {
        start(){
            this.$refs["window"].show();
        },

        refresh_keyring(){
            $desktop$.publish("do.keyring.refresh");
        },
    },

    computed: {
        ui_area_busy(){
            // If the main input area is now busy as result of some closable
            // frame is being displayed.
            return this.show_create || this.show_import || this.show_export;
        }
    },

    components: {
        StandardWindow,
        TwoColumnLayout,
        ClosableFrame,
        Keygen,
        KeymgrTreeview,
    }
}

</script>
