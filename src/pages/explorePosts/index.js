import { actionOnePost } from '../../actions/query/postQuery'
import { actionFullExplorePostsTypeSaga } from '../../actions/typeSaga/exploreTypesSaga'
import { Row, Col } from 'antd'
import { Card } from '../../components/post/PostCard'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actionClearExplorePostsType } from '../../actions/types/exploreTypes'
import load from '../../materials/load.gif'

const ExplorePosts = ({
  explorePosts = [],
  onPost,
  onClearExplore,
  onExlorePosts,
  explorePostsPromise,
}) => {
  const [checkScroll, setScroll] = useState(true)
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
        <Col
          xl={{ offset: 4, span: 18 }}
          lg={{ offset: 2, span: 20 }}
          md={{ offset: 2, span: 20 }}
          sm={{ offset: 2, span: 22 }}
          xs={{offset:2, span: 22 }}
          // span={18} offset={4}
        
        >
          <div className="Explore">
            {(explorePosts || [])?.map((item) => (
              <Card post={item} onPost={onPost} />
            ))}
          </div>
        </Col>
      </Row>
      {explorePostsPromise?.status == 'PENDING' && (
        <img className="Preloader" src={load} width="100" height="100" />
      )}
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
    onExlorePosts: actionFullExplorePostsTypeSaga,
    onPost: actionOnePost,
    onClearExplore: actionClearExplorePostsType,
  },
)(ExplorePosts)
