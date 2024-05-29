<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface TextareaProps {
  class: string
  placeholder: string
  rows: number
  modelValue: string | number
  errorMessage?: string | undefined
}

const props = defineProps<TextareaProps>()

const emit = defineEmits<{
  (e: 'update'): void
}>()
const handleInputChange = (event: Event) =>
  (event.target as HTMLInputElement).value
</script>

<template>
  <fieldset class="form-group">
    <textarea
      :class="props.class"
      :placeholder="props.placeholder"
      :rows="rows"
      :value="props?.modelValue"
      @input="$emit('update:modelValue', handleInputChange($event))"
    />
    <div v-if="errorMessage" class="error-messages">
      {{ props.errorMessage }}
    </div>
  </fieldset>
</template>
