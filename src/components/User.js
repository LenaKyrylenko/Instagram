import {
  actionAllPosts, actionOnePost, actionAboutMe, actionUploadFile, actionUserUpsert,
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
import { actionAboutUser, store,actionAllPostsUser,actionFullProfilePageUser } from '../reducers'
import { useDropzone } from 'react-dropzone'
import { Upload, Button, DatePicker, Space } from 'antd'
import { UploadOutlined, SearchOutlined } from '@ant-design/icons'
import { Row, Col } from 'antd';

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


export const PageAboutUser = ({
  my_Id,
  aboutUser: { _id, login, nick, createdAt, avatar, followers, following } = {},
  allPosts,
  onPosts,
  onPost,
  onePost,
  onAboutUser,
  aboutUserFollowers={},
  onPageData,
  aboutUserFollowing={},
  post = {},
}) => {
  useEffect(() => {
    onAboutUser(_id)
    // onePost(post?._id)
    // "62361ebb92c08631bc4b0e96")
  }, [])
  const checkMyId =(_id === my_Id)

  const [isModalVisibleFollowing, setIsModalVisibleFollowing] = useState(false);

  const showModalFollowing = () => {
    setIsModalVisibleFollowing(true);
  };
  const [isModalVisibleFollowers, setIsModalVisibleFollowers] = useState(false);

  const showModalFollowers = () => {
    setIsModalVisibleFollowers(true);
  };

  return (
  
    <>
      <Row>
      <Col span={12} offset={6}>
          <section className="AboutMe">
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
          {allPosts?.length > 0 ? (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3> {allPosts?.length} posts </h3>
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
                : <button> subscribe</button>
                  
              }
              {/* <ConstructorModal>
        <ResultUserFind my_Id={my_Id} size={'40px'} onPageData={onPageData}
            userFind={aboutUserFollowing} />
      </ConstructorModal> */}


              <ConstructorModal isModalVisible={isModalVisibleFollowing}
                setIsModalVisible={setIsModalVisibleFollowing}>
         <ResultUserFind size={'40px'} onPageData={onPageData}
                  userFind={aboutUserFollowing} />
                
              </ConstructorModal>
              <ConstructorModal isModalVisible={isModalVisibleFollowers}
                setIsModalVisible={setIsModalVisibleFollowers}>
         <ResultUserFind size={'40px'} onPageData={onPageData}
                  userFind={aboutUserFollowers} />
                
      </ConstructorModal>
              
       </div>
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

export const CPageAboutUser = connect(
  (state) => ({
    my_Id: state.auth.payload.sub.id || '',
    aboutUser: state.profilePage?.aboutUser,
    aboutUserFollowers: state.profilePage?.aboutUser?.followers,
    aboutUserFollowing: state.profilePage?.aboutUser?.following,


    allPosts: state.profilePage?.allPosts,
    onePost: state.promise?.onePost?.payload,
    // post:state.promise?.onePost?.payload,
    // allPosts: state.promise?.allPosts?.payload,
  }),
  {
    onAboutUser: actionFullProfilePageUser,
    onLoad: actionUploadFile,
    onPost: actionOnePost,
    onPageData: actionFullProfilePageUser,
  },
)(PageAboutUser)
