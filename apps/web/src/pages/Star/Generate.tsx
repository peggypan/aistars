import { Card, Form, Input, Button, Select, Space, Row, Col, message } from 'antd'
import { BulbOutlined, SkinOutlined, SmileOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { starApi } from '../../services/api'
import { useNavigate } from 'react-router-dom'

const { TextArea } = Input
const { Option } = Select

// 风格预设选项
const stylePresets = [
  { value: 'elegant', label: '优雅', emoji: '💃' },
  { value: 'street', label: '街头', emoji: '🛹' },
  { value: 'vintage', label: '复古', emoji: '🎩' },
  { value: 'casual', label: '休闲', emoji: '👕' },
  { value: 'business', label: '商务', emoji: '💼' },
  { value: 'sporty', label: '运动', emoji: '⚽' },
  { value: 'bohemian', label: '波西米亚', emoji: '🌸' },
  { value: 'minimalist', label: '极简', emoji: '⬜' },
]

// 性格预设选项
const personalityPresets = [
  { value: 'calm', label: '冷静', emoji: '😌' },
  { value: 'energetic', label: '活泼', emoji: '⚡' },
  { value: 'rational', label: '理性', emoji: '🧠' },
  { value: 'emotional', label: '感性', emoji: '💝' },
  { value: 'confident', label: '自信', emoji: '💪' },
  { value: 'shy', label: '害羞', emoji: '😊' },
  { value: 'humorous', label: '幽默', emoji: '😄' },
  { value: 'serious', label: '严肃', emoji: '😐' },
  { value: 'optimistic', label: '乐观', emoji: '🌞' },
  { value: 'pessimistic', label: '悲观', emoji: '🌧️' },
]

function StarGenerate() {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [selectedStyle, setSelectedStyle] = useState<string>()
  const [selectedPersonality, setSelectedPersonality] = useState<string>()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values: any) => {
    setLoading(true)
    try {
      const result = await starApi.generate({
        prompt: values.prompt,
        gender: values.gender,
        ageRange: values.ageRange,
        stylePreset: values.stylePreset,
        personalityPreset: values.personalityPreset,
      })
      
      message.success(`演员 "${result.data.name}" 生成成功！`)
      navigate(`/stars/${result.data.id}`)
    } catch (error: any) {
      message.error('生成失败：' + (error.message || '未知错误'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>AI生成演员</h1>
      <Card>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="prompt"
            label="角色描述"
            rules={[{ required: true, message: '请输入角色描述' }]}
          >
            <TextArea
              rows={4}
              placeholder="例如：25岁的女黑客，性格冷酷但内心善良，赛博朋克风格"
            />
          </Form.Item>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="gender" label="性别">
                <Select placeholder="选择性别" allowClear>
                  <Option value="male">男</Option>
                  <Option value="female">女</Option>
                  <Option value="other">其他</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="ageRange" label="年龄范围">
                <Select placeholder="选择年龄范围" allowClear>
                  <Option value={[18, 25]}>18-25岁</Option>
                  <Option value={[26, 35]}>26-35岁</Option>
                  <Option value={[36, 45]}>36-45岁</Option>
                  <Option value={[46, 60]}>46-60岁</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* 风格预选 */}
          <Form.Item 
            name="stylePreset" 
            label={<><SkinOutlined /> 风格预选</>}
          >
            <Select 
              placeholder="选择穿搭风格（可选）" 
              allowClear
              onChange={setSelectedStyle}
            >
              {stylePresets.map(s => (
                <Option key={s.value} value={s.value}>
                  {s.emoji} {s.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* 性格预选 */}
          <Form.Item 
            name="personalityPreset" 
            label={<><SmileOutlined /> 性格预选</>}
          >
            <Select 
              placeholder="选择性格特点（可选）" 
              allowClear
              onChange={setSelectedPersonality}
            >
              {personalityPresets.map(p => (
                <Option key={p.value} value={p.value}>
                  {p.emoji} {p.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* 预览 */}
          {(selectedStyle || selectedPersonality) && (
            <Card size="small" style={{ marginBottom: 24, background: '#f6ffed' }}>
              <div style={{ fontWeight: 'bold', marginBottom: 8 }}>🎯 生成配置预览</div>
              <div>
                {selectedStyle && (
                  <span style={{ marginRight: 16 }}>
                    风格: {stylePresets.find(s => s.value === selectedStyle)?.emoji} 
                    {stylePresets.find(s => s.value === selectedStyle)?.label}
                  </span>
                )}
                {selectedPersonality && (
                  <span>
                    性格: {personalityPresets.find(p => p.value === selectedPersonality)?.emoji} 
                    {personalityPresets.find(p => p.value === selectedPersonality)?.label}
                  </span>
                )}
              </div>
            </Card>
          )}

          <Form.Item>
            <Space>
              <Button 
                type="primary" 
                htmlType="submit" 
                icon={<BulbOutlined />}
                loading={loading}
              >
                生成演员
              </Button>
              <Button onClick={() => {
                form.resetFields()
                setSelectedStyle(undefined)
                setSelectedPersonality(undefined)
              }}>重置</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default StarGenerate