// src/app/Day13/page.tsx
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'

export const dynamic = 'force-dynamic'   // 🔄 SSR + Realtime

/**
 * 📝 Day13主页面 - Realtime Todo应用
 * 
 * 功能特性：
 * 1. 🎨 整合TodoForm和TodoList组件
 * 2. 🔥 支持实时数据同步
 * 3. 🛡️ 使用Server Actions处理数据操作
 * 4. 📡 基于Supabase Realtime的WebSocket通信
 */
export default function Page() {
  return (
    <main className="max-w-md mx-auto p-6">
      {/* 📋 页面标题 */}
      <h1 className="text-2xl font-bold mb-4 text-center">📝 Realtime Todo</h1>
      <p className="text-gray-600 text-center mb-6">实时协作的待办事项应用</p>
      
      {/* 🏠 主要内容区域 */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        {/* 📝 任务创建表单 */}
        <TodoForm />
        
        {/* 📋 任务列表显示 */}
        <div className="mt-6">
          <TodoList />
        </div>
      </div>
      
      {/* ℹ️ 应用信息 */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>💡 支持实时同步，多设备协作</p>
        <p className="mt-1">⚡ 基于 Next.js 15 + Supabase 构建</p>
      </div>
    </main>
  )
}
