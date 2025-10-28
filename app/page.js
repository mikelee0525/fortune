import Link from 'next/link';
import Logo from './components/Logo';
import HeroLogo from './components/HeroLogo';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo />
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
          <div className="mb-6 flex items-center justify-center">
            {/* 大型清晰logo */}
            <div className="flex items-center gap-4">
              <svg 
                viewBox="0 0 64 64" 
                className="w-16 h-16 text-blue-600 dark:text-blue-400"
                fill="currentColor"
              >
                <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="2"/>
                <path d="M32 4 A28 28 0 0 1 32 60 A14 14 0 0 1 32 32 A14 14 0 0 0 32 4" fill="currentColor"/>
                <circle cx="32" cy="18" r="4" fill="white"/>
                <circle cx="32" cy="46" r="4" fill="currentColor"/>
                <g stroke="currentColor" strokeWidth="2" fill="none">
                  <line x1="32" y1="2" x2="32" y2="8"/>
                  <line x1="54.6" y1="16" x2="50.2" y2="19"/>
                  <line x1="54.6" y1="48" x2="50.2" y2="45"/>
                  <line x1="32" y1="62" x2="32" y2="56"/>
                  <line x1="9.4" y1="48" x2="13.8" y2="45"/>
                  <line x1="9.4" y1="16" x2="13.8" y2="19"/>
                  <line x1="48" y1="9.4" x2="45" y2="13.8"/>
                  <line x1="16" y1="9.4" x2="19" y2="13.8"/>
                </g>
              </svg>
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white tracking-wide">
                命理坊
              </h1>
            </div>
          </div>
          <h2 className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            专业的四柱八字排盘与命理分析平台
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
            选择您要使用的功能
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
                  与AI助手进行智能对话，获取帮助和建议
                </p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
