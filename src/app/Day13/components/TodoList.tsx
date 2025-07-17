// src/app/Day13/components/TodoList.tsx
'use client'  // 🖥️ 客户端组件：需要处理实时监听和状态管理

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { toggleDone, removeTodo } from '../action'

// 定义Todo数据类型
type Todo = { 
  id: number; 
  content: string; 
  done: boolean; 
  user_id: string 
}

export default function TodoList() {
  // 🏠 组件状态管理
  const [todos, setTodos] = useState<Todo[]>([])     // 存储任务列表
  const [userId, setUserId] = useState<string>('')   // 当前用户ID
  const [loading, setLoading] = useState(true)       // 加载状态
  const [showDebug, setShowDebug] = useState(false)  // 是否显示调试信息

  // 🔄 手动刷新数据功能
  const refreshTodos = async () => {
    if (!userId) return
    
    console.log('🔄 手动刷新todos，用户ID:', userId)
    
    try {
      // 📡 直接查询Supabase数据库
      // 使用客户端连接（Anon Key），只查询当前用户的数据
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      
      console.log('📊 查询结果:', { data, error, userId })
      
      if (error) {
        console.error('❌ 查询错误:', error)
        setTodos([])
      } else {
        setTodos(data || [])
      }
    } catch (error) {
      console.error('❌ 刷新异常:', error)
    }
  }

  /** 
   * 🚀 核心功能：初始数据加载 + 实时监听设置
   * 
   * 工作流程：
   * 1. 获取用户ID (localStorage)
   * 2. 初始化加载该用户的所有todos
   * 3. 设置Supabase Realtime监听
   * 4. 当数据库有变化时，自动更新本地状态
   */
  useEffect(() => {
    // 📋 步骤1：获取演示用户ID
    const storedUserId = localStorage.getItem('demo_user_id')
    console.log('👤 获取用户ID:', storedUserId)
    
    if (!storedUserId) {
      setLoading(false)
      return
    }
    setUserId(storedUserId)

    // 📋 步骤2：初始数据加载
    const fetchInit = async () => {
      try {
        console.log('📡 初始化加载数据，用户ID:', storedUserId)
        
        // 🔍 查询数据库：只获取当前用户的todos
        const { data, error } = await supabase
          .from('todos')                        // 表名
          .select('*')                          // 选择所有字段
          .eq('user_id', storedUserId)          // 过滤条件：用户ID匹配
          .order('created_at', { ascending: false }) // 排序：最新的在前
        
        console.log('📊 初始查询结果:', { data, error, count: data?.length })
        
        if (error) {
          console.error('Supabase查询错误:', error)
          setTodos([]) // 出错时设置为空数组
        } else {
          // 确保data不为null，如果为null则设置为空数组
          setTodos(data || [])
        }
      } catch (error) {
        console.error('获取任务失败:', error)
        setTodos([]) // 出错时设置为空数组
      } finally {
        setLoading(false)
      }
    }
    fetchInit()

    // 📋 步骤3：设置Supabase Realtime监听
    console.log('🔥 设置实时监听')
    
    /** 
     * 🌐 Supabase Channel机制详解：
     * 
     * Channel是Supabase的实时通信机制，基于WebSocket实现
     * 工作原理：
     * 1. 客户端创建一个channel（通信频道）
     * 2. 订阅特定的数据库事件（INSERT/UPDATE/DELETE）
     * 3. 当数据库发生变化时，Supabase自动推送事件到所有订阅的客户端
     * 4. 客户端接收事件并更新本地状态
     * 
     * 优势：
     * - 实时性：数据变化立即同步到所有客户端
     * - 高效性：只推送变化的数据，不需要轮询
     * - 可靠性：基于PostgreSQL的LISTEN/NOTIFY机制
     */
    const channel = supabase
      .channel('public:todos')              // 创建频道，名称可以自定义
      .on(
        'postgres_changes',                 // 监听PostgreSQL数据变化
        { 
          event: '*',                       // 监听所有事件类型 (INSERT/UPDATE/DELETE)
          schema: 'public',                 // 数据库模式
          table: 'todos'                    // 监听的表名
        },
        payload => {
          /** 
           * 🎯 事件处理函数：当todos表发生变化时被调用
           * 
           * payload包含：
           * - eventType: 'INSERT' | 'UPDATE' | 'DELETE'
           * - new: 新的数据记录（INSERT/UPDATE时）
           * - old: 旧的数据记录（UPDATE/DELETE时）
           * - table: 表名
           * - schema: 模式名
           */
          console.log('🔥 收到实时更新:', payload)
          
          // 📝 数据类型转换，as Todo的意思是明确告诉编译器数据类型是Todo,不需要额外检查推断
          const newData = payload.new as Todo    // 新数据
          const oldData = payload.old as Todo    // 旧数据
          
          /** 
           * 🔄 根据事件类型更新本地状态
           * 
           * 注意：我们只处理当前用户的数据，忽略其他用户的变化
           * 这样可以确保用户只看到自己的任务
           */
          
          // ➕ 新增事件：有新任务被创建
          if (payload.eventType === 'INSERT' && newData.user_id === storedUserId) {
            console.log('➕ 添加新任务:', newData)
            // 🔝 将新任务添加到列表顶部
            setTodos(currentTodos => [newData, ...currentTodos])
          }
          
          // ✏️ 更新事件：任务被修改（如标记完成/未完成）
          if (payload.eventType === 'UPDATE' && newData.user_id === storedUserId) {
            console.log('✏️ 更新任务:', newData)
            // 🔄 找到对应的任务并替换为新数据
            setTodos(currentTodos =>
              currentTodos.map(item =>
                item.id === newData.id ? newData : item
              )
            )
          }
          
          // 🗑️ 删除事件：任务被删除
          if (payload.eventType === 'DELETE' && oldData.user_id === storedUserId) {
            console.log('🗑️ 删除任务:', oldData)
            // 🚮 从列表中移除该任务
            setTodos(currentTodos => 
              currentTodos.filter(item => item.id !== oldData.id)
            )
          }
        }
      )
      .subscribe((status) => {
        /** 
         * 📡 订阅状态回调
         * 
         * 可能的状态：
         * - 'SUBSCRIBED': 订阅成功，开始接收事件
         * - 'CHANNEL_ERROR': 订阅失败
         * - 'TIMED_OUT': 订阅超时
         * - 'CLOSED': 连接关闭
         */
        console.log('📡 实时监听状态:', status)
      })

    // 📋 步骤4：清理函数
    return () => {
      /** 
       * 🧹 组件卸载时的清理工作
       * 
       * 重要：必须取消订阅，否则会造成内存泄漏
       * 当用户离开页面或组件重新渲染时，需要断开WebSocket连接
       */
      console.log('🔌 断开实时连接')
      supabase.removeChannel(channel)
    }
  }, []) // 空依赖数组：只在组件挂载时执行一次

  // 🎯 处理任务状态切换（完成/未完成）
  const handleToggleDone = async (id: number, done: boolean) => {
    try {
      // 📤 调用Server Action更新数据库
      await toggleDone(id, done)
      // 📡 实时监听会自动收到UPDATE事件并更新界面，无需手动更新状态
    } catch (error) {
      console.error('切换任务状态失败:', error)
      alert('操作失败，请重试')
    }
  }

  // 🗑️ 处理任务删除
  const handleRemoveTodo = async (id: number) => {
    try {
      // 📤 调用Server Action删除数据库记录
      await removeTodo(id)
      // 📡 实时监听会自动收到DELETE事件并更新界面，无需手动更新状态
    } catch (error) {
      console.error('删除任务失败:', error)
      alert('删除失败，请重试')
    }
  }

  // 🔄 渲染逻辑
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin inline-block w-6 h-6 border-2 border-current border-t-transparent text-blue-600 rounded-full"></div>
        <p className="text-gray-500 mt-2">加载中...</p>
      </div>
    )
  }

  if (!userId) {
    return <p className="text-gray-500 text-center py-4">正在初始化用户...</p>
  }

  return (
    <div>
      {/* 🔧 可选的调试信息 */}
      {showDebug && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
          <div className="flex justify-between items-center">
            <span>用户ID: {userId} | 任务数量: {todos.length}</span>
            <button
              onClick={refreshTodos}
              className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
            >
              🔄 刷新
            </button>
          </div>
        </div>
      )}

      {/* 📋 任务列表 */}
      {!todos || !Array.isArray(todos) || todos.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">📝</div>
          <p className="text-gray-500 mb-4">还没有任务哦</p>
          <p className="text-sm text-gray-400">在上方输入框添加你的第一个任务吧！</p>
          {/* 🔧 调试模式切换 */}
          <button
            onClick={() => setShowDebug(!showDebug)}
            className="mt-4 text-xs text-gray-400 hover:text-gray-600"
          >
            {showDebug ? '隐藏' : '显示'}调试信息
          </button>
        </div>
      ) : (
        <>
          <ul className="space-y-2">
            {todos.map(todo => (
              <li
                key={todo.id}
                className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                {/* ✅ 任务完成状态切换 */}
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => handleToggleDone(todo.id, !todo.done)}
                  className="w-4 h-4 text-blue-600"
                />
                {/* 📝 任务内容显示 */}
                <span className={`flex-1 ${todo.done ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                  {todo.content}
                </span>
                {/* 🗑️ 删除按钮 */}
                <button 
                  onClick={() => handleRemoveTodo(todo.id)} 
                  className="text-gray-400 hover:text-red-500 transition-colors px-2 py-1"
                  title="删除任务"
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
          
          {/* 🔧 底部调试模式切换 */}
          <div className="mt-4 text-center">
            <button
              onClick={() => setShowDebug(!showDebug)}
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              {showDebug ? '隐藏' : '显示'}调试信息
            </button>
          </div>
        </>
      )}
    </div>
  )
}
