import { Link } from 'react-router-dom'
import { Button } from 'antd'

export const EditMyPostButton = ({ _id }) => {
  return (
    <>
      <Link to={`/edit/post/${_id}`}>
        <Button
          style={{
            marginLeft: '200px',
            marginTop: '10px',
            width: '100px',
          }}
          size="large"
          type="primary"
        >
          Edit Post
        </Button>
      </Link>
    </>
  )
}
