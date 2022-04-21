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
export const ResultUserFind = ({ userFind }) => (
    <div>
      {userFind?.map(({ _id, login, avatar }) => (
        <Link to={`/profile/${_id}`}>
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
    </div>
)
 const SearchUser = ({ onSearch, searchUser }) => {
    // const [value, setValue]=useState('')
    const onSearchUser = (value) => onSearch(value)
    const { Search } = Input
    return (
      <>
        <Popover
          placement="bottom"
          content={<ResultUserFind userFind={searchUser} />}
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
    (state) => ({ searchUser: state.promise?.searchUser?.payload }),
    { onSearch: actionSearchUser },
  )(SearchUser)