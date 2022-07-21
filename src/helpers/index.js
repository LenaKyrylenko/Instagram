import { Modal,Button } from 'antd'
import { useDropzone } from 'react-dropzone'
import React, {useEffect } from 'react'
import { UploadOutlined } from '@ant-design/icons'

export const ConstructorModal = ({
  title,
  children,
  isModalVisible,
  setIsModalVisible,
}) => {
  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <>
      <Modal
        title={title}
        centered
        className="Modal"
        footer={null}
        onCancel={handleCancel}
        visible={isModalVisible}
      >
        {children}
      </Modal>
    </>
  )
}

export function Dropzone({ onLoad }) {
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
        <Button type="default" size="medium" icon={<UploadOutlined />}>
          Drag 'n' drop some files here, or click to select files
        </Button>
      </div>
    </section>
  )
}
