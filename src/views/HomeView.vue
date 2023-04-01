<script setup>
import { ref, h } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import {
  NSpace, NLayout, NLayoutSider, NLayoutContent, NButton, NDropdown, useMessage, NText,
  NMenu, NIcon, NCard, NAvatar, NConfigProvider, darkTheme, NAffix,
  NBreadcrumb, NBreadcrumbItem, NImage, NImageGroup, NUpload, NUploadDragger
} from 'naive-ui'
import HeaderView from '@/views/header/HeaderView.vue'
import { List, Home, Sun, Moon, Image, Information, CloudUpload, Settings, Search, Notification } from '@vicons/carbon'
// 渲染边栏菜单图标
const renderIcon = icon => () => h(NIcon, null, { default: () => h(icon) })
// 渲染路由链接
const renderLink = (to, label) => () => h(RouterLink, { to }, { default: () => label })
// 当前激活的边栏菜单项
const activeKey = ref(null)
// 边栏菜单项
const menuOptions = [
  {
    label: renderLink('/', '首页'),
    key: 'home',
    icon: renderIcon(Home)
  },
  {
    label: '图床',
    key: 'pic',
    icon: renderIcon(Image),
    children: [
      {
        label: renderLink('/pic/upload', '上传'),
        key: 'pic-upload'
      },
      {
        label: renderLink('/pic/list', '相册'),
        key: 'pic-list'
      },
      {
        label: renderLink('/pic/config', '配置'),
        key: 'pic-config'
      }
    ]
  },
  {
    label: '设置',
    key: 'settings',
    icon: renderIcon(Settings),
    children: [
      {
        label: renderLink('/manage/user', '用户管理'),
        key: 'settings-user'
      },
      {
        label: renderLink('/manage/permission', '权限管理'),
        key: 'settings-permission'
      },
      {
        label: renderLink('/manage/role', '角色管理'),
        key: 'settings-role'
      }
    ]
  },
  {
    label: '关于',
    key: 'about',
    icon: renderIcon(Information)
  }
]

// 主题重写
const themeOverrides = {}

const imageList = [
  {
    scaled: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
    original: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
    alt: '07akioni'
  },
  {
    scaled: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
    original: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
    alt: '07akioni'
  }
]

const containerRef = ref(0)

const showNotifications = ref(false)

const theme = ref(null)

const toggleTheme = () => {
  // 如果 theme 为 null，则使用 darkTheme 黑色主题，否则使用 null (默认亮色主题 lightTheme)
  theme.value = theme.value === null ? darkTheme : null
}

// 边栏是否折叠
const collapsed = ref(false)

</script>

<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
    <div>
      <n-space vertical size="large">
        <n-layout position="absolute" has-sider>
          <n-layout-sider
              :native-scrollbar="false"
              class="h-screen shadow-md"
              collapse-mode="width"
              :collapsed="collapsed"
              :collapsed-width="64"
              :width="240"
              :show-trigger="false"
              bordered
          >
            <n-menu
                class="mt-2"
                v-model:value="activeKey"
                :options="menuOptions"
                :collapsed-width="64"
                :collapsed-icon-size="22"
                :accordion="true"
            />
          </n-layout-sider>
          <n-layout :native-scrollbar="false">

            <header-view
                :collapsed="() => collapsed = !collapsed"
                :toggle-theme="toggleTheme"
                :theme="theme"
            />

            <n-layout-content ref="containerRef" :native-scrollbar="false">
              <n-card size="small" hoverable class="card mt-20 m-4 w-auto shadow">
                <RouterView/>
              </n-card>
            </n-layout-content>
          </n-layout>
        </n-layout>
      </n-space>
    </div>
  </n-config-provider>
</template>

<style scoped>
/* 圆角 */
.round {
  border-radius: 50%;
}
</style>
