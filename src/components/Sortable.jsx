import {
  sortableContainer,
  SortableElement,
} from 'react-sortable-hoc'
import { Button} from 'antd'
import backendURL  from '../helpers/backendUrl'
import { videoRegex } from '../helpers'
export const SortableItem = SortableElement(({ url,onRemoveImage, _id,originalFileName }) => {
  return (
    <>{originalFileName?.match(videoRegex) ?
      <video className="Preview">
        <source src={backendURL + '/' + url} />
      </video>
     
      :
      <img className="Preview" src={backendURL + '/' + url} />
    }
      <Button
        type="primary"
        danger
        size="small"
        style={{
          margin: '5px',
        }}
        onClick={() => onRemoveImage(_id)}
      >
        {' '}
        x{' '}
      </Button>
    </>
  )
})
export const SortableContainer = sortableContainer(
  ({ children }) => {
    return (
      <>
        <ul
          style={{
            margin: '5px',
          }}
        >
          {children}
        </ul>
      </>
    )
  },
)
