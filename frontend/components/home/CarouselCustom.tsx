import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Image from 'next/image'

const CarouselCustom: React.FC<any> = ({data}) => {
   const myLoader = ({src, width, quality}) => {
      return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${src}?w=${width}&q=${quality || 75}`
   }
   console.log('data')
   console.log(data)
   return (
      <div>
         <Carousel fade>
            {/* if no images are uploaded */}
            {data.cover_images.length === 0 ? (
               <div className="carousel-loading-background">
                  <p className="carousel-loading-message">New images are on the way.</p>
               </div>
            ) : (
               data.cover_images
                  .filter((current) => current.width >= 1440)
                  .filter((current) => current.height >= 1050)
                  .map((current, index) => {
                     return (
                        <Carousel.Item interval={6000} className="home-carousel-item" key={index}>
                           <Image
                              priority={false}
                              loader={myLoader}
                              src={current.url}
                              layout="fill" // makes the image fill according to parent measures
                              objectFit="cover" // zooms in to contain aspect ratio and crops the rest
                              objectPosition="center" // centers the croped and "zoomed" image
                           />
                           <Carousel.Caption>
                              {current.caption !== '' ? (
                                 <h3 className="home-carousel-caption">{current.caption}</h3>
                              ) : (
                                 <></>
                              )}
                           </Carousel.Caption>
                        </Carousel.Item>
                     )
                  })
            )}
         </Carousel>
      </div>
   )
}

export default CarouselCustom
