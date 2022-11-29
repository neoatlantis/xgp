<template>
</template>

<script>
import prompt_password from "xgp/ui/prompt_password";
import keyring from "xgp/keyring";
export default {
    async mounted(){
        let need_creation = await keyring.need_creation();
        let previous_invalid_password = false;
        while(true){
            try{
                await keyring.unlock(
                    await prompt_password({
                        require_repeat: need_creation,
                        context: "keyring",
                        previous_invalid_password,
                    })
                );
                break;
            } catch(e){
                previous_invalid_password = true;
            }
        }

    },

    data(){ return {

    }},

    methods: {
        show(){

        }
    }
}
</script>
