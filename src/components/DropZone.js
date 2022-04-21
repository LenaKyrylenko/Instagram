import { useDropzone } from 'react-dropzone'
import React, { useMemo, useState, useEffect } from 'react'
import { Upload, Button, DatePicker } from 'antd'
import { UploadOutlined,SearchOutlined } from '@ant-design/icons'
import { sortableContainer, sortableElement } from 'react-sortable-hoc'
import { Router, Route, Link, Redirect, Switch } from 'react-router-dom'

// import {backendURL} from '../actions'
import { Image } from 'antd';
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
      if(acceptedFiles)
        onLoad(acceptedFiles)
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
  

  export function ImageDemo({_id,index,url}) {
    return (
     <SortableItem url={url} key={`item-${_id}`} index={index} />
    );
  }
export const SortableItem = sortableElement(({ url }) => {
 // const [visible, setVisible] = useState(false);
 const [visible, setVisible] = useState(false)
console.log('STATE PHOTO ', visible)
//  preview={{
//   visible,
//   src:  '/' + value.url,
//   onVisibleChange: value => {
//       setVisible(value);
//   }}}
  return (
    <li>
      {/* <img   style={{ maxWidth: '200px', maxHeight: '200px' }} src={ '/' + url} /> */}
          <Image 
          //  width={200}
        
           style={{  maxWidth: '200px', maxHeight: '200px' }} src={ '/' + url} 
          //  style={{ display: 'none' }}
          // src={ '/' + url}
           preview={{
            visible,
               src: '/' + url,
               onVisibleChange: visible => {
                setVisible(visible);
               },
           }}

           onClick={() => setVisible(!visible)}
         />
    </li>
   )
  }
)
// style={{ maxWidth: '200px', maxHeight: '200px' }} src={ '/' + url} 
 export  const SortableContainer = sortableContainer(({ children }) => {
    return (
      <>
        <ul>{children}</ul>
  
        {/* <input value={title}/> */}
      </>
    )
  })
  
  

