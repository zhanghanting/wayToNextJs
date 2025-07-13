// src/app/Day09/ssr/page.tsx
export const dynamic = 'force-dynamic';          // ⬅ 彻底禁用静态缓存

/** 尝试拉取世界时钟；失败则降级为本地时间 */
async function getTimeISO(): Promise<string> {
  try {
    // “no-store” 保证每次请求都会真正拉接口
    const res = await fetch('https://worldtimeapi.org/api/timezone/Etc/UTC', {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Remote API not OK');
    const json = await res.json();
    return json.datetime;                        // e.g. "2025-07-13T03:21:45.123Z"
  } catch (err) {
    console.warn('[SSR Demo] Fallback local time:', err);
    return new Date().toISOString();             // 离线模式兜底
  }
}

export default async function SSRPage() {
  const timeISO = await getTimeISO();
  const timeFmt = new Date(timeISO).toLocaleString();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-2">SSR Demo (App Router)</h1>

      <p>
        服务器在 <b>{timeFmt}</b> 生成此页
        <br />
        <small className="opacity-70">
          （每刷新一次都重新 fetch，离线时自动降级）
        </small>
      </p>
    </main>
  );
}
