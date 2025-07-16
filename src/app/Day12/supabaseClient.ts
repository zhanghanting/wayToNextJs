'use client'
import { createBrowserClient } from '@supabase/ssr'

// 定义后备值（开发环境使用）
const FALLBACK_URL = 'https://pdlvxfddebmriqiyyuaf.supabase.co'
const FALLBACK_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkbHZ4ZmRkZWJtcmlxaXl5dWFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2MjkzMTQsImV4cCI6MjA2ODIwNTMxNH0.sc7tVjdm6X0_ynJUbONcPI2sCYy3n_YJxKkSoJZuZEI'

// 获取环境变量，如果不存在则使用后备值
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || FALLBACK_ANON_KEY

// 添加调试信息
console.log('🔧 Supabase Client Debug:')
console.log('  - URL from env:', process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log('  - Key exists from env:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
console.log('  - Final URL:', supabaseUrl)
console.log('  - Final Key exists:', !!supabaseKey)

// 验证最终值
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase configuration is missing!')
}

export const supabase = createBrowserClient(supabaseUrl, supabaseKey)
