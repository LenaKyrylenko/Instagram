import {
  actionAllPosts,
  actionOnePost,
  actionAboutMe,
  actionUploadFile,
  actionFullUnSubscribe,
  actionAddFullSubscribe,
  actionFullSubscribe,
  actionPostsCount,
  actionUserUpsert,
  actionSetAvatar,
  actionAvatar,
} from '../actions'
import user from '../materials/user1.png'
import React, { useMemo, useState, useEffect } from 'react'
import { Card } from './Post'
// import {Basic} from '../components/DropZone'
import { Router, Route, Link, Redirect, Switch } from 'react-router-dom'
import { ResultUserFind } from '../components/Search_Users'
import { ConstructorModal } from '../helpers'
import ListFollowing from './ListFollowing'
import ListFollowers from './ListFollowers'

import { Provider, connect } from 'react-redux'
import { Avatar, Image, Divider, Radio } from 'antd'
import {
  actionAboutUser,
  store,
  actionAllPostsUser,
  actionFullProfilePageUser,
  actionRemoveDataUser,
} from '../reducers'
import { useDropzone } from 'react-dropzone'
import { Upload, Button, DatePicker, Space } from 'antd'
import { UploadOutlined, SearchOutlined } from '@ant-design/icons'
import { Row, Col } from 'antd'
import { CEditInfo } from '../components/EditAvatar'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

export const EditAccount = ({ open, children }) => {
  const [opened, setOpened] = useState(open)
  return (
    <>
      {/* <Link to={`/editProfile`}> */}
      <button style={{ width: '100px' }} onClick={setOpened(!opened)}>
        Edit account
      </button>
      {opened && children}
      {/* </Link> */}
    </>
  )
}

const Input = ({ state, onChangeText }) => (
  <input
    className="Input"
    value={state}
    placeholder={state || ''}
    onChange={onChangeText}
  />
)

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
  const [checkScroll, setCheckScroll] = useState(true);

  useEffect(() => {
    if (checkScroll) {
      actionFullProfilePageUser(_id);
      setCheckScroll(false);
    }
  }, [checkScroll]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
      // clearDataProfile()
    }
  }, [allPosts]);

  const scrollHandler = (e) => {
    if(e.target.documentElement.scrollHeight - e.target.documentElement.scrollTop - e.target.documentElement.clientHeight <20)
    // if (e.target.documentElement.scrollHeight -
    //   (e.target.documentElement.scrollTop + window.innerHeight) < 20)
    { setCheckScroll(true) }
  };


  useEffect(() => {
    onAboutUser(_id)
    // actionPostsCount(_id)
    console.log('USER DATA ', login, _id)
  }, [_id])

  // console.log('COUNT ', countAllPostsUser)
  const checkMyId = _id === my_Id

  return (
    <>
      <Row>
        <Col span={10} offset={6}>
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

                  <ListFollowers aboutUserFollowers={aboutUserFollowers} followers={followers} onPageData={onPageData}/>

                  <ListFollowing aboutUserFollowing={aboutUserFollowing} following={following} onPageData={onPageData}/>

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
// const ProfileFollowButton = ({ myID, userId, followers, onSubsuscribe, onUnSubsuscribe }) => {
//   const followCheck = followers.find(f => f._id === myID && true)
//   return (
//       <Col className='Profile__setting'>
//           {!!followCheck ?
//               <Button onClick={() => onUnSubsuscribe(userId)}>UnSubscribe</Button> :
//               <Button onClick={() => onSubsuscribe(userId)} type="primary">Subscribe</Button>}
//       </Col>
//   )
// }

// export const CProfileFollowButton = connect(state => ({
//   myID: state?.auth?.payload?.sub.id,
//   followers: state?.post?.userData?.followers || []
// }), { onSubsuscribe: actionSubscribe, onUnSubsuscribe: actionUnSubscribe })(ProfileFollowButton)

const Subscribe = ({
  my_Id,
  postId,
  addLike,
  deleteLike,
  following = [],
  deleteSubscribe,
  aboutMeFollowing = [],
  aboutUserFollowing,
  addSubscribe,
  followId,
  children,
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
            size="large"
            primary
            onClick={() => deleteSubscribe(my_Id, followId)}
          >
            unsubscribe
          </Button>
        ) : (
          <Button
            size="large"
            danger
            onClick={() => addSubscribe(my_Id, followId)}
          >
            subscribe
          </Button>
        )}
      </div>

      {/* {console.log('follow _id', followId)} */}

      {/* <button style={{ cursor: 'pointer', fontSize: 'xx-large', color: 'red' }}
        onClick={() => addSubscribe(my_Id,followId)}>
              subscribe
            </button> */}

      {/* {likes.length ? 
          <h3 style={{ cursor: 'pointer', paddingLeft: 8 }} onClick={showModal}>
            {likes.length} likes
           
        </h3>
        :
        '0 likes'}
      </div>
      <ConstructorModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}>
          <Likes likes={likes}/>
      </ConstructorModal> */}
    </>
  )
}

export const CPageAboutUser = connect(
  (state) => ({
    my_Id: state.auth.payload.sub.id || '',
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
