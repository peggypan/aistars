# 🌟 AI Stars - AI影视演员库

> 为独立创作者提供零成本的数字演员资源

---

## 📋 项目概述

**AI Stars** 是一个 **AI影视演员库**，专注于为独立 filmmaker 和小型制作团队提供AI生成的虚拟演员。核心定位是**工具属性**，而非娱乐IP运营。

### 核心价值
- **零成本选角**: 无需支付演员费用，随时可用
- **完美匹配**: AI生成完全符合角色需求的演员
- **永不塌房**: 虚拟演员没有负面新闻
- **制作集成**: 与 FilmStudio 无缝对接

### 目标用户
1. **独立创作者** - 拍短片、做内容，缺演员/缺预算
2. **小型团队** - 需要固定出镜形象，不想绑定真人
3. **AI艺术家** - 探索AI角色的艺术创作

---

## 🎯 核心功能

### 1. 明星管理
- **基本信息**: 姓名、年龄、性别、国籍、头像
- **人物设定**: 性格特征、背景故事、特长技能
- **形象风格**: 外貌描述、穿搭风格、标志性特征

### 2. 分类体系
- **演员类型**: 武打明星、喜剧演员、实力派、偶像派
- **歌手类型**: 流行歌手、摇滚歌手、R&B歌手、独立音乐人
- **其他类型**: 主持人、模特、网络红人

### 3. 作品管理
- **参演作品**: 电影、电视剧、综艺节目、音乐作品
- **角色信息**: 饰演角色、戏份重要度、表现评价
- **获奖记录**: 奖项名称、颁奖机构、获奖年份

### 4. 榜单系统
- **热度榜单**: 实时热度排行
- **作品榜**: 按作品数量/质量排行
- **人气榜**: 按粉丝数/互动量排行
- **新人榜**: 新晋AI明星排行

### 5. AI生成
- **一键生成**: 基于提示词生成完整明星档案
- **智能补全**: 根据已有信息补全缺失内容
- **风格迁移**: 参考真实明星风格生成虚拟明星

---

## 🏗️ 技术架构

### 后端 (NestJS + Prisma)
```
apps/api/src/
├── modules/
│   ├── star/           # 明星管理模块
│   ├── category/       # 分类管理模块
│   ├── movie/          # 作品管理模块
│   └── ranking/        # 榜单管理模块
├── shared/             # 共享服务
└── prisma/             # 数据库模型
```

### 前端 (React + Ant Design)
```
apps/web/src/
├── pages/
│   ├── Stars/          # 明星列表/详情
│   ├── Categories/     # 分类管理
│   ├── Movies/         # 作品库
│   └── Rankings/       # 榜单
├── components/         # 组件库
└── services/           # API服务
```

### 数据库 (PostgreSQL)
- 明星表 (t_stars)
- 分类表 (t_categories)
- 作品表 (t_movies)
- 参演关系表 (t_star_movies)
- 榜单表 (t_rankings)

---

## 🎨 核心数据模型

### Star (明星)
```typescript
{
  id: string
  name: string              // 艺名
  realName?: string         // 本名
  avatar: string            // 头像URL
  age: number               // 年龄
  gender: 'male' | 'female' | 'other'
  nationality: string       // 国籍
  
  // 人物设定
  personality: string[]     // 性格标签 ["活泼", "幽默", "敬业"]
  background: string        // 背景故事
  skills: string[]          // 特长 ["武打", "唱歌", "舞蹈"]
  
  // 形象风格
  appearance: string        // 外貌描述
  style: string             // 穿搭风格
  signature: string         // 标志性特征
  
  // 职业信息
  categories: string[]      // 分类 ["action_star", "singer"]
  debutYear: number         // 出道年份
  agency?: string           // 经纪公司
  
  // 统计数据
  fanCount: number          // 粉丝数
  popularity: number        // 人气指数 0-100
  workCount: number         // 作品数
  
  // AI生成信息
  aiGenerated: boolean      // 是否AI生成
  aiPrompt?: string         // 生成提示词
  aiModel?: string          // 使用的AI模型
  
  // 状态
  status: 'active' | 'inactive' | 'archived'
  createdAt: Date
  updatedAt: Date
}
```

### Category (分类)
```typescript
{
  id: string
  name: string              // 分类名称
  type: 'actor' | 'singer' | 'other'  // 大分类
  icon: string              // 图标
  description: string       // 描述
  parentId?: string         // 父分类（支持多级）
  sortOrder: number         // 排序
  starCount: number         // 明星数量
}
```

### Movie (作品)
```typescript
{
  id: string
  title: string             // 作品名称
  type: 'movie' | 'tv' | 'variety' | 'music' | 'ad'
  poster?: string           // 海报
  releaseYear: number       // 发行年份
  genre: string[]           // 类型 ["动作", "科幻"]
  description: string       // 简介
  rating?: number           // 评分 0-10
  
  // 参演明星
  stars: {
    starId: string
    roleName: string        // 角色名
    roleType: 'lead' | 'supporting' | 'cameo'  // 戏份类型
  }[]
}
```

---

## 🔗 与 FilmStudio 的集成

### 数据打通
```typescript
// FilmStudio 可以从 AI Stars 获取演员信息
const castFromStar = await aiStarsApi.getStarForCast(starId)

// 返回格式与 FilmStudio Cast 模型兼容
{
  id: string
  name: string
  avatar: string
  type: 'actor' | 'voice' | 'model'
  bio: string
  skills: string[]
  aiGenerated: true
  aiStarId: string  // 关联到 AI Stars
}
```

### API 接口
- `GET /api/stars` - 获取明星列表（支持筛选、搜索）
- `GET /api/stars/:id` - 获取明星详情
- `GET /api/stars/:id/movies` - 获取明星作品
- `POST /api/stars/generate` - AI生成明星
- `GET /api/rankings` - 获取榜单

---

## 📁 项目结构

```
aistars/
├── README.md
├── PROJECT.md            # 本项目文件
├── docs/
│   ├── ARCHITECTURE.md   # 架构文档
│   ├── API.md            # API文档
│   └── PRD.md            # 产品需求文档
├── apps/
│   ├── api/              # 后端
│   │   ├── src/
│   │   ├── prisma/
│   │   └── package.json
│   └── web/              # 前端
│       ├── src/
│       └── package.json
├── memory/
│   ├── decisions.md      # 技术决策
│   └── learnings.md      # 经验总结
└── docker-compose.yml    # 部署配置
```

---

## 🚀 开发计划

### Phase 1: 基础框架 (Week 1)
- [ ] 项目初始化 (NestJS + React)
- [ ] 数据库设计 & Prisma 模型
- [ ] 基础 CRUD API
- [ ] 前端基础页面

### Phase 2: 核心功能 (Week 2)
- [ ] 明星管理系统
- [ ] 分类管理
- [ ] 作品管理
- [ ] 榜单系统

### Phase 3: AI集成 (Week 3)
- [ ] AI生成明星接口
- [ ] 提示词模板系统
- [ ] 批量生成工具
- [ ] AI图片生成

### Phase 4: 优化 & 集成 (Week 4)
- [ ] UI/UX 优化
- [ ] FilmStudio 集成
- [ ] 部署上线

---

## 🎯 差异化特性

1. **AI-Native**: 从底层设计为AI生成和管理虚拟明星
2. **完整人设**: 不仅是外貌，还有完整的性格、背景故事
3. **作品体系**: 虚拟明星可以有完整的影视作品履历
4. **热度系统**: 模拟真实明星的人气波动
5. **FilmStudio 无缝对接**: 一键导入为项目演员

---

*创建时间: 2026-03-16*
*项目负责人: 小鱼*
