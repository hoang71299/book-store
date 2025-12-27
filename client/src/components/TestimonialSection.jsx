import React from 'react'
import { Card, CardContent } from '@/components/ui/card'

export default function TestimonialSection() {
  const testimonials = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      title: 'Khách hàng thân thiết',
      comment: 'Sản phẩm chất lượng tốt, giao hàng nhanh chóng. Tôi rất hài lòng với dịch vụ.',
      rating: 5,
      avatar: '👤'
    },
    {
      id: 2,
      name: 'Trần Thị B',
      title: 'Nhà kinh doanh',
      comment: 'Giá cả cạnh tranh, hỗ trợ khách hàng tuyệt vời. Sẽ tiếp tục mua sắm.',
      rating: 5,
      avatar: '👤'
    },
    {
      id: 3,
      name: 'Lê Văn C',
      title: 'Nhân viên công ty',
      comment: 'Trang web dễ sử dụng, tìm kiếm sản phẩm rất thuận tiện.',
      rating: 4,
      avatar: '👤'
    }
  ]

  return (
    <div className='w-full py-16 px-4 bg-gray-50'>
      <div className='max-w-6xl mx-auto'>
        <div className='mb-12 text-center'>
          <h2 className='text-4xl font-bold mb-3'>Nhận Xét Từ Khách Hàng</h2>
          <p className='text-gray-600 text-lg'>Những lời đánh giá từ khách hàng thực tế</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className='border-0 hover:shadow-lg transition-shadow duration-300'>
              <CardContent className='pt-6'>
                <div className='flex items-center gap-4 mb-4'>
                  <div className='text-5xl'>{testimonial.avatar}</div>
                  <div>
                    <h3 className='font-bold text-lg'>{testimonial.name}</h3>
                    <p className='text-gray-600 text-sm'>{testimonial.title}</p>
                  </div>
                </div>

                <div className='flex gap-1 mb-4'>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className='text-yellow-400'>★</span>
                  ))}
                  {[...Array(5 - testimonial.rating)].map((_, i) => (
                    <span key={i} className='text-gray-300'>★</span>
                  ))}
                </div>

                <p className='text-gray-700 text-sm leading-relaxed'>
                  "{testimonial.comment}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
