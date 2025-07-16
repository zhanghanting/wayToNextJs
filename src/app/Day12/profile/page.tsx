'use client'
import { useSupabase } from '../SupabaseProvider'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ProfilePage() {
  const { session, user, supabase } = useSupabase()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  // 显示加载状态
  if (session === null && user === null) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">检查登录状态...</p>
        </div>
      </div>
    )
  }

  // 未登录时重定向
  if (!session || !user) {
    router.push('/Day12/login')
    return null
  }

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('❌ Logout error:', error)
        alert('登出失败: ' + error.message)
      } else {
        router.push('/Day12/login')
      }
    } catch (err) {
      console.error('❌ Unexpected logout error:', err)
      alert('登出时发生未知错误')
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        {/* 欢迎消息 */}
        <div className="text-center border-b pb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🎉 欢迎回来！
          </h1>
          <p className="text-gray-600">
            您已成功登录到Supabase身份验证系统
          </p>
        </div>

        {/* 用户信息 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">用户信息</h2>
          
          <div className="bg-gray-50 p-4 rounded-md space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">邮箱:</span>
              <span className="text-gray-900">{user.email}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">用户ID:</span>
              <span className="text-gray-900 font-mono text-sm">
                {user.id}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">邮箱验证:</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                user.email_confirmed_at 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {user.email_confirmed_at ? '✅ 已验证' : '⏳ 待验证'}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">最后登录:</span>
              <span className="text-gray-900 text-sm">
                {user.last_sign_in_at 
                  ? new Date(user.last_sign_in_at).toLocaleString('zh-CN')
                  : '未知'
                }
              </span>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex space-x-4 pt-4">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-4 rounded-md font-medium transition-colors"
          >
            {isLoggingOut ? '登出中...' : '🚪 登出'}
          </button>
          
          <button
            onClick={() => router.push('/Day12/login')}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-md font-medium transition-colors"
          >
            🔙 返回登录页
          </button>
        </div>
      </div>
      
      {/* 调试信息（开发环境） */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <h3 className="text-sm font-medium text-yellow-800 mb-2">
            🔧 调试信息 (仅开发环境显示)
          </h3>
          <pre className="text-xs text-yellow-700 overflow-auto">
            {JSON.stringify({ session, user }, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
