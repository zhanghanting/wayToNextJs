'use client'                           // 🔑 声明客户端组件
import Link from 'next/link'

/** 一周主题速查表 */
const topics = [
  { day: 'Day01', title: '认识 Next.js' },
  { day: 'Day02', title: '文件 & 动态路由' },
  { day: 'Day03', title: 'CSR / SSR / SSG' },
  { day: 'Day04', title: '组件 & 样式' },
  { day: 'Day05', title: 'State & Effect' },
  { day: 'Day06', title: '受控表单 Demo' },
]

/** WeekSummary 页面 —— 复制即用 */
export default function WeekSummary() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Week 1 Summary
      </h1>

      <ul className="space-y-3">
        {topics.map(t => (
          <li
            key={t.day}
            className="border rounded-xl p-3 transition
                       hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {/* 点击跳转到对应示例页 */}
            <Link href={`/${t.day}`}>
              {t.day} — {t.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
