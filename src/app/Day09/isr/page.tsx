// src/app/Day09/isr/page.tsx
export const revalidate = 60;                  // ⬅ 60 秒后台重建

async function getFact() {
  const res = await fetch('https://catfact.ninja/fact');
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export default async function ISRPage() {
  const { fact } = await getFact();
  const builtAt = new Date().toLocaleTimeString();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-2">ISR Demo (App Router)</h1>
      <p>猫咪冷知识：{fact}</p>
      <small>页面构建时间：{builtAt}</small>
      <br />
      <small>(60 秒后有新请求才会输出新版本)</small>
    </main>
  );
}
