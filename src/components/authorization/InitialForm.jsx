import React, { useState } from 'react'
import { Button, Input, Checkbox, Form } from 'antd'
import { Typography, Col, Row } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
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
        // labelCol={{ span: 12}}
        // wrapperCol={{ span: 17 }}
        // labelCol={{xs}}
        autoComplete="off"
      >
        {/* <Col   xs={{ span: 10 }}
        sm={16} md={12} lg={8} xl={4}> */}
     
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
          style={{marginBottom: '5px'}}
          wrapperCol={{ offset: 4, span: 15 }}
        >
           
          <Input prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Login"
            value={login}
            size="medium"
            onChange={(e) => setLogin(e.target.value)}
          />
          
       
        </Form.Item>
        <Form.Item
         style={{margin:'0 auto'}}
          wrapperCol={{ offset: 4, span: 14 }}
        >    
        <p
          >
            {' '}
            * Login must be at least 5 characters{' '}
          </p>
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
          style={{ padding: '0 auto',marginBottom: '5px'}}

          wrapperCol={{ offset: 4, span: 15 }}
        >
           <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
            size="medium"
            type={checked ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          
          />
           
          {/* <Input
            size="medium"
            type={checked ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /> */}
        </Form.Item>
        <Form.Item
         style={{margin:'0 auto'}}
          wrapperCol={{ offset: 3, span: 15 }}
        >   
  <p>
        * Use a combination of 8 or more letters, numbers, and symbols
          </p>
          </Form.Item>
        {/* <Text type="secondary" style={{ color: 'rgb(35, 60, 107)' }}> */}
        {/* style={{ width: '250px', marginLeft: '90px' }} */}

        {/* <Text type="secondary" style={{ color: 'rgb(35, 60, 107)'}}>
            Password must contain at least eight characters, include letters,
            numbers and special symbols{' '}
          </Text> */}

        <Form.Item
          name="checked"
          valuePropName="checked"
          wrapperCol={{ offset: 3, span: 17 }}
          style={{margin: '10px 0px'}}

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

        <Form.Item wrapperCol={{ offset: 4, span: 15 }}>
          <Button
            size="large"
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
        {/* </Col> */}
      </Form>
    
    </>
  )
}
export default InitialForm
