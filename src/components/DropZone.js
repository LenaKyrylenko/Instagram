import { useDropzone } from 'react-dropzone'
import React, { useEffect } from 'react'
import { Button,Image } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { sortableContainer, SortableElement, sortableElement, SortableHandle } from 'react-sortable-hoc'
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { Upload } from "antd";
import { uploadFileType } from '../actions'
import { Row, Col } from 'antd'

export function Basic({ onLoad }) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ))
  console.log('acceptedFiles name', acceptedFiles[0]?.name)

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
const videoRegularExp = / *\.(mp4|mkv|wmv|m4v|mov|avi|flv|webm|flac|mka|m4a|aac|ogg)/
export const SortableItem = SortableElement(({ url, onRemoveImage, _id}) => {
  return (
    <>
 
    <img
      style={{
        // margin: '20px',
        maxWidth: '300px',
          minWidth: '100px',
          objectFit: 'cover',
        boxShadow: '0 5px 10px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
        maxHeight: '300px',
        minHeight:'100px'
      }}
      src={'/' + url}
    />
        <Button
    type="primary"
    danger
    size="small"
        style={{
          float: 'right',
        margin:'5px'
        }}
    onClick={() => onRemoveImage(_id)}
  >
    {' '}
    x{' '}
      </Button>
    </>
  )
})
export const SortableContainer = sortableContainer(({ children ,checkLength}) => {

  return (
    <>
   
          <ul style={{ display: 'flex', flexDirection: 'row', margin: '5px' }}>{children}</ul>
   
     
    </>
  )
})
