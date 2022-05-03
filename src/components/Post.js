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
import {CComments, AddComment} from '../components/Post_Comment'
import { ConstructorModal} from '../helpers'
import React, { useMemo, useState, useEffect } from 'react'
// const postId="625afa1d069dca48a822ffb0"
export const Card = ({ post, onPost }) => (
  <>
    {/* <Link to={`/post/${postId}`} onClick={() => onPost(postId)}> */}
    {/* {console.log('post id', post?._id)}
    
     onClick={() => onPost(post?._id)}
    
    */}
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

      {/* {console.log(post?._id)} */}
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
const Likes = ({ likes }) =>
{
  return (
    <>
    <div className='Modal'>
        {
          likes &&
          likes?.map(({ owner:{_id, login, avatar} }) => (
            // <div style={{ display: 'flex', flexDirection:'row' }}>
          
                
            <Link to={`/profile/${_id}`}>
              <Row>
              <Col offset={1}>
            <Avatar
              style={{
                width: '50px',
                height: '50px',
                // marginRight: '30px',
                // position: 'absolute',
              }}
              src={'/' + avatar?.url || user}
                  />
                </Col>
                <Col offset={2}>
                    <h3 > {login || 'Anon'}</h3>
                 </Col>
                 </Row>
                </Link>
          ))
        }
    </div>
    </>
  )
  }
const Like = ({ my_Id, postId, addLike, deleteLike, likes=[], children }) =>
{

  const likeId = likes.find(like => like?.owner?._id === my_Id)?._id
  const changeLike = () => likeId ? deleteLike(likeId, postId) : addLike(postId)
  // console.log('likeId', likeId)
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  return(
    <>
      <div style={{display:'flex'}}>
         <h3 onClick={changeLike}>
            {likeId ? 
            <HeartFilled  style={{cursor: 'pointer', fontSize:'xx-large', color:'red'}} />:
             <HeartOutlined  style={{cursor: 'pointer', fontSize: 'xx-large' }} /> }
        </h3>
       {likes.length ? 
        <h3 style={{cursor: 'pointer', paddingLeft: 8 }} onClick={showModal}> {likes.length} likes
           
        </h3>
        :
        '0 likes'}
      </div>
      <ConstructorModal title={'Likes'} isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}>
          <Likes likes={likes}/>
      </ConstructorModal>
    </>
  )
}

export const PagePost = ({ my_Id, onePost, likes, addComment,
  addCommentReply, addLike, findSubComment, deleteLike,
  match: { params: { _id } },
  aboutUser: { avatar, login } = {}, onPost }) => {

  useEffect(() => {
    onPost(_id)
    console.log('ONE POST _ID',onePost?._id)
  }, [_id])
  return (
    <>
     <Row>
      <Col span={14}>
      {/* <div  style={{display: 'flex'}}> */}
      <MyCarousel style={{position: 'absolute'}} images={onePost?.images} />
      <h3 style={{ textAlign: 'center', padding:'30px'}}>
            Created Post: {new Intl.DateTimeFormat('en-GB').format(onePost?.createdAt)}
          </h3>
          <div style={{marginLeft:'100px'}}>
          {/* <Col span={3} offset={2}> */}
          <Like my_Id={my_Id} addLike={addLike} deleteLike={deleteLike} likes={onePost?.likes} postId={onePost?._id}>
              <Likes likes={onePost?.likes} />
          </Like>
              {/* </Col> */}
           </div>
    </Col>
<Col span={8}>
<div  style={{display: 'flex', flexDirection:'row'}}>

      {avatar ? (
        <Avatar
          style={{ width: '50px', height: '50px' }}
          src={ '/' + avatar?.url}
        />
      ) : (
        <Avatar style={{ width: '50px', height: '50px' }} src={user} />
      )
      }

      <h1 style={{ marginLeft:'20px'}}> {login}</h1>
      </div>
      <Divider/>
      <h2> Title: {onePost?.title || ''} </h2>

      <h2> Text: {onePost?.text || ''} </h2>
      <Divider>Comments</Divider>
      <div className="Scroll">

            <CComments comments={onePost?.comments || []} />
        
     </div>

       {/* <HeartTwoTone twoToneColor="#eb2f96" /> */}
            <AddComment addComment={addComment} onePost={onePost} />
        </Col>
     
        </Row>
    </>
  )
}

export const CPost = connect((state) => ({
  onePost: state.promise.onePost?.payload,
  my_Id: state.auth.payload.sub.id || '',
  aboutUser: state.profilePage?.aboutUser,
  addComment: state.promise?.addComment?.payload,
  addSubComment: state.promise?.addSubComment,
  
}), {
  addLike: actionAddFullLike,
  findLikes: actionGetFindLiked,
  deleteLike: actionDeleteFullLike,
  addComment: actionAddFullComment, 
  addCommentReply: actionAddSubFullComment,
  findLikes: actionFindLikes,
  onPost:actionOnePost
})(PagePost)
