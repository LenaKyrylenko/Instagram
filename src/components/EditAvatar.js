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
import { history } from '../App'

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
  const [state, setState] = useState(info)

  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);

  const showModalEdit = () => {
    setIsModalVisibleEdit(true);
  };
  const handleCancelEdit = () => {
    setIsModalVisibleEdit(false)
  }

  console.log('state my ', state)
  useEffect(() => {
    fileStatus?.status == 'FULFILLED' &&
      setState({
        ...state,
        ...state?.avatar,
        ...fileStatus?.payload
      })
  }, [fileStatus])
  const saveAvatar = () => onSave(state?._id, myId)
    && message.success(`Avatar success changed!`)&&setIsModalVisibleEdit(false)

  // const onChangeLogin = (event) =>
  //   setState({
  //     ...state,
  //     login: event.target.value,
  //   })


  return (
    <>
      <button onClick={showModalEdit}>EDIT</button>
      
        <ConstructorModal title={'Edit avatar'}
                isModalVisible={isModalVisibleEdit}
        setIsModalVisible={setIsModalVisibleEdit}
        handleCancel={handleCancelEdit}
      >  
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
        onClick={saveAvatar}>
        Save
        </Button>
      
      </ConstructorModal>
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
