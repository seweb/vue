<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import Loader from '@/components/Loader.vue'

interface ButtonProps {
  class: string
  type: 'button' | 'submit' | 'reset' | undefined
  disabled?: boolean
  text: string
  isLoading?: boolean
}

const props = defineProps<ButtonProps>()

const emit = defineEmits<{
  (e: 'submit'): void
}>()
</script>

<template>
  <button
    :class="props.class"
    :type="props.type"
    :disabled="props.disabled"
    @submit="emit('submit')"
  >
    <span class="button-text">{{ props.text }}</span>
    <span v-if="isLoading" class="loader-wrapper"><Loader /></span>
  </button>
</template>

<style scoped lang="scss">
.loader-wrapper {
  position: relative;
  top: 3px;
  left: 5px;
}
</style>
