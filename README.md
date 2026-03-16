# 🌟 AI Stars - AI明星库

AI生成的虚拟明星管理系统，为影视制作提供数字演员资源。

[![FilmStudio Integration](https://img.shields.io/badge/FilmStudio-Compatible-blue)](https://github.com/peggypan/filmstudio)
[![AI Generated](https://img.shields.io/badge/AI-Generated-purple)](PROJECT.md)

---

## ✨ 特性

- 🤖 **AI生成明星** - 一键生成完整的虚拟明星档案
- 🎭 **完整人设** - 性格、背景、外貌、技能全方位设定
- 🎬 **作品体系** - 虚拟影视作品履历管理
- 📊 **实时榜单** - 人气榜、热度榜、新人榜
- 🔗 **FilmStudio集成** - 无缝对接影视制作流程
- 🎨 **分类管理** - 武打明星、歌手、主持人等多维度分类

---

## 🚀 快速开始

```bash
# 克隆项目
git clone https://github.com/peggypan/aistars.git
cd aistars

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env

# 数据库迁移
npx prisma migrate dev

# 启动开发服务器
npm run dev
```

---

## 📁 项目结构

```
aistars/
├── apps/
│   ├── api/          # NestJS 后端 API
│   └── web/          # React 前端
├── docs/
│   ├── API.md        # API 文档
│   ├── ARCHITECTURE.md
│   └── PRD.md
└── memory/           # 项目决策记录
```

---

## 🔗 相关项目

- [FilmStudio](https://github.com/peggypan/filmstudio) - AI影视制作平台

---

## 📄 许可证

MIT License © 2026 AI Stars
