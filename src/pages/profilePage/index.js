import { actionOnePost } from '../../actions/query/postQuery'
import user from '../../materials/user.png'
import React, { useState, useEffect } from 'react'
import { Card } from '../../components/post/PostCard'
import ListOfUsers from '../../components/ListOfUsers'
import { connect } from 'react-redux'
import { Avatar } from 'antd'
import {
  actionFullProfilePageUserTypeSaga,
  actionPostsPortionTypeSaga,
} from '../../actions/typeSaga/userTypesSaga'
import { actionClearAllPostsType } from '../../actions/types/postTypes'
import { Row, Col } from 'antd'
import { CSubscribe } from '../../components/Subscribe'
import { CEditSetting } from '../setting'
import load from '../../materials/load.gif'
export const PageAboutUser = ({
  match: {
    params: { _id },
  },
  my_Id,
  aboutUser: { login, nick, createdAt, avatar, followers, following } = {},
  allPosts,
  onPost,
  onAboutUser,
  countPosts,
  onClearPosts,
  onUserPosts,
  userPostPromise,
}) => {
  const [checkScroll, setScroll] = useState(true)
  useEffect(() => {
    onAboutUser(_id)
  }, [_id])

  useEffect(() => {
    if (checkScroll) {
      onUserPosts(_id)
    }
    setScroll(false)
  }, [checkScroll])
  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return () => {
      document.removeEventListener('scroll', scrollHandler)
      onClearPosts()
    }
  }, [])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
  }, [allPosts?.length])

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

  const checkMyId = _id === my_Id
  return (
    <>
      <Row>
        <Col span={12} offset={6}>
          <section className="AboutMe">
            <Row>
              {avatar?.url ? (
                <Avatar
                  style={{
                    marginRight: '20px',
                    width: '150px',
                    height: '150px',
                  }}
                  src={'/' + avatar?.url}
                />
              ) : (
                <Avatar
                  style={{
                    marginRight: '20px',
                    width: '150px',
                    height: '150px',
                  }}
                  src={user}
                />
              )}
              <div className="Info">
                {login ? <h1> {login}</h1> : <h1> {'Anon'}</h1>}

                <h3>
                  Created Account:{' '}
                  {new Intl.DateTimeFormat('en-GB').format(createdAt)}
                </h3>
                <div style={{ display: 'flex' }}>
                  {countPosts > 0 ? (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <h3> {countPosts} posts </h3>
                    </div>
                  ) : (
                    <h3> 0 posts </h3>
                  )}

                  <ListOfUsers
                    listResult={followers}
                    listUsers={followers}
                    onPageData={onAboutUser}
                    text={'followers'}
                  />

                  <ListOfUsers
                    listResult={following}
                    listUsers={following}
                    onPageData={onAboutUser}
                    text={'following'}
                  />
                </div>
                <h3> nick: {nick == null ? login : nick}</h3>

                {checkMyId ? <CEditSetting /> : <CSubscribe />}
              </div>
            </Row>
          </section>
        </Col>
      </Row>
      <Row>
        <Col span={17} offset={4}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              margin: '20px',
            }}
          >
            {(allPosts || [])?.map((item) => (
              <Card post={item} onPost={onPost} />
            ))}
          </div>
        </Col>
      </Row>
      {userPostPromise?.status == 'PENDING' && (
        <img className="Preloader" src={load} width="100" height="100" />
      )}
    </>
  )
}

export const CPageAboutUser = connect(
  (state) => ({
    my_Id: state.auth?.payload?.sub?.id,
    aboutUser: state.userData?.aboutUser,
    countPosts: state?.promise?.countPosts?.payload,
    allPosts: state.userData?.allPosts,
    userPostPromise: state.promise?.allPosts,
  }),
  {
    onAboutUser: actionFullProfilePageUserTypeSaga,
    onPost: actionOnePost,
    onClearPosts: actionClearAllPostsType,
    onUserPosts: actionPostsPortionTypeSaga,
  },
)(PageAboutUser)
