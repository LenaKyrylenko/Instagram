import { Carousel } from 'antd'
import { LeftCircleFilled, RightCircleFilled } from '@ant-design/icons'
import photoNotFound from '../materials/photoNotFound.png'

const SampleNextArrow = (props) => {
    const { onClick } = props
    return (
      <div
        style={{
          fontSize: '50px',
          color: '#41607d',
          position: 'absolute',
          left: '100%',
          top: '50%',
          margin: 'auto',
          paddingLeft: '20px',
          textShadow: 'black 1px 0 10px',
        }}
        onClick={onClick}
      >
        <RightCircleFilled />
      </div>
    )
  }
  
  const SamplePrevArrow = (props) => {
    const {  onClick } = props
    return (
      <div
        style={{
          color: '#41607d',
          fontSize: '50px',
          position: 'absolute',
          margin: 'auto',
          right: '100%',
          top: '50%',
          paddingRight: '20px',
        }}
        onClick={onClick}
      >
        <LeftCircleFilled />
      </div>
    )
  }
  
  export const MyCarousel = ({ images = [] }) => {
    return (
      <>
        <div className="MyCarousel">
          <Carousel 
            effect="fade"
            arrows
            nextArrow={<SampleNextArrow />}
            prevArrow={<SamplePrevArrow />}
          >
            {images ? (
              images?.map(
                (i, index) =>
                  i?.url && (
                    <div key={index}>
                      <img key={index} className="PostImage" src={'/' + i?.url} />
                    </div>
                  ),
              )
            ) : (
              <div >
                <img className="PostImage" src={photoNotFound} />
              </div>
            )}
          </Carousel>
        </div>
      </>
    )
  }