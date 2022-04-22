import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Avatar, Input } from 'antd'
import { Carousel, Popover } from 'antd'
import user from '../materials/user.png'

import {
    actionAboutMe,
    actionAllPostsFeed,
    actionAllPosts,
    actionSetAvatar,
    actionPostsFeed,
    actionAllFollowing,
    actionAllFollowers,
    actionPostsMyFollowing2,
  actionSearchUser,
 
} from '../actions'
  import {actionFullProfilePage} from '../reducers'
export const ResultUserFind = ({ my_Id, userFind = [], onPageData }) => {
  
  const checkMyId = userFind.find(user => user?._id === my_Id)

  checkMyId ? (console.log('да єто мой айди ти чо')) : console.log('ЦЕ НЕ МИЙ АЙДИ')
  
   return(<div>
     {
       userFind?.map(({ _id, login, avatar }) => (
        
        <Link onClick={()=>onPageData(_id)} to={`/profile/${_id}`}>
          
          {console.log('Login: ', login, '  _id: ', _id)}
          <Avatar
            style={{
              width: '20px',
              height: '20px',
              marginRight: '30px',
              position: 'absolute',
            }}
            src={'/' + avatar?.url || user}
          />
  
          <h3 style={{ marginLeft: '30px' }}> {login}</h3>
        </Link>
      ))}
</div>)
}
 const SearchUser = ({my_Id, onSearch, searchUser,onPageData }) => {
    // const [value, setValue]=useState('')
    const onSearchUser = (value) => onSearch(value)
    const { Search } = Input
    return (
      <>
        <Popover
          placement="bottom"
          content={<ResultUserFind my_Id={my_Id} onPageData={onPageData} userFind={searchUser} />}
          trigger="click"
        >
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearchUser}
          />
        </Popover>
      </>
    )
  }
 export const CSearch = connect(
   (state) => ({
    aboutMe: state.profileData?.aboutMe,
     searchUser: state.promise?.searchUser?.payload,
     my_Id: state.auth.payload.sub.id || '',
   }),

   {
     onSearch: actionSearchUser,
     onPageData:actionFullProfilePage
   },
  )(SearchUser)