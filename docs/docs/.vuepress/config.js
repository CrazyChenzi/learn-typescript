module.exports = {
  title: "TypeScript learn",
  description: "学习TypeScript所做的笔记",
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ["link", { rel: "icon", href: "/logo.png" }] // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: "/", // 这是部署到github相关的配置 下面会讲
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  themeConfig: {
    sidebarDepth: 2, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
    lastUpdated: "Last Updated", // 文档更新时间：每个文件git最后提交的时间
    nav: [
      { text: "Guide", link: "/guide/" },
      { text: "Types", link: "/types/" },
      { text: "TypeAlias", link: "/typealias/" },
      {
        text: "Github",
        link: "https://github.com/blacklisten/learn-typescript"
      }
    ],
    sidebar: {
      "/guide/": [
        {
          title: "指南",
          path: "/guide/",
          collapsable: false,
          sidebarDepth : 2,
          children: []
        }
      ],
      "/types/": [
        {
          title: "类型",
          path: "/types/",
          collapsable: false,
          sidebarDepth : 2,
          children: []
        }
      ],
      "/typealias/": [
        {
          title: "类型别名",
          path: "/typealias/",
          collapsable: false,
          sidebarDepth : 2,
          children: []
        }
      ]
    }
  },
  plugins: [
    ['@vuepress/back-to-top']
  ]
}
