<i18n>{
    zh: {
        TITLE: "需要签名消息以证明真实吗?",
        INSTRUCTION: "如果需要正式证明消息内容由您发出且未经篡改，请在此使用数字签名。",
        ADD_FRAME: "添加签名密钥",
        ADD: "添加",
    },
    en: {
        TITLE: "Shall we sign the message for authenticity?",
        INSTRUCTION: "If you want to issue the message formally with proof of authenticity, please use digital signature here.",
        ADD_FRAME: "Add new signing key",
        ADD: "Add",
    }
}</i18n>
<template>
<div>
    <Headline>{{$t('TITLE')}}</Headline>

    <p />

    <div>
        {{$t('INSTRUCTION')}}
        <p />
        <TwoColumnAddDeleteList
            :options="signers"
            :add_button="false"
            @changed="$emit('signers', $event)"
        >
        </TwoColumnAddDeleteList>
    </div>

    <p />

    <fieldset>
        <legend style="width:auto">&nbsp;&nbsp;{{$t('ADD_FRAME')}}&nbsp;&nbsp;</legend>
        <div style="display:flex">
            <div style="flex-grow:1">Choose a signing key:</div>
            <div style="flex-grow:3">
                <SearchableCombobox style="width:100%"></SearchableCombobox>
            </div>
        </div>
        <div style="text-align:right; margin-top: 10px">
            <button>{{$t('ADD')}}</button>
        </div>

    </fieldset>

</div>

</template>
<script>
import prompt_password from "xgp/ui/prompt_password";
import Headline from "sfc/windows/headline.vue";
import TwoColumnAddDeleteList from "sfc/windows/two-column-add-delete-list.vue";
import SearchableCombobox from "sfc/windows/searchable-combobox.vue";

export default {
    props: ["signers"],

    methods: {
        async on_add_signer(){
            let password = null;
        }
    },
    components: {
        TwoColumnAddDeleteList, Headline,
        SearchableCombobox,
    }
}
</script>
