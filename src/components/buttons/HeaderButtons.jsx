import user from '../../materials/user.png'
import { actionFullProfilePageUserTypeSaga } from '../../actions/typeSaga/userTypesSaga'
import { Avatar } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import backendURL from '../../helpers/backendUrl'

import {
  HomeOutlined,
  CompassOutlined,
  PlusSquareOutlined,
  ImportOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
const DefaultLink = ({ link, tag }) => {
  return (
    <Link to={`${link}`} className="Links">
      {tag}
    </Link>
  )
}
export const Feed = () => <DefaultLink link={'/feed'} tag={<HomeOutlined />} />
export const Explore = () => (
  <DefaultLink link={'/explore'} tag={<CompassOutlined />} />
)
export const SearchMobile = () => (
  <DefaultLink link={'/search'} tag={<SearchOutlined />} />
)

export const AddPost = ({ children }) => {
  const [state, setState] = useState(false)

  return (
    <>
      <Link to={`/edit/post/new`} className="Links">
        <PlusSquareOutlined onClick={() => setState(!state)} />
        {!state && children}
      </Link>
    </>
  )
}
export const LogOut = ({ onClick }) => (
  <ImportOutlined className="Links" onClick={onClick} />
)

const User = ({ my_Id, aboutMe: { _id, avatar } = {}, onMyPage }) => {
  useEffect(() => {
    if (my_Id) onMyPage(my_Id)
  }, [my_Id])
  return (
    <Link to={`/profile/${my_Id}`} className="Links">
      {avatar?.url ? (
        <Avatar src={backendURL + '/' + avatar?.url} className="Avatar" />
      ) : (
        <Avatar src={user} className="Avatar" />
      )}
    </Link>
  )
}

export const CUser = connect(
  (state) => ({
    my_Id: state.auth?.payload?.sub?.id,
    aboutMe: state.myData.aboutMe,
  }),
  { onMyPage: actionFullProfilePageUserTypeSaga },
)(User)
