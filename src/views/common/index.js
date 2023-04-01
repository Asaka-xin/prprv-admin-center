import { h, inject } from 'vue'
import { NIcon } from 'naive-ui'
import { RouterLink } from 'vue-router'

// 渲染图标
export const renderIcon = icon => () => h(NIcon, null, { default: () => h(icon) })

// 渲染路由链接, to: 路由地址 label: 路由名称
export const renderLink = (to, label) => () => h(RouterLink, { to }, { default: () => label })

