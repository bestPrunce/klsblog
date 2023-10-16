import { defineConfig } from 'vitepress'
import vueIcon from '../public/svg/vueIcon'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "帅气的小恐龙的博客～",
  description: "个人心得知识分享",
  base: '/klsblog/',
  locales: {
    '/': {
      lang: 'zh-CN',
      label: '简体中文'
    }
  },
  head: [
    ['link', { rel: 'icon', href: '/images/global/logo.png' }]
  ],
  themeConfig: {
    logo: '/images/global/logo.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '前端', 
        items: [
          { text: 'JavaScript', link: '/qianduan/javaScript/index.md' },
          { text: 'Vue', link: '/qianduan/vue/index.md' },
          { text: 'React', link: '/qianduan/react/index.md' },
          { text: '正则', link: '/qianduan/regexp/index.md' },
        ]},
      { text: 'Examples', link: '/markdown-examples' }
    ],
    sidebar: {
      '/markdown-examples': [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
      ],
      '/api-examples': [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
      ],
      '/qianduan/javaScript/': [
          { text: '📄 JavaScript简介', link: '/qianduan/javaScript/index.md' },
          { text: '📄 闭包', link: '/qianduan/javaScript/闭包.md' },
          { text: '📄 promise', link: '/qianduan/javaScript/promise.md' },
      ],
      '/qianduan/vue/': [
          { text: `<div style="display:flex; align-items:center">${vueIcon()}<div style="margin-left: 6px;">Vue简介</div></div>`, link: '/qianduan/vue/index.md' },
          { text: '📄 Vue3项目搭建', link: '/qianduan/vue/vue3项目搭建.md' },
          { text: '📄 Vue二进制流文件下载Excel', link: '/qianduan/vue/vue二进制流文件下载Excel.md' },
      ],
      '/qianduan/react/': [
          { text: `📄 React简介`, link: '/qianduan/react/index.md' },
          { text: '📄 vite搭建React项目.md', link: '/qianduan/react/vite搭建React项目.md' },
      ],
      '/qianduan/regexp/': [
          { text: '📄 正则简介', link: '/qianduan/regexp/index.md' },
          { text: '📄 1⃣️ 正则的两种创建方式', link: '/qianduan/regexp/正则的两种创建方式.md' },
          { text: '📄 2⃣️ test(验证)和exec(捕获)', link: '/qianduan/regexp/test(验证)和exec(捕获).md' },
          { text: '📄 3⃣️ 元字符', link: '/qianduan/regexp/元字符.md' },
          { text: '📄 4⃣️ 正则的贪婪性和非贪婪性', link: '/qianduan/regexp/正则的贪婪性和非贪婪性.md' },
          { text: '📄 5⃣️ 字符串和正则相关的方法', link: '/qianduan/regexp/字符串和正则相关的方法.md' },
          { text: '📄 6⃣️ 正则表达式的标识符', link: '/qianduan/regexp/正则表达式的标识符.md' },
          { text: '📄 7⃣️ 正向预查和反向预查', link: '/qianduan/regexp/正向预查和反向预查.md' },
          { text: '📄 8⃣️ 重复出现', link: '/qianduan/regexp/重复出现.md' },
          { text: '📄 9⃣️ 正则补充', link: '/qianduan/regexp/正则补充.md' },
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
