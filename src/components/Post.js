import { Router, Route, Link, Redirect, Switch } from 'react-router-dom'
import {actionAllPosts,actionOnePost} from '../actions'
import photoNotFound from '../materials/photoNotFound.png'
import { LeftCircleFilled, RightCircleFilled } from '@ant-design/icons'
import { Carousel,Avatar } from 'antd'
import user from '../materials/user.png'
import { Provider, connect } from 'react-redux'
export const Card = ({ post, onPost }) => (
  <>
    <Link to={`/post/62361ebb92c08631bc4b0e96`} onClick={() => onPost("62361ebb92c08631bc4b0e96")}>
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
        paddingLeft:'30px'
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
        paddingRight:'30px'

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
            maxWidth: '50%',
            maxHeight: '50%',
            background: '#a0a0a0',
            borderWidth:'10',
            borderColor: '#000',
            borderStyle: 'solid',
            marginBottom: '40px',
            margin: '0 auto'
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
                      width: '100%',
                      margin: '0 auto',
                      maxWidth: '600px',
                      height:'100%',
                      minWidth: '200px',
                      minHeight: '200px',
                      maxHeight: '600px',
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
export const PagePost = ({ onePost, aboutMe: { avatar, login } = {}, onPost }) => {
  return (
    <>
      <MyCarousel images={onePost?.images} />
<div  style={{display: 'flex', flexDirection: 'row'}}>


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
      <h2> {onePost?.title || ''} </h2>
      <h2> {onePost?.text || ''} </h2>
      <h3>
            Created Post: {new Intl.DateTimeFormat('en-GB').format(onePost?.createdAt)}
        </h3>
    </>
  )
}

export const CPost = connect((state) => ({
  onePost: state.promise.onePost?.payload,
  aboutMe: state.promise?.aboutMe?.payload,
}))(PagePost)
