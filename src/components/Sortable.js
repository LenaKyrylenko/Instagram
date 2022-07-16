import { sortableContainer, SortableElement, sortableElement, SortableHandle } from 'react-sortable-hoc'
import { Button,Image,Row,Col } from 'antd'

export const SortableItem = SortableElement(({ url, onRemoveImage, _id }) => {
    return (
      <>
      <img
        style={{
            objectFit: 'cover',
          boxShadow: '0 5px 10px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
          height: '100px',
            width: '100px',
          marginBottom:'5px'
        }}
        src={'/' + url}
      />
          <Button
      type="primary"
      danger
      size="small"
          style={{
            // float: 'right',
            margin: '5px'
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
        {/* <Row> */}
        {/* <Col span={2}> */}
        <ul
          style={{
          // maxWidth:'100px',
              margin: '5px'
          }}
          >{children}</ul>
          {/* </Col> */}
        {/* </Row> */}
      </>
    )
  })
  