import { useDropzone } from 'react-dropzone'
import React, { useMemo, useState, useEffect } from 'react'
import { Upload, Button, DatePicker, Space } from 'antd'
import { UploadOutlined,SearchOutlined } from '@ant-design/icons'
import { sortableContainer, sortableElement } from 'react-sortable-hoc'
import {backendURL} from '../actions'
import { arrayMove, arrayMoveImmutable, arrayMoveMutable } from 'array-move'

export function Basic({ onLoad }) {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone()
    const files = acceptedFiles.map((file) => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ))
    console.log('acceptedFiles',acceptedFiles)
    useEffect(() => {
      if(acceptedFiles[0])
        onLoad(acceptedFiles[0])
    }
    , [acceptedFiles])
    return (
      <section className="container">
        <div {...getRootProps({ className: 'Dropzone' })}>
          <input {...getInputProps()} />
          <Button icon={<UploadOutlined />}>
            Drag 'n' drop some files here, or click to select files
          </Button>
        </div>
        <aside>
          <h4 style={{ color: 'black' }}>Files</h4>
          <ul>{files}</ul>
        </aside>
      </section>
    )
  }
  
export const SortableItem = sortableElement(({ url }) => (
    <li>
      <img
        src={backendURL + '/' + url}
        style={{ maxWidth: '200px', maxHeight: '200px' }}
      />
    </li>
  ))
  
 export  const SortableContainer = sortableContainer(({ children }) => {
    return (
      <>
        <ul>{children}</ul>
  
        {/* <input value={title}/> */}
      </>
    )
  })