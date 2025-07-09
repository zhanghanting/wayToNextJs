// Day06/page.tsx
"use client";
import { useState } from "react";
import MessageForm from "./MessageForm";

export default function Day06Page() {
  // 消息列表 state
  const [messages, setMessages] = useState<string[]>([]);

  // 新增消息
  const addMessage = (msg: string) => setMessages([msg, ...messages]);

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">留言板 Demo</h1>
      <MessageForm onAdd={addMessage} />
      <ul className="space-y-2">
        {messages.map((m, i) => (
          <li key={i} className="border p-2 rounded">{m}</li>
        ))}
      </ul>
    </main>
  );
}
