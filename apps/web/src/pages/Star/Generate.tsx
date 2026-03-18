import { Card, Form, Input, Button, Select, Space } from 'antd'
import { BulbOutlined } from '@ant-design/icons'

const { TextArea } = Input
const { Option } = Select

function StarGenerate() {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log('生成演员:', values)
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
          
          <Form.Item name="gender" label="性别">
            <Select placeholder="选择性别" allowClear>
              <Option value="male">男</Option>
              <Option value="female">女</Option>
              <Option value="other">其他</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" icon={<BulbOutlined />}>
                生成演员
              </Button>
              <Button onClick={() => form.resetFields()}>重置</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default StarGenerate