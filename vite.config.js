import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'i'
        })
      ],
      imports: ['vue', 'vue-router'],
      dirs: ['./src/api', './src/utils/**']
    }),
    Components({
      resolvers: [ElementPlusResolver(), IconsResolver()],
      dirs: ['src/**/components']
    }),
    Icons({
      autoInstall: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://112.124.32.48:8080/api', // 后端接口地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
