import { type NextRequest, NextResponse } from "next/server"

// 更新为SiliconFlow API URL
const API_URL = "https://api.siliconflow.cn/v1/chat/completions"
// 使用DeepSeek-V3模型
const MODEL = "deepseek-ai/DeepSeek-V3"

// 设置更长的超时时间
export const maxDuration = 60 // 设置为60秒

export async function POST(request: NextRequest) {
  try {
    // 解析请求体
    const body = await request.json()
    const { text, processType } = body

    // 验证请求参数
    if (!text) {
      return NextResponse.json({ success: false, error: "文本内容不能为空" }, { status: 400 })
    }

    if (!processType) {
      return NextResponse.json({ success: false, error: "处理类型不能为空" }, { status: 400 })
    }

    // 获取API密钥 - 使用SILICONFLOW_API_KEY环境变量
    const apiKey = process.env.SILICONFLOW_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "API密钥未配置，请设置SILICONFLOW_API_KEY环境变量" },
        { status: 500 },
      )
    }

    // 添加调试日志
    console.log("API请求开始 - 处理类型:", processType)
    console.log("文本长度:", text.length)
    console.log("使用模型:", MODEL)

    // 根据处理类型构建提示词
    let systemPrompt = ""
    let userPrompt = ""

    switch (processType) {
      case "summarize":
        systemPrompt = "你是一个专业的文本摘要助手。请提供简洁、全面的摘要，突出文本的主要观点和关键信息。"
        userPrompt = `请对以下文本进行摘要：\n\n${text}\n\n请提供一个简短的总结，然后列出3-5个关键点。`
        break
      case "enhance":
        systemPrompt = "你是一个专业的内容增强助手。请在保持原文主旨的基础上，增强文本的表达力、专业性和说服力。"
        userPrompt = `请增强以下文本的内容质量：\n\n${text}\n\n请提供增强后的内容，并补充相关背景、数据支持或案例分析。`
        break
      case "format":
        systemPrompt = "你是一个专业的文本格式化助手。请优化文本的格式，使其更加清晰、易读。"
        userPrompt = `请优化以下文本的格式：\n\n${text}\n\n请提供格式优化后的文本，注意段落划分、标点符号和整体结构。`
        break
      case "product_doc":
        systemPrompt = "你是一个专业的产品文档撰写助手。请根据提供的信息，创建清晰、结构化的产品文档。"
        userPrompt = `请根据以下信息撰写一份产品文档：\n\n${text}\n\n请包含产品概述、功能特点、技术规格和使用场景等部分。`
        break
      case "markdown":
        systemPrompt = "你是一个专业的Markdown格式转换助手。请将提供的文本转换为规范的Markdown格式。"
        userPrompt = `请将以下文本转换为Markdown格式：\n\n${text}\n\n请确保使用正确的Markdown语法，包括标题、列表、强调、链接等元素。`
        break
      default:
        return NextResponse.json(
          {
            success: false,
            error: `不支持的处理类型: ${processType}`,
          },
          { status: 400 },
        )
    }

    console.log("准备调用API")

    // 构建请求体
    const requestBody = {
      model: MODEL,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    }

    // 设置超时控制
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 50000) // 50秒超时

    try {
      // 调用API
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      })

      clearTimeout(timeoutId) // 清除超时

      console.log("API响应状态:", response.status, response.statusText)

      // 处理API响应
      if (!response.ok) {
        let errorMessage = `API请求失败: ${response.status} ${response.statusText}`

        try {
          const errorData = await response.json()
          console.error("API错误详情:", JSON.stringify(errorData))

          if (errorData.error) {
            errorMessage += ` - ${errorData.error.message || errorData.error}`
          }
        } catch (e) {
          console.error("无法解析错误响应:", e)
        }

        return NextResponse.json(
          {
            success: false,
            error: errorMessage,
          },
          { status: response.status },
        )
      }

      const data = await response.json()
      console.log("API响应成功，数据结构:", Object.keys(data).join(", "))

      if (!data.choices || data.choices.length === 0) {
        return NextResponse.json(
          {
            success: false,
            error: "API返回了空响应",
          },
          { status: 500 },
        )
      }

      const result = data.choices[0].message.content
      console.log("处理完成，结果长度:", result.length)

      // 返回成功响应
      return NextResponse.json({
        success: true,
        result,
      })
    } catch (fetchError) {
      clearTimeout(timeoutId)
      if (fetchError.name === "AbortError") {
        console.error("API请求超时")
        return NextResponse.json(
          {
            success: false,
            error: "API请求超时，请稍后再试",
          },
          { status: 504 },
        )
      }
      throw fetchError // 重新抛出其他错误
    }
  } catch (error) {
    console.error("处理文本时出错:", error)

    // 返回错误响应
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "处理文本时发生未知错误",
      },
      { status: 500 },
    )
  }
}

