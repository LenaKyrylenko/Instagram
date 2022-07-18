import { ConstructorModal } from '../helpers'
import { ResultUserFind } from './Search_Users'
import React, { useState } from 'react'
export const ListOfUsers = ({
  listResult,
  listUsers,
  onPageData,
  text
}) => {
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
        <h3
          style={{ cursor: 'pointer', marginLeft: '20px' }}
          onClick={showModal}
        >
          {listUsers.length} {text} {' '}
        </h3>
      ) : (
        <h3 style={{ marginLeft: '20px' }}> 0 {text} </h3>
      )}

      <ConstructorModal
        title={text[0].toUpperCase()+ text.slice(1)}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      >
        <ResultUserFind
          size={'40px'}
          onPageData={onPageData}
          handleCancel={handleCancel}
          userFind={listResult}
        />
      </ConstructorModal>
    </>
  )
}
export default ListOfUsers
