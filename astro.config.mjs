import { defineConfig,passthroughImageService } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightImageZoom from 'starlight-image-zoom';
import remarkMath from "remark-math";
import rehypeMathjax from 'rehype-mathjax';
import starlightBlog from 'starlight-blog'
import starlightGiscus from 'starlight-giscus'
import tailwind from "@astrojs/tailwind";
import vercel from '@astrojs/vercel';
import starlightFullViewMode from 'starlight-fullview-mode'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.indratang.top',
  base: "/",

  image: {
    service: passthroughImageService()
  },

  integrations: [starlight({
    plugins: [
      starlightFullViewMode({  leftSidebarEnabled: false,  rightSidebarEnabled: false}),
      starlightGiscus({
        repo: 'maindraster/docgiscus',
        repoId: 'R_kgDON-oOVQ',
        category:'Q&A',
        categoryId:'DIC_kwDON-oOVc4CnRog',
        theme:'catppuccin_latte',
        lazy: true
    }),
    starlightImageZoom(),
    // starlightUtils({
    //   navLinks: {
    //   leading: { useSidebarLabelled:  "leading"  } ,
    // }})
    starlightBlog({
      title: "博客",
      postCount: 5,
      recentPostCount: 10,
    }),
    ],
    title: '🦄&🐟',
    tableOfContents: { minHeadingLevel: 2,
       maxHeadingLevel: 4
       },
    locales: {
      root: {
        label: '简体中文',
        lang: 'zh-CN'
      }
    },
    customCss: [
    './src/tailwind2.css',
    // 你的自定义 CSS 文件的相对路径
    './src/styles/root.css', 
      './src/styles/search.css', 
    './src/styles/iconfont.css', 
    './src/styles/picsize.css',
    './src/styles/product.css'
    ],
    social: [
      { label: 'GitHub', icon: 'github', href: 'https://github.com/maindraster/maindraster.github.io' },
      { label: 'BiliBili', icon: 'youtube', href: 'https://space.bilibili.com/3546706348084176' },
      // 其他社交链接...
    ],
    components: {
      Header: './src/components/Header.astro',
      MarkdownContent: "./src/components/MarkdownContent.astro",
      Highlight: "./src/components/Highlight.astro",
    },
    sidebar: [{
      label: '开篇文档',
      slug: 'zero2hero'
    },{
      label: '万工教程',
      collapsed: true,
      items: [{
        label: '首页',
        slug: 'tr_index'
      },{
        label: '基础教程',
        autogenerate: {
          directory: 'train'
        }
      },{
        label: '理论科普',
        autogenerate: {
          directory: 'train_ll'
        }
      },{
        label: '初级教程',
        autogenerate: {
          directory: 'train_cj'
        }
      },
     ],
    },
    {
      label: '篇章学习',
      collapsed: true,
      items: [{
        label: '电子电路设计篇',
        slug: 'electronics/index_ecd'
      },{
        label: '嵌入式开发篇',
        collapsed: true,
        items: [{
          label: 'ESP32篇',
          collapsed: true,
          autogenerate: {
            directory: 'embed/esp'
          }
        }]
      },{
        label: '机器人篇',
        collapsed: true,
        items: [{
          label: '建模与控制',
          autogenerate: {
            directory: 'robot/jmkz'
          }
        }]
      },{
        label: '人工智能篇',
        slug: 'ai/index_ai'
      },{
        label: '项目实战篇',
        slug: 'project/index_pro'
      },],
    }
    ],
  }), 
  tailwind({
    // 禁用默认的基础样式
    applyBaseStyles: false,
  })],

  markdown: {
    // 应用于 .md 和 .mdx 文件
    smartypants: false,
    remarkPlugins: [remarkMath],
    rehypePlugins: [ rehypeMathjax],
    remarkRehype: { footnoteLabel: '参考', footnoteBackLabel: '返回正文' },
  },
  output: 'server',
  adapter: vercel()
});

