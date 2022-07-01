import {
  actionOnePost,
  actionUploadFile,
  actionFullUnSubscribe,
  actionFullSubscribe,
} from '../actions'
import user from '../materials/user.png'
import React, { useState, useEffect } from 'react'
import { Card } from './Post'
import ListFollowing from './ListFollowing'
import ListFollowers from './ListFollowers'

import { connect } from 'react-redux'
import { Avatar, Button} from 'antd'
import {
  actionFullProfilePageUser,
 
} from '../redux/thunk'
import { actionRemoveDataUser } from '../redux/reducers/profileData/profileReducer'
import { Row, Col } from 'antd'
import { CEditInfo } from '../components/EditAvatar'

export const EditAccount = ({ open, children }) => {
  const [opened, setOpened] = useState(open)
  return (
    <>
      <button style={{ width: '100px' }} onClick={setOpened(!opened)}>
        Edit account
      </button>
      {opened && children}
    </>
  )
}
export const PageAboutUser = ({
  match: {
    params: { _id },
  },
  my_Id,
  aboutUser: { login, nick, createdAt, avatar, followers, following } = {},
  allPosts,
  followId,
  onPost,
  addSubscribe,
  deleteSubscribe,
  onePost,
  onAboutUser,
  aboutUserFollowers = [],
  onPageData,
  aboutUserFollowing = [],
  aboutMeFollowing,
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

                  <ListFollowers aboutUserFollowers={aboutUserFollowers}
                    followers={followers} onPageData={onPageData} />

                  <ListFollowing aboutUserFollowing={aboutUserFollowing}
                    following={following} onPageData={onPageData} />

                </div>
                <h3> nick: {nick == null ? login : nick}</h3>
                {checkMyId ? (
                  <>
                    <CEditInfo/>
                  </>
                ) : (
                  <Subscribe
                    my_Id={my_Id}
                    deleteSubscribe={deleteSubscribe}
                    followId={followId}
                    addSubscribe={addSubscribe}
                    aboutMeFollowing={aboutMeFollowing}
                  />
                )}
            
              </div>
            </Row>
          </section>
        </Col>
      </Row>
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
            {(allPosts || [])?.map((item) => (
              <Card post={item} onPost={onPost} />
            ))}
          </div>
        </Col>
      </Row>
    </>
  )
}
const Subscribe = ({
  my_Id,
  deleteSubscribe,
  aboutMeFollowing = [],
  addSubscribe,
  followId,
}) => {
  const checkFollowId = aboutMeFollowing?.find(
    (follower) => follower?._id === followId,
  )?._id


  console.log('FOLLOWING ', checkFollowId)

  return (
    <>
      <div style={{ display: 'flex' }}>
        {checkFollowId ? (
          <Button
            size="large" type="primary"
             danger
            onClick={() => deleteSubscribe(my_Id, followId)}
          >
            Unsubscribe
          </Button>
        ) : (
          <Button
            size="large"
              type="primary"
              primary
            onClick={() => addSubscribe(my_Id, followId)}
          >
            Subscribe
          </Button>
        )}
      </div>
    </>
  )
}

export const CPageAboutUser = connect(
  (state) => ({
    my_Id: state.auth?.payload?.sub?.id,
    aboutUser: state.profilePage?.aboutUser,
    aboutUserFollowers: state.profilePage?.aboutUser?.followers,
    aboutUserFollowing: state.profilePage?.aboutUser?.following,
    followId: state.profilePage?.aboutUser?._id,
    aboutMeFollowing: state.profileData?.aboutMe?.following,
    countAllPostsUser: state.promise?.countAllPostsUser?.payload,
    allPosts: state.profilePage?.allPosts,
    onePost: state.promise?.onePost?.payload,
  }),
  {
    onAboutUser: actionFullProfilePageUser,
    actionRemoveDataUser: actionRemoveDataUser,
    onLoad: actionUploadFile,
    onPost: actionOnePost,
    onPageData: actionFullProfilePageUser,
    addSubscribe: actionFullSubscribe,
    deleteSubscribe: actionFullUnSubscribe,
  },
)(PageAboutUser)
