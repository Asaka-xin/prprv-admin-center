<script setup>
import { computed, h, ref, watch } from 'vue'
import { NTag, NText } from 'naive-ui'
import { queryPermissionAll } from '@/api/permission'
import { createRole } from '@/api/role'

const inputBuffer = ref({
  name: '',
  role: '',
  description: '',
  permission: []
})

const options = []

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

queryPermissionAll().then((res) => {
  // permission -> value, description -> label
  res.data.forEach((item) => {
    options.push({
      label: item.description,
      value: item.permission,
      type: typeWith(item.permission)
    })
  })
  // 根据 type 排序
  options.sort((a, b) => a.type.localeCompare(b.type))
})
const renderLabel = (option) => {
  return h(
    NTag,
    {
      type: option.type || 'default'
    },
    {
      default: () => option.label + ' ' + option.value
    }
  )
}
const renderTag = ({
  option,
  handleClose
}) => {
  return h(
    NTag,
    {
      type: option.type,
      closable: true,
      onMousedown: (e) => {
        e.preventDefault()
      },
      onClose: (e) => {
        e.stopPropagation()
        handleClose()
      }
    },
    { default: () => option.label + ' ' + option.value }
  )
}

const KeywordFilter = (pattern, option) => {
  return option.label.includes(pattern) || option.value.includes(pattern)
}

const submit = () => {
  createRole(inputBuffer.value).then((res) => {
    console.log(res)
  }).then(() => {
    window.location.reload()
  }).catch((err) => {
    console.log(err)
  })
}
</script>

<template>
    <n-drawer-content closable :native-scrollbar="false">
        <template #header>
            <h2 class="m-0">创建角色</h2>
        </template>
        <!-- ### -->
        <n-space>
            <n-space vertical>
                <div class="mb-4">
                    <h3>基本信息</h3>
                    <n-text>首先请填写要添加为角色的一些基本信息。</n-text>
                </div>
                <n-space vertical>
                    <n-grid x-gap="24" y-gap="24" :cols="2">
                        <n-gi>
                            <n-space vertical>
                                <h4 class="m-0">角色名称</h4>
                                <n-input v-model:value="inputBuffer.name" placeholder="请输入角色名称" class="w-full"/>
                            </n-space>
                        </n-gi>
                        <n-gi>
                            <n-space vertical>
                                <h4 class="m-0">唯一标识</h4>
                                <n-input-group>
                                    <n-input-group-label>ROLE_</n-input-group-label>
                                    <n-input v-model:value="inputBuffer.role" placeholder="请补充标识后缀"
                                             class="w-full"/>
                                </n-input-group>
                            </n-space>
                        </n-gi>
                    </n-grid>
                    <n-space vertical>
                        <h4 class="m-0">角色描述</h4>
                        <n-input v-model:value="inputBuffer.description" placeholder="请输入角色描述" class="w-full"/>
                    </n-space>
                </n-space>

            </n-space>
            <n-collapse>
                <div class="mb-4">
                    <h3>权限分配</h3>
                    <n-text>你可选择要分配给此角色的权限。输入关键字可显示相关权限。</n-text>
                </div>
                <n-select
                        placeholder="请选择权限"
                        multiple
                        :options="options"
                        :render-label="renderLabel"
                        :render-tag="renderTag"
                        filterable
                        :filter="KeywordFilter"
                        v-model:value="inputBuffer.permission"
                >
                </n-select>

            </n-collapse>
            {{ inputBuffer }}
        </n-space>
        <!-- ### -->
        <template #footer>
            <n-space>
                <n-button type="primary" @click="submit()">添加完成</n-button>
                <n-button type="primary" @click="drawer.activated()">取消</n-button>
            </n-space>
        </template>
    </n-drawer-content>
</template>

<style scoped>

</style>
