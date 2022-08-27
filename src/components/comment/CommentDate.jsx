import { Tooltip } from 'antd'
import moment from 'moment'

export const CommentDate = ({ createdAt }) => {
  return (
    <Tooltip
      className="Tooltip"
      title={moment(new Date(+createdAt)).format('lll')}
    >
      {moment(new Date(+createdAt))
        .startOf()
        .fromNow()}
    </Tooltip>
  )
}
