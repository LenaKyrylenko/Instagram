import { ConstructorModal } from '../helpers'
import React, { useState } from 'react'
import LinkToUser from '../components/LinkToUser'
export const ListOfUsers = ({ listUsers, text }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <>
      {listUsers?.length > 0 ? (
        <p
          style={{ cursor: 'pointer', marginLeft: '20px' }}
          onClick={showModal}
        >
          {listUsers.length} {text}{' '}
        </p>
      ) : (
        <p style={{ marginLeft: '20px' }}> 0 {text} </p>
      )}

      <ConstructorModal
        title={text[0].toUpperCase() + text.slice(1)}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      >
        <div className="">
          {listUsers?.map(({ _id, login, avatar }) => (
            <LinkToUser
              _id={_id}
              login={login}
              avatar={avatar}
              size={40}
              padding={'0px'}
              onClick={handleCancel}
            />
          ))}
        </div>
      </ConstructorModal>
    </>
  )
}
export default ListOfUsers
