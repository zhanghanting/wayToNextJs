// Next-DEMO/src/app/Day08/client-fetch/page.tsx
'use client'
import { useState } from 'react'

export default function Page() {
  const [text, setText] = useState('')
  const [resp, setResp] = useState<{ echo?: string; timestamp?: string; error?: string }>({})
  const [loading, setLoading] = useState(false)
  const [errorTip, setErrorTip] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorTip('')
    setResp({})

    if (!text.trim()) {
      setErrorTip('请输入内容再提交')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/Day08/api/hello', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      const data = await res.json()
      setResp(data)
    } catch {
      setResp({ error: '请求失败，请稍后重试' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex flex-col items-center gap-4 p-8">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="输入任意文本"
          className="border p-2 rounded-lg"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 rounded-lg disabled:opacity-50"
        >
          {loading ? '发送中...' : '发送'}
        </button>
      </form>

      {errorTip && <p className="text-red-600">{errorTip}</p>}

      {resp.echo && (
        <p className="text-green-600">
          服务器回声：{resp.echo}
          <br />解析时间：{resp.timestamp}
        </p>
      )}
      {resp.error && <p className="text-red-600">{resp.error}</p>}
    </main>
  )
}
