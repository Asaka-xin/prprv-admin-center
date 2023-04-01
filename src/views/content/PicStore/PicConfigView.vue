<script setup>
import { ref, h } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import {
  NSpace, NLayout, NLayoutSider, NLayoutContent, NButton,
  NMenu, NIcon, NCard, NAvatar, NConfigProvider, darkTheme,
  NBreadcrumb, NBreadcrumbItem, NImage, NImageGroup, NUpload, NUploadDragger
} from 'naive-ui'
import { List, Home, Sun, Moon, Image, Information, CloudUpload, Settings, Search, Notification } from '@vicons/carbon'
</script>

<template>
    <!-- 图片列表 -->
    <n-card size="small" hoverable class="card m-4 w-auto shadow">
            <n-image-group>
              <n-space>
                <n-image
                  v-for="(image,index) in imageList"
                  :key="index"
                  :src="image.scaled"
                  :alt="image.alt"
                  :width="200"
                  :height="200"
                  :preview-src="image.original"
                  :lazy="true"
                />

              </n-space>
            </n-image-group>
          </n-card>
</template>
