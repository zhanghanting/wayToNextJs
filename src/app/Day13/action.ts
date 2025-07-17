// src/app/Day13/action.ts
'use server'  // 🚨 重要：这个指令告诉Next.js这些函数是Server Actions

import { createClient } from '@supabase/supabase-js'

/**
 * 🏗️ 服务端Supabase客户端配置
 * 
 * 为什么需要服务端客户端？
 * 1. 🔐 安全性：使用Service Role Key，拥有完整数据库权限
 * 2. 🚫 绕过RLS：Service Role Key可以绕过行级安全策略
 * 3. 🛡️ 权限控制：敏感操作（写入/删除）在服务器端执行
 * 4. 🔒 密钥保护：Service Role Key不会暴露给客户端
 * 
 * 与客户端的区别：
 * - 客户端使用 ANON_KEY（匿名密钥），权限有限
 * - 服务端使用 SERVICE_ROLE_KEY（服务角色密钥），权限完整
 */
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,      // Supabase项目URL
  process.env.SUPABASE_SERVICE_ROLE_KEY!      // ✔️ Service Key才能跳过RLS
)

/**
 * 📝 新增任务 Server Action
 * 
 * @param content - 任务内容
 * @param userId - 用户ID（演示用的字符串ID）
 * @returns 创建的任务对象
 * 
 * 工作流程：
 * 1. 接收来自客户端的参数
 * 2. 使用Service Role Key连接数据库
 * 3. 插入新记录到todos表
 * 4. 数据库自动触发Realtime事件
 * 5. 所有订阅的客户端收到INSERT事件
 * 6. 返回创建的任务数据
 */
export async function addTodo(content: string, userId: string) {
  console.log('🔧 Server Action: addTodo执行', { content, userId })
  
  try {
    // 📤 向数据库插入新任务
    const { data, error } = await supabase
      .from('todos')                          // 目标表
      .insert({ 
        content,                              // 任务内容
        user_id: userId,                      // 用户ID
        done: false                           // 默认未完成（数据库也有默认值）
      })
      .select()                               // 返回插入的数据
    
    if (error) {
      console.error('❌ 数据库插入失败:', error)
      throw new Error(`插入失败: ${error.message}`)
    }
    
    console.log('✅ 任务创建成功:', data[0])
    
    // 🔄 数据库插入成功后，会自动触发Realtime事件
    // 所有订阅了'public:todos'频道的客户端都会收到INSERT事件
    // 因此客户端会自动更新，无需手动通知
    
    return data[0]  // 返回创建的任务对象
    
  } catch (error) {
    console.error('❌ addTodo Server Action失败:', error)
    throw error     // 重新抛出错误，让客户端能够捕获
  }
}

/**
 * ✏️ 切换任务完成状态 Server Action
 * 
 * @param id - 任务ID
 * @param done - 新的完成状态
 * 
 * 工作流程：
 * 1. 根据任务ID更新done字段
 * 2. 数据库触发UPDATE事件
 * 3. 客户端自动接收并更新界面
 */
export async function toggleDone(id: number, done: boolean) {
  console.log('🔧 Server Action: toggleDone执行', { id, done })
  
  try {
    // 📝 更新指定任务的完成状态
    const { error } = await supabase
      .from('todos')                          // 目标表
      .update({ 
        done,                                 // 新的完成状态
        updated_at: new Date().toISOString()  // 更新时间戳（可选）
      })
      .eq('id', id)                           // 条件：匹配任务ID
    
    if (error) {
      console.error('❌ 状态更新失败:', error)
      throw new Error(`更新失败: ${error.message}`)
    }
    
    console.log('✅ 任务状态更新成功:', { id, done })
    
    // 🔄 更新成功后，数据库会触发UPDATE事件
    // 客户端会自动收到事件并更新对应任务的显示状态
    
  } catch (error) {
    console.error('❌ toggleDone Server Action失败:', error)
    throw error
  }
}

/**
 * 🗑️ 删除任务 Server Action
 * 
 * @param id - 要删除的任务ID
 * 
 * 工作流程：
 * 1. 从数据库中删除指定ID的任务
 * 2. 数据库触发DELETE事件
 * 3. 客户端自动从列表中移除该任务
 */
export async function removeTodo(id: number) {
  console.log('🔧 Server Action: removeTodo执行', { id })
  
  try {
    // 🗑️ 从数据库删除指定任务
    const { error } = await supabase
      .from('todos')                          // 目标表
      .delete()                               // 删除操作
      .eq('id', id)                           // 条件：匹配任务ID
    
    if (error) {
      console.error('❌ 任务删除失败:', error)
      throw new Error(`删除失败: ${error.message}`)
    }
    
    console.log('✅ 任务删除成功:', { id })
    
    // 🔄 删除成功后，数据库会触发DELETE事件
    // 客户端会自动收到事件并从列表中移除该任务
    
  } catch (error) {
    console.error('❌ removeTodo Server Action失败:', error)
    throw error
  }
}

/**
 * 🎯 Server Actions 关键概念解释：
 * 
 * 1. 🏃‍♂️ 执行环境：
 *    - 在Node.js服务器端执行，不是浏览器
 *    - 可以访问服务器端的环境变量和文件系统
 *    - 拥有完整的数据库权限
 * 
 * 2. 🔒 安全性：
 *    - 客户端无法直接访问数据库，必须通过Server Actions
 *    - 敏感密钥（Service Role Key）不会泄露给客户端
 *    - 可以在服务端进行权限验证和数据验证
 * 
 * 3. 📡 通信方式：
 *    - 客户端调用Server Action就像调用普通异步函数
 *    - Next.js自动处理序列化和网络传输
 *    - 支持复杂数据类型的传递
 * 
 * 4. 🔄 与Realtime的配合：
 *    - Server Action修改数据库 → 触发Realtime事件
 *    - 客户端监听事件 → 自动更新界面
 *    - 实现了真正的实时协作
 */
