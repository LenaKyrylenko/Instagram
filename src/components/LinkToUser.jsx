import user from '../materials/user.png'
import { Link } from 'react-router-dom'
import { Avatar, Col, Row } from 'antd'

export const LinkToUser = ({
    _id,
    avatar,
    login,
  size,
  font = '15px',
  padding = '10px',
    onClick, key
}) => {
  return (
    // <Row style={{ margin:'10px', marginBottom:'20px' }}>
 
    <Row style={{ margin:'10px', marginBottom:'20px' }}>
      <Link
        to={`/profile/${_id}`}
        style={{
          display: 'flex',
          padding: padding,
          flexDirection: 'row',
          fontSize: font,
              }}
              onClick={onClick}
              key={key}
      >
        <Col offset={1} className="gutter-row" >
          {avatar ? (
            <Avatar
              size={size}
              src={'/' + avatar?.url}
              style={{ marginRight: '3px' }}
            />
          ) : (
            <Avatar size={size} src={user} style={{ marginRight: '3px' }} />
          )}
        </Col>
        <Col offset={2} style={{marginTop:'5px'}}>
          <h3> {login || 'Anon'}</h3>
        </Col>
      </Link>
    </Row>
  )
}
export default LinkToUser