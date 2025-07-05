/** @type {import('postcss-load-config').Config} */
export default {
  // v4 把 PostCSS 插件拆分到了独立包 @tailwindcss/postcss
  plugins: [
    "@tailwindcss/postcss",      // 必需：处理 @import "tailwindcss";
    // "autoprefixer",           // 可选：如需额外浏览器前缀支持，先 `pnpm add -D autoprefixer`
  ],
};
