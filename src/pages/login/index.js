import { CRegisterForm } from "../../components/authorization/RegisterForm"
import { CLoginForm } from "../../components/authorization/LoginForm"
import  logo from '../../materials/logo3.png'
import { Button, Input, Checkbox, Form, Row, Col } from 'antd'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export const InputForm = ({onLogin, children}) => {
    return (
      // <div style={{display:'flex',flexDirection:'row'}}>
      <div className="InputForm">
        <Row>
          <Col span={12}>
            <img className="LoginPage" src={logo} />
          </Col>
  
          <Col span={12}>
            <div className="LoginForm">
              {/* <LoginForm onLogin={onLogin} children={children} /> */}
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

export const LoginPageForm = () => 

        // <div style={{display:'flex',flexDirection:'row'}}>
        <div className="InputForm">
          <Row>
            <Col span={12}>
              <img className="LoginPage" src={logo} />
            </Col>
    
            <Col span={12}>
              <div className="LoginForm">
                        <CLoginForm />
     
                        <h2>
                    Don't have an account yet?
                    <Link to="/register" style={{ color: 'white', marginLeft: '5px' }}>Register</Link>
                  </h2>
            
              </div>
            </Col>
          </Row>
    </div>
        

export const RegisterPageForm = () => 

        // <div style={{display:'flex',flexDirection:'row'}}>
        <div className="InputForm">
          <Row>
            <Col span={12}>
              <img className="LoginPage" src={logo} />
            </Col>
    
            <Col span={12}>
              <div className="LoginForm">
                        <CRegisterForm />
                        <h2>
                   Have an account?
                    <Link to="/login"
                    style={{ color: 'white', marginLeft: '5px' }}>Login</Link>
                  </h2>
               
          </div>
            </Col>
          </Row>
        </div>
