'use client';
import { useEffect, useState } from 'react';
import { API_BASE } from './config';

export default function EnvClient() {
  const [msg, setMsg] = useState('加载中…');

  useEffect(() => {
    fetch(`${API_BASE}/hello`)
      .then(r => r.ok ? r.text() : Promise.reject('请求失败'))
      .then(setMsg)
      .catch(() => setMsg('❌ 无法连接 API'));
  }, []);

  return (
    <section className="border p-4 rounded">
      <h2 className="font-semibold mb-1">🌐 客户端可见</h2>
      <p className="text-sm text-gray-600 mb-2">
        NEXT_PUBLIC_API_BASE = <code>{API_BASE}</code>
      </p>
      <p>接口返回：{msg}</p>
    </section>
  );
}