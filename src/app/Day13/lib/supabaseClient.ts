// src/app/Day13/lib/supabaseClient.ts

import { createClient } from '@supabase/supabase-js'

/**
 * 🌐 Supabase客户端配置 - 客户端连接
 * 
 * 这个客户端实例用于：
 * 1. 📊 数据查询（SELECT操作）
 * 2. 🔥 实时监听（Realtime subscriptions）
 * 3. 🔍 前端数据展示
 * 
 * 与服务端客户端的区别：
 * ┌─────────────────┬──────────────────┬──────────────────┐
 * │     特性        │   客户端连接     │   服务端连接     │
 * ├─────────────────┼──────────────────┼──────────────────┤
 * │ 密钥类型        │ ANON_KEY         │ SERVICE_ROLE_KEY │
 * │ 权限级别        │ 受限制           │ 完整权限         │
 * │ RLS检查         │ 启用             │ 可绕过           │
 * │ 使用场景        │ 读取、监听       │ 写入、删除       │
 * │ 安全性          │ 可暴露给客户端   │ 必须保密         │
 * └─────────────────┴──────────────────┴──────────────────┘
 */

// 🔐 环境变量读取
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

/**
 * 🏗️ 创建Supabase客户端实例
 * 
 * createClient 参数说明：
 * @param supabaseUrl - Supabase项目的API端点URL
 * @param supabaseAnonKey - 匿名访问密钥（公开安全）
 * 
 * 这个实例的主要用途：
 * 1. 🔍 在TodoList中查询用户的todos
 * 2. 📡 设置Realtime channel监听数据变化
 * 3. 🔄 响应数据库事件并更新本地状态
 * 
 * 注意事项：
 * - ✅ 使用NEXT_PUBLIC_前缀的环境变量，客户端可访问
 * - 🔒 ANON_KEY是设计为可公开的，但有权限限制
 * - 📊 主要用于读取操作，写入通过Server Actions
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * 🎯 客户端 vs 服务端的协作模式：
 * 
 * 🔄 数据流向：
 * 
 * 1. 📝 用户创建任务：
 *    用户输入 → TodoForm → Server Action (服务端) → 数据库
 * 
 * 2. 📡 实时同步：
 *    数据库变化 → Realtime事件 → 客户端监听 → TodoList更新
 * 
 * 3. 🔍 数据查询：
 *    页面加载 → 客户端查询 → 显示现有数据
 * 
 * 4. ✏️ 数据修改：
 *    用户操作 → Server Action (服务端) → 数据库 → 实时事件 → 客户端更新
 * 
 * 🛡️ 安全模型：
 * - 客户端：负责展示和监听，使用受限权限
 * - 服务端：负责修改和验证，使用完整权限
 * - 实时：自动同步，无需手动刷新
 */

/**
 * 💡 为什么要分离客户端和服务端？
 * 
 * 1. 🔐 安全性：
 *    - 敏感操作在服务端执行，客户端无法直接修改关键数据
 *    - Service Role Key不会暴露给浏览器
 * 
 * 2. ⚡ 性能：
 *    - 客户端专注于UI和实时更新
 *    - 服务端专注于业务逻辑和数据验证
 * 
 * 3. 🎯 职责分离：
 *    - 客户端：用户体验和界面响应
 *    - 服务端：数据完整性和业务规则
 * 
 * 4. 🔄 可扩展性：
 *    - 可以独立优化客户端和服务端性能
 *    - 支持多种客户端（Web、移动端等）
 */
