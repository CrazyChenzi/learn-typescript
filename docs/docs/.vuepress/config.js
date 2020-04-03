module.exports = {
  title: "TypeScript learn",
  description: "学习TypeScript所做的笔记(假设你已经了解基础TypeScript)",
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ["link", { rel: "icon", href: "/logo.png" }] // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: "/learn-typescript/", // 这是部署到github相关的配置 下面会讲
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
      { text: "Others", link: "/others/" },
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
      ],
      "/others/": [
        {
          title: "其它笔记...",
          path: "/others/",
          collapsable: false,
          sidebarDepth: 2,
          children: [
            {
              title: "Interfaces vs Types",
              path: "/others/interfacesDiffTypes",
              collapsable: false,
              sidebarDepth: 2
            },
            {
              title: "Any vs Unknown",
              path: "/others/anyDiffUnknown",
              collapsable: false,
              sidebarDepth: 2
            }
          ]
        }
      ]
    },
  },
  plugins: [
    ['@vuepress/back-to-top', false],
    ['go-top'],
    ['@vssue/vuepress-plugin-vssue', {
      // 设置 `platform` 而不是 `api`
      platform: 'github',
      // 其他的 Vssue 配置
      owner: 'blacklisten',
      repo: 'learn-typescript',
      clientId: '2bfe528f313acbbd4c35',
      clientSecret: 'c449b0a1c046d3ca7647e9744c8f01ffba6abcba'
    }]
  ]
}
