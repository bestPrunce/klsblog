// @ts-ignore
import { defineConfig } from 'vitepress'
import qianduan from '../public/layout/qianduan'
import houduan from '../public/layout/houduan'
import system from '../public/layout/system'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "帅气的小恐龙的博客～",
  description: "个人心得知识分享",
  base: '/klsblog/',
  lang: 'en-US',
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', href: 'https://bestprunce.github.io/klsblog/images/global/logo.png' }]
  ],
  themeConfig: {
    logo: '/images/global/logo.png',
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local'
    },
    nav: [
      { text: '首页', link: '/' },
      {
        text: '前端',
        items: [
          { text: 'JavaScript', link: '/qianduan/JavaScript/JavaScript简介.md' },
          { text: 'CSS', link: '/qianduan/CSS/CSS简介.md' },
          { text: 'Vue', link: '/qianduan/Vue/Vue简介.md' },
          { text: 'React', link: '/qianduan/React/React简介.md' },
          { text: '正则', link: '/qianduan/Regexp/正则简介.md' },
        ]
      },
      {
        text: '后端', items: [
          { text: 'Node', link: '/houduan/Node/NodeJs简介.md' },
          { text: 'Python', link: '/houduan/Python/python简介.md' },
        ]
      },
      { text: '数据库', link: '/api-examples' },
      { text: '操作系统', items: [
          { text: 'Linux', link: '/system/Linux/Linux简介.md' }
        ]
      },
      { text: '工具', link: '/api-examples' },
      { text: 'Examples', link: '/markdown-examples' },
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
      ...houduan,
      // ...system,
      "/system/Linux/": [
        {
          "text": "<div style=\"display: flex; align-items:center\">\n                            <div style=\"margin-left: 6px;\">Linux简介</div>\n                        </div>",
          "link": "/system/Linux/Linux%E7%AE%80%E4%BB%8B.md"
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
