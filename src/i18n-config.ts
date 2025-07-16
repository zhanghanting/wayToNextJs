/**
 * 🌐 next-intl 全局配置：多语言项目的基础设置
 * 
 * 作用：定义项目支持的语言和默认语言
 * 使用位置：middleware.ts、i18n/request.ts、layout.tsx 等多个文件
 * 
 * 配置说明：
 * - locales: 项目支持的所有语言代码数组
 * - defaultLocale: 默认语言，当无法确定用户语言时使用
 * 
 * 语言代码标准：
 * - 'en': 英语 (English)
 * - 'zh': 中文 (Chinese)
 * - 遵循 ISO 639-1 标准
 */

// 🎯 支持的语言列表
// 添加新语言时，需要同时创建对应的翻译文件 (如 messages/fr.json)
export const locales = ['en', 'zh'] as const;

// 🏠 默认语言
// 当检测不到用户偏好语言时，使用此语言
export const defaultLocale = 'en' as const;

// 📝 TypeScript 类型定义
// 自动从 locales 数组生成联合类型，确保类型安全
export type Locale = (typeof locales)[number]; // 'en' | 'zh'
