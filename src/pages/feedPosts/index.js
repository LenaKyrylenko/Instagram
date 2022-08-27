import React, { useState, useEffect } from 'react'
import { actionFullAllGetPostsSaga } from '../../actions/typeSaga/feedTypesSaga'
import { actionAddCommentFeedTypeSaga } from '../../actions/typeSaga/commentTypesSaga'
import { actionClearFeedPostsType } from '../../actions/types/feedTypes'
import { Provider, connect } from 'react-redux'
import { Divider } from 'antd'
import { CPost } from '../onePost'
import { Row, Col } from 'antd'
import LinkToUser from '../../components/LinkToUser'
import { Comments } from '../../components/comment/Comment'
import AddComment from '../../components/comment/AddComment'
import { MyCarousel } from '../../components/post/Carousel'
import load from '../../materials/load.gif'
import {
  actionFullOnePostSaga,
  actionAddFullCommentSaga,
} from '../../actions/typeSaga/postTypesSaga'
import {
  actionFindSubCommentTypeSaga,
  actionFindSubCommentFeedTypeSaga,
} from '../../actions/typeSaga/postTypesSaga'
import { CLikeFeed } from '../../components/like/Like'
const MyPostFeed = ({
  postsFeed = [],
  onPostsFeed,
  addComment,
  onClearFeed,
  postsFeedPromise,
}) => {
  const [checkScroll, setScroll] = useState(true)

  useEffect(() => {
    if (checkScroll) {
      onPostsFeed()
    }
    setScroll(false)
  }, [checkScroll])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return () => {
      document.removeEventListener('scroll', scrollHandler)
      onClearFeed()
    }
  }, [])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
  }, [postsFeed.length])

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      200
    ) {
      setScroll(true)
      document.removeEventListener('scroll', scrollHandler)
    }
  }

  return (
    <div className="PostsFeed">
      <Row>
        <Col
          xl={{ offset: 6, span: 12 }}
          lg={{ offset: 6, span: 15 }}
          md={{ offset: 3, span: 17 }}
          sm={{ offset: 3, span: 20 }}
          xs={{ offset: 1, span: 22 }}
        >
          <div>
            {postsFeed?.length == 0 && (
              <div style={{ textAlign: 'center' }}>
                <p style={{fontSize:'20px'}}> You have no posts to feed! </p>
                <p style={{fontSize:'20px'}}> Post and follow other users! </p>
              </div>
            )}
            {(postsFeed || []).map(
              ({ _id, images, title, text, owner, comments, likes }) => (
                <div className="PostsFeed-one">
                  <Col
                    xl={{ offset: 1, span: 12 }}
                    lg={{ offset: 1, span: 15 }}
                  >
                    <LinkToUser
                      className="Owner"
                      _id={owner?._id}
                      key={_id}
                      login={owner?.login}
                      avatar={owner?.avatar}
                      size={40}
                    />
                  </Col>
                  <Col
                    xs={{ offset: 1, span: 22 }}
                  
                  >
            
                  <MyCarousel
                    images={images}
                   
                    />
                  </Col>
                  <div style={{ margin: '0 5%' }}>
                    <p className="Title"> Title: {title || ''}</p>
                    <p className="Title"> Text: {text || ''}</p>
                    <p>
                    <Divider>Comments</Divider></p>
                    <div style={{
                      margin: '10px',
                      position: 'relative'
                    }}>
                      <CCommentsForFeed postId={_id} comments={comments} />
                      <div className='FooterFeed'>
                        <CLikeFeed likes={likes} postId={_id} />
                        <AddComment
                          addComment={addComment}
                          postId={_id}
                          style={{
                            position: 'absolute', width: '250px',
                            bottom: '80px', right: '0px'
                          }}
                          // xs={{
                          //   style: {
                          //     position: 'absolute',
                          //     bottom: '100px', right: '30px'
                          //   }
                          // }}
                      
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </Col>
      </Row>
      {postsFeedPromise?.status == 'PENDING' && (
        <img
          style={{
            display: 'block',
            margin: '0 auto',
            padding: '10px',
          }}
          src={load}
          width="100"
          height="100"
        />
      )}
    </div>
  )
}

const CCommentsForFeed = connect(
  (state) => ({
    addSubComment: state.promise?.addSubComment,
    addComment: state.promise?.addComment?.payload,
  }),
  {
    findSubComment: actionFindSubCommentFeedTypeSaga,
  },
)(Comments)

export const CPostForFeed = connect(
  (state) => ({
    postsFeed: state.feed?.postsFeed || [],
    addComment: state.promise?.addComment?.payload,
    postsFeedPromise: state.promise?.postsFeed,
  }),
  {
    onPostsFeed: actionFullAllGetPostsSaga,
    onClearFeed: actionClearFeedPostsType,
    addComment: actionAddCommentFeedTypeSaga,
  },
)(MyPostFeed)
