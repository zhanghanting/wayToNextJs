/**
 * 🚀 增强版 i18n/request.ts
 * 
 * 展示如何在 next-intl 中同时支持：
 * 1. 静态翻译 (JSON 文件) - 界面元素
 * 2. 动态翻译 (数据库) - 内容数据
 * 3. 缓存策略 - 性能优化
 * 4. 回退机制 - 容错处理
 */

import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';
import { hasLocale } from 'next-intl';
import { locales, defaultLocale, type Locale } from '@/i18n-config';

// ==================== 数据库翻译服务 ====================

interface DatabaseTranslationService {
  getProductTranslations(locale: string): Promise<Record<string, string>>;
  getCategoryTranslations(locale: string): Promise<Record<string, string>>;
  getCommonTranslations(locale: string): Promise<Record<string, string>>;
}

class DatabaseTranslationService implements DatabaseTranslationService {
  
  /**
   * 🗄️ 获取商品相关翻译
   */
  async getProductTranslations(locale: string): Promise<Record<string, string>> {
    // 模拟数据库查询
    console.log(`🗄️ Fetching product translations for locale: ${locale}`);
    
    // 实际项目中的 SQL 查询示例：
    /*
    const query = `
      SELECT translation_key, translation_value 
      FROM dynamic_translations 
      WHERE locale = ? AND category = 'product'
    `;
    const results = await db.query(query, [locale]);
    */
    
    // 模拟数据
    const translations = locale === 'zh' ? {
      'product.add_to_cart': '加入购物车',
      'product.buy_now': '立即购买',
      'product.out_of_stock': '缺货',
      'product.rating': '评分',
      'product.reviews': '条评论',
    } : {
      'product.add_to_cart': 'Add to Cart',
      'product.buy_now': 'Buy Now',
      'product.out_of_stock': 'Out of Stock',
      'product.rating': 'Rating',
      'product.reviews': 'reviews',
    };
    
    return translations;
  }
  
  /**
   * 🗂️ 获取分类相关翻译
   */
  async getCategoryTranslations(locale: string): Promise<Record<string, string>> {
    console.log(`🗂️ Fetching category translations for locale: ${locale}`);
    
    // 实际项目中可能从 categories 表获取
    const categories = locale === 'zh' ? {
      'category.electronics': '电子产品',
      'category.clothing': '服装',
      'category.furniture': '家具',
      'category.books': '图书',
    } : {
      'category.electronics': 'Electronics',
      'category.clothing': 'Clothing', 
      'category.furniture': 'Furniture',
      'category.books': 'Books',
    };
    
    return categories;
  }
  
  /**
   * 🌐 获取通用翻译 (经常变动的内容)
   */
  async getCommonTranslations(locale: string): Promise<Record<string, string>> {
    console.log(`🌐 Fetching common translations for locale: ${locale}`);
    
    // 例如：促销文案、公告等
    const common = locale === 'zh' ? {
      'banner.promotion': '双十一大促销！全场8折',
      'notice.maintenance': '系统维护通知：本周日2:00-4:00',
      'shipping.free_threshold': '满99元免运费',
    } : {
      'banner.promotion': 'Double 11 Sale! 20% off everything',
      'notice.maintenance': 'Maintenance Notice: Sunday 2:00-4:00 AM',
      'shipping.free_threshold': 'Free shipping over $99',
    };
    
    return common;
  }
}

// ==================== 缓存管理 ====================

class TranslationCacheManager {
  private static cache = new Map<string, { data: any; expiry: number }>();
  private static readonly CACHE_TTL = 5 * 60 * 1000; // 5分钟
  
  static async getOrSet<T>(
    key: string,
    fetcher: () => Promise<T>
  ): Promise<T> {
    const now = Date.now();
    const cached = this.cache.get(key);
    
    // 🎯 缓存命中且未过期
    if (cached && cached.expiry > now) {
      console.log(`💾 Cache HIT for key: ${key}`);
      return cached.data;
    }
    
    // 🔄 缓存未命中或已过期，重新获取
    console.log(`🔄 Cache MISS for key: ${key}, fetching...`);
    const data = await fetcher();
    
    // 💾 写入缓存
    this.cache.set(key, {
      data,
      expiry: now + this.CACHE_TTL
    });
    
    return data;
  }
  
  static clearCache(pattern?: string) {
    if (pattern) {
      // 清除匹配模式的缓存
      const keys = Array.from(this.cache.keys()).filter(key => 
        key.includes(pattern)
      );
      keys.forEach(key => this.cache.delete(key));
      console.log(`🗑️ Cleared ${keys.length} cache entries matching: ${pattern}`);
    } else {
      // 清除所有缓存
      this.cache.clear();
      console.log('🗑️ Cleared all cache entries');
    }
  }
}

// ==================== 增强版配置 ====================

export default getRequestConfig(async ({ requestLocale }) => {
  console.log('🧠===== Enhanced i18n/request.ts ===== START =====');
  
  // 🎯 获取语言代码 (复用原有逻辑)
  let locale: Locale = defaultLocale;
  
  try {
    const headersList = await headers();
    const headerLocale = headersList.get('x-locale');
    
    if (headerLocale && hasLocale(locales, headerLocale)) {
      locale = headerLocale as Locale;
      console.log('✅ Using header locale:', locale);
    }
  } catch (error) {
    console.log('❌ Headers method failed, using default locale');
  }
  
  // 📚 1. 加载静态翻译 (JSON 文件)
  const staticMessages = await TranslationCacheManager.getOrSet(
    `static-messages-${locale}`,
    async () => {
      console.log(`📄 Loading static messages for: ${locale}`);
      return (await import(`../messages/${locale}.json`)).default;
    }
  );
  
  // 🗄️ 2. 加载动态翻译 (数据库)
  const dbService = new DatabaseTranslationService();
  
  const [productTranslations, categoryTranslations, commonTranslations] = await Promise.all([
    TranslationCacheManager.getOrSet(
      `product-translations-${locale}`,
      () => dbService.getProductTranslations(locale)
    ),
    TranslationCacheManager.getOrSet(
      `category-translations-${locale}`,
      () => dbService.getCategoryTranslations(locale)
    ),
    TranslationCacheManager.getOrSet(
      `common-translations-${locale}`,
      () => dbService.getCommonTranslations(locale)
    ),
  ]);
  
  // 🔄 3. 合并所有翻译数据
  const mergedMessages = {
    ...staticMessages, // 静态翻译 (界面元素)
    Product: {
      ...staticMessages.Product,
      ...productTranslations, // 动态商品翻译
    },
    Category: categoryTranslations, // 动态分类翻译
    Common: commonTranslations, // 动态通用翻译
  };
  
  console.log('📊 Translation summary:');
  console.log(`  - Static keys: ${Object.keys(staticMessages).length}`);
  console.log(`  - Product keys: ${Object.keys(productTranslations).length}`);
  console.log(`  - Category keys: ${Object.keys(categoryTranslations).length}`);
  console.log(`  - Common keys: ${Object.keys(commonTranslations).length}`);
  
  console.log('🧠===== Enhanced i18n/request.ts ===== END =====');
  
  return {
    locale,
    messages: mergedMessages,
  };
});

// ==================== 使用示例 ====================

/**
 * 📄 商品页面组件使用示例
 */
export async function ProductPageExample() {
  // 🎯 在组件中使用混合翻译
  // const t = await getTranslations();
  
  // 静态翻译使用 (来自 JSON)
  // t('Home.welcome') // "欢迎使用 Next.js 国际化！"
  
  // 动态翻译使用 (来自数据库)
  // t('Product.add_to_cart') // "加入购物车"
  // t('Category.electronics') // "电子产品"
  // t('Common.banner.promotion') // "双十一大促销！全场8折"
  
  return (
    <div>
      {/* 实际组件内容 */}
    </div>
  );
}

// ==================== 管理工具 ====================

/**
 * 🛠️ 翻译管理工具
 * 用于在管理后台更新动态翻译
 */
export class TranslationManager {
  
  /**
   * 📝 更新动态翻译
   */
  static async updateTranslation(
    locale: string,
    category: string,
    key: string,
    value: string
  ) {
    // 🗄️ 更新数据库
    console.log(`📝 Updating translation: ${locale}.${category}.${key} = ${value}`);
    
    // 实际项目中的数据库更新
    /*
    await db.query(`
      INSERT INTO dynamic_translations (locale, category, translation_key, translation_value)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE translation_value = VALUES(translation_value)
    `, [locale, category, key, value]);
    */
    
    // 🗑️ 清除相关缓存
    TranslationCacheManager.clearCache(`${category}-translations-${locale}`);
    
    console.log('✅ Translation updated and cache cleared');
  }
  
  /**
   * 🔄 批量更新翻译
   */
  static async batchUpdateTranslations(
    locale: string,
    updates: Array<{ category: string; key: string; value: string }>
  ) {
    console.log(`🔄 Batch updating ${updates.length} translations for ${locale}`);
    
    // 批量数据库操作
    for (const update of updates) {
      await this.updateTranslation(locale, update.category, update.key, update.value);
    }
    
    console.log('✅ Batch update completed');
  }
}

// ==================== 最佳实践总结 ====================

/**
 * 🎯 数据库多语言设计最佳实践：
 * 
 * 1. 📊 分层设计
 *    - 静态翻译：界面元素、固定文案 (JSON)
 *    - 动态翻译：内容数据、变动文案 (数据库)
 * 
 * 2. 🗄️ 数据库设计
 *    - 翻译表模式：灵活，易扩展
 *    - 回退机制：确保用户体验
 *    - 索引优化：提升查询性能
 * 
 * 3. 💾 缓存策略
 *    - 多级缓存：内存 → Redis → 数据库
 *    - 合理TTL：平衡性能和数据新鲜度
 *    - 精确清理：按需清除相关缓存
 * 
 * 4. 🚀 性能优化
 *    - 批量查询：避免N+1问题
 *    - 预加载：常用翻译预先缓存
 *    - 异步更新：后台更新缓存
 * 
 * 5. 🛠️ 管理工具
 *    - 翻译管理后台：非技术人员可操作
 *    - 版本控制：翻译变更历史
 *    - 审核流程：确保翻译质量
 */ 