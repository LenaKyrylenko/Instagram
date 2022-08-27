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
import backendURL from '../../helpers/backendUrl'

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
        <Col
          xl={{ span: 12, offset: 6 }}
          md={{ span: 20, offset: 3 }}
          sm={{ offset: 3, span: 15 }}
          xs={{ offset: 2, span: 20 }}
        >
          <section className="AboutMe">
            <Row>
              {avatar?.url ? (
                <Avatar
                  className="ProfileAvatar"
                  src={backendURL + '/' + avatar?.url}
                />
              ) : (
                <Avatar className="ProfileAvatar" src={user} />
              )}
              <div className="Info">
                {login ? (
                  <p className="Login"> {login}</p>
                ) : (
                  <p className="Login"> {'Anon'}</p>
                )}

                <p>
                  Created Account:{' '}
                  {new Intl.DateTimeFormat('en-GB').format(createdAt)}
                </p>
                <div style={{ display: 'flex' }}>
                  {countPosts > 0 ? (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <p> {countPosts} posts </p>
                    </div>
                  ) : (
                    <p> 0 posts </p>
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
                <p> nick: {nick == null ? login : nick}</p>

                {checkMyId ? <CEditSetting /> : <CSubscribe />}
              </div>
            </Row>
          </section>
        </Col>
      </Row>
      <Row>
        <Col
          xl={{ span: 17, offset: 4 }}
          lg={{ offset: 4, span: 20 }}
          md={{ offset: 4, span: 20 }}
          sm={{ offset: 3, span: 15 }}
          xs={{ offset: 1, span: 21 }}
        >
          <div className="ProfilePage">
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
