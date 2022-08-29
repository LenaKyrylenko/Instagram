import { Carousel } from 'antd'
import { LeftCircleFilled, RightCircleFilled } from '@ant-design/icons'
import defaultPhoto from '../../materials/default-photo.png'
import backendURL from '../../helpers/backendUrl'
import { videoRegex } from '../../helpers'
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

export const MyCarousel = ({ images = [], carouselWidth, carouselHeight }) => {
  return (
   
    <>
      <div className="MyCarousel">
        <Carousel
          effect="fade"
          arrows
          nextArrow={<SampleNextArrow />}
          prevArrow={<SamplePrevArrow />}
        >
          {

            images ? (
            
            images?.map(
              (i, index) =>
                
                i?.url && (
                  i?.originalFileName?.match(videoRegex) ?
                    
                    <div key={index}>
                      <video 
                        className="PostImage"
                        muted="muted"  controls loop preload="true" >
  <source src={backendURL + '/' + i?.url}/>
                        </video>

                
                </div>
                    :
                  <div key={index}>
                    <img
                      key={index}
                      className="PostImage"
                      src={backendURL + '/' + i?.url}
                    />
                  </div>
                ),
                )
                // :

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
