<script setup>
defineEmits(['update:show'])
const props = defineProps({
  drawer: {
    required: true
  }
})

</script>

<template>
  <n-drawer
      :show="props.drawer.active"
      :show-mask="'transparent'"
      :width="620"
      @update:show="props.drawer.activated()"
  >
    <component class="w-full" :is="props.drawer.component"/>
    <n-drawer
        :show="props.drawer.inner.active"
        :show-mask="'transparent'"
        @update:show="props.drawer.inner.activated()"
    >
      <component :is="props.drawer.inner.component"/>
    </n-drawer>
  </n-drawer>
</template>

<style scoped>

</style>
