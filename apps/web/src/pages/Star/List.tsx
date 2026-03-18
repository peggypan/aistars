import { useEffect, useState } from 'react'
import {
  Button,
  Card,
  Input,
  Select,
  Space,
  Tag,
  Avatar,
  Pagination,
  Empty,
  Skeleton,
  Dropdown,
  Modal,
  message,
  Tooltip,
  Badge,
} from 'antd'
import {
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  ReloadOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  RobotOutlined,
  UserOutlined,
  ExportOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useStarStore } from '../../stores/starStore'
import type { Star, Category } from '../../services/api'
import './Star.css'

const { Option } = Select

// 性别映射
const genderMap: Record<string, { text: string; color: string }> = {
  male: { text: '男', color: 'blue' },
  female: { text: '女', color: 'pink' },
  other: { text: '其他', color: 'default' },
}

// 分类图标映射
const categoryIcons: Record<string, string> = {
  actor: '🎭',
  singer: '🎤',
  host: '🎙️',
  model: '👠',
  other: '⭐',
}

function StarList() {
  const navigate = useNavigate()
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [starToDelete, setStarToDelete] = useState<Star | null>(null)
  
  const {
    stars,
    categories,
    pagination,
    loading,
    categoriesLoading,
    keyword,
    selectedCategory,
    currentPage,
    pageSize,
    fetchStars,
    fetchCategories,
    setKeyword,
    setSelectedCategory,
    setPage,
    setPageSize,
    resetFilters,
    deleteStar,
  } = useStarStore()

  // 初始化加载
  useEffect(() => {
    fetchCategories()
    fetchStars()
  }, [])

  // 处理删除
  const handleDelete = (star: Star) => {
    setStarToDelete(star)
    setDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (!starToDelete) return
    
    const success = await deleteStar(starToDelete.id)
    if (success) {
      message.success(`已删除演员 "${starToDelete.name}"`)
    } else {
      message.error('删除失败，请重试')
    }
    setDeleteModalOpen(false)
    setStarToDelete(null)
  }

  // 操作菜单
  const getActionItems = (star: Star) => [
    {
      key: 'view',
      icon: <EyeOutlined />,
      label: '查看详情',
      onClick: () => navigate(`/stars/${star.id}`),
    },
    {
      key: 'edit',
      icon: <EditOutlined />,
      label: '编辑',
      onClick: () => navigate(`/stars/${star.id}/edit`),
    },
    {
      key: 'export',
      icon: <ExportOutlined />,
      label: '导出到 FilmStudio',
      onClick: () => message.info('导出功能开发中...'),
    },
    { type: 'divider' as const },
    {
      key: 'delete',
      icon: <DeleteOutlined />,
      label: '删除',
      danger: true,
      onClick: () => handleDelete(star),
    },
  ]

  // 渲染演员卡片
  const renderStarCard = (star: Star) => (
    <Card
      key={star.id}
      hoverable
      className="star-card"
      bodyStyle={{ padding: 16 }}
      actions={[
        <Tooltip title="查看详情" key="view">
          <EyeOutlined onClick={() => navigate(`/stars/${star.id}`)} />
        </Tooltip>,
        <Tooltip title="编辑" key="edit">
          <EditOutlined onClick={() => navigate(`/stars/${star.id}/edit`)} />
        </Tooltip>,
        <Dropdown
          key="more"
          menu={{ items: getActionItems(star) }}
          placement="bottomRight"
        >
          <MoreOutlined />
        </Dropdown>,
      ]}
    >
      <div style={{ display: 'flex', gap: 16 }}>
        <Badge
          dot={star.aiGenerated}
          color="purple"
          offset={[-5, 5]}
          title={star.aiGenerated ? 'AI 生成' : ''}
        >
          <Avatar
            size={64}
            src={star.avatar}
            icon={star.aiGenerated ? <RobotOutlined /> : <UserOutlined />}
            style={{
              background: star.aiGenerated
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : '#1890ff',
            }}
          />
        </Badge>
        
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>{star.name}</h3>
            <Tag color={genderMap[star.gender]?.color || 'default'} style={{ fontSize: 11 }}>
              {genderMap[star.gender]?.text || star.gender}
            </Tag>
            <span style={{ color: '#999', fontSize: 12 }}>{star.age}岁</span>
          </div>
          
          {star.categories && star.categories.length > 0 && (
            <div style={{ marginBottom: 8 }}>
              <Space size={4} wrap>
                {star.categories.map((cat: Category) => (
                  <Tag key={cat.id} color="default" style={{ fontSize: 11 }}>
                    {categoryIcons[cat.type] || '⭐'} {cat.name}
                  </Tag>
                ))}
              </Space>
            </div>
          )}
          
          {star.skills && star.skills.length > 0 && (
            <div style={{ marginBottom: 8 }}>
              <Space size={4} wrap>
                {star.skills.slice(0, 3).map((skill: string) => (
                  <Tag key={skill} color="blue" style={{ fontSize: 11 }}>
                    {skill}
                  </Tag>
                ))}
                {star.skills.length > 3 && (
                  <Tag style={{ fontSize: 11 }}>+{star.skills.length - 3}</Tag>
                )}
              </Space>
            </div>
          )}
          
          {star.appearance && (
            <p
              style={{
                margin: 0,
                fontSize: 12,
                color: '#666',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {star.appearance}
            </p>
          )}
        </div>
      </div>
    </Card>
  )

  // 渲染加载骨架屏
  const renderSkeletons = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
      {Array.from({ length: pageSize }).map((_, i) => (
        <Card key={i}>
          <Skeleton active avatar paragraph={{ rows: 3 }} />
        </Card>
      ))}
    </div>
  )

  return (
    <div className="star-list-page">
      {/* 页面头部 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>演员库</h1>
          <p style={{ margin: '4px 0 0', color: '#999' }}>
            共 {pagination.total} 位演员
            {stars.filter((s: Star) => s.aiGenerated).length > 0 &&
              ` · ${stars.filter((s: Star) => s.aiGenerated).length} 位 AI 生成`}
          </p>
        </div>
        
        <Space>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => {
              fetchStars()
              message.success('刷新成功')
            }}
          >
            刷新
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate('/stars/generate')}
          >
            生成演员
          </Button>
        </Space>
      </div>

      {/* 筛选栏 */}
      <Card style={{ marginBottom: 24 }} bodyStyle={{ padding: 16 }}>
        <Space wrap style={{ width: '100%', justifyContent: 'space-between' }}>
          <Space wrap size={12}>
            <Input
              placeholder="搜索演员姓名..."
              prefix={<SearchOutlined />}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              style={{ width: 240 }}
              allowClear
            />
            
            <Select
              placeholder="选择分类"
              value={selectedCategory}
              onChange={(value) => setSelectedCategory(value)}
              style={{ width: 160 }}
              allowClear
              loading={categoriesLoading}
              suffixIcon={<FilterOutlined />}
            >
              {categories.map((cat: Category) => (
                <Option key={cat.id} value={cat.id}>
                  {categoryIcons[cat.type] || '⭐'} {cat.name}
                </Option>
              ))}
            </Select>
            
            {(keyword || selectedCategory) && (
              <Button onClick={resetFilters}>清除筛选</Button>
            )}
          </Space>
          
          <Select
            value={pageSize}
            onChange={(value) => setPageSize(value)}
            style={{ width: 120 }}
          >
            <Option value={12}>12 条/页</Option>
            <Option value={24}>24 条/页</Option>
            <Option value={48}>48 条/页</Option>
          </Select>
        </Space>
      </Card>

      {/* 演员列表 */}
      {loading ? (
        renderSkeletons()
      ) : stars.length === 0 ? (
        <Empty
          description={
            keyword || selectedCategory
              ? '没有找到匹配的演员'
              : '还没有演员，点击右上角生成一个吧！'
          }
          style={{ marginTop: 80 }}
        >
          {!keyword && !selectedCategory && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate('/stars/generate')}
            >
              生成演员
            </Button>
          )}
        </Empty>
      ) : (
        <>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 16,
              marginBottom: 24,
            }}
          >
            {stars.map(renderStarCard)}
          </div>

          {/* 分页 */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={pagination.total}
              showSizeChanger={false}
              showQuickJumper
              showTotal={(total) => `共 ${total} 条`}
              onChange={(page) => setPage(page)}
            />
          </div>
        </>
      )}

      {/* 删除确认弹窗 */}
      <Modal
        title="确认删除"
        open={deleteModalOpen}
        onOk={confirmDelete}
        onCancel={() => {
          setDeleteModalOpen(false)
          setStarToDelete(null)
        }}
        okText="删除"
        cancelText="取消"
        okButtonProps={{ danger: true }}
      >
        <p>
          确定要删除演员 <strong>"{starToDelete?.name}"</strong> 吗？
        </p>
        <p style={{ color: '#999', fontSize: 12 }}>此操作不可恢复</p>
      </Modal>
    </div>
  )
}

export default StarList
