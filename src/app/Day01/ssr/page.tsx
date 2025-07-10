// SSR 页面，运行时动态生成
export const dynamic = "force-dynamic" // 强制启用 SSR

export default async function SSRPage() {
  const now = new Date().toISOString()
  return <p>⏰ 当前服务器时间：{now}</p>
}
