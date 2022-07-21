import React, { useState } from 'react'
import { Button, Input, Checkbox, Form } from 'antd'
import { Typography } from 'antd'

const { Text } = Typography
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
        className="Form"
        size="medium"
        name="basic"
        style={{
          margin: '0 auto',
          margin: '50px',
          padding: '20px',
        }}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 13 }}
        autoComplete="off"
      >
        <h2 style={{}}> {children} </h2>

        <Form.Item
          label="Login"
          name="login"
          size="medium"
          rules={[
            {
              required: true,
              message: 'Please input login!',
            },
          ]}
        >
          <Input
            value={login}
            size="medium"
            onChange={(e) => setLogin(e.target.value)}
          />
        </Form.Item>
        <Text
          type="secondary"
          style={{ color: 'rgb(35, 60, 107)', margin: '20px 5px' }}
        >
          {' '}
          Login must be at least 5 characters{' '}
        </Text>
        <Form.Item
          label="Password"
          name="password"
          size="medium"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input
            size="medium"
            type={checked ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <div style={{ width: '250px', marginLeft: '90px' }}>
          <Text type="secondary" style={{ color: 'rgb(35, 60, 107)' }}>
            Password must contain at least eight characters, include letters,
            numbers and special symbols{' '}
          </Text>
        </div>
        <Form.Item
          name="checked"
          valuePropName="checked"
          wrapperCol={{ offset: 5, span: 10 }}
        >
          <Checkbox
            checked={checked}
            onChange={(e) => {
              setChecked(e.target.checked)
            }}
            size="large"
          >
            See the password
          </Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 13 }}>
          <Button
            size="medium"
            type="primary"
            htmlType="submit"
            primary
            style={{ width: '100%' }}
            disabled={
              login.length < 5 ||
              !/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9!@#$%^&*a-zA-Z]{8,}/g.test(
                password,
              )
            }
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
