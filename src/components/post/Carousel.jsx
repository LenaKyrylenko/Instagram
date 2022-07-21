import { Carousel } from 'antd'
import { LeftCircleFilled, RightCircleFilled } from '@ant-design/icons'
import defaultPhoto from '../../materials/default-photo.png'

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
            <div>
              <img className="PostImage" src={defaultPhoto} />
            </div>
          )}
        </Carousel>
      </div>
    </>
  )
}
