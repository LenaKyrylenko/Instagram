import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import React, { useState } from 'react'
import { Input, Col, Button } from 'antd'
import { SmileOutlined, SmileFilled, SendOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

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

      <Col
        xl={{ span: 13, offset: 1 }}
        lg={{ span: 13, offset: 1 }}
        md={{ offset: 1, span: 16 }}
        sm={{ offset: 1, span: 13 }}
        xs={{ offset: 1, span: 14 }}
      >
        <Input
          style={{
            display: 'flex',
            // display: 'flex',
            // width,
            // margin: '5px 10px',
            // padding:'5px'
            // width:'100%'
          }}
          xl={{ size: 'large' }}
          xs={{ size: 'small' }}
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => {
            setComment(e.target.value)
          }}
          onPressEnter={(e) => setComment(e.target.value)}
        />
      </Col>

      <Col
        xl={{ offset: 1, span: 1 }}
        sm={{ offset: 1, span: 1 }}
        xs={{ offset: 1, span: 1 }}
      >
        {!showEmojiPicker ? (
          <SmileOutlined className="SmileBtn" onClick={handleOK} />
        ) : (
          <SmileFilled className="SmileBtnFilled" onClick={handleOK} />
        )}
      </Col>
      <Col
        xl={{ offset: 1, span: 1 }}
        sm={{ offset: 1, span: 1 }}
        xs={{ offset: 1 }}
      >
        <Button
          type="text"
          className="Send"
          disabled={text.length < 1}
          onClick={(e) => {
            addComment(postId, text) && setComment((e.target.value = ''))
          }}
        >
          <SendOutlined className="Send" type="primary" />
        </Button>
        {/* <Button
          
          xl={{ size: 'large' }}
          xs={{ size: 'small' }}

        disabled={text.length < 1}
        type="primary"
        onClick={(e) => {
          addComment(postId, text) &&
          setComment((e.target.value = ''))
        }}
      >
        {' '}
        Publish{' '}
        </Button> */}
      </Col>
    </>
  )
}

export default AddComment
