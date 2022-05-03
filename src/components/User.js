import {
  actionAllPosts, actionOnePost, actionAboutMe, actionUploadFile,actionFullUnSubscribe, actionUserUpsert,
  actionAddFullSubscribe,actionFullSubscribe,actionPostsCount,
  actionSetAvatar, actionAvatar} from '../actions'
import user from '../materials/user1.png'
import React, { useMemo, useState, useEffect } from 'react'
import { Card } from '../components/Post'
// import {Basic} from '../components/DropZone'
import { Router, Route, Link, Redirect, Switch } from 'react-router-dom'
import { ResultUserFind } from '../components/Search_Users'
import { ConstructorModal} from '../helpers'

import { Provider, connect } from 'react-redux'
import { Avatar, Image, Divider, Radio } from 'antd'
import { actionAboutUser, store,actionAllPostsUser,actionFullProfilePageUser,actionRemoveDataUser } from '../reducers'
import { useDropzone } from 'react-dropzone'
import { Upload, Button, DatePicker, Space } from 'antd'
import { UploadOutlined, SearchOutlined } from '@ant-design/icons'
import { Row, Col } from 'antd';

import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export function Basic({ onLoad }) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ))
  console.log('acceptedFiles', acceptedFiles)
  useEffect(() => {
    acceptedFiles[0] && onLoad(acceptedFiles[0])
  }, [acceptedFiles])
  return (
    <section className="container">
      <div {...getRootProps({ className: 'Dropzone' })}>
        <input {...getInputProps()} />
        <Button icon={<UploadOutlined />}>
          Drag 'n' drop some files here, or click to select files
        </Button>
      </div>
      <aside>
        <h4 style={{ color: 'black' }}>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  )
}

export const EditAccount = ({ open, children }) => {
  const [opened, setOpened] = useState(open)
  return (
    <>
      {/* <Link to={`/editProfile`}> */}
      <button style={{ width: '100px' }}
        onClick={() => {
          setOpened(!opened)
        }}
      >
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
const EditInfo = ({ info = {}, onSave, onFileDrop, fileStatus }) => {
  console.log('filestatus ', fileStatus)
  const [state, setState] = useState(info)
  useEffect(() => {
    fileStatus?.status == 'FULFILLED' &&
      setState({
        ...state,
        ...state.avatar,
        ...fileStatus.payload,
        // _id: fileStatus?.payload._id,
        // url: fileStatus?.payload.url
      })
  }, [fileStatus])

  const onChangeLogin = (event) =>
    setState({
      ...state,
      login: event.target.value,
    })
  console.log('state my ', state)
  return (
    <section>
      <Basic onLoad={onFileDrop} />
      <Input state={state.login || ''} onChangeText={onChangeLogin} />
      <h1 className="Title"> LOGIN </h1>
      <button
        disabled={state?.images?.length == 0}
        onClick={() => onSave(state._id)}
      >
        Save
      </button>
    </section>
  )
}
export const CEditInfo = connect(
  (state) => ({ fileStatus: state.promise?.uploadFile }),
  {
    onSave: actionAvatar,
    onFileDrop: actionUploadFile,
  },
)(EditInfo)


export const PageAboutUser = ({ match: { params: { _id } },
  my_Id,
  aboutUser: { login, nick, createdAt, avatar, followers, following } = {},
  allPosts,
  followId,
  onPosts,
  onPost,
  userId,
  addSubscribe,
  deleteSubscribe,
  onePost,
  onAboutUser,
  aboutUserFollowers=[],
  onPageData,
  aboutUserFollowing = [],
  clearDataProfile,
  actionRemoveDataUser,
  aboutMeFollowing,
  countAllPostsUser,
  actionPostsCount,
  post = {},
}) => {
  

   useEffect(() => {
     
     onAboutUser(_id)
     actionPostsCount(_id)
         console.log('USER DATA ', login, _id)
   }, [_id])
  
  
  console.log('COUNT ', countAllPostsUser)
  const checkMyId =(_id === my_Id)

  const [isModalVisibleFollowing, setIsModalVisibleFollowing] = useState(false);

  const showModalFollowing = () => {
    setIsModalVisibleFollowing(true);
  };
  const [isModalVisibleFollowers, setIsModalVisibleFollowers] = useState(false);

  const showModalFollowers = () => {
    setIsModalVisibleFollowers(true);
  };
  const handleCancelFollowing = () => {
    setIsModalVisibleFollowing(false);
  };
  const handleCancelFollowers = () => {
    setIsModalVisibleFollowers(false);
  };
  return (
  
    <>
      <Row>
      <Col span={12} offset={6}>
          <section className="AboutMe">
            <Row >
           
            {avatar?.url ?
              <Avatar
                style={{ marginRight: '20px', width: '150px', height: '150px' }}
                src={'/' + avatar?.url} />
              :
              <Avatar
                style={{ marginRight: '20px', width: '150px', height: '150px' }}
                src={user} />
            }
            <div className="Info">
              {login ?

                <h1> {login}</h1>
                :
                <h1> {'Anon'}</h1>
              }

        <h3>
          Created Account: {new Intl.DateTimeFormat('en-GB').format(createdAt)}
        </h3>
        <div style={{ display: 'flex' }}>
          {countAllPostsUser > 0 ? (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3> {countAllPostsUser} posts </h3>
            </div>
          ) : (
            <h3> 0 posts </h3>
          )}

          {followers?.length > 0 ? (
         
              
                  <h3 style={{ cursor: 'pointer', marginLeft: '20px' }}
                    onClick={showModalFollowers}>
                {followers.length} followers{' '}
                  </h3>
          
          ) : (
            <h3 style={{ marginLeft: '20px' }}> 0 followers </h3>
                )}
                
                {following?.length > 0 ? (
                  <h3 style={{ cursor: 'pointer', marginLeft: '20px' }}
                    onClick={showModalFollowing}>{following?.length} {' '}
                    following </h3>)
                  :
                (<h3 style={{ marginLeft: '20px' }}> 0 following </h3>
                )
                }
             
        </div>
              <h3> nick: {nick == null ? login : nick}</h3>
              {
                checkMyId ?
                  <EditAccount>
          <div>
            <h2>Edit login</h2>
            <p>Edit avatar</p>
            <CEditInfo />
          </div>
                </EditAccount>
                    :
                    <Subscribe my_Id={my_Id} deleteSubscribe={deleteSubscribe}
                      followId={followId} addSubscribe={addSubscribe} aboutMeFollowing={aboutMeFollowing} />
                  
              }
              {/* <ConstructorModal>
        <ResultUserFind my_Id={my_Id} size={'40px'} onPageData={onPageData}
            userFind={aboutUserFollowing} />
      </ConstructorModal> */}


              <ConstructorModal title={'Following'}
                isModalVisible={isModalVisibleFollowing}
                setIsModalVisible={setIsModalVisibleFollowing}>
                <ResultUserFind size={'40px'} handleCancel={handleCancelFollowing}
                  onPageData={onPageData}
                  userFind={aboutUserFollowing} />
                
              </ConstructorModal>
              <ConstructorModal  title={'Followers'} isModalVisible={isModalVisibleFollowers}
                setIsModalVisible={setIsModalVisibleFollowers}>
         <ResultUserFind size={'40px'} onPageData={onPageData} handleCancel={handleCancelFollowers}
                  userFind={aboutUserFollowers} />
                
      </ConstructorModal>
              
              </div>
              </Row>
        </section>
            
        </Col>
      </Row>
      <Row>
      <Col span={16} offset={6}>
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


const Subscribe = ({ my_Id, postId, addLike, deleteLike, following = [], deleteSubscribe,
  aboutMeFollowing=[], aboutUserFollowing, addSubscribe, followId, children }) =>
{

 const checkFollowId =()=> aboutMeFollowing?.find(follower => follower?._id === followId)?._id

 // console.log(' _id', aboutMeFollowing?.find(f => f._id === followId && true))
  console.log('FOLLOWING ') 
  // const [isModalVisible, setIsModalVisible] = useState(false);

  // const showModal = () => {
  //   setIsModalVisible(true);
  // };
  return(
    <>
      <div style={{display:'flex'}}>
         
            {checkFollowId ?
            
          <Button size="large" primary onClick={()=>deleteSubscribe(my_Id, followId)} >
               unsubscribe
            </Button> 
            :
            <Button size="large" danger onClick={()=>addSubscribe(my_Id, followId)}>
            subscribe
          </Button>
                } 
    
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
    followId:state.profilePage?.aboutUser?._id,
    aboutMeFollowing: state.profileData?.aboutMe?.following,
    countAllPostsUser:state.promise?.countAllPostsUser?.payload,
    allPosts: state.profilePage?.allPosts,
    onePost: state.promise?.onePost?.payload,
    // post:state.promise?.onePost?.payload,
    // allPosts: state.promise?.allPosts?.payload,
  }),
  {
    onAboutUser: actionFullProfilePageUser,
    actionRemoveDataUser:actionRemoveDataUser,
    onLoad: actionUploadFile,
    onPost: actionOnePost,
    onPageData: actionFullProfilePageUser,
    addSubscribe: actionFullSubscribe,
    deleteSubscribe: actionFullUnSubscribe,
    actionPostsCount:actionPostsCount
  },
)(PageAboutUser)
