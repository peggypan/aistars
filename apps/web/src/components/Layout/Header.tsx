import { Layout, Typography } from 'antd'
import { StarOutlined } from '@ant-design/icons'

const { Header } = Layout
const { Title } = Typography

function AppHeader() {
  return (
    <Header style={{ display: 'flex', alignItems: 'center', background: '#001529' }}>
      <StarOutlined style={{ color: '#fff', fontSize: 24, marginRight: 12 }} />
      <Title level={4} style={{ color: '#fff', margin: 0 }}>
        AI Stars
      </Title>
    </Header>
  )
}

export default AppHeader