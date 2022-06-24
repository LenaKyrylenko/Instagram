import { connect } from 'react-redux'
import { message, Image, Button } from 'antd'
import { actionUploadFile,actionSetAvatar } from '../actions'
import React, { useState, useEffect } from 'react'
import { Basic,ConstructorModal } from '../helpers'

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

  return (
    <>
      <Button
        type="primary" style={{
          fontWeight: '600',
          fontSize:'15px',
          transition: ".3s",
          boxShadow: "0 5px 15px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
        }}
        
        onClick={showModalEdit}>Edit avatar</Button>
      
        <ConstructorModal title={'Edit avatar'}
                isModalVisible={isModalVisibleEdit}
        setIsModalVisible={setIsModalVisibleEdit}
        handleCancel={handleCancelEdit}
      >  
        <Basic onLoad={onFileDrop} />
        <center>
      {fileStatus?.payload?.url && (
        <Image
              style={{
                marginBottom: '30px', width: '200px',
                objectFit: 'cover',
                height: '150px'
              }}
          src={'/' + fileStatus?.payload?.url}
        />
          )}
          </center>
        <br />
        <center>

       
      <Button style={{width:"200px"}}
        disabled={state ? false : true}
          onClick={saveAvatar}
          size="large"
          type="primary"
        >
        Save
        </Button>
       </center>
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
