import React, { useMemo, useState, useEffect } from 'react'
import {
  actionAllPostsFeed,
  actionFullAllGetPosts,
} from '../actions'
import {actionFullFeed
, actionClearFeedPosts} from '../reducers'

import { Link} from 'react-router-dom'
import { Provider, connect } from 'react-redux'
import { Upload, Button, DatePicker, Space } from 'antd'
import user from '../materials/user.png'
import { Avatar, Image, Divider, Radio } from 'antd'
import { CPost, MyCarousel } from './Post'
import { Row, Col } from 'antd';

const MyPostFeed = ({ postsFeed = [], onPostsFeed, clearDataProfile }) => {
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
      <div className='Scrolling'>
      <h2 >Feed</h2>
      <Row>

        <Col span={12} offset={6}>
          <div >
            {console.log('POSTFEED', postsFeed)}
            {
              (postsFeed || []).map(({ images, title, text, owner }) => (
                <div className='PostFeed'>
                  <Link to={`/profile/${owner?._id}`} >
                    {owner?.avatar ? (
                      <Avatar
                        style={{ width: '50px', height: '50px' }}
                        src={'/' + owner?.avatar?.url}
                      />
                    ) : (
                      <Avatar style={{ width: '50px', height: '50px' }} src={user} />
                    )}
                    <h1> {owner?.login || 'anon'}</h1>
                  </Link>
  
                  <MyCarousel images={images} style={{ marginTop: '60px' }} />
                  <h1> Title: {title || ''}</h1>
                  <h1> Text: {text || ''}</h1>
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

  export const CPostForFeed = connect(
    (state) => ({
        postsFeed: state.feed?.postsFeed,
    }),
    { onPostsFeed: actionFullAllGetPosts,clearDataProfile:actionClearFeedPosts },
)(MyPostFeed)