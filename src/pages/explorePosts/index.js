import {
    actionOnePost,
    actionExplorePosts,
    actionFullExplorePosts,
  } from '../../actions'
  import { Row, Col } from 'antd'
  import { Card } from '../../components/post/PostCard'
  import React, { useEffect, useState } from 'react'
  import { connect } from 'react-redux'
  import {
    actionClearExplorePosts,
    actionAllClearExplore,
  } from '../../redux/reducers/exploreReducer'
import load from '../../materials/load.gif'
  
  const ExplorePosts = ({
    explorePosts = [],
    onPost,
    onClearExplore,
    onExlorePosts,
    explorePostsCount,
    explorePostsPromise
  }) => {
    const [checkScroll, setScroll] = useState(true)
    console.log('scroll ', checkScroll)
    useEffect(() => {
      if (checkScroll) {
        onExlorePosts()
      }
      setScroll(false)
    }, [checkScroll])
  
    useEffect(() => {
      document.addEventListener('scroll', scrollHandler)
  
      return () => {
        document.removeEventListener('scroll', scrollHandler)
        onClearExplore()
      }
    }, [])
    useEffect(() => {
      document.addEventListener('scroll', scrollHandler)
    }, [explorePosts.length])

  
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
      {(explorePostsPromise?.status == "PENDING") &&  
          <img style={{ display: 'block', margin: '0 auto', marginBottom:'200px', padding: '10px' }}
            src={load} width="100" height="100" />
        }
      </>
    )
  }
  export const CExplorePosts = connect(
    (state) => ({
      my_Id: state.auth?.payload?.sub?.id || '',
      countAllPostsUser: state.promise?.countAllPostsUser?.payload,
      explorePosts: state.explore?.explorePosts,
      explorePostsPromise: state.promise?.explorePosts,
      explorePostsCount: state.explore?.explorePostsCount,
    }),
    {
      onExlorePosts: actionFullExplorePosts,
      onPost: actionOnePost,
      onClearExplore: actionClearExplorePosts,
    },
  )(ExplorePosts)
  