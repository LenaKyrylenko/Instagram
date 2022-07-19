import { Link } from 'react-router-dom'

const CommentAuthor = ({ owner }) =>
    <Link to={`/profile/${owner?._id}`}>
{owner?.login || 'Anon'}
    </Link>
export default CommentAuthor