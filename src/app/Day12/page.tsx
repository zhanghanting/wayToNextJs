'use client'
import Link from 'next/link'
import { useSupabase } from './SupabaseProvider'

export default function Day12HomePage() {
  const { session, user } = useSupabase()

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* 主标题 */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🔐 Supabase 身份验证演示
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          学习如何在Next.js应用程序中集成Supabase身份验证系统，
          包括魔链登录、会话管理和用户状态跟踪。
        </p>
      </div>

      {/* 当前状态 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          📊 当前状态
        </h2>
        
        {session && user ? (
          <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-md">
            <div>
              <p className="text-green-800 font-medium">✅ 已登录</p>
              <p className="text-green-600 text-sm">
                欢迎回来，{user.email}
              </p>
            </div>
            <Link 
              href="/Day12/profile"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              查看个人资料
            </Link>
          </div>
        ) : (
          <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-md">
            <div>
              <p className="text-blue-800 font-medium">🔓 未登录</p>
              <p className="text-blue-600 text-sm">
                请先登录以体验完整功能
              </p>
            </div>
            <Link 
              href="/Day12/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              立即登录
            </Link>
          </div>
        )}
      </div>

      {/* 功能特性 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          ✨ 功能特性
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">1</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">魔链登录</h3>
                <p className="text-gray-600 text-sm">
                  无需密码，通过邮箱接收魔链安全登录
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-semibold">2</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">会话管理</h3>
                <p className="text-gray-600 text-sm">
                  自动处理用户会话，支持状态持久化
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-semibold">3</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">TypeScript支持</h3>
                <p className="text-gray-600 text-sm">
                  完整的类型安全，提高开发体验
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 font-semibold">4</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">实时状态更新</h3>
                <p className="text-gray-600 text-sm">
                  监听身份验证状态变化，实时更新UI
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 font-semibold">5</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">安全登出</h3>
                <p className="text-gray-600 text-sm">
                  清理会话数据，确保安全退出
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-indigo-600 font-semibold">6</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">现代UI设计</h3>
                <p className="text-gray-600 text-sm">
                  使用Tailwind CSS构建美观的用户界面
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 快速导航 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          🚀 快速导航
        </h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link 
            href="/Day12/login"
            className="block p-4 border border-gray-200 rounded-md hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <div className="text-2xl mb-2">🔑</div>
            <h3 className="font-medium text-gray-900">登录页面</h3>
            <p className="text-sm text-gray-600">体验魔链登录流程</p>
          </Link>

          <Link 
            href="/Day12/profile"
            className="block p-4 border border-gray-200 rounded-md hover:border-green-300 hover:bg-green-50 transition-colors"
          >
            <div className="text-2xl mb-2">👤</div>
            <h3 className="font-medium text-gray-900">个人资料</h3>
            <p className="text-sm text-gray-600">查看用户信息和状态</p>
          </Link>

          <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
            <div className="text-2xl mb-2">🔧</div>
            <h3 className="font-medium text-gray-500">设置页面</h3>
            <p className="text-sm text-gray-400">即将推出...</p>
          </div>
        </div>
      </div>

      {/* 技术栈 */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          🛠️ 技术栈
        </h2>
        
        <div className="flex flex-wrap gap-2">
          {[
            'Next.js 15',
            'React 19',
            'TypeScript',
            'Supabase',
            '@supabase/ssr',
            'Tailwind CSS',
            'pnpm'
          ].map((tech) => (
            <span 
              key={tech}
              className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
} 