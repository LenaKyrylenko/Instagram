import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { actionUploadFiles } from '../../actions/query/uploadFilesQuery'
import { actionClearOnePostType } from '../../actions/types/postTypes'
import { Button, message } from 'antd'
import { Dropzone } from '../../components/UploadFiles'
import { SortableContainer, SortableItem } from '../../components/Sortable'
import { arrayMoveImmutable } from 'array-move'
import { Col } from 'antd'
import history from '../../helpers/history'
import { CustomInput } from '../../components/Input'
import { actionCreateEditPostTypeSaga } from '../../actions/typeSaga/postTypesSaga'
import { actionClearPromiseForName } from '../../actions/types/promiseTypes'
const PostEditor = ({
  match: {
    params: { _id },
  },
  myId,
  onSave,
  onFileDrop,
  post,
  fileStatus,
}) => {
  post = {
    _id: post?._id || '',
    title: post?.title || '',
    text: post?.text || '',
    images: post?.images || [],
  }
  const [state, setState] = useState(post)
  useEffect(() => {
    if (fileStatus?.status === 'FULFILLED' && fileStatus?.payload != [])
      setState({
        ...state,
        images: [...state?.images, ...fileStatus?.payload],
      })
    else if (fileStatus?.status === 'REJECTED') message.error('Error')
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
  const disabledBtn =
    state?.images && state?.title && state?.text ? false : true
  const savePost = () =>
    onSave(state) &&
    message.success(`Post published success!`) &&
    history.push(`/profile/${myId}`)
  const checkLength = () => {
    if (state?.images?.length > 8) {
      message.error('Error, please, upload maximum 8 elements')
      state['images'] = []
      return false
    } else {
      return <h2 className="NumberPosts"> {state?.images.length} / 8</h2>
    }
  }

  return (
    <section className="Post">
      <Dropzone onLoad={onFileDrop} />
      <div style={{}}>
        <SortableContainer onSortEnd={onSortEnd}>
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

      <h2 className="Title"> Title </h2>
      <CustomInput
        state={state?.title || ''}
        className="Input"
        onChangeText={onChangeTitle}
      />
      <h2 className="Title"> Text </h2>

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
            marginTop: '30px',
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
export const CPostCreator = connect(
  (state) => ({
    fileStatus: state.promise?.uploadFiles,
    myId: state?.myData?.aboutMe?._id,
  }),
  {
    onSave: actionCreateEditPostTypeSaga,
    onFileDrop: actionUploadFiles,
    clearPostOne: actionClearOnePostType,
    clearPromise: actionClearPromiseForName,
  },
)(PostEditor)

export const CPostEditor = connect(
  (state) => ({
    fileStatus: state.promise?.uploadFiles,
    post: state?.post?.onePost,
    myId: state?.myData?.aboutMe?._id,
  }),
  {
    onSave: actionCreateEditPostTypeSaga,
    onFileDrop: actionUploadFiles,
    clearPostOne: actionClearOnePostType,
  },
)(PostEditor)
