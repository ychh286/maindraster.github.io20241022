import type { ExperienceProps } from "../types/experience.props";

export const EXPERIENCE: ExperienceProps[] = [
  {
    dates: "August 2024 — Present",
    title: "Front End",
    company: "Personal Website",
    description:
      "基于 Astro Starlight 构建个人主页，覆写部分 Astro 组件。文档页面优化使用 Remark、Rehype 插件，并多采用 MDX 与 HTML 结合。自写 CSS 文件并引入 Tailwind CSS 优化页面美观度，并设置多路由解决 StarlightPlugin 与 Tailwind 插件冲突。原部署于 Github Pages，2025.2.20 迁移至 Netlify。",
    technologies: [
      "Astro",
      "Astro Starlight",
      "Markdown",
      "MDX",
      "CSS",
      "Tailwind CSS",
      "HTML",
      "TypeScript",
      "JS",
      "Netlify",
      "Github Pages"
    ],
  },
  {
    dates: "February 2025",
    title: "Android APP",
    company: "Notodill",
    companyUrl: "https://github.com/maindraster/notodill",
    description:
      "使用 Cursor 与 WindSurf 在 Android Studio 平台用 Kotlin 进行开发的小项目，三天完成。Notodill 是一款集成随笔、待办和记账的安卓 APP，极简主义，所有数据存储于手机本地。",
    technologies: [
      "Cursor",
      "WindSurf",
      "Android Studio",
      "Kotlin",
      "Jetpack Compose",
    ],
  },
  {
    dates: "2023 — 2024",
    title: "Odds",
    company: "Ends",
    description:
      "一个可 AI 对话和手势弹钢琴的音响（使用 Jetson Nano ，概念提出与主要代码实现）、一架四旋翼无人机（机械设计制作 + 算法优化）、抄了一块 Arduino Uno 并焊接使用制作了一个桌面风扇摆件、一台乒乓球发球机（STM32F106 + 摩擦轮实现）、一辆寻迹小车、一辆建图走迷宫小车以及51单片机和STM32一些小玩具",
    technologies: [
      "Python",
      "C",
      "Arduino",
      "ROS",
      "OpenCV",
      "Keil",
      "Solidworks",
      "Fusion360",
      "AD",
      "立创EDA"
    ],
  },
];
