"use client" // 启用客户端渲染

import { useEffect, useState } from "react"

export default function CSRPage() {
  const [now, setNow] = useState("")

  useEffect(() => {
    setNow(new Date().toISOString())
  }, [])

  return <p>🖥️ 客户端时间：{now}</p>
}
