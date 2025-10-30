'use client';

import { useState } from 'react';
import Link from 'next/link';
import SimpleLogo from '../components/SimpleLogo';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('张三 (男)\n公历：1990年5月15日 14时\n八字：庚午 辛巳 丁亥 丁未\n\n我今年财运如何？');
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => 'session-' + Math.random().toString(36).substring(2, 15));

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages,
          sessionId: sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = {
        role: 'assistant',
        content: data.response || data.message || JSON.stringify(data),
      };
      setMessages([...newMessages, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: `Error: ${error.message}. Please check your API URL and try again.`,
        error: true,
      };
      setMessages([...newMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 px-4 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <SimpleLogo />
            </Link>
            <nav className="flex space-x-2">
              <Link
                href="/paipan"
                className="px-6 py-2.5 rounded-xl font-medium transition-all text-gray-600 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 hover:shadow-sm"
              >
                排盘
              </Link>
              <Link
                href="/chat"
                className="px-6 py-2.5 rounded-xl font-medium transition-all bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-105"
              >
                对话
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="max-w-5xl mx-auto space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-4">
              <div className="flex flex-col items-center justify-center gap-2 mb-4">
                <div className="relative">
                  <div className="text-4xl animate-bounce">🏮</div>
                  <div className="absolute inset-0 text-4xl animate-pulse opacity-50">✨</div>
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    八字命理智能对话 - 专业的八字分析 + 梅花易数占卜
                  </h2>
                </div>
              </div>
              <div className="max-w-4xl mx-auto space-y-4 text-left">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-4 border border-blue-200/50 dark:border-blue-800/50 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                    <span className="text-lg">💡</span>
                    使用提示
                  </h3>
                  <p className="text-blue-700 dark:text-blue-300 text-sm mb-2">
                    您可以从<Link href="/paipan" className="underline hover:text-blue-600">排盘页面</Link>复制八字信息，然后在这里提问：
                  </p>
                  <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 ml-4">
                    <li>• 点击排盘详情中的&quot;复制八字&quot;按钮</li>
                    <li>• 粘贴到下方输入框</li>
                    <li>• 添加您的问题，如&quot;分析格局&quot;、&quot;看财运&quot;等</li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4 border border-green-200/50 dark:border-green-800/50 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2 flex items-center gap-2">
                      <span className="text-lg">🔮</span>
                      八字命理分析
                    </h3>
                    <div className="text-green-700 dark:text-green-300 text-sm space-y-1">
                      <p>• &quot;我是什么格局？身强还是身弱？&quot;</p>
                      <p>• &quot;我的用神是什么？要补什么五行？&quot;</p>
                      <p>• &quot;适合从事什么行业？&quot;</p>
                      <p>• &quot;我的财运如何？适合投资吗？&quot;</p>
                      <p>• &quot;感情运势怎么样？何时遇正缘？&quot;</p>
                      <p>• &quot;健康方面要注意什么？&quot;</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 border border-purple-200/50 dark:border-purple-800/50 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-2 flex items-center gap-2">
                      <span className="text-lg">🎯</span>
                      梅花易数占卜
                    </h3>
                    <div className="text-purple-700 dark:text-purple-300 text-sm space-y-1">
                      <p>• &quot;这次面试能成功吗？&quot;</p>
                      <p>• &quot;他/她喜欢我吗？我们能在一起吗？&quot;</p>
                      <p>• &quot;这个项目能赚钱吗？&quot;</p>
                      <p>• &quot;我的病能治好吗？&quot;</p>
                      <p>• &quot;这次考试能过吗？&quot;</p>
                      <p>• &quot;丢失的东西能找到吗？&quot;</p>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3 border border-orange-200 dark:border-orange-800">
                  <h3 className="font-semibold text-orange-800 dark:text-orange-300 mb-2 flex items-center gap-2">
                    <span className="text-lg">📋</span>
                    问题分类指南
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-orange-700 dark:text-orange-300 text-sm">
                    <div>
                      <p className="font-medium mb-1">💼 事业工作</p>
                      <p>求职、升职、创业、合作</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">💰 财运投资</p>
                      <p>理财、股票、房产、生意</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">💕 感情婚姻</p>
                      <p>恋爱、结婚、复合、家庭</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">🏥 健康疾病</p>
                      <p>治病、手术、体检、养生</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">📚 学业考试</p>
                      <p>升学、考证、培训、留学</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">👥 人际关系</p>
                      <p>朋友、同事、合伙、贵人</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">🚗 出行安全</p>
                      <p>旅行、搬家、签证、平安</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">⚖️ 法律纠纷</p>
                      <p>官司、合同、维权、和解</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <span className="text-lg">✨</span>
                    提问技巧
                  </h3>
                  <div className="text-gray-600 dark:text-gray-400 text-sm space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium text-green-600 dark:text-green-400">✅ 好的提问方式：</p>
                        <p>• 问题具体明确</p>
                        <p>• 一事一问</p>
                        <p>• 时间范围清楚</p>
                        <p>• 提供背景信息</p>
                      </div>
                      <div>
                        <p className="font-medium text-red-600 dark:text-red-400">❌ 避免的提问：</p>
                        <p>• 过于宽泛模糊</p>
                        <p>• 一次问多件事</p>
                        <p>• 没有时间限制</p>
                        <p>• 缺乏具体背景</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-6 py-4 shadow-sm ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-blue-200 dark:shadow-blue-900/50'
                    : message.error
                    ? 'bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/30 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800'
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 shadow-gray-100 dark:shadow-gray-900/50'
                }`}
              >
                <p className="whitespace-pre-wrap break-words leading-relaxed">
                  {message.content}
                </p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-gray-700 rounded-2xl px-4 py-3">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-700/50 px-4 py-4 shadow-lg">
        <div className="max-w-5xl mx-auto flex gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="输入您的八字信息和问题..."
            rows={5}
            className="flex-1 px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm shadow-sm hover:shadow-md transition-all"
            style={{ maxHeight: '200px', minHeight: '120px' }}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg hover:scale-105 disabled:hover:scale-100 min-w-[80px] flex items-center justify-center text-sm"
          >
            {loading ? (
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>发送中</span>
              </div>
            ) : (
              <span>发送</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

