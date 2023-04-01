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

        <n-upload multiple directory-dnd action="https://" :max="50">
            <n-upload-dragger>
                <div style="margin-bottom: 12px">
                    <n-icon size="48" :depth="3">
                        <CloudUpload />
                    </n-icon>
                </div>
                <n-text style="font-size: 16px">
                    点击或者拖动文件到该区域来上传
                </n-text>
                <n-p depth="3" style="margin: 8px 0 0 0">
                    请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
                </n-p>
            </n-upload-dragger>
        </n-upload>

</template>
