<template><StandardWindow>

<template #title>Key Management</template>




<div class="row"><div class="col-12">
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







</StandardWindow></template>
<script>

import StandardWindow from "../windows/standard-window.vue";
import ClosableFrame from "../closable-frame.vue";
import Keygen from "./keygen.vue";

export default {

    data(){ return {
        
        show_create: false,
        show_import: false,
        show_export: false,

    } },

    computed: {
        ui_area_busy(){
            // If the main input area is now busy as result of some closable
            // frame is being displayed.
            return this.show_create || this.show_import || this.show_export;
        }
    },
    
    components: {
        StandardWindow,
        ClosableFrame,
        Keygen
    }
}

</script>
