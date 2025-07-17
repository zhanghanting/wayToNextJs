-- Day13 Supabase表创建脚本
-- 在Supabase Dashboard > SQL Editor 中执行此脚本

-- 创建todos表
CREATE TABLE IF NOT EXISTS todos (
  id BIGSERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  done BOOLEAN DEFAULT FALSE,
  user_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_todos_user_id ON todos(user_id);
CREATE INDEX IF NOT EXISTS idx_todos_created_at ON todos(created_at DESC);

-- 启用行级安全 (Row Level Security)
-- 禁用行级安全（开发环境暂时禁用为了方便，也可根据自身需求根据下方命令可以RLS）
ALTER TABLE todos DISABLE ROW LEVEL SECURITY;
--ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- 创建RLS策略 (可选，用于生产环境)
-- 注意：当前使用Service Role Key，会跳过RLS检查
-- 以下策略供参考：

-- 允许用户查看自己的todos
-- CREATE POLICY "Users can view own todos" ON todos
--   FOR SELECT USING (auth.uid()::text = user_id);

-- 允许用户创建自己的todos  
-- CREATE POLICY "Users can create own todos" ON todos
--   FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- 允许用户更新自己的todos
-- CREATE POLICY "Users can update own todos" ON todos  
--   FOR UPDATE USING (auth.uid()::text = user_id);

-- 允许用户删除自己的todos
-- CREATE POLICY "Users can delete own todos" ON todos
--   FOR DELETE USING (auth.uid()::text = user_id);

-- 插入一些示例数据（可选）
INSERT INTO todos (content, user_id, done) VALUES 
  ('学习 Next.js', 'demo_user_example', false),
  ('配置 Supabase', 'demo_user_example', true),
  ('构建 Todo 应用', 'demo_user_example', false)
ON CONFLICT DO NOTHING; 