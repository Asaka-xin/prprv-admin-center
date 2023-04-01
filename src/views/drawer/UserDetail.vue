<script setup>
import { h, inject } from 'vue'
import { Password, Delete } from '@vicons/carbon'
import { BanOutline } from '@vicons/ionicons5'
import UpdateUserInfo from '@/views/drawer/inner/UpdateUserInfo.vue'
import { useUserStore } from '@/stores/user'

const drawer = inject('drawer')
const createInnerDrawer = (component) => {
  drawer.inner.component = h(component, null, null)
  drawer.inner.activated()
}

const user = useUserStore().manage.current
</script>

<template>
  <n-drawer-content :native-scrollbar="false">
    <template #header>
      <h2 class="m-0">用户详情</h2>
    </template>
    <!-- ### -->
    <n-space vertical class="mr-2 ml-2">
      <n-space>
        <n-button text>
          <n-avatar round :size="100" :src="fetchAvatar"/>
        </n-button>
        <n-space vertical class="ml-2">
          <h1 class="m-0">{{ user.name }}</h1>
          <n-button-group>
            <n-button class="p-2" strong quaternary type="info">
              <template #icon>
                <n-icon>
                  <Password/>
                </n-icon>
              </template>
              重置密码
            </n-button>
            <n-button class="p-2" strong quaternary type="info">
              <template #icon>
                <n-icon>
                  <BanOutline/>
                </n-icon>
              </template>
              阻止登录
            </n-button>
            <n-button class="p-2" strong quaternary type="info">
              <template #icon>
                <n-icon>
                  <Delete/>
                </n-icon>
              </template>
              删除用户
            </n-button>
          </n-button-group>
        </n-space>
      </n-space>

      <n-space vertical>
        <div>
          <h3>账户</h3>
        </div>
        <n-space vertical>
          <n-grid x-gap="24" y-gap="24" :cols="2">
            <n-gi>
              <n-space vertical>
                <h4 class="m-0">用户名</h4>
                <n-text>{{ user.name }}</n-text>
                <n-button text type="info" @click="createInnerDrawer(UpdateUserInfo)">管理用户名</n-button>
              </n-space>
            </n-gi>
            <n-gi>
              <n-space vertical>
                <h4 class="m-0">电子邮件</h4>
                <n-text>{{ user.email }}</n-text>
                <n-button text type="info">管理电子邮件</n-button>
              </n-space>
            </n-gi>
            <n-gi>
              <n-space vertical>
                <h4 class="m-0">上次登录时间</h4>
                <n-text>2023年3月23日 上午9:13</n-text>
                <n-button text type="info">查看最近30天</n-button>
              </n-space>
            </n-gi>
            <n-gi>
              <n-space vertical>
                <h4 class="m-0">角色</h4>
                <n-text>{{ user.authority }}</n-text>
                <n-button text type="info">管理角色</n-button>
              </n-space>
            </n-gi>
            <n-gi>
              <n-space vertical>
                <h4 class="m-0">电话号码</h4>
                <n-text>{{ user.phone }}</n-text>
                <n-button text type="info">管理联系人信息</n-button>
              </n-space>
            </n-gi>
          </n-grid>
        </n-space>

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
