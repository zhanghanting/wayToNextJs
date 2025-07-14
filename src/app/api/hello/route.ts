// 内置 API：根据环境变量返回不同文本
export async function GET() {
  const msg = process.env.HELLO_MSG || 'Hello!';
  return new Response(msg);
}