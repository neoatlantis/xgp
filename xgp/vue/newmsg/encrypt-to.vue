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
            @changed="recipients=$event"
            @add="on_add_recipient"
        >
        </TwoColumnAddDeleteList>
    </div>

    <p />

    <div>
        Encrypt with following password(s):<p />

        <TwoColumnAddDeleteList
            :options="passwords"
            @changed="passwords=$event"
            @add="on_add_password"
        >
        </TwoColumnAddDeleteList>
    </div>
</div>

</template>
<script>
import TwoColumnAddDeleteList from "sfc/windows/two-column-add-delete-list.vue";

export default {
    data(){ return {
        recipients: [
            { text: "Recipient 1" },
            { text: "Recipient 2" },
            { text: "Recipient 3" },
            { text: "Recipient 4" },
            { text: "Recipient 1" },
            { text: "Recipient 1" },
            { text: "Recipient 1" },
            { text: "Recipient 1" },
            { text: "Recipient 1" },
            { text: "Recipient 1" },
        ],
        passwords: [

        ],
    } },
    methods: {
        on_add_recipient(){

        },
        on_add_password(){
            alert('pwd');
        }
    },
    components: {
        TwoColumnAddDeleteList,
    }
}
</script>
