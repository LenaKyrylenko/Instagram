import {
  actionFullLogin,
  actionFullRegister,
  actionAuthLogout,
} from '../actions'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Upload, Button, DatePicker, Input,Checkbox, Form } from 'antd'
import {
    EyeOutlined,EyeInvisibleOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom'
import {actionClearUserData} from '../reducers'
const LoginForm = ({ onLogin, children }) => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [checked, setChecked] = useState(false)
  console.log('LOGIN ', login)
  console.log('PASSWORD ', password)
  
    return (
      <>
        <Form size="large"
              name="basic"
              style={{marginTop:'200px'}}
              labelCol={{ span: 4 }}
                wrapperCol={{ span: 10 }} 

      initialValues={{ remember: true }}  autoComplete="off">
              <h1 style={{marginLeft:'400px'}}> {children} </h1>
      <Form.Item
        label="Login"
            name="login" size="large"
           
            rules={[{ required: true, message: 'Please input login!' }]}>
            
          <Input value={login} size="large" onChange={(e) => setLogin(e.target.value)} />
                  
      </Form.Item>

      <Form.Item
        label="Password"
        name="password" size="large"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
         <Input size="large"
            type={checked ? 'password' : 'text'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
                  />
                  
      </Form.Item>

              <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 4, span: 10 }}>
              <Checkbox checked={checked} onChange={(e) => {
                      setChecked(e.target.checked)
                  }} size="large">
                      See the password
                      </Checkbox>
                  
                       </Form.Item>
        
      <Form.Item wrapperCol={{ offset: 4, span: 10 }}>
        <Button size="large"type="primary" htmlType="submit"  className="Btn"
            disabled={login.length < 5 || password.length < 5}
            onClick={() => onLogin(login, password)}>
          {children}
        </Button>
      </Form.Item>
    </Form>
      {/* <div>
        <h1 style={{ marginTop: '50px' }}> {children}</h1>
          <strong> You must enter at least 5 characters </strong>
          <h2> Login</h2>
          <Input value={login} onChange={(e) => setLogin(e.target.value)} />
          <h2> Password </h2>
          <Input
            type={checked ? 'password' : 'text'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="checkbox"
            checked={checked}
            onChange={(e) => {
              setChecked(e.target.checked)
            }}
          />
          <br />
          <Button
            className="Btn"
            disabled={login.length < 5 || password.length < 5}
            onClick={() => onLogin(login, password)}
          >
            {children}
          </Button>
          {<CAuth />}
      </div> */}
    </>
  )
}
export const CLoginForm = connect(
  (state) => ({
    children: `Sign In`,
  }),
  {
    onLogin: actionFullLogin,
  },
)(LoginForm)

export const CRegisterForm = connect(
  (state) => ({
    children: `Register`,
  }),
  {
    onLogin: actionFullRegister,
  },
)(LoginForm)

export const CLogout = connect(
  (state) => ({
    children: `Logout (${state.auth.payload?.sub?.login || 'Anon'})`,
    // _id: state.auth.payload.sub.id
  }),
  { onClick: actionClearUserData },
)('a')

export const InputForm = ({ }) => {

      return (
          <>
              {/* display:'flex', flexDirection:'row', */}
           <div style={{ background:'cyan', display:'flex',alignItems: 'center'}}>
            <h1>  If you have account, click on SignIn</h1>
          <h1>  If no, click on Register</h1>
            
       
                      <Link className='Link' to={`/login`}> Sign In </Link>  
            
                      <Link className='Link' to={`/register`}> Register </Link> 

         </div>
      </>
    )
  }
export const CInputForm= connect(
  )(InputForm)