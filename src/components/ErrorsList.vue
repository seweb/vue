<script setup lang="ts">
import { defineProps } from 'vue'
import { ServerErrorsType } from '@/types/apiTypes'

const props = defineProps<{ errors?: ServerErrorsType }>()
</script>

<template>
  <ul v-if="props.errors" class="error-messages">
    <li v-for="(value, key) in errors" :key="key">
      {{ key }}: {{ value.join(' ') }}
    </li>
  </ul>
</template>
