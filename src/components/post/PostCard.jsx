import defaultPhoto from '../../materials/default-photo.png'
import { Link } from 'react-router-dom'
import galery from '../../materials/gallery-icon.png'
import backendURL  from '../../helpers/backendUrl'

export const Card = ({ post }) => (
  <>
    <Link key={post?._id} to={`/post/${post?._id}`}>
      {post?.images && post?.images.length > 1 ? (
        <div className="Wrapper">
          <img src={galery} className="Gallery" />
          <img className="Card" src={backendURL+'/' + post.images[0].url} />
        </div>
      ) : post?.images && post?.images[0] && post.images[0]?.url ? (
        <div className="Wrapper">
          <img className="Card" src={backendURL+'/' + post.images[0].url} />
        </div>
      ) : (
        <div className="Wrapper">
          <img className="Card" src={defaultPhoto} />
        </div>
      )}
    </Link>
  </>
)
