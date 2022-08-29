import { connect } from 'react-redux'
import { Input, Popover } from 'antd'
import { actionSearchUser } from '../../actions/query/searchUserQuery'
import { UserOutlined } from '@ant-design/icons'
import {actionSearchSaga,actionClearSearchType} from '../../actions/types/searchType'
import { actionFullProfilePageUserTypeSaga } from '../../actions/typeSaga/userTypesSaga'
import LinkToUser from '../../components/LinkToUser'
export const ResultUserFind = ({ userFind, handleCancel }) => {
  return (
    <div className="ResultUserFindMobile">
     
      {typeof userFind === 'undefined' 
      
        ? 
        null :
        userFind?.length > 0 ?
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
        <p style={{fontSize:'16px',textAlign:'center'}}> Not found by request </p>
    }
    </div>
  )
}

const SearchUser = ({my_Id,onSearch,actionClear, searchUser, onPageData }) => {
  const onSearchUser = (value) =>
    onSearch(value)
    const { Search } = Input
  return (
      <>
          <Search
            placeholder="Enter search user"
            allowClear={actionClear}
        prefix={<UserOutlined />}
            enterButton="Search"
            size="large"
                onSearch={onSearchUser}
                className="Search"
            />
            <div>
          <ResultUserFind
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
      onSearch: actionSearchSaga,
      actionClear:actionClearSearchType,
      onPageData: actionFullProfilePageUserTypeSaga,
    },
  )(SearchUser)