import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

export default function Banner() {
  const image = [
    'https://theme.hstatic.net/1000237375/1000756917/14/slider_item_1_image.jpg?v=1840',
    'https://theme.hstatic.net/1000237375/1000756917/14/slider_item_2_image.jpg?v=1840',
    'https://theme.hstatic.net/1000237375/1000756917/14/slider_item_4_image.jpg?v=1840'
  ]

  return (
    <div className='w-full'>
      <Carousel className='w-full'>
        <CarouselContent>
          {image.map((item, index) => {
            return (
              <CarouselItem key={index} className='w-full'>
                <img src={item} alt={`Banner ${index + 1}`} className='w-full h-96 object-cover rounded-lg' />
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious className='left-4 bg-white/80 hover:bg-white text-black border-0' />
        <CarouselNext className='right-4 bg-white/80 hover:bg-white text-black border-0' />
      </Carousel>
    </div>
  )
}
