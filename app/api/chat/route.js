import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    console.log('API 路由被调用');

    const { messages, sessionId = `session-${Date.now()}` } = await request.json();
    console.log('收到的消息:', messages);

    // Get the last user message
    const lastMessage = messages[messages.length - 1];
    const message = lastMessage?.content || '';

    console.log('用户消息:', message);

    // 验证输入
    if (!message || message.trim() === '') {
      return NextResponse.json(
        { error: '消息内容不能为空' },
        { status: 400 }
      );
    }

    console.log('环境变量检查:');
    console.log('BAILIAN_APP_ID 存在:', !!process.env.BAILIAN_APP_ID);
    console.log('BAILIAN_API_KEY 存在:', !!process.env.BAILIAN_API_KEY);

    // 如果没有配置凭证，返回错误
    if (!process.env.BAILIAN_APP_ID || !process.env.BAILIAN_API_KEY) {
      return NextResponse.json(
        { error: '服务配置不完整，请联系管理员' },
        { status: 500 }
      );
    }

    console.log('使用DashScope API调用百炼智能体（带上下文）');

    // 构建对话历史 - 保持上下文
    const conversationHistory = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));

    console.log('对话历史:', conversationHistory);

    // 使用DashScope API调用百炼智能体
    const response = await fetch(`https://dashscope.aliyuncs.com/api/v1/apps/${process.env.BAILIAN_APP_ID}/completion`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.BAILIAN_API_KEY}`,
        'Content-Type': 'application/json',
        'X-DashScope-SSE': 'disable'
      },
      body: JSON.stringify({
        input: {
          messages: conversationHistory, // 传递完整对话历史
          prompt: message
        },
        parameters: {
          temperature: 0.7
        }
      })
    });

    console.log('DashScope响应状态:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('DashScope API错误:', response.status, errorText);

      return NextResponse.json(
        {
          error: `DashScope API调用失败: ${response.status}`,
          details: errorText
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('DashScope API响应:', data);

    // 检查响应格式
    if (data.output?.text) {
      return NextResponse.json({
        response: data.output.text,
        timestamp: new Date().toISOString(),
        sessionId: sessionId,
        request_id: data.request_id
      });
    } else {
      console.error('DashScope API响应格式异常:', data);
      return NextResponse.json(
        {
          error: 'DashScope API响应格式异常',
          details: data.message || '未知错误'
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('调用DashScope API失败:', error);

    return NextResponse.json(
      {
        error: '服务暂时不可用',
        details: error.message
      },
      { status: 500 }
    );
  }
}