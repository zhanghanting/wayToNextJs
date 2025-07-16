import { NextResponse, type NextRequest } from 'next/server'
import { locales, defaultLocale } from './i18n-config'

/**
 * 🚪 Middleware: Next.js 国际化的"门卫"
 * 
 * 作用：拦截所有请求，确保每个页面都有正确的语言标识
 * 执行时机：在页面渲染之前，服务器端执行
 * 
 * 工作流程：
 * 1. 检查 URL 是否包含语言代码 (如 /Day11/zh)
 * 2. 如果有：通过 header 传递语言信息，继续渲染
 * 3. 如果没有：自动重定向到默认语言版本
 */
export function middleware(req: NextRequest) {
  console.log('🚪===== src/middleware.ts ===== START =====');
  
  const { pathname } = req.nextUrl
  console.log('🚪 Middleware Debug:');
  console.log('  - Request URL:', req.url);
  console.log('  - Pathname:', pathname);

  // 🔍 解析 URL 路径，提取可能的语言代码
  // 例如：/Day11/zh/page → ['', 'Day11', 'zh', 'page']
  const pathSegments = pathname.split('/')
  const maybeLocale = pathSegments[2] // 获取第三个段作为语言代码
  
  //根据日志，查看获取的变量值
  console.log('  - Path segments:', pathSegments);
  console.log('  - Maybe locale (segment[2]):', maybeLocale);
  console.log('  - Supported locales:', locales);

  // ✅ 如果 URL 中包含有效的语言代码
  if (locales.includes(maybeLocale as typeof locales[number])) {
    console.log('  - ✅ Locale found, passing through');
    
    // 🎯 关键步骤：通过 HTTP Header 传递语言信息
    // 这样后续的 i18n/request.ts 就能获取到正确的语言
    const response = NextResponse.next();
    response.headers.set('x-locale', maybeLocale);     // 传递语言代码
    response.headers.set('x-pathname', pathname);      // 传递完整路径
    console.log('  - Set x-locale header:', maybeLocale);
    console.log('🚪===== src/middleware.ts ===== END (continue) =====');
    return response;
  }

  // ❌ 如果 URL 中没有语言代码，自动重定向
  console.log('  - ❌ No locale found, redirecting');
  const locale = detectLocale(req)  // 检测用户偏好语言
  const redirectUrl = new URL(req.url)
  redirectUrl.pathname = `/Day11/${locale}`  // 添加语言代码到 URL
  console.log('  - Redirecting to:', redirectUrl.pathname);
  console.log('🚪===== src/middleware.ts ===== END (redirect) =====');
  return NextResponse.redirect(redirectUrl)
}

/**
 * 🌐 检测用户偏好语言
 * 
 * 优先级：
 * 1. Accept-Language header (浏览器语言设置)
 * 2. 默认语言 (en)
 */
function detectLocale(req: NextRequest): string {
  // 从浏览器 Accept-Language 头部获取用户偏好
  const acceptLang = req.headers.get('accept-language') || ''
  
  // 检查是否匹配支持的语言
  for (const locale of locales) {
    if (acceptLang.includes(locale)) {
      return locale
    }
  }
  
  // 如果都不匹配，返回默认语言
  return defaultLocale
}

/**
 * 🎯 Middleware 匹配规则
 * 
 * 只对 /Day11 路径下的请求生效
 * 排除静态资源 (_next, favicon.ico 等)
 * 
 * 匹配规则说明：
 * - '/Day11/:path*' → 匹配 /Day11、/Day11/、/Day11/zh、/Day11/zh/anything 等
 * - ':path*' → 通配符，匹配任意深度的子路径
 * 
 * 示例：
 * ✅ /Day11          → 匹配，会被拦截
 * ✅ /Day11/         → 匹配，会被拦截  
 * ✅ /Day11/zh       → 匹配，会被拦截
 * ✅ /Day11/en/page  → 匹配，会被拦截
 * ❌ /Day12/zh       → 不匹配，不会被拦截
 * ❌ /about          → 不匹配，不会被拦截
 * ❌ /_next/static   → 不匹配，不会被拦截
 */
export const config = {
  matcher: [
    '/Day11/:path*', // 只拦截 Day11 路径下的所有请求
  ],
}
