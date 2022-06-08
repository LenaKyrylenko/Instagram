import React, { useMemo, useState, useEffect } from 'react'
import { Router, Route, Link, Redirect, Switch } from 'react-router-dom'
import { Provider, connect } from 'react-redux'
import { actionUploadFile, actionUploadFiles, actionPostUpsert,actionUserUpdate} from '../actions'
import {actionClearPostsOneAC} from '../reducers'

import { Upload, Button, DatePicker, Space,message  } from 'antd'
import {Basic, SortableContainer, SortableItem , ImageDemo} from '../components/DropZone'
import { arrayMove, arrayMoveImmutable, arrayMoveMutable } from 'array-move'
import { ConsoleSqlOutlined } from '@ant-design/icons'
import ReactDOM from 'react-dom';
import { history } from '../App'
const defaultPost = {
  title: '',
  text: '',
  images: [
    // {_id: '6231c4292be7e42fbc9096c4',
    //  url: 'images/d2438e8c6502eb5da60ecc8f7a6b8aff'}
    // {
    //   _id: '620b8374ad55d22f3e2fb316',
    //   url: 'images/e125a428191726307968880977dac103',
    // },
    // {
    //   _id: '620b8399ad55d22f3e2fb317',
    //   url: 'images/4ae46578989c497582995ba8caeb5de5',
    // },
    // {
    //   _id: '620b83b0ad55d22f3e2fb318',
    //   url: 'images/ae839539f61249b15feda98cad7eb858',
    // },
  ],
}

export const PageCreatePost = () => (
    <div style={{background: '#FFFACD' }}>
      <h2>Edit Post</h2>
      <CPostEditor />
    </div>
  )
  
export const AddPost = ({ children }) => {
    const [state, setState] = useState(false)
  
    return (
      <>
        <Link to={`/edit/post/new`}>
          <Button onClick={() => setState(!state)}> + </Button>
          {!state && children}
        </Link>
      </>
    )
  }

  const Input = ({ state, onChangeText }) => (
    <input
      className="Input"
      value={state}
      placeholder={state || ''}
      onChange={onChangeText}
    />
  )
  var mountNode = document.getElementById('root');
  //  mountNode = document.getElementById('root')
// const ImageDemo = ({_id,index,url})=> {
//     return (
      
//       <SortableItem key={`item-${_id}`} index={index} url={url} />
//     );
//   }


  // match: { params: { _id } }
  // console.log('PARAMS ', match?.params?._id)
  const PostEditor = ({myID,post={}, match: { params: { _id } },
    onSave, onFileDrop, fileStatus, clearPostOne }) => {
 
  console.log('PARAMS ', _id)
  console.log('post ', post)

  console.log('filestatus ', fileStatus)
const [state, setState] = useState(post)
//   useEffect(() => {
//     if (_id === 'new') {
//         clearPostOne()
//       setState(defaultPost)
//     }
// }, [_id]);

useEffect(() => {
  if ( fileStatus?.status== 'FULFILLED') {
      message.success(`post published, can create a new one`)
      history.push(`/profile/${myID}`)
  } else if (fileStatus?.status === "REJECTED") {
      message.error('Error')
  }
}, [fileStatus?.status])  
    useEffect(() => {
      fileStatus?.status == 'FULFILLED' &&
        setState({
          ...state,
          images: [
            ...state?.images,
            ...fileStatus?.payload
          ],
        })
    }, [fileStatus])
  console.log('state', state)
    const onSortEnd = ({ oldIndex, newIndex }) => {
      setState({
        ...state,
        images: arrayMoveImmutable(state.images, oldIndex, newIndex),
      })
    }
    const onChangeTitle = (event) =>
      setState({
        ...state,
        title: event.target.value,
      })
  
    const onChangeText = (event) =>
      setState({
        ...state,
        text: event.target.value,
      })
    const onRemoveImage = (_id) =>
      setState({
        ...state,
        images: state.images.filter((item) => item._id !== _id),
      })
    // ReactDOM.render(  <SortableItem key={`item-${_id}`} index={index} url={url} />, mountNode)
    return (
      <section className="Post">
        <Basic onLoad={onFileDrop} />
        <SortableContainer onSortEnd={onSortEnd}>
          {(state?.images || []).map(({ _id, url }, index) => (
          <div >
          <SortableItem key={`item-${_id}`} index={index} url={url} /> 
              <button onClick={() => onRemoveImage(_id)}> x </button> 
              </div>
          ))}
        </SortableContainer>
        <h1 className="Title"> Title </h1>
        <Input state={state.title || ''} onChangeText={onChangeTitle} />
        <h1 className="Title"> Text </h1>
  
        <Input state={state.text || ''} onChangeText={onChangeText} />
        <button
          disabled={state?.images?.length == 0}
          onClick={() => onSave(state)}
        >
          Save
        </button>
      </section>
    )
  }
 export const CPostEditor = connect(
   (state) => ({
     fileStatus: state.promise?.uploadFiles,
     post:state?.onePost?.payload,
     myID: state?.aboutMe?._id,
   
   }),
    {
      onSave: actionPostUpsert,
      onFileDrop: actionUploadFiles,
      clearPostOne: actionClearPostsOneAC
    },
  )(PostEditor)