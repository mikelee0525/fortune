'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SimpleLogo from '../components/SimpleLogo';

export default function PaipanPage() {
  const [paipanList, setPaipanList] = useState([]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPaipanName, setNewPaipanName] = useState('');
  const [birthInfo, setBirthInfo] = useState({
    year: '1999',
    month: '1',
    day: '1',
    hour: '1',
    minute: '1'
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPaipan, setSelectedPaipan] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // 从 localStorage 加载数据
  useEffect(() => {
    const savedPaipanList = localStorage.getItem('paipanList');
    if (savedPaipanList) {
      try {
        const parsedList = JSON.parse(savedPaipanList);
        setPaipanList(parsedList);
      } catch (error) {
        console.error('加载排盘数据失败:', error);
        // 如果解析失败，使用默认数据
        const defaultList = [
          { id: 1, name: '示例排盘', date: '2024-01-15', birthDate: '1999-01-01 01:01', content: '这是一个示例排盘，您可以创建新的排盘来替换它。' }
        ];
        setPaipanList(defaultList);
        localStorage.setItem('paipanList', JSON.stringify(defaultList));
      }
    } else {
      // 首次访问，创建默认数据
      const defaultList = [
        { id: 1, name: '示例排盘', date: '2024-01-15', birthDate: '1999-01-01 01:01', content: '这是一个示例排盘，您可以创建新的排盘来替换它。' }
      ];
      setPaipanList(defaultList);
      localStorage.setItem('paipanList', JSON.stringify(defaultList));
    }
  }, []);

  // 保存数据到 localStorage
  const savePaipanList = (newList) => {
    setPaipanList(newList);
    localStorage.setItem('paipanList', JSON.stringify(newList));
  };

  // 删除排盘
  const deletePaipan = (id) => {
    if (confirm('确定要删除这个排盘吗？')) {
      const updatedList = paipanList.filter(paipan => paipan.id !== id);
      savePaipanList(updatedList);
    }
  };

  const handleCreatePaipan = async () => {
    if (!newPaipanName.trim() || !birthInfo.year || !birthInfo.month || !birthInfo.day || !birthInfo.hour || !birthInfo.minute) {
      alert('请填写完整的生日信息');
      return;
    }
    
    const birthDate = `${birthInfo.year}-${birthInfo.month.padStart(2, '0')}-${birthInfo.day.padStart(2, '0')} ${birthInfo.hour.padStart(2, '0')}:${birthInfo.minute.padStart(2, '0')}`;
    
    setIsGenerating(true);
    
    try {
      // 调用智能体生成四柱八字分析
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{
            role: 'user',
            content: `请为以下生辰八字进行详细分析：
生日：阳历${birthInfo.year}年${birthInfo.month}月${birthInfo.day}日 ${birthInfo.hour}时${birthInfo.minute}分

请提供：
1. 四柱八字（年柱、月柱、日柱、时柱）
2. 十神分析
3. 五行分析
4. 格局分析
5. 用神喜忌
6. 运势简析

请用表格形式展示四柱和十神，并提供详细的文字分析。`
          }],
          sessionId: `paipan-${Date.now()}`
        }),
      });

      if (!response.ok) {
        throw new Error(`API调用失败: ${response.status}`);
      }

      const data = await response.json();
      const analysis = data.response || data.message || '生成分析失败';
      
      const newPaipan = {
        id: Date.now(), // 使用时间戳作为唯一ID
        name: newPaipanName,
        date: new Date().toISOString().split('T')[0],
        birthDate: birthDate,
        content: analysis,
      };
      
      const updatedList = [newPaipan, ...paipanList];
      savePaipanList(updatedList);
      setNewPaipanName('');
      setBirthInfo({ year: '1999', month: '1', day: '1', hour: '1', minute: '1' });
      setShowCreateModal(false);
      
    } catch (error) {
      console.error('生成排盘失败:', error);
      alert('生成排盘失败，请稍后重试');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <SimpleLogo />
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {paipanList.map((paipan) => (
            <div
              key={paipan.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {paipan.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    创建时间: {paipan.date}
                  </p>
                  {paipan.birthDate && (
                    <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                      生辰: {paipan.birthDate}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="mb-4 max-h-32 overflow-y-auto">
                <pre className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap font-mono">
                  {paipan.content.length > 200 ? paipan.content.substring(0, 200) + '...' : paipan.content}
                </pre>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    setSelectedPaipan(paipan);
                    setShowDetailModal(true);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                >
                  查看完整分析
                </button>
                <button 
                  onClick={() => deletePaipan(paipan.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                >
                  删除
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
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 max-w-lg w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              新建排盘
            </h2>
            
            {/* 排盘名称 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                排盘名称
              </label>
              <input
                type="text"
                value={newPaipanName}
                onChange={(e) => setNewPaipanName(e.target.value)}
                placeholder="输入排盘名称"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </div>

            {/* 生日信息 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                阳历生日
              </label>
              
              {/* 年月日 */}
              <div className="grid grid-cols-3 gap-3 mb-3">
                <div>
                  <input
                    type="number"
                    value={birthInfo.year}
                    onChange={(e) => setBirthInfo({...birthInfo, year: e.target.value})}
                    placeholder="年份"
                    min="1900"
                    max="2100"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    value={birthInfo.month}
                    onChange={(e) => setBirthInfo({...birthInfo, month: e.target.value})}
                    placeholder="月"
                    min="1"
                    max="12"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    value={birthInfo.day}
                    onChange={(e) => setBirthInfo({...birthInfo, day: e.target.value})}
                    placeholder="日"
                    min="1"
                    max="31"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* 时分 */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="number"
                    value={birthInfo.hour}
                    onChange={(e) => setBirthInfo({...birthInfo, hour: e.target.value})}
                    placeholder="小时 (0-23)"
                    min="0"
                    max="23"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    value={birthInfo.minute}
                    onChange={(e) => setBirthInfo({...birthInfo, minute: e.target.value})}
                    placeholder="分钟 (0-59)"
                    min="0"
                    max="59"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* 生成状态提示 */}
            {isGenerating && (
              <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-blue-700 dark:text-blue-300 text-sm">正在生成四柱八字分析...</span>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleCreatePaipan}
                disabled={isGenerating}
                className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isGenerating ? '生成中...' : '创建排盘'}
              </button>
              <button
                onClick={() => {
                  if (!isGenerating) {
                    setShowCreateModal(false);
                    setNewPaipanName('');
                    setBirthInfo({ year: '1999', month: '1', day: '1', hour: '1', minute: '1' });
                  }
                }}
                disabled={isGenerating}
                className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 详情模态框 */}
      {showDetailModal && selectedPaipan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* 头部 */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedPaipan.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  生辰: {selectedPaipan.birthDate} | 创建时间: {selectedPaipan.date}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedPaipan(null);
                }}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 内容区域 */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <pre className="whitespace-pre-wrap font-mono text-sm bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700 overflow-x-auto">
                  {selectedPaipan.content}
                </pre>
              </div>
            </div>

            {/* 底部按钮 */}
            <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(selectedPaipan.content);
                  alert('分析内容已复制到剪贴板');
                }}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
              >
                复制内容
              </button>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedPaipan(null);
                }}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

