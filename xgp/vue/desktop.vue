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

<div :class="$style.desktop">
    <div class="icons-desktop">
        <div
            v-for="item in items"
            :class="$style['icon-desktop']"
            @dblclick="on_icon_clicked(item.value)"
        >
            <div><img v-if="item.icon" :src="'./static/' + item.icon" /></div>
            {{ item.text }}
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
export default {

    props: ["choice"],

    data: ()=>{ return {
        items: [
            { "text": "Key Management", icon: "icon-doc.svg", value: "keymgr" },
            { "text": "New Message", icon: "icon-doc.svg", value: "newmsg" },
            { "text": "Read in a Message", icon: "icon-doc.svg", value: "rdmsg" },
            { "text": "Documentation", icon: "icon-doc.svg", value: "doc" },
        ]
    } },

    methods: {

        on_icon_clicked(e){
            this.$emit("start", e);
        }

    }

}



</script>
