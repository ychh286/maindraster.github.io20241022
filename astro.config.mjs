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
import starlightSiteGraph from 'starlight-site-graph'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.indratang.top',
  base: "/",

  image: {
    service: passthroughImageService()
  },

  integrations: [starlight({
    plugins: [
      starlightSiteGraph({
        debug: false,
					graphConfig: {
						depth: 1,
						scale: 1,
						labelOpacityScale: 1.5,
						labelFontSize: 11,
						labelHoverScale: 1.3,
						renderArrows: true,
						tagRenderMode: 'same',
						actions: ['fullscreen', 'depth', 'reset-zoom', 'render-arrows', 'render-external', 'settings'],
						nodeDefaultStyle: {
							shape: 'star',
							cornerType: 'round',
							shapeCornerRadius: "25%",
							nodeScale: 1.6,
							neighbourScale: 30.0,
							shapeRotation: 'random',
						},
						nodeExternalStyle: {
							shape: 'star',
							shapePoints: 4,
							nodeScale: 0.9,
						},
						nodeVisitedStyle: {
							nodeScale: 1.1,
						},
						nodeCurrentStyle: {
							shapePoints: 6,
							nodeScale: 2.2,
							shapeRotation: 0,
							colliderScale: 1.4
						}
					},
					sitemapConfig: {
						includeExternalLinks: true
					}
      }),
      //starlightFullViewMode({  leftSidebarEnabled: false,  rightSidebarEnabled: false}),
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
      link: 'zero2hero'
    },{
      label: '万工教程',
      items: [
        { label: '首页', link: 'frin'},
        { label: '基础教程', autogenerate: {directory: 'train'}}, 
        { label: '理论科普', autogenerate: {directory: 'trainll'}},
        { label: '初级教程', autogenerate: {directory: 'traincj'}},
      ],
    },
    {
      label: '篇章学习',
      collapsed: true,
      items: [{
        label: '电子电路设计篇',
        slug: 'electronics/indexecd'
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
        slug: 'ai/indexai'
      },{
        label: '项目实战篇',
        slug: 'project/indexpro'
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

