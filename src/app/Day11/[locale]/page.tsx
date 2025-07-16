import { getTranslations } from 'next-intl/server'
import InteractiveDemo from '../InteractiveDemo'
import ProductDemo from '../ProductDemo'

/**
 * 📄 国际化页面组件：展示翻译内容的实际页面
 * 
 * 作用：使用 next-intl 的翻译功能显示多语言内容
 * 文件路径：src/app/Day11/[locale]/page.tsx
 * 
 * 工作原理：
 * 1. 使用 getTranslations() 获取翻译函数 (服务器端)
 * 2. 指定翻译命名空间 (如 'Home')
 * 3. 调用翻译函数获取具体文本
 * 4. 渲染多语言内容
 * 5. 包含客户端组件演示 NextIntlClientProvider 的作用
 */
export default async function I18nPage() {
  console.log('📄===== src/app/Day11/[locale]/page.tsx ===== START =====');
  console.log('📄 Page Debug:');
  
  // 🔍 获取翻译函数，指定命名空间为 'Home'
  // 这对应翻译文件中的 { "Home": { ... } } 部分
  const t = await getTranslations('Home');
  
  // 🧪 测试翻译功能，输出调试信息
  const welcomeText = t('welcome');
  console.log('  - Translation t("welcome"):', welcomeText);
  console.log('  - Expected EN: "Welcome to Next.js Internationalization!"');
  console.log('  - Expected ZH: "欢迎使用 Next.js 国际化！"');

  const pageResult = (
    <div>
      {/* 🏗️ 服务器端翻译展示 */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-green-700">
          🏗️ 服务器端翻译演示 (getTranslations)
        </h2>
        
        {/* 🎯 主要内容：使用翻译函数显示文本 */}
        <p className="mb-4 text-lg">{t('welcome')}</p>
        
        {/* 📋 功能列表：展示嵌套翻译的使用 */}
        <ul className="list-disc pl-6 space-y-2">
          <li>{t('feature.ssr')}</li>      {/* 对应 Home.feature.ssr */}
          <li>{t('feature.routing')}</li>  {/* 对应 Home.feature.routing */}
          <li>{t('feature.switch')}</li>   {/* 对应 Home.feature.switch */}
        </ul>
      </section>

      {/* 🎮 客户端翻译演示 */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">
          🎮 客户端翻译演示 (useTranslations + NextIntlClientProvider)
        </h2>
        
        {/* 这个组件需要 NextIntlClientProvider 才能工作 */}
        <InteractiveDemo />
      </section>

      {/* 🛍️ 数据库翻译命名空间演示 */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-purple-700">
          🛍️ 数据库翻译命名空间演示 (模拟数据库内容)
        </h2>
        
        {/* 展示如何使用数据库翻译的命名空间 */}
        <ProductDemo />
      </section>
    </div>
  );

  console.log('📄===== src/app/Day11/[locale]/page.tsx ===== END =====');
  return pageResult;
}

/**
 * 📚 翻译文件结构示例 (messages/en.json 和 messages/zh.json)
 * 
 * {
 *   "Home": {                                    ← getTranslations('Home') 指向这里
 *     "welcome": "Welcome to Next.js!",         ← t('welcome') 获取这个值
 *     "feature": {                              ← 嵌套对象
 *       "ssr": "Server-Side Rendering",         ← t('feature.ssr') 获取这个值
 *       "routing": "Dynamic Routing",           ← t('feature.routing') 获取这个值
 *       "switch": "Language Switching"          ← t('feature.switch') 获取这个值
 *     }
 *   }
 * }
 * 
 * 中文版本 (zh.json) 具有相同的结构，但值为中文翻译
 */
