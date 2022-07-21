import { connect } from 'react-redux'
import { message } from 'antd'
import { useEffect } from 'react'
import { actionRegisterTypeSaga } from '../../actions/typeSaga/registerTypesSaga'
import InitialForm from './InitialForm'
import { actionClearPromiseForName } from '../../actions/types/promiseTypes'
const RegisterForm = ({ onLogin, children, register, onClearPromise }) => {
  useEffect(() => {
    if (register?.status === 'FULFILLED' && register?.payload === null) {
      message.error({
        content: 'This login is already in the database',
        style: {
          marginTop: '80px',
        },
      }) && onClearPromise('register')
    }
  }, [register])

  return <InitialForm onLogin={onLogin}>{'Register'}</InitialForm>
}
export const CRegisterForm = connect(
  (state) => ({
    register: state.promise?.register,
  }),
  {
    onLogin: actionRegisterTypeSaga,
    onClearPromise: actionClearPromiseForName,
  },
)(RegisterForm)
