import { defineConfig, loadEnv} from "vite";
import vue from "@vitejs/plugin-vue";

import { resolve } from 'path';
const pathResolve = (dir: string): any => {
	return resolve(__dirname, '.', dir);
};
export default defineConfig(({mode})=>{

  const env = loadEnv(mode, __dirname)
  return{
    base: env.VITE_BASE_URL,
    plugins: [vue()],
    resolve: {
      alias: {
        '@': pathResolve('./src/'),
      },
    },
    build: {
      rollupOptions: {
        external: [
          "streamSaver", 
        ],
      },
    },
    root: process.cwd(),
    server: {
      // port: 8080,
      proxy:{
        '/api': {
          target: 'https://netease-cloud-music-api-theta-nine-20.vercel.app',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }, 
      },
      // open: 'http://localhost:8080/'
    },
    css:{
      preprocessorOptions:{
        scss:{
          additionalData:'@import "@/assets/style/scssConfig.scss";'
        }
      }
    },
  }
 
});
