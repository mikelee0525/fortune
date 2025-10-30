import Link from 'next/link';
import SimpleLogo from './components/SimpleLogo';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <SimpleLogo />
            <nav className="flex space-x-1">
              <Link
                href="/paipan"
                className="px-6 py-2 rounded-lg font-medium transition-all text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                排盘
              </Link>
              <Link
                href="/chat"
                className="px-6 py-2 rounded-lg font-medium transition-all text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                对话
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            选择您要使用的功能
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
            专业的四柱八字排盘与命理分析平台
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* 排盘卡片 */}
            <Link href="/paipan">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow cursor-pointer">
                <div className="text-5xl mb-4">📊</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  排盘
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  创建和管理您的排盘内容，查看历史记录
                </p>
              </div>
            </Link>

            {/* 对话卡片 */}
            <Link href="/chat">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow cursor-pointer">
                <div className="text-5xl mb-4">💬</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  对话
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  八字命理分析 + 梅花易数占卜，专业算卦智能对话
                </p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
