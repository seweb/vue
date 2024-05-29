<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
const props = defineProps({
  pagination: {
    type: Array as () => number[],
    required: true
  },
  activePage: {
    type: Number as () => number,
    required: true
  }
})

const emit = defineEmits<{
  (e: 'onPageClick', page: number): void
}>()
</script>

<template>
  <ul class="pagination">
    <li
      v-for="page in props.pagination"
      :key="page"
      class="page-item"
      :class="{ active: page === activePage }"
    >
      <a
        @click.prevent="emit('onPageClick', page)"
        class="page-link"
        href="#"
        >{{ page }}</a
      >
    </li>
  </ul>
</template>
