export default function HeroLogo({ className = "w-64 h-20" }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg 
        viewBox="0 0 300 80" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="30%" stopColor="#3b82f6" />
            <stop offset="70%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
          
          <filter id="heroShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="3" dy="3" stdDeviation="2" floodColor="#000000" floodOpacity="0.3"/>
          </filter>
          
          <filter id="heroGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* 背景装饰 */}
        <rect x="5" y="5" width="290" height="70" rx="12" fill="none" 
              stroke="url(#heroGradient)" strokeWidth="1" opacity="0.2"/>

        {/* 命 字 - 大号艺术字 */}
        <g transform="translate(30, 15)">
          <path d="M5 8 Q20 4 35 8 M20 8 L20 60 M5 22 Q20 18 35 22 M5 36 Q20 32 35 36 M8 48 Q20 44 32 48 M10 55 Q20 51 30 55" 
                stroke="url(#heroGradient)" strokeWidth="4" fill="none" 
                strokeLinecap="round" strokeLinejoin="round" 
                filter="url(#heroShadow)" />
          
          {/* 装饰性笔触 */}
          <path d="M2 12 Q20 16 38 12 M2 26 Q20 30 38 26 M8 40 Q20 44 32 40" 
                stroke="url(#heroGradient)" strokeWidth="2" fill="none" 
                strokeLinecap="round" opacity="0.6"/>
        </g>

        {/* 理 字 - 大号艺术字 */}
        <g transform="translate(130, 15)">
          <path d="M5 8 L5 60 M20 8 L20 60 M35 8 L35 60 M2 22 L38 22 M2 36 L38 36 M10 48 L30 48" 
                stroke="url(#heroGradient)" strokeWidth="4" fill="none" 
                strokeLinecap="round" strokeLinejoin="round" 
                filter="url(#heroShadow)" />
          
          {/* 装饰圆点 */}
          <circle cx="12" cy="12" r="2.5" fill="url(#heroGradient)" opacity="0.8" filter="url(#heroGlow)"/>
          <circle cx="28" cy="12" r="2.5" fill="url(#heroGradient)" opacity="0.8" filter="url(#heroGlow)"/>
          
          {/* 装饰线条 */}
          <path d="M8 26 Q20 30 32 26 M8 40 Q20 44 32 40" 
                stroke="url(#heroGradient)" strokeWidth="2" fill="none" 
                strokeLinecap="round" opacity="0.5"/>
        </g>

        {/* 坊 字 - 大号艺术字 */}
        <g transform="translate(230, 15)">
          <path d="M5 8 L5 60 M20 8 L20 36 M35 22 L35 60 M2 22 L38 22 M10 36 L30 36 M10 48 L38 48" 
                stroke="url(#heroGradient)" strokeWidth="4" fill="none" 
                strokeLinecap="round" strokeLinejoin="round" 
                filter="url(#heroShadow)" />
          
          {/* 装饰性屋顶 */}
          <path d="M24 8 Q30 14 24 20 Q18 14 24 8" 
                fill="url(#heroGradient)" opacity="0.7" filter="url(#heroGlow)"/>
          
          {/* 装饰线条 */}
          <path d="M12 26 Q20 30 28 26 M12 40 Q25 44 38 40" 
                stroke="url(#heroGradient)" strokeWidth="2" fill="none" 
                strokeLinecap="round" opacity="0.5"/>
        </g>

        {/* 底部装饰 */}
        <g opacity="0.4">
          <path d="M40 70 Q150 66 260 70" stroke="url(#heroGradient)" strokeWidth="2" fill="none"/>
          <circle cx="25" cy="40" r="1.5" fill="url(#heroGradient)"/>
          <circle cx="275" cy="35" r="1.5" fill="url(#heroGradient)"/>
        </g>

        {/* 印章装饰 */}
        <g transform="translate(270, 12)" opacity="0.7">
          <rect x="0" y="0" width="16" height="16" rx="3" fill="none" 
                stroke="url(#heroGradient)" strokeWidth="1.5"/>
          <circle cx="8" cy="8" r="3" fill="url(#heroGradient)" opacity="0.5"/>
          <path d="M5 5 L11 11 M11 5 L5 11" stroke="white" strokeWidth="1" opacity="0.8"/>
        </g>
      </svg>
    </div>
  );
}