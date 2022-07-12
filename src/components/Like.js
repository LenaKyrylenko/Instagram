import { Avatar, Col, Row } from 'antd'
import { ConstructorModal } from '../helpers'
import { Link } from 'react-router-dom'
import user from '../materials/user.png'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import React, { useState } from 'react'
import { LinkToUser } from './LinkToUser'
import {
  actionAddFullLikeFeed,
  actionDeleteFullLikeFeed,
} from '../redux/saga'
import { connect } from 'react-redux'

export const Likes = ({ likes }) => {
  return (
    <>
      <div className="Modal">
        {likes &&
          likes?.map(({owner:{_id,login, avatar}}) => (
            <LinkToUser _id={_id} login={login} avatar={avatar} size={50} padding={'0px'} />
          ))}
      </div>
    </>
  )
}
export const Like = ({
  my_Id,
  postId,
  addLike,
  deleteLike,
  likes = [],
  children,
}) => {
  const likeId = likes.find((like) => like?.owner?._id === my_Id)?._id
  const changeLike = () =>
    likeId ? deleteLike(likeId, postId) : addLike(postId)

  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }
  return (
    <>
      <div style={{ display: 'flex' }}>
        <h2 onClick={changeLike}>
          {likeId ? (
            <HeartFilled
              style={{ cursor: 'pointer', fontSize: 'xx-large', color: 'red' }}
            />
          ) : (
            <HeartOutlined
              style={{ cursor: 'pointer', fontSize: 'xx-large' }}
            />
          )}
        </h2>
        {likes.length ? (
          <h3 style={{ cursor: 'pointer', paddingLeft: 8 }} onClick={showModal}>
            {' '}
            {likes.length} likes
          </h3>
        ) : (
          <h3 style={{ cursor: 'pointer', paddingLeft: 8 }}> 0 likes</h3>
        )}
      </div>
      <ConstructorModal
        title={'Likes'}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      >
        <Likes likes={likes} />
      </ConstructorModal>
    </>
  )
}
const AllLikeComponent = ({ my_Id, addLike, deleteLike, likes, postId }) => (
  <Like
    my_Id={my_Id}
    addLike={addLike}
    deleteLike={deleteLike}
    likes={likes}
    postId={postId}
  >
    <Likes likes={likes} />
  </Like>
)

export const CLike = connect(
  (state) => ({
    my_Id: state.auth?.payload?.sub?.id || '',
  }),
  {
    addLike: actionAddFullLikeFeed,
    deleteLike: actionDeleteFullLikeFeed,
  },
)(AllLikeComponent)
