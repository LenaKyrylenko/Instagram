import React, { useState } from 'react'
import { CEditAvatar } from '../../components/EditAvatar'
import { CustomInput } from '../../components/Input'
import { message, Button } from 'antd'
import { connect } from 'react-redux'
import { actionChangePassword } from '../../actions/query/aboutMeQuery'
import { actionClearPromiseForName } from '../../actions/types/promiseTypes'
import { Basic, ConstructorModal } from '../../helpers'
import { SpoilerButton } from '../../components/comment/SpoilerButton'
import { actionUserUpdateTypeSaga } from '../../actions/typeSaga/myDataTypesSaga'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
export const EditAccount = ({ showModalEdit }) => {
  return (
    <Button
      type="primary"
      style={{
        fontWeight: '600',
        fontSize: '15px',
        transition: '.3s',
        boxShadow: '0 5px 15px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
      }}
      onClick={showModalEdit}
    >
      Edit Setting
    </Button>
  )
}
const EditSetting = ({
  info,
  myId,
  onSaveUserUpsert,
  onSaveNewPassword,
  changePassword,
}) => {
  const [state, setState] = useState(info)
  const [changePass, setChangePass] = useState(changePassword)
  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false)
  const [checked1, setChecked1] = useState(true)
  const [checked2, setChecked2] = useState(true)

  const showModalEdit = () => {
    setIsModalVisibleEdit(true)
  }
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
  const onChangePassLogin = (event) =>
    setChangePass({
      ...changePass,
      login: event.target.value,
    })
  const onChangePassPassword = (event) =>
    setChangePass({
      ...changePass,
      password: event.target.value,
    })
  const onChangePassNew = (event) =>
    setChangePass({
      ...changePass,
      newPassword: event.target.value,
    })
  const saveChange = () => {
    onSaveUserUpsert(state, myId) &&
      message.success(`Successfully saved changed new login!`) &&
      setIsModalVisibleEdit(false)
  }
  const saveNewPassword = () => {
    onSaveNewPassword(
      changePass.login,
      changePass.password,
      changePass.newPassword,
    )
    if (changePassword?.payload == null && changePass.login != info?.login) {
      message.error(`You entered wrong login/password! Try again!`)
    } else {
      message.success(`Successfully saved changed new password!`) &&
        setIsModalVisibleEdit(false)
    }
  }
  console.log('save pass', changePass?.login != info?.login)
  return (
    <div>
      <EditAccount showModalEdit={showModalEdit} />
      <ConstructorModal
        title={'Edit setting'}
        isModalVisible={isModalVisibleEdit}
        setIsModalVisible={setIsModalVisibleEdit}
        handleCancel={handleCancelEdit}
      >
        <div className='ModalEdit'> 
        <p> Edit avatar </p>
          <SpoilerButton text={'Change avatar'}
            style={{ width: '100%' }}>
            <CEditAvatar
              setIsModalVisibleEdit={setIsModalVisibleEdit} />
        </SpoilerButton>
        <p> Edit login </p>
          <SpoilerButton text={'Change login'}
            style={{ width: '100%' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <CustomInput
              state={state?.login || ''}
              onChangeText={onChangeLogin}
            />
            <Button
              size="large"
              style={{ margin: '10px' }}
              onClick={saveChange}
              disabled={state?.login && state?.login.length >= 5 ? false : true}
              type="primary"
            >
              {' '}
              Save login{' '}
            </Button>
            </div>
            
        </SpoilerButton>

        <p> Edit nick </p>
        <SpoilerButton text={'Change nick'} style={{ width: '100%' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <CustomInput
              state={state?.nick || ''}
              onChangeText={onChangeNick}
            />
            <Button
              style={{ margin: '10px' }}
              disabled={state?.nick && state?.nick.length >= 5 ? false : true}
              onClick={saveChange}
              size="large"
              type="primary"
            >
              Save nick
            </Button>
          </div>
        </SpoilerButton>
        <p> Edit password </p>
          <SpoilerButton text={'Change password'}
            style={{ width: '100%', marginBottom:'10px' }}>
          <p> Login</p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <CustomInput
              state={changePass?.login}
              onChangeText={onChangePassLogin}
              type={true}
            />
          </div>
          <p> Old password</p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <CustomInput
              state={changePass?.password}
              onChangeText={onChangePassPassword}
              checked={checked1}
            />

            {checked1 ? (
              <EyeInvisibleOutlined
                onClick={() => setChecked1(!checked1)}
                style={{ marginLeft: '5px', fontSize: 'xx-large' }}
              />
            ) : (
              <EyeOutlined
                onClick={() => setChecked1(!checked1)}
                style={{ marginLeft: '5px', fontSize: 'xx-large' }}
              />
            )}
          </div>
          <p> New password</p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <CustomInput
              state={changePass?.newPassword || ''}
              checked={checked2}
              onChangeText={onChangePassNew}
            />
            {checked2 ? (
              <EyeInvisibleOutlined
                onClick={() => setChecked2(!checked2)}
                style={{ marginLeft: '5px', fontSize: 'xx-large' }}
              />
            ) : (
              <EyeOutlined
                onClick={() => setChecked2(!checked2)}
                style={{ marginLeft: '5px', fontSize: 'xx-large' }}
              />
            )}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Button
              style={{ margin: '10px' }}
              disabled={
                changePass?.login &&
                changePass?.password &&
                /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9!@#$%^&*a-zA-Z]{8,}/g.test(
                  changePass?.newPassword,
                )
                  ? false
                  : true
              }
              onClick={saveNewPassword}
              size="x-large"
              type="primary"
            >
              Save new password
            </Button>
          </div>
          </SpoilerButton>
          </div>
      </ConstructorModal>
    </div>
  )
}
export const CEditSetting = connect(
  (state) => ({
    myId: state?.auth.payload.sub?.id,
    info: state?.myData?.aboutMe,
    changePassword: state.promise?.newPassword,
  }),
  {
    onSaveUserUpsert: actionUserUpdateTypeSaga,
    onSaveNewPassword: actionChangePassword,
    onClearPromise: actionClearPromiseForName,
  },
)(EditSetting)
