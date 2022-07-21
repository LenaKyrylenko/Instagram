import { connect } from 'react-redux'
import React, { useState } from 'react'
import 'emoji-mart/css/emoji-mart.css'
import { Comment, Avatar } from 'antd'
import { CommentAction } from './Reply'
import { CommentDate } from './CommentDate'
import {
  actionAddSubCommentTypeSaga,
  actionFindSubCommentTypeSaga,
} from '../../actions/typeSaga/postTypesSaga'
import { Typography } from 'antd'
import CommentAuthor from './CommentAuthor'
import CommentAvatar from './CommentAvatar'
const { Text } = Typography
export const Comments = ({
  comments,
  postId,
  parentId,
  findSubComment,
}) => {
  return (
    <>
      {comments?.length && Object.keys(comments[0])?.length > 1
        ? comments?.map((comment) => {
            return (
              <Comment
                key={comment?._id}
                author={
                 <CommentAuthor owner={comment?.owner}/>
                }
                actions={[<CommentAction commentId={comment?._id} />]}
                avatar={
                 <CommentAvatar owner={comment?.owner}/>
                }
                content={<p>{comment?.text}</p>}
                datetime={<CommentDate createdAt={comment?.createdAt} />}
              >
                <Comments
                  postId={postId}
                  comments={comment?.answers}
                  parentId={comment?._id}
                  findSubComment={findSubComment}
                />
              </Comment>
            )
          })
        : comments?.length && (
            <Text
              type="secondary"
              strong
              style={{ margin: '0 auto' }}
              onClick={() => findSubComment(parentId)}
            >
              __ View answers ({comments.length})
            </Text>
          )}
    </>
  )
}
export const CCommentsOnePost = connect(
  (state) => ({
    postId: state.promise.onePost?.payload?._id,
    comments: state?.post.onePost?.comments,
    addComment: state.promise?.addComment?.payload,
    addSubComment: state.promise?.addSubComment,
  }),
  {
    findSubComment: actionFindSubCommentTypeSaga,
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
