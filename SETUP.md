# 项目设置指南

## 前置要求

### 1. 安装 Node.js

请访问 [Node.js 官网](https://nodejs.org/) 下载并安装 Node.js（推荐 LTS 版本）。

安装完成后，在命令行中验证安装：
```bash
node --version
npm --version
```

### 2. 安装项目依赖

在项目根目录下运行：
```bash
npm install
```

这将安装以下依赖包：
- express: Web 服务器框架
- cors: 跨域资源共享
- axios: HTTP 客户端
- dotenv: 环境变量管理
- puppeteer: PDF 生成（无头浏览器）
- html-pdf: HTML 转 PDF
- jspdf: JavaScript PDF 生成库

## 环境变量配置

### 1. 创建 .env 文件

复制 `.env.example` 文件并重命名为 `.env`：
```bash
copy .env.example .env
```

### 2. 配置腾讯元宝 API

在 `.env` 文件中设置您的 API 密钥：
```
TENCENT_YUANBAO_API_KEY=your_actual_api_key_here
```

### 3. 其他配置项

您可以根据需要调整以下配置：
```
# 服务器端口
PORT=3000

# API 端点
TENCENT_YUANBAO_API_URL=https://api.hunyuan.cloud.tencent.com/v1/chat/completions

# 模型配置
DEEPSEEK_MODEL=hunyuan-lite
MAX_TOKENS=3000
TEMPERATURE=0.7
```

## 运行项目

### 开发模式
```bash
npm run dev
```

### 生产模式
```bash
npm start
```

### 构建项目
```bash
npm run build
```

## 功能说明

### 1. 详细八字解读
- 调用腾讯元宝 API 生成专业的八字分析报告
- 自动生成 PDF 下载链接
- 包含四柱分析、五行平衡、性格特征等内容

### 2. 七天运势预测
- 提供未来 7 天的详细运势分析
- 包含每日评分、事业、财运、感情、健康等方面
- 支持 PDF 导出功能

### 3. PDF 生成
- 使用 Puppeteer 生成高质量 PDF 报告
- 自动保存到 `public/pdf/` 目录
- 支持中文字体和样式

## 部署说明

### Vercel 部署
1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 在 Vercel 环境变量中设置 `TENCENT_YUANBAO_API_KEY`
4. 部署完成

### 注意事项
- 确保 `.env` 文件不要提交到版本控制系统
- PDF 生成功能需要足够的内存和计算资源
- 在生产环境中，建议使用专门的文件存储服务

## 故障排除

### 1. Node.js 未安装
如果遇到 "node is not recognized" 错误，请：
- 下载并安装 Node.js
- 重启命令行工具
- 确保 Node.js 已添加到系统 PATH

### 2. 依赖安装失败
如果 `npm install` 失败，请尝试：
```bash
npm cache clean --force
npm install
```

### 3. API 调用失败
- 检查 API 密钥是否正确
- 确认网络连接正常
- 查看控制台错误日志

### 4. PDF 生成失败
- 确保有足够的系统内存
- 检查 `public/pdf/` 目录权限
- 查看 Puppeteer 相关错误信息