<template>
  <fieldset class="form-group">
    <input
      :class="props.class"
      :type="props.type"
      :placeholder="props.placeholder"
      :value="props?.modelValue"
      @input="$emit('update:modelValue', handleInputChange($event))"
    />
    <div v-if="errorMessage" class="error-messages">
      {{ props.errorMessage }}
    </div>
  </fieldset>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'InputItem',
  props: {
    class: {
      type: String as PropType<string>
    },
    type: {
      type: String as PropType<string>,
      default: 'text'
    },
    placeholder: {
      type: String as PropType<string>
    },
    errorMessage: {
      type: String as PropType<string>
    },
    modelValue: {
      type: [String, Number] as PropType<string | number>
    }
  },
  emits: ['update:modelValue'],
  setup(props) {
    const handleInputChange = (event: Event) =>
      (event.target as HTMLInputElement).value

    return { props, handleInputChange }
  }
})
</script>
