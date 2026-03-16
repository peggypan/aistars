import { Button, Table, Space, Input } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

function StarList() {
  const navigate = useNavigate()

  const columns = [
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '年龄', dataIndex: 'age', key: 'age' },
    { title: '性别', dataIndex: 'gender', key: 'gender' },
    { title: '操作', key: 'action', render: () => <a>查看</a> },
  ]

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h1>演员库</h1>
        <Space>
          <Input placeholder="搜索演员" prefix={<SearchOutlined />} />
          <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/stars/generate')}>
            生成演员
          </Button>
        </Space>
      </div>
      <Table columns={columns} dataSource={[]} />
    </div>
  )
}

export default StarList