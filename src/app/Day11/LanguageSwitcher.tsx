'use client'

import { usePathname, useRouter } from 'next/navigation'
import { locales } from '@/i18n-config'

/**
 * 🔄 语言切换器组件：用户界面的语言切换控制器
 * 
 * 作用：允许用户在不同语言之间切换
 * 组件类型：客户端组件 ('use client')
 * 
 * 工作原理：
 * 1. 获取当前路径信息
 * 2. 解析当前语言代码
 * 3. 提供语言选择界面
 * 4. 切换语言时更新 URL 并触发页面重新渲染
 */
export default function LanguageSwitcher() {
  console.log('🔄===== src/app/Day11/LanguageSwitcher.tsx ===== START =====');
  
  // 🧭 获取当前完整路径
  // 例如：/Day11/en/page 或 /Day11/zh/page
  const pathname = usePathname();
  
  // 🚀 路由控制器，用于程序化导航
  const router = useRouter();

  /**
   * 🎯 语言切换处理函数
   * 
   * 工作流程：
   * 1. 从下拉框获取选择的新语言
   * 2. 解析当前 URL 路径
   * 3. 替换路径中的语言代码
   * 4. 导航到新的语言版本页面
   */
  function onSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    console.log('🔄--- LanguageSwitcher.onSelect --- START ---');
    
    const nextLocale = e.target.value;
    console.log('  - Selected new locale:', nextLocale);
    console.log('  - Current pathname:', pathname);
    
    // 🔧 智能路径重构：保留除语言段以外的所有路径
    // 例如：/Day11/en/some/deep/path → /Day11/zh/some/deep/path
    const segments = pathname.split('/');  // ['', 'Day11', 'en', 'some', 'deep', 'path']
    console.log('  - Path segments:', segments);
    console.log('  - Old locale (segment[2]):', segments[2]);
    
    segments[2] = nextLocale;              // ['', 'Day11', 'zh', 'some', 'deep', 'path']
    const newPath = segments.join('/');    // '/Day11/zh/some/deep/path'
    console.log('  - New locale (segment[2]):', segments[2]);
    console.log('  - New path:', newPath);
    
    // 🌐 导航到新的语言版本
    // 这会触发 middleware 重新处理请求，加载新语言的翻译内容
    router.push(newPath);
    
    console.log('🔄--- LanguageSwitcher.onSelect --- END ---');
  }

  // 🔍 从当前路径提取语言代码
  // /Day11/zh → 'zh'
  const current = pathname.split('/')[2];
  console.log('  - Current locale from path:', current);

  const switcherResult = (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">🌐 语言:</span>
      <select 
        value={current} 
        onChange={onSelect} 
        className="border border-gray-300 rounded-md px-3 py-1 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {/* 🎨 渲染所有支持的语言选项 */}
        {locales.map(locale => (
          <option key={locale} value={locale}>
            {/* 📍 语言显示映射 */}
            {locale === 'en' ? '🇺🇸 English' : '🇨🇳 中文'}
          </option>
        ))}
      </select>
    </div>
  );

  console.log('🔄===== src/app/Day11/LanguageSwitcher.tsx ===== END =====');
  return switcherResult;
}
