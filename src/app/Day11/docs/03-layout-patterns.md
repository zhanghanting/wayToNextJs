# 多语言 Layout 设计模式完全指南

## 🎯 Layout 在国际化中的核心作用

在多语言项目中，Layout组件是**翻译上下文的守护者**，负责：

1. **建立语言上下文** - 从URL获取语言参数
2. **加载翻译资源** - 获取当前语言的翻译内容  
3. **提供翻译服务** - 向子组件传递翻译能力
4. **处理语言切换** - 提供语言切换界面

## 🏛️ 常见的 Layout 设计模式

### 模式1: 单一根布局 (Root Layout Pattern)

```typescript
// app/layout.tsx - 全局根布局
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // 🌍 在根层级处理所有国际化逻辑
  const messages = await getMessages();
  
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {/* 全局导航 */}
          <Navigation />
          
          {/* 页面内容 */}
          <main>{children}</main>
          
          {/* 全局页脚 */}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

**优点**: 简单清晰，翻译上下文覆盖整个应用  
**缺点**: 每个页面都加载所有翻译，可能影响性能

### 模式2: 分层布局 (Layered Layout Pattern) - 推荐 ⭐

```typescript
// app/layout.tsx - 全局布局
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        {/* 只处理基础HTML结构 */}
        {children}
      </body>
    </html>
  );
}

// app/[locale]/layout.tsx - 语言特定布局
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // 🎯 在语言层级处理国际化
  setRequestLocale(locale);
  const messages = await getMessages();
  
  return (
    <NextIntlClientProvider messages={messages}>
      <div className="app-wrapper">
        <Header locale={locale} />
        <main>{children}</main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
```

**优点**: 按需加载翻译，性能更好，结构清晰  
**缺点**: 嵌套层级稍微复杂

### 模式3: 功能区域布局 (Feature Area Layout)

```typescript
// app/[locale]/dashboard/layout.tsx - 特定功能区布局
export default async function DashboardLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // 🔧 只加载仪表板相关的翻译
  const dashboardMessages = await import(`@/messages/${locale}/dashboard.json`);
  
  return (
    <NextIntlClientProvider messages={dashboardMessages}>
      <div className="dashboard-layout">
        <Sidebar />
        <div className="main-content">
          {children}
        </div>
      </div>
    </NextIntlClientProvider>
  );
}
```

**优点**: 翻译按功能模块分割，加载速度快  
**缺点**: 需要管理多个翻译文件

## 🎨 Layout 设计最佳实践

### 1. **翻译资源管理策略**

```typescript
// 🚀 性能优化：分层加载翻译
export default async function OptimizedLayout({
  children,
  params: { locale }
}: LayoutProps) {
  // 基础翻译 (导航、通用组件)
  const coreMessages = await import(`@/messages/${locale}/core.json`);
  
  // 页面特定翻译 (按需加载)
  const pageMessages = await import(`@/messages/${locale}/pages.json`);
  
  const messages = {
    ...coreMessages.default,
    ...pageMessages.default
  };
  
  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
```

### 2. **语言切换组件设计**

```typescript
// components/LanguageSwitcher.tsx
'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  
  const switchLanguage = (newLocale: string) => {
    // 🔄 保持当前路径，只切换语言
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
  };
  
  return (
    <select 
      value={currentLocale} 
      onChange={(e) => switchLanguage(e.target.value)}
      className="language-switcher"
    >
      <option value="en">English</option>
      <option value="zh">中文</option>
    </select>
  );
}
```

### 3. **错误边界和回退机制**

```typescript
// components/I18nErrorBoundary.tsx
'use client';

import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class I18nErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('I18n Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="i18n-error">
          <h2>翻译加载失败</h2>
          <p>请刷新页面重试</p>
        </div>
      );
    }

    return this.props.children;
  }
}

// 在 Layout 中使用
export default async function SafeLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  const messages = await getMessages();
  
  return (
    <I18nErrorBoundary>
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    </I18nErrorBoundary>
  );
}
```

### 4. **SEO 优化配置**

```typescript
// app/[locale]/layout.tsx
export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      languages: {
        'en': '/en',
        'zh': '/zh',
        'x-default': '/en'
      }
    }
  };
}
```

## 🎯 我们项目中的设计选择

我们采用的是 **分层布局模式**：

```typescript
// ✅ 我们的设计
src/app/
├── layout.tsx                    # 全局HTML结构
└── Day11/
    ├── [locale]/
    │   ├── layout.tsx           # 国际化布局层
    │   └── page.tsx             # 页面内容
    └── LanguageSwitcher.tsx     # 语言切换组件
```

## 🚀 进阶优化建议

### 1. **动态翻译加载**
```typescript
// 按路由动态加载翻译
const messages = await import(`@/messages/${locale}/${route}.json`);
```

### 2. **翻译缓存策略**
```typescript
// 使用 React cache 缓存翻译
import { cache } from 'react';

const getMessages = cache(async (locale: string) => {
  return import(`@/messages/${locale}.json`);
});
```

### 3. **类型安全的翻译**
```typescript
// 生成翻译类型定义
type Messages = typeof import('@/messages/en.json');

declare global {
  interface IntlMessages extends Messages {}
}
```

这样的分层设计让我们的多语言架构既灵活又高效！ 