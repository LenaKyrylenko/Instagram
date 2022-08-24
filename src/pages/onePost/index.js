import { Link } from 'react-router-dom'

import { Avatar, Divider, Input, Button } from 'antd'
import user from '../../materials/user.png'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
import { CCommentsOnePost } from '../../components/comment/Comment'
import { CPostEditor } from '../createAndEditPost'
import AddComment from '../../components/comment/AddComment'
import {
  actionFullOnePostSaga,
  actionAddFullCommentSaga,
} from '../../actions/typeSaga/postTypesSaga'
import { CLike } from '../../components/like/Like'
import { ConstructorModal } from '../../helpers'
import React, { useState, useEffect } from 'react'

import { LinkToUser } from '../../components/LinkToUser'
import { MyCarousel } from '../../components/post/Carousel'
import { EditMyPostButton } from '../../components/buttons/EditPostButton'

export const PagePost = ({
  my_Id,
  onePost,
  addComment,
  match: {
    params: { _id },
  },
  onPost,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  useEffect(() => {
    onPost(_id)
  }, [_id])

  return (
    <>
      <Row>
        <Col
          xl={{ offset: 1, span: 13 }}
          lg={{ offset: 2, span: 18 }}
          // md={{ offset: 3, span: 17 }}
          // sm={{ offset: 3, span: 15 }}
          xs={{ offset: 2, span: 20 }}
        >
          <div className="OnePost">
            <ConstructorModal
              title={'Edit post'}
              isModalVisible={isModalVisible}
              setIsModalVisible={setIsModalVisible}
            >
              <CPostEditor />
            </ConstructorModal>

            <MyCarousel
              key={onePost?._id}
              style={{ position: 'absolute' }}
              images={onePost?.images}
              carouselWidth={'750px'}
              carouselHeight={'500px'}
            />
            <h3 style={{ textAlign: 'center', padding: '10px' }}>
              Created Post:{' '}
              {new Intl.DateTimeFormat('en-GB').format(onePost?.createdAt)}
            </h3>
          </div>
        </Col>
        <Col
          xl={{ offset: 1, span: 8 }}
          lg={{ offset: 3, span: 17 }}
          xs={{ offset: 2, span: 20 }}
        >
          <div className="OnePost">
            <Col
              xl={{ offset: 1, span: 20 }}
              lg={{ offset: 1, span: 19 }}
              xs={{ offset: 2, span: 20 }}
            >
              <Row justify="space-between" align="middle">
                <LinkToUser
                  _id={onePost?.owner?._id}
                  login={onePost?.owner?.login}
                  avatar={onePost?.owner?.avatar}
                  key={_id}
                  size={50}
                  padding={'0px'}
                />
                {/* <Row span={1}> */}
                {my_Id === onePost?.owner?._id && (
                  <EditMyPostButton _id={_id} />
                )}
                {/* </Row> */}
              </Row>
            </Col>
          </div>

          <Divider />
          <p className="Title"> Title: {onePost?.title || ''} </p>

          <p className="Title"> Text: {onePost?.text || ''} </p>
          <Divider>Comments</Divider>
          <div className="FooterPost">
            <div className="CommentsPost">
              <CCommentsOnePost comments={onePost?.comments} />
            </div>
            <Row>
              <Col
                xl={{ span: 4, offset: 1 }}
                lg={{ span: 3, offset: 1 }}
                xs={{ offset: 1, span: 3 }}
              >
                {/* <div style={{ display: 'flex', margin: '20px 0px' }}> */}
                <CLike likes={onePost?.likes} postId={onePost?._id} />
              </Col>
              {/* <Col xl={{span:10,offset:1}}> */}

              <AddComment
                addComment={addComment}
                style={{
                  position: 'absolute',
                  // bottom: '120px',
                  // right: '30px',
                }}
                // width={'40%'}
                postId={onePost?._id}
              />
              {/* </Col> */}
              {/* </div> */}
            </Row>
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
    onPost: actionFullOnePostSaga,
  },
)(PagePost)
