import user from '../../materials/user.png'
import { Link } from 'react-router-dom'
import { Avatar } from 'antd'
import backendURL from '../../helpers/backendUrl'

const CommentAvatar = ({ owner }) =>
  owner?.avatar ? (
    <Link to={`/profile/${owner?._id}`}>
      <Avatar
        size={30}
        src={backendURL+'/' + owner?.avatar?.url}
        style={{ marginLeft: '15px' }}
        alt={owner?.login || 'Anon'}
      />
    </Link>
  ) : (
    <Link to={`/profile/${owner?._id}`}>
      <Avatar
        size={30}
        src={user}
        style={{ marginLeft: '15px' }}
        alt={owner?.login || 'Anon'}
      />
    </Link>
  )

export default CommentAvatar
