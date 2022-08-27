import React, { useState } from 'react'
import { ConstructorModal } from '../../helpers'
import LikeList from './LikeList'
import { Col } from 'antd'

const ModalLikes = ({ likes, myId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const showModal = () => {
    setIsModalVisible(true)
  }
  return (
    <>
       <Col
        xl={{ span: 15, offset: 0 }}
        lg={{ span: 10, offset: 0 }}
        
       sm={{ offset: 0, span: 10 }}
       xs={{ offset: 0, span: 5 }}
      >
      {likes.length ?
        (
            <p className="LikeStyle"
              style={{ margin: '0 auto' }}
              onClick={showModal}>
          {' '}
          {likes.length} likes
        </p>
      ) : (
        <p className="LikeStyle"> 0 likes</p>
      )}

      <ConstructorModal
        title={'Likes'}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      >
        <LikeList likes={likes} myId={myId} />
        </ConstructorModal>
      </Col>
    </>
  )
}

export default ModalLikes
