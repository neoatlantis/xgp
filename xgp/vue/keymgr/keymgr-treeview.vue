<template>
<ul class="tree-view" style="margin-right: 5px">
    <li><details open>
        <summary>🛰️ Public Keys</summary>
        <ul>
          <li><i>Import a new public key...</i></li>
          <li v-for="(key, keyid) in keys">
              {{key.user}}
          </li>
        </ul>
    </details></li>
    <li><details open>
        <summary>🔑 Private Keys</summary>
        <ul>
          <li><i>Import a new private key...</i></li>
          <li v-for="(key, keyid) in private_keys">
              {{key.user}}
          </li>
        </ul>
    </details></li>
    <li><i>Generate a new keypair...</i></li>
</ul>
</template>
<script>
import keyring from "xgp/keyring";
import { $desktop$ } from "xgp/channels";

export default {

    data(){ return {
        keys: {},
    } },

    computed: {
        private_keys(){
            if(_.size(this.keys) < 1) return {};
            let ret = {};
            for(let k in this.keys){
                if(this.keys[k].is_private) ret[k] = this.keys[k];
            }
            return ret;
        }
    },

    mounted(){
        $desktop$.subscribe("keyring.refresh", ()=>{
            this.keys = {};
            keyring.cache.forEach((info, uuid)=>{
                this.keys[uuid] = info;
            });
        });
    },

}
</script>
