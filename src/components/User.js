import {backendURL,actionAllPosts,actionOnePost,actionAboutMe} from '../actions'
import user from '../materials/user.png'
import React, { useMemo, useState, useEffect } from 'react'
import {Card} from '../components/Post'
import { Provider, connect } from 'react-redux'
import { Avatar, Image, Divider, Radio } from 'antd'
import { store } from '../reducers'

const PageAboutUser = ({
    aboutMe: { _id, login, nick, createdAt, avatar, followers, following } = {},
    allPosts,
    onPosts,
    onPost,
    onAboutUser
  }) => {
    useEffect(() => {
      // onAboutUser(_id)
      onPosts()
    }, [])

    // console.log('CREATED AT',new Intl.DateTimeFormat().format(createdAt));
    return (
      <section className="AboutMe">
        <Avatar
          style={{ width: '150px', height: '150px', position: 'absolute' }}
          src={backendURL + '/' + avatar?.url || user}
        />
        <div className="Info">
          <h1> {login}</h1>
          <h3>
            {' '}
            Created Account: {new Intl.DateTimeFormat('en-GB').format(createdAt)}
          </h3>
          <div style={{ display: 'flex' }}>
            {/* {allPosts?.length} style={{display: 'flex',justifyContent: 'space-between'}}*/}
            <h3> {allPosts?.length} posts </h3>
  
            <h3 style={{ marginLeft: '20px' }}>
              {' '}
              {followers?.length} followers{' '}
            </h3>
  
            <h3 style={{ marginLeft: '20px' }}>
              {' '}
              {following?.length} following{' '}
            </h3>
          </div>
          <h3> nick: {nick == null ? login : nick}</h3>
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
          {/* <h3> Created Account: {
              <div>
              <img
        src={backendURL + '/' + allPosts?.url}
        style={{ maxWidth: '200px', maxHeight: '200px' }}/>
        </div> date} 
          </h3> */}
        </div>
      </section>
    )
  }
 export const CPageAboutUser = connect(
    (state) => ({
      aboutMe: state.promise?.aboutMe?.payload,
      allPosts: state.promise?.allPosts?.payload,
    }),
    { onPosts: actionAllPosts, onPost: actionOnePost,
    // onAboutUser: actionAboutMe
    },
  )(PageAboutUser)
