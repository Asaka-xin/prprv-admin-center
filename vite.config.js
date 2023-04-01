import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import unocss from 'unocss/vite'
import presetUno from '@unocss/preset-uno'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // https://github.com/unocss/unocss 原子CSS引擎
    // 默认预设包括 Tailwind CSS，Windi CSS 等通用预设
    unocss({
      presets: [presetUno()]
    }),
    Components({
      resolvers: [NaiveUiResolver()]
    })
  ],
  resolve: {
    alias: { // 别名配置，用于解决路径问题
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
