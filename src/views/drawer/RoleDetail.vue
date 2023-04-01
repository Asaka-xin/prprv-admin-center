<script setup>
import { h, inject, ref } from 'vue'
import { PlayOutline } from '@vicons/ionicons5'
import { NButton } from 'naive-ui'
import UserDetail from '@/views/drawer/UserDetail.vue'

const drawer = inject('drawer')

const role = {
  label: '全局管理员',
  value: 'ROLE_ADMIN',
  description: '可无限制访问所有管理中心内的全部功能和全部数据',
  permission: [
    {
      label: '读取用户',
      value: 'user:read'
    },
    {
      label: '写入用户',
      value: 'user:write'
    }
  ]
}

const assignData = [
  {
    username: '未確認の庭師',
    email: 'user1@test.com'
  },
  {
    username: '魂魄妖梦',
    email: 'user2@test.com'
  }
]

const assignSelect = ref([])
const assignRemove = () => {
  assignSelect.value.forEach((email) => {
    assignData.splice(assignData.findIndex((user) => user.email === email), 1)
  })
  assignSelect.value = []
}
const assignColumns = [
  {
    type: 'selection'
  },
  {
    title: '用户',
    dataIndex: 'username',
    key: 'username'
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: '操作',
    render: (row) => {
      return h(NButton, {
        size: 'small',
        type: 'tertiary',
        secondary: true,
        onClick: () => {
          alert(row.email)
        }
      }, { default: () => '管理' })
    }
  }
]

</script>

<template>
    <n-drawer-content :native-scrollbar="false">
        <template #header>
            <h2 class="m-0">{{ role.label }}</h2>
        </template>
        <template #default>
            <n-popover trigger="hover">
                <template #trigger>
                    <n-button strong type="primary">
                        <template #icon>
                            <n-icon>
                                <PlayOutline/>
                            </n-icon>
                        </template>
                        运行方式
                    </n-button>
                </template>
                <span>以 <n-text style="font-weight: bold">{{ role.label }}</n-text> 角色查看并测试管理中心，将保存运行时所做的更改</span>
            </n-popover>

            <!-- ### -->
            <n-space class="mt-4" item-style="width: 100%">
                <n-tabs type="line" animated>
                    <n-tab-pane label="常规" name="basic">
                        <div>
                            <h4 class="mb-2">角色描述</h4>
                            <n-text>{{ role.description }}</n-text>
                        </div>
                        <div>
                            <h4 class="mb-2">应将此角色分配给谁？</h4>
                            <n-text>向需要执行以下操作的用户分配{{ role.label }}角色：</n-text>
                            <n-space vertical class="mt-2">
                                <n-space vertical class="ml-4">
                                    <li v-for="item in role.permission" :key="item.value">{{ item.label }}</li>
                                </n-space>
                            </n-space>
                        </div>
                        <n-space>
                            <n-grid x-gap="150" y-gap="48" :cols="2">
                                <n-gi>
                                    <div>
                                        <h4 class="mb-2">角色标识</h4>
                                        <n-text>{{ role.value }}</n-text>
                                    </div>
                                </n-gi>
                                <n-gi>
                                    <div>
                                        <h4 class="mb-2">已分配</h4>
                                        <n-text>0</n-text>
                                    </div>
                                </n-gi>
                            </n-grid>
                        </n-space>

                    </n-tab-pane>
                    <n-tab-pane label="分配" name="assign">
                        <n-space vertical>
                            <n-button-group>
                                <n-button secondary v-if="assignSelect.length>0" @click="assignRemove">移除分配({{
                                    assignSelect.length
                                    }})
                                </n-button>
                                <n-button secondary v-else>添加用户</n-button>
                            </n-button-group>
                            <n-data-table
                                    size="small"
                                    :single-column="false"
                                    :data="assignData"
                                    :columns="assignColumns"
                                    :row-key="record => record.email"
                                    v-model:checked-row-keys="assignSelect"
                            >
                                <template #empty>
                                    <div class="text-center justify-center">
                                        <h4>尚未向任何人分配此角色</h4>
                                        <div>选择“添加用户”以开始使用</div>
                                    </div>
                                </template>
                            </n-data-table>
                        </n-space>
                    </n-tab-pane>
                    <n-tab-pane label="权限" name="permission">
                        <!-- v-for role.permission -->
                        <n-tag class="m-1" strong closable size="large"
                               v-for="item in role.permission" :key="item.permission"

                        >
                            {{ item.label }} {{ item.value }}
                        </n-tag>
                    </n-tab-pane>
                </n-tabs>
            </n-space>
        </template>
        <!-- ### -->
    </n-drawer-content>
</template>

<style scoped>

</style>
