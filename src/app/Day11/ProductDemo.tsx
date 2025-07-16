'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

/**
 * 🛍️ 产品演示组件：展示数据库翻译命名空间的使用
 * 
 * 演示内容：
 * 1. 如何使用 Products 命名空间获取产品翻译
 * 2. 静态翻译 vs 动态翻译的对比
 * 3. 嵌套命名空间的使用方式
 */

// 模拟产品数据 (实际项目中来自数据库)
const mockProducts = [
  { id: 1, sku: 'LAPTOP-001', price: 5999.00, category: 'electronics' },
  { id: 2, sku: 'MOUSE-002', price: 199.00, category: 'electronics' },
  { id: 3, sku: 'BOOK-003', price: 89.00, category: 'books' }
];

export default function ProductDemo() {
  console.log('🛍️===== ProductDemo (Database Translation Demo) ===== START =====');
  
  // 🎨 UI翻译 (来自静态JSON文件)
  const uiT = useTranslations('ProductDemo');
  
  // 🗄️ 产品翻译 (模拟来自数据库的命名空间)
  const productT = useTranslations('Products');
  
  // 📂 分类翻译 (另一个数据库命名空间)
  const categoryT = useTranslations('Categories');
  
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  
  console.log('🛍️ ProductDemo Debug:');
  console.log('  - UI Translation (static):', uiT('title'));
  console.log('  - Product Translation (dynamic):', productT('common.price'));

  return (
    <div className="border-2 border-green-200 rounded-lg p-6 mt-6 bg-green-50">
      {/* 🏷️ 标题 (静态翻译) */}
      <h3 className="text-xl font-semibold mb-4 text-green-800">
        {uiT('title')}
      </h3>
      
      <div className="space-y-4">
        {/* 📝 说明文字 (静态翻译) */}
        <p className="text-sm text-gray-600 mb-4">
          {uiT('explanation')}
        </p>
        
        {/* 🛍️ 产品列表 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockProducts.map(product => (
            <div 
              key={product.id} 
              className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedProduct(product.id)}
            >
              {/* 🏷️ 产品名称 (数据库翻译) */}
              <h4 className="font-semibold text-lg mb-2">
                {productT(`product_${product.id}.name`)}
              </h4>
              
              {/* 📝 产品描述 (数据库翻译) */}
              <p className="text-gray-600 text-sm mb-3">
                {productT(`product_${product.id}.description`)}
              </p>
              
              {/* 📂 产品分类 (数据库翻译) */}
              <p className="text-xs text-blue-600 mb-2">
                {categoryT('label')}: {categoryT(product.category)}
              </p>
              
              {/* 💰 价格 (混合：静态标签 + 动态数据) */}
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-green-600">
                  {productT('common.price')}: ¥{product.price}
                </span>
                
                {/* 🛒 按钮 (数据库翻译) */}
                <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors">
                  {productT('common.addToCart')}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* 🔍 产品详情 (动态显示) */}
        {selectedProduct && (
          <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
            <h4 className="font-semibold text-blue-800 mb-2">
              {uiT('selectedProduct')}:
            </h4>
            <div className="space-y-2 text-sm">
              <p><strong>{productT('common.name')}:</strong> {productT(`product_${selectedProduct}.name`)}</p>
              <p><strong>{productT('common.description')}:</strong> {productT(`product_${selectedProduct}.description`)}</p>
              <p><strong>{productT('common.fullDescription')}:</strong> {productT(`product_${selectedProduct}.fullDescription`)}</p>
            </div>
          </div>
        )}
        
        {/* 💡 技术说明 */}
        <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
          <h4 className="font-semibold text-yellow-800 mb-2">
            {uiT('technicalNote.title')}
          </h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• {uiT('technicalNote.point1')}</li>
            <li>• {uiT('technicalNote.point2')}</li>
            <li>• {uiT('technicalNote.point3')}</li>
            <li>• {uiT('technicalNote.point4')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/**
 * 🎯 重要理解：
 * 
 * 1. uiT = useTranslations('ProductDemo')   // 静态翻译 (JSON文件)
 * 2. productT = useTranslations('Products') // 动态翻译 (数据库)
 * 3. categoryT = useTranslations('Categories') // 另一个动态翻译
 * 
 * 命名空间来源：
 * - ProductDemo: 在 src/messages/zh.json 中定义
 * - Products: 在 request.ts 中构建时指定
 * - Categories: 在 request.ts 中构建时指定
 * 
 * 数据流：
 * 数据库 → request.ts (构建命名空间) → getMessages() → 
 * NextIntlClientProvider → useTranslations('Products')
 */ 