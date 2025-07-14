import { API_BASE, DB_PASSWORD } from './config';
import EnvClient from './EnvClient';

export const dynamic = 'force-dynamic'; // 禁缓存，方便演示

export default function Day10EnvPage() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Day10｜环境变量最佳实践 Demo</h1>

      {/* 服务端可直读所有变量 */}
      <section className="bg-gray-50 p-4 rounded">
        <h2 className="font-semibold mb-2">👀 服务端可见</h2>
        <pre>{JSON.stringify({
          API_BASE,
          DB_PASSWORD: DB_PASSWORD.slice(0,3)+'***'
        }, null, 2)}</pre>
      </section>

      {/* 客户端演示组件 */}
      <EnvClient />
    </main>
  );
}