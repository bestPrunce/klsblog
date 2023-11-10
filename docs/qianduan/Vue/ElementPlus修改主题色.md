# Element+修改主题色.md

## 安装依赖

没有sass的安装sass
```javaScript
npm install -D sass sass-loader
```

element-plus官方文档中自动引入所需的两个依赖
```javaScript
npm install -D unplugin-vue-components unplugin-auto-import
```

## 第一步、照着element-plus官网给的方法配置自动引入

```javaScript
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default {
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
}
```

## 第二步、配置自定义主题

增加了一个预处理样式的配置，以及导入时读取预处理配置

```javaScript
// vite.config.js
import path from "path";
import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'

// 自动引入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {
  ElementPlusResolver
} from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // 配置资源路径
      "@/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 自定义的主题色
        additionalData: `@use "@/styles/element/index.scss" as *;`,
      },
    },
  },
  plugins: [
    vue(),
    // 自动引入
    AutoImport({
      resolvers: [ElementPlusResolver({
        // 自动引入修改主题色添加这一行，使用预处理样式，不添加将会导致使用ElMessage，ElNotification等组件时默认的主题色会覆盖自定义的主题色
        importStyle: "sass",
      })],
    }),
    Components({
      resolvers: [ElementPlusResolver({
        // 自动引入修改主题色添加这一行，使用预处理样式
        importStyle: "sass",
      })],
    })
  ],
});
```

## `@/styles/element/index.scss`

```javaScript
@forward "element-plus/theme-chalk/src/common/var.scss" with (
  $colors: (
    "primary": (
      "base": #3F9A12,
    ),
    "success": (
      "base": #67C23A,
    ),
    "warning": (
      "base": #E6A23C,
    ),
    "danger": (
      "base": #F56C6C,
    ),
    "error": (
      "base": #F56C6C,
    ),
    "info": (
      "base": #909399,
    ),
  ),

  $button-padding-horizontal: (
    "default": 80px
  )
);
```