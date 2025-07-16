# Day11: Next.js 国际化 (next-intl) 实战

## 🎯 学习目标

学习 Next.js 15 + next-intl 的完整国际化解决方案，包括：
- 服务器端渲染 (SSR) 翻译
- 客户端组件翻译  
- 动态数据库内容翻译
- 多语言路由和布局设计

## 🚀 快速体验

```bash
npm run dev
```

然后访问：
- **中文版本**: `/Day11/zh`
- **英文版本**: `/Day11/en`

## 📁 项目结构

```
Day11/
├── [locale]/               # 动态语言路由
│   ├── layout.tsx         # 国际化布局
│   └── page.tsx           # 演示页面
├── docs/                  # 📚 完整学习文档
│   ├── README.md          # 文档导航
│   ├── 01-core-concepts.md     # 核心概念
│   ├── 02-database-translation.md  # 数据库翻译
│   ├── 03-layout-patterns.md       # 布局模式
│   ├── 04-advanced-solutions.md    # 高级解决方案
│   └── 05-best-practices.md        # 最佳实践
├── InteractiveDemo.tsx    # 客户端翻译演示
├── ProductDemo.tsx        # 数据库翻译演示
├── LanguageSwitcher.tsx   # 语言切换组件
└── enhanced-i18n-request.ts  # 增强版配置示例
```

## 🎮 演示功能

### 1. 🏗️ 服务器端翻译
- 静态内容翻译 (来自JSON文件)
- 服务器端渲染性能优化
- SEO友好的多语言内容

### 2. 🎮 客户端交互翻译  
- 动态内容更新
- NextIntlClientProvider机制
- 实时语言切换

### 3. 🛍️ 数据库翻译演示
- 模拟数据库多语言内容
- 命名空间机制展示
- 静态+动态混合翻译

## 📚 学习路径

1. **体验功能** → 先运行项目，看看实际效果
2. **核心理解** → 阅读 `docs/01-core-concepts.md`  
3. **深入学习** → 按顺序阅读其他文档
4. **实践应用** → 参考代码示例，在自己项目中应用

## 🔧 技术栈

- **Next.js 15** (App Router)
- **next-intl** (国际化框架)  
- **TypeScript** (类型安全)
- **Tailwind CSS** (样式)

---

📖 **详细文档**: [`./docs/README.md`](./docs/README.md) 