export default function SimpleLogo({ className = "" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* 简化的太极图标 */}
      <div className="w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center">
        <svg viewBox="0 0 16 16" className="w-5 h-5 text-white" fill="currentColor">
          <path d="M8 1 A7 7 0 0 1 8 15 A3.5 3.5 0 0 1 8 8 A3.5 3.5 0 0 0 8 1"/>
          <circle cx="8" cy="5" r="1" fill="white"/>
          <circle cx="8" cy="11" r="1" fill="currentColor"/>
        </svg>
      </div>
      
      {/* 清晰的文字 */}
      <span className="text-lg font-semibold text-gray-900 dark:text-white">
        命理坊
      </span>
    </div>
  );
}