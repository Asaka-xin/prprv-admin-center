<script setup>
import { computed, ref } from 'vue'
import { useMessage } from 'naive-ui'
import { CloseOutline, AddOutline, Help } from '@vicons/ionicons5'
import { queryPermissionAll, createPermission, deletePermission } from '@/api/permission'

const message = useMessage()

queryPermissionAll().then((res) => {
  permission.value = res.data
}).then(() => {
  message.success('已加载全部权限')
}).catch(() => {
  message.error('加载权限失败')
})

const permission = ref([])

const typeWith = (value) => {
  if (value.startsWith('/')) {
    return 'info'
  } else if (value.endsWith(':read')) {
    return 'primary'
  } else if (value.endsWith(':write') || value.endsWith(':all')) {
    return 'warning'
  } else {
    return 'success'
  }
}

const searchRef = ref('')
const createBuffer = ref('')
const create = () => {
  if (createBuffer.value.trim() !== '') {
    if (createBuffer.value.split(' ').length !== 2) {
      message.error('格式错误。示例：读取用户 user:read')
      return
    }
    // 分割格式：读取用户 user:read
    const [label, value] = createBuffer.value.split(' ')
    // 判断是否分割成功
    if (label === undefined || value === undefined) {
      message.error('格式错误。示例：读取用户 user:read')
      return
    }
    // 判断是否已存在
    if (permission.value.some((item) => item.permission === value)) {
      message.error('权限已存在')
      return
    }
    createPermission({
      description: label,
      permission: value
    }).then(() => {
      message.success('已添加权限 "' + label + ' ' + value + '"')
      permission.value.push({
        description: label,
        permission: value
      })
    }).catch(() => {
      message.error('添加权限失败')
    })
    createBuffer.value = ''
  }
}
const searchList = computed(() => {
  return permission.value.filter((item) => (item.description + ' ' + item.permission).includes(searchRef.value.trim()))
})

const removePermission = (item) => {
  const index = permission.value.findIndex((i) => i.value === item.value)
  if (index === -1) {
    message.error('权限不存在')
    return
  }
  deletePermission(item.permission).then(() => {
    message.success('已删除权限 "' + item.description + ' ' + item.permission + '"')
    permission.value.splice(index, 1)
  }).catch(() => {
    message.error('删除权限失败')
  })
}
</script>

<template>
  <n-space class="m-4" vertical>
    <n-space>
      <n-input-group>
        <n-input v-model:value="searchRef" placeholder="过滤显示"/>
        <n-button @click="searchRef=''" secondary>
          <n-icon size="20">
            <CloseOutline/>
          </n-icon>
        </n-button>
      </n-input-group>
      <n-input-group>
        <n-input v-model:value="createBuffer" placeholder="添加权限"/>
        <n-button @click="create" secondary>
          <n-icon size="20">
            <AddOutline/>
          </n-icon>
        </n-button>
      </n-input-group>
      <n-input-group>
        <n-popover trigger="hover">
          <template #trigger>
            <n-button strong secondary>
              <n-icon size="18">
                <Help/>
              </n-icon>
            </n-button>
          </template>
          <span>权限限制着角色能够访问管理中心的范围。权限的标识由两部分组成：描述和标识，并用空格分开。</span>
          <br><br>
          <span>添加一个功能或数据的访问权限，例如：<n-text style="font-weight: bold">读取用户 user:read</n-text></span>
          <br>
          <span>添加一个前端路由的访问权限，例如：<n-text style="font-weight: bold">路由访问 /manage/*</n-text></span>
          <br>
          <span>权限读写标识为 :read :write，将其添加到权限分类后面，例如：<n-text style="font-weight: bold">书籍产品的写入权限 product:book:write</n-text></span>
        </n-popover>
      </n-input-group>

    </n-space>
    <n-space class="mt-2">
      <n-tag strong closable size="large"
             @close="removePermission(item)"
             v-for="item in searchList" :key="item.permission"
             :type="typeWith(item.permission)"
      >
        {{ item.description }} {{ item.permission }}
      </n-tag>
    </n-space>
  </n-space>

</template>

<style scoped>

</style>
