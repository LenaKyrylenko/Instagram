
import { CLogout } from '../../components/authorization/LogOut'
import { CSearch } from '../../components/Search_Users'
import { Feed, AddPost, Explore, CUser } from '../../components/HeaderButtons'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'

export const Header = () => {
    return (
      <section className="Header">
        <CLogout className="button" />

       <Row justify="end" align="middle">
    {/* <Col span={18} push={6}> */}
          <Col>
            <CSearch />
          </Col>
          
          {/* <Col span={6} pull={18}> */}
          <Col>
          
            <Feed />
          </Col>
          <Col>
          
            <AddPost />
          </Col>
          <Col>
          
            <Explore />
          </Col>
          <Col>
          
            <CUser />
            </Col>
  </Row>
      </section>
    )
  }
  
const ShowHeader = ({ token }) => (token ? <Header /> : null)
export const CShowHeader = connect((state) => ({
  token: state.auth?.token,
}))(ShowHeader)