import { Link } from 'react-router-dom'

const CommentAuthor = ({ owner }) => (
  <Link to={`/profile/${owner?._id}`}>
    <p className="ModalLink">{owner?.login || 'Anon'}</p>
  </Link>
)
export default CommentAuthor
