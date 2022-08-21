import { connect } from 'react-redux'
import { Input, Popover } from 'antd'
import { actionSearchUser } from '../../actions/query/searchUserQuery'
import { UserOutlined } from '@ant-design/icons'

import { actionFullProfilePageUserTypeSaga } from '../../actions/typeSaga/userTypesSaga'
import LinkToUser from '../../components/LinkToUser'
export const ResultUserFind = ({text, userFind = [], handleCancel }) => {
  return (
    <div className="ResultUserFindMobile">
      
      {userFind ?
      userFind?.map(({ _id, login, avatar }) => (
        <LinkToUser
          _id={_id}
          login={login}
          avatar={avatar}
          size={50}
              padding={'10px'}
              font={'20px'}
          onClick={handleCancel}
          key={_id}
        />
      ))
        :
        <p> Not found by request "{text} "</p>
    }
    </div>
  )
}

const SearchUser = ({my_Id, onSearch, searchUser, onPageData }) => {
  // const [value, setSearch] = useState('')
  // const onSearchUser = onSearch(setSearch(value))
  const onSearchUser = (value) =>
    console.log('value ', value)&&
    onSearch(value)
    const { Search } = Input
    // console.log('value ', value)
  return (
      <>
        {/* <Popover
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
        > */}
          <Search
            placeholder="Enter search user"
            allowClear
            prefix={<UserOutlined />}
            enterButton="Search"
            size="large"
                onSearch={onSearchUser}
                className="Search"
            />
            <div>
          <ResultUserFind
            text={value}
              my_Id={my_Id}
              size={'20px'}
              onPageData={onPageData}
              userFind={searchUser}
            />

            </div>
        {/* </Popover> */}
      </>
    )
  }
  export const CSearchMobileVersion = connect(
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