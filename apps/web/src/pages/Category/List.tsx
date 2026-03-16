import { Table, Button, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

function CategoryList() {
  const columns = [
    { title: '分类名称', dataIndex: 'name', key: 'name' },
    { title: '类型', dataIndex: 'type', key: 'type' },
    { title: '演员数', dataIndex: 'starCount', key: 'starCount' },
    { title: '操作', key: 'action', render: () => <a>编辑</a> },
  ]

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h1>分类管理</h1>
        <Button type="primary" icon={<PlusOutlined />}>
          新建分类
        </Button>
      </div>
      <Table columns={columns} dataSource={[]} />
    </div>
  )
}

export default CategoryList