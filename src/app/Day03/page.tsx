import Link from 'next/link'

export default function Day03Page() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Next.js 渲染机制演示</h2>
        <p className="text-gray-600 mb-6">
          本页面演示了 Next.js 中三种主要的渲染方式：CSR（客户端渲染）、SSG（静态站点生成）和 SSR（服务端渲染）。
          点击下方链接可以快速跳转到各个示例页面。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CSR 卡片 */}
        <Link href="/Day03/csr" className="group">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-200 cursor-pointer">
            <div className="flex items-center mb-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
              <h3 className="text-lg font-semibold text-blue-800 group-hover:text-blue-900">
                CSR (Client-Side Rendering)
              </h3>
            </div>
            <p className="text-blue-600 text-sm mb-4">
              客户端渲染 - 组件在浏览器中执行，适合交互性强的页面
            </p>
            <div className="text-xs text-blue-500 bg-blue-100 px-2 py-1 rounded inline-block">
              &#x27;use client&#x27; 指令
            </div>
          </div>
        </Link>

        {/* SSG 卡片 */}
        <Link href="/Day03/ssg" className="group">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 hover:shadow-lg hover:border-green-300 transition-all duration-200 cursor-pointer">
            <div className="flex items-center mb-3">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <h3 className="text-lg font-semibold text-green-800 group-hover:text-green-900">
                SSG (Static Site Generation)
              </h3>
            </div>
            <p className="text-green-600 text-sm mb-4">
              静态站点生成 - 构建时生成HTML，性能最佳，适合内容相对静态的页面
            </p>
            <div className="text-xs text-green-500 bg-green-100 px-2 py-1 rounded inline-block">
              构建时生成
            </div>
          </div>
        </Link>

        {/* SSR 卡片 */}
        <Link href="/Day03/ssr" className="group">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 hover:shadow-lg hover:border-purple-300 transition-all duration-200 cursor-pointer">
            <div className="flex items-center mb-3">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
              <h3 className="text-lg font-semibold text-purple-800 group-hover:text-purple-900">
                SSR (Server-Side Rendering)
              </h3>
            </div>
            <p className="text-purple-600 text-sm mb-4">
              服务端渲染 - 每次请求时在服务器生成HTML，适合需要实时数据的页面
            </p>
            <div className="text-xs text-purple-500 bg-purple-100 px-2 py-1 rounded inline-block">
              动态渲染
            </div>
          </div>
        </Link>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-2">快速对比：</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <div><strong>CSR:</strong> 客户端时间显示，JavaScript 必须加载完成后才能看到内容</div>
          <div><strong>SSG:</strong> 显示构建时的时间戳，内容静态但加载速度最快</div>
          <div><strong>SSR:</strong> 显示服务器当前时间，每次刷新都会更新</div>
        </div>
      </div>
    </div>
  )
} 