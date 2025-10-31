'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SimpleLogo from '../components/SimpleLogo';
import BaziChart from '../components/BaziChart';
import { solarToLunar } from '../utils/lunarConverter';
import { calculateBaZi } from '../utils/baziCalculator';

// 获取五行对应的颜色类
function getWuXingColor(wuXing) {
  const colors = {
    '木': 'text-green-600 dark:text-green-400',
    '火': 'text-red-600 dark:text-red-400', 
    '土': 'text-yellow-600 dark:text-yellow-400',
    '金': 'text-amber-500 dark:text-amber-400',
    '水': 'text-blue-600 dark:text-blue-400'
  };
  return colors[wuXing] || 'text-gray-600 dark:text-gray-400';
}

// 获取天干地支的五行属性
function getGanZhiWuXing(ganZhi) {
  const wuXingMap = {
    '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土',
    '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水',
    '子': '水', '丑': '土', '寅': '木', '卯': '木', '辰': '土',
    '巳': '火', '午': '火', '未': '土', '申': '金', '酉': '金',
    '戌': '土', '亥': '水'
  };
  return wuXingMap[ganZhi] || '土';
}



// 生成复制内容的函数
function generateCopyContent(paipan) {
  if (!paipan || !paipan.baziData) return '数据不完整，无法生成复制内容';
  
  const result = paipan.baziData;
  
  // 安全检查各个必要字段
  if (!result.sizhu || !result.shiShen || !result.nayin ||
      !result.sizhu.year || !result.sizhu.month || !result.sizhu.day || !result.sizhu.hour) {
    return '八字数据不完整，无法生成复制内容';
  }
  
  // 从birthDate解析生辰信息
  const birthDate = new Date(paipan.birthDate);
  const birthText = `${birthDate.getFullYear()}年${birthDate.getMonth() + 1}月${birthDate.getDate()}日 ${birthDate.getHours()}时`;
  
  // 格式化农历信息
  let lunarText = '';
  if (paipan.lunarDate) {
    lunarText = `农历：${paipan.lunarDate.year}年${paipan.lunarDate.month}月${paipan.lunarDate.day}日`;
  }
  
  // 格式化八字
  const baziText = `${result.sizhu.year.gan}${result.sizhu.year.zhi} ${result.sizhu.month.gan}${result.sizhu.month.zhi} ${result.sizhu.day.gan}${result.sizhu.day.zhi} ${result.sizhu.hour.gan}${result.sizhu.hour.zhi}`;
  
  // 格式化十神
  const shishenText = `${result.shiShen.year} ${result.shiShen.month} ${result.shiShen.day} ${result.shiShen.hour}`;
  
  // 格式化纳音
  const nayinText = `${result.nayin.year} ${result.nayin.month} ${result.nayin.day} ${result.nayin.hour}`;
  
  // 格式化藏干
  const cangganText = [
    `年支${result.sizhu.year.zhi}藏：${result.cangGan[0].map((gan, i) => `${gan}(${result.cangGanShiShen[0][i]})`).join(' ')}`,
    `月支${result.sizhu.month.zhi}藏：${result.cangGan[1].map((gan, i) => `${gan}(${result.cangGanShiShen[1][i]})`).join(' ')}`,
    `日支${result.sizhu.day.zhi}藏：${result.cangGan[2].map((gan, i) => `${gan}(${result.cangGanShiShen[2][i]})`).join(' ')}`,
    `时支${result.sizhu.hour.zhi}藏：${result.cangGan[3].map((gan, i) => `${gan}(${result.cangGanShiShen[3][i]})`).join(' ')}`
  ].join('\n');
  
  // 格式化格局
  let gejuText = '格局：普通格局';
  if (result.shishenPatterns && result.shishenPatterns.length > 0) {
    gejuText = `格局：${result.shishenPatterns.map(g => g.name).join('、')}`;
  }
  
  // 格式化神煞
  let shenshaText = '';
  if (result.shensha && result.shensha.length > 0) {
    shenshaText = `神煞：${result.shensha.join('、')}`;
  }
  
  // 格式化称骨
  let chengguText = '';
  if (result.chenggu) {
    chengguText = `称骨：${result.chenggu.totalWeight}两 - ${result.chenggu.comment}`;
  }
  
  // 组合所有内容
  const copyContent = [
    `=== ${paipan.name || '八字排盘'} ===`,
    `性别：${paipan.gender}`,
    `公历：${birthText}`,
    lunarText,
    '',
    `八字：${baziText}`,
    `十神：${shishenText}`,
    `纳音：${nayinText}`,
    '',
    '=== 藏干十神 ===',
    cangganText,
    '',
    gejuText,
    shenshaText,
    chengguText,
    '',
    `生成时间：${new Date(paipan.createdAt).toLocaleString()}`
  ].filter(line => line !== '').join('\n');
  
  return copyContent;
}

export default function PaipanPage() {
  const [paipanList, setPaipanList] = useState([]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [personName, setPersonName] = useState('');
  const [gender, setGender] = useState('男');
  const [calendarType, setCalendarType] = useState('公历'); // 公历或农历
  const [birthInfo, setBirthInfo] = useState({
    year: '2017',
    month: '10',
    day: '26',
    hour: '23',  // 缺省设为23时
    minute: '0'  // 缺省设为0分
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPaipan, setSelectedPaipan] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [lunarDate, setLunarDate] = useState(null);
  const [solarDate, setSolarDate] = useState(null);
  const [editableBirthInfo, setEditableBirthInfo] = useState({
    year: '',
    month: '',
    day: '',
    hour: '',
    minute: '0'
  });

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

  // 生成八字分析文本
  const generateBaziAnalysis = (baziData, name, gender, lunarDate) => {
    const { sizhu, shiShen, wuXing, dayGan, input } = baziData;

    let analysis = `【${name}（${gender}）八字排盘分析】\n\n`;

    // 生日信息
    analysis += `生日信息：\n`;
    analysis += `公历：${input.year}年${input.month}月${input.day}日 ${input.hour}时${input.minute}分\n`;
    if (lunarDate && lunarDate.text) {
      analysis += `农历：${lunarDate.text}\n`;
    }
    analysis += `\n`;

    // 基本信息
    analysis += `四柱八字：\n`;
    analysis += `年柱：${sizhu.year.ganZhi}（${shiShen.year}）\n`;
    analysis += `月柱：${sizhu.month.ganZhi}（${shiShen.month}）\n`;
    analysis += `日柱：${sizhu.day.ganZhi}（${shiShen.day}）← 日主\n`;
    analysis += `时柱：${sizhu.hour.ganZhi}（${shiShen.hour}）\n\n`;

    // 日干分析
    analysis += `日干分析：\n`;
    analysis += `日干：${dayGan.gan}（${dayGan.wuXing}），${dayGan.strength}\n\n`;

    // 五行统计
    analysis += `五行统计：\n`;
    Object.entries(wuXing.count).forEach(([element, count]) => {
      analysis += `${element}：${count}个  `;
    });
    analysis += `\n\n`;

    // 五行分析
    const missing = Object.entries(wuXing.count)
      .filter(([_, count]) => count === 0)
      .map(([element]) => element);
    const strong = Object.entries(wuXing.count)
      .filter(([_, count]) => count >= 3)
      .map(([element]) => element);

    if (missing.length > 0) {
      analysis += `五行缺失：${missing.join('、')}\n`;
    }
    if (strong.length > 0) {
      analysis += `五行偏旺：${strong.join('、')}\n`;
    }
    analysis += `\n注：此为程序自动计算结果，仅供参考。`;

    return analysis;
  };

  // 计算农历日期
  const calculateLunarDate = async () => {
    console.log('开始计算农历:', { calendarType, birthInfo });
    if (calendarType === '公历' && birthInfo.year && birthInfo.month && birthInfo.day) {
      try {
        const lunar = await solarToLunar(
          parseInt(birthInfo.year),
          parseInt(birthInfo.month),
          parseInt(birthInfo.day)
        );
        console.log('农历计算结果:', lunar);
        setLunarDate(lunar);
      } catch (error) {
        console.error('农历转换失败:', error);
        setLunarDate(null);
      }
    } else {
      setLunarDate(null);
    }
  };

  // 计算公历日期（农历转公历）
  const calculateSolarDate = async () => {
    console.log('开始计算公历:', { calendarType, birthInfo });
    if (calendarType === '农历' && birthInfo.year && birthInfo.month && birthInfo.day) {
      try {
        const solar = await lunarToSolar(
          parseInt(birthInfo.year),
          parseInt(birthInfo.month),
          parseInt(birthInfo.day)
        );
        console.log('公历计算结果:', solar);
        setSolarDate(solar);
      } catch (error) {
        console.error('公历转换失败:', error);
        setSolarDate(null);
      }
    } else {
      setSolarDate(null);
    }
  };

  // 监听生日信息变化，自动计算对应的历法
  useEffect(() => {
    if (calendarType === '公历' && birthInfo.year && birthInfo.month && birthInfo.day) {
      calculateLunarDate();
      setSolarDate(null); // 清除公历转换结果
    } else if (calendarType === '农历' && birthInfo.year && birthInfo.month && birthInfo.day) {
      calculateSolarDate();
      setLunarDate(null); // 清除农历转换结果
    } else {
      setLunarDate(null);
      setSolarDate(null);
    }
  }, [birthInfo.year, birthInfo.month, birthInfo.day, calendarType]);

  const handleCreatePaipan = async () => {
    if (!personName.trim() || !birthInfo.year || !birthInfo.month || !birthInfo.day || !birthInfo.hour) {
      alert('请填写完整的姓名和生日信息');
      return;
    }

    const birthDate = `${birthInfo.year}-${birthInfo.month.padStart(2, '0')}-${birthInfo.day.padStart(2, '0')} ${birthInfo.hour.padStart(2, '0')}:${(birthInfo.minute || '0').padStart(2, '0')}`;

    setIsGenerating(true);

    // 如果是公历但还没有农历转换，先进行转换
    let currentLunarDate = lunarDate;
    let currentSolarDate = solarDate;

    if (calendarType === '公历' && !lunarDate) {
      try {
        currentLunarDate = await solarToLunar(
          parseInt(birthInfo.year),
          parseInt(birthInfo.month),
          parseInt(birthInfo.day)
        );
        setLunarDate(currentLunarDate);
      } catch (error) {
        console.error('农历转换失败:', error);
      }
    } else if (calendarType === '农历' && !solarDate) {
      try {
        currentSolarDate = await lunarToSolar(
          parseInt(birthInfo.year),
          parseInt(birthInfo.month),
          parseInt(birthInfo.day)
        );
        setSolarDate(currentSolarDate);
      } catch (error) {
        console.error('公历转换失败:', error);
      }
    }

    try {
      // 直接计算八字，不调用AI
      const baziResult = calculateBaZi(
        parseInt(birthInfo.year),
        parseInt(birthInfo.month),
        parseInt(birthInfo.day),
        parseInt(birthInfo.hour),
        parseInt(birthInfo.minute || '0'),
        gender
      );

      if (!baziResult) {
        throw new Error('八字计算失败');
      }

      // 生成分析文本
      const analysis = generateBaziAnalysis(baziResult, personName, gender, currentLunarDate);

      const newPaipan = {
        id: Date.now(), // 使用时间戳作为唯一ID
        name: personName,
        gender: gender,
        date: new Date().toISOString().split('T')[0],
        birthDate: birthDate,
        calendarType: calendarType,
        lunarDate: calendarType === '公历' ? currentLunarDate : null,
        solarDate: calendarType === '农历' ? currentSolarDate : null,
        baziData: baziResult, // 保存八字数据
        content: analysis,
      };

      const updatedList = [newPaipan, ...paipanList];
      savePaipanList(updatedList);

      // 重置表单
      setPersonName('');
      setGender('男');
      setCalendarType('公历');
      setBirthInfo({ year: '2017', month: '10', day: '26', hour: '23', minute: '0' });
      setLunarDate(null);
      setSolarDate(null);
      setShowCreateModal(false);

      // 自动显示完整分析
      setSelectedPaipan(newPaipan);
      // 初始化可编辑的生日信息
      setEditableBirthInfo({
        year: birthInfo.year,
        month: birthInfo.month,
        day: birthInfo.day,
        hour: birthInfo.hour,
        minute: birthInfo.minute || '0'
      });
      setShowDetailModal(true);

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
        <div className="max-w-7xl mx-auto px-1 sm:px-4 lg:px-8">
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
      <main className="max-w-7xl mx-auto px-1 sm:px-4 lg:px-8 py-2 sm:py-4 lg:py-8">
        <div className="flex items-center justify-between mb-2 sm:mb-4 lg:mb-8">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4 lg:gap-6">
          {paipanList.map((paipan) => (
            <div
              key={paipan.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {paipan.name} {paipan.gender && `(${paipan.gender})`}
                  </h3>
                  {paipan.birthDate && (
                    <div className="text-sm mt-2 space-y-1">
                      {paipan.calendarType === '公历' ? (
                        <>
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">
                              公历
                            </span>
                            <span className="text-blue-600 dark:text-blue-400 font-medium">
                              {paipan.birthDate}
                            </span>
                          </div>
                          {paipan.lunarDate && paipan.lunarDate.text && (
                            <div className="flex items-center gap-2">
                              <span className="text-xs bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 px-2 py-0.5 rounded">
                                农历
                              </span>
                              <span className="text-orange-600 dark:text-orange-400 font-medium">
                                {paipan.lunarDate.text}
                              </span>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 px-2 py-0.5 rounded">
                              农历
                            </span>
                            <span className="text-orange-600 dark:text-orange-400 font-medium">
                              {paipan.birthDate}
                            </span>
                          </div>
                          {paipan.solarDate && paipan.solarDate.text && (
                            <div className="flex items-center gap-2">
                              <span className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">
                                公历
                              </span>
                              <span className="text-blue-600 dark:text-blue-400 font-medium">
                                {paipan.solarDate.text}
                              </span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* 八字表格显示 */}
              {paipan.baziData && (
                <div className="mb-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">八字排盘</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs table-fixed">
                        <colgroup>
                          <col className="w-12" />
                          <col className="w-16" />
                          <col className="w-16" />
                          <col className="w-20" />
                          <col className="w-16" />
                        </colgroup>
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-600">
                            <th className="text-left py-1 px-2 text-gray-600 dark:text-gray-400">柱位</th>
                            <th className="text-center py-1 px-2 text-gray-600 dark:text-gray-400">年柱</th>
                            <th className="text-center py-1 px-2 text-gray-600 dark:text-gray-400">月柱</th>
                            <th className="text-center py-1 px-2 text-gray-600 dark:text-gray-400 bg-red-50 dark:bg-red-900/20">日柱</th>
                            <th className="text-center py-1 px-2 text-gray-600 dark:text-gray-400">时柱</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-200 dark:border-gray-600">
                            <td className="py-1 px-2 text-gray-600 dark:text-gray-400 font-medium">十神：</td>
                            <td className="text-center py-1 px-2 text-purple-600 dark:text-purple-400 font-medium">
                              {paipan.baziData.shiShen.year}
                            </td>
                            <td className="text-center py-1 px-2 text-purple-600 dark:text-purple-400 font-medium">
                              {paipan.baziData.shiShen.month}
                            </td>
                            <td className="text-center py-1 px-2 text-purple-600 dark:text-purple-400 font-medium bg-red-50 dark:bg-red-900/20">
                              {paipan.baziData.shiShen.day}
                            </td>
                            <td className="text-center py-1 px-2 text-purple-600 dark:text-purple-400 font-medium">
                              {paipan.baziData.shiShen.hour}
                            </td>
                          </tr>
                          <tr className="border-b border-gray-200 dark:border-gray-600">
                            <td className="py-1 px-2 text-gray-600 dark:text-gray-400 font-medium">天干：</td>
                            <td className="text-center py-1 px-2 relative">
                              <div className={`font-bold ${getWuXingColor(getGanZhiWuXing(paipan.baziData.sizhu.year.gan))}`}>
                                {paipan.baziData.sizhu.year.gan}
                              </div>
                              <div className={`absolute bottom-0 right-0 text-xs px-0.5 py-0.5 rounded text-xs leading-none ${getWuXingColor(getGanZhiWuXing(paipan.baziData.sizhu.year.gan))} bg-gray-100 dark:bg-gray-600 opacity-60`} style={{fontSize: '8px'}}>
                                {getGanZhiWuXing(paipan.baziData.sizhu.year.gan)}
                              </div>
                            </td>
                            <td className="text-center py-1 px-2 relative">
                              <div className={`font-bold ${getWuXingColor(getGanZhiWuXing(paipan.baziData.sizhu.month.gan))}`}>
                                {paipan.baziData.sizhu.month.gan}
                              </div>
                              <div className={`absolute bottom-0 right-0 text-xs px-0.5 py-0.5 rounded text-xs leading-none ${getWuXingColor(getGanZhiWuXing(paipan.baziData.sizhu.month.gan))} bg-gray-100 dark:bg-gray-600 opacity-60`} style={{fontSize: '8px'}}>
                                {getGanZhiWuXing(paipan.baziData.sizhu.month.gan)}
                              </div>
                            </td>
                            <td className="text-center py-1 px-2 relative bg-red-50 dark:bg-red-900/20">
                              <div className={`font-bold ${getWuXingColor(getGanZhiWuXing(paipan.baziData.sizhu.day.gan))}`}>
                                {paipan.baziData.sizhu.day.gan}
                              </div>
                              <div className={`absolute bottom-0 right-0 text-xs px-0.5 py-0.5 rounded text-xs leading-none ${getWuXingColor(getGanZhiWuXing(paipan.baziData.sizhu.day.gan))} bg-gray-100 dark:bg-gray-600 opacity-60`} style={{fontSize: '8px'}}>
                                {getGanZhiWuXing(paipan.baziData.sizhu.day.gan)}
                              </div>
                            </td>
                            <td className="text-center py-1 px-2 relative">
                              <div className={`font-bold ${getWuXingColor(getGanZhiWuXing(paipan.baziData.sizhu.hour.gan))}`}>
                                {paipan.baziData.sizhu.hour.gan}
                              </div>
                              <div className={`absolute bottom-0 right-0 text-xs px-0.5 py-0.5 rounded text-xs leading-none ${getWuXingColor(getGanZhiWuXing(paipan.baziData.sizhu.hour.gan))} bg-gray-100 dark:bg-gray-600 opacity-60`} style={{fontSize: '8px'}}>
                                {getGanZhiWuXing(paipan.baziData.sizhu.hour.gan)}
                              </div>
                            </td>
                          </tr>
                          <tr className="border-b border-gray-200 dark:border-gray-600">
                            <td className="py-1 px-2 text-gray-600 dark:text-gray-400 font-medium">地支：</td>
                            <td className="text-center py-1 px-2 relative">
                              <div className={`font-bold ${getWuXingColor(getGanZhiWuXing(paipan.baziData.sizhu.year.zhi))}`}>
                                {paipan.baziData.sizhu.year.zhi}
                              </div>
                              <div className={`absolute bottom-0 right-0 text-xs px-0.5 py-0.5 rounded text-xs leading-none ${getWuXingColor(getGanZhiWuXing(paipan.baziData.sizhu.year.zhi))} bg-gray-100 dark:bg-gray-600 opacity-60`} style={{fontSize: '8px'}}>
                                {getGanZhiWuXing(paipan.baziData.sizhu.year.zhi)}
                              </div>
                            </td>
                            <td className="text-center py-1 px-2 relative">
                              <div className={`font-bold ${getWuXingColor(getGanZhiWuXing(paipan.baziData.sizhu.month.zhi))}`}>
                                {paipan.baziData.sizhu.month.zhi}
                              </div>
                              <div className={`absolute bottom-0 right-0 text-xs px-0.5 py-0.5 rounded text-xs leading-none ${getWuXingColor(getGanZhiWuXing(paipan.baziData.sizhu.month.zhi))} bg-gray-100 dark:bg-gray-600 opacity-60`} style={{fontSize: '8px'}}>
                                {getGanZhiWuXing(paipan.baziData.sizhu.month.zhi)}
                              </div>
                            </td>
                            <td className="text-center py-1 px-2 relative bg-red-50 dark:bg-red-900/20">
                              <div className={`font-bold ${getWuXingColor(getGanZhiWuXing(paipan.baziData.sizhu.day.zhi))}`}>
                                {paipan.baziData.sizhu.day.zhi}
                              </div>
                              <div className={`absolute bottom-0 right-0 text-xs px-0.5 py-0.5 rounded text-xs leading-none ${getWuXingColor(getGanZhiWuXing(paipan.baziData.sizhu.day.zhi))} bg-gray-100 dark:bg-gray-600 opacity-60`} style={{fontSize: '8px'}}>
                                {getGanZhiWuXing(paipan.baziData.sizhu.day.zhi)}
                              </div>
                            </td>
                            <td className="text-center py-1 px-2 relative">
                              <div className={`font-bold ${getWuXingColor(getGanZhiWuXing(paipan.baziData.sizhu.hour.zhi))}`}>
                                {paipan.baziData.sizhu.hour.zhi}
                              </div>
                              <div className={`absolute bottom-0 right-0 text-xs px-0.5 py-0.5 rounded text-xs leading-none ${getWuXingColor(getGanZhiWuXing(paipan.baziData.sizhu.hour.zhi))} bg-gray-100 dark:bg-gray-600 opacity-60`} style={{fontSize: '8px'}}>
                                {getGanZhiWuXing(paipan.baziData.sizhu.hour.zhi)}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 px-2 text-gray-600 dark:text-gray-400 font-medium">藏干：</td>
                            <td className="text-center py-2 px-2 text-xs">
                              <div className="space-y-1">
                                <div className="text-gray-600 dark:text-gray-400 font-medium">
                                  {paipan.baziData.cangGan[0]?.join(' ')}
                                </div>
                                <div className="text-purple-600 dark:text-purple-400 text-xs">
                                  {paipan.baziData.cangGanShiShen[0]?.join(' ')}
                                </div>
                              </div>
                            </td>
                            <td className="text-center py-2 px-2 text-xs">
                              <div className="space-y-1">
                                <div className="text-gray-600 dark:text-gray-400 font-medium">
                                  {paipan.baziData.cangGan[1]?.join(' ')}
                                </div>
                                <div className="text-purple-600 dark:text-purple-400 text-xs">
                                  {paipan.baziData.cangGanShiShen[1]?.join(' ')}
                                </div>
                              </div>
                            </td>
                            <td className="text-center py-2 px-2 text-xs bg-red-50 dark:bg-red-900/20">
                              <div className="space-y-1">
                                <div className="text-gray-600 dark:text-gray-400 font-medium">
                                  {paipan.baziData.cangGan[2]?.join(' ')}
                                </div>
                                <div className="text-purple-600 dark:text-purple-400 text-xs">
                                  {paipan.baziData.cangGanShiShen[2]?.join(' ')}
                                </div>
                              </div>
                            </td>
                            <td className="text-center py-2 px-2 text-xs">
                              <div className="space-y-1">
                                <div className="text-gray-600 dark:text-gray-400 font-medium">
                                  {paipan.baziData.cangGan[3]?.join(' ')}
                                </div>
                                <div className="text-purple-600 dark:text-purple-400 text-xs">
                                  {paipan.baziData.cangGanShiShen[3]?.join(' ')}
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    // 从最新的paipanList中获取最新数据
                    const latestPaipan = paipanList.find(p => p.id === paipan.id) || paipan;
                    setSelectedPaipan(latestPaipan);
                    // 初始化可编辑的生日信息 - 使用最新的排盘数据
                    const currentDate = latestPaipan.birthDate?.split(' ');
                    const datePart = currentDate?.[0]?.split('-');
                    const timePart = currentDate?.[1]?.split(':');
                    setEditableBirthInfo({
                      year: datePart?.[0] || '',
                      month: datePart?.[1] ? parseInt(datePart[1]).toString() : '',
                      day: datePart?.[2] ? parseInt(datePart[2]).toString() : '',
                      hour: timePart?.[0] || '0',
                      minute: timePart?.[1] || '0'
                    });
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
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-2 sm:p-4 lg:p-8 max-w-lg w-full mx-1 sm:mx-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              新建排盘
            </h2>

            {/* 姓名和性别 */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  姓名
                </label>
                <input
                  type="text"
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                  placeholder="请输入姓名"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  性别
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="男">男</option>
                  <option value="女">女</option>
                </select>
              </div>
            </div>

            {/* 生日信息 */}
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  生日类型
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCalendarType('公历')}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${calendarType === '公历'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                  >
                    公历
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalendarType('农历')}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${calendarType === '农历'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                  >
                    农历
                  </button>
                </div>
              </div>

              {/* 年月日 */}
              <div className="grid grid-cols-3 gap-3 mb-3">
                <div>
                  <select
                    value={birthInfo.year}
                    onChange={(e) => setBirthInfo({ ...birthInfo, year: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {Array.from({ length: 112 }, (_, i) => 2035 - i).map(year => (
                      <option key={year} value={year}>{year}年</option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    value={birthInfo.month}
                    onChange={(e) => setBirthInfo({ ...birthInfo, month: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                      <option key={month} value={month}>{month}月</option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    value={birthInfo.day}
                    onChange={(e) => setBirthInfo({ ...birthInfo, day: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                      <option key={day} value={day}>{day}日</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 时间 */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <select
                    value={birthInfo.hour}
                    onChange={(e) => setBirthInfo({ ...birthInfo, hour: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">时</option>
                    {Array.from({ length: 24 }, (_, i) => (
                      <option key={i} value={i}>{i.toString().padStart(2, '0')}时</option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    value={birthInfo.minute || '0'}
                    onChange={(e) => setBirthInfo({ ...birthInfo, minute: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {Array.from({ length: 60 }, (_, i) => (
                      <option key={i} value={i}>{i.toString().padStart(2, '0')}分</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 农历显示 */}
              {calendarType === '公历' && lunarDate && (
                <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
                  <div className="text-sm text-blue-700 dark:text-blue-300">
                    <span className="font-medium">对应农历：</span>
                    {lunarDate.text}
                  </div>
                </div>
              )}

              {/* 公历显示 */}
              {calendarType === '农历' && solarDate && (
                <div className="mt-3 p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-lg">
                  <div className="text-sm text-orange-700 dark:text-orange-300">
                    <span className="font-medium">对应公历：</span>
                    {solarDate.text}
                  </div>
                </div>
              )}
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
                    setPersonName('');
                    setGender('男');
                    setCalendarType('公历');
                    setBirthInfo({ year: '2017', month: '10', day: '26', hour: '23', minute: '0' });
                    setLunarDate(null);
                    setSolarDate(null);
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-1 sm:p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* 头部 */}
            <div className="flex items-center justify-between p-2 sm:p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedPaipan.name}
                </h2>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">
                      公历
                    </span>
                    <span>{selectedPaipan.birthDate}</span>
                  </div>
                  {selectedPaipan.lunarDate && selectedPaipan.lunarDate.text && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 px-2 py-0.5 rounded">
                        农历
                      </span>
                      <span>{selectedPaipan.lunarDate.text}</span>
                    </div>
                  )}

                </div>
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
            <div className="flex-1 overflow-y-auto p-2 sm:p-4 lg:p-6">
              {selectedPaipan.baziData ? (
                <div className="space-y-6">
                  {/* 可编辑的生日信息 */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
                    <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">
                      生日信息（可修改）
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          年份
                        </label>
                        <select
                          value={editableBirthInfo.year}
                          onChange={(e) => setEditableBirthInfo(prev => ({ ...prev, year: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                        >
                          <option value="">请选择年份</option>
                          {Array.from({ length: 111 }, (_, i) => 2035 - i).map(year => (
                            <option key={year} value={year}>{year}年</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          月份
                        </label>
                        <select
                          value={editableBirthInfo.month}
                          onChange={(e) => setEditableBirthInfo(prev => ({ ...prev, month: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                        >
                          <option value="">请选择月份</option>
                          {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                            <option key={month} value={month}>{month}月</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          日期
                        </label>
                        <select
                          value={editableBirthInfo.day}
                          onChange={(e) => setEditableBirthInfo(prev => ({ ...prev, day: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                        >
                          <option value="">请选择日期</option>
                          {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                            <option key={day} value={day}>{day}日</option>
                          ))}
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            时
                          </label>
                          <select
                            value={editableBirthInfo.hour}
                            onChange={(e) => setEditableBirthInfo(prev => ({ ...prev, hour: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                          >
                            <option value="">时</option>
                            {Array.from({ length: 24 }, (_, i) => (
                              <option key={i} value={i}>{i.toString().padStart(2, '0')}时</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            分
                          </label>
                          <select
                            value={editableBirthInfo.minute || '0'}
                            onChange={(e) => setEditableBirthInfo(prev => ({ ...prev, minute: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                          >
                            {Array.from({ length: 60 }, (_, i) => (
                              <option key={i} value={i}>{i.toString().padStart(2, '0')}分</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                  </div>
                  
                  {/* 显示八字排盘图 */}
                  <BaziChart
                    baziData={selectedPaipan.baziData}
                    personInfo={{
                      name: selectedPaipan.name,
                      gender: selectedPaipan.gender
                    }}
                    lunarDate={selectedPaipan.lunarDate}
                  />
                </div>
              ) : (
                // 显示文本分析（兼容旧数据）
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <pre className="whitespace-pre-wrap font-mono text-sm bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700 overflow-x-auto">
                    {selectedPaipan.content}
                  </pre>
                </div>
              )}
            </div>

            {/* 底部按钮 */}
            <div className="flex gap-2 sm:gap-3 p-2 sm:p-4 lg:p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={async () => {
                  // 重新提交：使用修改后的生日信息重新计算并更新排盘
                  if (editableBirthInfo.year && editableBirthInfo.month && editableBirthInfo.day && editableBirthInfo.hour !== '') {
                    setIsGenerating(true);
                    try {
                      const yearVal = parseInt(editableBirthInfo.year);
                      const monthVal = parseInt(editableBirthInfo.month);
                      const dayVal = parseInt(editableBirthInfo.day);
                      const hourVal = parseInt(editableBirthInfo.hour);
                      const minuteVal = parseInt(editableBirthInfo.minute || '0');
                      
                      console.log('重新计算八字，输入参数:', {
                        year: yearVal,
                        month: monthVal,
                        day: dayVal,
                        hour: hourVal,
                        gender: selectedPaipan.personInfo?.gender,
                        editableBirthInfo: editableBirthInfo,
                        selectedPaipan: selectedPaipan
                      });
                      
                      // 验证参数有效性
                      if (isNaN(yearVal) || isNaN(monthVal) || isNaN(dayVal) || isNaN(hourVal)) {
                        throw new Error('日期时间参数无效');
                      }
                      
                      if (yearVal < 1900 || yearVal > 2100) {
                        throw new Error('年份超出有效范围');
                      }
                      
                      if (monthVal < 1 || monthVal > 12) {
                        throw new Error('月份超出有效范围');
                      }
                      
                      if (dayVal < 1 || dayVal > 31) {
                        throw new Error('日期超出有效范围');
                      }
                      
                      if (hourVal < 0 || hourVal > 23) {
                        throw new Error('小时超出有效范围');
                      }
                      
                      // 重新计算八字
                      const baziResult = calculateBaZi(
                        yearVal,
                        monthVal,
                        dayVal,
                        hourVal,
                        minuteVal,
                        selectedPaipan.personInfo?.gender
                      );

                      if (!baziResult) {
                        throw new Error('八字计算失败，请检查输入的日期时间');
                      }
                      
                      // 重新计算农历
                      let currentLunarDate = null;
                      try {
                        currentLunarDate = await solarToLunar(
                          parseInt(editableBirthInfo.year),
                          parseInt(editableBirthInfo.month),
                          parseInt(editableBirthInfo.day)
                        );
                      } catch (error) {
                        console.error('农历转换失败:', error);
                      }
                      
                      const newBirthDate = `${editableBirthInfo.year}-${String(editableBirthInfo.month).padStart(2, '0')}-${String(editableBirthInfo.day).padStart(2, '0')} ${String(editableBirthInfo.hour).padStart(2, '0')}:${String(editableBirthInfo.minute || '0').padStart(2, '0')}`;
                      
                      // 更新排盘数据
                      const updatedPaipan = {
                        ...selectedPaipan,
                        baziData: baziResult,
                        birthDate: newBirthDate,
                        lunarDate: currentLunarDate,
                        date: new Date().toLocaleString('zh-CN')
                      };
                      
                      // 更新localStorage中的数据
                      const updatedList = paipanList.map(paipan => 
                        paipan.id === selectedPaipan.id 
                          ? updatedPaipan
                          : paipan
                      );
                      setPaipanList(updatedList);
                      savePaipanList(updatedList);
                      
                      // 更新当前显示的排盘数据
                      setSelectedPaipan(updatedPaipan);
                      
                    } catch (error) {
                      console.error('重新计算八字失败:', error);
                      alert(`重新计算失败: ${error.message || '请检查输入的日期时间'}`);
                    } finally {
                      setIsGenerating(false);
                    }
                  } else {
                    alert('请填写完整的生日信息');
                  }
                }}
                disabled={isGenerating}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm disabled:opacity-50"
              >
                {isGenerating ? '计算中...' : '重新提交'}
              </button>
              <button
                onClick={() => {
                  // 生成完整的复制内容，包含生辰和八字信息
                  const copyContent = generateCopyContent(selectedPaipan);
                  navigator.clipboard.writeText(copyContent);
                  alert('完整八字信息已复制到剪贴板');
                }}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
              >
                复制详情
              </button>
              <button
                onClick={() => {
                  // 生成简化的八字信息
                  if (!selectedPaipan || !selectedPaipan.baziData) {
                    alert('数据不完整，无法复制');
                    return;
                  }
                  
                  const result = selectedPaipan.baziData;
                  
                  // 检查八字数据完整性
                  if (!result.sizhu || !result.shiShen ||
                      !result.sizhu.year || !result.sizhu.month || !result.sizhu.day || !result.sizhu.hour) {
                    alert('八字数据不完整，无法复制');
                    return;
                  }
                  
                  const birthDate = new Date(selectedPaipan.birthDate);
                  const simpleContent = [
                    `${selectedPaipan.name || '八字排盘'} (${selectedPaipan.gender})`,
                    `公历：${birthDate.getFullYear()}年${birthDate.getMonth() + 1}月${birthDate.getDate()}日 ${birthDate.getHours()}时`,
                    `八字：${result.sizhu.year.gan}${result.sizhu.year.zhi} ${result.sizhu.month.gan}${result.sizhu.month.zhi} ${result.sizhu.day.gan}${result.sizhu.day.zhi} ${result.sizhu.hour.gan}${result.sizhu.hour.zhi}`
                  ].join('\n');
                  navigator.clipboard.writeText(simpleContent);
                  alert('基本八字信息已复制到剪贴板');
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
              >
                复制八字
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

