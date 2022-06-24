import { Link } from 'react-router-dom'
import {
  actionAddFullComment,
  actionAddSubFullComment,
  actionDeleteFullLike,
  actionAddFullLike,
} from '../actions'
import photoNotFound from '../materials/photoNotFound.png'
import { LeftCircleFilled, RightCircleFilled } from '@ant-design/icons'
import { Carousel, Avatar, Divider, Input, Button } from 'antd'
import user from '../materials/user.png'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
import { CComments, AddComment } from '../components/Post_Comment'
import { CPostEditor } from '../components/NewPost'
import { actionFullOnePost } from '../reducers'
import { Like, Likes } from './Like'
import { ConstructorModal } from '../helpers'
import React, { useState, useEffect } from 'react'
import {
  actionFullFeed,
  actionClearFeedPosts,
  actionAddFullCommentFeed,
  actionAddFullLikeFeed,
  actionDeleteFullLikeFeed,
} from '../reducers'

const EditMyPost = ({ _id }) => {
  return (
    <>
      <Link to={`/edit/post/${_id}`}>
        <Button
          style={{ marginLeft: '300px', width: '100px' }}
          size="large"
          type="primary"
        >
          Edit Post
        </Button>
      </Link>
    </>
  )
}
export const Card = ({ post }) => (
  <>
    <Link to={`/post/${post?._id}`}>
      {post?.images && post?.images[0] && post.images[0]?.url ? (
        <img
          className="Card"
          src={'/' + post.images[0].url}
          style={{
            width: '250px',
            height: '250px',
            objectFit: 'cover',
          }}
        />
      ) : (
        <img
          className="Card"
          src={photoNotFound}
          style={{
            width: '250px',
            height: '250px',
            objectFit: 'cover',
          }}
        />
      )}
    </Link>
  </>
)
const SampleNextArrow = (props) => {
  const { onClick } = props
  return (
    <div
      style={{
        fontSize: '50px',
        color: '#41607d',
        position: 'absolute',
        left: '100%',
        top: '50%',
        margin: 'auto',
        paddingLeft: '20px',
        textShadow: 'black 1px 0 10px',
      }}
      onClick={onClick}
    >
      <RightCircleFilled />
    </div>
  )
}

const SamplePrevArrow = (props) => {
  const {  onClick } = props
  return (
    <div
      style={{
        color: '#41607d',
        fontSize: '50px',
        position: 'absolute',
        margin: 'auto',
        right: '100%',
        top: '50%',
        paddingRight: '20px',
      }}
      onClick={onClick}
    >
      <LeftCircleFilled />
    </div>
  )
}

export const MyCarousel = ({ images = [] }) => {
  return (
    <>
      <div className="MyCarousel">
        <Carousel
          effect="fade"
          arrows
          nextArrow={<SampleNextArrow />}
          prevArrow={<SamplePrevArrow />}
        >
          {images ? (
            images?.map(
              (i, index) =>
                i?.url && (
                  <div key={index}>
                    <img key={index} className="PostImage" src={'/' + i?.url} />
                  </div>
                ),
            )
          ) : (
            <div>
              <img className="PostImage" src={photoNotFound} />
            </div>
          )}
        </Carousel>
      </div>
    </>
  )
}

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
        <Col span={14}>
          <ConstructorModal
            title={'Edit post'}
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
          >
            <CPostEditor />
          </ConstructorModal>

          <MyCarousel
            style={{ position: 'absolute' }}
            images={onePost?.images}
          />
          <h3 style={{ textAlign: 'center', padding: '30px' }}>
            Created Post:{' '}
            {new Intl.DateTimeFormat('en-GB').format(onePost?.createdAt)}
          </h3>
        </Col>
        <Col span={8}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {onePost?.owner?.avatar ? (
              <Avatar
                style={{ width: '50px', height: '50px' }}
                src={'/' + onePost?.owner?.avatar?.url}
              />
            ) : (
              <Avatar style={{ width: '50px', height: '50px' }} src={user} />
            )}
            <h1 style={{ marginLeft: '20px' }}>
              {' '}
              {onePost?.owner?.login || 'Anon'}
            </h1>
            <Row span={1}>
              {my_Id === onePost?.owner?._id && <EditMyPost _id={_id} />}
            </Row>
          </div>

          <Divider />
          <h2> Title: {onePost?.title || ''} </h2>

          <h2> Text: {onePost?.text || ''} </h2>
          <Divider>Comments</Divider>
          <div className="Scroll">
            <CComments
              postId={onePost?._id}
              comments={onePost?.comments || []}
            />
          </div>
          <div style={{ display: 'flex', margin: '50px 10px' }}>
            <CLike likes={onePost?.likes} postId={onePost?._id} />
            <AddComment addComment={addComment} postId={onePost?._id} />
          </div>
        </Col>
      </Row>
    </>
  )
}

export const CPost = connect(
  (state) => ({
    onePost: state.promise?.onePost?.payload,
    my_Id: state.auth.payload?.sub?.id || '',
    aboutUser: state.profilePage?.aboutUser,
    addComment: state.promise?.addComment?.payload,
  }),
  {
    addComment: actionAddFullCommentFeed,
    addCommentReply: actionAddSubFullComment,
    onPost: actionFullOnePost,
  },
)(PagePost)

const AllLikeComp = ({ my_Id, addLike, deleteLike, likes, postId }) => (
  <Like
    my_Id={my_Id}
    addLike={addLike}
    deleteLike={deleteLike}
    likes={likes}
    postId={postId}
  >
    <Likes likes={likes} />
  </Like>
)
export const CLike = connect(
  (state) => ({
    my_Id: state.auth?.payload?.sub?.id || '',
  }),
  {
    addLike: actionAddFullLikeFeed,
    deleteLike: actionDeleteFullLikeFeed,
  },
)(AllLikeComp)
