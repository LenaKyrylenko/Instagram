import { EditOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { Upload, message, Avatar, Button } from 'antd'
import { actionAvatar, actionUploadFile,actionSetAvatar } from '../actions'
import ImgCrop from 'antd-img-crop'
import React, { useMemo, useState, useEffect } from 'react'
import { Basic } from '../helpers'
import user from '../materials/user1.png'
import { ConstructorModal } from '../helpers'
import { Image, Divider, Radio } from 'antd'

export const propsUploadFile = {
  name: 'photo',
  action: `/upload`,
  headers:
    localStorage.authToken || sessionStorage.authToken
      ? {
          Authorization:
            'Bearer ' + (localStorage.authToken || sessionStorage.authToken),
        }
      : {},
}
const EditInfo = ({ info, onSave, onFileDrop, fileStatus, myId }) => {
  console.log('info ', info)
  const [state, setState] = useState(info)
  console.log('БЛЯХА ТУТ ЖЕ МОЙ АЙДИ  ', myId)

  // if (fileStatus?.status === 'FULFILLED') {
  //     message.success(`${fileStatus.name} file uploaded successfully`);
  // } else if (fileStatus?.status=== 'REJECTED') {
  //     message.error(`${fileStatus.name} file upload failed.`);
  // }

  console.log('state my ', state)
  useEffect(() => {
    fileStatus?.status == 'FULFILLED' &&
      message.success(` file uploaded successfully`) &&
      setState({
        ...state,
        ...state?.avatar,
        ...fileStatus?.payload
      })
  }, [fileStatus])

  // const onChangeLogin = (event) =>
  //   setState({
  //     ...state,
  //     login: event.target.value,
  //   })

  if (fileStatus?.status == 'FULFILLED') console.log('fullfilled', fileStatus)

  return (
    <>
      <Basic onLoad={onFileDrop}/>
      {fileStatus?.payload?.url && (
        <Image
          style={{ marginRight: '20px', maxWidth: '200px', maxHeight: '200px' }}
          src={'/' + fileStatus?.payload?.url}
        />
      )}
        <br/>
      <Button style={{}}
        disabled={state?.images?.length == 0}
        onClick={() => onSave(state?._id,myId)}>
        Save
      </Button>
    </>
  )
}
export const CEditInfo = connect(
    (state) => ({
      myId:state?.auth.payload.sub?.id,
    fileStatus: state.promise?.uploadFile,
    info: state?.profileData?.aboutMe?.avatar,
  }),
  {
    onSave: actionSetAvatar,
    onFileDrop: actionUploadFile,
  },
)(EditInfo)
