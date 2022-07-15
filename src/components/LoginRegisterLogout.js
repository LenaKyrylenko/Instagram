import { actionFullLogin, actionFullRegister, actionClearPromise}
 from '../actions'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Input, Checkbox, Form } from 'antd'
import { Link } from 'react-router-dom'
import { actionClearUserData } from '../redux/saga'
import { message } from 'antd'
import { useEffect } from 'react'
import { LogOut } from './HeaderButtons'

const LoginForm = ({ onLogin, children, auth,register, onClearPromise }) => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [checked, setChecked] = useState(false)
  useEffect(() => {
    if (auth?.status === 'FULFILLED' && auth?.payload === null) {
      message.error({
        content: 'You entered wrong login or password',
        style: {
          marginTop: '80px',
        },
      })
    }
  }, [auth])
  
  useEffect(() => {
    if (register?.status === 'FULFILLED' && register?.payload === null) {
      message.error({
        content: 'This login is already in the database',
        style: {
          marginTop: '80px',
        },
      })
      &&
      onClearPromise('register')
  
    }
  }, [register])
  const input = () => {
    onLogin(login, password)
      // &&
    // onClearPromise('auth')
  }
  return (
    <>
      <center>
        <Form
          className="Form"
          size="large"
          name="basic"
          style={{
            marginTop: '200px',
            padding: '100px',
            width:'50%'
          }}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <h1> {children} </h1>
          <h1> Login and password must be at least 5 characters </h1>
          <Form.Item
            label="Login"
            name="login"
            size="large"
            rules={[{ required: true, message: 'Please input login!' }]}
          >
            <Input
              value={login}
              size="large"
              onChange={(e) => setLogin(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            size="large"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input
              size="large"
              type={checked ? 'password' : 'text'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 10 }}
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

          <Form.Item wrapperCol={{ offset: 8, span: 10 }}>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              primary
              style={{ width: '100%' }}
              className="Btn"
              disabled={login.length < 5 || password.length < 5}
              onClick={input}
            >
              {children}
            </Button>
          </Form.Item>
        </Form>
      </center>
    </>
  )
}
export const CLoginForm = connect(
  (state) => ({
    children: `Sign In`,
    auth: state.promise?.auth,
  }),
  {
    onLogin: actionFullLogin,
    onClearPromise:actionClearPromise

  },
)(LoginForm)

export const CRegisterForm = connect(
  (state) => ({
    children: `Register`,
    register: state.promise?.register
  }),
  {
    onLogin: actionFullRegister,
    onClearPromise:actionClearPromise

  },
)(LoginForm)

export const CLogout = connect(
  null,{ onClick: actionClearUserData },
)(LogOut)

export const InputForm = ({}) => {
  return (
    <>
      <center>
        <div className="InputForm">
          <h1>
            {' '}
            If you have account, click on Sign In,
            <br />
            else - click on Register
          </h1>
          <div>
            <Link to={`/login`}>
              <Button
                style={{
                  margin: '50px',
                  width: '100px',
                  boxShadow:
                    '0 5px 10px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
                }}
                size="large"
                type="primary"
              >
                Sign In
              </Button>
            </Link>

            <Link to={`/register`}>
              <Button
                style={{
                  marginLeft: '100px',
                  width: '100px',
                  boxShadow:
                    '0 5px 10px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
                }}
                size="large"
                type="primary"
              >
                Register
              </Button>
            </Link>
          </div>
        </div>
      </center>
    </>
  )
}
export const CInputForm = connect()(InputForm)
