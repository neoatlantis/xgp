<template>

   
<div class="card">
  <div class="card-header">
    {{ title }}
    <button type="button" class="close" aria-label="Close" @click.stop="$emit('close')">
        <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="card-body"><slot></slot></div>
</div>

</template>


<script>
export default {
    "props": ["title"],
}
</script>
