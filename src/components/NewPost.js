import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import {
  actionUploadFiles,
  actionPostUpsert
} from '../actions'
import { actionClearPostsOne } from '../redux/reducers/post/postReducer'
import { Button, message } from 'antd'
import {
  Basic,
  SortableContainer,
  SortableItem,
} from '../components/DropZone'
import { arrayMoveImmutable } from 'array-move'
import { Row, Col } from 'antd'

import { history } from '../App'
export const PageCreatePost = () => (
  <div style={{ background: '#FFFACD' }}>
    <h2>Edit Post</h2>
    <CPostEditor />
  </div>
)

export const AddPost = ({ children }) => {
  const [state, setState] = useState(false)

  return (
    <>
      <Link to={`/edit/post/new`}>
        <a className="button" onClick={() => setState(!state)}>
          {' '}
          +{' '}
        </a>
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

const PostEditor = ({
  match: {
    params: { _id },
  },
  myID,
  post,
  onSave,
  onFileDrop,
  fileStatus,
  clearPostOne,
}) => {
  post = {
    title: post?.title || '',
    text: post?.text || '',
    images: post?.images || [],
  }

  const [state, setState] = useState(post)
  console.log('state', state)
  console.log("какое щас айди", _id)
 
  
  useEffect(() => {
    if (_id === 'new' && Object.keys(post)) {
      console.log("какое щас айди",_id === 'new' && Object.keys(post))
      clearPostOne()
      setState(post)
    }
  }, [_id])
  console.log("post", post)
  useEffect(() => {
    fileStatus?.status == 'FULFILLED' &&
      setState({
        ...state,
        images: [...state?.images, ...fileStatus?.payload],
      })
  }, [fileStatus])

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setState({
      ...state,
      images: arrayMoveImmutable(state?.images, oldIndex, newIndex),
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
  const disabledBtn = state?.images && state?.title && state?.text ? false : true

  const savePost = () =>
    onSave(state) &&
    message.success(`Post published success!`) &&
    history.push(`/profile/${myID}`)
  return (
    <section className="Post">
    
      <Row> 
        <Col span={12} offset={6}>
           <Basic onLoad={onFileDrop} />
          <SortableContainer onSortEnd={onSortEnd}>
            {(state?.images || []).map(({ _id, url }, index) => (
              <div>  
                <Button
                  type="primary"
                  danger
                  size="small"
                  style={{float:'right'}}
                  onClick={() => onRemoveImage(_id)}
                >
                  {' '}
                  x{' '}
                </Button>
                <SortableItem key={`item-${_id}`} index={index} url={url} />
              
              </div>
            ))}
          </SortableContainer>
        </Col>
      </Row>

      <h1 className="Title"> Title </h1>
      <Input
        state={state.title || ''}
        className="Input"
        onChangeText={onChangeTitle}
      />
      <h1 className="Title"> Text </h1>

      <Input
        state={state.text || ''}
        className="Input"
        onChangeText={onChangeText}
      />
      <br />
      <center>
        <Button
          style={{ width: '200px', margin: '10px' }}
          disabled={disabledBtn}
          onClick={savePost}
          size="large"
          type="primary"
        >
          Save
        </Button>
      </center>
    </section>
  )
}

export const CPostEditor = connect(
  (state) => ({
    fileStatus: state.promise?.uploadFiles,
    post: state?.post?.onePost,
    myID: state?.profileData?.aboutMe?._id,
  }),
  {
    onSave: actionPostUpsert,
    onFileDrop: actionUploadFiles,
    clearPostOne: actionClearPostsOne,
  },
)(PostEditor)
