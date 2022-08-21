import React, { useState } from 'react'
import { Button, Typography } from 'antd'
const { Text } = Typography
const { Title } = Typography


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
export const ViewComment = ({ text, count, children, style,textClosed }) => {
  const [opened, setOpened] = useState(false)
  return (
    <>
      <Text
        type="secondary"
        strong
        // level={1}
        style={{fontSize:'14px'}}
        className="ButtonComment"
        onClick={() => {
          setOpened(!opened)
        }}
        // style={style}
      >
       { !opened ? text + count + ' comments'  : textClosed}

      </Text>
      {<div className={opened && children ? 'ScrollForFeed' : 'WithOutScroll'}>
        {opened && children}
      </div>
      }
    </>
  )
}
