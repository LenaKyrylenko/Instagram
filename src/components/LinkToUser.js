import user from '../materials/user.png'
import { Link} from 'react-router-dom'
import { Avatar, Col} from 'antd'

export const LinkToUser = ({ owner, size, font='15px',sizePadding='20px' }) => {
    return <Col className="gutter-row" style={{padding:sizePadding}}>
        <Link to={`/profile/${owner?._id}`} style={{
            display: 'flex',
            padding: '10px', flexDirection: 'row',
            fontSize:font
        }}>
        {owner?.avatar ? (
            <Avatar
               size={size}
                    src={'/' + owner?.avatar?.url}
                    style={{marginRight:'5px'}}
            />
        ) : (
            <Avatar size={size} src={user}  style={{marginRight:'5px'}} />
        )}
        <h2> {owner?.login || 'Anon'}</h2>
        </Link>
    </Col>
}
export default LinkToUser