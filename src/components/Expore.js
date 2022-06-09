// explorePosts
import {
    actionOnePost, actionExplorePosts
} from '../actions'
import { Row, Col } from 'antd'
import { Card } from './Post'
import React, { useMemo, useState, useEffect } from 'react'
import { Provider, connect } from 'react-redux'
  
const ExplorePosts = ({explorePosts,onPost,onExlorePosts }) => {
    useEffect(() => {
        onExlorePosts()
       
      }, [])
    return (
    <>
      <Row>
            <Col span={15} offset={6}>
            <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              padding: '20px',
              margin: '20px',
            }}
          >
            {(explorePosts || [])?.map((item) => (
              <Card post={item} onPost={onPost} />
            ))}
          </div> 
                
        </Col>
            </Row>
        </>
    )
}
export const CExplorePosts = connect(
    (state) => ({
      my_Id: state.auth.payload.sub.id || '',
      countAllPostsUser: state.promise?.countAllPostsUser?.payload,
      explorePosts: state.promise?.explorePosts?.payload
    }),
    {onExlorePosts: actionExplorePosts,
      onPost: actionOnePost
    },
  )(ExplorePosts)