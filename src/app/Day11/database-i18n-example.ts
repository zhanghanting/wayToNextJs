/**
 * 🗄️ 数据库多语言设计完整示例
 * 
 * 展示如何在实际项目中处理来自数据库的多语言数据
 * 包含：数据模型、Repository模式、服务层、Next.js集成
 */

// ==================== 1. 数据模型定义 ====================

export interface Product {
  id: number;
  price: number;
  category_id: number;
  created_at: Date;
}

export interface ProductTranslation {
  id: number;
  product_id: number;
  language: string;
  name: string;
  description: string;
  short_desc?: string;
}

export interface LocalizedProduct extends Product {
  name: string;
  description: string;
  short_desc?: string;
}

// ==================== 2. Repository 数据访问层 ====================

export class ProductRepository {
  
  /**
   * 🎯 方案1：单独查询翻译表
   * 适合：需要精确控制查询的场景
   */
  async getProductWithTranslation(
    productId: number, 
    language: string
  ): Promise<LocalizedProduct | null> {
    // 模拟数据库查询
    const productQuery = `
      SELECT p.*, 
             pt.name, 
             pt.description, 
             pt.short_desc
      FROM products p
      LEFT JOIN product_translations pt 
        ON p.id = pt.product_id AND pt.language = ?
      WHERE p.id = ?
    `;
    
    const result = await this.db.query(productQuery, [language, productId]);
    return result[0] || null;
  }

  /**
   * 🎯 方案2：获取所有语言版本
   * 适合：需要在前端缓存多语言数据的场景
   */
  async getProductWithAllTranslations(
    productId: number
  ): Promise<Product & { translations: Record<string, ProductTranslation> }> {
    const productQuery = `SELECT * FROM products WHERE id = ?`;
    const translationsQuery = `
      SELECT * FROM product_translations 
      WHERE product_id = ?
    `;
    
    const [product] = await this.db.query(productQuery, [productId]);
    const translations = await this.db.query(translationsQuery, [productId]);
    
    // 转换为语言映射
    const translationMap = translations.reduce((acc, trans) => {
      acc[trans.language] = trans;
      return acc;
    }, {} as Record<string, ProductTranslation>);
    
    return {
      ...product,
      translations: translationMap
    };
  }

  /**
   * 🎯 方案3：批量查询优化
   * 适合：列表页面，避免N+1查询问题
   */
  async getProductsWithTranslations(
    productIds: number[], 
    language: string
  ): Promise<LocalizedProduct[]> {
    const placeholders = productIds.map(() => '?').join(',');
    const query = `
      SELECT p.*, 
             pt.name, 
             pt.description, 
             pt.short_desc
      FROM products p
      LEFT JOIN product_translations pt 
        ON p.id = pt.product_id AND pt.language = ?
      WHERE p.id IN (${placeholders})
    `;
    
    return await this.db.query(query, [language, ...productIds]);
  }

  /**
   * 🎯 方案4：回退机制 (Fallback)
   * 适合：某些语言没有翻译时，回退到默认语言
   */
  async getProductWithFallback(
    productId: number, 
    language: string, 
    fallbackLanguage: string = 'en'
  ): Promise<LocalizedProduct | null> {
    const query = `
      SELECT p.*,
             COALESCE(pt1.name, pt2.name) as name,
             COALESCE(pt1.description, pt2.description) as description,
             COALESCE(pt1.short_desc, pt2.short_desc) as short_desc
      FROM products p
      LEFT JOIN product_translations pt1 
        ON p.id = pt1.product_id AND pt1.language = ?
      LEFT JOIN product_translations pt2 
        ON p.id = pt2.product_id AND pt2.language = ?
      WHERE p.id = ?
    `;
    
    const result = await this.db.query(query, [language, fallbackLanguage, productId]);
    return result[0] || null;
  }

  // 模拟数据库连接
  private db = {
    query: async (sql: string, params: any[]) => {
      // 实际项目中这里是真实的数据库查询
      console.log('🗄️ Database Query:', sql);
      console.log('📝 Parameters:', params);
      
      // 模拟返回数据
      return [
        {
          id: 1,
          price: 99.99,
          category_id: 1,
          created_at: new Date(),
          name: params[0] === 'zh' ? '智能手机' : 'Smartphone',
          description: params[0] === 'zh' ? '最新款智能手机，功能强大' : 'Latest smartphone with powerful features',
          short_desc: params[0] === 'zh' ? '高性能手机' : 'High-performance phone'
        }
      ];
    }
  };
}

// ==================== 3. 服务层 (Service Layer) ====================

export class ProductService {
  private productRepo = new ProductRepository();

  /**
   * 🎯 获取本地化商品信息
   * 包含业务逻辑：缓存、验证、转换等
   */
  async getLocalizedProduct(
    productId: number, 
    language: string
  ): Promise<LocalizedProduct | null> {
    // 🔍 验证语言代码
    const supportedLanguages = ['en', 'zh', 'ja', 'fr'];
    if (!supportedLanguages.includes(language)) {
      language = 'en'; // 回退到默认语言
    }

    // 🗄️ 从数据库获取数据
    let product = await this.productRepo.getProductWithFallback(
      productId, 
      language, 
      'en'
    );

    if (!product) {
      return null;
    }

    // 🎨 业务逻辑处理
    product = this.processProduct(product, language);

    // 💾 缓存处理（可选）
    await this.cacheProduct(productId, language, product);

    return product;
  }

  /**
   * 🎨 商品数据处理
   * 可以包含：格式化、计算、权限检查等
   */
  private processProduct(product: LocalizedProduct, language: string): LocalizedProduct {
    return {
      ...product,
      // 根据语言调整价格显示格式
      price: language === 'zh' ? product.price * 7 : product.price, // 假设汇率转换
      // 其他业务逻辑...
    };
  }

  /**
   * 💾 缓存产品数据
   */
  private async cacheProduct(
    productId: number, 
    language: string, 
    product: LocalizedProduct
  ): Promise<void> {
    const cacheKey = `product:${productId}:${language}`;
    // 实际项目中可以使用 Redis 等缓存
    console.log(`🗄️ Caching product with key: ${cacheKey}`);
  }
}

// ==================== 4. Next.js + next-intl 集成 ====================

/**
 * 🔄 在 i18n/request.ts 中集成数据库数据
 * 
 * 思路：
 * 1. 静态翻译 (JSON) + 动态翻译 (数据库) 分层管理
 * 2. 静态翻译用于界面元素（按钮、标签等）
 * 3. 动态翻译用于内容数据（商品、文章等）
 */
export async function getDatabaseMessages(locale: string) {
  const productService = new ProductService();
  
  // 🎯 获取常用的产品分类翻译
  const categoryTranslations = await getCategoryTranslations(locale);
  
  // 🎯 获取动态内容翻译
  const dynamicTranslations = {
    categories: categoryTranslations,
    // 可以添加更多动态内容
  };

  return dynamicTranslations;
}

async function getCategoryTranslations(locale: string) {
  // 模拟从数据库获取分类翻译
  const categories = [
    { id: 1, name: locale === 'zh' ? '电子产品' : 'Electronics' },
    { id: 2, name: locale === 'zh' ? '服装' : 'Clothing' },
    { id: 3, name: locale === 'zh' ? '家具' : 'Furniture' },
  ];

  return categories.reduce((acc, cat) => {
    acc[`category_${cat.id}`] = cat.name;
    return acc;
  }, {} as Record<string, string>);
}

// ==================== 5. React 组件中的使用 ====================

/**
 * 📄 商品详情页面组件
 * 展示如何在组件中使用数据库多语言数据
 */
export async function ProductDetailPage({ 
  params 
}: { 
  params: Promise<{ locale: string; productId: string }> 
}) {
  const { locale, productId } = await params;
  const productService = new ProductService();
  
  // 🗄️ 获取本地化商品数据
  const product = await productService.getLocalizedProduct(
    parseInt(productId), 
    locale
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  // 🎨 渲染本地化内容
  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <div className="price">
        {locale === 'zh' ? '¥' : '$'}{product.price}
      </div>
    </div>
  );
}

// ==================== 6. 性能优化策略 ====================

export class I18nCacheManager {
  /**
   * 🚀 多级缓存策略
   */
  static async getTranslationWithCache(
    key: string, 
    locale: string,
    fetcher: () => Promise<any>
  ) {
    // Level 1: 内存缓存
    const memoryCache = this.getFromMemory(key, locale);
    if (memoryCache) return memoryCache;

    // Level 2: Redis 缓存
    const redisCache = await this.getFromRedis(key, locale);
    if (redisCache) {
      this.setToMemory(key, locale, redisCache);
      return redisCache;
    }

    // Level 3: 数据库查询
    const dbResult = await fetcher();
    
    // 写入缓存
    await this.setToRedis(key, locale, dbResult);
    this.setToMemory(key, locale, dbResult);
    
    return dbResult;
  }

  private static memoryCache = new Map<string, any>();
  
  private static getFromMemory(key: string, locale: string) {
    return this.memoryCache.get(`${key}:${locale}`);
  }
  
  private static setToMemory(key: string, locale: string, value: any) {
    this.memoryCache.set(`${key}:${locale}`, value);
  }
  
  private static async getFromRedis(key: string, locale: string) {
    // Redis 操作
    console.log(`🔍 Checking Redis cache for ${key}:${locale}`);
    return null; // 模拟
  }
  
  private static async setToRedis(key: string, locale: string, value: any) {
    // Redis 操作
    console.log(`💾 Setting Redis cache for ${key}:${locale}`);
  }
}

export default ProductService; 