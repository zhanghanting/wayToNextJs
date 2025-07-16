'use client'
import { useState } from 'react'
import { useSupabase } from '../SupabaseProvider'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')
  const { supabase } = useSupabase()

  const handleLogin = async () => {
    try {
      setStatus('🔄 正在发送魔链...')
      const { error } = await supabase.auth.signInWithOtp({ 
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/Day12/profile`
        }
      })
      
      if (error) {
        console.error('❌ Login error:', error)
        setStatus(`❌ 登录失败: ${error.message}`)
      } else {
        setStatus('📩 魔链已发送，请查收邮箱并点击链接完成登录')
      }
    } catch (err) {
      console.error('❌ Unexpected error:', err)
      setStatus('❌ 发生未知错误')
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          邮箱地址
        </label>
        <input
          id="email"
          type="email"
          placeholder="请输入您的邮箱"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <button 
        onClick={handleLogin} 
        disabled={!email || status.includes('🔄')}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-4 rounded-md font-medium transition-colors"
      >
        {status.includes('🔄') ? '发送中...' : '发送魔链登录'}
      </button>
      
      {status && (
        <div className={`p-3 rounded-md text-sm ${
          status.includes('❌') 
            ? 'bg-red-50 text-red-700 border border-red-200' 
            : status.includes('📩') 
            ? 'bg-green-50 text-green-700 border border-green-200'
            : 'bg-blue-50 text-blue-700 border border-blue-200'
        }`}>
          {status}
        </div>
      )}
    </div>
  )
}
