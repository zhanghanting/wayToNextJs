# Next.js 国际化 (next-intl) 完整指南

## 📖 文档导航

这是 Next.js 15 + next-intl 国际化功能的完整学习指南。

### 🎯 核心概念
- [**核心原理**](./01-core-concepts.md) - next-intl 工作机制和核心概念
- [**命名空间系统**](./02-namespace-system.md) - 翻译文件的组织和命名空间
- [**Provider机制**](./03-provider-mechanism.md) - NextIntlClientProvider 深度解析

### 🛠️ 实践指南  
- [**数据库翻译**](./04-database-translation.md) - 动态内容翻译完整方案
- [**布局设计**](./05-layout-patterns.md) - 多语言布局设计模式
- [**最佳实践**](./06-best-practices.md) - 项目实战经验总结

### ❓ 常见问题
- [**问题解答**](./07-faq.md) - 常见问题和解决方案

---

## 🚀 快速开始

### 项目结构
```
src/app/Day11/
├── [locale]/           # 动态语言路由
│   ├── layout.tsx     # 国际化布局
│   └── page.tsx       # 页面内容
├── components/        # 组件
│   ├── InteractiveDemo.tsx    # 客户端翻译演示
│   ├── ProductDemo.tsx        # 数据库翻译演示
│   └── LanguageSwitcher.tsx   # 语言切换器
├── docs/             # 📚 完整文档 (本目录)
├── i18n-config.ts   # 语言配置
├── middleware.ts     # 路由中间件
└── i18n/
    └── request.ts    # 翻译配置中心
```

### 翻译数据流
```
URL: /Day11/zh
    ↓
middleware.ts (拦截路由)
    ↓
i18n/request.ts (加载翻译)
    ↓
layout.tsx (服务器端获取)
    ↓
NextIntlClientProvider (传递给客户端)
    ↓
组件使用翻译
```

## 🎮 实际演示

访问 `/Day11/zh` 或 `/Day11/en` 查看完整演示：

1. **🏗️ 服务器端翻译** - 静态内容，来自JSON文件
2. **🎮 客户端交互翻译** - 动态交互，展示Provider作用
3. **🛍️ 数据库翻译演示** - 模拟数据库内容，展示命名空间机制

## 📚 学习路径

### 初学者
1. 先阅读 [核心原理](./01-core-concepts.md) 了解基本概念
2. 学习 [命名空间系统](./02-namespace-system.md) 理解翻译组织
3. 掌握 [Provider机制](./03-provider-mechanism.md) 理解数据传递

### 进阶开发者
1. 学习 [数据库翻译](./04-database-translation.md) 处理动态内容
2. 参考 [布局设计](./05-layout-patterns.md) 设计架构
3. 查看 [最佳实践](./06-best-practices.md) 优化项目

### 问题解决
- 遇到问题先查看 [问题解答](./07-faq.md)
- 参考实际代码示例
- 查看控制台调试信息

---

## 🎯 核心理解

### 三个关键问题
1. **为什么需要Provider？** → HTML已包含翻译，但客户端交互需要Provider
2. **命名空间如何指定？** → 在翻译文件或request.ts中定义
3. **数据库内容怎么处理？** → 混合策略：静态UI + 动态内容

### 数据流理解
- **静态翻译**: JSON文件 → getMessages() → 组件
- **动态翻译**: 数据库 → request.ts → getMessages() → 组件
- **使用方式**: 完全一致的 `useTranslations()` API

## 🛠️ 技术栈

- **Next.js 15** - App Router + Server Components
- **next-intl** - 国际化框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式设计

---

*最后更新: 2025年* | *作者: Next.js学习项目* 