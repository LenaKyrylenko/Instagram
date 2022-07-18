import { Tooltip } from 'antd'
import moment from 'moment'

export const CommentDate = ({ createdAt }) => {
    return (
      <Tooltip
        color={'#108ee9'}
        style={{ paddingLeft: '10px' }}
        title={moment(new Date(+createdAt)).format('lll')}
      >
        {moment(new Date(+createdAt))
          .startOf()
          .fromNow()}
      </Tooltip>
    )
  }