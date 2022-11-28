<style module>
.bsod{
    position: fixed;
    left: 0; top: 0; width: 100%; height: 100%;
    background-color: #000080;
    z-index:9999999;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-family: dosfont, monospace;
    font-size: 4vh;
    user-select: none;
    --webkit-user-select: none;
}
.title{
    background: grey;
    color: #000080;
}
</style>
<template>
<div :class="$style.bsod" v-if="emergency"><div>

<div style="display:flex; justify-content: space-around; with:100%"><span :class="$style.title" style="padding: 0 0.5em 0 0.5em">
    eXciting Good Privacy
</span></div>
<p />

<div style="width: 80vw">
    Emergency shutdown has occured. To continue:
    <p />
    Press F5 to refresh this page.
</div>

</div></div>
</template>
<script>
import {$emergency$} from "xgp/channels";

export default {
    mounted(){
        $emergency$.subscribe("emergency", ()=>{
            this.emergency = true;
        })
    },
    data(){return{
        emergency: false
    }}
}

</script>
