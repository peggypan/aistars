import { Layout, Menu } from 'antd'
import {
  DashboardOutlined,
  StarOutlined,
  AppstoreOutlined,
} from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'

const { Sider } = Layout

function AppSider() {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { key: '/', icon: <DashboardOutlined />, label: '仪表盘' },
    { key: '/stars', icon: <StarOutlined />, label: '演员库' },
    { key: '/categories', icon: <AppstoreOutlined />, label: '分类' },
  ]

  return (
    <Sider width={200} theme="light">
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
        style={{ height: '100%', borderRight: 0 }}
      />
    </Sider>
  )
}

export default AppSider