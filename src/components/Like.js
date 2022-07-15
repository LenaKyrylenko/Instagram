import { Avatar, Col, Row } from 'antd'
import { ConstructorModal } from '../helpers'
import { Link } from 'react-router-dom'
import user from '../materials/user.png'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import React, { useState } from 'react'
import { LinkToUser } from './LinkToUser'
import {
  actionChangeLike
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
  changeLike,
  children,
}) => {
  const likeId = likes.find((like) => like?.owner?._id === my_Id)?._id
  // const changeLike = () =>
  //   likeId ? deleteLike(likeId, postId) : addLike(postId)
console.log('like id in component', likeId)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }
  return (
    <>
      <div style={{ display: 'flex' }}>
        <h3 onClick={() => changeLike(likeId, postId)}>
       
          {likeId ? (
            <HeartFilled
              style={{color:'red'}}
              className='Like'
            />
          ) : (
            <HeartOutlined className='UnLike' />
          )}
        </h3>
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
const AllLikeComponent = ({ my_Id, likes,changeLike, postId }) => (
  <Like
    my_Id={my_Id}
    likes={likes}
    postId={postId}
    changeLike={changeLike}
  >
    <Likes likes={likes} />
  </Like>
)

export const CLike = connect(
  (state) => ({
    my_Id: state.auth?.payload?.sub?.id || '',
  }),
  {
    changeLike: actionChangeLike
  },
)(AllLikeComponent)
