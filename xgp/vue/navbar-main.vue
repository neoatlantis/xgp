<template>



<ul class="nav flex-column">
  <li class="nav-item" v-for="item in items">
    <a
        class="nav-link"
        :class="{ 'active': item.value == choice }"
        @click="$emit('changed', choice=item.value)" href="#"
    >
        {{ item.text }}
    </a>
  </li>
</ul>




</template>



<script>
export default {

    props: ["choice"],

    data: ()=>{ return {
        items: [
            { "text": "Key Management", value: "keymgr" },
            { "text": "New Message",    value: "newmsg" },
            { "text": "Read in a Message", value: "rdmsg" },
            { "text": "Documentation", value: "doc" },
        ]
    } },

}



</script>
