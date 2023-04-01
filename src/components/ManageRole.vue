<script setup>
import { h, inject, ref } from 'vue'
import { NButton, NPopover } from 'naive-ui'
import RoleDetail from '@/views/drawer/RoleDetail.vue'
import RoleCreate from '@/views/drawer/RoleCreate.vue'
import { queryRoleAll } from '@/api/role'

const drawer = inject('drawer')
const columns = [
  {
    title: '名称',
    dataIndex: 'label',
    key: 'label'
  },
  {
    title: '标识',
    dataIndex: 'value',
    key: 'value'
  },
  {
    title: '说明',
    dataIndex: 'description',
    key: 'description'
  }
]

queryRoleAll().then((res) => {
  // permission -> value, description -> label, name -> label
  console.log(res.data)
  role.value = res.data.map((item) => {
    return {
      label: item.name,
      value: item.role,
      description: item.description
    }
  })
})

const role = ref([
  {
    label: '',
    value: '',
    description: ''
  }
])
// const role = [
//   {
//     label: '全局管理员',
//     value: 'ROLE_ADMIN',
//     description: '可无限制访问所有管理中心内的全部功能和全部数据'
//   },
//   {
//     label: '用户管理员',
//     value: 'ROLE_USER_ADMIN',
//     description: '重置用户密码，创建和管理用户，并监视服务运行状况'
//   },
//   {
//     label: '全局读者',
//     value: 'ROLE_READER',
//     description: '可以查看所有管理中心的所有功能和数据'
//   },
//   {
//     label: '普通用户',
//     value: 'ROLE_USER',
//     description: '不能访问管理中心，只能访问前台'
//   }
// ]

const handleClick = (record) => {
  return {
    onClick: () => {
      drawer.width = 42
      drawer.component = h(RoleDetail, null, null)
      drawer.activated()
    }
  }
}

const createRole = () => {
  drawer.component = h(RoleCreate, null, null)
  drawer.activated()
}
</script>

<template>
    <n-card>
        <n-space class="mb-4">
            <n-button-group>
                <n-button type="primary" @click="createRole">创建角色</n-button>
            </n-button-group>
        </n-space>
        <n-data-table
                :columns="columns"
                :data="role"
                :rowKey="record => record.value"
                :row-props="handleClick"
        />
    </n-card>
</template>

<style scoped>

</style>
