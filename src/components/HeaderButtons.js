import user from '../materials/user.png'
import { actionFullProfilePageUser } from '../redux/saga'
import { Avatar, Button } from 'antd'
import { CSearch } from './Search_Users'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import React, { useEffect,useState } from 'react'
export const AddPost = ({ children }) => {
  const [state, setState] = useState(false)

  return (
    <>
      <Link to={`/edit/post/new`}>
        <a className="button" onClick={() => setState(!state)}>
          {' '}
          +{' '}
        </a>
        {!state && children}
      </Link>
    </>
  )
}
export const Feed = () => {
  return (
    <>
      <Link to={`/feed`}>
        <a className="button"> Feed </a>
      </Link>
    </>
  )
}

export const Explore = () => (
  <Link to={`/explore`}>
    <a size="large" className="button">
      {' '}
      Explore{' '}
    </a>
  </Link>
)

const User = ({ my_Id, aboutMe: { _id, login, avatar } = {}, onMyPage }) => {
  // console.log('_id in user', _id)
  
  useEffect(() => {
    if (my_Id)
      onMyPage(my_Id)
  }, [my_Id])
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

export const CUser = connect(
  (state) => ({
    my_Id: state.auth?.payload?.sub?.id,
    aboutMe: state.myData.aboutMe,
  }),
  { onMyPage: actionFullProfilePageUser },
)(User)
