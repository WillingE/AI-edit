"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("登录数据:", formData)
    // 这里可以添加登录逻辑
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* 导航栏 */}
      <header className="fixed top-0 z-50 w-full border-b border-neutral-100 bg-white/80 backdrop-blur-md">
        <div className="container flex h-20 items-center justify-between">
          <Link href="/" className="text-2xl font-semibold tracking-tight text-black">
            <span className="bg-gradient-to-r from-black to-neutral-700 bg-clip-text text-transparent">AI</span> Edit
          </Link>
          <nav className="hidden space-x-8 md:flex">
            <Link href="/" className="text-sm font-medium text-neutral-600 transition-colors hover:text-black">
              首页
            </Link>
            <Link href="#features" className="text-sm font-medium text-neutral-600 transition-colors hover:text-black">
              功能
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-neutral-600 transition-colors hover:text-black">
              定价
            </Link>
          </nav>
          <div className="flex items-center gap-6">
            <Button
              asChild
              className="rounded-full bg-black px-6 text-sm font-medium text-white shadow-md transition-all hover:bg-neutral-800 hover:shadow-lg"
            >
              <Link href="/register">注册</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* 主区域 */}
      <main className="flex flex-1 items-center justify-center pt-20">
        <div className="w-full max-w-md px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="mx-auto w-full max-w-sm space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-black">登录您的账户</h2>
              <p className="mt-2 text-sm text-neutral-500">输入您的凭据以访问您的账户</p>
            </div>

            <form id="login-form" className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="login-email" className="block text-sm font-medium text-neutral-700">
                    电子邮箱
                  </label>
                  <div className="mt-1">
                    <Input
                      id="login-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="your@email.com"
                      className="h-12 rounded-lg border-neutral-200 bg-white px-4 shadow-sm focus-visible:ring-black"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="login-password" className="block text-sm font-medium text-neutral-700">
                      密码
                    </label>
                    <Link href="/forgot-password" className="text-sm font-medium text-neutral-600 hover:text-black">
                      忘记密码?
                    </Link>
                  </div>
                  <div className="mt-1">
                    <Input
                      id="login-password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      placeholder="••••••••"
                      className="h-12 rounded-lg border-neutral-200 bg-white px-4 shadow-sm focus-visible:ring-black"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className="h-12 w-full rounded-lg bg-black text-white shadow-md transition-all hover:bg-neutral-800 hover:shadow-lg"
                >
                  登录
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-neutral-500">
                还没有账户?{" "}
                <Link href="/register" className="font-medium text-black hover:underline">
                  立即注册
                </Link>
              </p>
            </div>
          </div>
        </div>
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

