import { Card, Statistic, Row, Col } from 'antd'
import { StarOutlined, TeamOutlined, VideoCameraOutlined } from '@ant-design/icons'

function Dashboard() {
  return (
    <div>
      <h1>仪表盘</h1>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="演员总数"
              value={0}
              prefix={<StarOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="分类数量"
              value={0}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="作品总数"
              value={0}
              prefix={<VideoCameraOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard