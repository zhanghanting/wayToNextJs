// src/app/env-test/client-test.tsx
'use client'
import { useEffect, useState } from 'react'

export default function EnvClientTest() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div>加载中...</div>
  }

  return (
    <div className="p-4 border border-green-200 rounded">
      <h3 className="font-bold mb-2">客户端环境变量 (Client Component)</h3>
      <div className="space-y-1 text-sm">
        <div>NEXT_PUBLIC_SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ 存在' : '❌ 不存在'}</div>
        <div>NEXT_PUBLIC_SUPABASE_ANON_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ 存在' : '❌ 不存在'}</div>
        <div>SUPABASE_SERVICE_ROLE_KEY: {process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ 存在' : '❌ 不存在 (正常，客户端不应该访问)'}</div>
        <div>GEMINI_API_KEY: {process.env.GEMINI_API_KEY ? '✅ 存在' : '❌ 不存在 (正常，客户端不应该访问)'}</div>
        <div>NODE_ENV: {process.env.NODE_ENV}</div>
      </div>
      <details className="mt-4">
        <summary className="cursor-pointer text-green-600">显示实际值</summary>
        <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
          <div>NEXT_PUBLIC_SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}</div>
          <div>NEXT_PUBLIC_SUPABASE_ANON_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20)}...</div>
        </div>
      </details>
    </div>
  )
} 