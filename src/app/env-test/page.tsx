// src/app/env-test/page.tsx
import EnvClientTest from './client-test'
import ServerActionTest from './server-action-test'
import QuoteTest from './quote-test'

// 服务器端环境变量测试
function ServerEnvTest() {
  return (
    <div className="p-4 border border-blue-200 rounded">
      <h3 className="font-bold mb-2">服务器端环境变量 (Server Component)</h3>
      <div className="space-y-1 text-sm">
        <div>NEXT_PUBLIC_SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ 存在' : '❌ 不存在'}</div>
        <div>NEXT_PUBLIC_SUPABASE_ANON_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ 存在' : '❌ 不存在'}</div>
        <div>SUPABASE_SERVICE_ROLE_KEY: {process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ 存在' : '❌ 不存在'}</div>
        <div>GEMINI_API_KEY: {process.env.GEMINI_API_KEY ? '✅ 存在' : '❌ 不存在'}</div>
        <div>NODE_ENV: {process.env.NODE_ENV}</div>
      </div>
      <details className="mt-4">
        <summary className="cursor-pointer text-blue-600">显示实际值 (小心泄露)</summary>
        <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
          <div>NEXT_PUBLIC_SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}</div>
          <div>SUPABASE_SERVICE_ROLE_KEY: {process.env.SUPABASE_SERVICE_ROLE_KEY?.substring(0, 20)}...</div>
        </div>
      </details>
    </div>
  )
}

export default function EnvTestPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">环境变量测试</h1>
      
      <div className="space-y-6">
        <ServerEnvTest />
        <EnvClientTest />
        <ServerActionTest />
        <QuoteTest />
      </div>
      
      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h3 className="font-bold text-yellow-800">诊断说明</h3>
        <ul className="mt-2 text-sm text-yellow-700 space-y-1">
          <li>• NEXT_PUBLIC_* 变量应该在客户端和服务器端都可见</li>
          <li>• 其他变量只在服务器端可见</li>
          <li>• 如果服务器端看不到变量，检查 .env.local 文件位置和格式</li>
          <li>• 如果客户端看不到 NEXT_PUBLIC_* 变量，可能是构建问题</li>
          <li>• Server Actions 中环境变量读取失败通常是缓存或重启问题</li>
        </ul>
      </div>
    </div>
  )
} 