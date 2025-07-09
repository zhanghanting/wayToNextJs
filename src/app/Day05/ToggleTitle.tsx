'use client'
import { useState, useEffect } from 'react'

export default function ToggleTitle() {
  const [show, setShow] = useState(true)             // 控制文本显示
  useEffect(() => {
    document.title = show ? '👋 Hello' : '😴 Hidden' // 动态修改浏览器标题
  }, [show])                                         // 依赖变化时触发

  return (
    <div className="space-y-4">
      {show && <p className="text-green-600">Hello, Next.js State!</p>}
      <button
        className="rounded-xl border px-3 py-1 hover:bg-slate-100"
        onClick={() => setShow(!show)}                // 反转状态
      >
        {show ? '隐藏' : '显示'}
      </button>
    </div>
  )
} 