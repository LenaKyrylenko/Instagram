import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Row, Col,Avatar, Input,  Popover } from 'antd'
import user from '../materials/user.png'
import { actionSearchUser } from '../actions'
import {UserOutlined } from '@ant-design/icons'

import { actionFullProfilePageUser } from '../redux/thunk'
export const ResultUserFind = ({
  userFind = [],
  handleCancel,
}) => { 
  return (
    <div className="ResultUserFind">
      {userFind?.map(({ _id, login, avatar }) => (
        <Link to={`/profile/${_id}`} onClick={handleCancel} key={_id}>
          <Row>
            <Col offset={1}>
              {avatar?.url ? (
                <Avatar
                  style={{
                    width: '50px',
                    height: '50px',
                    marginBottom: '10px',
                  }}
                  src={'/' + avatar?.url}
                />
              ) : (
                <Avatar
                  style={{
                    width: '50px',
                    height: '50px',
                    marginBottom: '10px',
                  }}
                  src={user}
                />
              )}
            </Col>
            <Col offset={1}>
              <h3 style={{ marginBottom: '20px' }}> {login || 'Anon'}</h3>
            </Col>
          </Row>
        </Link>
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
          style={{ width: '25%' }}
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
    aboutUser: state.profilePage?.aboutUser,
    searchUser: state.promise?.searchUser?.payload,
    my_Id: state.auth?.payload?.sub?.id || '',
  }),

  {
    onSearch: actionSearchUser,
    onPageData: actionFullProfilePageUser,
  },
)(SearchUser)
