import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Input, Checkbox, Form, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import { message } from 'antd'
import { useEffect } from 'react'
import { ImportOutlined } from '@ant-design/icons'
import {
  actionRegisterTypeSaga,
} from '../../redux/saga'
import InitialForm from './InitialForm'

const RegisterForm = ({ onLogin, children, register }) => {
 
    useEffect(() => {
        if (register?.status === 'FULFILLED' && register?.payload === null) {
          message.error({
            content: 'This login is already in the database',
            style: {
              marginTop: '80px',
            },
          })
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
    },
  )(RegisterForm)