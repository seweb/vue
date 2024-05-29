<script setup lang="ts">
import { defineProps } from 'vue'
import { useDate } from 'vue3-dayjs-plugin/useDate'

const props = defineProps({
  img: {
    type: String as () => string,
    required: true
  },
  username: {
    type: String as () => string,
    required: true
  },
  createdAt: {
    type: String as () => string,
    required: true
  }
})

const date = useDate()
</script>

<template>
  <router-link :to="`/${props.username}`">
    <img :src="props.img" />
  </router-link>
  <div class="info">
    <router-link :to="`/${props.username}`" class="author">{{
      props.username
    }}</router-link>
    <span class="date">{{ date(props.createdAt).format('MMMM DD') }}th</span>
  </div>
</template>
