import {
    actionOnePost,
    actionExplorePosts,
    actionFullExplorePosts,
  } from '../../actions'
  import { Row, Col } from 'antd'
  import { Card } from '../../components/PostCard'
  import React, { useEffect, useState } from 'react'
  import { connect } from 'react-redux'
  import {
    actionClearExplorePosts,
    actionAllClearExplore,
  } from '../../redux/reducers/explore/exploreReducer'
  
  const ExplorePosts = ({
    explorePosts = [],
    onPost,
    onClearExplore,
    onExlorePosts,
    explorePostsCount,
  }) => {
    const [checkScroll, setScroll] = useState(true)
    console.log('scroll ', checkScroll)
    useEffect(() => {
      if (checkScroll) {
        onExlorePosts()
  
        setScroll(false)
      }
    }, [checkScroll])
  
    useEffect(() => {
      document.addEventListener('scroll', scrollHandler)
  
      return () => {
        document.removeEventListener('scroll', scrollHandler)
        onClearExplore()
      }
    }, [])
  
    const scrollHandler = (e) => {
      if (
        e.target.documentElement.scrollHeight -
          (e.target.documentElement.scrollTop + window.innerHeight) <
        200
      ) {
        setScroll(true)
      }
    }
    // useEffect(() => {
    //     onExlorePosts()
  
    //   }, [])
    return (
      <>
        <Row>
          <Col span={18} offset={4}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                padding: '20px',
                margin: '20px',
                marginTop: '50px',
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
      my_Id: state.auth?.payload?.sub?.id || '',
      countAllPostsUser: state.promise?.countAllPostsUser?.payload,
      explorePosts: state.explore?.explorePosts,
      explorePostsCount: state.explore?.explorePostsCount,
    }),
    {
      onExlorePosts: actionFullExplorePosts,
      onPost: actionOnePost,
      onClearExplore: actionClearExplorePosts,
    },
  )(ExplorePosts)
  