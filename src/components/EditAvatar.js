import { connect } from 'react-redux'
import { message, Image, Button } from 'antd'
import { actionUploadFile,actionSetAvatar,actionUserUpsert,actionUserUpdate } from '../actions'
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

const EditAvatar =({ info, onSaveAvatar, setIsModalVisibleEdit, onFileDrop, fileStatus, myId }) => {
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
    <>
        <h2> Edit avatar </h2>
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
          )}<br />
           <Button style={{width:"200px"}}
         disabled={fileStatus ? false : true}
          onClick={saveAvatar}
          size="large"
          type="primary"
        >
        Save avatar
        </Button>
          </center>   
    </>
  )
}
export const CEditAvatar = connect(
    (state) => ({
      myId:state?.auth.payload.sub?.id,
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
  

  const saveUserUpsert = () => {

      onSaveUserUpsert(state, myId) 
      && message.success(`Save success changed!`)
    && setIsModalVisibleEdit(false)
 }
//  =>onSaveUserUpsert(state,myId)
  

  return (
    <>
      <Button
        type="primary" style={{
          fontWeight: '600',
          fontSize:'15px',
          transition: ".3s",
          boxShadow: "0 5px 15px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
        }}
        
        onClick={showModalEdit}>Edit Setting</Button>
      
        <ConstructorModal title={'Edit setting'}
                isModalVisible={isModalVisibleEdit}
        setIsModalVisible={setIsModalVisibleEdit}
        handleCancel={handleCancelEdit}
      >  

        <CEditAvatar setIsModalVisibleEdit={setIsModalVisibleEdit } />
        <center>
        <h2> Edit login </h2>
       
        <Input
        state={state?.login || ''}
        className="Input"
        onChangeText={onChangeLogin}
          />

            <h2> Edit nick </h2>
       
        <Input
        state={state?.nick || ''}
        className="Input"
        onChangeText={onChangeNick}
          />
      <Button style={{width:"200px"}}
         disabled={state ? false : true}
          onClick={saveUserUpsert}
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
    info: state?.profileData?.aboutMe,
  }),
  {
    onSaveUserUpsert: actionUserUpdate,
  },
)(EditInfo)
