import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import React, { useState } from 'react'
import { Input, Button } from 'antd'
import { SmileOutlined,SmileFilled } from '@ant-design/icons'

export const AddComment = ({ addComment, postId,style, width }) => {
    const [text, setComment] = useState('')
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    console.log('show stickers', showEmojiPicker)
    const handleOK = () => 
      setShowEmojiPicker(!showEmojiPicker)
  
    const addEmoji = ({ native }) => 
    setComment((text + ' ' + native).trim())
  
    return (
      <>
        {showEmojiPicker && (
         
          <Picker
           style={style}
            theme="light"
            native={true}
            showPreview={false}
            showSkinTones={false}
            onSelect={(native) =>
              addEmoji(native)}
            />
        )}
        <Input
          style={{
            display: 'flex',
            width,
            margin:"0 10px"
          }}
          size="large"
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => {
            setComment(e.target.value)
          }}
          onPressEnter={(e) => {
            setComment(e.target.value)
          }}
        />
        {
          !showEmojiPicker ?
          <SmileOutlined
          className="smile-btn"
          style={{ fontSize: 'xx-large', marginRight: '15px' }}
        
          onClick={handleOK}
            />
            :
            <SmileFilled 
            className="smile-btn"
            style={{ color:'#108ee9',fontSize: 'xx-large', marginRight: '30px' }}
          
            onClick={handleOK}
          />
      }
       
        <Button
          size="large"
          disabled={text.length < 1}
          type="primary"
          onClick={(e) => { 
            addComment(postId, text)
              && setComment(e.target.value = '') &&
              setShowEmojiPicker(false)
          }}
        >
          {' '}
          Publish{' '}
        </Button>
      </>
    )
  }
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
  const CommentForReply = ({ addCommentReply, commentId, postId }) => {
    const [comment, setComment] = useState('')
    return (
      <>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            padding: '15px',
            marginLeft: '40px',
          }}
        >
          <Input
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => {
              setComment(e.target.value)
            }}
          />
          <Button
            disabled={comment.length < 1}
            type="primary"
            onClick={() => addCommentReply(postId, commentId, comment)}
          >
            {' '}
            Publish{' '}
          </Button>
        </div>
      </>
    )
  }
  
