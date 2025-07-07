export const revalidate = 3600
export default function SSGPage () {
  const t = new Date().toLocaleTimeString()
  return <p>SSG 构建时间: {t}</p>
}
