import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Input, Checkbox, Form, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import { message } from 'antd'
import { useEffect } from 'react'
import { ImportOutlined } from '@ant-design/icons'
// import {
//   actionClearDataLogoutTypeSaga,
//   actionRegisterTypeSaga,
// } from '../../redux/saga'
import InitialForm from './InitialForm'
import { actionClearPromiseForName } from '../../actions/types/promiseTypes'
import { actionLoginTypeSaga } from '../../actions/typeSaga/loginTypesSaga'
const LoginForm = ({ onLogin, children, auth, onClearPromise }) => {
 
  useEffect(() => {
    if (auth?.status === 'FULFILLED' && auth?.payload === null) {
      message.error({
        content: 'You entered wrong login or password',
        style: {
          marginTop: '80px',
        },
      })
 && onClearPromise('auth')
    }
   
  }, [auth])

 
  return (
    <InitialForm onLogin={onLogin}>
      {"Sign In"}
    </InitialForm>
  )
}
export const CLoginForm = connect(
    (state) => ({
      auth: state.promise?.auth,
    }),
    {
      onLogin: actionLoginTypeSaga,
      onClearPromise:actionClearPromiseForName
  
    },
  )(LoginForm)