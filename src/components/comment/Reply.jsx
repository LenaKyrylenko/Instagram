import React, { useState } from 'react'
import { Input, Button } from 'antd'
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
  