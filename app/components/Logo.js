export default function Logo({ className = "", variant = "default" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* 太极八卦图标 */}
      <div className="relative">
        <svg 
          viewBox="0 0 32 32" 
          className="w-8 h-8 text-blue-600 dark:text-blue-400"
          fill="currentColor"
        >
          {/* 外圆 */}
          <circle cx="16" cy="16" r="15" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          
          {/* 太极图案 */}
          <path d="M16 2 A14 14 0 0 1 16 30 A7 7 0 0 1 16 16 A7 7 0 0 0 16 2" fill="currentColor"/>
          <circle cx="16" cy="9" r="2" fill="white"/>
          <circle cx="16" cy="23" r="2" fill="currentColor"/>
          
          {/* 八卦线条 */}
          <g stroke="currentColor" strokeWidth="1.2" fill="none">
            <line x1="16" y1="1" x2="16" y2="4"/>
            <line x1="27.3" y1="8" x2="25.1" y2="9.5"/>
            <line x1="27.3" y1="24" x2="25.1" y2="22.5"/>
            <line x1="16" y1="31" x2="16" y2="28"/>
            <line x1="4.7" y1="24" x2="6.9" y2="22.5"/>
            <line x1="4.7" y1="8" x2="6.9" y2="9.5"/>
            <line x1="24" y1="4.7" x2="22.5" y2="6.9"/>
            <line x1="8" y1="4.7" x2="9.5" y2="6.9"/>
          </g>
        </svg>
      </div>
      
      {/* 清晰的文字 */}
      <span className="text-xl font-bold text-gray-900 dark:text-white tracking-wide font-sans">
        命理坊
      </span>
    </div>
  );
}