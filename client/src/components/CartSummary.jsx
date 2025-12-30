import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useStore } from '@/hooks/useStore'
import { ArrowLeft } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
export default function CartSummary({ subtotal, discount, couponDiscount, total }) {
  const navigate = useNavigate()
  const { cart1, getCart } = useStore()
  const handleCheckout = async () => {
    await getCart()
    navigate('/checkout')
  }
  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <div className='flex justify-between text-sm'>
          <span className='text-muted-foreground'>Tạm tính</span>
          <span>{subtotal?.toLocaleString('vi-VN')}đ</span>
        </div>

        <div className='flex justify-between text-sm'>
          <span className='text-muted-foreground'>Giảm giá sản phẩm</span>
          <span className='text-green-600'>-{discount?.toLocaleString('vi-VN')}đ</span>
        </div>

        {couponDiscount > 0 && (
          <div className='flex justify-between text-sm'>
            <span className='text-muted-foreground'>Mã giảm giá</span>
            <span className='text-green-600'>-{couponDiscount.toLocaleString('vi-VN')}đ</span>
          </div>
        )}

        <div className='flex justify-between text-sm'>
          <span className='text-muted-foreground'>Phí vận chuyển</span>
          <span className='text-green-600'>Miễn phí</span>
        </div>
      </div>

      <Separator />

      <div className='flex justify-between'>
        <span className='text-lg font-semibold'>Tổng cộng</span>
        <span className='text-lg font-bold text-primary'>{total.toLocaleString('vi-VN')}đ</span>
      </div>
      {cart1.cart?.products.length != 0 && (
        <Link to='/checkout'>
          <Button className='w-full' size='lg' onClick={handleCheckout}>
            Thanh toán ({total.toLocaleString('vi-VN')}đ)
          </Button>
        </Link>
      )}
      <Link to={'/'}>
        <Button variant='outline' className='w-full bg-transparent' size='lg'>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Tiếp tục mua sắm
        </Button>
      </Link>
    </div>
  )
}
