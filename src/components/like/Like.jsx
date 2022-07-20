import { Avatar, Col, Row } from 'antd'
import { Link } from 'react-router-dom'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import React, { useState } from 'react'
import {
  actionChangeLike
} from '../../redux/saga'
import { connect } from 'react-redux'
import LikeList  from './LikeList'
import ModalLikes from './ModalLikes'
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
console.log('like id in component', likeId)

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
        <ModalLikes likes={likes} myId={ my_Id} />
      </div>
    </>
  )
}
const AllLikeComponent = ({ my_Id, likes,changeLike, postId }) => (
  <Like
    my_Id={my_Id}
    likes={likes}
    postId={postId}
    changeLike={changeLike}
  />
 
)
  {/* <LikeList likes={likes} />
  </Like>  */}
export const CLike = connect(
  (state) => ({
    my_Id: state.auth?.payload?.sub?.id || '',
  }),
  {
    changeLike: actionChangeLike
  },
)(AllLikeComponent)
