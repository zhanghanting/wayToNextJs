'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

/**
 * 🎮 交互式翻译演示组件：客户端组件翻译使用示例
 * 
 * 这个组件展示了：
 * 1. 客户端组件如何使用 useTranslations()
 * 2. NextIntlClientProvider 的重要性
 * 3. 动态翻译内容的实时更新
 */
export default function InteractiveDemo() {
  console.log('🎮===== InteractiveDemo (Client Component) ===== START =====');
  
  // 🎯 关键点：这里使用 useTranslations() 而不是 getTranslations()
  // 只有在 NextIntlClientProvider 包裹下才能正常工作
  const t = useTranslations('Demo');
  
  // 🔄 客户端状态管理
  const [clickCount, setClickCount] = useState(0);
  
  // 🎉 交互处理函数
  const handleClick = () => {
    setClickCount(prev => prev + 1);
  };
  
  console.log('🎮 InteractiveDemo Debug:');
  console.log('  - Translation t("title"):', t('title'));
  console.log('  - Translation t("button"):', t('button'));
  console.log('  - Current click count:', clickCount);

  return (
    <div className="border-2 border-blue-200 rounded-lg p-6 mt-6 bg-blue-50">
      {/* 🎯 使用翻译文本（来自 NextIntlClientProvider） */}
      <h3 className="text-xl font-semibold mb-4 text-blue-800">
        {t('title')}
      </h3>
      
      <div className="space-y-4">
        {/* 📊 显示点击次数（动态内容） */}
        <p className="text-gray-700">
          {t('clickCount', { count: clickCount })}
        </p>
        
        {/* 🎮 交互按钮 */}
        <button
          onClick={handleClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
        >
          {t('button')} 🚀
        </button>
        
        {/* 💡 说明文本 */}
        <div className="text-sm text-gray-600 bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
          <p className="font-semibold">{t('explanation.title')}</p>
          <ul className="mt-2 space-y-1">
            <li>• {t('explanation.point1')}</li>
            <li>• {t('explanation.point2')}</li>
            <li>• {t('explanation.point3')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/**
 * 🎯 重要理解：
 * 
 * 1. 这个组件是客户端组件 ('use client')
 * 2. 它使用 useTranslations() 而不是 getTranslations()
 * 3. 翻译数据来自 NextIntlClientProvider 传递的 messages
 * 4. 如果没有 NextIntlClientProvider，这个组件会报错
 * 
 * 数据流：
 * Layout (服务器端) → getMessages() → NextIntlClientProvider → 
 * InteractiveDemo (客户端) → useTranslations() → 显示翻译
 */ 