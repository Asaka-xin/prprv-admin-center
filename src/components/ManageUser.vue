<script setup>
import { h, inject, ref } from 'vue'
import { NButton, NDataTable, NSpace, NTag } from 'naive-ui'
import UserCreate from '@/views/drawer/UserCreate.vue'
import UserDetail from '@/views/drawer/UserDetail.vue'
import { useUserStore } from '@/stores/user'

const drawer = inject('drawer')
const renderDrawer = (component, width) => {
  drawer.width = width
  drawer.component = h(component, null, null)
  drawer.activated()
}

const users = useUserStore()

const renderTagType = (type, status) => {
  return h(NTag, {
    type,
    bordered: false
  }, { default: () => status })
}
const renderTags = (row) => {
  return h(NSpace, null, {
    // 如果是未验证用户，显示红色的未验证标签
    default:
        () => row.status.map(status => status === '未验证' ? renderTagType('error', status) : renderTagType('info', status))
  })
}

const renderActions = (row) => {
  const props = {
    secondary: true,
    size: 'small',
    type: 'primary',
    onClick: () => {
      users.manage.current = row
      renderDrawer(UserDetail, 42)
    }
  }
  return h(NButton, props, { default: () => '查看' }
  )
}
const createColumns = () => {
  return [
    {
      type: 'selection'
    },
    {
      title: 'UID',
      key: 'id'
    },
    {
      title: '用户',
      key: 'name',
      render: (row) => {
        return h(NButton, {
          text: true,
          onClick: () => {
            users.manage.current = row
            renderDrawer(UserDetail, 42)
          }
        }, { default: () => row.name })
      }
    },
    {
      title: '邮箱',
      key: 'email'
    },
    {
      title: '状态',
      key: 'status',
      render: renderTags
    },
    {
      title: '操作',
      key: 'actions',
      render: renderActions
    }
  ]
}

const pagination = {
  pageSize: 10
}

const checkedRowKeysRef = ref([])
const onSelectionChange = (keys) => {
  checkedRowKeysRef.value = keys
}

</script>
<template>
  <n-card>
    <n-space class="mb-4">
      <n-button-group>
        <n-button secondary @click="renderDrawer(UserCreate,50)">添加用户</n-button>
        <n-button secondary>删除用户</n-button>
        <n-button secondary>重置密码</n-button>
        <n-button secondary>导出用户</n-button>
        <n-button quaternary v-if="checkedRowKeysRef.length > 0">已选择{{ checkedRowKeysRef.length }}项</n-button>
      </n-button-group>
      <!-- 搜索 -->
      <n-space>
        <n-input-group>
          <n-input placeholder="搜索用户"/>
          <n-button secondary>搜索</n-button>
          <n-button secondary>重置</n-button>
        </n-input-group>
      </n-space>

    </n-space>
    <n-data-table
        :columns="createColumns()"
        :data="users.manage.list"
        :pagination="pagination"
        :row-key="record => record.id"
        @update:checked-row-keys="onSelectionChange"
    />
  </n-card>
</template>
