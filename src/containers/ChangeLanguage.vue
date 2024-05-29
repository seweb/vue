<template>
  <button @click="changeLang">{{ lang }}</button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ChangeLanguage',
  setup() {
    let lang = ref<string>(locale)
    const { t, locale } = useI18n()

    const changeLang = () => {
      lang.value = locale.value === 'en' ? 'ua' : 'en'
      locale.value = lang.value
    }
    return {
      lang,
      locale,
      t,
      changeLang
    }
  }
})
</script>
