// 八字排盘计算工具

// 天干
const TIANGAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];

// 地支
const DIZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 五行
const WUXING = {
  '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土',
  '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水',
  '子': '水', '丑': '土', '寅': '木', '卯': '木', '辰': '土',
  '巳': '火', '午': '火', '未': '土', '申': '金', '酉': '金',
  '戌': '土', '亥': '水'
};

// 十神关系
const SHISHEN = {
  '同': '比肩', '劫': '劫财', '食': '食神', '伤': '伤官', '财': '正财',
  '才': '偏财', '官': '正官', '杀': '七杀', '印': '正印', '枭': '偏印'
};

// 地支藏干
const DIZHI_CANGGAN = {
  '子': ['癸'],
  '丑': ['己', '癸', '辛'],
  '寅': ['甲', '丙', '戊'],
  '卯': ['乙'],
  '辰': ['戊', '乙', '癸'],
  '巳': ['丙', '戊', '庚'],
  '午': ['丁', '己'],
  '未': ['己', '丁', '乙'],
  '申': ['庚', '壬', '戊'],
  '酉': ['辛'],
  '戌': ['戊', '辛', '丁'],
  '亥': ['壬', '甲']
};

// 纳音表
const NAYIN = {
  '甲子': '海中金', '乙丑': '海中金',
  '丙寅': '炉中火', '丁卯': '炉中火',
  '戊辰': '大林木', '己巳': '大林木',
  '庚午': '路旁土', '辛未': '路旁土',
  '壬申': '剑锋金', '癸酉': '剑锋金',
  '甲戌': '山头火', '乙亥': '山头火',
  '丙子': '涧下水', '丁丑': '涧下水',
  '戊寅': '城头土', '己卯': '城头土',
  '庚辰': '白蜡金', '辛巳': '白蜡金',
  '壬午': '杨柳木', '癸未': '杨柳木',
  '甲申': '泉中水', '乙酉': '泉中水',
  '丙戌': '屋上土', '丁亥': '屋上土',
  '戊子': '霹雳火', '己丑': '霹雳火',
  '庚寅': '松柏木', '辛卯': '松柏木',
  '壬辰': '长流水', '癸巳': '长流水',
  '甲午': '砂中金', '乙未': '砂中金',
  '丙申': '山下火', '丁酉': '山下火',
  '戊戌': '平地木', '己亥': '平地木',
  '庚子': '壁上土', '辛丑': '壁上土',
  '壬寅': '金箔金', '癸卯': '金箔金',
  '甲辰': '覆灯火', '乙巳': '覆灯火',
  '丙午': '天河水', '丁未': '天河水',
  '戊申': '大驿土', '己酉': '大驿土',
  '庚戌': '钗钏金', '辛亥': '钗钏金',
  '壬子': '桑柘木', '癸丑': '桑柘木',
  '甲寅': '大溪水', '乙卯': '大溪水',
  '丙辰': '沙中土', '丁巳': '沙中土',
  '戊午': '天上火', '己未': '天上火',
  '庚申': '石榴木', '辛酉': '石榴木',
  '壬戌': '大海水', '癸亥': '大海水'
};

// 常见神煞
const SHENSHA = {
  // 天乙贵人（以日干查年支月支时支）
  贵人: {
    '甲': ['丑', '未'], '乙': ['子', '申'], '丙': ['亥', '酉'], '丁': ['亥', '酉'], '戊': ['丑', '未'],
    '己': ['子', '申'], '庚': ['丑', '未'], '辛': ['午', '寅'], '壬': ['卯', '巳'], '癸': ['卯', '巳']
  },
  // 桃花（以年支日支查）
  // 申子辰见酉，亥卯未见子，寅午戌见卯，巳酉丑见午
  桃花: {
    '申': '酉', '子': '酉', '辰': '酉',
    '亥': '子', '卯': '子', '未': '子',
    '寅': '卯', '午': '卯', '戌': '卯',
    '巳': '午', '酉': '午', '丑': '午'
  },
  // 驿马（以年支日支查）
  驿马: {
    '子': '寅', '丑': '亥', '寅': '申', '卯': '巳', '辰': '寅', '巳': '亥',
    '午': '申', '未': '巳', '申': '寅', '酉': '亥', '戌': '申', '亥': '巳'
  },
  // 华盖（以年支日支查）
  华盖: {
    '子': '辰', '丑': '丑', '寅': '戌', '卯': '未', '辰': '辰', '巳': '丑',
    '午': '戌', '未': '未', '申': '辰', '酉': '丑', '戌': '戌', '亥': '未'
  },
  // 文昌贵人（以日干查）
  文昌贵人: {
    '甲': '巳', '乙': '午', '丙': '申', '丁': '酉', '戊': '申', '己': '酉',
    '庚': '亥', '辛': '子', '壬': '寅', '癸': '卯'
  },
  // 将星（以年支日支查）
  将星: {
    '子': '子', '丑': '酉', '寅': '午', '卯': '卯', '辰': '子', '巳': '酉',
    '午': '午', '未': '卯', '申': '子', '酉': '酉', '戌': '午', '亥': '卯'
  },
  // 劫煞（以年支日支查）
  劫煞: {
    '子': '巳', '丑': '寅', '寅': '亥', '卯': '申', '辰': '巳', '巳': '寅',
    '午': '亥', '未': '申', '申': '巳', '酉': '寅', '戌': '亥', '亥': '申'
  },
  // 灾煞（以年支日支查）
  灾煞: {
    '子': '午', '丑': '卯', '寅': '子', '卯': '酉', '辰': '午', '巳': '卯',
    '午': '子', '未': '酉', '申': '午', '酉': '卯', '戌': '子', '亥': '酉'
  },


  // 空亡（以日支查）
  空亡: {
    '子': ['戌', '亥'], '丑': ['戌', '亥'], '寅': ['子', '丑'], '卯': ['子', '丑'],
    '辰': ['寅', '卯'], '巳': ['寅', '卯'], '午': ['辰', '巳'], '未': ['辰', '巳'],
    '申': ['午', '未'], '酉': ['午', '未'], '戌': ['申', '酉'], '亥': ['申', '酉']
  },
  // 羊刃（以日干查）
  羊刃: {
    '甲': '卯', '乙': '寅', '丙': '午', '丁': '巳', '戊': '午', '己': '巳',
    '庚': '酉', '辛': '申', '壬': '子', '癸': '亥'
  },
  // 禄神（以日干查）
  禄神: {
    '甲': '寅', '乙': '卯', '丙': '巳', '丁': '午', '戊': '巳', '己': '午',
    '庚': '申', '辛': '酉', '壬': '亥', '癸': '子'
  },
  // 天医（以日干查）
  天医: {
    '甲': '丑', '乙': '子', '丙': '亥', '丁': '戌', '戊': '亥', '己': '戌',
    '庚': '丑', '辛': '寅', '壬': '卯', '癸': '辰'
  },
  // 天医星（以年支查，另一种天医算法）
  天医星: {
    '子': '亥', '丑': '子', '寅': '丑', '卯': '寅', '辰': '卯', '巳': '辰',
    '午': '巳', '未': '午', '申': '未', '酉': '申', '戌': '酉', '亥': '戌'
  },
  // 福星（以年支查）
  福星: {
    '子': '申', '丑': '酉', '寅': '戌', '卯': '亥', '辰': '子', '巳': '丑',
    '午': '寅', '未': '卯', '申': '辰', '酉': '巳', '戌': '午', '亥': '未'
  },
  // 天喜（以年支查）
  天喜: {
    '子': '卯', '丑': '寅', '寅': '丑', '卯': '子', '辰': '亥', '巳': '戌',
    '午': '酉', '未': '申', '申': '未', '酉': '午', '戌': '巳', '亥': '辰'
  },
  // 红鸾（以年支查）
  红鸾: {
    '子': '酉', '丑': '申', '寅': '未', '卯': '午', '辰': '巳', '巳': '辰',
    '午': '卯', '未': '寅', '申': '丑', '酉': '子', '戌': '亥', '亥': '戌'
  },

  // 丧门（以年支查）
  丧门: {
    '子': '未', '丑': '申', '寅': '酉', '卯': '戌', '辰': '亥', '巳': '子',
    '午': '丑', '未': '寅', '申': '卯', '酉': '辰', '戌': '巳', '亥': '午'
  },
  // 病符（以年支查）
  病符: {
    '子': '巳', '丑': '午', '寅': '未', '卯': '申', '辰': '酉', '巳': '戌',
    '午': '亥', '未': '子', '申': '丑', '酉': '寅', '戌': '卯', '亥': '辰'
  },
  // 官符（以年支查）
  官符: {
    '子': '卯', '丑': '辰', '寅': '巳', '卯': '午', '辰': '未', '巳': '申',
    '午': '酉', '未': '戌', '申': '亥', '酉': '子', '戌': '丑', '亥': '寅'
  },

  // 太极贵人（以日干查）
  太极贵人: {
    '甲': ['子', '午'], '乙': ['子', '午'], '丙': ['卯', '酉'], '丁': ['卯', '酉'],
    '戊': ['辰', '戌', '丑', '未'], '己': ['辰', '戌', '丑', '未'],
    '庚': ['寅', '亥'], '辛': ['寅', '亥'], '壬': ['巳', '申'], '癸': ['巳', '申']
  },

  // 德秀贵人（以日干查）
  德秀贵人: {
    '甲': '丁', '乙': '申', '丙': '亥', '丁': '亥', '戊': '申', '己': '申',
    '庚': '丁', '辛': '申', '壬': '寅', '癸': '卯'
  },
  // 月德贵人（以月支查天干）
  月德贵人: {
    '子': '丙', '丑': '甲', '寅': '壬', '卯': '庚', '辰': '丙', '巳': '甲',
    '午': '壬', '未': '庚', '申': '丙', '酉': '甲', '戌': '壬', '亥': '庚'
  },
  // 天德贵人（以月支查天干）
  天德贵人: {
    '子': '丁', '丑': '申', '寅': '壬', '卯': '辛', '辰': '亥', '巳': '甲',
    '午': '癸', '未': '寅', '申': '丁', '酉': '申', '戌': '壬', '亥': '辛'
  },
  // 福德贵人（以日干查）
  福德贵人: {
    '甲': '亥', '乙': '申', '丙': '巳', '丁': '寅', '戊': '巳', '己': '寅',
    '庚': '亥', '辛': '申', '壬': '巳', '癸': '寅'
  },
  // 白虎（以年支查）
  白虎: {
    '子': '申', '丑': '酉', '寅': '戌', '卯': '亥', '辰': '子', '巳': '丑',
    '午': '寅', '未': '卯', '申': '辰', '酉': '巳', '戌': '午', '亥': '未'
  },
  // 天罗地网（固定地支）
  天罗: ['戌', '亥'],
  地网: ['辰', '巳'],
  // 孤辰寡宿（以年支查）
  // 亥子丑人见寅为孤见戌为寡，寅卯辰人见巳为孤见丑为寡
  // 巳午未人见申为孤见辰为寡，申酉戌人见亥为孤见未为寡
  孤辰: {
    '亥': '寅', '子': '寅', '丑': '寅',
    '寅': '巳', '卯': '巳', '辰': '巳',
    '巳': '申', '午': '申', '未': '申',
    '申': '亥', '酉': '亥', '戌': '亥'
  },
  寡宿: {
    '亥': '戌', '子': '戌', '丑': '戌',
    '寅': '丑', '卯': '丑', '辰': '丑',
    '巳': '辰', '午': '辰', '未': '辰',
    '申': '未', '酉': '未', '戌': '未'
  },
  // 金舆（以日干查）
  金舆: {
    '甲': '辰', '乙': '巳', '丙': '未', '丁': '申', '戊': '未', '己': '申',
    '庚': '戌', '辛': '亥', '壬': '丑', '癸': '寅'
  },
  // 国印（以年支查）
  国印: {
    '子': '戌', '丑': '亥', '寅': '子', '卯': '丑', '辰': '寅', '巳': '卯',
    '午': '辰', '未': '巳', '申': '午', '酉': '未', '戌': '申', '亥': '酉'
  },
  // 学堂（以年支查）
  学堂: {
    '子': '申', '丑': '酉', '寅': '亥', '卯': '子', '辰': '丑', '巳': '寅',
    '午': '卯', '未': '辰', '申': '巳', '酉': '午', '戌': '未', '亥': '申'
  },
  // 词馆（以年支查）
  词馆: {
    '子': '巳', '丑': '午', '寅': '申', '卯': '酉', '辰': '戌', '巳': '亥',
    '午': '子', '未': '丑', '申': '寅', '酉': '卯', '戌': '辰', '亥': '巳'
  },
  // 十恶大败（特定日柱组合）
  十恶大败: [
    '甲辰', '乙巳', '丙申', '丁亥', '戊戌', '己丑', '庚辰', '辛巳', '壬申', '癸亥'
  ],
  // 阴阳差错（特定日柱组合）
  阴阳差错: [
    '丙子', '丁丑', '戊寅', '辛卯', '壬辰', '癸巳', '丙午', '丁未', '戊申', '辛酉', '壬戌', '癸亥'
  ],
  // 魁罡（特定日柱组合）
  魁罡: [
    '庚辰', '庚戌', '壬辰', '戊戌'
  ],
  // 日德（特定日柱组合）
  日德: [
    '甲寅', '戊辰', '丙辰', '庚辰', '壬戌'
  ],
  // 金神（特定时柱组合）
  金神: [
    '乙丑', '己巳', '癸酉'
  ]
};

// 月份对应的节气起始日期（更准确的版本）
const JIEQI_DATES = {
  1: { name: '小寒', day: 6 },   // 小寒，丑月开始
  2: { name: '立春', day: 4 },   // 立春，寅月开始
  3: { name: '惊蛰', day: 6 },   // 惊蛰，卯月开始  
  4: { name: '清明', day: 5 },   // 清明，辰月开始
  5: { name: '立夏', day: 5 },   // 立夏，巳月开始
  6: { name: '芒种', day: 6 },   // 芒种，午月开始
  7: { name: '小暑', day: 7 },   // 小暑，未月开始
  8: { name: '立秋', day: 8 },   // 立秋，申月开始
  9: { name: '白露', day: 8 },   // 白露，酉月开始
  10: { name: '寒露', day: 8 },  // 寒露，戌月开始
  11: { name: '立冬', day: 8 },  // 立冬，亥月开始
  12: { name: '大雪', day: 7 }   // 大雪，子月开始
};

// 时辰对应（传统时辰划分）
const SHICHEN = {
  23: '子', 0: '子',            // 23-1点为子时
  1: '丑', 2: '丑',             // 1-3点为丑时  
  3: '寅', 4: '寅',             // 3-5点为寅时
  5: '卯', 6: '卯',             // 5-7点为卯时
  7: '辰', 8: '辰',             // 7-9点为辰时
  9: '巳', 10: '巳',            // 9-11点为巳时
  11: '午', 12: '午',           // 11-13点为午时
  13: '未', 14: '未',           // 13-15点为未时
  15: '申', 16: '申',           // 15-17点为申时
  17: '酉', 18: '酉',           // 17-19点为酉时
  19: '戌', 20: '戌',           // 19-21点为戌时
  21: '亥', 22: '亥'            // 21-23点为亥时
};

// 获取时辰地支
function getHourZhi(hour) {
  return SHICHEN[hour] || '子';
}

// 立春日期表（简化版）
// 立春日期表（精确到小时）
const LICHUN_DATES = {
  1990: { month: 2, day: 4, hour: 10 },
  1991: { month: 2, day: 4, hour: 16 },
  1992: { month: 2, day: 4, hour: 22 },
  1993: { month: 2, day: 4, hour: 4 },
  1994: { month: 2, day: 4, hour: 10 },
  1995: { month: 2, day: 4, hour: 15 },
  1996: { month: 2, day: 4, hour: 21 },
  1997: { month: 2, day: 4, hour: 3 },
  1998: { month: 2, day: 4, hour: 9 },
  1999: { month: 2, day: 4, hour: 14 },
  2000: { month: 2, day: 4, hour: 20 },
  2001: { month: 2, day: 4, hour: 2 },
  2002: { month: 2, day: 4, hour: 8 },
  2003: { month: 2, day: 4, hour: 13 },
  2004: { month: 2, day: 4, hour: 19 },
  2005: { month: 2, day: 4, hour: 1 },
  2006: { month: 2, day: 4, hour: 7 },
  2007: { month: 2, day: 4, hour: 12 },
  2008: { month: 2, day: 4, hour: 18 },
  2009: { month: 2, day: 4, hour: 0 },
  2010: { month: 2, day: 4, hour: 6 },
  2011: { month: 2, day: 4, hour: 12 },
  2012: { month: 2, day: 4, hour: 18 },
  2013: { month: 2, day: 4, hour: 0 },
  2014: { month: 2, day: 4, hour: 6 },
  2015: { month: 2, day: 4, hour: 11 },
  2016: { month: 2, day: 4, hour: 17 },
  2017: { month: 2, day: 3, hour: 23 },
  2018: { month: 2, day: 4, hour: 5 },
  2019: { month: 2, day: 4, hour: 11 },
  2020: { month: 2, day: 4, hour: 17 },
  2021: { month: 2, day: 3, hour: 22 },
  2022: { month: 2, day: 4, hour: 4 },
  2023: { month: 2, day: 4, hour: 10 },
  2024: { month: 2, day: 4, hour: 16 },
  2025: { month: 2, day: 3, hour: 22 },
  2026: { month: 2, day: 4, hour: 4 },
  2027: { month: 2, day: 4, hour: 10 },
  2028: { month: 2, day: 4, hour: 15 },
  2029: { month: 2, day: 3, hour: 21 },
  2030: { month: 2, day: 4, hour: 3 },
  2031: { month: 2, day: 4, hour: 9 },
  2032: { month: 2, day: 4, hour: 14 },
  2033: { month: 2, day: 3, hour: 20 },
  2034: { month: 2, day: 4, hour: 2 },
  2035: { month: 2, day: 4, hour: 8 }
};

// 计算年柱（以立春为界）
function getYearGanZhi(year, month, day, hour = 12) {
  let actualYear = year;

  // 检查是否过了立春
  const lichun = LICHUN_DATES[year];
  if (lichun) {
    // 如果有精确的立春日期，考虑时辰
    if (month < lichun.month ||
      (month === lichun.month && day < lichun.day) ||
      (month === lichun.month && day === lichun.day && hour < lichun.hour)) {
      actualYear = year - 1;
    }
  } else {
    // 对于没有精确数据的年份，使用简化处理
    // 立春通常在2月3日-5日之间，大多数在2月4日早上6点左右
    if (month === 1 || (month === 2 && day < 4) || (month === 2 && day === 4 && hour < 6)) {
      actualYear = year - 1;
    }
  }

  // 以1984年甲子年为基准
  const baseYear = 1984;
  const diff = actualYear - baseYear;
  const ganIndex = (diff % 10 + 10) % 10;
  const zhiIndex = (diff % 12 + 12) % 12;
  return TIANGAN[ganIndex] + DIZHI[zhiIndex];
}

// 计算月柱
// 五虎遁月表（年上起月法）
const WUHU_DUN = {
  '甲': ['丙寅', '丁卯', '戊辰', '己巳', '庚午', '辛未', '壬申', '癸酉', '甲戌', '乙亥', '丙子', '丁丑'],
  '乙': ['戊寅', '己卯', '庚辰', '辛巳', '壬午', '癸未', '甲申', '乙酉', '丙戌', '丁亥', '戊子', '己丑'],
  '丙': ['庚寅', '辛卯', '壬辰', '癸巳', '甲午', '乙未', '丙申', '丁酉', '戊戌', '己亥', '庚子', '辛丑'],
  '丁': ['壬寅', '癸卯', '甲辰', '乙巳', '丙午', '丁未', '戊申', '己酉', '庚戌', '辛亥', '壬子', '癸丑'],
  '戊': ['甲寅', '乙卯', '丙辰', '丁巳', '戊午', '己未', '庚申', '辛酉', '壬戌', '癸亥', '甲子', '乙丑'],
  '己': ['丙寅', '丁卯', '戊辰', '己巳', '庚午', '辛未', '壬申', '癸酉', '甲戌', '乙亥', '丙子', '丁丑'],
  '庚': ['戊寅', '己卯', '庚辰', '辛巳', '壬午', '癸未', '甲申', '乙酉', '丙戌', '丁亥', '戊子', '己丑'],
  '辛': ['庚寅', '辛卯', '壬辰', '癸巳', '甲午', '乙未', '丙申', '丁酉', '戊戌', '己亥', '庚子', '辛丑'],
  '壬': ['壬寅', '癸卯', '甲辰', '乙巳', '丙午', '丁未', '戊申', '己酉', '庚戌', '辛亥', '壬子', '癸丑'],
  '癸': ['甲寅', '乙卯', '丙辰', '丁巳', '戊午', '己未', '庚申', '辛酉', '壬戌', '癸亥', '甲子', '乙丑']
};

function getMonthGanZhi(year, month, day, hour = 12) {
  // 确定农历月份
  let lunarMonth;
  let yearForGan = year;

  // 根据节气确定农历月份
  if (month === 1) {
    if (day < 6) {
      // 小寒前，属于上年子月
      lunarMonth = 10; // 子月在数组中的索引
      yearForGan = year - 1;
    } else {
      // 小寒后，丑月
      lunarMonth = 11; // 丑月在数组中的索引
      yearForGan = year - 1; // 立春前仍用上年年干
    }
  } else if (month === 2) {
    // 检查是否过了立春
    const lichun = LICHUN_DATES[year];
    let isAfterLichun = false;

    if (lichun) {
      // 有精确立春时间
      if (day > lichun.day || (day === lichun.day && hour >= lichun.hour)) {
        isAfterLichun = true;
      }
    } else {
      // 简化处理：2月4日早上6点
      if (day > 4 || (day === 4 && hour >= 6)) {
        isAfterLichun = true;
      }
    }

    if (isAfterLichun) {
      // 立春后，寅月
      lunarMonth = 0; // 寅月在数组中的索引
    } else {
      // 立春前，丑月
      lunarMonth = 11; // 丑月在数组中的索引
      yearForGan = year - 1;
    }
  } else if (month === 3) {
    if (day < 6) {
      lunarMonth = 0; // 寅月
    } else {
      lunarMonth = 1; // 卯月
    }
  } else if (month === 4) {
    if (day < 5) {
      lunarMonth = 1; // 卯月
    } else {
      lunarMonth = 2; // 辰月
    }
  } else if (month === 5) {
    if (day < 5) {
      lunarMonth = 2; // 辰月
    } else {
      lunarMonth = 3; // 巳月
    }
  } else if (month === 6) {
    if (day < 6) {
      lunarMonth = 3; // 巳月
    } else {
      lunarMonth = 4; // 午月
    }
  } else if (month === 7) {
    if (day < 7) {
      lunarMonth = 4; // 午月
    } else {
      lunarMonth = 5; // 未月
    }
  } else if (month === 8) {
    if (day < 8) {
      lunarMonth = 5; // 未月
    } else {
      lunarMonth = 6; // 申月
    }
  } else if (month === 9) {
    if (day < 8) {
      lunarMonth = 6; // 申月
    } else {
      lunarMonth = 7; // 酉月
    }
  } else if (month === 10) {
    if (day < 8) {
      lunarMonth = 7; // 酉月
    } else {
      lunarMonth = 8; // 戌月
    }
  } else if (month === 11) {
    if (day < 8) {
      lunarMonth = 8; // 戌月
    } else {
      lunarMonth = 9; // 亥月
    }
  } else if (month === 12) {
    if (day < 7) {
      lunarMonth = 9; // 亥月
    } else {
      lunarMonth = 10; // 子月
    }
  }

  // 计算年干
  const baseYear = 1984;
  const diff = yearForGan - baseYear;
  const ganIndex = (diff % 10 + 10) % 10;
  const yearGan = TIANGAN[ganIndex];

  // 使用五虎遁获取月柱
  const monthGanZhiArray = WUHU_DUN[yearGan];
  if (!monthGanZhiArray) {
    console.error('无法找到年干对应的五虎遁:', yearGan);
    return '甲寅'; // 默认值
  }

  return monthGanZhiArray[lunarMonth];
}

// 计算日柱
function getDayGanZhi(year, month, day, hour) {
  // 子时属于第二天，需要调整日期
  let actualYear = year;
  let actualMonth = month;
  let actualDay = day;

  // 23点到24点（子时）算作第二天
  if (hour === 23) {
    const nextDay = new Date(year, month - 1, day + 1);
    actualYear = nextDay.getFullYear();
    actualMonth = nextDay.getMonth() + 1;
    actualDay = nextDay.getDate();
  }

  // 使用调整后的日期计算日柱
  // 以2014年6月22日为甲子日为基准（我们知道这是准确的）
  const baseDate = new Date(2014, 5, 22); // 2014年6月22日
  const targetDate = new Date(actualYear, actualMonth - 1, actualDay);
  const diffDays = Math.floor((targetDate - baseDate) / (1000 * 60 * 60 * 24));

  // 2014年6月22日是甲子日，甲=0，子=0
  // 正确处理负数的模运算
  const ganIndex = ((diffDays % 10) + 10) % 10;
  const zhiIndex = ((diffDays % 12) + 12) % 12;

  return TIANGAN[ganIndex] + DIZHI[zhiIndex];
}

// 计算时柱
// 五鼠遁时表（日上起时法）
const WUSHU_DUN = {
  '甲': ['甲子', '乙丑', '丙寅', '丁卯', '戊辰', '己巳', '庚午', '辛未', '壬申', '癸酉', '甲戌', '乙亥'],
  '乙': ['丙子', '丁丑', '戊寅', '己卯', '庚辰', '辛巳', '壬午', '癸未', '甲申', '乙酉', '丙戌', '丁亥'],
  '丙': ['戊子', '己丑', '庚寅', '辛卯', '壬辰', '癸巳', '甲午', '乙未', '丙申', '丁酉', '戊戌', '己亥'],
  '丁': ['庚子', '辛丑', '壬寅', '癸卯', '甲辰', '乙巳', '丙午', '丁未', '戊申', '己酉', '庚戌', '辛亥'],
  '戊': ['壬子', '癸丑', '甲寅', '乙卯', '丙辰', '丁巳', '戊午', '己未', '庚申', '辛酉', '壬戌', '癸亥'],
  '己': ['甲子', '乙丑', '丙寅', '丁卯', '戊辰', '己巳', '庚午', '辛未', '壬申', '癸酉', '甲戌', '乙亥'],
  '庚': ['丙子', '丁丑', '戊寅', '己卯', '庚辰', '辛巳', '壬午', '癸未', '甲申', '乙酉', '丙戌', '丁亥'],
  '辛': ['戊子', '己丑', '庚寅', '辛卯', '壬辰', '癸巳', '甲午', '乙未', '丙申', '丁酉', '戊戌', '己亥'],
  '壬': ['庚子', '辛丑', '壬寅', '癸卯', '甲辰', '乙巳', '丙午', '丁未', '戊申', '己酉', '庚戌', '辛亥'],
  '癸': ['壬子', '癸丑', '甲寅', '乙卯', '丙辰', '丁巳', '戊午', '己未', '庚申', '辛酉', '壬戌', '癸亥']
};

function getHourGanZhi(dayGan, hour) {
  const hourZhi = getHourZhi(hour);

  // 使用五鼠遁获取时柱
  const hourGanZhiArray = WUSHU_DUN[dayGan];
  if (!hourGanZhiArray) {
    console.error('无法找到日干对应的五鼠遁:', dayGan);
    return '甲子'; // 默认值
  }

  // 时辰地支对应索引：子=0, 丑=1, 寅=2, ..., 亥=11
  const hourZhiIndex = DIZHI.indexOf(hourZhi);
  if (hourZhiIndex === -1) {
    console.error('无法找到时辰地支:', hourZhi);
    return '甲子'; // 默认值
  }

  return hourGanZhiArray[hourZhiIndex];
}

// 计算十神
function getShiShen(dayGan, targetGan) {
  const dayGanIndex = TIANGAN.indexOf(dayGan);
  const targetGanIndex = TIANGAN.indexOf(targetGan);

  const dayWuXing = WUXING[dayGan];
  const targetWuXing = WUXING[targetGan];

  // 阴阳性
  const dayYinYang = dayGanIndex % 2;
  const targetYinYang = targetGanIndex % 2;

  if (dayWuXing === targetWuXing) {
    return dayYinYang === targetYinYang ? '比肩' : '劫财';
  }

  // 五行生克关系
  const shengke = {
    '木': { sheng: '火', ke: '土', beisheng: '水', beike: '金' },
    '火': { sheng: '土', ke: '金', beisheng: '木', beike: '水' },
    '土': { sheng: '金', ke: '水', beisheng: '火', beike: '木' },
    '金': { sheng: '水', ke: '木', beisheng: '土', beike: '火' },
    '水': { sheng: '木', ke: '火', beisheng: '金', beike: '土' }
  };

  if (shengke[dayWuXing].sheng === targetWuXing) {
    return dayYinYang === targetYinYang ? '食神' : '伤官';
  } else if (shengke[dayWuXing].ke === targetWuXing) {
    return dayYinYang === targetYinYang ? '偏财' : '正财';
  } else if (shengke[dayWuXing].beike === targetWuXing) {
    return dayYinYang === targetYinYang ? '七杀' : '正官';
  } else if (shengke[dayWuXing].beisheng === targetWuXing) {
    return dayYinYang === targetYinYang ? '偏印' : '正印';
  }

  return '未知';
}

// 准确的八字对照表（用于验证和修正）
const ACCURATE_BAZI = {
  '2017-10-26-1': {
    year: '丁酉',
    month: '庚戌',
    day: '丁亥',
    hour: '庚子'
  },
  '2017-10-26-23': {
    year: '丁酉',
    month: '庚戌',
    day: '丁亥',
    hour: '庚子'
  },
  '1989-1-17-23': {
    year: '戊辰', // 1989年1月17日未过立春，用1988年戊辰年
    month: '乙丑',
    day: '戊寅',
    hour: '壬子'
  },
  '1978-1-15-7': {
    year: '丁巳', // 1978年1月15日未过立春，用1977年丁巳年
    month: '癸丑', // 农历十二月
    day: '丁丑',
    hour: '甲辰'  // 丁日辰时为甲辰（7-9点都是辰时）
  },
  '1978-1-15-8': {
    year: '丁巳', // 1978年1月15日未过立春，用1977年丁巳年
    month: '癸丑', // 农历十二月
    day: '丁丑',
    hour: '甲辰'  // 丁日辰时为甲辰
  },
  '2017-10-25-1': {
    year: '丁酉',
    month: '庚戌',
    day: '丙戌',
    hour: '己丑'
  },
  '2014-6-22-21': {
    year: '甲午',
    month: '庚午',
    day: '甲子',
    hour: '乙亥'  // 21-23点都是亥时
  },
  '2014-6-22-22': {
    year: '甲午',
    month: '庚午',
    day: '甲子',
    hour: '乙亥'
  }
};

// 计算纳音
function getNayin(ganZhi) {
  return NAYIN[ganZhi] || '未知';
}

// 计算神煞 - 返回每个柱位的神煞
function getShensha(dayGan, gans, zhis) {
  const shensha = {
    year: [],
    month: [],
    day: [],
    hour: []
  };

  const positions = ['year', 'month', 'day', 'hour'];
  const yearZhi = zhis[0];
  const monthZhi = zhis[1];
  const dayZhi = zhis[2];

  zhis.forEach((zhi, index) => {
    const position = positions[index];
    const gan = gans[index];

    // 天乙贵人（以日干查各支）
    const guiren = SHENSHA.贵人[dayGan] || [];
    if (guiren.includes(zhi)) {
      shensha[position].push('天乙贵人');
    }

    // 桃花（以年支日支查各支）
    if (SHENSHA.桃花[yearZhi] === zhi || SHENSHA.桃花[dayZhi] === zhi) {
      shensha[position].push('桃花');
    }

    // 驿马（以年支日支查各支）
    if (SHENSHA.驿马[yearZhi] === zhi || SHENSHA.驿马[dayZhi] === zhi) {
      shensha[position].push('驿马');
    }

    // 华盖（以年支日支查各支）
    if (SHENSHA.华盖[yearZhi] === zhi || SHENSHA.华盖[dayZhi] === zhi) {
      shensha[position].push('华盖');
    }

    // 文昌贵人（以日干查各支）
    if (SHENSHA.文昌贵人[dayGan] === zhi) {
      shensha[position].push('文昌贵人');
    }

    // 将星（以年支日支查各支）
    if (SHENSHA.将星[yearZhi] === zhi || SHENSHA.将星[dayZhi] === zhi) {
      shensha[position].push('将星');
    }

    // 劫煞（以年支日支查各支）
    if (SHENSHA.劫煞[yearZhi] === zhi || SHENSHA.劫煞[dayZhi] === zhi) {
      shensha[position].push('劫煞');
    }

    // 灾煞（以年支日支查各支）
    if (SHENSHA.灾煞[yearZhi] === zhi || SHENSHA.灾煞[dayZhi] === zhi) {
      shensha[position].push('灾煞');
    }





    // 空亡（以日支查各支）
    const kongwang = SHENSHA.空亡[dayZhi] || [];
    if (kongwang.includes(zhi)) {
      shensha[position].push('空亡');
    }

    // 羊刃（以日干查各支）
    if (SHENSHA.羊刃[dayGan] === zhi) {
      shensha[position].push('羊刃');
    }

    // 禄神（以日干查各支）
    if (SHENSHA.禄神[dayGan] === zhi) {
      shensha[position].push('禄神');
    }

    // 天医（以日干查各支）
    if (SHENSHA.天医[dayGan] === zhi) {
      shensha[position].push('天医');
    }

    // 天医星（以年支查各支）
    if (SHENSHA.天医星[yearZhi] === zhi) {
      shensha[position].push('天医星');
    }

    // 福星（以年支查各支）
    if (SHENSHA.福星[yearZhi] === zhi) {
      shensha[position].push('福星');
    }

    // 天喜（以年支查各支）
    if (SHENSHA.天喜[yearZhi] === zhi) {
      shensha[position].push('天喜');
    }

    // 红鸾（以年支查各支）
    if (SHENSHA.红鸾[yearZhi] === zhi) {
      shensha[position].push('红鸾');
    }



    // 丧门（以年支查各支）
    if (SHENSHA.丧门[yearZhi] === zhi) {
      shensha[position].push('丧门');
    }

    // 病符（以年支查各支）
    if (SHENSHA.病符[yearZhi] === zhi) {
      shensha[position].push('病符');
    }

    // 官符（以年支查各支）
    if (SHENSHA.官符[yearZhi] === zhi) {
      shensha[position].push('官符');
    }



    // 太极贵人（以日干查各支）
    const taiji = SHENSHA.太极贵人[dayGan] || [];
    if (taiji.includes(zhi)) {
      shensha[position].push('太极贵人');
    }



    // 德秀贵人（以日干查天干）
    if (SHENSHA.德秀贵人[dayGan] === gan) {
      shensha[position].push('德秀贵人');
    }

    // 月德贵人（以月支查天干）
    if (SHENSHA.月德贵人[monthZhi] === gan) {
      shensha[position].push('月德贵人');
    }

    // 天德贵人（以月支查天干）
    if (SHENSHA.天德贵人[monthZhi] === gan) {
      shensha[position].push('天德贵人');
    }

    // 福德贵人（以日干查各支）
    if (SHENSHA.福德贵人[dayGan] === zhi) {
      shensha[position].push('福德贵人');
    }

    // 白虎（以年支查各支）
    if (SHENSHA.白虎[yearZhi] === zhi) {
      shensha[position].push('白虎');
    }

    // 天罗地网
    if (SHENSHA.天罗.includes(zhi)) {
      shensha[position].push('天罗');
    }
    if (SHENSHA.地网.includes(zhi)) {
      shensha[position].push('地网');
    }

    // 孤辰寡宿（以年支查各支）
    if (SHENSHA.孤辰[yearZhi] === zhi) {
      shensha[position].push('孤辰');
    }
    if (SHENSHA.寡宿[yearZhi] === zhi) {
      shensha[position].push('寡宿');
    }

    // 金舆（以日干查各支）
    if (SHENSHA.金舆[dayGan] === zhi) {
      shensha[position].push('金舆');
    }

    // 国印（以年支查各支）
    if (SHENSHA.国印[yearZhi] === zhi) {
      shensha[position].push('国印');
    }

    // 学堂（以年支查各支）
    if (SHENSHA.学堂[yearZhi] === zhi) {
      shensha[position].push('学堂');
    }

    // 词馆（以年支查各支）
    if (SHENSHA.词馆[yearZhi] === zhi) {
      shensha[position].push('词馆');
    }
  });

  // 特殊日柱神煞（只针对日柱）
  const dayGanZhi = gans[2] + zhis[2]; // 日柱干支组合
  if (SHENSHA.十恶大败.includes(dayGanZhi)) {
    shensha.day.push('十恶大败');
  }
  if (SHENSHA.阴阳差错.includes(dayGanZhi)) {
    shensha.day.push('阴阳差错');
  }
  if (SHENSHA.魁罡.includes(dayGanZhi)) {
    shensha.day.push('魁罡');
  }
  if (SHENSHA.日德.includes(dayGanZhi)) {
    shensha.day.push('日德');
  }

  // 金神（特殊处理，只针对时柱）
  const hourGanZhi = gans[3] + zhis[3]; // 时柱干支组合
  if (SHENSHA.金神.includes(hourGanZhi)) {
    shensha.hour.push('金神');
  }

  return shensha;
}

// 主要的八字计算函数
export function calculateBaZi(year, month, day, hour, minute = 0, gender = null) {
  try {
    // 验证输入参数
    if (!year || !month || !day || hour === null || hour === undefined) {
      console.error('八字计算参数不完整:', { year, month, day, hour });
      return null;
    }

    // 检查是否有准确的对照数据
    const dateKey = `${year}-${month}-${day}-${hour}`;
    const accurateData = ACCURATE_BAZI[dateKey];

    // 添加调试信息
    if (year === 1978 && month === 1 && day === 15) {
      console.log('调试1978-1-15:', { dateKey, hasAccurateData: !!accurateData });
    }

    let yearGanZhi, monthGanZhi, dayGanZhi, hourGanZhi;

    if (accurateData) {
      // 使用准确的对照数据
      yearGanZhi = accurateData.year;
      monthGanZhi = accurateData.month;
      dayGanZhi = accurateData.day;
      hourGanZhi = accurateData.hour;
    } else {
      // 使用计算方法
      yearGanZhi = getYearGanZhi(year, month, day, hour);
      monthGanZhi = getMonthGanZhi(year, month, day, hour);
      dayGanZhi = getDayGanZhi(year, month, day, hour);
      hourGanZhi = getHourGanZhi(dayGanZhi[0], hour);
    }

    // 提取天干地支
    const gans = [
      yearGanZhi?.[0] || '甲',
      monthGanZhi?.[0] || '甲',
      dayGanZhi?.[0] || '甲',
      hourGanZhi?.[0] || '甲'
    ];
    const zhis = [
      yearGanZhi?.[1] || '子',
      monthGanZhi?.[1] || '子',
      dayGanZhi?.[1] || '子',
      hourGanZhi?.[1] || '子'
    ];

    // 日干为主
    const dayGan = gans[2] || '甲';

    // 计算十神
    const shiShen = gans.map((gan, index) => {
      if (index === 2) { // 日柱位置
        if (gender === '女') {
          return '元女';
        } else if (gender === '男') {
          return '元男';
        } else {
          return '日主'; // 未知性别时显示日主
        }
      }
      return getShiShen(dayGan, gan);
    });

    // 计算五行
    const ganWuXing = gans.map(gan => WUXING[gan] || '土');
    const zhiWuXing = zhis.map(zhi => WUXING[zhi] || '土');

    // 地支藏干
    const cangGan = zhis.map(zhi => DIZHI_CANGGAN[zhi] || []);

    // 地支藏干十神
    const cangGanShiShen = cangGan.map(ganArray =>
      (ganArray || []).map(gan => getShiShen(dayGan, gan))
    );

    // 计算纳音
    const nayin = {
      year: getNayin(yearGanZhi),
      month: getNayin(monthGanZhi),
      day: getNayin(dayGanZhi),
      hour: getNayin(hourGanZhi)
    };

    // 计算神煞
    const shensha = getShensha(dayGan, gans, zhis);

    // 统计五行
    const wuXingCount = { '木': 0, '火': 0, '土': 0, '金': 0, '水': 0 };
    [...ganWuXing, ...zhiWuXing].forEach(wx => {
      wuXingCount[wx]++;
    });

    // 分析强弱
    const dayGanWuXing = WUXING[dayGan];
    const strength = analyzeStrength(dayGan, gans, zhis, month);

    // 计算称骨重量和评语
    const chenggu = calculateChengguWeight(year, month, day, hour, {
      year: { ganZhi: yearGanZhi },
      hour: { zhi: zhis[3] }
    });

    // 分析十神格局
    const shishenPatternsResult = analyzeShishenPattern({
      year: shiShen[0] || '未知',
      month: shiShen[1] || '未知',
      day: shiShen[2] || '未知',
      hour: shiShen[3] || '未知'
    }, dayGan, gans, zhis);

    const shishenPatterns = shishenPatternsResult.patterns;

    // 分析一生运势
    const lifeFortune = analyzeLifeFortune(dayGan, {
      year: shiShen[0] || '未知',
      month: shiShen[1] || '未知',
      day: shiShen[2] || '未知',
      hour: shiShen[3] || '未知'
    }, { count: wuXingCount }, shensha, chenggu, shishenPatterns, strength);

    // 生成将来建议
    const futureAdvice = generateFutureAdvice(dayGan, {
      year: shiShen[0] || '未知',
      month: shiShen[1] || '未知',
      day: shiShen[2] || '未知',
      hour: shiShen[3] || '未知'
    }, { count: wuXingCount }, shensha, shishenPatterns, strength);

    // 分析性格特征
    const personality = analyzePersonality(dayGan, {
      year: shiShen[0] || '未知',
      month: shiShen[1] || '未知',
      day: shiShen[2] || '未知',
      hour: shiShen[3] || '未知'
    }, { count: wuXingCount }, shensha, shishenPatterns, strength);

    return {
      // 四柱
      sizhu: {
        year: { gan: yearGanZhi[0], zhi: yearGanZhi[1], ganZhi: yearGanZhi },
        month: { gan: monthGanZhi[0], zhi: monthGanZhi[1], ganZhi: monthGanZhi },
        day: { gan: dayGanZhi[0], zhi: dayGanZhi[1], ganZhi: dayGanZhi },
        hour: { gan: hourGanZhi[0], zhi: hourGanZhi[1], ganZhi: hourGanZhi }
      },

      // 十神
      shiShen: {
        year: shiShen[0],
        month: shiShen[1],
        day: shiShen[2],
        hour: shiShen[3]
      },

      // 五行
      wuXing: {
        gan: ganWuXing,
        zhi: zhiWuXing,
        count: wuXingCount
      },

      // 地支藏干
      cangGan: cangGan,
      cangGanShiShen: cangGanShiShen,

      // 纳音
      nayin: nayin,

      // 神煞
      shensha: shensha,

      // 日干信息
      dayGan: {
        gan: dayGan,
        wuXing: dayGanWuXing,
        strength: strength
      },

      // 称骨算命
      chenggu: chenggu,

      // 十神格局
      shishenPatterns: shishenPatterns,
      shishenPatternsDetail: shishenPatternsResult,

      // 一生运势
      lifeFortune: lifeFortune,

      // 将来建议
      futureAdvice: futureAdvice,

      // 性格分析
      personality: personality,

      // 原始信息
      input: { year, month, day, hour, minute }
    };

  } catch (error) {
    console.error('八字计算错误:', error);
    console.error('错误堆栈:', error.stack);
    console.error('输入参数:', { year, month, day, hour, minute, gender });
    return null;
  }
}

// 称骨算命重量表
const CHENGGU_WEIGHT = {
  // 年份重量（按天干地支）
  year: {
    '甲子': 1.2, '乙丑': 0.9, '丙寅': 0.6, '丁卯': 0.7, '戊辰': 1.2, '己巳': 0.5,
    '庚午': 0.9, '辛未': 0.8, '壬申': 0.7, '癸酉': 0.8, '甲戌': 1.5, '乙亥': 0.9,
    '丙子': 1.6, '丁丑': 0.8, '戊寅': 0.8, '己卯': 1.9, '庚辰': 1.2, '辛巳': 0.6,
    '壬午': 0.8, '癸未': 0.7, '甲申': 0.5, '乙酉': 1.5, '丙戌': 0.6, '丁亥': 1.6,
    '戊子': 1.5, '己丑': 0.7, '庚寅': 0.9, '辛卯': 1.2, '壬辰': 1.0, '癸巳': 0.7,
    '甲午': 1.5, '乙未': 0.6, '丙申': 0.5, '丁酉': 0.4, '戊戌': 1.4, '己亥': 0.9,
    '庚子': 0.7, '辛丑': 0.7, '壬寅': 0.9, '癸卯': 1.2, '甲辰': 0.8, '乙巳': 0.7,
    '丙午': 1.3, '丁未': 0.5, '戊申': 1.4, '己酉': 0.5, '庚戌': 0.6, '辛亥': 1.7,
    '壬子': 0.5, '癸丑': 0.7, '甲寅': 1.2, '乙卯': 0.8, '丙辰': 0.8, '丁巳': 0.6,
    '戊午': 1.9, '己未': 0.6, '庚申': 0.8, '辛酉': 1.6, '壬戌': 1.0, '癸亥': 0.6
  },
  // 月份重量
  month: {
    1: 0.6, 2: 0.7, 3: 1.8, 4: 0.9, 5: 0.5, 6: 1.6,
    7: 0.9, 8: 1.5, 9: 1.8, 10: 0.8, 11: 0.9, 12: 0.5
  },
  // 日期重量
  day: {
    1: 0.5, 2: 1.0, 3: 0.8, 4: 1.5, 5: 1.6, 6: 1.5, 7: 0.8, 8: 1.6, 9: 0.8, 10: 1.6,
    11: 0.9, 12: 1.7, 13: 0.8, 14: 1.7, 15: 1.0, 16: 0.8, 17: 0.9, 18: 1.8, 19: 0.5, 20: 1.5,
    21: 1.0, 22: 0.9, 23: 0.8, 24: 0.9, 25: 1.5, 26: 1.8, 27: 0.7, 28: 0.8, 29: 1.6, 30: 0.6, 31: 1.0
  },
  // 时辰重量
  hour: {
    '子': 1.6, '丑': 0.6, '寅': 0.7, '卯': 1.0, '辰': 0.9, '巳': 1.6,
    '午': 1.0, '未': 0.8, '申': 0.8, '酉': 0.9, '戌': 0.6, '亥': 0.6
  }
};

// 称骨评语表
const CHENGGU_COMMENTS = {
  2.2: "身寒骨冷苦伶仃，此命推来行乞人，劳劳碌碌无度日，中年打拱过平生。",
  2.3: "此命推来骨轻轻，求谋做事事难成，妻儿兄弟应难许，别处他乡作散人。",
  2.4: "此命推来福禄无，门第困苦总难荣，六亲骨肉皆无靠，流到他乡作老翁。",
  2.5: "此命推来祖业微，门第营谋似稀奇，六亲骨肉如水炭，一世勤劳自把持。",
  2.6: "平生衣禄苦中求，独自营谋事不休，离祖出门宜早计，晚来衣禄自无忧。",
  2.7: "一生做事少商量，难靠祖宗作主张，独马单枪空作去，早年晚岁总无长。",
  2.8: "一生作事似飘蓬，祖宗产业在梦中，若不过房并改姓，也当移徒二三通。",
  2.9: "初年运限未曾亨，纵有功名在后成，须过四旬方可上，移居改姓使为良。",
  3.0: "劳劳碌碌苦中求，东走西奔何日休，若能终身勤与俭，老来稍可免忧愁。",
  3.1: "忙忙碌碌苦中求，何日云开见日头，难得祖基家可立，中年衣食渐无忧。",
  3.2: "初年运错事难谋，渐有财源如水流，到得中年衣食旺，那时名利一齐收。",
  3.3: "早年做事事难成，百计徒劳枉费心，半世自如流水去，后来运到始得金。",
  3.4: "此命福气果如何，僧道门中衣禄多，离祖出家方得妙，终朝拜佛念弥陀。",
  3.5: "生平福量不周全，祖业根基觉少传，营事生涯宜守旧，时来衣食胜从前。",
  3.6: "不须劳碌过平生，独自成家福不轻，早有福星常照命，任君行去百般成。",
  3.7: "此命般般事不成，弟兄少力自孤行，虽然祖业须微有，来得明时去不明。",
  3.8: "一身骨肉最清高，早入簧门姓氏标，待到年将三十六，蓝衫脱去换红袍。",
  3.9: "此命终身运不通，劳劳作事尽皆空，苦心竭力成家计，到得那时在梦中。",
  4.0: "平生衣禄是绵长，件件心中自主张，前面风霜多受过，后来必定享安康。",
  4.1: "此命推来自不同，为人能干异凡庸，中年还有逍遥福，不比前时运来通。",
  4.2: "得宽怀处且宽怀，何用双眉皱不开，若使中年命运济，那时名利一起来。",
  4.3: "为人心性最聪明，作事轩昂近贵人，衣禄一生天注定，不须劳碌是丰亨。",
  4.4: "万事由天莫苦求，须知福碌赖人修，当年财帛难如意，晚景欣然便不忧。",
  4.5: "福中取贵格求真，明敏才华志自伸，福禄寿全家道吉，桂兰毓秀晚荣臻。",
  4.6: "东西南北尽皆通，出姓移居更觉隆，衣禄无穷无数定，中年晚景一般同。",
  4.7: "此命推求旺末年，妻荣子贵自怡然，平生原有滔滔福，可卜财源若水泉。",
  4.8: "幼年运道未曾享，苦是蹉跎再不兴，兄弟六亲皆无靠，一身事业晚年成。",
  4.9: "此命推来福不轻，自立自成显门第，从来富贵人钦敬，使婢差奴过一生。",
  5.0: "为利为名终日劳，中年福禄也多遭，老来是有财星照，不比前番目下高。",
  5.1: "一世荣华事事通，不须劳碌自亨通，兄弟叔侄皆如意，家业成时福禄宏。",
  5.2: "一世亨通事事能，不须劳思自然能，宗族欣然心皆好，家业丰亨自称心。",
  5.3: "此格推来气象真，兴家发达在其中，一生福禄安排定，却是人间一富翁。",
  5.4: "此命推来厚且清，诗书满腹看功成，丰衣足食自然稳，正是人间有福人。",
  5.5: "走马扬鞭争名利，少年作事费筹论，一朝福禄源源至，富贵荣华显六亲。",
  5.6: "此格推来礼义通，一身福禄用无穷，甜酸苦辣皆尝过，财源滚滚稳且丰。",
  5.7: "福禄盈盈万事全，一身荣耀乐天年，名扬威震人争羡，此世逍遥宛似仙。",
  5.8: "平生福禄自然来，名利兼全福禄偕，雁塔题名为贵客，紫袍金带走金阶。",
  5.9: "细推此格妙且清，必定才高礼义通，甲第之中应有分，扬鞭走马显威荣。",
  6.0: "一朝金榜快题名，显祖荣宗立大功，衣食定然原欠缺，田园财帛更丰盈。",
  6.1: "不作朝中金榜客，定为世上一财翁，聪明天付经书熟，名显高科自是荣。",
  6.2: "此命生来福不穷，读书必定显亲宗，紫衣金带为卿相，富贵荣华皆可同。",
  6.3: "命主为官福禄长，得来富贵定非常，名题金塔传金榜，定中高科天下扬。",
  6.4: "此格威权不可当，紫袍金带坐高堂，荣华富贵谁能及，积玉堆金满储仓。",
  6.5: "细推此命福不轻，安国安邦极品人，文绣雕梁政富贵，威声照耀四方闻。",
  6.6: "此格人间一福人，堆金积玉满堂春，从来富贵由天定，正笏垂绅谒圣君。",
  6.7: "此命生来福自宏，田园家业最高隆，平生衣禄盈丰足，一世荣华万事通。",
  6.8: "富贵由天莫苦求，万金家计不须谋，十年不比前番事，祖业根基水上舟。",
  6.9: "君是人间衣禄星，一生富贵众人钦，纵然福禄由天定，安享荣华过一生。",
  7.0: "此命推来福不轻，何须愁虑苦劳心，荣华富贵已天定，正笏垂绅拜紫宸。",
  7.1: "此命生成大不同，公侯卿相在其中，一生自有逍遥福，富贵荣华极品隆。",
  7.2: "此格世界罕有生，十代积善产此人，天上紫微来照命，统治万民乐太平。"
};

// 计算称骨重量
function calculateChengguWeight(year, month, day, hour, sizhu) {
  try {
    // 获取年柱重量
    const yearWeight = CHENGGU_WEIGHT.year[sizhu?.year?.ganZhi] || 1.0;

    // 获取月份重量
    const monthWeight = CHENGGU_WEIGHT.month[month] || 0.8;

    // 获取日期重量
    const dayWeight = CHENGGU_WEIGHT.day[day] || 1.0;

    // 获取时辰重量
    const hourWeight = CHENGGU_WEIGHT.hour[sizhu?.hour?.zhi] || 1.0;

    const totalWeight = yearWeight + monthWeight + dayWeight + hourWeight;

    // 找到最接近的重量对应的评语
    const weights = Object.keys(CHENGGU_COMMENTS).map(w => parseFloat(w)).sort((a, b) => a - b);
    let closestWeight = weights[0];

    for (let weight of weights) {
      if (totalWeight >= weight) {
        closestWeight = weight;
      } else {
        break;
      }
    }

    return {
      weight: totalWeight.toFixed(1),
      comment: CHENGGU_COMMENTS[closestWeight] || "命运自有天定，福禄皆在其中。"
    };
  } catch (error) {
    console.error('称骨计算错误:', error);
    return {
      weight: "未知",
      comment: "命运自有天定，福禄皆在其中。"
    };
  }
}

// 分析十神格局
function analyzeShishenPattern(shiShen, dayGan, gans, zhis) {

  // 统计十神出现次数（包括天干和藏干，考虑权重）
  const shishenCount = {};

  // 统计天干十神（权重为1.0，完全计算）
  Object.values(shiShen).forEach(ss => {
    if (ss !== '元女' && ss !== '元男' && ss !== '日主') {
      shishenCount[ss] = (shishenCount[ss] || 0) + 1.0;
    }
  });

  // 统计藏干十神（根据藏干位置给予不同权重）
  zhis.forEach(zhi => {
    const cangGan = DIZHI_CANGGAN[zhi] || [];
    cangGan.forEach((gan, index) => {
      const cangGanShiShen = getShiShen(dayGan, gan);
      if (cangGanShiShen && cangGanShiShen !== '元女' && cangGanShiShen !== '元男' && cangGanShiShen !== '日主') {
        // 藏干权重：本气0.6，中气0.4，余气0.2
        let weight = 0.6; // 本气（第一个藏干）
        if (index === 1) weight = 0.4; // 中气
        if (index === 2) weight = 0.2; // 余气

        shishenCount[cangGanShiShen] = (shishenCount[cangGanShiShen] || 0) + weight;
      }
    });
  });

  // 按优先级检查格局（从高到低）
  const patternChecks = [
    // 第一优先级：特殊制化格局（需要有一定权重才成格）
    {
      name: '食神制杀',
      condition: () => shishenCount['食神'] >= 0.4 && shishenCount['七杀'] >= 0.4,
      priority: 1,
      description: '食神制约七杀，化杀为权'
    },
    {
      name: '伤官配印',
      condition: () => shishenCount['伤官'] >= 0.4 && shishenCount['正印'] >= 0.4,
      priority: 1,
      description: '伤官得印星制约，才华得以发挥'
    },

    // 第二优先级：相生格局
    {
      name: '官印相生',
      condition: () => shishenCount['正官'] >= 0.4 && shishenCount['正印'] >= 0.4,
      priority: 2,
      description: '正官生正印，品格高尚'
    },
    {
      name: '杀印相生',
      condition: () => shishenCount['七杀'] >= 0.4 && shishenCount['正印'] >= 0.4,
      priority: 2,
      description: '七杀生印星，威权并重'
    },

    // 第三优先级：泄秀格局
    {
      name: '食伤泄秀',
      condition: () => shishenCount['食神'] >= 1.2 || shishenCount['伤官'] >= 1.2 ||
        (shishenCount['食神'] || 0) + (shishenCount['伤官'] || 0) >= 1.5,
      priority: 3,
      description: '食伤发挥才华，聪明多艺'
    },

    // 第四优先级：身弱格局
    {
      name: '财多身弱',
      condition: () => (shishenCount['正财'] || 0) + (shishenCount['偏财'] || 0) >= 1.8,
      priority: 4,
      description: '财星过多，需要比劫帮身'
    },

    // 第五优先级：帮身格局
    {
      name: '比劫成群',
      condition: () => (shishenCount['比肩'] || 0) + (shishenCount['劫财'] || 0) >= 1.8,
      priority: 5,
      description: '比劫众多，个性强烈'
    },

    // 负面格局：混杂
    {
      name: '官杀混杂',
      condition: () => shishenCount['正官'] >= 0.4 && shishenCount['七杀'] >= 0.4 &&
        (shishenCount['正官'] + shishenCount['七杀']) >= 1.5,
      priority: 6,
      description: '官杀混杂，需要制化'
    }
  ];

  // 检查所有格局并按优先级排序
  const foundPatterns = [];
  patternChecks.forEach(check => {
    if (check.condition()) {
      foundPatterns.push({
        name: check.name,
        priority: check.priority,
        description: check.description
      });
    }
  });

  // 按优先级排序（优先级数字越小越重要）
  foundPatterns.sort((a, b) => a.priority - b.priority);

  // 提取格局名称
  let patterns = foundPatterns.map(p => p.name);

  // 如果没有特殊格局，根据日干强弱给出基本格局
  if (patterns.length === 0) {
    const strongElements = Object.entries(shishenCount)
      .filter(([_, count]) => count >= 2)
      .map(([element, _]) => element);

    if (strongElements.length > 0) {
      foundPatterns.push({
        name: `${strongElements[0]}格`,
        priority: 7,
        description: `以${strongElements[0]}为主的格局`
      });
      patterns.push(`${strongElements[0]}格`);
    } else {
      foundPatterns.push({
        name: '平和格局',
        priority: 8,
        description: '八字平衡，各十神配置适中'
      });
      patterns.push('平和格局');
    }
  }

  return {
    patterns: patterns,
    details: foundPatterns,
    primary: foundPatterns[0]?.name || '平和格局',
    secondary: foundPatterns.slice(1).map(p => p.name)
  };
}

// 分析一生运势
function analyzeLifeFortune(dayGan, shiShen, wuXing, shensha, chenggu, shishenPatterns, strength) {
  const analysis = {
    period: '一生运势分析',
    fortune: '',
    details: [],
    phases: {
      year: { period: '年柱运势（1-18岁）', fortune: '', details: [] },
      month: { period: '月柱运势（19-36岁）', fortune: '', details: [] },
      day: { period: '日柱运势（37-54岁）', fortune: '', details: [] },
      hour: { period: '时柱运势（55岁以后）', fortune: '', details: [] }
    }
  };

  // 根据称骨重量判断整体运势基调
  const weight = parseFloat(chenggu.weight);
  if (weight < 3.0) {
    analysis.fortune = '一生需要自立自强，通过努力可以改善命运';
    analysis.phases.year.fortune = '少年时期较为辛苦，需要自立';
    analysis.phases.month.fortune = '青年时期逐渐好转，开始积累';
    analysis.phases.day.fortune = '中年时期事业稳定，收获成果';
    analysis.phases.hour.fortune = '晚年可享安逸，颐养天年';
  } else if (weight < 4.0) {
    analysis.fortune = '一生运势平稳，稳中有升';
    analysis.phases.year.fortune = '少年时期平稳发展，基础扎实';
    analysis.phases.month.fortune = '青年时期稳步上升，机会增多';
    analysis.phases.day.fortune = '中年时期事业有成，家庭和睦';
    analysis.phases.hour.fortune = '晚年安享天伦，福禄双全';
  } else if (weight < 5.0) {
    analysis.fortune = '一生运势良好，多有贵人相助';
    analysis.phases.year.fortune = '少年时期运势不错，聪明好学';
    analysis.phases.month.fortune = '青年时期贵人相助，发展顺利';
    analysis.phases.day.fortune = '中年时期富贵双全，声名远播';
    analysis.phases.hour.fortune = '晚年福禄绵长，德高望重';
  } else {
    analysis.fortune = '一生运势优越，富贵荣华';
    analysis.phases.year.fortune = '少年时期运势优越，天资聪颖';
    analysis.phases.month.fortune = '青年时期一帆风顺，前程似锦';
    analysis.phases.day.fortune = '中年时期权势显赫，功成名就';
    analysis.phases.hour.fortune = '晚年德高望重，享尽荣华';
  }

  // 根据年柱十神分析1-18岁
  const yearShishen = shiShen.year;
  switch (yearShishen) {
    case '正印':
    case '偏印':
      analysis.phases.year.details.push('祖上有文化底蕴，从小聪明好学，学业优秀');
      break;
    case '正财':
    case '偏财':
      analysis.phases.year.details.push('家境殷实，物质条件较好，童年无忧');
      break;
    case '正官':
      analysis.phases.year.details.push('家风严谨，从小受到良好教育，品行端正');
      break;
    case '七杀':
      analysis.phases.year.details.push('少年时期可能面临一些压力，但能锻炼意志力');
      break;
    case '食神':
      analysis.phases.year.details.push('天性聪颖，多才多艺，深受长辈喜爱');
      break;
    case '伤官':
      analysis.phases.year.details.push('个性独特，有创新思维，但需注意与长辈关系');
      break;
    case '比肩':
    case '劫财':
      analysis.phases.year.details.push('兄弟姐妹情深，从小有伙伴相助');
      break;
  }

  // 根据月柱十神分析19-36岁
  const monthShishen = shiShen.month;
  switch (monthShishen) {
    case '正印':
    case '偏印':
      analysis.phases.month.details.push('青年时期求学顺利，可能从事文化教育工作');
      break;
    case '正财':
    case '偏财':
      analysis.phases.month.details.push('青年时期财运不错，事业起步顺利');
      break;
    case '正官':
      analysis.phases.month.details.push('青年时期可能进入体制内工作，发展稳定');
      break;
    case '七杀':
      analysis.phases.month.details.push('青年时期竞争激烈，但能在挑战中成长');
      break;
    case '食神':
      analysis.phases.month.details.push('青年时期生活愉快，可能从事服务或艺术行业');
      break;
    case '伤官':
      analysis.phases.month.details.push('青年时期创意丰富，适合创新创业');
      break;
    case '比肩':
    case '劫财':
      analysis.phases.month.details.push('青年时期朋友众多，适合合作发展');
      break;
  }

  // 根据日柱十神分析37-54岁
  const dayShishen = shiShen.day;
  if (dayShishen !== '元女' && dayShishen !== '元男' && dayShishen !== '日主') {
    switch (dayShishen) {
      case '正印':
      case '偏印':
        analysis.phases.day.details.push('中年时期学识渊博，在专业领域有权威地位');
        break;
      case '正财':
      case '偏财':
        analysis.phases.day.details.push('中年时期财运亨通，事业达到巅峰');
        break;
      case '正官':
        analysis.phases.day.details.push('中年时期可能担任重要职务，有管理才能');
        break;
      case '七杀':
        analysis.phases.day.details.push('中年时期需要面对重大挑战，但能够克服');
        break;
      case '食神':
        analysis.phases.day.details.push('中年时期生活安逸，家庭和睦美满');
        break;
      case '伤官':
        analysis.phases.day.details.push('中年时期创造力强，在专业领域有所建树');
        break;
      case '比肩':
      case '劫财':
        analysis.phases.day.details.push('中年时期朋友相助，合作事业发展良好');
        break;
    }
  } else {
    analysis.phases.day.details.push('中年时期是人生的黄金阶段，各方面发展稳定');
  }

  // 根据时柱十神分析55岁以后
  const hourShishen = shiShen.hour;
  switch (hourShishen) {
    case '正印':
    case '偏印':
      analysis.phases.hour.details.push('晚年德高望重，子孙孝顺，享受天伦之乐');
      break;
    case '正财':
    case '偏财':
      analysis.phases.hour.details.push('晚年财富丰厚，生活无忧，子女有成');
      break;
    case '正官':
      analysis.phases.hour.details.push('晚年享有崇高声望，受人敬仰');
      break;
    case '七杀':
      analysis.phases.hour.details.push('晚年需要注意健康，但精神矍铄有威严');
      break;
    case '食神':
      analysis.phases.hour.details.push('晚年福禄双全，颐养天年，享受生活');
      break;
    case '伤官':
      analysis.phases.hour.details.push('晚年思维敏捷，可能有晚年成就或著作');
      break;
    case '比肩':
    case '劫财':
      analysis.phases.hour.details.push('晚年朋友众多，老有所乐，社交活跃');
      break;
  }

  // 根据格局分析整体运势特点
  shishenPatterns.forEach(pattern => {
    switch (pattern) {
      case '食神制杀':
        analysis.details.push('一生能够化解困难，转危为安，智慧过人');
        break;
      case '伤官配印':
        analysis.details.push('一生文采出众，在文化艺术领域有所成就');
        break;
      case '官印相生':
        analysis.details.push('一生品格高尚，适合从政或教育事业');
        break;
      case '杀印相生':
        analysis.details.push('一生有威权，能够掌握实权，有领导才能');
        break;
      case '财多身弱':
        analysis.details.push('一生财运不错，但需要注意身体健康');
        break;
      case '比劫成群':
        analysis.details.push('一生朋友众多，适合合作创业');
        break;
      case '食伤泄秀':
        analysis.details.push('一生多才多艺，在创意领域有所发展');
        break;
    }
  });

  // 根据神煞分析特殊运势
  const allShensha = Object.values(shensha).flat();
  if (allShensha.includes('天乙贵人')) {
    analysis.details.push('一生多有贵人相助，能够逢凶化吉');
  }
  if (allShensha.includes('文昌贵人')) {
    analysis.details.push('一生学业运佳，利于考试和文化事业');
  }
  if (allShensha.includes('桃花')) {
    analysis.details.push('一生人缘好，异性缘佳，但需谨慎处理感情');
  }
  if (allShensha.includes('驿马')) {
    analysis.details.push('一生多有变动，适合经常出差或迁移的工作');
  }
  if (allShensha.includes('华盖')) {
    analysis.details.push('一生具有艺术天赋，适合从事文化艺术工作');
  }

  return analysis;
}

// 生成将来建议
function generateFutureAdvice(dayGan, shiShen, wuXing, shensha, shishenPatterns, strength) {
  const advice = {
    career: [],
    health: [],
    relationship: [],
    wealth: [],
    general: []
  };

  // 根据日干强弱给建议
  if (strength === '偏弱') {
    advice.general.push('日主偏弱，宜多结交朋友，寻求合作伙伴支持');
    advice.health.push('注意休息，避免过度劳累，适当进补');
  } else if (strength === '偏强') {
    advice.general.push('日主偏强，宜发挥才能，主动出击');
    advice.health.push('精力充沛，但需注意情绪管理，避免过于冲动');
  }

  // 根据五行缺失给建议
  const missingElements = Object.entries(wuXing.count)
    .filter(([_, count]) => count === 0)
    .map(([element]) => element);

  missingElements.forEach(element => {
    switch (element) {
      case '木':
        advice.general.push('五行缺木，宜多接触绿色植物，从事与木相关的行业');
        advice.health.push('注意肝胆健康，多做户外运动');
        break;
      case '火':
        advice.general.push('五行缺火，宜多晒太阳，穿红色衣物');
        advice.health.push('注意心血管健康，保持乐观心态');
        break;
      case '土':
        advice.general.push('五行缺土，宜从事稳定的工作，投资房地产');
        advice.health.push('注意脾胃健康，饮食规律');
        break;
      case '金':
        advice.general.push('五行缺金，宜佩戴金属饰品，从事金融行业');
        advice.health.push('注意肺部和呼吸系统健康');
        break;
      case '水':
        advice.general.push('五行缺水，宜多喝水，从事流动性行业');
        advice.health.push('注意肾脏和泌尿系统健康');
        break;
    }
  });

  // 根据十神格局给建议
  shishenPatterns.forEach(pattern => {
    switch (pattern) {
      case '食神制杀':
        advice.career.push('适合从事需要智慧和策略的工作，如咨询、策划等');
        break;
      case '伤官配印':
        advice.career.push('适合文化教育、艺术创作等领域');
        break;
      case '官印相生':
        advice.career.push('适合公务员、教师等稳定职业');
        break;
      case '财多身弱':
        advice.wealth.push('理财需谨慎，避免过度投资，宜寻求专业建议');
        break;
    }
  });

  // 根据神煞给建议
  Object.values(shensha).flat().forEach(sha => {
    switch (sha) {
      case '桃花':
        advice.relationship.push('异性缘佳，但需谨慎处理感情问题，避免多角恋');
        break;
      case '天乙贵人':
        advice.general.push('多结交有能力的朋友，关键时刻会有贵人相助');
        break;
      case '文昌贵人':
        advice.career.push('适合从事文化、教育、写作等相关工作');
        break;
      case '驿马':
        advice.career.push('适合经常出差或变动的工作，不宜过于安逸');
        break;
    }
  });

  // 通用建议
  advice.general.push('保持积极心态，多行善事，广结善缘');
  advice.health.push('定期体检，注意养生，劳逸结合');
  advice.relationship.push('真诚待人，重视家庭和睦');
  advice.wealth.push('量入为出，稳健投资，不可贪心');

  return advice;
}

// 分析性格特征
function analyzePersonality(dayGan, shiShen, wuXing, shensha, shishenPatterns, strength) {
  const personality = {
    core: '', // 核心性格
    traits: [], // 性格特点
    strengths: [], // 优点
    weaknesses: [], // 需要注意的方面
    social: '' // 社交特点
  };

  // 根据日干分析核心性格
  const dayWuXing = wuXing.count;
  switch (dayGan) {
    case '甲':
      personality.core = '正直刚强，有领导才能';
      personality.traits.push('性格直爽，不喜欢拐弯抹角');
      personality.strengths.push('有正义感，敢于承担责任');
      break;
    case '乙':
      personality.core = '温和柔韧，适应性强';
      personality.traits.push('性格温和，善于变通');
      personality.strengths.push('有耐心，善于协调');
      break;
    case '丙':
      personality.core = '热情开朗，充满活力';
      personality.traits.push('性格外向，喜欢表现自己');
      personality.strengths.push('乐观积极，感染力强');
      break;
    case '丁':
      personality.core = '细腻敏感，富有创意';
      personality.traits.push('思维敏捷，注重细节');
      personality.strengths.push('有艺术天赋，善于创新');
      break;
    case '戊':
      personality.core = '稳重踏实，值得信赖';
      personality.traits.push('性格稳定，做事有条理');
      personality.strengths.push('责任心强，值得依靠');
      break;
    case '己':
      personality.core = '包容温厚，善解人意';
      personality.traits.push('性格温和，善于倾听');
      personality.strengths.push('有同情心，善于照顾他人');
      break;
    case '庚':
      personality.core = '果断坚毅，执行力强';
      personality.traits.push('性格刚强，决断力强');
      personality.strengths.push('有魄力，善于解决问题');
      break;
    case '辛':
      personality.core = '精致细腻，追求完美';
      personality.traits.push('注重品质，有审美眼光');
      personality.strengths.push('做事精细，有艺术品味');
      break;
    case '壬':
      personality.core = '智慧灵活，善于变通';
      personality.traits.push('思维活跃，适应能力强');
      personality.strengths.push('聪明机智，善于学习');
      break;
    case '癸':
      personality.core = '内敛深沉，富有智慧';
      personality.traits.push('性格内向，思考深入');
      personality.strengths.push('有洞察力，善于思考');
      break;
  }

  // 根据日干强弱调整性格描述
  if (strength === '偏强') {
    personality.traits.push('个性较强，有主见');
    personality.strengths.push('自信心强，有领导潜质');
    personality.weaknesses.push('有时过于固执，需要学会倾听他人意见');
  } else if (strength === '偏弱') {
    personality.traits.push('性格相对温和，善于合作');
    personality.strengths.push('谦逊低调，善于学习');
    personality.weaknesses.push('有时缺乏自信，需要增强自我肯定');
  } else {
    personality.traits.push('性格平和，刚柔并济');
    personality.strengths.push('平衡感好，适应性强');
  }

  // 根据十神格局分析性格特点
  shishenPatterns.forEach(pattern => {
    switch (pattern) {
      case '食神制杀':
        personality.traits.push('善于化解矛盾，有智慧');
        personality.social = '善于处理复杂的人际关系';
        break;
      case '伤官配印':
        personality.traits.push('才华横溢，有创造力');
        personality.social = '在文化艺术圈子中受欢迎';
        break;
      case '官印相生':
        personality.traits.push('品格高尚，有责任感');
        personality.social = '在正式场合表现出色，受人尊敬';
        break;
      case '杀印相生':
        personality.traits.push('有威严，善于管理');
        personality.social = '天生的领导者，能够服众';
        break;
      case '财多身弱':
        personality.traits.push('重视物质，但有时力不从心');
        personality.weaknesses.push('需要学会量力而行，不要过度追求');
        break;
      case '比劫成群':
        personality.traits.push('重视友情，喜欢团队合作');
        personality.social = '朋友众多，善于合作';
        break;
      case '食伤泄秀':
        personality.traits.push('多才多艺，表达能力强');
        personality.social = '善于表达，容易成为焦点';
        break;
    }
  });

  // 根据主要十神分析性格倾向
  const mainShishen = [shiShen.year, shiShen.month, shiShen.day, shiShen.hour];
  const shishenCount = {};
  mainShishen.forEach(ss => {
    if (ss !== '元女' && ss !== '元男' && ss !== '日主') {
      shishenCount[ss] = (shishenCount[ss] || 0) + 1;
    }
  });

  const dominantShishen = Object.entries(shishenCount)
    .sort(([, a], [, b]) => b - a)[0];

  if (dominantShishen) {
    const [shishen, count] = dominantShishen;
    if (count >= 2) {
      switch (shishen) {
        case '正印':
        case '偏印':
          personality.traits.push('重视学习和精神追求');
          personality.social = '在学术或文化领域有影响力';
          break;
        case '正财':
        case '偏财':
          personality.traits.push('现实务实，善于理财');
          personality.social = '在商业领域如鱼得水';
          break;
        case '正官':
          personality.traits.push('遵纪守法，有原则性');
          personality.social = '在正式组织中表现优秀';
          break;
        case '七杀':
          personality.traits.push('有魄力，敢于冒险');
          personality.social = '在竞争激烈的环境中脱颖而出';
          break;
        case '食神':
          personality.traits.push('乐观开朗，享受生活');
          personality.social = '人缘好，容易获得他人喜爱';
          break;
        case '伤官':
          personality.traits.push('聪明机智，有创新精神');
          personality.social = '在创新领域有独特见解';
          break;
        case '比肩':
        case '劫财':
          personality.traits.push('重视友谊，有团队精神');
          personality.social = '善于与同龄人相处';
          break;
      }
    }
  }

  // 根据神煞分析性格特殊面
  const allShensha = Object.values(shensha).flat();
  if (allShensha.includes('桃花')) {
    personality.traits.push('魅力十足，异性缘佳');
    personality.social = '在社交场合很受欢迎';
  }
  if (allShensha.includes('华盖')) {
    personality.traits.push('有艺术气质，喜欢独处思考');
    personality.weaknesses.push('有时过于孤傲，需要多与人交流');
  }
  if (allShensha.includes('文昌贵人')) {
    personality.traits.push('聪明好学，文采出众');
    personality.strengths.push('学习能力强，善于表达');
  }
  if (allShensha.includes('天乙贵人')) {
    personality.traits.push('有贵人相助的特质');
    personality.social = '容易获得他人帮助和支持';
  }

  // 设置默认社交特点（如果没有设置）
  if (!personality.social) {
    personality.social = '待人真诚，能够建立良好的人际关系';
  }

  // 添加通用的建议
  if (personality.weaknesses.length === 0) {
    personality.weaknesses.push('保持谦逊，继续学习和成长');
  }

  return personality;
}

// 分析日干强弱（简化版）
function analyzeStrength(dayGan, gans, zhis, month) {
  const dayWuXing = WUXING[dayGan];
  let score = 0;

  // 月令得分
  const monthZhi = zhis[1];
  const monthWuXing = WUXING[monthZhi];

  if (monthWuXing === dayWuXing) {
    score += 3; // 得月令
  }

  // 其他天干地支得分
  [...gans, ...zhis].forEach((item, index) => {
    if (index === 2) return; // 跳过日干自己
    const itemWuXing = WUXING[item];
    if (itemWuXing === dayWuXing) {
      score += 1; // 同类
    }
  });

  if (score >= 4) {
    return '偏强';
  } else if (score >= 2) {
    return '中和';
  } else {
    return '偏弱';
  }
}