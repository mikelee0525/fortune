'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PaipanPage() {
  const [paipanList, setPaipanList] = useState([
    { id: 1, name: '排盘 #1', date: '2024-01-15', content: '示例排盘内容' },
    { id: 2, name: '排盘 #2', date: '2024-01-14', content: '示例排盘内容' },
    { id: 3, name: '排盘 #3', date: '2024-01-13', content: '示例排盘内容' },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPaipanName, setNewPaipanName] = useState('');

  const handleCreatePaipan = () => {
    if (!newPaipanName.trim()) return;
    
    const newPaipan = {
      id: paipanList.length + 1,
      name: newPaipanName,
      date: new Date().toISOString().split('T')[0],
      content: '新建排盘内容',
    };
    
    setPaipanList([newPaipan, ...paipanList]);
    setNewPaipanName('');
    setShowCreateModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
              Teller
            </Link>
            <nav className="flex space-x-1">
              <Link
                href="/paipan"
                className="px-6 py-2 rounded-lg font-medium transition-all bg-blue-500 text-white shadow-md"
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            排盘管理
          </h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            + 新建排盘
          </button>
        </div>

        {/* 排盘列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paipanList.map((paipan) => (
            <div
              key={paipan.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {paipan.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {paipan.date}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {paipan.content}
              </p>
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
                  查看详情
                </button>
                <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm">
                  编辑
                </button>
              </div>
            </div>
          ))}
        </div>

        {paipanList.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              还没有排盘
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              点击上方按钮创建您的第一个排盘
            </p>
          </div>
        )}
      </main>

      {/* 创建模态框 */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              新建排盘
            </h2>
            <input
              type="text"
              value={newPaipanName}
              onChange={(e) => setNewPaipanName(e.target.value)}
              placeholder="输入排盘名称"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={handleCreatePaipan}
                className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                创建
              </button>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setNewPaipanName('');
                }}
                className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

