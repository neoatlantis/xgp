<template>
    <div style="display:flex; flex-direction: row">
        <div :style="{'flex-grow': weight_left }">
            <slot name="left"></slot>
        </div>
        <div :style="{'flex-grow': weight_right }">
            <slot name="right"></slot>
        </div>
    </div>
</template>
<script>
export default {

    props: ["weight_left", "weight_right"],

}
</script>
