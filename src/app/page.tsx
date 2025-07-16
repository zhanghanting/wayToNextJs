import Link from 'next/link';

export default function HomePage() {
  const phases = [
    {
      title: "基础入门",
      days: "Day 1 - 7",
      color: "from-blue-500 to-purple-600",
      borderColor: "border-blue-200",
      bgColor: "bg-blue-50",
      items: [
        { day: "Day01", title: "认识 Next.js", desc: "安装、目录结构、三渲染概览", href: "/Day01" },
        { day: "Day02", title: "文件＆动态路由", desc: "/blog/[slug] + Link 导航", href: "/Day02" },
        { day: "Day03", title: "渲染机制实战", desc: "CSR vs SSR vs SSG 场景对比", href: "/Day03" },
        { day: "Day04", title: "组件＆样式", desc: "Header/Footer + CSS Modules + Tailwind", href: "/Day04" },
        { day: "Day05", title: "State & Effect", desc: "useState/useEffect 条件渲染", href: "/Day05" },
        { day: "Day06", title: "表单与受控组件", desc: "留言板 Demo", href: "/Day06" },
        { day: "Day07", title: "基础复盘", desc: "10 题小测 + Checklist", href: "/Day07" }
      ]
    },
    {
      title: "功能进阶",
      days: "Day 8 - 15",
      color: "from-green-500 to-teal-600",
      borderColor: "border-green-200",
      bgColor: "bg-green-50",
      items: [
        { day: "Day08", title: "API 路由", desc: "/api/* + fetch", href: "/Day08" },
        { day: "Day09", title: "数据获取策略", desc: "getServerSideProps & ISR", href: "/Day09" },
        { day: "Day10", title: "环境变量配置", desc: ".env.local 区分 dev/prod", href: "/Day10" },
        { day: "Day11", title: "next-intl 国际化", desc: "多语言路由 & 切换", href: "/Day11" },
        { day: "Day12", title: "Supabase 登录", desc: "邮箱魔链 Auth", href: "/Day12" },
        { day: "Day13", title: "Supabase CRUD", desc: "Realtime & RLS", href: "/Day13" },
        { day: "Day14", title: "Creem 订阅支付", desc: "计划 / Checkout", href: "/Day14" },
        { day: "Day15", title: "进阶复盘", desc: "整合自测 + Checklist", href: "/Day15" }
      ]
    },
    {
      title: "高级开发",
      days: "Day 16 - 22",
      color: "from-orange-500 to-red-600",
      borderColor: "border-orange-200",
      bgColor: "bg-orange-50",
      items: [
        { day: "Day16", title: "middleware 权限", desc: "订阅付费墙", href: "/Day16" },
        { day: "Day17", title: "部署 Vercel", desc: "CI/CD & 环境变量", href: "/Day17" },
        { day: "Day18", title: "SEO 元数据", desc: "OG Image & metadata", href: "/Day18" },
        { day: "Day19", title: "安全加固", desc: "CSP & HTTPS", href: "/Day19" },
        { day: "Day20", title: "PWA 优化", desc: "next-pwa + Image", href: "/Day20" },
        { day: "Day21", title: "测试 & 质量", desc: "Jest + RTL + ESLint", href: "/Day21" },
        { day: "Day22", title: "高级复盘", desc: "Bug Hunt + Checklist", href: "/Day22" }
      ]
    },
    {
      title: "项目冲刺",
      days: "Day 23 - 30",
      color: "from-purple-500 to-pink-600",
      borderColor: "border-purple-200",
      bgColor: "bg-purple-50",
      items: [
        { day: "Day23", title: "国际化内容填充", desc: "en/zh 页面完善 (Day 23-24)", href: "/Day23" },
        { day: "Day24", title: "国际化内容填充", desc: "en/zh 页面完善 (Day 23-24)", href: "/Day24" },
        { day: "Day25", title: "用户中心 & 订阅管理", desc: "账单页 (Day 25-26)", href: "/Day25" },
        { day: "Day26", title: "用户中心 & 订阅管理", desc: "账单页 (Day 25-26)", href: "/Day26" },
        { day: "Day27", title: "后台管理面板", desc: "Admin CRUD", href: "/Day27" },
        { day: "Day28", title: "终极优化", desc: "代码分割 + Lighthouse >90", href: "/Day28" },
        { day: "Day29", title: "最终部署", desc: "域名绑定 & 生产测试", href: "/Day29" },
        { day: "Day30", title: "总结分享", desc: "项目演示 + 经验复盘", href: "/Day30" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Next.js 30天
              <span className="block text-3xl md:text-5xl mt-2 text-blue-200">
                从零到全栈
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              系统性学习 Next.js 全栈开发，从基础概念到生产级项目，
              <br className="hidden sm:block" />
              每一天都有明确的学习目标和实战项目
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-sm font-medium">🎯 目标导向</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-sm font-medium">🛠️ 实战项目</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-sm font-medium">📈 渐进学习</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Path */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            学习路径
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            四个阶段，循序渐进，从 Next.js 基础到全栈项目开发
          </p>
        </div>

        <div className="space-y-16">
          {phases.map((phase, phaseIndex) => (
            <div key={phaseIndex} className="relative">
              {/* Phase Header */}
              <div className="text-center mb-8">
                <div className={`inline-flex items-center px-8 py-3 rounded-full bg-gradient-to-r ${phase.color} text-white shadow-lg`}>
                  <span className="text-lg font-bold">
                    阶段 {phaseIndex + 1}: {phase.title}
                  </span>
                  <span className="ml-3 text-sm bg-white/20 px-3 py-1 rounded-full">
                    {phase.days}
                  </span>
                </div>
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {phase.items.map((item, itemIndex) => (
                  <Link
                    key={itemIndex}
                    href={item.href}
                    className={`${phase.bgColor} ${phase.borderColor} border-2 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 group cursor-pointer block`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${phase.color} text-white`}>
                        {item.day}
                      </span>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </Link>
                ))}
              </div>

              {/* Phase Connector */}
              {phaseIndex < phases.length - 1 && (
                <div className="flex justify-center mt-12 mb-4">
                  <div className="w-px h-8 bg-gradient-to-b from-gray-300 to-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">开始你的 Next.js 学习之旅</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            每一天都是新的开始，每一个项目都是成长的阶梯
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/Day01"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 rounded-lg font-bold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              🚀 从 Day 1 开始
            </Link>
            <Link 
              href="/Day11"
              className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 px-8 py-4 rounded-lg font-bold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              🌍 体验国际化 (Day 11)
            </Link>
          </div>
        </div>

        {/* Quick Navigation Section */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">快速导航</h3>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
            {Array.from({ length: 30 }, (_, i) => {
              const dayNum = i + 1;
              const dayStr = `Day${dayNum.toString().padStart(2, '0')}`;
              return (
                <Link
                  key={dayNum}
                  href={`/${dayStr}`}
                  className="bg-white border border-gray-200 rounded-lg p-3 text-center hover:shadow-md hover:border-blue-300 transition-all duration-200 group"
                >
                  <div className="text-xs text-gray-500 mb-1">DAY</div>
                  <div className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {dayNum}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">30</div>
            <div className="text-gray-600">学习天数</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">4</div>
            <div className="text-gray-600">学习阶段</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">15+</div>
            <div className="text-gray-600">实战项目</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">∞</div>
            <div className="text-gray-600">学习收获</div>
          </div>
        </div>
      </div>
    </div>
  );
} 