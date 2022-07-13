
import { CLogout } from '../../components/LoginRegisterLogout'
import { CSearch } from '../../components/Search_Users'
import { Feed, AddPost, Explore, CUser } from '../../components/HeaderButtons'
import { connect } from 'react-redux'

export const Header = () => {
    return (
      <section className="Header">
        <CLogout className="button" />
        <CSearch />
        <Feed />
        <AddPost />
        <Explore />
        <CUser />
      </section>
    )
  }
  
const ShowHeader = ({ token }) => (token ? <Header /> : null)
export const CShowHeader = connect((state) => ({
  token: state.auth?.token,
}))(ShowHeader)