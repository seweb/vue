<template>
  <div class="app">
    <Header />
    <Footer />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from './Header.vue'
import Footer from './Footer.vue'

export default defineComponent({
  name: 'Layout',
  components: {
    Header,
    Footer
  }
})
</script>
