import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Input, Checkbox, Form, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import { message } from 'antd'
import { useEffect } from 'react'
import { ImportOutlined } from '@ant-design/icons'
import {
  actionRegisterTypeSaga,
} from '../../actions/typeSaga/registerTypesSaga'
import InitialForm from './InitialForm'
import { actionClearPromiseForName } from '../../actions/types/promiseTypes'
const RegisterForm = ({ onLogin, children, register,onClearPromise }) => {
 
    useEffect(() => {
        if (register?.status === 'FULFILLED' && register?.payload === null) {
          message.error({
            content: 'This login is already in the database',
            style: {
              marginTop: '80px',
            },
          })
          &&onClearPromise("register")
        }
      }, [register])

 
  return (
    <InitialForm onLogin={onLogin}>
      {"Register"}
    </InitialForm>
  )
}
export const CRegisterForm = connect(
    (state) => ({
      children: `Register`,
      register: state.promise?.register,
    }),
    {
      onLogin: actionRegisterTypeSaga,
      onClearPromise:actionClearPromiseForName

    },
  )(RegisterForm)