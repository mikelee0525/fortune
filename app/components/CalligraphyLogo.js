export default function CalligraphyLogo({ className = "w-24 h-10", variant = "default" }) {
  const gradientId = `textGradient-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className={`flex items-center ${className}`}>
      <svg 
        viewBox="0 0 120 40" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={variant === 'light' ? '#1e40af' : '#3b82f6'} />
            <stop offset="50%" stopColor={variant === 'light' ? '#3b82f6' : '#1d4ed8'} />
            <stop offset="100%" stopColor={variant === 'light' ? '#1e3a8a' : '#1e40af'} />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* 命 - 书法风格 */}
        <g transform="translate(8, 5)">
          <path d="M2 3 Q8 1 14 3 M8 3 L8 32 M2 10 Q8 8 14 10 M2 18 Q8 16 14 18 M4 25 Q8 23 12 25 M5 29 Q8 27 11 29" 
                stroke={`url(#${gradientId})`} strokeWidth="2.5" fill="none" 
                strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)"/>
        </g>

        {/* 理 - 书法风格 */}
        <g transform="translate(38, 5)">
          <path d="M2 3 L2 32 M8 3 L8 32 M14 3 L14 32 M0 10 L16 10 M0 18 L16 18 M4 25 L12 25" 
                stroke={`url(#${gradientId})`} strokeWidth="2.5" fill="none" 
                strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)"/>
          <circle cx="5" cy="6" r="1" fill={`url(#${gradientId})`} opacity="0.8"/>
          <circle cx="11" cy="6" r="1" fill={`url(#${gradientId})`} opacity="0.8"/>
        </g>

        {/* 坊 - 书法风格 */}
        <g transform="translate(68, 5)">
          <path d="M2 3 L2 32 M8 3 L8 18 M14 10 L14 32 M0 10 L16 10 M4 18 L12 18 M4 25 L16 25" 
                stroke={`url(#${gradientId})`} strokeWidth="2.5" fill="none" 
                strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)"/>
          <path d="M10 3 Q12 6 10 9 Q8 6 10 3" fill={`url(#${gradientId})`} opacity="0.7"/>
        </g>

        {/* 装饰印章 */}
        <g transform="translate(100, 6)" opacity="0.7">
          <rect x="0" y="0" width="8" height="8" rx="1" fill="none" 
                stroke={`url(#${gradientId})`} strokeWidth="1"/>
          <circle cx="4" cy="4" r="1.5" fill={`url(#${gradientId})`} opacity="0.6"/>
        </g>

        {/* 底部装饰线 */}
        <path d="M10 35 Q60 33 110 35" stroke={`url(#${gradientId})`} 
              strokeWidth="0.8" fill="none" opacity="0.5"/>
      </svg>
    </div>
  );
}