<style module>
.window { position: fixed }
.title_bar { user-select: false; -webkit-user-select: none }

</style>

<template>

<div
    class="window"
    :class="[$style.window, has_focus?'active':'']"
    :style='{
        left  : maximized ? `0` : `${window_x}px`,
        top   : maximized ? `0` : `${window_y}px`,
        width : maximized ? `100%` : (minimized ? `30em` : this.normal_width ),
        height: maximized ? `100%` : undefined,
        "z-index": has_focus ? 20 : 10,
    }'
    ref="window"
    v-show="visible"
>
    <div
        class="title-bar" :class="$style.title_bar"
        @click="focus"
        @mousedown="on_mousedown"
        @mouseup="on_mouseup"
        @mousemove="on_mousemove"
    >
        <div class="title-bar-text"><slot name="title"></slot></div>
        <div class="title-bar-controls">
            <button v-if="minimize_button" aria-label="Minimize" @click="maximized=false; minimized=!minimized"></button>
            <button v-if="maximize_button" aria-label="Maximize" @click="minimized=false; maximized=!maximized; (!maximized && center())"></button>
            <button aria-label="Close" @click="visible=false"></button>
        </div>
    </div>
    <div
        class="window-body"
        v-show="!minimized"
        :style='{
            height: maximized ? `calc(100% - 35px)` : `100%`,
            width : `calc(100% - 12px)`,
        }'
    >
        <slot></slot>
    </div>
</div>

</template>
<script>
import { v4 as uuidv4 } from 'uuid';
import { $desktop$ } from "xgp/channels";


export default {

    props: {
        normal_width: {
            default: "30em",
        },
        maximize_button: {
            type: Boolean,
            default: true,
        },
        minimize_button: {
            type: Boolean,
            default: true,
        }
    },

    mounted(){
        setTimeout(()=>this.position_init(), 0);

        $desktop$.subscribe("window.focus", (uuid)=>{
            this.has_focus = (uuid == this.uuid);
        })
    },

    data(){ return {
        uuid: uuidv4(),
        has_focus: false,
        visible: false,

        minimized: false,
        maximized: false,
        window_x: 0,
        window_y: 0,

        titlebar_dragging_handle: false,
        titlebar_dragging_mouseup_handle: false,
        titlebar_dragging_x0: 0,
        titlebar_dragging_y0: 0,

    }},

    methods: {

        show(){
            this.visible = true;
            this.position_init();
            this.focus();
        },

        hide(){
            this.visible = false;
        },

        focus(){
            $desktop$.publish("window.focus", this.uuid);
        },

        center(){
            setTimeout(()=>{
                let width  = this.$refs["window"].clientWidth,
                    height = this.$refs["window"].clientHeight;
                this.window_x = (window.innerWidth - width)/2;
                this.window_y = (window.innerHeight - height)/2;
            }, 0);
        },

        position_init(){
            this.center();
        },

        on_mousedown(e){
            this.start_window_dragging(e);
            if(this.maximized){
                this.stop_window_dragging();
                return;
            }
            e.stopPropagation();
        },

        on_mouseup(e){
            this.stop_window_dragging();
            e.stopPropagation();
        },

        on_mousemove(e){
            if(false === this.titlebar_dragging_handle) return;
            this.move_window_by_xy({ x: e.clientX, y: e.clientY });
            e.stopPropagation();
        },

        move_window_by_xy({x, y}){
            let dx = x - this.titlebar_dragging_x0,
                dy = y - this.titlebar_dragging_y0;
            this.window_x += dx;
            this.window_y += dy;
            this.titlebar_dragging_x0 = x;
            this.titlebar_dragging_y0 = y;
        },

        start_window_dragging(e){
            this.titlebar_dragging_handle = $desktop$.subscribe(
                "mousemove",
                ({x, y})=> this.move_window_by_xy({x, y})
            );
            this.titlebar_dragging_mouseup_handle = $desktop$.subscribe(
                "mouseup",
                ()=>{
                    this.stop_window_dragging();
                }
            );
            this.titlebar_dragging_x0 = e.clientX;
            this.titlebar_dragging_y0 = e.clientY;
        },

        stop_window_dragging(){
            if(this.titlebar_dragging_handle.unsubscribe){
                this.titlebar_dragging_handle.unsubscribe();
                this.titlebar_dragging_handle = false;
            }
            if(this.titlebar_dragging_mouseup_handle.unsubscribe){
                this.titlebar_dragging_mouseup_handle.unsubscribe();
                this.titlebar_dragging_mouseup_handle = false;
            }
        }
    }

}
</script>
