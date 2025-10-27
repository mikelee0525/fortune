/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 启用静态导出
  trailingSlash: true,
  images: {
    unoptimized: true  // 静态导出时需要
  },
  // 可选：如果您的仓库名不是 username.github.io
  basePath: process.env.NODE_ENV === 'production' ? '/fortune-teller' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/fortune-teller/' : ''
}

module.exports = nextConfig