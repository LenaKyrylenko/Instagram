import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import React, { useState } from 'react'
import { Input, Button } from 'antd'
import { SmileOutlined, SmileFilled } from '@ant-design/icons'

 const AddComment = ({ addComment, postId, style, width }) => {
  const [text, setComment] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const handleOK = () => setShowEmojiPicker(!showEmojiPicker)

  const addEmoji = ({ native }) => setComment((text + ' ' + native).trim())

  return (
    <>
      {showEmojiPicker && (
        <Picker
          style={style}
          theme="light"
          native={true}
          showPreview={false}
          showSkinTones={false}
          onSelect={(native) => addEmoji(native)}
        />
      )}
      <Input
        style={{
          display: 'flex',
          width,
          margin: '0 10px',
        }}
        size="large"
        placeholder="Add a comment..."
        value={text}
        onChange={(e) => {
          setComment(e.target.value)
        }}
        onPressEnter={(e) => 
          setComment(e.target.value)
       }
      />
      {!showEmojiPicker ? (
        <SmileOutlined
          className="SmileBtn"
          onClick={handleOK}
        />
      ) : (
        <SmileFilled
          className="SmileBtnFilled"
          onClick={handleOK}
        />
      )}
      <Button
        size="large"
        disabled={text.length < 1}
        type="primary"
        onClick={(e) => {
          addComment(postId, text) && setComment((e.target.value = ''))
        }}
      >
        {' '}
        Publish{' '}
      </Button>
    </>
  )
}

export default AddComment