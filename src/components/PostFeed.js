import React, { useMemo, useState, useEffect } from 'react'
import {
  actionAllPostsFeed,
  actionFullAllGetPosts, actionAddFullComment, actionFindSubComment,
  actionAddSubFullComment, actionFindLikes, actionGetFindLiked, actionDeleteFullLike,
  actionAddFullLikeForFeed,actionDeleteFullLikeForFeed,actionAddFullLike
} from '../actions'
import {actionFullFeed
  , actionClearFeedPosts, actionAddFullCommentFeed,
  actionAddFullLikeFeed,actionDeleteFullLikeFeed
} from '../reducers'

import { Link} from 'react-router-dom'
import { Provider, connect } from 'react-redux'
import { Upload, Button, DatePicker, Space } from 'antd'
import user from '../materials/user.png'
import { Avatar, Image, Divider, Radio } from 'antd'
import { CPost, MyCarousel } from './Post'
import { Row, Col } from 'antd';
import LinkToUser from './LinkToUser'
import { CComments, AddComment, Comments } from './Post_Comment'
import { Like, Likes } from './Like'

const MyPostFeed = ({my_Id, postsFeed = [],onPostsFeed,addLike,deleteLike, clearDataProfile,addComment }) => {
  const [checkScroll, setCheckScroll] = useState(true);

  useEffect(() => {
    if (checkScroll) {
      onPostsFeed();
      setCheckScroll(false);
    }
  }, [checkScroll]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
      // clearDataProfile()
    }
  }, [postsFeed]);

  const scrollHandler = (e) => {
    if(e.target.documentElement.scrollHeight - e.target.documentElement.scrollTop - e.target.documentElement.clientHeight <20)
    // if (e.target.documentElement.scrollHeight -
    //   (e.target.documentElement.scrollTop + window.innerHeight) < 20)
    { setCheckScroll(true) }
  };

  
  return (
    <>
      <div className='PostsFeed'>
      <h2 >Feed</h2>
      <Row>
        <Col span={12} offset={6}>
          <div >
              {/* {console.log('POSTFEED', postsFeed?.owner)} */}
              {
                (postsFeed?.length == 0) &&
                <div>
                <h1> У вас нету постов для ленты! </h1>
              <h1> Выставляйте посты и подписывайтесь на других пользователей! </h1>
                </div>
              }
            {
                (postsFeed || []).map(({ _id, images, title, text, owner,comments,likes }) => (
                <div className='PostFeed'>
                <LinkToUser owner={owner} size='70px'/>
                    {/* {console.log('POSTFEED OWNEEER', owner)} */}
                  <MyCarousel images={images} style={{ marginTop: '60px' }} />
                  <h1> Title: {title || ''}</h1>
                    <h1> Text: {text || ''}</h1>
                    <Divider>Comments</Divider>
      <div className="ScrollForFeed">

      <CCommentsForFeed postId={_id}comments={comments || []} />
        
     </div>
                    {console.log('post feed id', _id)}
                    <div style={{ display: 'flex', margin: '50px 10px' }}>
                      
                    <CLikeForFeed likes={likes} postId={_id}/>
        
       {/* <HeartTwoTone twoToneColor="#eb2f96" /> */}
            <AddComment addComment={addComment} postId={_id} />
        </div>
                </div>
              ))
            }
          </div>
        </Col>
        </Row>
        </div>
      {/* </div> */}
  
      {/* <PagePost onePost={postsFeed}/> <MyCarousel images={postsFeed?.images} />*/}
    </>
  )
}

const CCommentsForFeed = connect((state) => ({
  
  addComment: state.promise?.addComment?.payload,
  addSubComment: state.promise?.addSubComment,
}), {
  addComment: actionAddFullCommentFeed, 
  addCommentReply: actionAddSubFullComment,
findSubComment: actionFindSubComment,

})(Comments)
  
  export const CPostForFeed = connect(
    (state) => ({
      my_Id: state.auth.payload.sub.id || '',
      postsFeed: state.feed?.postsFeed,
      addComment: state.promise?.addComment?.payload,
    }),
    {
      onPostsFeed: actionFullAllGetPosts,
      clearDataProfile: actionClearFeedPosts,
      addComment: actionAddFullCommentFeed,
      addCommentReply: actionAddSubFullComment,
      addLike:actionAddFullLikeForFeed
    },
)(MyPostFeed)

const AllLikeComp = ({ my_Id, addLike, deleteLike, likes, postId }) =>
<Like my_Id={my_Id} addLike={addLike} deleteLike={deleteLike} likes={likes} postId={postId}>
<Likes likes={likes} />
</Like>
export const CLikeForFeed = connect((state) => ({
  my_Id: state.auth.payload.sub.id || '',
  addLike: state.promise?.addLike?.payload,
  deleteLike: state.promise?.deleteLike?.payload,


}), {
  addLike: actionAddFullLikeFeed,
  // findLikes: actionGetFindLiked,
  deleteLike: actionDeleteFullLikeFeed
  // findLikes: actionFindLikes
})(AllLikeComp)