// src/app/Day13/components/TodoForm.tsx
'use client'  // 🖥️ 客户端组件：需要处理用户交互和状态

import { FormEvent, useState, useEffect } from 'react'
import { addTodo } from '../action'

/**
 * 📝 TodoForm组件 - 任务创建表单
 * 
 * 主要功能：
 * 1. 🎨 提供用户友好的输入界面
 * 2. 📤 收集用户输入并提交到Server Action
 * 3. 🔄 处理提交状态和错误反馈
 * 4. 👤 管理演示用户ID
 */
export default function TodoForm() {
  // 🏠 组件状态管理
  const [input, setInput] = useState('')               // 用户输入的任务内容
  const [userId, setUserId] = useState<string>('')     // 当前用户ID
  const [isSubmitting, setIsSubmitting] = useState(false)  // 提交状态
  const [error, setError] = useState<string>('')       // 错误信息
  const [lastAdded, setLastAdded] = useState<string>('')   // 最后添加的任务信息

  /**
   * 👤 用户ID初始化
   * 
   * 在真实应用中，这里会是用户认证系统
   * 但为了演示，我们使用localStorage存储的随机ID
   */
  useEffect(() => {
    // 🔍 尝试获取已存在的用户ID
    let storedUserId = localStorage.getItem('demo_user_id')
    
    if (!storedUserId) {
      // 🆕 如果不存在，创建新的用户ID
      storedUserId = 'demo_user_' + Math.random().toString(36).substr(2, 9)
      localStorage.setItem('demo_user_id', storedUserId)
      console.log('🆕 创建新用户ID:', storedUserId)
    } else {
      console.log('👤 使用现有用户ID:', storedUserId)
    }
    
    setUserId(storedUserId)
  }, [])

  /**
   * 📤 表单提交处理函数
   * 
   * @param e - 表单提交事件
   * 
   * 工作流程：
   * 1. 阻止默认表单提交行为
   * 2. 验证输入内容和用户状态
   * 3. 设置提交状态，防止重复提交
   * 4. 调用Server Action
   * 5. 处理成功/错误结果
   * 6. 重置表单状态
   */
  async function handleSubmit(e: FormEvent) {
    e.preventDefault()  // 🚫 阻止浏览器默认的表单提交行为
    
    // ✅ 输入验证
    if (!input.trim() || !userId || isSubmitting) return
    
    setIsSubmitting(true)  // 🔒 锁定提交状态，防止重复提交
    setError('')           // 🧹 清除之前的错误信息
    
    try {
      console.log('📤 提交任务:', { content: input, userId })
      
      // 🌐 调用Server Action
      // 这里看起来像普通的函数调用，但实际上是向服务器发送请求
      const result = await addTodo(input, userId)
      
      console.log('✅ 任务添加成功:', result)
      
      // 🎉 成功处理
      setInput('')  // 清空输入框
      setLastAdded(`✅ 已添加: "${input}" (ID: ${result?.id || '未知'})`)
      
      // 📡 注意：不需要手动更新TodoList
      // 因为Server Action会触发数据库变化 → Realtime事件 → TodoList自动更新
      
    } catch (error) {
      // ❌ 错误处理
      console.error('添加任务失败:', error)
      const errorMessage = error instanceof Error ? error.message : '添加任务失败，请重试'
      setError(errorMessage)
      
      // 🩺 针对性错误提示
      if (errorMessage.includes('relation "todos" does not exist')) {
        setError('数据库表不存在，请先创建todos表')
      } else if (errorMessage.includes('connection')) {
        setError('数据库连接失败，请检查Supabase配置')
      }
    } finally {
      setIsSubmitting(false)  // 🔓 解锁提交状态
    }
  }

  return (
    <div>
      {/* 👤 用户信息显示 */}
      <div className="mb-2 p-2 bg-green-50 border border-green-200 rounded text-sm">
        <div>
          👤 <strong>表单用户ID:</strong> 
          <code className="bg-green-100 px-1 rounded">{userId}</code>
        </div>
        {/* ✅ 成功提示 */}
        {lastAdded && <div className="mt-1 text-green-700">{lastAdded}</div>}
      </div>
      
      {/* ❌ 错误信息显示 */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">❌ {error}</p>
          <p className="text-red-600 text-xs mt-1">
            提示：如果是数据库问题，请检查Supabase中是否存在todos表
          </p>
        </div>
      )}
      
      {/* 📝 主要表单 */}
      <form onSubmit={handleSubmit} className="flex gap-2 my-4">
        {/* 📝 任务内容输入框 */}
        <input
          value={input}
          onChange={e => setInput(e.target.value)}  // 受控组件
          placeholder="添加新任务…"
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isSubmitting}  // 提交时禁用输入
        />
        
        {/* ➕ 提交按钮 */}
        <button 
          type="submit"
          disabled={!input.trim() || isSubmitting}  // 禁用条件
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '⏳' : '➕'}  {/* 动态按钮内容 */}
        </button>
      </form>
    </div>
  )
}

/**
 * 💡 TodoForm组件的关键设计原则：
 * 
 * 1. 🎯 用户体验优先：
 *    - 即时的视觉反馈（加载状态、成功/错误提示）
 *    - 防止重复提交
 *    - 清晰的错误信息
 * 
 * 2. 🔄 响应式状态管理：
 *    - 使用React Hooks管理所有状态
 *    - 受控组件确保数据一致性
 *    - 合理的状态重置时机
 * 
 * 3. 🌐 与后端的协作：
 *    - 通过Server Actions与数据库交互
 *    - 依赖Realtime机制更新界面
 *    - 错误处理和用户反馈
 * 
 * 4. 🛡️ 错误处理：
 *    - 多层错误捕获
 *    - 用户友好的错误信息
 *    - 优雅的降级处理
 */
