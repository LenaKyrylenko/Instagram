import React, { useMemo, useState, useEffect } from 'react'
import {
    actionAllPostsFeed,
  } from '../actions'
import { Link} from 'react-router-dom'
import { Provider, connect } from 'react-redux'
import { Upload, Button, DatePicker, Space } from 'antd'
import user from '../materials/user.png'
import { Avatar, Image, Divider, Radio } from 'antd'
import { CPost, MyCarousel } from './Post'

const MyPostFeed = ({ postsFeed, onPostsFeed }) => {
    useEffect(() => {
      onPostsFeed()
    }, [])
  
    return (
      <>
        <h2>Feed</h2>
            <div>
                {console.log('POSTFEED', postsFeed)}
          {
            (postsFeed || []).map(({ images, title, text, owner }) => (
              <div className='PostFeed'>
                {owner?.avatar ? (
                  <Avatar
                    style={{ width: '50px', height: '50px' }}
                    src={'/' + owner?.avatar?.url}
                  />
                ) : (
                  <Avatar style={{ width: '50px', height: '50px' }} src={user} />
                )}
                <h1> {owner?.login || 'anon'}</h1>
  
                <MyCarousel images={images} style={{ marginTop: '60px' }} />
                <h1> Title: {title || ''}</h1>
                <h1> Text: {text || ''}</h1>
              </div>
            ))
          }
        </div>
  
        {/* </div> */}
  
        {/* <PagePost onePost={postsFeed}/> <MyCarousel images={postsFeed?.images} />*/}
      </>
    )
  }
  export const CPostForFeed = connect(
    (state) => ({
        postsFeed: state.promise?.postsFeed?.payload,
    }),
    { onPostsFeed: actionAllPostsFeed },
)(MyPostFeed)
  
export const Feed = ({ aboutMe, onAllFollowing, onPostsFeed, postsFeed }) => {
    console.log('POST FEED', postsFeed)
    return (
      <>
        <Link className="Feed" to={`/feed`}>
          <Button
            className="Feed"
            size="large"
            onClick={() => console.log('click')}
          >
            {' '}
            Feed{' '}
          </Button>
        </Link>
      </>
    )
}
