// src/app/env-test/actions.ts
'use server'

export async function testEnvVariables() {
  console.log('=== Server Action 环境变量测试 ===')
  
  // 打印所有相关的环境变量
  const envVars = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    NODE_ENV: process.env.NODE_ENV,
  }
  
  // 在服务器控制台打印
  Object.entries(envVars).forEach(([key, value]) => {
    console.log(`${key}: ${value ? '存在' : '不存在'}`)
    if (value && key.includes('KEY')) {
      console.log(`  值预览: ${value.substring(0, 20)}...`)
    } else if (value) {
      console.log(`  值: ${value}`)
    }
  })
  
  // 返回结果给客户端
  return {
    success: true,
    results: Object.entries(envVars).map(([key, value]) => ({
      name: key,
      exists: !!value,
      preview: value ? (key.includes('KEY') ? `${value.substring(0, 20)}...` : value) : null
    }))
  }
}

export async function testSupabaseConnection() {
  console.log('=== Supabase 连接测试 ===')
  
  try {
    const { createClient } = await import('@supabase/supabase-js')
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    
    console.log('supabaseUrl:', supabaseUrl ? '存在' : '不存在')
    console.log('supabaseKey:', supabaseKey ? '存在' : '不存在')
    
    if (!supabaseUrl) {
      return { success: false, error: 'NEXT_PUBLIC_SUPABASE_URL 环境变量缺失' }
    }
    
    if (!supabaseKey) {
      return { success: false, error: 'SUPABASE_SERVICE_ROLE_KEY 环境变量缺失' }
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // 测试连接
    const { data, error } = await supabase.from('todos').select('count', { count: 'exact', head: true })
    
    if (error) {
      console.log('Supabase 错误:', error)
      return { success: false, error: error.message }
    }
    
    console.log('Supabase 连接成功!')
    return { success: true, message: 'Supabase 连接成功' }
    
  } catch (error) {
    console.log('Supabase 测试异常:', error)
    return { success: false, error: String(error) }
  }
} 