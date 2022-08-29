import { Modal,Button } from 'antd'
import { useDropzone } from 'react-dropzone'
import React, {useEffect } from 'react'
import { UploadOutlined } from '@ant-design/icons'
export const videoRegex = (/\.(mp4|mov|avi|wmv|avchd|webm|mpeg-2|3gpp|mp2|flv|3gp|mpg)$/i)
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
        bodyStyle={{ padding:'0px'}}
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
  useEffect(() => {
    acceptedFiles[0] && onLoad(acceptedFiles[0])
  }, [acceptedFiles])
  return (
    <section className="container">
      <div {...getRootProps({ className: 'Dropzone' })}>
        <input {...getInputProps()} />
        <Button type="default"  icon={<UploadOutlined />}>
          <span className='DropzoneText' >
            
       
            Drag 'n' drop some files here, or click to select files
          </span>
        </Button>
      </div>
    </section>
  )
}
export const validation = (password) =>
  !/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9!@#$%^&*a-zA-Z]{8,}/g.test(
  password,
)