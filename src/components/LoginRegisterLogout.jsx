import { actionFullRegister, actionClearPromise } from '../actions'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Input, Checkbox, Form, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import { actionClearUserData } from '../redux/saga'
import { message } from 'antd'
import { useEffect } from 'react'
import { LogOut } from './HeaderButtons'
import { ImportOutlined } from '@ant-design/icons'
import {
  actionClearDataLogoutTypeSaga,
  actionLoginTypeSaga,
  actionRegisterTypeSaga,
} from '../redux/saga'
import logo from '../materials/logo3.png'

const LoginForm = ({ onLogin, children, auth, register, onClearPromise }) => {
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
    }
  }, [register])
  const input = () => {
    onLogin(login, password) && setPassword('') && setLogin('')
    // &&
    // onClearPromise('auth')
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
          textAlign: 'center',
        }}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 13 }}
        autoComplete="off"
      >
        <h2 style={{}}> {children} </h2>
        <h4> Login and password must be at least 5 characters </h4>
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
            disabled={login.length < 5 || password.length < 5}
            onClick={input}
          >
            {children}
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
export const CLogout = connect(null, {
  onClick: actionClearDataLogoutTypeSaga,
})(LogOut)

export const InputForm = ({onLogin,auth,register, children}) => {
  return (
    // <div style={{display:'flex',flexDirection:'row'}}>
    <div className="InputForm">
      <Row>
        <Col span={12}>
          <img className="LoginPage" src={logo} />
        </Col>

        <Col span={12}>
          <div className="LoginForm">
            <LoginForm onLogin={onLogin} auth={auth} children={children} />
            {children === "Register" ?
                <h2>
               Have an account?
                <Link to="/login"
                style={{ color: 'white', marginLeft: '5px' }}>Login</Link>
              </h2>
              :
              <h2>
                Don't have an account yet?
                <Link to="/register" style={{ color: 'white', marginLeft: '5px' }}>Register</Link>
              </h2>
            }
          </div>
        </Col>
      </Row>
    </div>

  )
}
// export const CInputForm = connect()(InputForm)
export const CLoginForm = connect(
  (state) => ({
    children: `Sign In`,
    auth: state.promise?.auth,
  }),
  {
    onLogin: actionLoginTypeSaga,
    // onClearPromise: actionClearPromise,
  },
)(InputForm)
export const CRegisterForm = connect(
  (state) => ({
    children: `Register`,
    register: state.promise?.register,
  }),
  {
    onLogin: actionRegisterTypeSaga,
    onClearPromise: actionClearPromise,
  },
)(InputForm)