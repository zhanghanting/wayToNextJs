import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

/**
 * 🔧 Next.js 配置文件：项目构建和运行时配置
 * 
 * next-intl 插件配置：
 * - 自动集成 next-intl 到 Next.js 构建流程
 * - 指定 i18n 配置文件路径
 * - 启用服务器端渲染 (SSR) 国际化支持
 * - 优化翻译文件的打包和加载
 */

// 🎯 创建 next-intl 插件实例
// 参数：指向我们的 i18n 配置文件 (src/i18n/request.ts)
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// 📋 Next.js 基础配置
const nextConfig: NextConfig = {
  // 🚀 实验性功能：启用 React Server Components 的最新特性
  experimental: {
    // 启用 React 19 的新特性支持
    reactCompiler: false,
  },
  
  // 🔍 其他配置可以在这里添加
  // 例如：图片优化、重定向规则、环境变量等
};

// 🌐 应用 next-intl 插件包装配置
// 这会自动注入国际化相关的 webpack 配置和优化
export default withNextIntl(nextConfig);
