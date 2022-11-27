<i18n>{
    zh: {
        ADD: "添加",
        DELETE: "删除",
        SELECT_ALL: "全部选中",
        UNSELECT_ALL: "全都不选",
    },
    en: {
        ADD: "Add",
        DELETE: "Delete",
        SELECT_ALL: "Select All",
        UNSELECT_ALL: "Select None",
    }
}</i18n>
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
                <button @click="selected=options.map((_,i)=>i)">{{$t('SELECT_ALL')}}</button>
                <button @click="selected=[]">{{$t('UNSELECT_ALL')}}</button>
                <button v-if="add_button" @click="$emit('add')">{{$t('ADD')}}</button>
                <button @click="on_delete" :disabled="selected.length<1">{{$t('DELETE')}}</button>
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
        },
        add_button: {
            default: true,
            type: Boolean,
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
