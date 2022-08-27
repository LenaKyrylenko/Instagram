import { Link } from 'react-router-dom'
import { Button } from 'antd'

export const EditMyPostButton = ({ _id }) => {
  return (
    <>
      <Link to={`/edit/post/${_id}`}>
        <Button
          style={{
            width: '100px',
          }}
          xl={{ size: 'large' }}
          xs={{ size: 'small' }}
          type="primary"
        >
          Edit Post
        </Button>
      </Link>
    </>
  )
}
