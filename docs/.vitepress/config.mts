// @ts-ignore
import { defineConfig } from 'vitepress'
import qianduan from '../public/layout/qianduan'
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
    ['link', { rel: 'icon', href: 'https://bestprunce.github.io/klsblog/images/global/logo.png' }]
  ],
  themeConfig: {
    logo: '/images/global/logo.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '前端', 
        items: [
          { text: 'JavaScript', link: '/qianduan/JavaScript/JavaScript简介.md' },
          { text: 'Vue', link: '/qianduan/Vue/Vue简介.md' },
          { text: 'React', link: '/qianduan/React/React简介.md' },
          { text: '正则', link: '/qianduan/Regexp/正则简介.md' },
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
      ...qianduan,
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
