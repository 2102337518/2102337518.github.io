# 个人主页网站（Personal Website）

一个用于展示个人成果的静态个人主页，风格参考 [0nhc.github.io](https://0nhc.github.io) 与 [qiayuanl.github.io](https://qiayuanl.github.io)：
经典学术风、蓝色链接、简洁单栏排版，并加入 **中英双语切换**、**深色/浅色模式**、**手机端适配** 等现代改进。

技术方案：纯 HTML + CSS + JavaScript，**零依赖、无需构建**，可直接托管在 GitHub Pages。

---

## 一、目录结构

```
personal-website/
├── index.html            # 页面骨架（一般不用改）
├── css/style.css         # 全站样式（改配色/字体在这里）
├── js/
│   ├── content.js        # ★ 网站全部内容（唯一需要日常编辑的文件）
│   └── main.js           # 渲染与交互逻辑（一般不用改）
├── assets/
│   ├── img/              # 头像、网站图标
│   │   ├── avatar.svg    # ★ 替换为你的照片 avatar.jpg（1:1 正方形，≥400×400）
│   │   └── projects/     # ★ 项目截图/GIF（建议 16:9，≥960×540）
│   └── cv/cv.pdf         # ★ 替换为你的简历 PDF
└── README.md             # 本说明
```

## 二、本地预览

在项目目录下任选一种方式启动：

```bash
# 方式 1：Python 自带服务器（推荐）
cd personal-website
python3 -m http.server 8000
# 然后浏览器打开 http://localhost:8000

# 方式 2：VS Code 安装 Live Server 插件后右键 index.html → Open with Live Server
```

> 注：直接双击打开 index.html（file:// 协议）也可以正常显示。

## 三、上线到 GitHub Pages（完整步骤）

### 第 1 步：注册 GitHub 账号

1. 打开 https://github.com → Sign up
2. 填邮箱、密码、用户名（**用户名决定你的网址**，建议用英文昵称，如 `zhangsan`）

### 第 2 步：在 GitHub 网页上创建仓库

1. 登录后点右上角 `+` → **New repository**
2. Repository name 必须填：**`你的用户名.github.io`**（例如用户名叫 `zhangsan`，就填 `zhangsan.github.io`）
3. 选择 **Public**（免费账户必须公开才能用 Pages）
4. **不要**勾选 “Add a README file”（保持空仓库），点 Create repository

### 第 3 步：把本项目上传到仓库

在本机终端执行（把 `zhangsan` 换成你的 GitHub 用户名）：

```bash
cd personal-website

# 初始化 git 并提交（首次需配置身份）
git init
git config user.name "你的名字"
git config user.email "你的邮箱"
git add .
git commit -m "Initial commit: personal website"

# 关联远程仓库并推送
git remote add origin https://github.com/zhangsan/zhangsan.github.io.git
git push -u origin main
```

> 如果本机默认分支是 `master`，把上面最后一行改成 `git push -u origin master` 即可（网页端无需改动，Pages 会自动识别）。
>
> 推送时会弹出 GitHub 登录窗口或用 Personal Access Token（网页 Settings → Developer settings → Personal access tokens）作为密码。

### 第 4 步：确认 Pages 已开启

1. 打开仓库页面 → **Settings** → 左侧 **Pages**
2. “Branch” 下拉框选择 `main`（或 `master`），目录保持 `/ (root)`，点 Save
3. 等待 1~2 分钟，访问 **https://你的用户名.github.io** 即可看到你的主页 🎉

之后每次改完 `content.js` 等内容，只需要：

```bash
git add .
git commit -m "更新内容"
git push
```

约 1 分钟后网站自动更新。

### 可选：自定义域名

- 在 Pages 设置里填你的域名（如 `www.example.com`），并在域名服务商处添加 CNAME 记录指向 `你的用户名.github.io`。
- 仓库根目录会需要放一个 `CNAME` 文件，GitHub 设置页面会自动处理。

---

## 四、需要准备的材料清单

上线前请准备好以下资料，全部填入 `js/content.js`：

| 材料 | 要求 | 放在哪 |
|---|---|---|
| ☐ 姓名（中/英） | — | content.js → profile.name |
| ☐ 头像照片 | 1:1 正方形，≥400×400，jpg/png | assets/img/，改 profile.avatar |
| ☐ 职位 + 单位/学校（中/英） | — | profile.role / affiliation |
| ☐ 自我介绍 | 100~200 字，中英各一份 | profile.bio |
| ☐ 简历 PDF | 中文或英文均可 | assets/cv/cv.pdf（覆盖占位文件） |
| ☐ 社交链接 | GitHub、邮箱必填；其余可选（支持图标：github / email / scholar / linkedin / x / bilibili / zhihu / youtube / homepage） | profile.links |
| ☐ 每个项目的资料 | 项目名、一两句介绍（中英）、截图或 GIF（16:9）、技术标签、代码/演示链接 | projects 数组 |
| ☐ 新闻动态 | 日期 + 一句话（中英） | news 数组 |
| ☐ 学习/工作经历 | 时间段、单位、职位（中英） | experience 数组 |
| ☐ 论文列表（可选） | 标题、作者、会议/期刊、年份、PDF/代码链接 | publications 数组；没有就留 `[]`，板块自动隐藏 |

## 五、内容编辑指南

打开 `js/content.js`，所有内容都在里面，格式如下：

```javascript
name: { zh: "你的名字", en: "Your Name" },   // 双语字段
date: "2026-01",                              // 无需翻译的字段直接用字符串
```

规则：

- **中英双语字段**写成 `{ zh: "...", en: "..." }`；不需要翻译的（日期、论文标题等）直接用普通字符串。
- 项目链接 `url` 留空字符串 `""` 则该按钮自动不显示。
- 删掉 `news` / `projects` / `publications` 数组里的**示例条目**，换成你自己的；数组留空则整个板块自动隐藏。
- 图片路径：把图片放进 `assets/img/projects/`，然后写 `"assets/img/projects/你的图片.png"`。
- 改完保存，刷新浏览器即可看到效果（本地预览时）。

## 六、常见问题

**Q：改完推送了，但网站没更新？**
A：Pages 构建一般 1~2 分钟生效；试试 Ctrl+F5 强制刷新；去仓库 Actions 标签页看有没有构建失败。

**Q：推送时提示认证失败？**
A：GitHub 已不支持密码登录推送。用 Personal Access Token（Settings → Developer settings → Personal access tokens → Generate，勾选 repo 权限）代替密码，或安装 [GitHub CLI](https://cli.github.com/) 后运行 `gh auth login`。

**Q：Google Fonts 加载慢/被墙？**
A：删除 index.html 中注释标记的三行 Google Fonts `<link>`，网站会自动回退到系统中文字体。

**Q：想改配色/字体？**
A：打开 `css/style.css`，顶部 `:root { ... }` 是浅色主题变量，`:root[data-theme="dark"] { ... }` 是深色主题变量，改 `--accent` 即可换主色。

**Q：能把网站做成二级路径吗（如 `用户名.github.io/项目名`）？**
A：可以。新建任意名字的仓库（如 `robot-demo`），把整个项目放进去推送，然后在 Settings → Pages 里选分支保存，访问 `https://用户名.github.io/robot-demo`。本项目全部使用相对路径，直接就能用。
