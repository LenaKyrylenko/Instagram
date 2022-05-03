import { Modal } from 'antd';
// import React, { useState } from 'react'

export const ConstructorModal = ({title, children, isModalVisible, setIsModalVisible }) =>
{

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
        <Modal title={title} centered className="Modal"
        footer={null}
        onCancel={handleCancel}
        visible={isModalVisible}>

        {children}
        </Modal>
    </>
  )
}
  
