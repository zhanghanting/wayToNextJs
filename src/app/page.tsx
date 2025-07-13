import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Next.js 学习 Demo</h1>
      <p>欢迎来到 Next.js 学习项目！选择一个 Day 来探索不同的功能：</p>
      
      <ul style={{ lineHeight: '2em', marginTop: 24 }}>
        <li>
          <Link href="/Day01">Day01 - 基础功能</Link>
        </li>
        <li>
          <Link href="/Day02">Day02 - 进阶功能</Link>
        </li>
        <li>
          <Link href="/Day03">Day03 - 更多功能</Link>
        </li>
        <li>
          <Link href="/Day04">Day04 - 高级功能</Link>
        </li>
        <li>
          <Link href="/Day05">Day05 - 特殊功能</Link>
        </li>
        <li>
          <Link href="/Day06">Day06 - 扩展功能</Link>
        </li>
        <li>
          <Link href="/Day07">Day07 - 优化功能</Link>
        </li>
        <li>
          <Link href="/Day08">Day08 - API 功能</Link>
        </li>
        <li>
          <Link href="/Day09">
            <strong>Day09 - 数据获取策略</strong>
          </Link>
        </li>
      </ul>
      
      <p style={{ marginTop: 24, fontSize: '0.9em', color: '#666' }}>
        💡 每个 Day 都包含不同的 Next.js 功能演示和学习内容。
      </p>
    </main>
  );
} 