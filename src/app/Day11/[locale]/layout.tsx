import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import LanguageSwitcher from '../LanguageSwitcher';

/**
 * 🏗️ 国际化布局组件：多语言页面的基础架构
 * 
 * 作用：为每个语言版本的页面提供翻译上下文和语言切换功能
 * 文件路径：src/app/Day11/[locale]/layout.tsx
 * 路由模式：/Day11/[locale] (动态路由)
 * 
 * 关键功能：
 * 1. 接收动态路由参数 [locale]
 * 2. 设置 next-intl 的请求上下文
 * 3. 加载对应语言的翻译内容
 * 4. 提供客户端翻译上下文 (NextIntlClientProvider)
 * 5. 渲染语言切换组件
 */

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // Next.js 15 要求 params 为 Promise
};

export default async function LocaleLayout({ children, params }: Props) {
  console.log('🏗️===== src/app/Day11/[locale]/layout.tsx ===== START =====');
  console.log('🏗️ Layout Debug:');
  
  // 🔓 解析 Next.js 15 的 Promise 参数
  // 在 Next.js 15 中，动态路由参数变成了 Promise 对象
  const { locale } = await params;
  console.log('- Extracted locale from params:', locale);
  
  // 🎯 关键步骤：建立 next-intl 请求上下文
  // 这个调用告诉 next-intl 当前请求使用的语言
  // 必须在使用任何翻译功能之前调用
  setRequestLocale(locale);
  console.log('  - Set request locale to:', locale);
  
  // 📚 加载当前语言的所有翻译内容
  // getMessages() 会调用我们在 i18n/request.ts 中定义的配置（调用getRequestConfig()）
  const messages = await getMessages();
  console.log('  - Messages loaded in layout');

  const layoutResult = (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* 📖 页面标题 */}
        <h1 className="text-3xl font-bold text-center mb-2">
          Next.js 国际化 (next-intl) 演示
        </h1>
        <p className="text-gray-600 text-center mb-8">
          当前语言: <span className="font-semibold text-blue-600">{locale}</span>
        </p>

        {/* 🔄 语言切换器 */}
        <div className="mb-8 flex justify-center">
          <LanguageSwitcher />
        </div>

        {/* 🌐 NextIntlClientProvider: 客户端翻译上下文 */}
        {/* 
          这个 Provider 的作用：
          1. 将服务器端加载的翻译内容传递给客户端组件
          2. 使客户端组件能够使用 useTranslations() hook
          3. 确保服务器端和客户端的翻译保持一致
        */}
        <NextIntlClientProvider messages={messages}>
          <div className="bg-white rounded-lg shadow-md p-8">
            {children}
          </div>
        </NextIntlClientProvider>
      </div>
    </div>
  );

  console.log('🏗️===== src/app/Day11/[locale]/layout.tsx ===== END =====');
  return layoutResult;
}
