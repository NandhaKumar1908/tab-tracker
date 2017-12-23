<template>
 <panel title="Lyrics">
   <textarea v-model="lyrics">
   </textarea>
 </panel>
</template>

<script>
export default {
  props: [
    'lyrics'
  ]
}
</script>

<style scoped>
textarea {
 width: 100%;
 font-family: monospace;
 border: none;
 height: 320px;
 border-style: none;
 border-color: transparent;
 overflow: auto;
 padding: 40px;
}
</style>
