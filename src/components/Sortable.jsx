import {
  sortableContainer,
  SortableElement,
} from 'react-sortable-hoc'
import { Button} from 'antd'

export const SortableItem = SortableElement(({ url, onRemoveImage, _id }) => {
  return (
    <>
      <img className="Preview" src={'/' + url} />
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
