"use client" // 👈 必须启用 CSR，因为 useParams 是客户端 Hook！

import { useParams } from "next/navigation"
import { notFound } from "next/navigation"

const posts: { [key: string]: string } = {
  "hello-next": "你好，Next.js 新世界!",
  "ssr-vs-ssg": "深入比较 SSR 与 SSG 🚀"
}

export default function Post() {
  const params = useParams()                     // ✅ 使用 useParams 获取
  const slug = params.slug as string             // 👈 类型断言
  const content = posts[slug]
  if (!content) notFound()

  return (
    <article>
      <h1>{slug}</h1>
      <p>{content}</p>
    </article>
  )
}
