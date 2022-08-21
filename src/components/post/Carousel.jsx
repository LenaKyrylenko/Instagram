import { Carousel } from 'antd'
import { LeftCircleFilled, RightCircleFilled } from '@ant-design/icons'
import defaultPhoto from '../../materials/default-photo.png'
import backendURL from '../../helpers/backendUrl'

const SampleNextArrow = (props) => {
  const { onClick } = props
  return (
    <div className="NextArrow" onClick={onClick}>
      <RightCircleFilled />
    </div>
  )
}

const SamplePrevArrow = (props) => {
  const { onClick } = props
  return (
    <div className="PreviousArrow" onClick={onClick}>
      <LeftCircleFilled />
    </div>
  )
}

export const MyCarousel = ({ images = [],carouselWidth,carouselHeight }) => {
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
                    <img key={index} className="PostImage"
                      // style={{width:carouselWidth, height: carouselHeight }}
                      src={backendURL+'/' + i?.url} />
                  </div>
                ),
            )
          ) : (
            <div>
                <img className="PostImage"
                      style={{width:carouselWidth, height: carouselHeight }}
                  
                  src={defaultPhoto} />
            </div>
          )}
        </Carousel>
      </div>
    </>
  )
}
