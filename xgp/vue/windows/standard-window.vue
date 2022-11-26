<style module>
.window { position: fixed }
.title_bar { user-select: false; -webkit-user-select: none }

</style>

<template>

<div
    class="window"
    :class="$style.window"
    :style='{
        left  : maximized ? `0` : `${window_x}px`,
        top   : maximized ? `0` : `${window_y}px`,
        width : maximized ? `100%` : undefined,
        height: maximized ? `100%` : undefined,
        "z-index": z_index,
    }'
    ref="window"
>
    <div
        class="title-bar" :class="$style.title_bar"
        @mousedown="on_mousedown"
        @mouseup="on_mouseup"
        @mousemove="on_mousemove"
    >
        <div class="title-bar-text"><slot name="title"></slot></div>
        <div class="title-bar-controls">
            <button aria-label="Minimize"></button>
            <button aria-label="Maximize" @click="maximized=!maximized"></button>
            <button aria-label="Close"></button>
        </div>
    </div>
    <div
        class="window-body"
        :style='{
            height: maximized ? `calc(100% - 35px)` : `100%`,
            width : maximized ? `calc(100% - 12px)` : `100%`,
        }'
    >
        <slot></slot>
    </div>
</div>

</template>
<script>
export default {

    mounted(){
        setTimeout(()=>this.position_init(), 0);
    },

    data(){ return {
        maximized: false,
        window_x: 0,
        window_y: 0,
        z_index: 10,

        titlebar_dragging: false,
        titlebar_dragging_x0: 0,
        titlebar_dragging_y0: 0,
    }},

    methods: {

        position_init(){
            let width  = this.$refs["window"].clientWidth,
                height = this.$refs["window"].clientHeight;

            console.log(width, height);

            this.window_x = (window.innerWidth - width)/2;
            this.window_y = (window.innerHeight - height)/2;

            console.log(this.window_x);
        },

        on_mousedown(e){
            if(this.maximized){
                this.titlebar_dragging = false;
                return;
            }
            this.titlebar_dragging = true;
            this.titlebar_dragging_x0 = e.clientX;
            this.titlebar_dragging_y0 = e.clientY;
        },

        on_mousemove(e){
            if(this.maximized) return;
            if(!this.titlebar_dragging) return;
            let dx = e.clientX - this.titlebar_dragging_x0,
                dy = e.clientY - this.titlebar_dragging_y0;
            this.window_x += dx;
            this.window_y += dy;
            this.titlebar_dragging_x0 = e.clientX;
            this.titlebar_dragging_y0 = e.clientY;
        },

        on_mouseup(e){
            this.titlebar_dragging = false;
        }
    }

}
</script>
