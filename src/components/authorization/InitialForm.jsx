import React, { useState } from 'react'
import { Button, Input, Checkbox, Form } from 'antd'
import { Typography, Col, Row } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { validation } from '../../helpers'
const { Title } = Typography
const InitialForm = ({ onLogin, children }) => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [checked, setChecked] = useState(false)
  const input = () => {
    onLogin(login, password) && setPassword('') && setLogin('')
  }
  return (
    <>
      <Form
        size="medium"
        name="basic"
        className="LoginForm-Form"
        autoComplete="off"
      >
        <Title level={2}> {children} </Title>
        <Form.Item
          name="login"
          size="large"
          rules={[
            {
              required: true,
              message: 'Please input login!',
            },
          ]}
          style={{ marginBottom: '5px',  }}
          // wrapperCol={{ offset: 3, span: 17 }}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Login"
            value={login}
            size="medium"
            onChange={(e) => setLogin(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          style={{ margin: '0 auto' }}
          // wrapperCol={{ offset: 3, span: 17 }}
        >
          <p> * Login must be at least 5 characters </p>
        </Form.Item>
        <Form.Item
          name="password"
          size="large"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          style={{ padding: '0 auto', marginBottom: '5px' }}
          // wrapperCol={{ offset: 3, span: 17 }}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
            size="medium"
            type={checked ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          style={{ margin: '0 auto' }}
          // wrapperCol={{ offset: 3, span: 17 }}
        >
          <p>* Use a combination of 8 or more letters, numbers, and symbols</p>
        </Form.Item>

        <Form.Item
          name="checked"
          valuePropName="checked"
          // wrapperCol={{ offset: 0 }}
          style={{ margin: '10px 0px' }}
        >
          <Checkbox
            checked={checked}
            onChange={(e) => {
              setChecked(e.target.checked)
            }}
            size="medium"
          >
            See the password
          </Checkbox>
        </Form.Item>

        <Form.Item
          // wrapperCol={{ offset: 3, span: 17 }}
        >
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            primary
            style={{ width: '100%' }}
            disabled={login.length < 5 || validation(password)}
            onClick={input}
          >
            {children}
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
export default InitialForm
