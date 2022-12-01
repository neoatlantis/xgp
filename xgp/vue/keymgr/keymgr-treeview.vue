<template>
<ul class="tree-view" style="margin-right: 5px">
    <li v-if="!filter || (filter && Object.keys(filtered_keys).length > 0)"><details open>
        <summary>🛰️ Public Keys</summary>
        <ul>
          <li v-if="!filter"><i>Import a new public key...</i></li>
          <li v-for="(key, keyid) in filtered_keys">
              {{key.user}}
          </li>
        </ul>
    </details></li>
    <li v-if="!filter || (filter && Object.keys(filtered_private_keys).length > 0)"><details open>
        <summary>🔑 Private Keys</summary>
        <ul>
          <li v-if="!filter"><i>Import a new private key...</i></li>
          <li v-for="(key, keyid) in filtered_private_keys">
              {{key.user}}
          </li>
        </ul>
    </details></li>
    <li v-if="!filter"><i>Generate a new keypair...</i></li>
</ul>
</template>
<script>
import keyring from "xgp/keyring";
import { $desktop$ } from "xgp/channels";

export default {

    props: ["filter"],

    data(){ return {
        keys: {},
    } },

    computed: {
        filtered_keys(){
            let ret = {};
            for(let k in this.keys){
                if(this.filter == ""){
                    ret[k] = this.keys[k];
                } else {
                    if(this.keys[k].user.indexOf(this.filter) >= 0){
                        ret[k] = this.keys[k];
                    }
                }
            }
            return ret;
        },

        filtered_private_keys(){
            if(_.size(this.filtered_keys) < 1) return {};
            let ret = {};
            for(let k in this.filtered_keys){
                if(this.filtered_keys[k].is_private){
                    ret[k] = this.keys[k];
                }
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
