import { useDropzone } from 'react-dropzone'
import React, { useEffect } from 'react'
import { Button,Image } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import "antd/dist/antd.css";
export function Dropzone({ onLoad }) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ))
  useEffect(() => {
    if (acceptedFiles) onLoad(acceptedFiles)
  }, [acceptedFiles])
  
  return (
    <section className="container">
      <div {...getRootProps({ className: 'Dropzone' })}>
        <input {...getInputProps()} />
        <Button type="dashed" xl={{ size: 'large' }}
          sm={{size:'small'}}
          icon={<UploadOutlined />}>
          Drag 'n' drop some files here, or click to select files
        </Button>
      </div>
    </section>
  )
}
