<style module>
.buttons_vertical_container{
    display: flex;
    flex-direction: column;
    padding-left: 10px; padding-right: 10px;
}
.buttons_vertical_container button{
    margin-bottom: 5px;
}
.li{
    user-select: none;
    --webkit-user-select: none;
}
</style>
<template>
    <TwoColumnLayout weight_left="4" weight_right="1">
        <template #left>
            <ul role="listbox" :style="{height: height, width: '100%', 'overflow-x': 'hidden'}">
                <li
                    :class="$style.li"
                    role="option"
                    v-for="(option, option_i) in options"
                    :value="option_i"
                    :aria-selected="selected.indexOf(option_i)>=0 || null"
                    @click="on_click($event, option_i)"
                >{{option.text}}</li>
            </ul>
        </template>
        <template #right>
            <div :class="$style.buttons_vertical_container">
                <button @click="selected=options.map((_,i)=>i)">Select all</button>
                <button @click="selected=[]">Unselect all</button>
                <button @click="$emit('add')">Add</button>
                <button @click="on_delete" :disabled="selected.length<1">Delete</button>
            </div>
        </template>
    </TwoColumnLayout>
</template>
<script>
import _ from "lodash";
import TwoColumnLayout from "sfc/windows/two-column-layout.vue";

export default {
    props: {
        options: {
            default: [],
        },
        height: {
            default: "10em",
        }
    },

    data(){ return {
        selected: [],
    }},

    methods: {
        on_click(e, i){
            let selected = _.includes(this.selected, i);
            if(selected){
                _.remove(this.selected, (e)=>e==i);
            } else {
                this.selected.push(i);
            }
        },

        on_delete(){
            let ret = [];
            this.options.forEach((option, option_i)=>{
                if(!_.includes(this.selected, option_i)){
                    ret.push(option);
                }
            });
            this.selected = [];
            this.$emit("changed", ret);
        }
    },

    components: {
        TwoColumnLayout
    }
}
</script>
