import { Router, Route, Link, Redirect, Switch } from 'react-router-dom'
import {
  actionAllPosts, actionOnePost, actionAddFullComment, actionGetFindLiked,
  actionFindSubComment, actionAddSubFullComment, actionDeleteFullLike, actionAddFullLike, actionAddLike, actionDeleteLike
} from '../actions'

import photoNotFound from '../materials/photoNotFound.png'
import {
  LeftCircleFilled, RightCircleFilled,
  HeartOutlined, HeartTwoTone, HeartFilled
} from '@ant-design/icons'
import { Carousel,Avatar,Tooltip } from 'antd'
import user from '../materials/user.png'
import { Provider, connect } from 'react-redux'
import { Row, Col } from 'antd';
import { Divider, Input, Button } from 'antd';
import { EditOutlined, SmileOutlined} from '@ant-design/icons'
import moment from 'moment';
import React, { useMemo, useState, useEffect } from 'react'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import data from 'emoji-mart/data/google.json'
import { NimblePicker, Emoji } from 'emoji-mart'
import {LinkToUser} from './LinkToUser'
// import InputEmoji from 'react-input-emoji'; 
import reactStringReplace from 'react-string-replace'
// const postId="625afa1d069dca48a822ffb0"
export const AddComment = ({ addComment, postId }) => {
  const [text, setComment] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const addEmoji = ({ colons }) => {
    setComment((text + ' ' + colons).trim());
  };

  return (
    <>
      {
        showEmojiPicker && <Picker autoFocus={true}
          style={{ color: '#ae65c5', bottom: '160px', marginRight:'440px' }}
          onSelect={emojiTag => addEmoji(emojiTag)} set="apple" />
      }
      <Input style={{ display:'flex',width:'60%',marginLeft:'20px', marginRight:'20px' }} size="large" placeholder='Add a comment...' 
          value={text} onChange={e => { setComment(e.target.value) }}
        onPressEnter={e => { setComment(e.target.value) }}/> 
         <SmileOutlined className='smile-btn' style={{ fontSize: 'xx-large', marginRight:'30px' }} 
          onClick={() => {
            setShowEmojiPicker(!showEmojiPicker)
          }}/>
      <Button 
        size="large" disabled={text.length < 1} type="primary"
          onClick={(e) => addComment(postId, text)&&setComment(e.target.value="")}> Publish </Button>
      {console.log('comment ', text )}
     
        </>
    )
      
}
const SpoilerButton = ({text, close, children }) => {
    const [opened, setOpened] = useState(close)
    return (
      <>
        <Button 
          onClick={() => {
            setOpened(!opened)
          }}>
          {text}
        </Button>
          {opened && children}
      </>
    )
  }
  const CommentAuthor = ({owner}) =>
  <>
      <div style={{ display: 'flex', flexDirection: 'row', padding: '5px', margin: '5px' }}>
        
        <LinkToUser owner={owner} size={'10px'} sizePadding={'0px' }/>
        {/* {owner?.avatar ?
            <Avatar
              style={{ width: '25px', height: '25px',marginRight: '2%'}}
              src={'/' + owner?.avatar?.url}
            /> :
            <Avatar style={{ width: '25px', height: '25px',marginRight: '2%' }} src={user} />
          }
          {owner?.login ? (
            <h3 style={{ marginRight: '2%', fontWeight: 'bold' }}> {owner?.login} </h3>
          ) : (
            <h3 style={{ marginRight: '2%', fontWeight: 'bold' }}> anon </h3>
          )
      } */}
      </div>
  </>


const CommentForReply =({addCommentReply, commentId, postId})=>{
    const [comment, setComment]=useState('')
    return (
     <>
      <div style={{display: 'flex', flexDirection: 'row', width:'100%', padding: '15px', marginLeft:'40px'}}>
          
        <Input  placeholder='Add a comment...' 
            value={comment} onChange={e => { setComment(e.target.value) }} />
        <Button  disabled={comment.length<1} type="primary" onClick={()=>
            addCommentReply(postId, commentId, comment)
          
          }> Publish </Button>
          </div>
      </>
    )
  }
  
  const CommentText = ({ text,close }) => {
    // const [edit, setEdited] = useState(close)
    return (
      <div style={{width:'90%',display:'inline-block', background:'#c8c8c8'}}>
   {/* <EditOutlined style={{float:'right',  fontSize: 'x-large' }}/> */}
        <h3 style={{display:'block'}}>  {reactStringReplace(text, /:(.+?):/g, (match, i) => (
          <Emoji emoji={match}  set='apple' size={20}/> ))}
        </h3>
       
      </div>
    )
  }
  const CommentData = ({ createdAt }) => {
    return <Tooltip color={'#87d068'} style={{ paddingLeft: '10px' }} title={moment(new Date(+createdAt)).format('lll')} >
    {moment(new Date(+createdAt)).startOf().fromNow()}
  </ Tooltip>
}
  

 export const Comments = ({ comments,postId, addCommentReply, commentId,children,close,findSubComment }) => {
    const [opened, setOpened] = useState(close)
   
    return (
      <>
        {console.log('длина ', comments?.length)}
       
        {
        
        comments ? (comments).map((comment) =>
        <>
      <div style={{display: 'flex', flexDirection: 'row', width:'100%', padding: '15px'}}>
          <CommentAuthor owner={comment.owner} />
            <CommentText text={comment.text} />
            </div>
            {/* <h3 style={{ marginRight: '2%' }}>  {text} </h3> */}
            {/* <h3> мой айди {_id}</h3> */}
          {/* </div> */}
          <CommentData createdAt={comment.createdAt} />
          <div style={{display: 'flex', flexDirection: 'row'}}>
          
             <div style={{display: 'flex', flexDirection: 'column' }}>
          <SpoilerButton text={'Reply to'} >
               {/* <Input />
               <button> send </button> */}
                  
                     
                  <CommentForReply addCommentReply={addCommentReply} commentId={comment._id} postId={postId}/>
                     
              </SpoilerButton>
            </div> 
          {comment?.answers && comment?.answers?.length ?
            <div style={{ marginLeft: '10px', display:'inline-block'}}>
                
                          <SpoilerButton style={{ position: 'fixed' }} text={'More comments'} onClick={() => findSubComment(commentId)}>
                              <Comments comments={comment.answers} addCommentReply={addCommentReply} commentId={comment._id} >

                              </Comments>
                          </SpoilerButton>
                          
                      </div>
                      : null
            }
          </div>
        </>
      ) : null
  }
      </>
    ) 
}

export const CComments = connect((state) => ({
    postId: state.promise.onePost?.payload?._id,
    addComment: state.promise?.addComment?.payload,
    addSubComment: state.promise?.addSubComment,
}),
    {
        addComment: actionAddFullComment, 
        addCommentReply: actionAddSubFullComment,
      findSubComment: actionFindSubComment,
     
    })(Comments)
