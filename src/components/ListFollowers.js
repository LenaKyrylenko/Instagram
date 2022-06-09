
import { Avatar, Col} from 'antd'
import { ConstructorModal } from '../helpers'
import { ResultUserFind } from '../components/Search_Users'

import React, { useMemo, useState, useEffect } from 'react'

export const ListFollowers = ({aboutUserFollowers,followers,onPageData }) => {
    
  const [isModalVisibleFollowers, setIsModalVisibleFollowers] = useState(false)

  const showModalFollowers = () => {
    setIsModalVisibleFollowers(true)
  }
    const handleCancelFollowers = () => {
        setIsModalVisibleFollowers(false)
      }
    return (
    <>
    {
        followers?.length > 0 ? (
        <h3
          style={{ cursor: 'pointer', marginLeft: '20px' }}
          onClick={showModalFollowers}
        >
          {followers.length} followers{' '}
        </h3>
      ) : (
        <h3 style={{ marginLeft: '20px' }}> 0 followers </h3>
      )}
    
    <ConstructorModal
    title={'Followers'}
    isModalVisible={isModalVisibleFollowers}
    setIsModalVisible={setIsModalVisibleFollowers}
  >
    <ResultUserFind
      size={'40px'}
      onPageData={onPageData}
      handleCancel={handleCancelFollowers}
      userFind={aboutUserFollowers}
    />
            </ConstructorModal>
        </>
    )
}
export default ListFollowers