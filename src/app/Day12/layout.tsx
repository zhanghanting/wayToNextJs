import { SupabaseProvider } from './SupabaseProvider'

export default function Day12Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SupabaseProvider>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Day 12 - Supabase 身份验证
            </h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </SupabaseProvider>
  )
} 