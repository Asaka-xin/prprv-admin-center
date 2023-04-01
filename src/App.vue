<script setup>
import { NConfigProvider, darkTheme } from 'naive-ui'
import MainLayout from '@/views/layout/MainLayout.vue'
import { useSettingStore } from '@/stores/setting'

// 应用主题
const theme = () => useSettingStore().current.dark ? darkTheme : null
// 主题重写
const override = {}
</script>

<template>
  <n-config-provider :theme="theme()" :theme-overrides="override">
    <n-message-provider>
      <main-layout/>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped>

</style>
