import { useDropzone } from 'react-dropzone'
import React, { useEffect } from 'react'
import { Button,Image } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { sortableContainer, SortableElement, sortableElement, SortableHandle } from 'react-sortable-hoc'
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { Upload } from "antd";
import { uploadFileType } from '../actions'
import { Row, Col } from 'antd'

export function Dropzone({ onLoad }) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ))
  // console.log('acceptedFiles name', acceptedFiles[0]?.name)
  // console.log('acceptedFiles',acceptedFiles)
  useEffect(() => {
    if (acceptedFiles) onLoad(acceptedFiles)
  }, [acceptedFiles])
  return (
    <section className="container">
      <div {...getRootProps({ className: 'Dropzone' })}>
        <input {...getInputProps()} />
        <Button type="default" size="large" icon={<UploadOutlined />}>
          Drag 'n' drop some files here, or click to select files
        </Button>
      </div>
    </section>
  )
}
