<i18n>{
    zh: {
        BACK: "上一步",
        NEXT: "下一步",
        SKIP: "跳过",
        CANCEL: "取消",
        DONE: "完成",
    },
    en: {
        BACK: "Back",
        NEXT: "Next",
        SKIP: "Skip",
        CANCEL: "Cancel",
        DONE: "Done",
    }
}</i18n>
<style module>
.content_area{
    background-color: white;

}
.bottom_area{
    background-color: #f0f0f0;
    padding: 1em 1em 1em 1em;
    text-align: right;
}
.step_button{
    margin-left: 10px;
}
</style>
<template><StandardWindow
    ref="window"
    :maximize_button="false" :minimize_button="false"
>
<template #title><slot name="title"></slot></template>

    <div :class="$style.content_area">
        <slot></slot>
    </div>

    <div :class="$style.bottom_area">
        <button v-if="buttons.indexOf('back')>=0"   :disabled="!back_button"  :class="$style.step_button" @click="on_button_clicked('back')">&lt; {{$t('BACK')}}</button>
        <button v-if="buttons.indexOf('next')>=0"   :disabled="!next_button"  :class="$style.step_button" @click="on_button_clicked('next')">
            {{next_button_skip ? $t("SKIP") : $t('NEXT')}} &gt;
        </button>
        <button v-if="buttons.indexOf('cancel')>=0" :disabled="!cancel_button" :class="$style.step_button" @click="on_button_clicked('cancel')">
            {{cancel_button_done ? $t('DONE') : $t('CANCEL')}}
        </button>
    </div>


</StandardWindow></template>
<script>
import StandardWindow from "./standard-window.vue";

export default {
    props: {
        buttons: {
            default: ["next", "back", "cancel"]
        },

        next_button_skip: { type: Boolean, default: false },
        next_button: { type: Boolean, default: true, },
        back_button: { type: Boolean, default: true, },
        cancel_button: { type: Boolean, default: true, },
        cancel_button_done: { type: Boolean, default: false },
    },

    data(){ return {

    } },

    methods: {
        show(){ this.$refs["window"].show() },
        hide(){ this.$refs["window"].hide() },
        center(){ this.$refs["window"].center() },

        on_button_clicked(name){
            this.$emit("clicked", name);
        }

    },

    components: {
        StandardWindow,
    }

}

</script>
