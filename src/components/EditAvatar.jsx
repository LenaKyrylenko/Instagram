import { connect } from 'react-redux'
import { message, Image, Button } from 'antd'
import {
  actionUploadFile,
  actionSetAvatar,
  actionUserUpsert,
  actionUserUpdate,
} from '../actions'
import React, { useState, useEffect } from 'react'
import { Dropzone, ConstructorModal } from '../helpers'
import { Input } from './Input'
import {actionSetAvatarTypeSaga} from '../redux/saga'
const EditAvatar = ({
  info,
  onSaveAvatar,
  setIsModalVisibleEdit,
  onFileDrop,
  fileStatus,
  myId,
}) => {
  const [state, setState] = useState({})

  console.log('state my ', state)
  useEffect(() => {
    fileStatus?.status == 'FULFILLED' &&
      setState({
        ...state,
        ...fileStatus?.payload,
      })
  }, [fileStatus])
  const saveAvatar = () => {
    if (fileStatus)
      onSaveAvatar(state?._id, myId) &&
        message.success(`Avatar success changed!`) &&
        setIsModalVisibleEdit(false)
  }

  return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Dropzone onLoad={onFileDrop} />

        {fileStatus?.payload?.url && (
          <Image
            style={{
              width: '200px',
              objectFit: 'cover',
              height: '150px',
            }}
            src={'/' + fileStatus?.payload?.url}
          />
        )}
        <br />
        <Button
          style={{ width: '200px' }}
          disabled={fileStatus ? false : true}
          onClick={saveAvatar}
          size="large"
          type="primary"
        >
          Save avatar
        </Button>
      </div>
  )
}
export const CEditAvatar = connect(
  (state) => ({
    myId: state?.auth.payload.sub?.id,
    fileStatus: state.promise?.uploadFile,
    info: state?.myData?.aboutMe?.avatar,
  }),
  {
    onSaveAvatar: actionSetAvatarTypeSaga,
    onFileDrop: actionUploadFile,
  },
)(EditAvatar)
