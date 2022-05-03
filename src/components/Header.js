import user from '../materials/user1.png'
import { actionFullProfilePageUser } from '../reducers'
import { Avatar, Button } from 'antd'
import { CSearch } from '../components/Search_Users'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {  AddPost } from '../components/NewPost'
import React, { useEffect } from 'react'

export const Feed = ({ aboutMe, onAllFollowing, onPostsFeed, postsFeed }) => {
  console.log('POST FEED', postsFeed)
  return (
    <>
      <Link className="Feed" to={`/feed`}>
        <Button className="Feed" size="large">
          {' '}
          Feed{' '}
        </Button>
      </Link>
    </>
  )
}
export const CFeed = connect((state) => ({
  aboutMe: state?.profileData?.aboutMe,
}))(Feed)

const Likes = () => (
  <Button size="large" className="Likes">
    {' '}
    Likes{' '}
  </Button>
)

const Recommendations = () => (
  <Button size="large" className="Recomendations">
    {' '}
    Recommendations{' '}
  </Button>
)
const User = ({ my_Id, aboutMe: { _id, login, avatar } = {}, onMyPage }) => {
  useEffect(() => onMyPage(_id), [_id])
  return (
    <Link className="User" to={`/profile/${_id}`}>
      {avatar?.url ? <Avatar src={'/' + avatar?.url} /> : <Avatar src={user} />}
    </Link>
  )
}

const CUser = connect(
  (state) => ({
    my_Id: state.auth.payload.sub.id || '',
    aboutMe: state.profileData.aboutMe,
  }),
  { onMyPage: actionFullProfilePageUser },
)(User)

export const Header = () => {
  return (
    <section className="Header">
      <CSearch />
      <CFeed />
      <AddPost />
      <Recommendations />
      <Likes />
      <CUser />
    </section>
  )
}
