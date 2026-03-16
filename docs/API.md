# API Documentation - AI Stars

## Base URL
```
https://api.aistars.example.com/v1
```

---

## 🌟 明星 API

### 获取明星列表
```http
GET /stars
```

**Query Parameters:**
| 参数 | 类型 | 说明 |
|------|------|------|
| page | number | 页码，默认1 |
| pageSize | number | 每页数量，默认20 |
| category | string | 分类ID筛选 |
| gender | string | 性别筛选 (male/female/other) |
| ageMin | number | 最小年龄 |
| ageMax | number | 最大年龄 |
| search | string | 搜索关键词 |
| sortBy | string | 排序字段 (popularity/fanCount/createdAt) |
| sortOrder | string | 排序方向 (asc/desc) |

**Response:**
```json
{
  "data": [
    {
      "id": "star-001",
      "name": "林逸飞",
      "avatar": "https://...",
      "age": 28,
      "gender": "male",
      "nationality": "中国",
      "categories": [
        { "id": "cat-001", "name": "武打明星", "type": "actor" }
      ],
      "popularity": 95.5,
      "fanCount": 1250000,
      "aiGenerated": true
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

### 获取明星详情
```http
GET /stars/:id
```

**Response:**
```json
{
  "id": "star-001",
  "name": "林逸飞",
  "realName": "林天宇",
  "avatar": "https://...",
  "age": 28,
  "gender": "male",
  "nationality": "中国",
  "personality": ["沉稳", "内敛", "敬业"],
  "background": "出生于武术世家，从小习武...",
  "skills": ["咏春拳", "剑术", "马术", "京剧"],
  "appearance": "剑眉星目，身高185cm，体型健硕...",
  "style": "运动休闲风，偏爱黑色系",
  "signature": "标志性的武术起手式",
  "categories": [...],
  "debutYear": 2018,
  "agency": "星辰娱乐",
  "fanCount": 1250000,
  "popularity": 95.5,
  "viewCount": 5000000,
  "aiGenerated": true,
  "aiPrompt": "一个28岁的中国武打男演员...",
  "movies": [
    {
      "id": "movie-001",
      "title": "龙影传说",
      "type": "movie",
      "poster": "https://...",
      "releaseYear": 2023,
      "roleName": "龙飞",
      "roleType": "lead",
      "performanceRating": 9.2
    }
  ],
  "rankings": [
    {
      "rankingId": "rank-001",
      "rankingName": "人气榜",
      "rank": 3,
      "score": 95.5
    }
  ]
}
```

### 创建明星
```http
POST /stars
```

**Request Body:**
```json
{
  "name": "林逸飞",
  "age": 28,
  "gender": "male",
  "nationality": "中国",
  "categories": ["cat-001", "cat-002"],
  "personality": ["沉稳", "内敛"],
  "skills": ["咏春拳", "剑术"],
  "appearance": "剑眉星目，身高185cm...",
  "background": "出生于武术世家..."
}
```

### AI生成明星
```http
POST /stars/generate
```

**Request Body:**
```json
{
  "prompt": "创建一个28岁的中国武打男明星，性格沉稳内敛，精通咏春拳和剑术",
  "categoryIds": ["cat-001"],
  "generateImage": true,
  "imageStyle": "realistic"  // realistic/anime/3d
}
```

**Response:**
```json
{
  "id": "star-new-001",
  "name": "林逸飞",
  "avatar": "https://...",
  "age": 28,
  "gender": "male",
  "personality": ["沉稳", "内敛", "专注"],
  "skills": ["咏春拳", "剑术", "马术"],
  "appearance": "剑眉星目，身高185cm，体型健硕...",
  "background": "出生于武术世家，8岁开始习武...",
  "aiGenerated": true,
  "aiPrompt": "...",
  "aiModel": "gpt-4-vision"
}
```

### 批量生成明星
```http
POST /stars/generate-batch
```

**Request Body:**
```json
{
  "count": 5,
  "categoryIds": ["cat-001"],
  "variations": [
    { "gender": "male", "ageRange": [25, 35] },
    { "gender": "female", "ageRange": [20, 30] }
  ]
}
```

---

## 🏷️ 分类 API

### 获取分类列表
```http
GET /categories
```

**Query Parameters:**
| 参数 | 类型 | 说明 |
|------|------|------|
| type | string | 按类型筛选 |
| tree | boolean | 返回树形结构 |

**Response:**
```json
{
  "data": [
    {
      "id": "cat-001",
      "name": "武打明星",
      "type": "actor",
      "icon": "🥋",
      "color": "#ff4757",
      "description": "擅长武术动作的演员",
      "starCount": 45,
      "children": [
        { "id": "cat-001-1", "name": "功夫明星", ... }
      ]
    }
  ]
}
```

---

## 🎬 作品 API

### 获取作品列表
```http
GET /movies
```

### 获取作品详情
```http
GET /movies/:id
```

### 创建作品
```http
POST /movies
```

### 添加明星到作品
```http
POST /movies/:id/stars
```

**Request Body:**
```json
{
  "starId": "star-001",
  "roleName": "龙飞",
  "roleType": "lead"
}
```

---

## 📊 榜单 API

### 获取榜单列表
```http
GET /rankings
```

**Response:**
```json
{
  "data": [
    {
      "id": "rank-001",
      "name": "人气榜",
      "type": "popularity",
      "icon": "🔥",
      "color": "#ff4757",
      "updateCycle": "hourly",
      "lastUpdated": "2026-03-16T10:00:00Z"
    }
  ]
}
```

### 获取榜单详情
```http
GET /rankings/:id
```

**Response:**
```json
{
  "id": "rank-001",
  "name": "人气榜",
  "entries": [
    {
      "rank": 1,
      "star": { ... },
      "score": 98.5,
      "change": 2,  // 上升2位
      "fanCount": 2000000
    },
    {
      "rank": 2,
      "star": { ... },
      "score": 95.2,
      "change": -1,  // 下降1位
      "fanCount": 1800000
    }
  ]
}
```

### 刷新榜单
```http
POST /rankings/:id/refresh
```

---

## 🔗 FilmStudio 集成 API

### 导出明星为演员
```http
GET /stars/:id/export-for-filmstudio
```

**Response:**
```json
{
  "id": "star-001",
  "name": "林逸飞",
  "avatar": "https://...",
  "type": "actor",
  "bio": "28岁中国武打演员，精通咏春拳和剑术...",
  "skills": ["咏春拳", "剑术", "马术"],
  "aiGenerated": true,
  "aiStarId": "star-001",
  "metadata": {
    "personality": ["沉稳", "内敛"],
    "appearance": "剑眉星目...",
    "signature": "标志性的武术起手式"
  }
}
```

### 获取适合角色的明星推荐
```http
POST /stars/recommend-for-role
```

**Request Body:**
```json
{
  "roleDescription": "需要一个会武术的男主角，性格沉稳",
  "requirements": {
    "gender": "male",
    "ageRange": [25, 35],
    "skills": ["武术"]
  },
  "limit": 5
}
```

---

## 📈 统计 API

### 获取平台统计
```http
GET /stats
```

**Response:**
```json
{
  "totalStars": 150,
  "totalMovies": 320,
  "totalCategories": 12,
  "todayNewStars": 5,
  "todayViews": 15000,
  "topCategory": {
    "id": "cat-001",
    "name": "武打明星",
    "starCount": 45
  }
}
```

---

## 🔐 认证

所有 API 需要在 Header 中携带认证信息：
```http
Authorization: Bearer <token>
```

---

## ❌ 错误码

| 状态码 | 说明 |
|--------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权 |
| 404 | 资源不存在 |
| 429 | 请求过于频繁 |
| 500 | 服务器错误 |
