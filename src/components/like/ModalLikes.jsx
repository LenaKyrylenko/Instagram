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
       xs={{ offset: 1, span: 20 }}
      >
      {likes.length ?
        (
            <h3 className="LikeStyle"
              style={{ margin: '0 auto' }}
              onClick={showModal}>
          {' '}
          {likes.length} likes
        </h3>
      ) : (
        <h3 className="LikeStyle"> 0 likes</h3>
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
