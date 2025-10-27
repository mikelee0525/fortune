/** @type {import('next').NextConfig} */
const nextConfig = {
  // 阿里云函数计算配置
  output: 'standalone',
  outputFileTracingRoot: process.cwd(),
}

export default nextConfig