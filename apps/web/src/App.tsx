import { Routes, Route } from 'react-router-dom'
import { Layout } from 'antd'
import AppHeader from './components/Layout/Header'
import AppSider from './components/Layout/Sider'
import StarList from './pages/Star/List'
import StarDetail from './pages/Star/Detail'
import StarGenerate from './pages/Star/Generate'
import CategoryList from './pages/Category/List'
import Dashboard from './pages/Dashboard'
import './App.css'

const { Content } = Layout

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppHeader />
      <Layout>
        <AppSider />
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/stars" element={<StarList />} />
            <Route path="/stars/:id" element={<StarDetail />} />
            <Route path="/stars/generate" element={<StarGenerate />} />
            <Route path="/categories" element={<CategoryList />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  )
}

export default App