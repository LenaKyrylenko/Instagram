import { CRegisterForm } from '../../components/authorization/RegisterForm'
import { CLoginForm } from '../../components/authorization/LoginForm'
import logo from '../../materials/login.png'
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import { Typography } from 'antd'
const { Title } = Typography
export const LoginPageForm = () => (
  <div className="InputForm">
    <Row gutter={[16, 16]}>
      <Col
        // span={12}
        xl={{ span: 10 }}
        lg={{ span: 8 }}
        md={{ span: 0 }}
        sm={{ span: 0 }}
        xs={{span: 0 }}
      >
        {/* xl={4} */}

        <img src={logo} />
      </Col>

      <Col
        xl={{ offset:0, span: 14 }}
        lg={{ offset:0, span: 16 }}
        md={{ offset:2, span: 22 }}
        sm={{offset:2, span: 22  }}
        xs={{offset:1, span: 22  }}

      >
        <div className="LoginForm">
         
            <p
              style={{
                color: 'rgb(224, 236, 244)'
                // width: '100%'float: 'left',
              }}
            >
              Welcome to Memogram!{' '}
            </p>
         
          <CLoginForm />

          <p>
            Don't have an account yet?
            <Link to="/register" className="Link">
              Register
            </Link>
          </p>
        </div>
      </Col>
    </Row>
  </div>
)

export const RegisterPageForm = () => (
  <div className="InputForm">
    <Row>
      <Col   xl={{ span: 10 }}
        lg={{ span: 8 }}
        md={{ span: 0 }}
        sm={{ span: 0 }}
        xs={{span: 0 }}
      
      >
        <img src={logo}
        
        />
      </Col>

      <Col xl={{ offset:0, span: 14 }}
        lg={{ offset:0, span: 16 }}
        md={{ offset:2, span: 22 }}
        sm={{offset:2, span: 22}}
        xs={{offset:1, span: 22  }}

      >
        <div className="LoginForm">
            <p
              style={{
                color: 'rgb(224, 236, 244)'
                // width: '100%'float: 'left',
              }}
            >
              Welcome to Memogram!{' '}
            </p>
          <CRegisterForm />
          <p>
            Have an account?
            <Link to="/login" className="Link">
              Login
            </Link>
          </p>
        </div>
      </Col>
    </Row>
  </div>
)
