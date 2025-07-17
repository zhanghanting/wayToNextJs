// src/app/env-test/quote-test.tsx
'use client'

export default function QuoteTest() {
  return (
    <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded">
      <h3 className="font-bold text-blue-800 mb-4">💡 环境变量最佳实践</h3>
      
      <div className="space-y-4 text-sm">
        <div>
          <h4 className="font-semibold mb-2">1. JWT Token（无需引号）</h4>
          <pre className="bg-gray-100 p-2 rounded text-xs">
{`✅ 推荐：
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIs...

✅ 也可以：
SUPABASE_KEY="eyJhbGciOiJIUzI1NiIs..."

❌ 错误（换行）：
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIs
eyJpc3MiOiJzdXBhYmFzZSIs...`}
          </pre>
        </div>

        <div>
          <h4 className="font-semibold mb-2">2. 包含空格时（必须引号）</h4>
          <pre className="bg-gray-100 p-2 rounded text-xs">
{`✅ 正确：
APP_NAME="My Next.js App"
DATABASE_URL="postgresql://user:pass@host:5432/db name"

❌ 错误：
APP_NAME=My Next.js App  # 会被截断为 "My"`}
          </pre>
        </div>

        <div>
          <h4 className="font-semibold mb-2">3. 特殊字符</h4>
          <pre className="bg-gray-100 p-2 rounded text-xs">
{`✅ 安全做法：
PASSWORD="p@ssw0rd#123"
API_ENDPOINT="https://api.example.com?key=value&other=data"`}
          </pre>
        </div>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
        <h4 className="font-semibold text-yellow-800">🎯 你的问题根源</h4>
        <p className="text-yellow-700 text-sm mt-1">
          不是语法问题，而是<strong>复制粘贴时意外插入了换行符</strong>。
          引号可以在某些情况下提供保护，但主要还是要确保值在单行内。
        </p>
      </div>

      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
        <h4 className="font-semibold text-green-800">✨ 建议的防错措施</h4>
        <ul className="text-green-700 text-sm mt-1 space-y-1">
          <li>• <strong>使用引号包围长字符串</strong>（特别是JWT）</li>
          <li>• <strong>复制后检查</strong>是否在单行内</li>
          <li>• <strong>使用VS Code等编辑器</strong>的自动检测</li>
          <li>• <strong>版本控制</strong>时注意diff检查</li>
        </ul>
      </div>
    </div>
  )
} 