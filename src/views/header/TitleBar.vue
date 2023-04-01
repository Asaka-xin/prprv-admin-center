<script setup>
import { MenuOutline } from '@vicons/ionicons5'
import { Sun, Moon, Search, UserAvatar, Logout } from '@vicons/carbon'

import { renderIcon } from '@/views/common'
import { useSettingStore } from '@/stores/setting'

const setting = useSettingStore()

const options = [
  {
    label: '用户资料',
    key: 'profile',
    icon: renderIcon(UserAvatar)
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon(Logout)
  }
]

const handleSelect = (option) => {
  alert(option)
}
</script>

<template>
  <n-card size="small">
    <n-space justify="space-between" class="h-10">
      <n-space>
        <!-- 侧边栏展开按钮 -->
        <n-button text class="h-10 w-10" @click="setting.current.collapsed = !setting.current.collapsed">
          <n-icon :size=22>
            <MenuOutline/>
          </n-icon>
        </n-button>
        <n-button strong text class="h-10 w-10">Prprv 365 管理中心</n-button>

      </n-space>
      <n-space>
        <n-button text class="h-10">
          <n-icon :size=20>
            <Search/>
          </n-icon>
        </n-button>
        <n-button text class="h-10 w-10" @click="setting.current.dark=!setting.current.dark">
          <n-icon :size=20>
            <template v-if="setting.current.dark">
              <Sun/>
            </template>
            <template v-else>
              <Moon/>
            </template>
          </n-icon>
        </n-button>
        <n-dropdown :options="options" @select="handleSelect">
          <n-space>
            <n-button text class="h-10">未確認の庭師</n-button>
            <n-button text class="h-10">
              <n-avatar round :size="40" src="http://q2.qlogo.cn/headimg_dl?dst_uin=2638836154&spec=100"/>
            </n-button>
          </n-space>
        </n-dropdown>
      </n-space>
    </n-space>
  </n-card>
</template>

<style scoped>

</style>
