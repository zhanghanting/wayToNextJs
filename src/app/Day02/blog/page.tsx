// 静态博客列表 SSG
import Link from "next/link"
const posts=[{slug:"hello-next",title:"Hello Next.js"},
             {slug:"ssr-vs-ssg",title:"SSR vs SSG"}]
export default function Blog(){
  return(
    <ul>
      {posts.map(p=>(
        <li key={p.slug}>
          <Link href={`/Day02/blog/${p.slug}`}>{p.title}</Link>
        </li>
      ))}
    </ul>
  )
}
