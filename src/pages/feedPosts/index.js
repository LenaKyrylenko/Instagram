import React, { useMemo, useState, useEffect } from 'react'
import {
  actionAllPostsFeed,
  actionFullAllGetPosts,
  actionAddSubFullComment,
  actionFindLikes,
  actionGetFindLiked,
  actionDeleteFullLike,
  actionAddFullLikeForFeed,
  actionDeleteFullLikeForFeed,
  actionAddFullLike,
} from '../../actions'
import { actionClearFeedPostsType,actionAddCommentFeedTypeSaga } from
  '../../redux/reducers/feedReducer'
import { Link } from 'react-router-dom'
import { Provider, connect } from 'react-redux'
import { Upload, Button, DatePicker, Space } from 'antd'
import { Avatar, Image, Divider, Radio } from 'antd'
import { CPost } from '../onePost'
import { Row, Col } from 'antd'
import LinkToUser from '../../components/LinkToUser'
import { Comments } from '../../components/comment/Comment'
import { AddComment} from '../../components/comment/AddComment'
import { Like, Likes } from '../../components/Like'
import { MyCarousel } from '../../components/Carousel'
import load from '../../materials/load.gif'
const MyPostFeed = ({
  // myData,
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
                  <div className='PostFeed'>
                    <LinkToUser _id={owner?._id} key={_id} style={{marginLeft:"50px"}}
                      login={owner?.login} avatar={owner?.avatar}
                      size={50} />
                    <MyCarousel images={images} />
                    <div style={{margin:"0 10%"}}>
                    <h1 className='Title'> Title: {title || ''}</h1>
                    <h1  className='Title'> Text: {text || ''}</h1>
                    <Divider>Comments</Divider>
                    <div style={{ margin: '10px',position: 'relative' }}>
                    <div className="ScrollForFeed">
                      <CCommentsForFeed
                        postId={_id}
                        comments={comments || []}
                      />
                      </div>
                      {/* <center> */}
                      <div style={{ display: 'flex', margin: '20px 0px' }}>
                        {/* <CLikeForFeed likes={likes} postId={_id} /> */}

                          <AddComment addComment={addComment}
                            postId={_id} style={{
                              position: 'absolute', bottom: '70px',
                              zIndex: '100'
                            }} />
                    
                        </div>
                        </div>
                       {/* </center> */}
                    </div>
                  </div>
                //  </div>
                ),
              )}
             
            </div>
          </Col>
        </Row>
        {(postsFeedPromise?.status == "PENDING") &&
                
          <img style={{
            display: 'block',
            margin: '0 auto', padding: '10px'
          }} src={load} width="100" height="100" />
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
    // addComment: actionAddFullCommentFeed,
    // addCommentReply: actionAddSubFullComment,
    // findSubComment: actionFindSubComment,
  },
)(Comments)

export const CPostForFeed = connect(
  (state) => ({
    // myData:  state?.myData.aboutMe || '',
    postsFeed: state.feed?.postsFeed || [],
    addComment: state.promise?.addComment?.payload,
    postsFeedPromise :state.promise?.postsFeed
  }),
  {

    onPostsFeed: actionFullAllGetPosts,
    onClearFeed: actionClearFeedPostsType,
    addComment: actionAddCommentFeedTypeSaga,
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
    // addLike: actionAddFullLikeFeed,
    // deleteLike: actionDeleteFullLikeFeed,
  },
)(AllLikeComp)
