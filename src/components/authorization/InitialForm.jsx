import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Input, Checkbox, Form, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import { message } from 'antd'
import { useEffect } from 'react'
import { ImportOutlined } from '@ant-design/icons'
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
          // textAlign: 'center',
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
          style={{
            // margin: '0 auto',

            // textAlign: 'center',
          }}
              >
            
          <Input
            value={login}
            size="medium"
            onChange={(e) => setLogin(e.target.value)}
          
          />

           <Text type="secondary" style={{color:'rgb(35, 60, 107)', margin:'20px 5px'}} >
          {' '}
          Login must be at least 5 characters{' '}
        </Text>
              </Form.Item>
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
          // style={{
          //   margin: '0 auto',

          //   // textAlign: 'center',
          // }}
        >
          <Input
            size="medium"
            type={checked ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /> <Text type="secondary"  style={{color:'rgb(35, 60, 107)', margin:'20px 0px'}}>
          Password must contain at least eight characters, include letters,
          numbers and special symbols{' '}
        </Text>
              </Form.Item>
            
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
            className="Btn"
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
        {/* <div style={{textAlign:'left'}}>
                Rules:
                <h4> Login must be at least 5 characters </h4>

          <h4>Password must contain at least eight characters, include letters, numbers and special symbols </h4>
             </div>    */}
      </Form>
    </>
  )
}
export default InitialForm
