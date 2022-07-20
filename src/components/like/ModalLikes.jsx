import React, { useState } from 'react'
import { ConstructorModal } from '../../helpers'
import LikeList from './LikeList'
const ModalLikes = ({ likes }) => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const showModal = () => {
      setIsModalVisible(true)
    }
    return (
      <>
        {likes.length ? (
          <h3 style={{ cursor: 'pointer', padding: '3px' }} onClick={showModal}>
            {' '}
            {likes.length} likes
          </h3>
        ) : (
          <h3 style={{ cursor: 'pointer', padding: '3px' }}> 0 likes</h3>
        )}
  
        <ConstructorModal
          title={'Likes'}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        >
          <LikeList likes={likes} />
        </ConstructorModal>
      </>
    )
  }
  
export default ModalLikes