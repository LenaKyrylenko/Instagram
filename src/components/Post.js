import { Router, Route, Link, Redirect, Switch } from 'react-router-dom'
import {
  actionAllPosts, actionOnePost, actionFindLikes, actionAddFullComment, actionGetFindLiked, actionFindSubComment,
  actionAddSubFullComment, actionDeleteFullLike, actionAddFullLike, actionAddLike, actionDeleteLike
} from '../actions'
import photoNotFound from '../materials/photoNotFound.png'
import { LeftCircleFilled, RightCircleFilled, HeartOutlined,HeartTwoTone,HeartFilled } from '@ant-design/icons'
import { Carousel,Avatar,Tooltip } from 'antd'
import user from '../materials/user1.png'
import { Provider, connect } from 'react-redux'
import { Row, Col } from 'antd';
import { Divider, Input, Button, Modal } from 'antd';
import { EditOutlined } from '@ant-design/icons'
import moment from 'moment';
import { CComments, AddComment } from '../components/Post_Comment'
import { CPostEditor } from '../components/NewPost'
import { actionFullOnePost} from '../reducers'
import { Like, Likes } from './Like'
import { ConstructorModal} from '../helpers'
import React, { useMemo, useState, useEffect } from 'react'
// const postId="625afa1d069dca48a822ffb0"
const EditMyPost = ({ open, children }) =>{
const [opened, setOpened] = useState(open)
return (
  <>
    {/* <Link to={`/editProfile`}> */}
    <button style={{ width: '100px' }}
      onClick={() => {
        setOpened(!opened)
      }}
    >
      Edit Post
    </button>
    {opened && children}
    {/* </Link> */}
  </>
)
}
  


export const Card = ({ post, onPost }) => (
  <>
    <Link  to={`/post/${post?._id}`}>
      {post?.images && post?.images[0] && post.images[0]?.url ? (
        <img
          className="Card"
          src={ '/' + post.images[0].url}
          style={{minHeight:'150px', minWidth:'150px', maxWidth: '230px', maxHeight: '200px' }}
        />
      ) : (
        <img
          className="Card"
          src={photoNotFound}
          style={{ maxWidth: '230px', minHeight:'150px', minWidth:'150px' ,maxHeight: '200px' }}
        />
      )}
    </Link>
  </>
)
const SampleNextArrow = (props) => {
  const { className, style, onClick } = props
  return (
    <div
      className="carousel-control-next"
      style={{
        fontSize: '50px',
        color: '#a8a8a8',
        position: 'absolute',
        left: '100%',
        top: '50%',
        margin: 'auto',
        paddingLeft:'20px'
      }}
      onClick={onClick}
    >
      <RightCircleFilled />
    </div>
  )
}

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props
  return (
    <div
      className="carousel-control-prev"
      style={{
        color: '#a8a8a8',
        fontSize: '50px',
        position: 'absolute',
        margin: 'auto',
        right: '100%',
        top: '50%',
        paddingRight:'20px'

      }}
      onClick={onClick}
    >
      <LeftCircleFilled />
    </div>
  )
}

export const MyCarousel = ({ images = [] }) => {
 // console.log('IMAGES', images)
  return (
    <>
      <div className='MyCarousel'>
        <Carousel
          effect="fade"
          arrows
          nextArrow={<SampleNextArrow />}
          prevArrow={<SamplePrevArrow />}
        >
          {
            images
              ?
              (images.map((i, index) =>
                i?.url && (
                  <div key={index}>
                    <img
                       key={index}
                      className="PostImage"
                      src={'/' + i?.url}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '50%',
                        margin: '0 auto',
                        maxWidth: '60%',
                        height: '50%',
                        minWidth: '40%',
                        minHeight: '40%',
                        maxHeight: '60%',
                        marginBottom: '40px',
                      }}
                    />
                  </div>
                )
              ))
              
              : (
                <div>
                  <img
                    className="PostImage"
                    src={photoNotFound}
                    style={{ maxWidth: '400px', maxHeight: '400px' }}
                  />
                </div>
              )
               }
        </Carousel>
      </div>
    </>
  )
}


export const PagePost = ({ my_Id, onePost, addComment,
  addCommentReply, addLike, findSubComment, deleteLike,
  match: { params: { _id } },
  aboutUser = {}, onPost }) =>
{
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  useEffect(() => {
    onPost(_id)
    console.log('ONE POST _ID',onePost?._id)
  }, [_id])

  return (
    <>
         
     <Row>
        <Col span={14}>
        <ConstructorModal title={'Edit post'} isModalVisible={isModalVisible}
                  setIsModalVisible={setIsModalVisible}>
           <CPostEditor/>
          </ConstructorModal>
          
      {/* <div  style={{display: 'flex'}}> */}
      <MyCarousel style={{position: 'absolute'}} images={onePost?.images} />
      <h3 style={{ textAlign: 'center', padding:'30px'}}>
            Created Post: {new Intl.DateTimeFormat('en-GB').format(onePost?.createdAt)}
          </h3>
          <div style={{ marginLeft: '100px' }}>
          {/* <Col span={3} offset={2}> */}
          <CLike likes={onePost?.likes} postId={onePost?._id}/>
              {/* </Col> */}
           </div>
    </Col>
<Col span={8}>
<div  style={{display: 'flex', flexDirection:'row'}}>
       
      {aboutUser?.avatar ? (
        <Avatar
          style={{ width: '50px', height: '50px' }}
          src={ '/' + aboutUser?.avatar?.url}
        />
      ) : (
        <Avatar style={{ width: '50px', height: '50px' }} src={user} />
      )
      }
            <h1 style={{ marginLeft: '20px' }}> {aboutUser?.login || 'Anon'}</h1>
            <Row span={1}>
              {my_Id === aboutUser?._id && <Link  to={`/edit/post/${_id}`}> Edit post </Link>

             }
            </Row>
          </div>
  
      <Divider/>
      <h2> Title: {onePost?.title || ''} </h2>

      <h2> Text: {onePost?.text || ''} </h2>
      <Divider>Comments</Divider>
      <div className="Scroll">

            <CComments postId={onePost?._id} comments={onePost?.comments || []} />
        
     </div>

          {/* <HeartTwoTone twoToneColor="#eb2f96" /> */}
          <div style={{ display: 'flex',  margin: '100px 10px' }}>
            <AddComment addComment={addComment} postId={onePost?._id} />
            </div>
        </Col>
     
        </Row>
    </>
  )
}

export const CPost = connect((state) => ({
  onePost: state.promise?.onePost?.payload,
  my_Id: state.auth.payload.sub.id || '',
  aboutUser: state.profilePage?.aboutUser,
  addComment: state.promise?.addComment?.payload,
  
}), {

  addComment: actionAddFullComment, 
  addCommentReply: actionAddSubFullComment,
  onPost:actionFullOnePost
})(PagePost)

const AllLikeComp = ({ my_Id, addLike, deleteLike, likes, postId }) =>
<Like my_Id={my_Id} addLike={addLike} deleteLike={deleteLike} likes={likes} postId={postId}>
<Likes likes={likes} />
</Like>
export const CLike = connect((state) => ({
  my_Id: state.auth.payload.sub.id || ''
}), {
  addLike: actionAddFullLike,
  // findLikes: actionGetFindLiked,
  deleteLike: actionDeleteFullLike,
  // findLikes: actionFindLikes
})(AllLikeComp)