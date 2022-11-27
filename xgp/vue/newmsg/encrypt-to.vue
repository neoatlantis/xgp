<style module>
.buttons_vertical_container{
    display: flex;
    flex-direction: column;
    padding-left: 10px; padding-right: 10px;
}
</style>
<template>
<div>
    <div>
        Create a new message.
        <br />
        You can encrypt and/or sign this message.
    </div>

    <p />

    <div class="field-row-stacked">
        Encrypt for following named recipients:<br />

        <TwoColumnLayout weight_left="4" weight_right="1">
            <template #left>
                <ul role="listbox" style="height: 10em; overflow-y: scroll">
                  <li role="option">Facebook</li>
                  <li role="option">Apple</li>
                  <li role="option">Netflix</li>
                  <li role="option">Google</li>
                  <li role="option">Facebook</li>
                  <li role="option">Apple</li>
                  <li role="option">Netflix</li>
                  <li role="option">Google</li>
                </ul>
            </template>
            <template #right>
                <div :class="$style.buttons_vertical_container">
                    <button>Add</button>
                    <button>Delete</button>
                </div>
            </template>
        </TwoColumnLayout>
    </div>


    <div class="field-row-stacked">
        Encrypt with following password(s):<br />

        <TwoColumnLayout weight_left="4" weight_right="1">
            <template #left>
                <ul role="listbox" style="height: 10em; overflow-y: scroll">
                  <li role="option">Facebook</li>
                  <li role="option">Apple</li>
                  <li role="option">Netflix</li>
                  <li role="option">Google</li>
                  <li role="option">Facebook</li>
                  <li role="option">Apple</li>
                  <li role="option">Netflix</li>
                  <li role="option">Google</li>
                </ul>
            </template>
            <template #right>
                <div :class="$style.buttons_vertical_container">
                    <button>Add</button>
                    <button>Delete</button>
                </div>
            </template>
        </TwoColumnLayout>

    </div>
</div>

</template>
<script>
import TwoColumnLayout from "sfc/windows/two-column-layout.vue";

export default {
    components: {
        TwoColumnLayout
    }
}
</script>
