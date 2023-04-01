<script setup>

import { renderIcon, renderLink } from '@/views/common'
import { Home, Information, User } from '@vicons/carbon'
import { ref, watch } from 'vue'
import { useSettingStore } from '@/stores/setting'

const setting = useSettingStore()
const activeKey = ref()

// 监听路由变化
watch(
  () => activeKey.value,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      setting.current.route = newVal
    }
  }
)

const options = [
  {
    label: renderLink('/', '主页'),
    key: 'home',
    icon: renderIcon(Home)
  },
  {
    label: '用户',
    key: 'user',
    icon: renderIcon(User),
    children: [
      {
        label: renderLink('/manage/user', '活动用户'),
        key: 'manage-user'
      },
      {
        label: renderLink('/manage/permission', '权限管理'),
        key: 'manage-permission'
      },
      {
        label: renderLink('/manage/role', '角色管理'),
        key: 'manage-role'
      }
    ]
  },
  {
    label: renderLink('/about', '关于'),
    key: 'about',
    icon: renderIcon(Information)
  }
]
</script>

<template>
  <n-menu
      class="mt-2"
      v-model:value="activeKey"
      :options="options"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :accordion="true"
      :default-value="setting.current.route"
  />
</template>

<style scoped>

</style>
