import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import {
  actionChangeLikeTypeSaga,
  actionChangeFeedLikeTypeSaga,
} from '../../actions/typeSaga/likeTypesSaga'
import { connect } from 'react-redux'
import ModalLikes from './ModalLikes'

export const Like = ({ my_Id, postId, likes = [], changeLike }) => {
  const likeId = likes.find((like) => like?.owner?._id === my_Id)?._id
  return (
    <>
    
      <div className='OneLike'>
        <p onClick={() => changeLike(likeId, postId)}
          style={{ margin: '0 auto' }}>
          {likeId ? (
            <HeartFilled style={{ color: 'red' }}
              className="Like" />
          ) : (
            <HeartOutlined className="Like" />
          )}
        </p>
        <ModalLikes likes={likes} myId={my_Id} />
        </div>
    </>
  )
}
const AllLikes = ({ my_Id, likes, changeLike, postId }) => (
  <Like my_Id={my_Id} likes={likes} postId={postId} changeLike={changeLike} />
)
export const CLike = connect(
  (state) => ({
    my_Id: state.auth?.payload?.sub?.id || '',
  }),
  {
    changeLike: actionChangeLikeTypeSaga,
  },
)(AllLikes)

export const CLikeFeed = connect(
  (state) => ({
    my_Id: state.auth?.payload?.sub?.id || '',
  }),
  {
    changeLike: actionChangeFeedLikeTypeSaga,
  },
)(AllLikes)
