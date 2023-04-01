<script setup>
import { inject } from 'vue'

const drawer = inject('drawer')

</script>

<template>
  <n-drawer-content :native-scrollbar="false">
    <template #header>
      <h2 class="m-0">添加用户</h2>
    </template>
    <!-- ### -->
    <n-space>
      <n-space vertical>
        <div>
          <h3>基本信息</h3>
          <n-text>首先请填写要添加为用户的人员的一些基本信息。</n-text>
        </div>
      </n-space>

    </n-space>
    <!-- ### -->
    <template #footer>
      <n-space>
        <n-button type="primary" @click="drawer.activated()">取消</n-button>
      </n-space>
    </template>
  </n-drawer-content>
</template>

<style scoped>

</style>
