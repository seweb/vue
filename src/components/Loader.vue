<template><span class="loader" /></template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Loader'
})
</script>

<style scoped lang="scss">
.loader {
  width: 20px;
  height: 20px;
  border: 3px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
