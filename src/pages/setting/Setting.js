import React, { useState, useEffect } from 'react'
import { CEditAvatar } from '../../components/EditAvatar'
import { Input } from '../../components/Input'
import { message, Image, Button } from 'antd'
import { connect } from 'react-redux'
import { actionUploadFile, actionSetAvatar, actionUserUpsert, actionUserUpdate } from '../../actions'
import { Basic, ConstructorModal } from '../../helpers'
export const EditAccount = ({showModalEdit }) => {
    return (
         <Button
            type="primary" style={{
              fontWeight: '600',
              fontSize: '15px',
              transition: ".3s",
              boxShadow: "0 5px 15px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
            }}
    
          onClick={showModalEdit}>Edit Setting</Button>
    )
  }
const EditSetting = ({ info, myId, onSaveUserUpsert }) => {
    const [state, setState] = useState(info)
    const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
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
  
    const saveChange = () => {
      onSaveUserUpsert(state, myId)
      && message.success(`Save success changed!`)
      && setIsModalVisibleEdit(false)
    }

    return (
      <div>
        <EditAccount showModalEdit={showModalEdit}/>
  
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
            onClick={saveChange}
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
              onClick={saveChange}
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
  export const CEditSetting = connect(
    (state) => ({
      myId: state?.auth.payload.sub?.id,
      info: state?.profileData?.aboutMe,
    }),
    {
      onSaveUserUpsert: actionUserUpdate,
    },
  )(EditSetting)
  