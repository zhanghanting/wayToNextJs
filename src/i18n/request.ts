import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';
import { hasLocale } from 'next-intl';
import { locales, defaultLocale, type Locale } from '@/i18n-config';

/**
 * 🧠 next-intl 配置中心：智能翻译加载器
 * 
 * 作用：根据当前请求的语言，动态加载对应的翻译文件
 * 执行时机：每次使用 useTranslations() 或 getTranslations() 时
 * 
 * 工作原理：
 * 1. 从多个来源获取当前语言代码 (locale)
 * 2. 验证语言代码是否有效
 * 3. 动态导入对应的翻译 JSON 文件
 * 4. 返回配置对象供 next-intl 使用
 */
export default getRequestConfig(async ({ requestLocale }) => {
  console.log('🧠===== src/i18n/request.ts ===== START =====');
  console.log('⚙️ i18n/request.ts Debug:');
  console.log('  - requestLocale (before await):', requestLocale);
  
  // 🎯 多重保险：尝试多种方式获取语言代码
  let locale: Locale = defaultLocale; // 明确指定类型为 Locale ('en' | 'zh')
  
  // 📡 方法1: 从 middleware 设置的 x-locale header 获取 (最可靠)
  // 这是我们解决 Next.js 15 兼容性问题的核心方案
  try {
    const headersList = await headers();
    const headerLocale = headersList.get('x-locale');      // middleware 传递的语言
    const pathname = headersList.get('x-pathname') || '';   // 完整路径信息
    
    console.log('  - Header x-locale:', headerLocale);
    console.log('  - Header x-pathname:', pathname);
    
    // ✅ 如果 header 中有有效的语言代码，优先使用
    if (headerLocale && hasLocale(locales, headerLocale)) {
      locale = headerLocale as Locale; // 类型断言，因为 hasLocale 已确保其有效
      console.log('  - ✅ Using header locale:', locale);
    } else {
      console.log('  - ❌ Header locale not found or invalid');
    }
  } catch (error) {
    console.log('  - ❌ Headers method failed:', error);
  }
  
  // 🔄 方法2: 从 requestLocale 获取 (备用方案)
  // 在某些情况下，next-intl 的内置机制可能会正常工作
  if (locale === defaultLocale) {
    try {
      const requested = await requestLocale;
      console.log('  - Requested locale (after await):', requested);
      
      if (requested && hasLocale(locales, requested)) {
        locale = requested as Locale; // 类型断言，因为 hasLocale 已确保其有效
        console.log('  - ✅ Using requestLocale:', locale);
      }
    } catch (error) {
      console.log('  - ❌ requestLocale failed:', error);
    }
  }
  
  console.log('  - Final locale:', locale);
  console.log('  - Loading messages from:', `../messages/${locale}.json`);
  
  // 📚 动态导入翻译文件
  // 这里使用动态 import，只加载当前语言的翻译，提高性能
  const messages = (await import(`../messages/${locale}.json`)).default;
  console.log('  - Loaded messages for Home:', messages.Home ? 'Found' : 'Not found');

  // 🎁 返回 next-intl 需要的配置对象
  const result = {
    locale,    // 当前语言代码
    messages   // 翻译内容对象
  };
  
  console.log('🧠===== src/i18n/request.ts ===== END =====');
  return result;
}); 