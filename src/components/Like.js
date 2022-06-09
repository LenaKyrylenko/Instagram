import { Avatar, Col, Row } from 'antd'
import { ConstructorModal } from '../helpers'
import { ResultUserFind } from '../components/Search_Users'
import { Router, Route, Link, Redirect, Switch } from 'react-router-dom'
import user from '../materials/user.png'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import React, { useMemo, useState, useEffect } from 'react'

export const Likes = ({ likes }) => {
  return (
    <>
      <div className="Modal">
        {likes &&
          likes?.map(({ owner: { _id, login, avatar } }) => (
            <Link to={`/profile/${_id}`}>
              <Row>
                <Col offset={1}>
                  <Avatar
                    style={{
                      width: '50px',
                      height: '50px',
                      // marginRight: '30px',
                      // position: 'absolute',
                    }}
                    src={'/' + avatar?.url || user}
                  />
                </Col>
                <Col offset={2}>
                  <h3> {login || 'Anon'}</h3>
                </Col>
              </Row>
            </Link>
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
  // console.log('likeId', likeId)
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
          <h3 style={{ cursor: 'pointer', paddingLeft: 8 }}>
            {' '}
             0 likes
          </h3>
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
