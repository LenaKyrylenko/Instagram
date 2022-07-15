import {
  actionAddFullComment,
  actionFindSubComment,
  actionAddSubFullComment,
} from '../actions'
import { Tooltip } from 'antd'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Input, Button } from 'antd'
import { SmileOutlined,SmileFilled } from '@ant-design/icons'
import moment from 'moment'
import React, { useState } from 'react'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import {  Comment,Avatar } from 'antd';
import user from '../materials/user.png'

export const AddComment = ({ addComment, postId }) => {
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
          style={{
            color: '#108ee9',
            position: 'absolute',
            bottom: '160px',
            right: '30px',
          }}
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
          width: '40%',
          marginLeft: '10px',
          marginRight: '10px',
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
        style={{ fontSize: 'xx-large', marginRight: '30px' }}
      
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

const CommentData = ({ createdAt }) => {
  return (
    <Tooltip
      color={'#108ee9'}
      style={{ paddingLeft: '10px' }}
      title={moment(new Date(+createdAt)).format('lll')}
    >
      {moment(new Date(+createdAt))
        .startOf()
        .fromNow()}
    </Tooltip>
  )
}

export const Comments =  ({
  comments,
  postId,
  commentsFind,
  addCommentReply,
  children,
  close,
  findSubComment,
  onGetLikes,
  onGetType
}) => {
  const [opened, setOpened] = useState(close)
  return (
    <>
      {comments 
        
        ? 
        comments?.map((comment) => (
          <Comment
      
            author={ <Link
              to={`/profile/${comment?.owner?._id}`}
            >
                {comment?.owner?.login || 'Anon'}
             
            </Link>}
        
            avatar= 
            {comment.owner?.avatar ? (
              <Link
              to={`/profile/${comment?.owner?._id}`}
            >
                <Avatar
                  size={30}
                  src={'/' + comment.owner?.avatar?.url}
                style={{ marginLeft: '15px' }}
                alt={comment.owner?.login || 'Anon'}
                />
                </Link>
            ) : (
              <Link
              to={`/profile/${comment?.owner?._id}`}
            >
                <Avatar size={30}
                  src={user}
                  style={{ marginLeft: '15px' }}
                  alt={comment.owner?.login || 'Anon'}
                  />
              </Link>
              )}
  
            content=
            {
              <p>
                {comment?.text}
                </p>
            }
           
            datetime={
              <CommentData createdAt={comment?.createdAt} />
            }
          />

            
     )) : <h3> No comments </h3>}
    </>)
}

export const CComments = connect(
  (state) => ({
    postId: state.promise.onePost?.payload?._id,
    addComment: state.promise?.addComment?.payload,
    addSubComment: state.promise?.addSubComment,
  }),
  {
    addCommentReply: actionAddSubFullComment,
    findSubComment: actionFindSubComment,
  },
)(Comments)
