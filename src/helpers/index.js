import { Modal } from 'antd';
// import React, { useState } from 'react'

export const ConstructorModal = ({ children, isModalVisible, setIsModalVisible }) =>
{
 // const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
        <Modal title="Likes" className="Modal"
        footer={null}
        onCancel={handleCancel}
        visible={isModalVisible}>

        {isModalVisible && children}
        </Modal>
    </>
  )
}
  