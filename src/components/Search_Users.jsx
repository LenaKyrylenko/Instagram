import { connect } from 'react-redux'
import { Input, Popover } from 'antd'
import { actionSearchUser } from '../actions/query/searchUserQuery'
import { UserOutlined } from '@ant-design/icons'

import { actionFullProfilePageUserTypeSaga } from '../actions/typeSaga/userTypesSaga'
import LinkToUser from './LinkToUser'
export const ResultUserFind = ({ userFind = [], handleCancel }) => {
  return (
    <div className="ResultUserFind">
      {userFind?.map(({ _id, login, avatar }) => (
        <LinkToUser
          _id={_id}
          login={login}
          avatar={avatar}
          padding={'5px'}
          onClick={handleCancel}
          key={_id}
        />
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
    onPageData: actionFullProfilePageUserTypeSaga,
  },
)(SearchUser)
