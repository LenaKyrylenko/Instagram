import React, { useState } from 'react'
import { Input, Button } from 'antd'
export const SpoilerButton = ({ text, close, children, style }) => {
    const [opened, setOpened] = useState(close)
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