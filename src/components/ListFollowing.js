import { Avatar, Col } from 'antd'
import { ConstructorModal } from '../helpers'
import { ResultUserFind } from '../components/Search_Users'
import React, { useState } from 'react'

export const ListFollowing = ({
  aboutUserFollowing,
  following,
  onPageData,
}) => {
  const [isModalVisibleFollowing, setIsModalVisibleFollowing] = useState(false)

  const showModalFollowing = () => {
    setIsModalVisibleFollowing(true)
  }
  const handleCancelFollowing = () => {
    setIsModalVisibleFollowing(false)
  }
  return (
    <>
      {following?.length > 0 ? (
        <h3
          style={{ cursor: 'pointer', marginLeft: '20px' }}
          onClick={showModalFollowing}
        >
          {following.length} following{' '}
        </h3>
      ) : (
        <h3 style={{ marginLeft: '20px' }}> 0 following </h3>
      )}

      <ConstructorModal
        title={'Following'}
        isModalVisible={isModalVisibleFollowing}
        setIsModalVisible={setIsModalVisibleFollowing}
      >
        <ResultUserFind
          size={'40px'}
          onPageData={onPageData}
          handleCancel={handleCancelFollowing}
          userFind={aboutUserFollowing}
        />
      </ConstructorModal>
    </>
  )
}
export default ListFollowing
