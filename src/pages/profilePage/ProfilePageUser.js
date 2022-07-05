import { actionOnePost, actionUploadFile } from '../../actions'
import user from '../../materials/user.png'
import React, { useState, useEffect } from 'react'
import { Card } from '../../components/PostCard'
import ListOfUsers from '../../components/ListOfUsers'
import { connect } from 'react-redux'
import { Avatar, Button } from 'antd'
import { actionFullProfilePageUser } from '../../redux/thunk'
import { Row, Col } from 'antd'
import { CSubscribe } from '../../components/Subscribe'
import { CEditSetting } from '../setting/Setting'

export const PageAboutUser = ({
  match: {
    params: { _id },
  },
  my_Id,
  aboutUser: { login, nick, createdAt, avatar, followers, following } = {},
  allPosts,
  onPost,
  onAboutUser,
  onPageData,
  countAllPostsUser,
}) => {
  useEffect(() => {
    onAboutUser(_id)
    // console.log('USER DATA ', login, _id)
  }, [_id])

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
                  {countAllPostsUser > 0 ? (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <h3> {countAllPostsUser} posts </h3>
                    </div>
                  ) : (
                    <h3> 0 posts </h3>
                  )}

                  <ListOfUsers
                    listResult={followers}
                    listUsers={followers}
                                      onPageData={onPageData}
                                      text={'followers'}
                  />

                  <ListOfUsers
                   listResult={following}
                   listUsers={following}
                                     onPageData={onPageData}
                                     text={'following'}
                  />
                </div>
                <h3> nick: {nick == null ? login : nick}</h3>
                {checkMyId ? (
                  <>
                    <CEditSetting />
                  </>
                ) : (
                  <CSubscribe />
                )}
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
              // padding: '20px',
              margin: '20px',
            }}
          >
            {(allPosts || [])?.map((item) => (
              <Card post={item} onPost={onPost} />
            ))}
          </div>
        </Col>
      </Row>
    </>
  )
}

export const CPageAboutUser = connect(
  (state) => ({
    my_Id: state.auth?.payload?.sub?.id,
    aboutUser: state.profilePage?.aboutUser,
    countAllPostsUser: state.promise?.countAllPostsUser?.payload,
    allPosts: state.profilePage?.allPosts,
  }),
  {
    onAboutUser: actionFullProfilePageUser,
    onPost: actionOnePost,
    onPageData: actionFullProfilePageUser,
  },
)(PageAboutUser)
