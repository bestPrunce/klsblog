## 新建项目步骤略过
## 1、下载scss
无需任何配置就可以直接使用scss了
```javascript
pnpm install sass
```
使用scss配置全局颜色变量
新建`/src/styles/variable.scss`并在

```css
$primary: #76aef9
```
在`vite.cinfig.js`里配置

```javascript
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: '@import "./src/styles/variable.scss";',
      },
    },
  },
});
```

在组件里使用颜色变量

```css
h1 {
	color: $primary
}
```

## 2、配置@/路径为/src
下载`@types/node`模块用于引入path模块

```javascript
pnpm install @types/node
```
在`vite.cinfig.js`里配置

```javascript
import path from 'path'
export default defineConfig({
  resolve: {
    alias:{
        '@': path.resolve(__dirname, './src') //设置路径别名，需要引用/src下面的文件时只需要在前面添加@即可
    },
    extensions: ['.js', '.ts', '.json', '.tsx'] // 导入时想要省略的扩展名列表
  },
})
```
## 3、重置样式
如果存在index.css，建议删除该文件以及文件引入
新建`/src/styles/reset.scss`并在`main.tsx`中引入

```javascript
import '@/styles/reset.scss'
```
```css
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
```
## 4、配置eslint

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
## 5、配置默认缩进4个空格
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
## 6、自动格式化Eslint校验：
新建`.vscode`文件夹，文件夹里放`settings.json`并写入如下内容

```javascript
{
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
      }
}
```
## 7、配置prettier

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
## 8、配置styleLint

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
在package.json里添加，
其中 format 为格式化所有文件里的样式等

```javascript
 "scripts": {
    "format": "prettier --write \"./**/*.{html,vue,ts,js,json,md}\"",
    "lint:eslint": "eslint src/**/*.{ts,vue} --cache --fix",
    "lint:style": "stylelint src/**/*.{css,scss,vue} --cache --fix"
  },

```
## 9、配置husky
在上面我们已经集成好了我们代码校验工具，但是需要每次手动的去执行命令才会格式化我们的代码。如果有人没有格式化就提交了远程仓库中，那这个规范就没什么用。所以我们需要强制让开发人员按照代码规范来提交。

要做到这件事情，就需要利用husky在代码提交之前触发git hook(git在客户端的钩子)，然后执行`pnpm run format`来自动的格式化我们的代码。

```javascript
pnpm install -D husky
```

```javascript
npx husky-init
```
## 10、强制使用pnpm包管理器工具
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
## 11、引入antd

```javascript
pnpm install antd --save
```
由于antd默认是英文，所以我们要把他改成中文，配置国际化
`main.tsx`

```javascript
import zhCN from 'antd/locale/zh_CN'
import { ConfigProvider } from 'antd'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ConfigProvider locale={zhCN}>
            <App />
        </ConfigProvider>
    </React.StrictMode>,
)
```
// 主题配置待会写

## 12、SVG图标配置
配置完成之后使用组件就会自动查找`/src/assets/icons`路径下name为文件名的svg文件
```javascript
pnpm install vite-plugin-svg-icons -D
```
在`vite.config.ts`中配置插件

```javascript
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
export default defineConfig({
    plugins: [
        react(),
        createSvgIconsPlugin({
            // Specify the icon folder to be cached
            iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
            // Specify symbolId format
            symbolId: 'icon-[dir]-[name]',
        }),
    ],
})
```
`main.tsx`引入

```javascript
import 'virtual:svg-icons-register'
```
封装svg组件（暂不封装全局组件，别问，问就是不会，还没空了解）
`src/components/SvgIcon/index.tsx`:

```javascript
interface SvgIconProps {
    prefix?: string | undefined
    name: string
    color?: string | undefined
    width?: string | undefined
    height?: string | undefined
}
const SvgIcon = ({
    prefix = '#icon-',
    name,
    color = '',
    width = '16px',
    height = '16px',
}: SvgIconProps) => {
    return (
        <svg style={{ width, height }}>
            <use xlinkHref={prefix + name} fill={color}></use>
        </svg>
    )
}
export default SvgIcon
```
使用(待更新全局组件)

```javascript
// 不使用@/导入是因为@/导入会报ts类型错误，待解决
import SvgIcon from './components/SvgIcon/index'
const App = () => (
    <div className="App">
        <SvgIcon name="react" color="orange" width="100px" height="100px" />
    </div>
)

export default App
```
