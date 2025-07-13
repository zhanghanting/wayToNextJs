// src/app/Day09/page.tsx
import Link from 'next/link';

export default function Day09Home() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Day09 数据获取策略 Demo</h1>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <Link href="/Day09/ssr" className="text-blue-600 hover:underline">
            服务器端渲染 · SSR（App Router）
          </Link>
        </li>
        <li>
          <Link href="/Day09/isr" className="text-blue-600 hover:underline">
            增量静态渲染 · ISR（60 秒）
          </Link>
        </li>
      </ul>
    </main>
  );
}
