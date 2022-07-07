import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 8080,
    proxy:{
      '/api': {
        target: 'https://netease-cloud-music-api-theta-nine-20.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }, 
    },
    open: 'http://localhost:8080/'

  },
  css:{
    preprocessorOptions:{
      scss:{
        additionalData:'@import "@/assets/style/scssConfig.scss";'
      }
    }
  },
  
});
