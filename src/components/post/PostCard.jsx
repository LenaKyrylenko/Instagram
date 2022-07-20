import defaultPhoto from '../../materials/default-photo.png'
import { Link } from 'react-router-dom'
import galery from '../../materials/gallery-icon.png'
export const Card = ({ post }) => (
    <>
    <Link key={post?._id} to={`/post/${post?._id}`}>
      {
        post?.images && post?.images.length > 1 ?
        ( 
        <div className='Wrapper'>
        <img src={galery} style={{
              
              position: 'fixed',
            right: '0',
  zIndex:'2',
                top: '0',
                width: '50px', height: '50px',
                margin:'10px'
          }} />
              <img
            className="Card"
            src={'/' + post.images[0].url}
            style={{
              width: '250px',
              height: '250px',
              objectFit: 'cover',
              position:'relative'
            }}
          />
   
        </div>)
:

      post?.images && post?.images[0] && post.images[0]?.url ? (
        <div className='Wrapper'>
          <img
            className="Card"
            src={'/' + post.images[0].url}
            style={{
              width: '250px',
              height: '250px',
              objectFit: 'cover',
            }}
          />
          </div>
      ) : (
          <div className='Wrapper'>
          <img
            className="Card"
            src={defaultPhoto}
            style={{
              width: '250px',
              height: '250px',
              objectFit: 'cover',
            }}
            />
          </div>
          )
      
        }
      </Link>
    </>
  )