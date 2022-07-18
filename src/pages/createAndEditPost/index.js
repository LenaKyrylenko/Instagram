import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  actionUploadFiles,
  actionPostUpsert,
  actionClearPromise,
} from '../../actions'
import { actionClearOnePostType } from '../../actions/types/postActionTypes'
import { Button, message } from 'antd'
import {
  Dropzone
} from '../../components/UploadFiles'
import {
  SortableContainer,
  SortableItem
} from '../../components/Sortable'
import { arrayMoveImmutable } from 'array-move'
import { Row, Col } from 'antd'
import { history } from '../../helpers'
import { CustomInput } from '../../components/Input'
import {actionCreateEditPost} from '../../redux/saga'

const checkRoute = ({ match }) => {
  console.log('match route', match)
}

const PostEditor = ({
  match: {
    params: { _id },
  },
  myId,
  onSave,
  onFileDrop,
  post,
  fileStatus,
  clearPostOne,
  clearPromise,
  newPost
}) => {
  post = {
    _id: post?._id || '',
    title: post?.title || '',
    text: post?.text || '',
    images: post?.images || [],
  }
  console.log('post after', post)
  console.log('post _id', _id)
  const [state, setState] = useState(post)
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
  console.log('STATEEE IDDDD', state?._id)
  const savePost = () =>
    onSave(state) &&
    message.success(`Post published success!`) &&
    history.push(`/profile/${myId}`)
  const checkLength = () => {
    if (state?.images?.length > 8) {
      console.log('state?.images?.length', state?.images?.length)
      message.error('Error, please, upload maximum 8 elements')
      state['images'] = []
      return false
    } else {
      return <h3> {state?.images.length} / 8</h3>
    }
  }

  return (
    <section className="Post">
      {/* <Row> */}
        {/* <Col span={12} offset={6}> */}
          <Dropzone onLoad={onFileDrop} />
          {/* <Col offset={1}> */}
      <div style={{}}>
              <SortableContainer
                onSortEnd={onSortEnd}
                >
                {state?.images?.length <= 8 &&
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
           </div>
            {checkLength()}
          {/* </Col> */}
        {/* </Col> */}
      {/* </Row> */}

      <h1 className="Title"> Title </h1>
      <CustomInput
        state={state?.title || ''}
        className="Input"
        onChangeText={onChangeTitle}
      />
      <h1 className="Title"> Text </h1>

      <CustomInput
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

// export const CPostEditor = connect(
//   (state) => ({
//     fileStatus: state.promise?.uploadFiles,
//     post: state?.post?.onePost,
//     myId: state?.myData?.aboutMe?._id,
//   }),
//   {
//     onSave: actionCreateEditPost,
//     onFileDrop: actionUploadFiles,
//     clearPostOne: actionClearOnePostType,
//     // clearPromise: actionClearPromise,
//   },
// )(PostEditor)

export const CPostCreator = connect(
  (state) => ({
    fileStatus: state.promise?.uploadFiles,
    // post: state?.post?.onePost,
    myId: state?.myData?.aboutMe?._id,
    newPost:true
  }),
  {
    onSave: actionCreateEditPost,
    onFileDrop: actionUploadFiles,
    clearPostOne: actionClearOnePostType,
    clearPromise: actionClearPromise,
  },
)(PostEditor)

export const CPostEditor = connect(
  (state) => ({
    fileStatus: state.promise?.uploadFiles,
    post: state?.post?.onePost,
    myId: state?.myData?.aboutMe?._id,
  }),
  {
    onSave: actionCreateEditPost,
    onFileDrop: actionUploadFiles,
    clearPostOne: actionClearOnePostType,
    // clearPromise: actionClearPromise,
  },
)(PostEditor)