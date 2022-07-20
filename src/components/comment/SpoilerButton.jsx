import React, { useState } from 'react'
import { Input, Button, Divider,Typography  } from 'antd'
const { Text, Link } = Typography;
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
       <Text type="secondary" strong
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