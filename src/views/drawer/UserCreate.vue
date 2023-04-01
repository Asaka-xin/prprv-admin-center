<script setup>
import { computed, inject, ref, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { useMessage } from 'naive-ui'

const drawer = inject('drawer')
const message = useMessage()
const users = useUserStore()
const formRef = ref(null)

const user = ref({
  id: '',
  name: '',
  email: '',
  password: '',
  options: {
    random: true,
    modify: false,
    send: false
  },
  role: 'ROLE_USER',
  status: ['未验证', '新用户'],
  authority: [],
  profile: {
    phone: '',
    gender: '',
    birthday: null,
    avatar: '',
    introduction: ''
  }
})

const rules = {
  name: [
    {
      required: true,
      message: '请提供用户名称',
      trigger: 'blur'
    },
    {
      min: 2,
      max: 12,
      message: '用户名长度需为2-12位',
      trigger: ['blur']
    }
  ],
  email: [
    {
      required: true,
      message: '请提供用户邮箱',
      trigger: 'blur'
    },
    {
      type: 'email',
      message: '邮箱格式不正确',
      trigger: ['blur']
    }
  ],
  phone: [
    {
      pattern: /^1[3456789]\d{9}$/,
      message: '手机号格式不正确',
      trigger: ['blur']
    }
  ],
  password: [
    {
      required: true,
      message: '请提供用户密码',
      trigger: 'blur'
    },
    {
      min: 6,
      max: 32,
      message: '密码长度需为6-32位',
      trigger: ['blur']
    }
  ]
}

// 生成8位随机密码，包含大小写字母和数字、特殊字符
const randomPassword = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789!@#$%&_+'
  let password = ''
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}

// 监听是否需要自动生成密码
watch(() => user.value.options.random, (random) => {
  user.value.password = random ? randomPassword() : ''
}, { immediate: true })

// 判断头像是URL地址还是QQ号，如果是QQ号则转换为URL地址
const fetchAvatar = computed(() => {
  const avatar = user.value.profile.avatar
  if (avatar && avatar.length > 5) {
    if (avatar.indexOf('http') === 0) {
      return avatar
    } else {
      return `https://q1.qlogo.cn/g?b=qq&nk=${avatar}&s=100`
    }
  }
  return ''
})

const submit = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      user.value.id = (users.manage.list.length + 1).toString()
      users.manage.list.push(user.value)
      message.success('添加成功')
      drawer.activated()
    } else {
      // 错误信息格式 [[{}],[{}]]
      errors.forEach((error) => {
        message.error(error[0].message)
      })
    }
  })
}
</script>

<template>
  <n-drawer-content closable :native-scrollbar="false">
    <template #header>
      <h2 class="m-0">添加用户</h2>
    </template>
    <!-- ### -->
    <n-space>
      <n-space vertical>
        <div>
          <h3>基本信息</h3>
          <n-text>首先请填写要添加为用户的人员的一些基本信息。</n-text>
        </div>
        <n-form ref="formRef" :model="user" :rules="rules">
          <n-form-item label="名称" path="name">
            <n-input v-model:value="user.name" placeholder=""/>
          </n-form-item>
          <n-form-item label="邮箱" path="email">
            <n-input v-model:value="user.email" placeholder=""/>
          </n-form-item>
          <n-space vertical>
            <n-checkbox v-model:checked="user.options.random" label="自动创建密码"/>
            <template v-if="!user.options.random">
              <n-form-item label="密码" path="password">
                <n-input type="password" v-model:value="user.password" placeholder=""/>
              </n-form-item>
            </template>
            <n-checkbox v-model:checked="user.options.modify" label="要求此用户在首次登录时更改其密码"/>
            <n-checkbox v-model:checked="user.options.send" label="完成时通过电子邮件发送密码"/>
          </n-space>
        </n-form>
      </n-space>

      <n-collapse>
        <div>
          <h3>可选设置</h3>
          <n-text>你可选择要分配给此用户的角色，并填写其他个人资料信息。</n-text>
        </div>
        <n-collapse-item>
          <template #header>
            <h4 class="m-0">{{ user.role === 'ROLE_USER' ? '角色 (用户: 没有管理权限)' : '角色' }}</h4>
          </template>
          <n-space vertical class="ml-6">
            <n-radio-group v-model:value="user.role">
              <n-space vertical>
                <n-radio value="ROLE_USER" @change="user.authority = []" label="用户(没有管理中心访问权限)"/>
                <n-radio value="ROLE_ADMIN" label="管理中心访问权限"/>
              </n-space>
            </n-radio-group>
            <n-checkbox-group :disabled="user.role === 'ROLE_USER'" v-model:value="user.authority">
              <n-space vertical class="ml-6">
                <n-checkbox value="admin:write" label="全局写入权限"/>
                <n-checkbox value="admin:read" label="全局读取权限"/>
              </n-space>
            </n-checkbox-group>
          </n-space>
        </n-collapse-item>
        <n-collapse-item>
          <template #header>
            <h4 class="m-0">个人信息资料</h4>
          </template>
          <!-- user.profile -->
          <n-space vertical class="ml-6">
            <n-form :model="user.profile" :rules="rules">
              <n-form-item label="电话" path="phone">
                <n-input v-model:value="user.profile.phone" placeholder=""/>
              </n-form-item>
              <n-space justify="space-between">
                <n-form-item label="性别">
                  <n-radio-group v-model:value="user.profile.gender">
                    <n-radio value="male" label="男"/>
                    <n-radio value="female" label="女"/>
                  </n-radio-group>
                </n-form-item>
                <n-form-item label="生日" path="birthday">
                  <n-date-picker v-model:value="user.profile.birthday" type="date" placeholder=""/>
                </n-form-item>
              </n-space>
              <!-- 头像url -->
              <n-form-item label="头像" path="avatar">
                <n-button text class="h-10 mr-4">
                  <n-avatar round :size="40" :src="fetchAvatar"/>
                </n-button>
                <n-input type="text" v-model:value="user.profile.avatar" placeholder="图片URL / QQ号码"/>
              </n-form-item>
              <!-- 介绍 -->
              <n-form-item label="个人签名" path="introduction">
                <n-input maxlength="30" show-count type="text" v-model:value="user.profile.introduction"
                         placeholder="什么都没有写"/>
              </n-form-item>

            </n-form>
          </n-space>
        </n-collapse-item>
      </n-collapse>
      {{ user }}
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
