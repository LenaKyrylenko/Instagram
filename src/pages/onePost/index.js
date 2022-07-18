import { Link } from 'react-router-dom'
import {
  actionAddSubFullComment,
  actionDeleteFullLike,
  actionAddFullLike,
} from '../../actions'

import { Avatar, Divider, Input, Button } from 'antd'
import user from '../../materials/user.png'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
import { CComments, CCommentsOnePost } from '../../components/comment/Comment'
import { CPostEditor } from '../createAndEditPost'
import {AddComment} from '../../components/comment/AddComment'
import { actionFullOnePostSaga,actionAddFullCommentSaga } from '../../actions/typeSaga/postActionSaga'
import { CLike} from '../../components/Like'
import { ConstructorModal } from '../../helpers'
import React, { useState, useEffect } from 'react'
import {
  actionAddFullCommentFeed,
} from '../../redux/saga'
import { LinkToUser } from '../../components/LinkToUser'
import { MyCarousel } from '../../components/Carousel'
import {EditMyPostButton} from '../../components/EditPostButton'


export const PagePost = ({
  my_Id,
  onePost,
  addComment,
  match: {
    params: { _id },
  },
  aboutUser = {},
  onPost,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  useEffect(() => {
    onPost(_id)
    console.log('ONE POST _ID', onePost?._id)
  }, [_id])

  return (
    <>
      <Row>
        <Col span={14} style={{marginTop:'100px'}}>
          <ConstructorModal
            title={'Edit post'}
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
          >
            <CPostEditor />
          </ConstructorModal>

          <MyCarousel key={onePost?._id}
            style={{ position: 'absolute' }}
            images={onePost?.images}
          />
          <h3 style={{ textAlign: 'center', padding: '10px' }}>
            Created Post:{' '}
            {new Intl.DateTimeFormat('en-GB').format(onePost?.createdAt)}
          </h3>
        </Col>
        <Col span={8}>
          <div style={{ display: 'flex', flexDirection: 'row', marginTop:'100px' }}>
            
            <LinkToUser
              _id={onePost?.owner?._id}
              login={onePost?.owner?.login}
              avatar={onePost?.owner?.avatar}
              key={_id}
            size={50} padding={'0px'} />
            <Row span={1}>
              {my_Id === onePost?.owner?._id && <EditMyPostButton _id={_id} />}
            </Row>
          </div>

          <Divider />
          <h2> Title: {onePost?.title || ''} </h2>

          <h2> Text: {onePost?.text || ''} </h2>
          <Divider>Comments</Divider>
          <div className="Scroll">
            <CCommentsOnePost
              postId={onePost?._id}
              comments={onePost?.comments || []}
            />
          </div>
          <div style={{ display: 'flex', margin: '20px 0px' }}>
            <CLike likes={onePost?.likes} postId={onePost?._id} />
            <AddComment addComment={addComment}
              style={{
                position: 'absolute',
                bottom: "120px", right: "30px"
              }}
              width={'40%'}
              postId={onePost?._id} />
          </div>
        </Col>
      </Row>
    </>
  )
}

export const CPost = connect(
  (state) => ({
    onePost: state?.post.onePost,
    my_Id: state.auth.payload?.sub?.id || '',
    aboutUser: state.userData?.aboutUser,
  }),
  {
    addComment: actionAddFullCommentSaga,
    // addCommentReply: actionAddSubFullComment,
    onPost: actionFullOnePostSaga,
  },
)(PagePost)

