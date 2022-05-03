import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Row, Col } from 'antd';
import { Avatar, Input  } from 'antd'
import { Carousel, Popover } from 'antd'
import user from '../materials/user1.png'
import {actionSearchUser} from '../actions'
import { UploadOutlined, SearchOutlined } from '@ant-design/icons'

  import {actionFullProfilePageUser, actionFullProfilePage} from '../reducers'
export const ResultUserFind = ({ my_Id, userFind = [], onPageData, size,handleCancel }) => {
  
  //const checkMyId = userFind.find(user => user?._id === my_Id)
   return(<div className='ResultUserFind' >
     {

       userFind?.map(({ _id, login, avatar }) => (
        <Link to={`/profile/${_id}`} onClick={handleCancel} key={_id}>
       
              <Row>
             <Col offset={1}>
            {avatar?.url ?  <Avatar
              style={{
                width: '50px',
                height: '50px',
                marginBottom:'10px'
                 }}
                //  ('/' + avatar?.url) ||
              src={ '/' + avatar?.url}
               />
                 :
                 
                 <Avatar
                 style={{
                   width: '50px',
                   height: '50px',
                   marginBottom:'10px'
                    }}
                   //  ('/' + avatar?.url) ||
                 src={user}
                  />
              }
           
              
                </Col>
                <Col offset={1}>
                 <h3 style={{ marginBottom:'20px'}}> {login || 'Anon'}</h3>
      
                 </Col>
                 </Row>
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
          destroyTooltipOnHide={true}
          content={<ResultUserFind my_Id={my_Id} size={'20px'} onPageData={onPageData}
            userFind={searchUser} />}
            trigger="focus"
        >
          <Search 
            placeholder="Input search user"
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
    aboutUser: state.profilePage?.aboutUser,
    searchUser: state.promise?.searchUser?.payload,
    my_Id: state.auth.payload.sub.id || '',
   }),

   {
     onSearch: actionSearchUser,
     onPageData: actionFullProfilePageUser,
   },
  )(SearchUser)