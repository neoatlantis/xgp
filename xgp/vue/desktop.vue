<i18n>{
    zh: {
        KEYMGR: "密钥管理",
        NEWMSG: "创建消息",
    },

    en: {
        KEYMGR: "Key Management",
        NEWMSG: "New Message",
    }
}</i18n>
<style module>
.desktop {
  background-color: #3b6ea5;
  /*background-position: center;
  background-size: cover;*/
  width: 100%;
  height: 100%;
  top: 0; left: 0; position: fixed;
  display: flex;
}

.icon-desktop {
  padding: 4px 8px 4px 8px;
  border: 2px solid transparent;
  text-align: center;
  margin-bottom: 32px;
  color: white;
  user-select: none;
  --webkit-user-select: none;
}

.icon-desktop a {
  display: block;
  text-decoration: none;
  cursor: default;
}

.icon-desktop img {
  height: 48px;
  width: 48px;
}

.icon-desktop span {
  display: block;
  color: white;
  font-size: 11px;
  text-align: center;
}

.icon-desktop:hover {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.icon-desktop:first-child {
  margin-top: 5px;
}
</style>





<template>

<div
    :class="$style.desktop"
    @mousemove="on_mousemove"
    @mouseup="on_mouseup"
    @mousedown="on_mousedown"
>
    <div class="icons-desktop">
        <div
            v-for="item in items"
            :class="$style['icon-desktop']"
            @dblclick="on_icon_clicked(item.value)"
        >
            <div><img v-if="item.icon" :src="'./static/' + item.icon" /></div>
            {{ $t(item.text) }}
        </div>
    </div>
</div>

<!--<ul class="nav flex-column">
  <li class="nav-item" v-for="item in items">
    <a
        class="nav-link"
        :class="{ 'active': item.value == choice }"
        @click="$emit('changed', choice=item.value)" href="#"
    >
        {{ item.text }}
    </a>
  </li>
</ul>-->
</template>



<script>
import { $desktop$ } from "xgp/channels";



export default {

    props: ["choice"],

    data: ()=>{ return {
        items: [
            { "text": "KEYMGR", icon: "icon-doc.svg", value: "keymgr" },
            { "text": "NEWMSG", icon: "icon-doc.svg", value: "newmsg" },
            { "text": "Read in a Message", icon: "icon-doc.svg", value: "rdmsg" },
            { "text": "Documentation", icon: "icon-doc.svg", value: "doc" },
        ]
    } },

    methods: {

        on_icon_clicked(e){
            this.$emit("start", e);
        },

        on_mouseup(e){
            $desktop$.publish("mouseup", { x: e.clientX, y: e.clientY });
        },
        on_mousedown(e){
            $desktop$.publish("mousedown", { x: e.clientX, y: e.clientY });
        },
        on_mousemove(e){
            $desktop$.publish("mousemove", { x: e.clientX, y: e.clientY });
        },


    }

}



</script>
