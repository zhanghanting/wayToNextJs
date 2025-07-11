// Next-DEMO/src/app/Day08/api/hello/route.ts
import { NextRequest, NextResponse } from 'next/server'

// GET 方法：浏览器访问 /api/hello 返回 JSON
export async function GET(_req: NextRequest) {
  // 可在此写 DB 查询、鉴权逻辑
  const data = { msg: 'Hello from Day08 API 🎉' }
  return NextResponse.json(data) // 👈 标准化 JSON 输出
}

// POST：解析用户输入并附带时间戳返回
export async function POST(req: NextRequest) {
    try {
      const { text } = await req.json()             // 解析 JSON Body
      if (!text) throw new Error('empty')
  
      return NextResponse.json({
        echo: text,
        timestamp: new Date().toISOString(),        // ISO 格式时间
      })
    } catch {
      return NextResponse.json(
        { error: '参数缺失：text' },
        { status: 400 }
      )
    }
  }