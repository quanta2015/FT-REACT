title: Linux
theme: light

[slide]
# Hexo
## 静态博客框架

[slide]
# 简介
Hexo是一款基于Node.js的静态博客框架，依赖少易于安装使用，可以方便的生成静态网页托管在GitHub和Coding上，是搭建博客的首选框架。因为Hexo的创建者是台湾人，对中文的支持很友好，可以选择中文进行查看。

[slide]
# 搭建步骤
- 安装Git
- 安装Node.js
- 安装Hexo
- GitHub创建个人仓库
- 生成SSH添加到GitHub
- 将hexo部署到GitHub

[slide]
# 安装Hexo
```bash
# 安装hexo
npm install -g hexo-cli
```

[slide]
# 创建博客工程
```bash
hexo init myblog
cd myblog
npm install
```

[slide]
# 工程目录结构
``` bash
├── _config.yml           # 博客的配置文件
├── db.json               # 依赖包
├── node_modules          # 依赖包
├── package.json          # 工程配置
├── public                # 生成的页面
├── scaffolds             # 文章的模板
├── source                # 文章
└── themes                # 主题
```

[slide]
# 运行服务器
```bash
hexo s
```

> 使用ctrl+c可以把服务关掉


[slide]
# 配置说明
在文件根目录下的`_config.yml`，就是整个hexo框架的配置文件了。可以在里面修改大部分的配置。
``` bash
# Site
title: Hexo         # 网站标题
subtitle:           # 网站副标题
description:        # 网站描述
keywords:           # 关键字
author: John Doe    # 您的名字
language:           # 网站使用的语言
timezone:           # 时区

# URL
url: http://yoursite.com
root: /
permalink: :year/:month/:day/:title/      # 文章链接格式
permalink_defaults:

...

# Extensions
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
theme: landscape                         # 网站主题
```


[slide]
# 替换主题 `theme-next`
使用git下载next主题
```
cd themes
git clone https://github.com/theme-next/hexo-theme-next /next
```


[slide]
修改hexo配置文件`_config.yml`，使用next主题:
```bash
theme: hexo-next                         # 网站主题
```


[slide]
# 添加分类页面 about
```bash
hexo new page about
```


[slide]
命令执行后在`source`文件夹下会生成`about`文件夹以及`index.md`文件;然后修改 _config.yml 配置文件，打开about菜单
```bash
# ---------------------------------------------------------------
# Menu Settings
# ---------------------------------------------------------------
menu:
  home: / || home
  about: /about/ || user
  #tags: /tags/ || tags
  #categories: /categories/ || th
  archives: /archives/ || archive
  #schedule: /schedule/ || calendar
  #sitemap: /sitemap.xml || sitemap
  #commonweal: /404/ || heartbeat
```


[slide]
# 侧边栏头像
- 头像文件保存至 `<hexo_root>/source/images/avatar.png`
- 修改配置文件 `<next_root>/_config.yml`

```bash
avatar:
  url: /images/avatar.png
  ......
```


[slide]
# 侧边栏社交信息
修改`hexo-next`配置文件 `<next_root>/_config.yml`，格式与前面相同：

```bash
social:
  GitHub: https://github.com/xyty007 || github
  E-Mail: xyty2012@outlook.com || envelope
  知乎: https://www.zhihu.com/people/initial-75 || book # FontAwesome的知乎图标为纯白色，不能用
social_icons:
  icons_only: true #只显示图标，不显示文字
```


[slide]
# 添加类别

1 . 创建 `categories` 页面类
```bash
hexo new page categories
```


[slide]
2 . 打开`<hexo_root>/source/categories/index.md`添加类别说明
```bash
# index.md

---
title: categories
date: 2019-04-13 18:25:41
type: categories
---
```


[slide]
3 . 撰写文章添加类别标志 
```bash
---
title: xxxx
date: 2019-04-13 18:29:54
categories: work
---
```


[slide]
# Front-matter
`Front-matter` 是文件最上方以 `---` 分隔的区域，用于指定个别文件的变量，举例来说：
```
---
title: Hello World
date: 2013/7/13 20:46:25
---
```


[slide]

- layout:  布局
- title:   标题
- date:    建立日期
- updated: 更新日期
- comments:    开启文章的评论功能
- tags:    标签（不适用于分页）
- categories:  分类（不适用于分页）
- permalink:   覆盖文章网址


[slide]
# 搜索服务
1 . 安装hexo插件
```bash
npm install hexo-generator-searchdb --save
```


[slide]
2 . 修改hexo配置文件`<blog_root>/_config.yml`
```bash
# Configration for Theme-Next
search:
  path: search.xml
  field: post
  format: html
  limit: 20
```


[slide]
3 . 修改hexo-next配置文件 `<next_root>/_config.yml`
```bash
local_search:
  enable: true
  # if auto, trigger search by changing input
  # if manual, trigger search by pressing enter key or search button
  trigger: auto
```


[slide]
# 发布站点
1 . 登录github，创建一个以自己用户命名的代码仓库 `xxx.github.com`   

2 . 修改配置文件 `_config.yml`,添加仓库地址
```
# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
  type: git
  repo: <git_repo>
  branch: master
```
3 . 安装git发布插件
```bash
npm install hexo-deployer-git --save
```

4   . 运行命令部署 `hexo deploy #或 hexo d`


[slide]
# 常用指令
```
hexo init [folder] # 新建一个网站。
hexo new [layout] <title> # 新建一篇文章
hexo generate # 生成静态文件，该命令可以简写为 $ hexo g
hexo clean # 清除缓存文件 (db.json) 和已生成的静态文件 (public)
hexo render <file1> [file2] ... # 渲染文件
hexo server # 启动服务器，http://localhost:4000/
hexo deploy # 部署网站，该命令可以简写为 $ hexo d您可能需要运行该命令
hexo list <type> # 列出网站资料
hexo publish [layout] # <filename> 发表草稿
hexo version # 显示 Hexo 版本
```














