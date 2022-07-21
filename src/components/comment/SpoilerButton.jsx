import React, { useState } from 'react'
import { Button, Typography } from 'antd'
const { Text } = Typography
export const SpoilerButton = ({ text, children, style }) => {
  const [opened, setOpened] = useState(false)
  return (
    <>
      <Button
        onClick={() => {
          setOpened(!opened)
        }}
        style={style}
      >
        {text}
      </Button>

      {opened && children}
    </>
  )
}
export const ReplyButton = ({ text, children, style }) => {
  const [opened, setOpened] = useState(false)
  return (
    <>
      <Text
        type="secondary"
        strong
        className="ButtonComment"
        onClick={() => {
          setOpened(!opened)
        }}
        style={style}
      >
        {text}
      </Text>
      {opened && children}
    </>
  )
}
