import user from '../materials/user.png'
import { actionFullProfilePageUser } from '../reducers'
import { Avatar, Button } from 'antd'
import { CSearch } from './Search_Users'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { AddPost } from './NewPost'
import React, { useEffect } from 'react'
import { CLogout } from './LoginRegisterLogout'

export const Feed = () => {
  return (
    <>
      <Link to={`/feed`}>
        <a className="button"> Feed </a>
      </Link>
    </>
  )
}

const Recommendations = () => (
  <Link to={`/explore`}>
    <a size="large" className="button">
      {' '}
      Explore{' '}
    </a>
  </Link>
)
const User = ({ my_Id, aboutMe: { _id, login, avatar } = {}, onMyPage }) => {
  useEffect(() => onMyPage(_id), [_id])
  return (
    <Link to={`/profile/${_id}`}>
      {avatar?.url ? (
        <Avatar src={'/' + avatar?.url} size={60} className="Avatar" />
      ) : (
        <Avatar src={user} size={60} className="Avatar" />
      )}
    </Link>
  )
}

const CUser = connect(
  (state) => ({
    my_Id: state.auth?.payload?.sub?.id,
    aboutMe: state.profileData.aboutMe,
  }),
  { onMyPage: actionFullProfilePageUser },
)(User)

export const Header = () => {
  return (
    <section className="Header">
      <CLogout className="button" />
      <CSearch />
      <Feed />
      <AddPost />
      <Recommendations />

      <CUser />
    </section>
  )
}
