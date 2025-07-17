// src/app/env-test/server-action-test.tsx
'use client'
import { useState } from 'react'
import { testEnvVariables, testSupabaseConnection } from './actions'

export default function ServerActionTest() {
  const [envResults, setEnvResults] = useState<any>(null)
  const [supabaseResult, setSupabaseResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleTestEnv = async () => {
    setLoading(true)
    try {
      const result = await testEnvVariables()
      setEnvResults(result)
    } catch (error) {
      setEnvResults({ success: false, error: String(error) })
    } finally {
      setLoading(false)
    }
  }

  const handleTestSupabase = async () => {
    setLoading(true)
    try {
      const result = await testSupabaseConnection()
      setSupabaseResult(result)
    } catch (error) {
      setSupabaseResult({ success: false, error: String(error) })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 border border-purple-200 rounded">
      <h3 className="font-bold mb-2">Server Actions 环境变量测试</h3>
      
      <div className="space-y-4">
        <div>
          <button
            onClick={handleTestEnv}
            disabled={loading}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-gray-400"
          >
            {loading ? '测试中...' : '测试环境变量'}
          </button>
          
          {envResults && (
            <div className="mt-2 p-3 bg-gray-50 rounded">
              {envResults.success ? (
                <div>
                  <div className="font-medium text-green-600 mb-2">✅ Server Action 执行成功</div>
                  <div className="space-y-1 text-sm">
                    {envResults.results.map((result: any) => (
                      <div key={result.name}>
                        <span className="font-mono">{result.name}</span>: {result.exists ? '✅ 存在' : '❌ 不存在'}
                        {result.preview && <span className="text-gray-600 ml-2">({result.preview})</span>}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-red-600">❌ 错误: {envResults.error}</div>
              )}
            </div>
          )}
        </div>

        <div>
          <button
            onClick={handleTestSupabase}
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
          >
            {loading ? '测试中...' : '测试 Supabase 连接'}
          </button>
          
          {supabaseResult && (
            <div className="mt-2 p-3 bg-gray-50 rounded">
              {supabaseResult.success ? (
                <div className="text-green-600">✅ {supabaseResult.message}</div>
              ) : (
                <div className="text-red-600">❌ 错误: {supabaseResult.error}</div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>💡 这些测试会在服务器端执行，并在浏览器控制台和服务器控制台显示详细信息。</p>
      </div>
    </div>
  )
} 