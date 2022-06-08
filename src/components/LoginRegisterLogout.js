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
  



const LoginForm = ({ onLogin, children }) => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
const [checked, setChecked] = useState(false)
  console.log('checked ', checked)
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
  }),
  { onClick: actionAuthLogout },
)('a')

// export const InputForm = ({}) =>

//         <div>
//             если есть акк выберите сигн ин, если нету регистр
//         {console.log('шото есть сук')}
//             <Button> Sign In </Button>
//             <Button> Register </Button>

//         </div>
 
// // CForm

export const InputForm = ({ onLogin, children }) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
  const [checked, setChecked] = useState(false)
    console.log('checked ', checked)
      return (
          <>
              {/* display:'flex', flexDirection:'row', */}
           <div style={{ background:'cyan', top:'0',position:'fixed'}}>
          <h1>  если есть акк выберите сигн ин, если нету регистр</h1>
         {console.log('шото есть сук')}
                      <Link className='Link' to={`/login`}> Sign In </Link>  
            
                      <Link className='Link' to={`/register`}> Register </Link> 

         </div>
      </>
    )
  }
export const CInputForm= connect(
  )(InputForm)