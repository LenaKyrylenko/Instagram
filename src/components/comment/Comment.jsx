import {
  actionAddFullComment,
  actionFindSubComment,
  actionAddSubFullComment,
} from '../../actions'
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
import user from '../../materials/user.png'

import { CommentDate } from './CommentDate'
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
              <CommentDate createdAt={comment?.createdAt} />
            }
          />

            
     )) : <h3> No comments </h3>}
    </>)
}

export const CCommentsOnePost = connect(
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

// export const CCommentsForFeed = connect(
//   (state) => ({
//     // postId: state.promise.onePost?.payload?._id,
//     addComment: state.promise?.addComment?.payload,
//     addSubComment: state.promise?.addSubComment,
//   }),
//   {
//     addCommentReply: actionAddSubFullComment,
//     findSubComment: actionFindSubComment,
//   },
// )(Comments)
