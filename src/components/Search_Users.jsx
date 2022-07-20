import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Row, Col,Avatar, Input,  Popover } from 'antd'
import user from '../materials/user.png'
import { actionSearchUser } from '../actions'
import {UserOutlined,SearchOutlined } from '@ant-design/icons'

import { actionFullProfilePageUser } from '../redux/saga'
import LinkToUser from './LinkToUser'
export const ResultUserFind = ({
  userFind = [],
  handleCancel, 
 
}) => { 
    console.log('user find', userFind) 
  return (
    <div className="ResultUserFind">
      {userFind?.map(({ _id, login, avatar }) => (
       
        <LinkToUser _id={_id} login={login}
        
          avatar={avatar} size={40} padding={'0px'}
          onClick={handleCancel} key={_id} />
      ))}
      </div>
  )
}
const SearchUser = ({ my_Id, onSearch, searchUser, onPageData }) => {
  const onSearchUser = (value) => onSearch(value)
  const { Search } = Input
  return (
    <>
      <Popover
        placement="bottom"
        destroyTooltipOnHide={true}
        size="large"
        content={
          <ResultUserFind
            my_Id={my_Id}
            size={'20px'}
            onPageData={onPageData}
            userFind={searchUser}
          />
        }
      >
        
        <Search
          // style={{ width: '25%' }}
          placeholder="Enter search user"
          allowClear
          prefix={<UserOutlined />}
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
    aboutUser: state.userData?.aboutUser,
    searchUser: state.promise?.searchUser?.payload,
    my_Id: state.auth?.payload?.sub?.id || '',
  }),

  {
    onSearch: actionSearchUser,
    onPageData: actionFullProfilePageUser,
  },
)(SearchUser)
