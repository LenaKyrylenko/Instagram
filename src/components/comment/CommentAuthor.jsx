import { Link } from 'react-router-dom'

const CommentAuthor = ({ owner }) =>
    <Link to={`/profile/${owner?._id}`} style={{fontWeight:'bold',fontSize:'14px', color:'black'}}>
{owner?.login || 'Anon'}
    </Link>
export default CommentAuthor