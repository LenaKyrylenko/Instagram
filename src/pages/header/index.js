import { CLogout } from '../../components/authorization/LogOut'
import { CSearch } from '../../components/Search_Users'
import { Feed, AddPost, Explore, CUser } from '../../components/buttons/HeaderButtons'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'

export const Header = () => {
  return (
    <section className="Header">
      <Col span={12} offset={6}>
        <Row justify="space-between" align="middle">
          <Col>
            <CLogout className="button" />
          </Col>
          <Col offset={3}>
            <CSearch />
          </Col>
          <Col offset={2}>
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
      </Col>
    </section>
  )
}

const ShowHeader = ({ token }) => (token ? <Header /> : null)
export const CShowHeader = connect((state) => ({
  token: state.auth?.token,
}))(ShowHeader)
