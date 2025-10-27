# 阿里云百炼 API 配置说明

## 环境变量配置

在项目根目录创建 `.env.local` 文件，添加以下配置：

```bash
# 阿里云百炼 API 配置
ALIBABA_CLOUD_ACCESS_KEY_ID=your_api_key
BAILIAN_MODEL=qwen-turbo
```

## 获取 API Key

### 方法一：通过 DashScope 控制台
1. 访问 [DashScope 控制台](https://dashscope.console.aliyun.com/)
2. 登录您的阿里云账户
3. 在 API-KEY 管理中创建新的 API Key
4. 复制生成的 API Key

### 方法二：通过百炼控制台
1. 访问 [阿里云百炼控制台](https://bailian.console.aliyun.com/)
2. 登录您的阿里云账户
3. 创建或选择您的智能体应用
4. 在应用设置中获取 API Key

### 注意事项
- API Key 格式通常以 `sk-` 开头
- 请妥善保管您的 API Key
- 如果 API Key 无效，系统会自动回退到测试模式

## 支持的模型

- `qwen-turbo` - 通义千问 Turbo 版本
- `qwen-plus` - 通义千问 Plus 版本
- `qwen-max` - 通义千问 Max 版本

## API 参数说明

- `temperature`: 控制回复的随机性 (0.0-1.0)
- `max_tokens`: 最大回复长度

## 测试

1. 配置环境变量后重启开发服务器
2. 访问对话页面测试功能
3. 如果未配置 API Key，系统会返回测试回复

## 注意事项

- 请妥善保管您的 API Key
- 注意 API 调用频率限制
- 建议在生产环境中使用环境变量管理敏感信息
