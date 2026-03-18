import { Card, Descriptions } from 'antd'
import { useParams } from 'react-router-dom'

function StarDetail() {
  const { id } = useParams()

  return (
    <div>
      <h1>演员详情</h1>
      <Card title="基本信息">
        <Descriptions column={2}>
          <Descriptions.Item label="ID">{id}</Descriptions.Item>
          <Descriptions.Item label="姓名">-</Descriptions.Item>
          <Descriptions.Item label="年龄">-</Descriptions.Item>
          <Descriptions.Item label="性别">-</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  )
}

export default StarDetail