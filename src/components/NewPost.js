import React, { useMemo, useState, useEffect } from 'react'
import { Router, Route, Link, Redirect, Switch } from 'react-router-dom'
import { Provider, connect } from 'react-redux'
import { actionUploadFile, actionUploadFiles, actionPostUpsert,actionUserUpdate} from '../actions'
import {actionClearPostsOne} from '../reducers'

import { Upload, Button, DatePicker, Space,message  } from 'antd'
import {Basic, SortableContainer, SortableItem , ImageDemo} from '../components/DropZone'
import { arrayMove, arrayMoveImmutable, arrayMoveMutable } from 'array-move'
import { ConsoleSqlOutlined } from '@ant-design/icons'
import ReactDOM from 'react-dom';
import { history } from '../App'
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

const PostEditor = ({ match: { params: { _id } }, myID, post,
  onSave, onFileDrop, fileStatus, clearPostOne }) => {
 
  console.log('PARAMS ', _id)
  
  post = {
  //  _id: post?._id || 'new',
    title: post?.title || '',
    text: post?.text || '',
    images: post?.images || []
  }
  //console.log('post на 85 строке ', post)
 
 // console.log('filestatus ', fileStatus)
   const [state, setState] = useState(post)
  // console.log('state на 89 строке ', state)
 
  useEffect(() => {
    if (_id === 'new' && Object.keys(post)) {
      clearPostOne()
      setState(post)

    }
  }, [_id]);
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
  // useEffect(() => {
  //   if ( fileStatus?.status== 'FULFILLED') {
  //           message.success(`post published, can create a new one`)
  //           history.push(`/profile/${myID}`)
  //       } else if (fileStatus?.status === "REJECTED") {
  //           message.error('Error')
  //       }
  
  // }, [fileStatus?.status])
  console.log('post на 135 строке ', post)
  console.log('state на 136 строке', state)

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
    const disabledBtn = state.images && state.title && state.text ? false : true
  
  const savePost = () => onSave(state) && message.success(`Post published success!`)
  &&history.push(`/profile/${myID}`)
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
      <Input state={state.title || ''} className="Input" onChangeText={onChangeTitle} />
      <h1 className="Title"> Text </h1>
  
      <Input state={state.text || ''}  className="Input" onChangeText={onChangeText} />
      <br/>
      <button 
        disabled={disabledBtn} className="Link" style={{width:"40%", margin:'30px',padding:'20px'}}  
        onClick={savePost}  >
     
        Save
      </button>


    </section>
  )
}
      
 export const CPostEditor = connect(
   (state) => ({
     fileStatus: state.promise?.uploadFiles,
     post:state?.post?.onePost,
     myID: state?.profileData?.aboutMe?._id,
   
   }),
    {
      onSave: actionPostUpsert,
      onFileDrop: actionUploadFiles,
      clearPostOne: actionClearPostsOne
    },
  )(PostEditor)