import { CRegisterForm } from '../../components/authorization/RegisterForm'
import { CLoginForm } from '../../components/authorization/LoginForm'
import logo from '../../materials/login.png'
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom'

export const LoginPageForm = () => (
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
            <Link to="/register" className="Link">
              Register
            </Link>
          </h2>
        </div>
      </Col>
    </Row>
  </div>
)

export const RegisterPageForm = () => (
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
            <Link to="/login" className="Link">
              Login
            </Link>
          </h2>
        </div>
      </Col>
    </Row>
  </div>
)
