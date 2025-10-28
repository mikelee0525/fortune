export default function ArtisticLogo({ className = "w-32 h-12" }) {
  return (
    <div className={`flex items-center ${className}`}>
      <svg 
        viewBox="0 0 200 60" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 背景装饰 */}
        <defs>
          <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
          
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="2" stdDeviation="1" floodColor="#000000" floodOpacity="0.3"/>
          </filter>
        </defs>

        {/* 装饰性边框 */}
        <rect x="2" y="2" width="196" height="56" rx="8" fill="none" 
              stroke="url(#textGradient)" strokeWidth="1" opacity="0.3"/>

        {/* 命 字 */}
        <g transform="translate(15, 10)">
          <path d="M5 5 L25 5 M15 5 L15 45 M5 15 L25 15 M5 25 L25 25 M8 35 L22 35 M10 40 L20 40" 
                stroke="url(#textGradient)" strokeWidth="3" fill="none" strokeLinecap="round" filter="url(#shadow)"/>
          <path d="M2 8 Q15 12 28 8 M2 18 Q15 22 28 18 M5 28 Q15 32 25 28" 
                stroke="url(#textGradient)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6"/>
        </g>

        {/* 理 字 */}
        <g transform="translate(65, 10)">
          <path d="M5 5 L5 45 M15 5 L15 45 M25 5 L25 45 M2 15 L28 15 M2 25 L28 25 M8 35 L22 35" 
                stroke="url(#textGradient)" strokeWidth="3" fill="none" strokeLinecap="round" filter="url(#shadow)"/>
          <circle cx="10" cy="10" r="2" fill="url(#textGradient)" opacity="0.8"/>
          <circle cx="20" cy="10" r="2" fill="url(#textGradient)" opacity="0.8"/>
        </g>

        {/* 坊 字 */}
        <g transform="translate(115, 10)">
          <path d="M5 5 L5 45 M15 5 L15 25 M25 15 L25 45 M2 15 L28 15 M8 25 L22 25 M8 35 L28 35" 
                stroke="url(#textGradient)" strokeWidth="3" fill="none" strokeLinecap="round" filter="url(#shadow)"/>
          <path d="M18 5 Q22 10 18 15 Q14 10 18 5" 
                fill="url(#textGradient)" opacity="0.7"/>
        </g>

        {/* 装饰性元素 */}
        <g opacity="0.4">
          {/* 左侧装饰 */}
          <circle cx="8" cy="30" r="1" fill="url(#textGradient)"/>
          <circle cx="6" cy="35" r="0.8" fill="url(#textGradient)"/>
          
          {/* 右侧装饰 */}
          <circle cx="192" cy="25" r="1" fill="url(#textGradient)"/>
          <circle cx="194" cy="30" r="0.8" fill="url(#textGradient)"/>
          
          {/* 底部装饰线 */}
          <path d="M20 52 Q100 48 180 52" stroke="url(#textGradient)" strokeWidth="1" fill="none"/>
        </g>

        {/* 印章风格的小装饰 */}
        <g transform="translate(170, 8)" opacity="0.6">
          <rect x="0" y="0" width="12" height="12" rx="2" fill="none" stroke="url(#textGradient)" strokeWidth="1"/>
          <circle cx="6" cy="6" r="2" fill="url(#textGradient)" opacity="0.5"/>
        </g>
      </svg>
    </div>
  );
}