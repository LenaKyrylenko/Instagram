import { connect } from 'react-redux'
import React, { useState } from 'react'
import 'emoji-mart/css/emoji-mart.css'
import { Comment, Avatar } from 'antd'
import { CommentAction } from './Reply'
import { CommentDate } from './CommentDate'
import { actionFindSubCommentTypeSaga } from '../../actions/typeSaga/postTypesSaga'
import CommentAuthor from './CommentAuthor'
import CommentAvatar from './CommentAvatar'
import { ViewComment } from './SpoilerButton'

export const Comments = ({
  comments,
  postId,
  parentId,

  findSubComment,
}) => {
  return (
    <>
      {comments?.length && Object.keys(comments[0])?.length > 1 ? (
        <ViewComment
          text={'View all '}
          count={comments?.length}
          textClosed={'Hide comments'}
        >
          {comments?.map((comment) => {
            return (
              <Comment
                key={comment?._id}
                author={<CommentAuthor owner={comment?.owner} />}
                actions={[<CommentAction commentId={comment?._id} />]}
                avatar={<CommentAvatar owner={comment?.owner} />}
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
          })}
        </ViewComment>
      ) : (
        comments?.length && (
          <p
            className="ButtonComment"
            type="secondary"
            strong
            style={{ margin: '0 auto' }}
            onClick={() => findSubComment(parentId)}
          ></p>
        )
      )}
    </>
  )
}
export const CCommentsOnePost = connect(
  (state) => ({
    postId: state.promise.onePost?.payload?._id,
    addComment: state.promise?.addComment?.payload,
    addSubComment: state.promise?.addSubComment,
  }),
  {
    findSubComment: actionFindSubCommentTypeSaga,
  },
)(Comments)
