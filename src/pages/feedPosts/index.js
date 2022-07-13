import React, { useMemo, useState, useEffect } from 'react'
import {
  actionAllPostsFeed,
  actionFullAllGetPosts,
  actionAddFullComment,
  actionFindSubComment,
  actionAddSubFullComment,
  actionFindLikes,
  actionGetFindLiked,
  actionDeleteFullLike,
  actionAddFullLikeForFeed,
  actionDeleteFullLikeForFeed,
  actionAddFullLike,
} from '../../actions'
import {
  actionFullFeed,

  actionAddFullCommentFeed,
  actionAddFullLikeFeed,
  actionDeleteFullLikeFeed,
 
} from '../../redux/saga'
import {actionClearFeedPosts} from '../../redux/reducers/feed/feedReducer'
import { Link } from 'react-router-dom'
import { Provider, connect } from 'react-redux'
import { Upload, Button, DatePicker, Space } from 'antd'
import { Avatar, Image, Divider, Radio } from 'antd'
import { CPost } from '../../components/Post'
import { Row, Col } from 'antd'
import LinkToUser from '../../components/LinkToUser'
import { AddComment, Comments } from '../../components/Comment'
import { Like, Likes } from '../../components/Like'
import { MyCarousel } from '../../components/Carousel'
import load from '../../materials/load.gif'

const MyPostFeed = ({
  profileData,
  postsFeed = [],
  onPostsFeed,
  addComment,
  onClearFeed,
  postsFeedPromise
}) => {
  const [checkScroll, setScroll] = useState(true)
  useEffect(() => {
    if (checkScroll) {
       console.log('попало в новую порцию постов')
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

  console.log('check scroll ', checkScroll)
  useEffect(() => {
     document.addEventListener('scroll', scrollHandler)
     }, [postsFeed.length])
  
    const scrollHandler = (e) => {
         if (e.target.documentElement.scrollHeight -
           (e.target.documentElement.scrollTop + window.innerHeight) < 200) {
          console.log('SCROLL HANDLER', checkScroll)
          setScroll(true)
          document.removeEventListener('scroll', scrollHandler)
         }
       }

  return (
    <div style={{  marginTop: '50px'}}>
      <div className="PostsFeed" >
        
        <Row>
          <Col span={12} offset={6}>
            <div>
              {postsFeed?.length == 0 && (
                <div>
                <center>
                  <h1> You have no posts to feed! </h1>
                  <h1>
                    {' '}
                    Post and follow other users!{' '}
                    </h1>
                  </center>
                </div>
              )}
              {(postsFeed || []).map(
                ({ _id, images, title, text, owner, comments, likes }) => (
                  <div className="PostFeed" >
                    <LinkToUser _id={owner?._id} key={_id} login={owner?.login} avatar={owner?.avatar} size={50} />
                    <MyCarousel images={images} style={{ marginTop: '60px' }} />
                    <h1 className='Title'> Title: {title || ''}</h1>
                    <h1  className='Title'> Text: {text || ''}</h1>
                    <Divider>Comments</Divider>
                    <div className="ScrollForFeed">
                      <CCommentsForFeed
                        postId={_id}
                        comments={comments || []}
                      />
                      </div>
                      <center>
                      <div style={{ display: 'flex', padding: '20px', marginLeft:'100px' }}>
                        {/* <CLikeForFeed likes={likes} postId={_id} /> */}

                        <AddComment addComment={addComment} postId={_id} />
                      </div>
                       </center>
                    </div>
                 
                ),
              )}
             
            </div>
          </Col>
        </Row>
        {(postsFeedPromise?.status == "PENDING") &&
                
               <img style={{display:'block', margin: '0 auto', padding:'10px' }} src={load} width="100" height="100" />
             }
      </div>
    </div>
  )
}

const CCommentsForFeed = connect(
  (state) => ({
    addComment: state.promise?.addComment?.payload,
    // addSubComment: state.promise?.addSubComment,
  }),
  {
    addComment: actionAddFullCommentFeed,
    // addCommentReply: actionAddSubFullComment,
    // findSubComment: actionFindSubComment,
  },
)(Comments)

export const CPostForFeed = connect(
  (state) => ({
    profileData:  state?.profileData.aboutMe || '',
    postsFeed: state.feed?.postsFeed || [],
    addComment: state.promise?.addComment?.payload,
    postsFeedPromise :state.promise?.postsFeed
  }),
  {
    onPostsFeed: actionFullAllGetPosts,
    onClearFeed: actionClearFeedPosts,
    addComment: actionAddFullCommentFeed,
    // addCommentReply: actionAddSubFullComment,
    // addLike: actionAddFullLikeForFeed,

  },
)(MyPostFeed)

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
export const CLikeForFeed = connect(
  (state) => ({
    my_Id: state.auth?.payload?.sub?.id || '',
    addLike: state.promise?.addLike?.payload,
    deleteLike: state.promise?.deleteLike?.payload,
  }),
  {
    addLike: actionAddFullLikeFeed,
    deleteLike: actionDeleteFullLikeFeed,
  },
)(AllLikeComp)
