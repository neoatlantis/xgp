<i18n>{
    zh: {
        TITLE: "撰写消息或者选择文件...",
        ENCRYPT_ONLY: "您的消息会被加密，但不会被签名。您的消息在传输中是秘密的，但是收件人无法确认消息来源。",
        SIGN_ONLY: "您的消息会被签名，但不会被加密。您的消息对所有人可见，且所有人都可以确认消息由您发送。",
        ENCRYPT_AND_SIGN: "您的消息将会被加密并签名。您的消息可以秘密传送给收件人，且收件人可以确认消息由您发送。",
        NO_ENCRYPT_OR_SIGN: "您的消息既不会被加密也不会被签名，只会被封装成 PGP 格式的报文。请谨慎操作。",
    },
    en: {
        TITLE: "Compose message, or select a file...",
        ENCRYPT_ONLY: "Your message will be encrypted with signature. Secrecy of your message is protected, but receiver cannot verify its origin.",
        SIGN_ONLY: "Your message will be signed but not encrypted. Your message is visible to everyone, and everyone can verify it originates from you.",
        ENCRYPT_AND_SIGN: "Your message will be sign- and encrypted. It can be transmitted to receiver secretly, and receivers can verify it originates from you.",
        NO_ENCRYPT_OR_SIGN: "Your message will neither be sign nor encrypted. It will only be encapusulated in a PGP format. Please be careful."
    }
}</i18n>
<style module>
.composer_textarea{
    width:100%;
    font-family: monospace;
}
</style>
<template>
<div>
    <Headline>{{$t('TITLE')}}</Headline>
    <p />
    <div>
        {{ $t( will_encrypt ? (will_sign ? "ENCRYPT_AND_SIGN" : "ENCRYPT_ONLY") : (will_sign ? "SIGN_ONLY" : "NO_ENCRYPT_OR_SIGN") ) }}
    </div>
    <p />
    <div>
        <textarea
            :class="$style.composer_textarea"
            v-model="message"
            @change="$emit('message', message)"
            rows="10"
        ></textarea>
    </div>

</div>
</template>
<script>
import Headline from "sfc/windows/headline.vue";
export default {
    props: [
        "will_encrypt", "will_sign", "message",
    ],

    data(){

    },

    components: {
        Headline,
    }

}
</script>
