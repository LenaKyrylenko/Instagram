import React, { useState } from 'react'
import { Input, Button } from 'antd'
import { connect } from 'react-redux'
import { SendOutlined } from '@ant-design/icons'

import { actionAddSubCommentTypeSaga } from '../../actions/typeSaga/postTypesSaga'
import { ReplyButton } from './SpoilerButton'
export const CommentAction = ({ commentId }) => {
  return (
    <>
      <div style={{ flexDirection: 'column' }}>
        <ReplyButton
          text={'Reply to'}
          style={{ margin: '0 auto', padding: '0 auto' }}
        >
          <CCommentsForReply commentId={commentId} />
        </ReplyButton>
      </div>
    </>
  )
}

const CommentForReply = ({ addCommentReply, commentId }) => {
  const [newResult, setComment] = useState('')

  console.log('comment', newResult)
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          margin: '5px',
          marginLeft: '10px',
        }}
      >
        <Input
          placeholder="Add a comment..."
          value={newResult}
          onChange={(e) => {
            setComment(e.target.value)
          }}
        />
        <Button
          type="text"
          className="Send"
          disabled={newResult.length < 1}
          onClick={(e) => {
            addCommentReply(commentId, newResult) &&
              setComment((e.target.value = ''))
          }}
        >
          <SendOutlined className="Send" type="primary" />
        </Button>
      </div>
    </>
  )
}

const CCommentsForReply = connect(null, {
  addCommentReply: actionAddSubCommentTypeSaga,
})(CommentForReply)
