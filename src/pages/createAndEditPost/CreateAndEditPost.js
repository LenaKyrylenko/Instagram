import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  actionUploadFiles,
  actionPostUpsert,
  actionClearPromise,
} from '../../actions'
import { actionClearPostsOne } from '../../redux/reducers/post/postReducer'
import { Button, message } from 'antd'
import {
  Basic,
  SortableContainer,
  SortableItem,
} from '../../components/DropZone'
import { arrayMoveImmutable } from 'array-move'
import { Row, Col } from 'antd'
import { history } from '../../helpers'
import { Input } from '../../components/Input'
const PostEditor = ({
  match: {
    params: { _id },
  },
  myID,
  post = {},
  onSave,
  onFileDrop,
  fileStatus,
  clearPostOne,
  clearPromise,
}) => {
  post = {
    _id: post?._id || '',
    title: post?.title || '',
    text: post?.text || '',
    images: post?.images || [],
  }

  console.log('post ', post)
  console.log('post _id', _id)
  const [state, setState] = useState(post)
  useEffect(() => {
    if (_id === 'new' && Object.keys(post)) {
      console.log('in condition')
      clearPostOne()
      clearPromise('onePost')
      if (post?._id?.length < 8) {
        console.log('post with _id < 8', post)
        post = {
          _id: post?._id || '',
          title: post?.title || '',
          text: post?.text || '',
          images: post?.images || [],
        }
        console.log('after post ', post)
        console.log('update state', state)
        return () => setState(post)
      }

      //console.log('post after clear ', post)
    }
  }, [_id])

  console.log('state after change', state)
  console.log('post', post)
  useEffect(() => {
    if (fileStatus?.status === 'FULFILLED' && fileStatus?.payload != [])
      setState({
        ...state,
        images: [...state?.images, ...fileStatus?.payload],
      })
    else if (fileStatus?.status === 'REJECTED') message.error('Error')
  }, [fileStatus])

  console.log('images ', state?.images)

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
  const disabledBtn =
    state?.images && state?.title && state?.text ? false : true

  const savePost = () =>
    onSave(state, state?._id) &&
    message.success(`Post published success!`) &&
    history.push(`/profile/${myID}`)
  useEffect(() => {
    return () => {
      clearPromise('uploadFiles')
      clearPromise('postUpsert')
      clearPromise('post')
      clearPostOne()
      clearPromise('onePost')
    }
  }, [])
  const checkLength = () => {
    if (state?.images?.length > 8) {
      console.log('state?.images?.length', state?.images?.length)
      message.error('Error, upload Max 8 elements')
      state['images'] = []
      return false
    } else {
      return <h3> {state?.images.length} / 8</h3>
    }
  }

  return (
    <section className="Post">
      <Row>
        <Col span={12} offset={6}>
          <Basic onLoad={onFileDrop} />
          <Col offset={1}>
         
              <SortableContainer
                onSortEnd={onSortEnd}
                style={{ with: '300px' }}
              >
                {state?.images?.length < 8 &&
                  (state?.images || []).map(({ _id, url }, index) => (
                    <SortableItem
                      key={`item-${_id}`}
                      url={url}
                      index={index}
                      onRemoveImage={onRemoveImage}
                      _id={_id}
                    />
                  ))}
              </SortableContainer>
           
            {checkLength()}
          </Col>
        </Col>
      </Row>

      <h1 className="Title"> Title </h1>
      <Input
        state={state?.title || ''}
        className="Input"
        onChangeText={onChangeTitle}
      />
      <h1 className="Title"> Text </h1>

      <Input
        state={state?.text || ''}
        className="Input"
        onChangeText={onChangeText}
      />
      <br />
      <Col offset={5}>
        <Button
          style={{
            display: 'flex',
            margin: '10px',
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            width: '200px',
          }}
          disabled={disabledBtn}
          onClick={savePost}
          size="large"
          type="primary"
        >
          Save
        </Button>
      </Col>
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
    clearPromise: actionClearPromise,
  },
)(PostEditor)
