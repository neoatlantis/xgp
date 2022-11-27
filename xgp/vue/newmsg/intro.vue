<i18n>{
    zh: {
        HEADLINE: "创建新的加密或签名消息...",
        P1: "本向导将会带您使用 OpenPGP 强大的加密和签名功能，创建一份受到保护的消息。",
        ENCRYPTION: "加密消息",
        P2: "的作用是，保证这份消息只能由预定的收件人解读，即保护了消息的机密。或者您也可以只用密码加密信息，这样任何知道密码的人都可以解读消息。",
        SIGNATURE: "签名消息",
        P3: "的作用是，确保消息在收件人处完整无损。签名可以揭示任何试图篡改消息内容的行为。同时，签名也证明确实是您，而非任何人冒名顶替地撰写了这份消息。",
        P4: "加密和签名消息是两个相互独立的选项。您可以任选其一，或者二者皆用。在接下来的步骤中，您有机会输入更多的参数。",
    },

    en: {
        HEADLINE: "Create a new encrypted/signed message...",
        P1: "This wizard will help you create a message protected by OpenPGP's powerful encryption and signature.",
        ENCRYPTION: "Encryption",
        P2: "of a message will ensure only the intended recipients may read the content. This ensures secrecy. You may also use only passphrases for encryption, which enables anyone knowing the passphrase to decrypt.",
        SIGNATURE: "Signature",
        P3: "of a message will ensure the message is delivered unchanged as at creation. Any attempt of manipulating the content can be revealed. It also proofs it's you, rather that anyone else, have issued the message.",
        P4: "Encryption and signature are independent options. You may choose either or both. In the following steps, you will be prompted for more details.",
    }
}</i18n>
<template>
    <Headline>{{$t('HEADLINE')}}</Headline>
    <p />
    {{$t('P1')}}
    <p />
    <strong>{{$t('ENCRYPTION')}}</strong> {{$t('P2')}}
    <p />
    <strong>{{$t('SIGNATURE')}}</strong> {{$t("P3")}}
    <p />
    {{$t("P4")}}
</template>
<script>
import Headline from "sfc/windows/headline.vue";
export default { components: { Headline }};
</script>
