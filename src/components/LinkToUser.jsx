import user from '../materials/user.png'
import { Link } from 'react-router-dom'
import { Avatar, Col, Row } from 'antd'
import { CSubscribeLinkUser } from '../components/Subscribe'
import backendURL from '../helpers/backendUrl'

export const LinkToUser = ({
  _id,
  avatar,
  login,
  size,
  // font = '15px',
  padding = '10px',
  onClick,
  key,
}) => {
  return (
    <Row style={{ marginBottom:'5px'}}>
      <Link
        to={`/profile/${_id}`}
        style={{
          // display: 'flex',
          padding: padding,
          // flexDirection: 'row',
          // fontSize: font,
          // fontWeight: 'bold',
          // color: 'black'
        }}
        className="ModalLink"
        onClick={onClick}
        key={key}
      >
        <Col offset={1} className="gutter-row">
          {avatar ? (
            <Avatar
              className='ModalAvatar'
              src={backendURL+'/' + avatar?.url}
             
            />
          ) : (
              <Avatar  className='ModalAvatar' src={user}
                // style={{ marginRight: '3px' }}
              />
          )}
        </Col>
        <Col offset={3} style={{ marginTop: '5px' }}>
        
          <h3 className="ModalLink"
          > {login || 'Anon'}</h3>
        </Col>
      </Link>
    </Row>
  )
}

export const LinkWithSubscribe = ({
  _id,
  avatar,
  login,
  size,
  // font = '15px',
  // padding = '10px',
  onClick,
  key,
  myId,
}) => {
  return (
    <Row style={{ margin: '10px', marginBottom: '20px' }}>
      <Link
        to={`/profile/${_id}`} 

       className="ModalLink"
        onClick={onClick}
        key={key}
      >
        <Col offset={1} className="gutter-row">
          {avatar ? (
            <Avatar
              size={size}
              src={backendURL+'/' + avatar?.url}
              style={{ marginRight: '3px' }}
            />
          ) : (
            <Avatar size={size} src={user} style={{ marginRight: '3px' }} />
          )}
        </Col>
        <Col offset={2} style={{ marginTop: '5px' }}>
          <h3 className='ModalLink'> {login || 'Anon'}</h3>
        </Col>
      </Link>

      {myId == _id ? null : (
        <div
          style={{
            right: '0',
            position: 'absolute',
            marginRight: '20px',
          }}
        >
          <CSubscribeLinkUser followId={_id} />
        </div>
      )}
    </Row>
  )
}
export default LinkToUser
