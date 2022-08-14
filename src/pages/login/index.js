import { CRegisterForm } from '../../components/authorization/RegisterForm'
import { CLoginForm } from '../../components/authorization/LoginForm'
import logo from '../../materials/login.png'
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import { Typography } from 'antd'
const {Title } = Typography
export const LoginPageForm = () => (
  <div className="InputForm">
    <Row gutter={[16, 16]}>
      
      <Col
        // span={12}
        xl={{ span: 10 }}
        lg={{ span: 8 }}
        md={{ span: 0 }}
        sm={{ span: 0}}   >
        {/* xl={4} */}
        
        <img  src={logo} />
       
      </Col>


      <Col xl={{ span: 14}}
        lg={{ span: 16 }}
        // md={{  span: 15 }}
        sm={{ span: 10 }}
         >
        <div className="LoginForm">
          <section>
          <Title style={{
           
            color: 'rgb(16, 30, 54)',
            // width: '100%'float: 'left', 
          }} level={3} >Welcome to Memogram! </Title>
      
          </section>
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
      <Col span={12}>
        <img src={logo} />
      </Col>

      <Col span={12}>
        <div className="LoginForm">
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
