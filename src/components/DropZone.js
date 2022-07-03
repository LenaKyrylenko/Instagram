import { useDropzone } from 'react-dropzone'
import React, { useEffect } from 'react'
import { Button,Image } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { sortableContainer, sortableElement } from 'react-sortable-hoc'

export function Basic({ onLoad }) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ))
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

export function ImageDemo({ _id, index, url }) {
  return <SortableItem url={url} key={`item-${_id}`} index={index} />
}
export const SortableItem = sortableElement(({ url }) => {
  return (
    <Image
      style={{
        // margin: '20px',
        maxWidth: '300px',
        minWidth: '100px',

        boxShadow: '0 5px 10px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
        maxHeight: '300px',
        minHeight:'100px'
      }}
      src={'/' + url}
    />
  )
})
export const SortableContainer = sortableContainer(({ children }) => {
  return (
    <>
      <ul style={{display:'flex', flexDirection:'row', margin:'5px'}}>{children}</ul>
    </>
  )
})
