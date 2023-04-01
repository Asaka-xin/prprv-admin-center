<script setup>
import { provide, reactive, ref } from 'vue'
import SideMenu from '@/views/sider/SideMenu.vue'
import TitleBar from '@/views/header/TitleBar.vue'
import { useSettingStore } from '@/stores/setting'
import DrawerView from '@/views/drawer/_DrawerView.vue'

const drawer = reactive({
  active: false,
  width: 50,
  activated: () => (drawer.active = !drawer.active),
  component: null,
  inner: {
    active: false,
    activated: () => (drawer.inner.active = !drawer.inner.active),
    component: null
  }
})

provide('drawer', drawer)

</script>

<template>
  <n-layout has-sider>
    <!-- 左：侧边栏菜单 -->
    <n-layout-sider
        :native-scrollbar="false"
        class="h-screen"
        collapse-mode="width"
        :collapsed="useSettingStore().current.collapsed"
        :collapsed-width="64"
        :width="240"
        :show-trigger="false"
        bordered
    >
      <side-menu/>
    </n-layout-sider>
    <!-- 右：主体内容 -->
    <n-layout>
      <!-- 右上：头部 -->
      <n-layout-header>
        <title-bar/>
      </n-layout-header>
      <!-- 右下：内容 -->
      <n-layout-content>
        <router-view/>
      </n-layout-content>
    </n-layout>
  </n-layout>
  <!-- 全局抽屉 -->
  <drawer-view :drawer="drawer"/>
</template>

<style scoped>

</style>
