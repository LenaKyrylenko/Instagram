import { connect } from 'react-redux'
import { message, Image, Button } from 'antd'
import { actionUploadFile, actionSetAvatar, actionUserUpsert, actionUserUpdate } from '../actions'
import React, { useState, useEffect } from 'react'
import { Basic, ConstructorModal } from '../helpers'
const Input = ({ state, onChangeText }) => (
  <input
    className="Input"
    value={state}
    placeholder={state || ''}
    onChange={onChangeText}
  />
)

const EditAvatar = ({ info, onSaveAvatar, setIsModalVisibleEdit, onFileDrop, fileStatus, myId }) => {
  const [state, setState] = useState(info)

  console.log('state my ', state)
  useEffect(() => {
    fileStatus?.status == 'FULFILLED' &&
      setState({
        ...state,
        // ...state?.avatar?._id,
        ...fileStatus?.payload
      })
  }, [fileStatus])
  // onSaveAvatar(state?._id, myId)&& 
  const saveAvatar = () => {
    if (fileStatus)
      onSaveAvatar(state?._id, myId)
        && message.success(`Avatar success changed!`)
        && setIsModalVisibleEdit(false)
  }
  //  =>onSaveUserUpsert(state,myId)


  return (
    <div>
      <h2> Edit avatar </h2>
      <div style={{
        display: 'flex', alignItems: 'center', flexDirection: 'column'
      }}>
        <Basic onLoad={onFileDrop} />

        {fileStatus?.payload?.url && (

          <Image
            style={{
              marginBottom: '30px', width: '200px',
              objectFit: 'cover',
              height: '150px'
            }}


            src={'/' + fileStatus?.payload?.url}
          />
        )}<br />
        <Button style={{ width: "200px" }}
          disabled={fileStatus ? false : true}
          onClick={saveAvatar}
          size="large"
          type="primary"
        >
          Save avatar
        </Button>
      </div>
    </div>
  )
}
export const CEditAvatar = connect(
  (state) => ({
    myId: state?.auth.payload.sub?.id,
    fileStatus: state.promise?.uploadFile,
    info: state?.profileData?.aboutMe?.avatar,
  }),
  {
    onSaveAvatar: actionSetAvatar,
    onFileDrop: actionUploadFile,
  },
)(EditAvatar)


const EditInfo = ({ info, myId, onSaveUserUpsert }) => {
  const [state, setState] = useState(info)

  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
  // const [state, setState] = useState(post)
  // actionChangePassword
  console.log('all info ', info)
  const showModalEdit = () => {
    setIsModalVisibleEdit(true);
  };
  const handleCancelEdit = () => {
    setIsModalVisibleEdit(false)
  }
  const onChangeLogin = (event) =>
    setState({
      ...state,
      login: event.target.value,
    })
  const onChangeNick = (event) =>
    setState({
      ...state,
      nick: event.target.value,
    })

  const saveLogin = () => {
    onSaveUserUpsert(state?.login, myId)
    && message.success(`Save success changed!`)
    && setIsModalVisibleEdit(false)
      // && message.success(`Save success changed!`)
      // && setIsModalVisibleEdit(false)
  }
  const saveNick = () => {
    onSaveUserUpsert(state?.nick, myId)
    && message.success(`Save success changed!`)
    && setIsModalVisibleEdit(false)
      // && message.success(`Save success changed!`)
      // && setIsModalVisibleEdit(false)
  }

  return (
    <div>
      <Button
        type="primary" style={{
          fontWeight: '600',
          fontSize: '15px',
          transition: ".3s",
          boxShadow: "0 5px 15px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
        }}

        onClick={showModalEdit}>Edit Setting</Button>

      <ConstructorModal title={'Edit setting'}
        isModalVisible={isModalVisibleEdit}
        setIsModalVisible={setIsModalVisibleEdit}
        handleCancel={handleCancelEdit}
      >

        <CEditAvatar setIsModalVisibleEdit={setIsModalVisibleEdit} />

        <h2> Edit login </h2>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
          <Input
            state={state?.login || ''}
            className="Input"
            onChangeText={onChangeLogin}
          />
          <Button size="large" style={{ margin: '10px' }}
          onClick={saveLogin}
          disabled={state?.login ? false : true}

            type="primary"> Save login </Button>
        </div>
        <h2> Edit nick </h2>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
          <Input
            state={state?.nick || ''}
            className="Input"
            onChangeText={onChangeNick}
          />
          <Button style={{ margin: '10px' }}
            disabled={state?.nick ? false : true}
            onClick={saveNick}
            size="large"
            type="primary"
          >
            Save nick
          </Button>
        </div>
      
      </ConstructorModal>
    </div>
  )
}
export const CEditInfo = connect(
  (state) => ({
    myId: state?.auth.payload.sub?.id,
    info: state?.profileData?.aboutMe,
  }),
  {
    onSaveUserUpsert: actionUserUpdate,
  },
)(EditInfo)
