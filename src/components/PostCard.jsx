import photoNotFound from '../materials/photoNotFound.png'
import { Link } from 'react-router-dom'

export const Card = ({ post }) => (
    <>
      <Link key={post?._id} to={`/post/${post?._id}`}>
      {post?.images && post?.images[0] && post.images[0]?.url ? (
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
            src={photoNotFound}
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