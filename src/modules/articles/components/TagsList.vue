<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  tags: string[]
}>()

const emits = defineEmits(['tagClicked'])
</script>

<template>
  <p>Popular Tags</p>
  <div class="tags-list">
    <a
      v-for="(tag, idx) in tags"
      :key="idx"
      href="#"
      class="tag-pill tag-default"
      @click.prevent="emits('tagClicked', tag)"
      >{{ tag }}</a
    >
  </div>
</template>
