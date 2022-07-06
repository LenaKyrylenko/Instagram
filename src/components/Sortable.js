import { sortableContainer, SortableElement, sortableElement, SortableHandle } from 'react-sortable-hoc'
import { Button,Image } from 'antd'

export const SortableItem = SortableElement(({ url, onRemoveImage, _id }) => {
    return (
      <>
      <img
        style={{
          // margin: '20px',
          maxWidth: '300px',
            minWidth: '100px',
            objectFit: 'cover',
          boxShadow: '0 5px 10px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
          maxHeight: '300px',
          minHeight:'100px'
        }}
        src={'/' + url}
      />
          <Button
      type="primary"
      danger
      size="small"
          style={{
            float: 'right',
          margin:'5px'
          }}
      onClick={() => onRemoveImage(_id)}
    >
      {' '}
      x{' '}
        </Button>
      </>
    )
  })
  export const SortableContainer = sortableContainer(({ children ,checkLength}) => {
  
    return (
      <>
            <ul style={{ display: 'flex', flexDirection: 'row', margin: '5px' }}>{children}</ul>
      </>
    )
  })
  