// API 基础配置
const API_BASE_URL = 'http://localhost:3001'

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }))
    throw new ApiError(response.status, error.message || `HTTP ${response.status}`)
  }

  return response.json()
}

// 演员相关 API
export const starApi = {
  // 获取演员列表
  getList: (params?: { page?: number; pageSize?: number; keyword?: string; categoryId?: string }) => {
    const query = new URLSearchParams()
    if (params?.page) query.set('page', String(params.page))
    if (params?.pageSize) query.set('pageSize', String(params.pageSize))
    if (params?.keyword) query.set('keyword', params.keyword)
    if (params?.categoryId) query.set('categoryId', params.categoryId)
    
    return fetchApi<{ data: Star[]; pagination: Pagination }>(`/stars?${query.toString()}`)
  },

  // 获取演员详情
  getById: (id: string) => fetchApi<Star>(`/stars/${id}`),

  // 创建演员
  create: (data: CreateStarData) => fetchApi<Star>('/stars', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // 更新演员
  update: (id: string, data: UpdateStarData) => fetchApi<Star>(`/stars/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  // 删除演员
  delete: (id: string) => fetchApi<void>(`/stars/${id}`, {
    method: 'DELETE',
  }),

  // AI 生成演员
  generate: (data: GenerateStarData) => fetchApi<{ success: boolean; data: Star }>('/stars/generate', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
}

// 分类相关 API
export const categoryApi = {
  getList: () => fetchApi<{ data: Category[] }>('/categories'),
  getById: (id: string) => fetchApi<Category>(`/categories/${id}`),
}

// 类型定义
// 风格预设类型
export type StylePreset = 'elegant' | 'street' | 'vintage' | 'casual' | 'business' | 'sporty' | 'bohemian' | 'minimalist'

// 性格预设类型
export type PersonalityPreset = 'calm' | 'energetic' | 'rational' | 'emotional' | 'confident' | 'shy' | 'humorous' | 'serious' | 'optimistic' | 'pessimistic'

export interface Star {
  id: string
  name: string
  age: number
  gender: 'male' | 'female' | 'other'
  nationality: string
  personality: string[]
  personalityPreset?: PersonalityPreset
  background: string
  skills: string[]
  appearance: string
  style: string
  stylePreset?: StylePreset
  signature?: string
  avatar?: string
  categories?: Category[]
  aiGenerated: boolean
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  type: 'actor' | 'singer' | 'host' | 'model' | 'other'
  icon?: string
  description?: string
  sortOrder: number
  starCount: number
  createdAt: string
}

export interface Pagination {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export interface CreateStarData {
  name: string
  age: number
  gender: 'male' | 'female' | 'other'
  nationality?: string
  personality?: string[]
  personalityPreset?: PersonalityPreset
  background?: string
  skills?: string[]
  appearance?: string
  style?: string
  stylePreset?: StylePreset
  categoryIds?: string[]
}

export interface UpdateStarData extends Partial<CreateStarData> {}

export interface GenerateStarData {
  prompt?: string
  gender?: 'male' | 'female' | 'other'
  ageRange?: [number, number]
  categoryIds?: string[]
  stylePreset?: StylePreset
  personalityPreset?: PersonalityPreset
}
