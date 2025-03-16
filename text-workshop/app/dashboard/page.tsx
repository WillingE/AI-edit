"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, User, LogOut, Settings, BarChart, Sparkles, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

export default function DashboardPage() {
  const [inputText, setInputText] = useState("")
  const [processType, setProcessType] = useState("product_doc") // 修改为"summarize"以匹配API
  const [result, setResult] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  // 模拟用户数据
  const userData = {
    name: "张三",
    usedCount: 45,
    totalLimit: 100,
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 验证输入
    if (!inputText.trim()) {
      setResult("请输入需要处理的文本")
      return
    }

    setIsProcessing(true)
    setResult("") // 清空之前的结果

    try {
      // 调用API
      const response = await fetch("/api/process-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: inputText,
          processType: processType,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setResult(data.result)
      } else {
        // 处理错误情况
        setResult(`处理错误: ${data.error || "未知错误"}`)
        console.error("API处理错误:", data.error)
      }
    } catch (error) {
      console.error("API请求失败:", error)
      setResult("无法连接到处理服务器，请稍后再试。")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fc]">
      {/* 导航栏 */}
      <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-semibold tracking-tight text-black">
            <span className="bg-gradient-to-r from-black to-neutral-700 bg-clip-text text-transparent">AI</span> Edit
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-neutral-50"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-100">
                  <User className="h-3.5 w-3.5 text-neutral-700" />
                </div>
                <span>{userData.name}</span>
                <ChevronDown className="h-4 w-4 text-neutral-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-xl border-neutral-200 p-1.5 shadow-lg">
              <DropdownMenuItem className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-sm hover:bg-neutral-100">
                <User className="h-4 w-4 text-neutral-500" />
                <span>个人资料</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-sm hover:bg-neutral-100">
                <Settings className="h-4 w-4 text-neutral-500" />
                <span>设置</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-sm hover:bg-neutral-100">
                <BarChart className="h-4 w-4 text-neutral-500" />
                <span>使用统计</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1 bg-neutral-200" />
              <DropdownMenuItem className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50">
                <LogOut className="h-4 w-4" />
                <span>退出登录</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* 主区域 */}
      <main className="flex flex-1 flex-col">
        <div className="container max-w-7xl py-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-bold text-neutral-900">文本处理工作台</h1>
            <div className="flex items-center gap-3 rounded-full bg-white px-4 py-2 shadow-sm">
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium text-neutral-700">高级账户</span>
              </div>
              <div className="h-4 w-px bg-neutral-200"></div>
              <div className="text-sm text-neutral-500">
                剩余: <span className="font-medium text-neutral-900">{userData.totalLimit - userData.usedCount}</span>{" "}
                次
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* 左侧统计卡片 */}
            <div className="space-y-6 lg:col-span-3">
              <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                <div className="border-b border-neutral-100 p-5">
                  <h2 className="font-medium text-neutral-900">使用统计</h2>
                </div>
                <div className="space-y-5 p-5">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm text-neutral-500">已使用次数</span>
                      <span className="text-sm font-medium">
                        {userData.usedCount}/{userData.totalLimit}
                      </span>
                    </div>
                    <Progress
                      value={(userData.usedCount / userData.totalLimit) * 100}
                      className="h-2 bg-neutral-100"
                      indicatorClassName="bg-black"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl bg-neutral-50 p-4">
                      <div className="mb-1 text-xs font-medium text-neutral-500">本月使用</div>
                      <div className="text-lg font-semibold">45次</div>
                    </div>
                    <div className="rounded-xl bg-neutral-50 p-4">
                      <div className="mb-1 text-xs font-medium text-neutral-500">平均字数</div>
                      <div className="text-lg font-semibold">1,250</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-800 p-5 text-white shadow-sm">
                <h3 className="mb-3 font-medium">升级提示</h3>
                <p className="mb-4 text-sm text-neutral-300">升级到专业版，解锁更多高级功能和更大的使用配额。</p>
                <Button className="w-full rounded-lg bg-white text-sm font-medium text-neutral-900 hover:bg-neutral-100">
                  升级账户
                </Button>
              </div>
            </div>

            {/* 右侧文本处理区 */}
            <div className="lg:col-span-9">
              <form
                id="process-form"
                onSubmit={handleSubmit}
                className="overflow-hidden rounded-2xl bg-white shadow-sm"
              >
                <div className="border-b border-neutral-100 p-5">
                  <h2 className="font-medium text-neutral-900">文本处理</h2>
                </div>

                <div className="grid grid-cols-1 gap-6 p-5 lg:grid-cols-2">
                  {/* 左侧输入区 */}
                  <div className="space-y-5">
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <Label htmlFor="input-text" className="text-sm font-medium text-neutral-700">
                          输入文本
                        </Label>
                        <span className="text-xs text-neutral-500">最多支持5000字</span>
                      </div>
                      <Textarea
                        id="input-text"
                        placeholder="请在此输入需要处理的文本..."
                        className="min-h-[320px] resize-none rounded-xl border-neutral-200 bg-neutral-50 focus-visible:ring-black"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-3 rounded-xl border border-neutral-200 p-4">
                      <h3 className="text-sm font-medium text-neutral-700">处理类型</h3>
                      <RadioGroup value={processType} onValueChange={setProcessType} className="grid grid-cols-1 gap-2">
                        <div className="flex items-center gap-3 rounded-lg border border-neutral-200 p-3 transition-colors has-[:checked]:border-black has-[:checked]:bg-neutral-50">
                          <RadioGroupItem value="product_doc" id="product_doc" className="border-neutral-300" />
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100">
                            <FileText className="h-4 w-4 text-neutral-700" />
                          </div>
                          <Label htmlFor="product_doc" className="cursor-pointer font-medium">
                            写产品文档
                          </Label>
                        </div>
                        <div className="flex items-center gap-3 rounded-lg border border-neutral-200 p-3 transition-colors has-[:checked]:border-black has-[:checked]:bg-neutral-50">
                          <RadioGroupItem value="markdown" id="markdown" className="border-neutral-300" />
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100">
                            <FileText className="h-4 w-4 text-neutral-700" />
                          </div>
                          <Label htmlFor="markdown" className="cursor-pointer font-medium">
                            markdown格式
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <Button
                      id="process-button"
                      type="submit"
                      className="w-full rounded-xl bg-black py-6 text-white hover:bg-neutral-800"
                      disabled={!inputText || isProcessing}
                    >
                      {isProcessing ? "处理中..." : "处理文本"}
                    </Button>
                  </div>

                  {/* 右侧结果区 */}
                  <div className="space-y-2">
                    <Label htmlFor="result-area" className="text-sm font-medium text-neutral-700">
                      处理结果
                    </Label>
                    <div
                      id="result-area"
                      className="min-h-[430px] rounded-xl border border-neutral-200 bg-neutral-50 p-5 text-neutral-800"
                    >
                      {isProcessing ? (
                        <div className="flex h-full items-center justify-center">
                          <div className="text-center">
                            <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-black"></div>
                            <p className="text-neutral-500">正在处理您的文本...</p>
                          </div>
                        </div>
                      ) : result ? (
                        <div className="whitespace-pre-line">{result}</div>
                      ) : (
                        <div className="flex h-full flex-col items-center justify-center text-center">
                          <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
                            <Sparkles className="h-8 w-8 text-neutral-400" />
                          </div>
                          <p className="mb-1 text-neutral-900">处理结果将显示在这里</p>
                          <p className="text-sm text-neutral-500">输入文本并选择处理类型后点击"处理文本"按钮</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

