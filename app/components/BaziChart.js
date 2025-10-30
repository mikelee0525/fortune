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

// 八字排盘显示组件
export default function BaziChart({ baziData, personInfo, lunarDate }) {
  if (!baziData) {
    return (
      <div className="text-center py-8 text-gray-500">
        八字数据加载中...
      </div>
    );
  }

  const { sizhu, shiShen, wuXing, cangGan, cangGanShiShen, dayGan } = baziData;

  return (
    <div className="space-y-6">
      {/* 基本信息 */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">
          基本信息
        </h3>
        
        {/* 个人信息 */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <span className="text-gray-600 dark:text-gray-400">姓名：</span>
            <span className="font-medium">{personInfo?.name || '未知'}</span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">性别：</span>
            <span className="font-medium">{personInfo?.gender || '未知'}</span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">日干：</span>
            <span className="font-medium text-red-600 dark:text-red-400">
              {dayGan.gan}（{dayGan.wuXing}）
            </span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">强弱：</span>
            <span className="font-medium">{dayGan.strength}</span>
          </div>
        </div>

      </div>

      {/* 四柱八字表格 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            四柱八字
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  柱位
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                  年柱
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                  月柱
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300 bg-red-50 dark:bg-red-900/20">
                  日柱（日主）
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                  时柱
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {/* 十神行 */}
              <tr>
                <td className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  十神：
                </td>
                <td className="px-4 py-2 text-center text-sm text-purple-600 dark:text-purple-400 font-medium">
                  {shiShen.year}
                </td>
                <td className="px-4 py-2 text-center text-sm text-purple-600 dark:text-purple-400 font-medium">
                  {shiShen.month}
                </td>
                <td className="px-4 py-2 text-center text-sm text-purple-600 dark:text-purple-400 font-medium bg-red-50 dark:bg-red-900/20">
                  {shiShen.day}
                </td>
                <td className="px-4 py-2 text-center text-sm text-purple-600 dark:text-purple-400 font-medium">
                  {shiShen.hour}
                </td>
              </tr>
              
              {/* 天干行 */}
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                  天干：
                </td>
                <td className="px-4 py-3 text-center relative">
                  <div className={`text-3xl font-bold ${getWuXingColor(getGanZhiWuXing(sizhu.year.gan))}`}>
                    {sizhu.year.gan}
                  </div>
                  <div className={`absolute bottom-1 right-1 text-xs px-1 py-0.5 rounded ${getWuXingColor(getGanZhiWuXing(sizhu.year.gan))} bg-gray-100 dark:bg-gray-700`}>
                    {getGanZhiWuXing(sizhu.year.gan)}
                  </div>
                </td>
                <td className="px-4 py-3 text-center relative">
                  <div className={`text-3xl font-bold ${getWuXingColor(getGanZhiWuXing(sizhu.month.gan))}`}>
                    {sizhu.month.gan}
                  </div>
                  <div className={`absolute bottom-1 right-1 text-xs px-1 py-0.5 rounded ${getWuXingColor(getGanZhiWuXing(sizhu.month.gan))} bg-gray-100 dark:bg-gray-700`}>
                    {getGanZhiWuXing(sizhu.month.gan)}
                  </div>
                </td>
                <td className="px-4 py-3 text-center relative bg-red-50 dark:bg-red-900/20">
                  <div className={`text-3xl font-bold ${getWuXingColor(getGanZhiWuXing(sizhu.day.gan))}`}>
                    {sizhu.day.gan}
                  </div>
                  <div className={`absolute bottom-1 right-1 text-xs px-1 py-0.5 rounded ${getWuXingColor(getGanZhiWuXing(sizhu.day.gan))} bg-gray-100 dark:bg-gray-700`}>
                    {getGanZhiWuXing(sizhu.day.gan)}
                  </div>
                </td>
                <td className="px-4 py-3 text-center relative">
                  <div className={`text-3xl font-bold ${getWuXingColor(getGanZhiWuXing(sizhu.hour.gan))}`}>
                    {sizhu.hour.gan}
                  </div>
                  <div className={`absolute bottom-1 right-1 text-xs px-1 py-0.5 rounded ${getWuXingColor(getGanZhiWuXing(sizhu.hour.gan))} bg-gray-100 dark:bg-gray-700`}>
                    {getGanZhiWuXing(sizhu.hour.gan)}
                  </div>
                </td>
              </tr>
              
              {/* 地支行 */}
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                  地支：
                </td>
                <td className="px-4 py-3 text-center relative">
                  <div className={`text-3xl font-bold ${getWuXingColor(getGanZhiWuXing(sizhu.year.zhi))}`}>
                    {sizhu.year.zhi}
                  </div>
                  <div className={`absolute bottom-1 right-1 text-xs px-1 py-0.5 rounded ${getWuXingColor(getGanZhiWuXing(sizhu.year.zhi))} bg-gray-100 dark:bg-gray-700`}>
                    {getGanZhiWuXing(sizhu.year.zhi)}
                  </div>
                </td>
                <td className="px-4 py-3 text-center relative">
                  <div className={`text-3xl font-bold ${getWuXingColor(getGanZhiWuXing(sizhu.month.zhi))}`}>
                    {sizhu.month.zhi}
                  </div>
                  <div className={`absolute bottom-1 right-1 text-xs px-1 py-0.5 rounded ${getWuXingColor(getGanZhiWuXing(sizhu.month.zhi))} bg-gray-100 dark:bg-gray-700`}>
                    {getGanZhiWuXing(sizhu.month.zhi)}
                  </div>
                </td>
                <td className="px-4 py-3 text-center relative bg-red-50 dark:bg-red-900/20">
                  <div className={`text-3xl font-bold ${getWuXingColor(getGanZhiWuXing(sizhu.day.zhi))}`}>
                    {sizhu.day.zhi}
                  </div>
                  <div className={`absolute bottom-1 right-1 text-xs px-1 py-0.5 rounded ${getWuXingColor(getGanZhiWuXing(sizhu.day.zhi))} bg-gray-100 dark:bg-gray-700`}>
                    {getGanZhiWuXing(sizhu.day.zhi)}
                  </div>
                </td>
                <td className="px-4 py-3 text-center relative">
                  <div className={`text-3xl font-bold ${getWuXingColor(getGanZhiWuXing(sizhu.hour.zhi))}`}>
                    {sizhu.hour.zhi}
                  </div>
                  <div className={`absolute bottom-1 right-1 text-xs px-1 py-0.5 rounded ${getWuXingColor(getGanZhiWuXing(sizhu.hour.zhi))} bg-gray-100 dark:bg-gray-700`}>
                    {getGanZhiWuXing(sizhu.hour.zhi)}
                  </div>
                </td>
              </tr>
              
              {/* 藏干行 */}
              <tr>
                <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                  藏干：
                </td>
                <td className="px-4 py-4 text-center text-xs">
                  <div className="space-y-1">
                    {cangGan[0]?.map((gan, index) => (
                      <div key={index} className="text-gray-600 dark:text-gray-400">
                        <span className={`font-bold ${getWuXingColor(getGanZhiWuXing(gan))}`}>
                          {gan}
                        </span>
                        <span className="text-purple-600 dark:text-purple-400">
                          （{cangGanShiShen[0]?.[index] || ''}）
                        </span>
                      </div>
                    )) || <span className="text-gray-400">-</span>}
                  </div>
                </td>
                <td className="px-4 py-4 text-center text-xs">
                  <div className="space-y-1">
                    {cangGan[1]?.map((gan, index) => (
                      <div key={index} className="text-gray-600 dark:text-gray-400">
                        <span className={`font-bold ${getWuXingColor(getGanZhiWuXing(gan))}`}>
                          {gan}
                        </span>
                        <span className="text-purple-600 dark:text-purple-400">
                          （{cangGanShiShen[1]?.[index] || ''}）
                        </span>
                      </div>
                    )) || <span className="text-gray-400">-</span>}
                  </div>
                </td>
                <td className="px-4 py-4 text-center text-xs bg-red-50 dark:bg-red-900/20">
                  <div className="space-y-1">
                    {cangGan[2]?.map((gan, index) => (
                      <div key={index} className="text-gray-600 dark:text-gray-400">
                        <span className={`font-bold ${getWuXingColor(getGanZhiWuXing(gan))}`}>
                          {gan}
                        </span>
                        <span className="text-purple-600 dark:text-purple-400">
                          （{cangGanShiShen[2]?.[index] || ''}）
                        </span>
                      </div>
                    )) || <span className="text-gray-400">-</span>}
                  </div>
                </td>
                <td className="px-4 py-4 text-center text-xs">
                  <div className="space-y-1">
                    {cangGan[3]?.map((gan, index) => (
                      <div key={index} className="text-gray-600 dark:text-gray-400">
                        <span className={`font-bold ${getWuXingColor(getGanZhiWuXing(gan))}`}>
                          {gan}
                        </span>
                        <span className="text-purple-600 dark:text-purple-400">
                          （{cangGanShiShen[3]?.[index] || ''}）
                        </span>
                      </div>
                    )) || <span className="text-gray-400">-</span>}
                  </div>
                </td>
              </tr>
              
              {/* 纳音行 */}
              <tr className="border-b border-gray-200 dark:border-gray-600">
                <td className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  纳音：
                </td>
                <td className="px-4 py-2 text-center text-sm text-orange-600 dark:text-orange-400 font-medium">
                  {baziData.nayin?.year || '未知'}
                </td>
                <td className="px-4 py-2 text-center text-sm text-orange-600 dark:text-orange-400 font-medium">
                  {baziData.nayin?.month || '未知'}
                </td>
                <td className="px-4 py-2 text-center text-sm text-orange-600 dark:text-orange-400 font-medium bg-red-50 dark:bg-red-900/20">
                  {baziData.nayin?.day || '未知'}
                </td>
                <td className="px-4 py-2 text-center text-sm text-orange-600 dark:text-orange-400 font-medium">
                  {baziData.nayin?.hour || '未知'}
                </td>
              </tr>
              
              {/* 神煞行 */}
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                  神煞：
                </td>
                <td className="px-4 py-3 text-center text-xs">
                  {baziData.shensha?.year && baziData.shensha.year.length > 0 ? (
                    <div className="space-y-1">
                      {baziData.shensha.year.map((sha, index) => (
                        <div key={index} className="block px-1 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-xs mx-auto w-fit">
                          {sha}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-400 text-xs">-</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center text-xs">
                  {baziData.shensha?.month && baziData.shensha.month.length > 0 ? (
                    <div className="space-y-1">
                      {baziData.shensha.month.map((sha, index) => (
                        <div key={index} className="block px-1 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-xs mx-auto w-fit">
                          {sha}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-400 text-xs">-</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center text-xs bg-red-50 dark:bg-red-900/20">
                  {baziData.shensha?.day && baziData.shensha.day.length > 0 ? (
                    <div className="space-y-1">
                      {baziData.shensha.day.map((sha, index) => (
                        <div key={index} className="block px-1 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-xs mx-auto w-fit">
                          {sha}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-400 text-xs">-</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center text-xs">
                  {baziData.shensha?.hour && baziData.shensha.hour.length > 0 ? (
                    <div className="space-y-1">
                      {baziData.shensha.hour.map((sha, index) => (
                        <div key={index} className="block px-1 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-xs mx-auto w-fit">
                          {sha}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-400 text-xs">-</span>
                  )}
                </td>
              </tr>
              
              {/* 评语行 */}
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                  评语：
                </td>
                <td className="px-4 py-3 text-center text-xs text-gray-600 dark:text-gray-400" colSpan="4">
                  <div className="text-left">
                    {baziData.chenggu ? (
                      <div>
                        <div className="mb-2">
                          <span className="font-medium text-blue-600 dark:text-blue-400">
                            称骨重量：{baziData.chenggu.weight}两
                          </span>
                        </div>
                        <div className="text-sm leading-relaxed">
                          {baziData.chenggu.comment}
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-500 italic">称骨评语计算中...</span>
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 五行分析 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 五行统计 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            五行统计
          </h4>
          <div className="space-y-2">
            {Object.entries(wuXing.count).map(([element, count]) => (
              <div key={element} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {element}
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getElementColor(element)}`}
                      style={{ width: `${Math.min(count * 20, 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium w-6 text-right">
                    {count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 格局分析 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            简要分析
          </h4>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>
              <span className="font-medium">日干：</span>
              {dayGan.gan}（{dayGan.wuXing}），{dayGan.strength}
            </p>
            <p>
              <span className="font-medium">五行缺失：</span>
              {Object.entries(wuXing.count)
                .filter(([_, count]) => count === 0)
                .map(([element]) => element)
                .join('、') || '无'}
            </p>
            <p>
              <span className="font-medium">五行偏旺：</span>
              {Object.entries(wuXing.count)
                .filter(([_, count]) => count >= 3)
                .map(([element]) => element)
                .join('、') || '无'}
            </p>
          </div>
        </div>
      </div>

      {/* 十神格局分析 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          十神格局分析
        </h4>
        <div className="space-y-3">
          {baziData.shishenPatterns && baziData.shishenPatterns.length > 0 ? (
            <div>
              {/* 主格局 */}
              {baziData.shishenPatternsDetail?.primary && (
                <div className="mb-3">
                  <span className="font-medium text-purple-600 dark:text-purple-400">
                    主格局：
                  </span>
                  <span className="ml-2 text-lg font-semibold text-purple-700 dark:text-purple-300">
                    {baziData.shishenPatternsDetail.primary}
                  </span>
                </div>
              )}
              
              {/* 次要格局 */}
              {baziData.shishenPatternsDetail?.secondary && baziData.shishenPatternsDetail.secondary.length > 0 && (
                <div className="mb-3">
                  <span className="font-medium text-purple-600 dark:text-purple-400">
                    次要格局：
                  </span>
                  <span className="ml-2">
                    {baziData.shishenPatternsDetail.secondary.join('、')}
                  </span>
                </div>
              )}
              <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {baziData.shishenPatterns.includes('食神制杀') && (
                  <p className="mb-2">• 食神制杀：食神能够制约七杀，化杀为权，主聪明有谋略，能够化解困难。</p>
                )}
                {baziData.shishenPatterns.includes('伤官配印') && (
                  <p className="mb-2">• 伤官配印：伤官得印星制约，主才华横溢，文采出众，利于学业和文职。</p>
                )}
                {baziData.shishenPatterns.includes('官印相生') && (
                  <p className="mb-2">• 官印相生：正官生正印，主贵气，利于仕途，品格高尚。</p>
                )}
                {baziData.shishenPatterns.includes('杀印相生') && (
                  <p className="mb-2">• 杀印相生：七杀生印星，主威权，能够掌握实权，有领导才能。</p>
                )}
                {baziData.shishenPatterns.includes('财多身弱') && (
                  <p className="mb-2">• 财多身弱：财星过多而日主偏弱，需要比劫帮身或印星生身。</p>
                )}
                {baziData.shishenPatterns.includes('比劫成群') && (
                  <p className="mb-2">• 比劫成群：比肩劫财较多，主个性强，适合合作创业。</p>
                )}
                {baziData.shishenPatterns.includes('食伤泄秀') && (
                  <p className="mb-2">• 食伤泄秀：食神伤官发挥才华，主聪明伶俐，多才多艺。</p>
                )}
                {baziData.shishenPatterns.includes('官杀混杂') && (
                  <p className="mb-2">• 官杀混杂：正官七杀同现，主心性不定，需要制化调和，宜专一发展。</p>
                )}
                {baziData.shishenPatterns.includes('平和格局') && (
                  <p className="mb-2">• 平和格局：八字平衡，各十神配置适中，主性格温和，人生较为平稳。</p>
                )}
              </div>
            </div>
          ) : (
            <span className="text-gray-500 italic">格局分析计算中...</span>
          )}
        </div>
      </div>

      {/* 性格分析 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          性格分析
        </h4>
        <div className="space-y-4">
          {baziData.personality ? (
            <div>
              {/* 核心性格 - 全宽显示 */}
              <div className="mb-4">
                <span className="font-medium text-indigo-600 dark:text-indigo-400">
                  核心性格：
                </span>
                <span className="ml-2 text-lg font-medium">
                  {baziData.personality.core}
                </span>
              </div>

              {/* 两列布局 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 左列 */}
                <div className="space-y-3">
                  {/* 性格特点 */}
                  {baziData.personality.traits.length > 0 && (
                    <div>
                      <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">性格特点：</h5>
                      <div className="space-y-1">
                        {baziData.personality.traits.map((trait, index) => (
                          <div key={index} className="flex items-start">
                            <span className="text-indigo-500 mr-2 text-xs">▸</span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {trait}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 优点 */}
                  {baziData.personality.strengths.length > 0 && (
                    <div>
                      <h5 className="font-medium text-green-600 dark:text-green-400 mb-2">性格优点：</h5>
                      <div className="space-y-1">
                        {baziData.personality.strengths.map((strength, index) => (
                          <div key={index} className="flex items-start">
                            <span className="text-green-500 mr-2 text-xs">✓</span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {strength}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 右列 */}
                <div className="space-y-3">
                  {/* 需要注意的方面 */}
                  {baziData.personality.weaknesses.length > 0 && (
                    <div>
                      <h5 className="font-medium text-orange-600 dark:text-orange-400 mb-2">需要注意：</h5>
                      <div className="space-y-1">
                        {baziData.personality.weaknesses.map((weakness, index) => (
                          <div key={index} className="flex items-start">
                            <span className="text-orange-500 mr-2 text-xs">!</span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {weakness}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 社交特点 */}
                  {baziData.personality.social && (
                    <div>
                      <h5 className="font-medium text-blue-600 dark:text-blue-400 mb-2">社交特点：</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {baziData.personality.social}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <span className="text-gray-500 italic">性格分析计算中...</span>
          )}
        </div>
      </div>

      {/* 一生运势分析 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          一生运势分析
        </h4>
        <div className="space-y-4">
          {baziData.lifeFortune && baziData.lifeFortune.phases ? (
            <div>
              {/* 整体运势 */}
              <div className="mb-4">
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  整体运势：
                </span>
                <span className="ml-2 text-lg font-medium">
                  {baziData.lifeFortune.fortune}
                </span>
              </div>

              {/* 整体特点 */}
              {baziData.lifeFortune.details && baziData.lifeFortune.details.length > 0 && (
                <div className="mb-4">
                  <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">运势特点：</h5>
                  <div className="space-y-2">
                    {baziData.lifeFortune.details.map((detail, index) => (
                      <div key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 分阶段运势 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 年柱运势（1-18岁） */}
                {baziData.lifeFortune.phases.year && (
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                    <h5 className="font-medium text-green-700 dark:text-green-400 mb-2">
                      {baziData.lifeFortune.phases.year.period}
                    </h5>
                    <p className="text-sm font-medium text-green-600 dark:text-green-300 mb-2">
                      {baziData.lifeFortune.phases.year.fortune}
                    </p>
                    <div className="space-y-1">
                      {baziData.lifeFortune.phases.year.details && baziData.lifeFortune.phases.year.details.map((detail, index) => (
                        <div key={index} className="flex items-start">
                          <span className="text-green-500 mr-1 text-xs">▸</span>
                          <span className="text-xs text-green-700 dark:text-green-300">
                            {detail}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 月柱运势（19-36岁） */}
                {baziData.lifeFortune.phases.month && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    <h5 className="font-medium text-blue-700 dark:text-blue-400 mb-2">
                      {baziData.lifeFortune.phases.month.period}
                    </h5>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-300 mb-2">
                      {baziData.lifeFortune.phases.month.fortune}
                    </p>
                    <div className="space-y-1">
                      {baziData.lifeFortune.phases.month.details && baziData.lifeFortune.phases.month.details.map((detail, index) => (
                        <div key={index} className="flex items-start">
                          <span className="text-blue-500 mr-1 text-xs">▸</span>
                          <span className="text-xs text-blue-700 dark:text-blue-300">
                            {detail}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 日柱运势（37-54岁） */}
                {baziData.lifeFortune.phases.day && (
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
                    <h5 className="font-medium text-orange-700 dark:text-orange-400 mb-2">
                      {baziData.lifeFortune.phases.day.period}
                    </h5>
                    <p className="text-sm font-medium text-orange-600 dark:text-orange-300 mb-2">
                      {baziData.lifeFortune.phases.day.fortune}
                    </p>
                    <div className="space-y-1">
                      {baziData.lifeFortune.phases.day.details && baziData.lifeFortune.phases.day.details.map((detail, index) => (
                        <div key={index} className="flex items-start">
                          <span className="text-orange-500 mr-1 text-xs">▸</span>
                          <span className="text-xs text-orange-700 dark:text-orange-300">
                            {detail}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 时柱运势（55岁以后） */}
                {baziData.lifeFortune.phases.hour && (
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                    <h5 className="font-medium text-purple-700 dark:text-purple-400 mb-2">
                      {baziData.lifeFortune.phases.hour.period}
                    </h5>
                    <p className="text-sm font-medium text-purple-600 dark:text-purple-300 mb-2">
                      {baziData.lifeFortune.phases.hour.fortune}
                    </p>
                    <div className="space-y-1">
                      {baziData.lifeFortune.phases.hour.details && baziData.lifeFortune.phases.hour.details.map((detail, index) => (
                        <div key={index} className="flex items-start">
                          <span className="text-purple-500 mr-1 text-xs">▸</span>
                          <span className="text-xs text-purple-700 dark:text-purple-300">
                            {detail}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <span className="text-gray-500 italic">一生运势分析计算中...</span>
          )}
        </div>
      </div>

      {/* 将来建议 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          人生建议
        </h4>
        <div className="space-y-4">
          {baziData.futureAdvice ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 事业建议 */}
              {baziData.futureAdvice.career.length > 0 && (
                <div>
                  <h5 className="font-medium text-green-600 dark:text-green-400 mb-2">
                    事业发展：
                  </h5>
                  <div className="space-y-1">
                    {baziData.futureAdvice.career.map((advice, index) => (
                      <div key={index} className="flex items-start">
                        <span className="text-green-500 mr-2 text-xs">▸</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {advice}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 健康建议 */}
              {baziData.futureAdvice.health.length > 0 && (
                <div>
                  <h5 className="font-medium text-red-600 dark:text-red-400 mb-2">
                    健康养生：
                  </h5>
                  <div className="space-y-1">
                    {baziData.futureAdvice.health.map((advice, index) => (
                      <div key={index} className="flex items-start">
                        <span className="text-red-500 mr-2 text-xs">▸</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {advice}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 感情建议 */}
              {baziData.futureAdvice.relationship.length > 0 && (
                <div>
                  <h5 className="font-medium text-pink-600 dark:text-pink-400 mb-2">
                    感情关系：
                  </h5>
                  <div className="space-y-1">
                    {baziData.futureAdvice.relationship.map((advice, index) => (
                      <div key={index} className="flex items-start">
                        <span className="text-pink-500 mr-2 text-xs">▸</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {advice}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 财运建议 */}
              {baziData.futureAdvice.wealth.length > 0 && (
                <div>
                  <h5 className="font-medium text-yellow-600 dark:text-yellow-400 mb-2">
                    财运理财：
                  </h5>
                  <div className="space-y-1">
                    {baziData.futureAdvice.wealth.map((advice, index) => (
                      <div key={index} className="flex items-start">
                        <span className="text-yellow-500 mr-2 text-xs">▸</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {advice}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <span className="text-gray-500 italic">人生建议生成中...</span>
          )}

          {/* 通用建议 */}
          {baziData.futureAdvice?.general.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <h5 className="font-medium text-purple-600 dark:text-purple-400 mb-2">
                通用建议：
              </h5>
              <div className="space-y-1">
                {baziData.futureAdvice.general.map((advice, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-purple-500 mr-2 text-xs">▸</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {advice}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 获取五行颜色
function getElementColor(element) {
  const colors = {
    '木': 'bg-green-500',
    '火': 'bg-red-500', 
    '土': 'bg-yellow-500',
    '金': 'bg-gray-500',
    '水': 'bg-blue-500'
  };
  return colors[element] || 'bg-gray-300';
}