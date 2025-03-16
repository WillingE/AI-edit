import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* 导航栏 */}
      <header className="fixed top-0 z-50 w-full border-b border-neutral-100 bg-white/80 backdrop-blur-md">
        <div className="container flex h-20 items-center justify-between">
          <Link href="/" className="text-2xl font-semibold tracking-tight text-black">
            <span className="bg-gradient-to-r from-black to-neutral-700 bg-clip-text text-transparent">AI</span> Edit
          </Link>
          <nav className="hidden space-x-8 md:flex">
            <Link href="#features" className="text-sm font-medium text-neutral-600 transition-colors hover:text-black">
              功能
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-neutral-600 transition-colors hover:text-black">
              定价
            </Link>
          </nav>
          <div className="flex items-center gap-6">
            <Link
              href="/login"
              className="hidden text-sm font-medium text-neutral-600 transition-colors hover:text-black md:block"
            >
              登录
            </Link>
            <Button
              asChild
              className="rounded-full bg-black px-6 text-sm font-medium text-white shadow-md transition-all hover:bg-neutral-800 hover:shadow-lg"
            >
              <Link href="/signup">免费试用</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* 主区域 */}
      <main className="flex-1 pt-20">
        {/* 英雄区域 */}
        <section className="relative w-full overflow-hidden py-24 md:py-32 lg:py-40">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-neutral-100 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-neutral-100 blur-3xl"></div>
          <div className="container relative px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-10 text-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-black md:text-5xl lg:text-6xl">
                  AI驱动的
                  <span className="bg-gradient-to-r from-black to-neutral-700 bg-clip-text text-transparent">
                    文本处理
                  </span>
                  解决方案
                </h1>
                <p className="mx-auto max-w-[700px] text-lg text-neutral-500 md:text-xl">
                  为内容创作者、文案编辑和知识工作者提供智能文本工具
                </p>
              </div>
              <Button
                asChild
                size="lg"
                className="rounded-full bg-black px-8 text-white shadow-md transition-all hover:bg-neutral-800 hover:shadow-lg"
              >
                <Link href="/signup">立即开始</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* 功能区域 */}
        <section id="features" className="w-full py-24 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-16 text-center text-3xl font-bold tracking-tight text-black md:text-4xl">
                强大的
                <span className="bg-gradient-to-r from-black to-neutral-700 bg-clip-text text-transparent">
                  AI文本处理
                </span>
                功能
              </h2>
              <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                {/* 功能1 */}
                <div className="group rounded-2xl bg-white p-8 shadow-sm transition-all hover:shadow-md">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-black"
                    >
                      <path d="M12 5v14" />
                      <path d="M5 12h14" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-black">内容智能生成</h3>
                  <p className="mt-2 text-neutral-500">一键创建专业文案，提高内容创作效率</p>
                </div>
                {/* 功能2 */}
                <div className="group rounded-2xl bg-white p-8 shadow-sm transition-all hover:shadow-md">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-black"
                    >
                      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                      <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
                      <path d="M9 9h1" />
                      <path d="M9 13h6" />
                      <path d="M9 17h6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-black">文档智能处理</h3>
                  <p className="mt-2 text-neutral-500">自动总结和分析文档，快速提取关键信息</p>
                </div>
                {/* 功能3 */}
                <div className="group rounded-2xl bg-white p-8 shadow-sm transition-all hover:shadow-md">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-black"
                    >
                      <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" />
                      <polyline points="14 2 14 8 20 8" />
                      <path d="M2 15h10" />
                      <path d="m9 18 3-3-3-3" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-black">格式智能转换</h3>
                  <p className="mt-2 text-neutral-500">轻松转换文档格式和风格，适应不同场景需求</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 订阅区域 */}
        <section className="relative w-full overflow-hidden bg-neutral-50 py-24 md:py-32">
          <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-neutral-100 blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-neutral-100 blur-3xl"></div>
          <div className="container relative px-4 md:px-6">
            <div className="mx-auto max-w-2xl space-y-10 text-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl">立即开始使用</h2>
                <p className="text-neutral-500 md:text-lg">订阅我们的通讯，获取最新功能和优惠信息</p>
              </div>
              <div className="mx-auto max-w-md">
                <form className="flex items-center gap-2">
                  <Input
                    className="h-12 rounded-full border-neutral-200 bg-white px-4 shadow-sm focus-visible:ring-black"
                    placeholder="输入您的邮箱"
                    type="email"
                    autoComplete="email"
                  />
                  <Button
                    type="submit"
                    className="h-12 rounded-full bg-black px-6 text-white shadow-md transition-all hover:bg-neutral-800 hover:shadow-lg"
                  >
                    订阅
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="border-t border-neutral-100 py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-neutral-500">
            © 2024 <span className="font-medium text-black">AI Edit</span>. 保留所有权利.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="text-sm text-neutral-500 transition-colors hover:text-black">
              使用条款
            </Link>
            <Link href="/privacy" className="text-sm text-neutral-500 transition-colors hover:text-black">
              隐私政策
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

