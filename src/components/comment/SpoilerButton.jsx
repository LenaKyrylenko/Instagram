import React, { useState } from 'react'
import { Button } from 'antd'
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
      <p
        strong
        className="ButtonComment"
        onClick={() => {
          setOpened(!opened)
        }}
        style={style}
      >
        {text}
      </p>
      {opened && children}
    </>
  )
}
export const ViewComment = ({ text, count, children, style, textClosed }) => {
  const [opened, setOpened] = useState(false)
  return (
    <>
      <p
        strong
        className="ButtonComment"
        onClick={() => {
          setOpened(!opened)
        }}
      >
        {!opened ? text + count + ' comments' : textClosed}
      </p>
      {
        <div className={opened && children ? 'ScrollForFeed' : 'WithOutScroll'}>
          {opened && children}
        </div>
      }
    </>
  )
}
