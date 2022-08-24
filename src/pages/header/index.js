import { CLogout } from '../../components/authorization/LogOut'
import { CSearch } from '../../components/Search_Users'
import {
  Feed,
  AddPost,
  Explore,
  CUser,
  SearchMobile,
} from '../../components/buttons/HeaderButtons'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
import  Root  from '../../components/rootTheme'
import ThemeProvider from '../../providers/ThemeProvider'
export const Header = () => {
  return (
    <section className="Header">


      <Col
        xl={{ offset: 3, span: 17 }}
        lg={{ offset: 4, span: 18 }}
        md={{ offset: 3, span: 17 }}
        sm={{ offset: 3, span: 15 }}
        xs={{ offset: 2, span: 17 }}
        // span={12} offset={6}
      >
        <Row justify="space-between" align="middle">
          <Col
            xl={{span:2, style:{marginBottom:'15px'}}}
            md={{ span: 2 }}
           sm={{ span: 2 }}
            xs={{ span: 2 }}
         
          >
         
          <ThemeProvider>
            <Root />
            </ThemeProvider>
          </Col>
          <Col
           md={{ span: 1 }}
           sm={{ span: 1 }}
           xs={{ span: 1 }}
          >
            <CLogout />
          </Col>
          <Col
            xl={{ offset: 2, span: 13 }}
            lg={{ offset: 2, span: 13 }}
            md={{ span: 0 }}
            sm={{ span: 0 }}
            xs={{ span: 0 }}
            // offset={3}
          >
            <CSearch />
          </Col>
          <Col
            xl={{ offset: 2, span: 1 }}
            lg={{ offset: 2, span: 1 }}
            md={{ span: 1 }}
            sm={{ span: 1 }}
            xs={{ span: 1 }}

            // offset={2}
          >
            <Feed />
          </Col>

          <Col
            xl={{ span: 0 }}
            lg={{ span: 0 }}
            md={{ span: 1 }}
            sm={{ span: 1 }}
            xs={{ span: 1 }}
            // offset={3}
          >
            <SearchMobile />
          </Col>
          <Col
            xl={{ span: 1 }}
            lg={{ span: 1 }}
            md={{ span: 1 }}
            sm={{ span: 1 }}
            xs={{ span: 1 }}
          >
            <AddPost />
          </Col>
          <Col
            lg={{ span: 1 }}
            xl={{ span: 1 }}
            md={{ span: 1 }}
            sm={{ span: 1 }}
            xs={{ span: 1 }}
          >
            <Explore />
          </Col>
          <Col
            xl={{ span: 1 }}
            lg={{ span: 1 }}
            md={{ span: 1 }}
            sm={{ span: 1 }}
            xs={{ span: 1 }}
          >
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
