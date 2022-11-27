<template>
<div>
    <div>
        Create a new message.
        <br />
        You can encrypt and/or sign this message.
    </div>

    <p />

    <div>
        Encrypt for following named recipients:<p />
        <TwoColumnAddDeleteList
            :options="recipients"
            @changed="$emit('recipients', $event)"
            @add="on_add_recipient"
        >
        </TwoColumnAddDeleteList>
    </div>

    <p />

    <div>
        Encrypt with following password(s):<p />

        <TwoColumnAddDeleteList
            :options="passwords"
            @changed="$emit('passwords', $event)"
            @add="on_add_password"
        >
        </TwoColumnAddDeleteList>
    </div>
</div>

</template>
<script>
import prompt_password from "xgp/ui/prompt_password";
import TwoColumnAddDeleteList from "sfc/windows/two-column-add-delete-list.vue";

export default {
    props: ["recipients", "passwords"],

    methods: {
        async on_add_password(){
            let password = null;
            try{
                password = await prompt_password({
                    require_repeat: true,
                });
                if(null === password) return;
            } catch(e){
                return;
            }
            this.passwords.push({
                text: "Password",
                value: password,
            });
            this.$emit("passwords", this.passwords);
        }
    },
    components: {
        TwoColumnAddDeleteList,
    }
}
</script>
