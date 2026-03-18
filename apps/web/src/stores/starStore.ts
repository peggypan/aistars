import { create } from 'zustand'
import { starApi, categoryApi, Star, Category, Pagination } from '../services/api'

// 演员列表状态
interface StarListState {
  // 数据
  stars: Star[]
  categories: Category[]
  pagination: Pagination
  
  // 加载状态
  loading: boolean
  categoriesLoading: boolean
  
  // 筛选条件
  keyword: string
  selectedCategory: string | null
  currentPage: number
  pageSize: number
  
  // 操作
  fetchStars: () => Promise<void>
  fetchCategories: () => Promise<void>
  setKeyword: (keyword: string) => void
  setSelectedCategory: (categoryId: string | null) => void
  setPage: (page: number) => void
  setPageSize: (size: number) => void
  resetFilters: () => void
  
  // 删除
  deleteStar: (id: string) => Promise<boolean>
}

export const useStarStore = create<StarListState>((set, get) => ({
  // 初始状态
  stars: [],
  categories: [],
  pagination: {
    page: 1,
    pageSize: 12,
    total: 0,
    totalPages: 0,
  },
  loading: false,
  categoriesLoading: false,
  keyword: '',
  selectedCategory: null,
  currentPage: 1,
  pageSize: 12,

  // 获取演员列表
  fetchStars: async () => {
    const { currentPage, pageSize, keyword, selectedCategory } = get()
    set({ loading: true })
    
    try {
      const response = await starApi.getList({
        page: currentPage,
        pageSize,
        keyword: keyword || undefined,
        categoryId: selectedCategory || undefined,
      })
      
      set({
        stars: response.data,
        pagination: response.pagination,
        loading: false,
      })
    } catch (error) {
      set({ loading: false })
      throw error
    }
  },

  // 获取分类列表
  fetchCategories: async () => {
    set({ categoriesLoading: true })
    
    try {
      const response = await categoryApi.getList()
      set({
        categories: response.data,
        categoriesLoading: false,
      })
    } catch (error) {
      set({ categoriesLoading: false })
      throw error
    }
  },

  // 设置搜索关键词
  setKeyword: (keyword: string) => {
    set({ keyword, currentPage: 1 })
    get().fetchStars()
  },

  // 设置选中分类
  setSelectedCategory: (categoryId: string | null) => {
    set({ selectedCategory: categoryId, currentPage: 1 })
    get().fetchStars()
  },

  // 设置页码
  setPage: (page: number) => {
    set({ currentPage: page })
    get().fetchStars()
  },

  // 设置每页数量
  setPageSize: (size: number) => {
    set({ pageSize: size, currentPage: 1 })
    get().fetchStars()
  },

  // 重置筛选
  resetFilters: () => {
    set({
      keyword: '',
      selectedCategory: null,
      currentPage: 1,
    })
    get().fetchStars()
  },

  // 删除演员
  deleteStar: async (id: string) => {
    try {
      await starApi.delete(id)
      // 刷新列表
      await get().fetchStars()
      return true
    } catch (error) {
      return false
    }
  },
}))
