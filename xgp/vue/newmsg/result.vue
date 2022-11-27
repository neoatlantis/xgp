<i18n>{
    zh: {
        TITLE_PREPARING: "正在生成结果...",
        TITLE_DONE: "消息处理完毕",
        INSTRUCTION: "下面是程序输出的结果。您可以将其复制到电子邮件、聊天工具、博客或其他程序中发送了。",
    },
    en: {
        TITLE_PREPARING: "Processing your message...",
        TITLE_DONE: "Your message was generated",
        INSTRUCTION: "Below is the output result. You may paste it to email, chat rooms, blogs, etc. and share."
    }
}</i18n>
<style module>
.result_textarea{
    width:100%;
    font-family: monospace;
}
</style>
<template>
    <Headline>{{$t(generating?'TITLE_PREPARING':'TITLE_DONE')}}</Headline>
    <p />

    <div v-if="generating">
        <div role="progressbar" class="marquee"></div>
    </div>
    <div v-else>
        <div>{{$t("INSTRUCTION")}}</div>
        <p />
        <textarea v-model="result" :class="$style.result_textarea" rows="10" readonly></textarea>
    </div>


</template>
<script>
import Headline from "sfc/windows/headline.vue";
import newmsg from "xgp/openpgp/newmsg";

export default {
    props: ["recipients", "passwords", "signers", "message"],
    components: {
        Headline,
    },
    data(){ return {
        generating: true,
        result: "",
    } },
    watch:{
        generating(){
            this.$emit("center");
        }
    },
    methods: {
        generate(){
            this.result = "";
            this.generating = true;
            let job = async function(){
                let result = await newmsg({
                    recipients: this.recipients,
                    passwords: this.passwords,
                    signers: this.signers,
                    message: this.message,
                });
                this.result = result;
            };
            job.call(this).then(()=>{
                setTimeout(()=>{this.generating = false;}, 500);
            });
        }
    }
}
</script>
