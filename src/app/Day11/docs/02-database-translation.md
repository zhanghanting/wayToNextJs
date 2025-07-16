# 数据库翻译命名空间完整实现指南

## 🎯 你的问题解答

> **问题**: "数据库的数据也是通过getTranslations获取嘛？如果是的话这个命名空间如何指定呢？"

**答案**: ✅ 是的！数据库翻译也通过 `getTranslations()` 获取，命名空间在 `request.ts` 中指定。

## 🔄 完整的实现流程

```mermaid
flowchart TD
    subgraph "🗄️ 数据源层"
        A[JSON文件<br/>静态翻译]
        B[数据库表<br/>动态翻译]
    end
    
    subgraph "🔧 处理层 (request.ts)"
        C[loadStaticMessages<br/>从JSON加载]
        D[loadDynamicMessages<br/>从数据库加载]
        E[构建命名空间<br/>指定Products、Categories]
        F[合并翻译对象<br/>静态+动态]
    end
    
    subgraph "🌐 传输层"
        G[getMessages<br/>返回合并后的翻译]
        H[NextIntlClientProvider<br/>传递给客户端]
    end
    
    subgraph "💻 使用层"
        I[useTranslations('Home')<br/>静态翻译]
        J[useTranslations('Products')<br/>数据库翻译]
    end
    
    A --> C
    B --> D
    C --> E
    D --> E
    E --> F
    F --> G
    G --> H
    H --> I
    H --> J
    
    style E fill:#fff3e0
    style F fill:#e8f5e8
```

## 🏗️ 第一步：数据库设计

```sql
-- 产品主表
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  sku VARCHAR(50) NOT NULL,
  price DECIMAL(10,2),
  category_id INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 产品翻译表
CREATE TABLE product_translations (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  locale VARCHAR(5) NOT NULL,        -- 'en', 'zh'
  name VARCHAR(255) NOT NULL,
  description TEXT,
  full_description TEXT,
  UNIQUE(product_id, locale)
);

-- 分类翻译表
CREATE TABLE category_translations (
  id SERIAL PRIMARY KEY,
  category_key VARCHAR(50) NOT NULL,  -- 'electronics', 'books'
  locale VARCHAR(5) NOT NULL,
  name VARCHAR(255) NOT NULL,
  UNIQUE(category_key, locale)
);
```

## 🔧 第二步：在 request.ts 中构建命名空间

### 当前的 request.ts 实现
```typescript
// src/i18n/request.ts
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await getCurrentLocale();
  
  // 📚 1. 加载静态翻译
  const staticMessages = (await import(`../messages/${locale}.json`)).default;
  
  // 🗄️ 2. 加载动态翻译并构建命名空间
  const dynamicMessages = await buildDynamicNamespaces(locale);
  
  // 🎯 3. 合并翻译
  return {
    locale,
    messages: {
      ...staticMessages,    // Home, Demo, ProductDemo 等
      ...dynamicMessages    // Products, Categories 等 👈 这里指定了命名空间！
    }
  };
});
```

### 动态命名空间构建函数
```typescript
// 🔧 这个函数决定了数据库翻译的命名空间名称
async function buildDynamicNamespaces(locale: string) {
  // 📊 从数据库获取翻译数据
  const [productData, categoryData] = await Promise.all([
    loadProductTranslations(locale),
    loadCategoryTranslations(locale)
  ]);
  
  // 🎯 关键：在这里指定命名空间名称
  return {
    "Products": productData,      👈 Products 命名空间由这里定义！
    "Categories": categoryData    👈 Categories 命名空间由这里定义！
  };
}

// 🛍️ 产品翻译加载
async function loadProductTranslations(locale: string) {
  // 假设使用 Prisma 或其他 ORM
  const translations = await prisma.productTranslation.findMany({
    where: { locale },
    include: { product: true }
  });
  
  // 🏗️ 构建产品翻译对象
  const result = {};
  
  // 为每个产品创建翻译条目
  translations.forEach(t => {
    result[`product_${t.product_id}`] = {
      name: t.name,
      description: t.description,
      fullDescription: t.full_description
    };
  });
  
  // 添加通用翻译
  result['common'] = {
    price: locale === 'zh' ? '价格' : 'Price',
    addToCart: locale === 'zh' ? '加入购物车' : 'Add to Cart',
    name: locale === 'zh' ? '产品名称' : 'Product Name'
  };
  
  return result;
}
```

## 📊 第三步：最终的翻译对象结构

### request.ts 返回的完整 messages 对象
```typescript
{
  // 📚 静态翻译 (来自 src/messages/zh.json)
  "Home": {
    "welcome": "欢迎使用 Next.js 国际化！"
  },
  "ProductDemo": {                     👈 静态命名空间
    "title": "🛍️ 数据库翻译命名空间演示"
  },
  
  // 🗄️ 动态翻译 (来自数据库，在 request.ts 中构建)
  "Products": {                        👈 动态命名空间 (你指定的名称)
    "product_1": {
      "name": "游戏笔记本专业版",
      "description": "专为游戏爱好者设计..."
    },
    "product_2": {
      "name": "人体工学办公鼠标",
      "description": "适合办公提升生产力..."
    },
    "common": {
      "price": "价格",
      "addToCart": "加入购物车"
    }
  },
  "Categories": {                      👈 另一个动态命名空间
    "electronics": "电子产品",
    "books": "图书"
  }
}
```

## 💻 第四步：在组件中使用

### 使用方式完全一致
```typescript
'use client';
import { useTranslations } from 'next-intl';

export default function ProductList({ products }) {
  // 🎨 静态翻译 (JSON文件)
  const uiT = useTranslations('ProductDemo');    // 👈 静态命名空间
  
  // 🗄️ 动态翻译 (数据库)
  const productT = useTranslations('Products');  // 👈 动态命名空间
  const categoryT = useTranslations('Categories'); // 👈 另一个动态命名空间
  
  return (
    <div>
      {/* 静态翻译 */}
      <h2>{uiT('title')}</h2>
      
      {products.map(product => (
        <div key={product.id}>
          {/* 动态翻译 */}
          <h3>{productT(`product_${product.id}.name`)}</h3>
          <p>{productT(`product_${product.id}.description`)}</p>
          <p>{productT('common.price')}: ¥{product.price}</p>
          <button>{productT('common.addToCart')}</button>
        </div>
      ))}
    </div>
  );
}
```

## 🎯 关键理解点

### 1. **命名空间的定义位置**
```typescript
// ❌ 错误理解：命名空间在数据库中定义
// ✅ 正确理解：命名空间在 request.ts 中构建时指定

return {
  "Products": productData,     👈 这里决定了命名空间名称
  "MyShop": productData,       👈 你也可以叫 MyShop
  "Store": productData         👈 或者叫 Store
};
```

### 2. **使用方式完全统一**
```typescript
// 🎯 无论翻译来自哪里，使用方式完全相同
const homeT = useTranslations('Home');        // 来自JSON
const productT = useTranslations('Products'); // 来自数据库
const shopT = useTranslations('MyShop');      // 也来自数据库
```

### 3. **灵活的命名空间设计**
```typescript
// 🏗️ 你可以自由设计命名空间结构
return {
  "Shop": {
    "Products": productData,
    "Categories": categoryData
  },
  "User": {
    "Profiles": userProfileData,
    "Orders": orderData
  }
};

// 使用时
const productT = useTranslations('Shop.Products');
const profileT = useTranslations('User.Profiles');
```

## 🚀 实际演示

现在你可以运行项目查看完整演示：

1. **启动项目**: `npm run dev`
2. **访问页面**: `/Day11/zh` 或 `/Day11/en`
3. **查看演示**: 
   - 🏗️ 服务器端翻译 (静态JSON)
   - 🎮 客户端交互翻译 (NextIntlClientProvider)
   - 🛍️ 数据库翻译命名空间 (模拟数据库内容)

## 📝 总结

**核心答案**: 
1. ✅ 数据库翻译也通过 `getTranslations()` 获取
2. ✅ 命名空间在 `request.ts` 中构建时指定
3. ✅ 使用方式与静态翻译完全一致
4. ✅ 你可以自由命名和设计命名空间结构

**数据流**: 数据库 → request.ts (构建命名空间) → getMessages() → NextIntlClientProvider → useTranslations('YourNamespace')

这就是Next.js国际化中处理动态数据库内容的完整机制！🎉 