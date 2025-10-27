/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 启用静态导出
  trailingSlash: true,
  images: {
    unoptimized: true  // 静态导出时需要
  },
  // GitHub Pages configuration
  basePath: process.env.NODE_ENV === 'production' ? '/fortune' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/fortune' : ''
}

export default nextConfig