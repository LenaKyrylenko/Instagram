import user from '../materials/user.png'
import { Link} from 'react-router-dom'
import { Avatar, Col} from 'antd'

export const LinkToUser = (owner, size) => {
    return <Col className="gutter-row" span={6}>
        <Link to={`/profile/${owner?._id}`} style={{ display: 'flex', flexDirection: 'row' }}>
        {owner?.avatar ? (
            <Avatar
               size={size}
                src={'/' + owner?.avatar?.url}
            />
        ) : (
            <Avatar size={size} src={user} />
        )}
        <h1> {owner?.login || 'Anon'}</h1>
        </Link>
    </Col>
}
export default LinkToUser