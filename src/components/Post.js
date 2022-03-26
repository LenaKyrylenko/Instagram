import { Router, Route, Link, Redirect, Switch } from 'react-router-dom'
import {actionAllPosts,actionOnePost,actionAddFullComment, actionDeleteFullLike,actionAddFullLike,actionAddLike,actionDeleteLike} from '../actions'
import photoNotFound from '../materials/photoNotFound.png'
import { LeftCircleFilled, RightCircleFilled, HeartOutlined,HeartTwoTone,HeartFilled } from '@ant-design/icons'
import { Carousel,Avatar } from 'antd'
import user from '../materials/user.png'
import { Provider, connect } from 'react-redux'
import { Row, Col } from 'antd';
import { Divider,Input,Button } from 'antd';
import React, { useMemo, useState, useEffect } from 'react'
const postId="62361ebb92c08631bc4b0e96"
export const Card = ({ post, onPost }) => (
  <>
    <Link to={`/post/${postId}`} onClick={() => onPost(postId)}>
    {/* <Link to={`/post/${post?._id}`} onClick={() => onPost(post?._id)}> */}
      {post?.images && post?.images[0] && post.images[0]?.url ? (
        <img
          className="Card"
          src={ '/' + post.images[0].url}
          style={{ maxWidth: '200px', maxHeight: '200px' }}
        />
      ) : (
        <img
          className="Card"
          src={photoNotFound}
          style={{ maxWidth: '200px', maxHeight: '200px' }}
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
  console.log('IMAGES', images)
  return (
    <>
      <div style={{
            display: 'block',
            minWidth: '80%',
            minHeight: '80%',
            background: '#a0a0a0',
            borderWidth:'10',
            borderColor: '#000',
            borderStyle: 'solid',
            marginBottom: '40px',
            margin: '0 10%'
          }}>
        <Carousel
          effect="fade"
          arrows
          nextArrow={<SampleNextArrow />}
          prevArrow={<SamplePrevArrow />}
        >
          {images &&
            images.map((i, index) =>
              i?.url ? (
                <div key={index}>
                  <img
                    className="PostImage"
                    src={ '/' + i?.url}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '50%',
                      margin: '0 auto',
                      maxWidth: '60%',
                      height:'50%',
                      minWidth: '40%',
                      minHeight: '40%',
                      maxHeight: '60%',
                      marginBottom: '40px',
                    }}
                  />
                </div>
              ) : (
                <div>
                  <img
                    className="PostImage"
                    src={photoNotFound}
                    style={{ maxWidth: '400px', maxHeight: '400px' }}
                  />
                </div>
              ),
            )}
        </Carousel>
      </div>
    </>
  )
}
const Comment =({addComment})=>{
  const [comment, setComment]=useState('')
  return (
  <div class="Comments" style={{display: 'flex', flexDirection:'row'}}>
      <Input size="large" placeholder='Add a comment...' 
      value={comment} onChange={e=>{setComment(e.target.value)}}/>

      <Button size="large" disabled={comment.length<1} type="primary" onClick={()=>
        addComment(postId,comment)}> Publish </Button>
  </div>
  )

}
const Like=({addLike, deleteLike, likeId})=>{
  const [like, setLike]=useState(false)
  return(
    <>
     {
        like === true
        ?
        // setLike(!like)&&
       <HeartFilled  style={{ fontSize:'xx-large', color:'red'}} onClick={()=>{
        deleteLike(likeId)&&setLike(!like)}}/>
       :
       <HeartOutlined  style={{ fontSize:'xx-large' }} 
       onClick={()=>{addLike(postId)&&setLike(!like)}}/>
       }
    </>
  )
}
export const PagePost = ({ onePost,addComment, addLike, deleteLike, aboutMe: { avatar, login } = {}, onPost }) => {

 console.log('onePost ', onePost)
  return (
    <>
     <Row>
      <Col span={12}>
{/* <div  style={{display: 'flex'}}> */}
    
      <MyCarousel style={{position: 'absolute'}} images={onePost?.images} />
      <h3 style={{ textAlign: 'center', padding:'10%'}}>
            Created Post: {new Intl.DateTimeFormat('en-GB').format(onePost?.createdAt)}
        </h3>
{/* </div> */}
</Col>
<Col span={12}>
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
      
       {(onePost?.comments ||[]).map(({text, createdAt, owner})=>
      (
        <>
        <div style={{display: 'flex', flexDirection:'row', padding:'5px', margin:'5px' }}>
         {owner?.avatar ? 
         <Avatar
          style={{ width: '25px', height: '25px', marginRight:'2%' }}
          src={ '/' + owner?.avatar?.url}
        /> : 
        <Avatar style={{ width: '25px', height: '25px', marginRight:'2%' }} src={user} />
      }
      
       {owner?.login ? (
       <h3 style={{marginRight:'2%' , fontWeight: 'bold'}}> {owner?.login} </h3> 
      ) : (
        <h3 style={{marginRight:'2%', fontWeight: 'bold'}}> anon </h3>
          )
      }
        <h3 style={{marginRight:'2%'}}>  {text} </h3>
 </div>
        <p style={{ paddingLeft:'10px'}}>     
          {new Intl.DateTimeFormat('en-GB').format(createdAt)}
           </p>
        </>

        ))
      }
     </div>
     <Like addLike={addLike} deleteLike={deleteLike} likeId={onePost?.likes?._id}/>
       {/* <HeartTwoTone twoToneColor="#eb2f96" /> */}
       <Comment addComment={addComment}/>
        </Col>
        </Row>
    </>
  )
}

export const CPost = connect((state) => ({
  onePost: state.promise.onePost?.payload,
  aboutMe: state.promise?.aboutMe?.payload,
}), {addComment:actionAddFullComment, 
    addLike:actionAddFullLike,
    deleteLike:actionDeleteFullLike})(PagePost)
