## 1、创建vue3项目

```javascript
pnpm create vite
```
## 2、配置eslint

```javascript
pnpm i eslit -D 
```

```javascript
npx eslint --init
```
安装eslint相关插件

```javascript
pnpm install -D eslint-plugin-vue eslint-plugin-node eslint-plugin-prettier eslint-config-prettier eslint-plugin-node @babel/eslint-parser
```
修改`.eslintrc.cjs`文件

```javascript
module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
        jest: true,
    },
    /* 指定如何解析语法 */
    parser: "vue-eslint-parser",
    /** 优先级低于 parse 的语法解析配置 */
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        parser: "@typescript-eslint/parser",
        jsxPragma: "React",
        ecmaFeatures: {
            jsx: true,
        },
    },
    /* 继承已有的规则 */
    extends: [
        "eslint:recommended",
        "plugin:vue/vue3-essential",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
    ],
    plugins: ["vue", "@typescript-eslint"],
    /*
     * "off" 或 0    ==>  关闭规则
     * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
     * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
     */
    rules: {
        // eslint（https://eslint.bootcss.com/docs/rules/）
        "no-var": "error", // 要求使用 let 或 const 而不是 var
        "no-multiple-empty-lines": ["warn", { max: 1 }], // 不允许多个空行
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-unexpected-multiline": "error", // 禁止空余的多行
        "no-useless-escape": "off", // 禁止不必要的转义字符

        // typeScript (https://typescript-eslint.io/rules)
        "@typescript-eslint/no-unused-vars": "error", // 禁止定义未使用的变量
        "@typescript-eslint/prefer-ts-expect-error": "error", // 禁止使用 @ts-ignore
        "@typescript-eslint/no-explicit-any": "off", // 禁止使用 any 类型
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-namespace": "off", // 禁止使用自定义 TypeScript 模块和命名空间。
        "@typescript-eslint/semi": "off",

        // eslint-plugin-vue (https://eslint.vuejs.org/rules/)
        "vue/multi-word-component-names": "off", // 要求组件名称始终为 “-” 链接的单词
        "vue/script-setup-uses-vars": "error", // 防止<script setup>使用的变量<template>被标记为未使用
        "vue/no-mutating-props": "off", // 不允许组件 prop的改变
        "vue/attribute-hyphenation": "off", // 对模板中的自定义组件强制执行属性命名样式
    },
};
```
添加`.eslintignore`文件并写入内容

```javascript
dist
node_modules
```
运行脚本（`package.json`里新增两个运行脚本）

```javascript
  "scripts": {
    "lint": "eslint src",
    "fix": "eslint src --fix"
  },
```
## 3、配置默认缩进4个空格
新建`.editorconfig`文件并写入如下内容

```javascript
# EditorConfig is awesome: https://EditorConfig.org

# top-most EditorConfig file
root = true

# Set default charset
[*]
charset = utf-8
indent_style = space
indent_size = 4
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

# Match JavaScript files
[*.js]
indent_size = 4

# Match TypeScript files
[*.ts]
indent_size = 4

# Match Vue files
[*.vue]
indent_size = 4
```
## 4、自动格式化Eslint校验：
新建`.vscode`文件夹，文件夹里放`settings.json`并写入如下内容

```javascript
{
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
      }
}
```
## 5、配置prettier

```javascript
pnpm install -D eslint-plugin-prettier prettier eslint-config-prettier
```
新建`.prettierrc.json`并写入如下内容

```javascript
{
  "singleQuote": true,
  "semi": false,
  "bracketSpacing": true,
  "htmlWhitespaceSensitivity": "ignore",
  "endOfLine": "auto",
  "trailingComma": "all",
  "tabWidth": 4
}
```
新建`.prettierignore`并写入如下内容

```javascript
/dist/*
/html/*
.local
/node_modules/**
**/*.svg
**/*.sh
/public/*
```
## 6、配置styleLint

```javascript
pnpm add sass sass-loader stylelint postcss postcss-scss postcss-html stylelint-config-prettier stylelint-config-recess-order stylelint-config-recommended-scss stylelint-config-standard stylelint-config-standard-vue stylelint-scss stylelint-order stylelint-config-standard-scss -D
```
新建`.stylelintrc.cjs`并写入如下内容

```javascript
// @see https://stylelint.bootcss.com/

module.exports = {
  extends: [
    'stylelint-config-standard', // 配置stylelint拓展插件
    'stylelint-config-html/vue', // 配置 vue 中 template 样式格式化
    'stylelint-config-standard-scss', // 配置stylelint scss插件
    'stylelint-config-recommended-vue/scss', // 配置 vue 中 scss 样式格式化
    'stylelint-config-recess-order', // 配置stylelint css属性书写顺序插件,
    'stylelint-config-prettier', // 配置stylelint和prettier兼容
  ],
  overrides: [
    {
      files: ['**/*.(scss|css|vue|html)'],
      customSyntax: 'postcss-scss',
    },
    {
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html',
    },
  ],
  ignoreFiles: [
    '**/*.js',
    '**/*.jsx',
    '**/*.tsx',
    '**/*.ts',
    '**/*.json',
    '**/*.md',
    '**/*.yaml',
  ],
  /**
   * null  => 关闭该规则
   * always => 必须
   */
  rules: {
    'value-keyword-case': null, // 在 css 中使用 v-bind，不报错
    'no-descending-specificity': null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
    'function-url-quotes': 'always', // 要求或禁止 URL 的引号 "always(必须加上引号)"|"never(没有引号)"
    'no-empty-source': null, // 关闭禁止空源码
    'selector-class-pattern': null, // 关闭强制选择器类名的格式
    'property-no-unknown': null, // 禁止未知的属性(true 为不允许)
    'block-opening-brace-space-before': 'always', //大括号之前必须有一个空格或不能有空白符
    'value-no-vendor-prefix': null, // 关闭 属性值前缀 --webkit-box
    'property-no-vendor-prefix': null, // 关闭 属性前缀 -webkit-mask
    'selector-pseudo-class-no-unknown': [
      // 不允许未知的选择器
      true,
      {
        ignorePseudoClasses: ['global', 'v-deep', 'deep'], // 忽略属性，修改element默认样式的时候能使用到
      },
    ],
  },
}
```
新建`.stylelintignore`并写入内容

```javascript
/node_modules/*
/dist/*
/html/*
/public/*
```
在`package.json`里添加，
其中 format 为格式化所有文件里的样式等

```javascript
 "scripts": {
    "format": "prettier --write \"./**/*.{html,vue,ts,js,json,md}\"",
    "lint:eslint": "eslint src/**/*.{ts,vue} --cache --fix",
    "lint:style": "stylelint src/**/*.{css,scss,vue} --cache --fix"
  },
```
## 7、配置husky
在上面我们已经集成好了我们代码校验工具，但是需要每次手动的去执行命令才会格式化我们的代码。如果有人没有格式化就提交了远程仓库中，那这个规范就没什么用。所以我们需要强制让开发人员按照代码规范来提交。

要做到这件事情，就需要利用husky在代码提交之前触发git hook(git在客户端的钩子)，然后执行`pnpm run format`来自动的格式化我们的代码。

```javascript
pnpm install -D husky
```

```javascript
npx husky-init
```
会在根目录下生成个一个.husky目录，在这个目录下面会有一个`pre-commit`文件，这个文件里面的命令在我们执行commit的时候就会执行

在`.husky/pre-commit`文件添加如下命令：

```javascript
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
pnpm run format
```
## 8、强制使用pnpm包管理器工具
团队开发项目的时候，需要统一包管理器工具,因为不同包管理器工具下载同一个依赖,可能版本不一样,
导致项目出现bug问题,因此包管理器工具需要统一管理！！！
在根目录创建`scritps/preinstall.js`文件，添加下面的内容

```javascript
if (!/pnpm/.test(process.env.npm_execpath || '')) {
  console.warn(
    `\u001b[33mThis repository must using pnpm as the package manager ` +
    ` for scripts to work properly.\u001b[39m\n`,
  )
  process.exit(1)
}
```
`package.json`里配置命令

```javascript
"scripts": {
	"preinstall": "node ./scripts/preinstall.js"
}
```
## 9、引入Element-plus并配置国际化中文和图标库

```javascript
pnpm install element-plus
```

```javascript
pnpm install @element-plus/icons-vue
```
main.ts在配置后代码，复制粘贴即可

```javascript
import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'

// eslint-disable-next-line
// @ts-expect-error 防止报错
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn,
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus)
app.mount('#app')
```
## 10、src别名的配置
`vite.config.ts`
```javascript
// vite.config.ts
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": path.resolve("./src") // 相对路径别名配置，使用 @ 代替 src
        }
    }
})
```
`tsconfig.json`

```javascript
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
    "paths": { //路径映射，相对于baseUrl
      "@/*": ["src/*"] 
    }
  }
}
```
## 11、环境变量的配置
项目根目录分别添加 开发、生产和测试环境的文件!
```javascript
.env.development
.env.production
.env.test
```
文件内容

```javascript
# 变量必须以 VITE_ 为前缀才能暴露给外部读取
NODE_ENV = 'development'
VITE_APP_TITLE = '硅谷甄选运营平台'
VITE_APP_BASE_API = '/dev-api'
```

```javascript
# 变量必须以 VITE_ 为前缀才能暴露给外部读取
NODE_ENV = 'production'
VITE_APP_TITLE = '硅谷甄选运营平台'
VITE_APP_BASE_API = '/prod-api'
```

```javascript
# 变量必须以 VITE_ 为前缀才能暴露给外部读取
NODE_ENV = 'test'
VITE_APP_TITLE = '硅谷甄选运营平台'
VITE_APP_BASE_API = '/test-api'
```
配置运行命令：`package.json`

```javascript
 "scripts": {
    "dev": "vite --open",
    "build:test": "vue-tsc && vite build --mode test",
    "build:pro": "vue-tsc && vite build --mode production",
    "preview": "vite preview"
  },
```
通过import.meta.env获取环境变量
## 12、SVG图标配置

```javascript
pnpm install vite-plugin-svg-icons -D
```
在`vite.config.ts`中配置插件

```javascript
// vite.config.ts
import { defineConfig } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vue from '@vitejs/plugin-vue'
import path from 'path'
export default defineConfig({
    plugins: [
        vue(),
        createSvgIconsPlugin({
            // Specify the icon folder to be cached
            iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
            // Specify symbolId format
            symbolId: 'icon-[dir]-[name]',
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
        },
    },
})
```
`main.ts`引入

```javascript
import 'virtual:svg-icons-register'
```
svg封装为全局组件
在`src/components`目录下创建一个`SvgIcon`组件:代表如下

```javascript
<template>
    <div>
        <svg :style="{ width: width, height: height }">
            <use :xlink:href="prefix + name" :fill="color"></use>
        </svg>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
    //xlink:href属性值的前缀
    prefix: {
        type: String,
        default: '#icon-',
    },
    //svg矢量图的名字
    name: String,
    //svg图标的颜色
    color: {
        type: String,
        default: '',
    },
    //svg宽度
    width: {
        type: String,
        default: '16px',
    },
    //svg高度
    height: {
        type: String,
        default: '16px',
    },
})
</script>
<style scoped></style>
```

在`src/components/index.ts`里：用于注册components文件夹内部全部全局组件！！！

```javascript
import SvgIcon from '@/components/SvgIcon/index.vue'
import type { App, Component } from 'vue'
const components: { [name: string]: Component } = { SvgIcon }
export default {
    install(app: App) {
        Object.keys(components).forEach((key: string) => {
            app.component(key, components[key])
        })
    },
}
```
在`main.ts`文件引入`src/components/index.ts`文件,通过app.use方法安装自定义插件

```javascript
import gloablComponent from '@/components/index';
app.use(gloablComponent);
```
## 13、集成sass
在`src/styles`目录下创建一个`index.scss`文件，当然项目中需要用到清除默认样式，因此在`index.scss`引入`reset.scss`

```javascript
@import "@/styles/reset.scss"
```
在main.ts里引入

```javascript
import '@/styles/index.scss'
```
给项目中引入全局变量（在`style`文件夹下创建一个`variable.scss`文件！）
在`vite.config.ts`文件配置如下:

```javascript
// vite.config.ts
import { defineConfig } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vue from '@vitejs/plugin-vue'
import path from 'path'
export default defineConfig({
    css: {
        preprocessorOptions: {
            scss: {
                javascriptEnabled: true,
                additionalData: '@import "./src/styles/variable.scss";',
            },
        },
    },
})
```
`@import "./src/styles/variable.less";`后面的`;`不要忘记，不然会报错!
ps: 定义以及使用颜色变量

```javascript
// /src/styles/variable.less
$color: red;
// 使用
.abc {
    color: $color;
}
```
## 14、mock数据

```javascript
pnpm install -D vite-plugin-mock@2.9.6 mockjs
```
在 vite.config.js 配置文件启用插件

```javascript
// vite.config.ts
import { defineConfig } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'
import path from 'path'
export default defineConfig(({ command }) => {
    return {
        plugins: [
            vue(),
            createSvgIconsPlugin({
                // Specify the icon folder to be cached
                iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
                // Specify symbolId format
                symbolId: 'icon-[dir]-[name]',
            }),
            viteMockServe({
                localEnabled: command === 'serve',
                mockPath: './src/mock',
            }),
        ],
        resolve: {
            alias: {
                '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    javascriptEnabled: true,
                    additionalData: '@import "./src/styles/variable.scss";',
                },
            },
        },
    }
})
```
在根目录创建mock文件夹:去创建我们需要mock数据与接口！！！
在`mock`文件夹内部创建一个`user.ts`文件

```javascript
type RequestBody = {
    username: string
    password: string
}
//用户信息数据
function createUserList() {
    return [
        {
            userId: 1,
            avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            username: 'admin',
            password: '111111',
            desc: '平台管理员',
            roles: ['平台管理员'],
            buttons: ['cuser.detail'],
            routes: ['home'],
            token: 'Admin Token',
        },
        {
            userId: 2,
            avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            username: 'system',
            password: '111111',
            desc: '系统管理员',
            roles: ['系统管理员'],
            buttons: ['cuser.detail', 'cuser.user'],
            routes: ['home'],
            token: 'System Token',
        },
    ]
}

export default [
    // 用户登录接口
    {
        url: '/api/user/login', //请求地址
        method: 'post', //请求方式
        response: ({ body }: { body: RequestBody }) => {
            //获取请求体携带过来的用户名与密码
            const { username, password } = body
            //调用获取用户信息函数,用于判断是否有此用户
            const checkUser = createUserList().find(
                (item) =>
                    item.username === username && item.password === password,
            )
            //没有用户返回失败信息
            if (!checkUser) {
                return { code: 201, data: { message: '账号或者密码不正确' } }
            }
            //如果有返回成功信息
            const { token } = checkUser
            return { code: 200, data: { token } }
        },
    },
    // 获取用户信息
    {
        url: '/api/user/info',
        method: 'get',
        response: (request: { headers: { token: any } }) => {
            //获取请求头携带token
            const token = request.headers.token
            //查看用户信息是否包含有次token用户
            const checkUser = createUserList().find(
                (item) => item.token === token,
            )
            //没有返回失败的信息
            if (!checkUser) {
                return { code: 201, data: { message: '获取用户信息失败' } }
            }
            //如果有返回成功信息
            return { code: 200, data: { checkUser } }
        },
    },
]
```
## 15、封装axios请求
	

```javascript
pnpm i axios
```
在根目录下创建`utils/request.ts`并写入如下代码

```javascript
import axios from 'axios'
import { ElMessage } from 'element-plus'
//创建axios实例
let request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 5000,
})
//请求拦截器
request.interceptors.request.use((config) => {
    return config
})
//响应拦截器
request.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        //处理网络错误
        let msg = ''
        let status = error.response.status
        switch (status) {
            case 401:
                msg = 'token过期'
                break
            case 403:
                msg = '无权访问'
                break
            case 404:
                msg = '请求地址错误'
                break
            case 500:
                msg = '服务器出现问题'
                break
            default:
                msg = '无网络'
        }
        ElMessage({
            type: 'error',
            message: msg,
        })
        return Promise.reject(error)
    },
)
export default request
```
在src目录下去创建api文件夹去统一管理项目的接口
例：

`/src/api/user/index.ts`

```javascript
//统一管理咱们项目用户相关的接口
import request from '@/utils/request'

import type { loginFormData, loginResponseData } from './type'

//项目用户相关的请求地址

enum API {
    LOGIN_URL = '/api/user/login',
}
//登录接口
export const reqLogin = (data: loginFormData) =>
    request.post<any, loginResponseData>(API.LOGIN_URL, data)
```
`/src/api/user/type.ts`

```javascript
export interface loginFormData {
    username: string
    password: string
}

interface dataType {
    token: string
}
export interface loginResponseData {
    code: number
    data: dataType
}
```
## 16、配置路由

```javascript
pnpm install vue-router@4
```
根目录创建views文件夹用来存放路由页面我新建的有
`/views/login、/views/404、/views/home`
根目录创建router文件夹
`/router/index.ts`

```javascript
import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRouter } from './routes'
const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRouter,
    // 滚动行为
    scrollBehavior: () => ({ left: 0, top: 0 }),
})
export default router
```
`/router/routes.ts`

```javascript
export const constantRouter = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue'),
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/404/index.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'any',
    },
]
```
`main.ts`引入使用

```javascript
import router from '@/router'
app.use(router)
```

`App.vue`

```javascript
<template>
    <router-view></router-view>
</template>
```
