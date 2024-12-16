import { defineConfig } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'

import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
    return {
        plugins: [vue(),
        //svg配置
        createSvgIconsPlugin({
            iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
            symbolId: 'icon-[dir]-[name]',
        }),
        //mock配置
        viteMockServe({
            enable: command === 'serve',
        }),
        ],

        //配置端口
        server: {
            port: 5176,
            proxy: {
                '/api': {
                    target: 'http://sph-api.atguigu.cn',
                    changeOrigin: true,
                    //路径重写，api替换为空
                    rewrite: (path) => path.replace(/^\/api/, '')
                  }
            }
        },

        //别名配置
        resolve: {
            alias: {
                '@': path.resolve('src')  // 确保路径别名 '@' 指向 'src' 目录
            }
        },

        //cass全局变量配置
        css: {
            preprocessorOptions: {
                scss: {
                    // javasc
                    additionalData: `@use "@/styles/variables.scss" as *;`, // 你可以根据需要修改路径
                },
            },
        },
    }
})
