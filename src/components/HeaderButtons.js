import user from '../materials/user.png'
import { actionFullProfilePageUser } from '../redux/saga'
import { Avatar, Button } from 'antd'
import { CSearch } from './Search_Users'
import { Link} from 'react-router-dom'
import { connect } from 'react-redux'
import {
  HomeOutlined, CompassOutlined,
  PlusSquareFilled, PlusSquareOutlined,
  ImportOutlined,HomeFilled
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
const DefaultLink = ({link, tag}) =>
{
  // const [state, setState] = useState(false)
  return (
    <Link to={`${link}`}
      className="Links">
      {tag}
      </Link>
  )
}
export const Feed = () =>
  <DefaultLink link={"/feed"} tag={<HomeOutlined />} />
{/* <HomeOutlined /> */ }
export const Explore = () =>
  <DefaultLink link={"/explore"} tag={<CompassOutlined />} />

{/* <CompassOutlined /> */}
// export const Feed = () => {
//   return (
//     <>
//       <Link to={`/feed`}  onClick={()=>console.log('щас фид')}>
//         <a className="button"> Feed </a>
//       </Link>
//     </>
//   )
// } 

export const AddPost = ({ children }) => {
  const [state, setState] = useState(false)

  return (
    <>
      <Link to={`/edit/post/new`}
      className="Links">
      <PlusSquareOutlined onClick={() => setState(!state)}/>
        {!state && children}
      </Link>
    </>
  )
}
export const LogOut = () => 
<DefaultLink
tag={<ImportOutlined  />}/>

// export const Feed = () => {
//   return (
//     <>
//       <Link to={`/feed`}  onClick={()=>console.log('щас фид')}>
//         <a className="button"> Feed </a>
//       </Link>
//     </>
//   )
// }

// export const Explore = () => (
//   <Link to={`/explore`}>
//     <a size="large" className="button">
//       {' '}
//       Explore{' '}
//     </a>
//   </Link>
// )

const User = ({ my_Id, aboutMe: { _id, login, avatar } = {}, onMyPage }) => {
  // console.log('_id in user', _id)
  
  useEffect(() => {
    if (my_Id)
      onMyPage(my_Id)
  }, [my_Id])
  return (
    <Link to={`/profile/${_id}`} onClick={()=>console.log('щас юзер')}>
      {avatar?.url ? (
        <Avatar src={'/' + avatar?.url} size={50} className="Avatar" />
      ) : (
        <Avatar src={user} size={50} className="Avatar" />
      )}
    </Link>
  )
}

export const CUser = connect(
  (state) => ({
    my_Id: state.auth?.payload?.sub?.id,
    aboutMe: state.myData.aboutMe,
  }),
  { onMyPage: actionFullProfilePageUser },
)(User)
