import { Modal } from 'antd';
// import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, Button, DatePicker, Space } from 'antd'
import React, { useMemo, useState, useEffect } from 'react'
import { UploadOutlined, SearchOutlined } from '@ant-design/icons'

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


export function Basic({ onLoad }) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ))
  console.log('acceptedFiles', acceptedFiles)
  useEffect(() => {
    acceptedFiles[0] && onLoad(acceptedFiles[0])
  }, [acceptedFiles])
  return (
    <section className="container">
      <div {...getRootProps({ className: 'Dropzone' })}>
        <input {...getInputProps()} />
        <Button icon={<UploadOutlined />}>
          Drag 'n' drop some files here, or click to select files
        </Button>
      </div>
      <aside>
        <h4 style={{ color: 'black' }}>File</h4>
        <ul>{files}</ul>
        {/* <img src={files.}/> */}
      </aside>
    </section>
  )
}
