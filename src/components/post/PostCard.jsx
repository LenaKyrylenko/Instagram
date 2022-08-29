import defaultPhoto from '../../materials/default-photo.png'
import { Link } from 'react-router-dom'
import galery from '../../materials/gallery-icon.png'
import backendURL from '../../helpers/backendUrl'
import { videoRegex } from '../../helpers'
const GalleryCard = ({ post = {} }) => (
  <div className="Wrapper">
    <img src={galery} className="Gallery" />
    <img className="Card" src={backendURL + '/' + post.images[0].url} />
  </div>
)

const ImageCard = ({ post = {} }) => (
  <div className="Wrapper">
    <img className="Card" src={backendURL + '/' + post.images[0].url} />
  </div>
)

const VideoCard = ({ post = {} }) => (
  <div className="Wrapper">
    <video className="Card">
      <source src={backendURL + '/' + post?.images[0]?.url} />
    </video>
  </div>
)

export const Card = ({ post }) => {
  return (
    <>
      <Link key={post?._id} to={`/post/${post?._id}`}>
        {post?.images && post?.images.length > 1 ? (
          post?.images &&
          post?.images[0] &&
          post?.images[0]?.originalFileName?.match(videoRegex) ? (
            <>
              <VideoCard post={post} />
            </>
          ) : (
            <GalleryCard post={post} />
          )
        ) : post?.images &&
          post?.images[0] &&
          post?.images[0]?.originalFileName?.match(videoRegex) ? (
          <VideoCard post={post} />
        ) : post?.images && post?.images[0] && post?.images[0]?.url ? (
          <ImageCard post={post} />
        ) : (
          <div className="Wrapper">
            <img className="Card" src={defaultPhoto} />
          </div>
        )}
      </Link>
    </>
  )
}
