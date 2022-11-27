<template>
    <div class="combobox">
        <input
            v-model="value"
            type="text" role="combobox"
            @keypress="value_from_dropdown=false; show_dropdown=true"
        />
        <button @click="show_dropdown=!show_dropdown"></button>
        <ul role="listbox" style="position:absolute" v-show="show_dropdown">
            <li
                v-for="(item, item_i) in items"
                role="option"
                @click="value=items[item_i];value_i=item_i;value_from_dropdown=true;show_dropdown=false"
            >{{ item }}</li>
        </ul>
    </div>
</template>
<script>
export default {
    props: {
        items: {
            type: Array,
            /// #if DEV
            default: ["facebook", "amazon", "apple", "netflix", "google"],
            /// #endif
        }
    },

    data(){ return {
        value: "",
        value_i: null,
        show_dropdown: false,
        value_from_dropdown: false,
    } },

    methods(){

    }

}
</script>
