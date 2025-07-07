export const dynamic = 'force-dynamic'
export default async function SSRPage () {
  const t = new Date().toLocaleTimeString()
  return <p>SSR 时间: {t}</p>
}
