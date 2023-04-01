<script setup>
import { ref } from 'vue'
import { NSpace, NProgress, NButton } from 'naive-ui'
const percentage = ref(0)
const add = () => {
  percentage.value += 10
  if (percentage.value > 100) {
    percentage.value = 100
  }
}
const minus = () => {
  percentage.value -= 10
  if (percentage.value < 0) {
    percentage.value = 0
  }
}

</script>

<template>
    <n-space vertical>
      <n-space>
        <n-progress type="circle" :percentage="percentage" />
        <n-progress type="circle" status="info" :percentage="percentage" />
        <n-progress type="circle" status="success" :percentage="percentage" />
        <n-progress type="circle" status="warning" :percentage="percentage" />
        <n-progress type="circle" status="error" :percentage="percentage" />
      </n-space>
      <n-space>
        <n-button @click="minus">
          减 10%
        </n-button>
        <n-button @click="add">
          加 10%
        </n-button>
      </n-space>
    </n-space>
  </template>
