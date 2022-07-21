import React, { useState } from 'react'
import { ConstructorModal } from '../../helpers'
import LikeList from './LikeList'
const ModalLikes = ({ likes, myId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const showModal = () => {
    setIsModalVisible(true)
  }
  return (
    <>
      {likes.length ? (
        <h3 className='LikeStyle' onClick={showModal}>
          {' '}
          {likes.length} likes
        </h3>
      ) : (
        <h3 className='LikeStyle'> 0 likes</h3>
      )}

      <ConstructorModal
        title={'Likes'}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      >
        <LikeList likes={likes} myId={myId} />
      </ConstructorModal>
    </>
  )
}

export default ModalLikes
