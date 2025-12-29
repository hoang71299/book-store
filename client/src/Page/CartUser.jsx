import { useState } from 'react'
import { ShoppingCart } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CartItem from '../components/CartItem'
import CouponSection from '@/components/CouponSection'
import CartSummary from '@/components/CartSummary'
import { useStore } from '@/hooks/useStore'
import { requestDeleteCart, requestUpdateCart } from '@/config/CartRequest'
import { toast } from 'sonner'
import { applyCoupon } from '@/config/CounponRequest'
export default function CartUser() {
  const [selectedCoupon, setSelectedCoupon] = useState('')
  const { cart1, getCart } = useStore()
  const { cart, coupons } = cart1

  const subtotal = cart?.products.reduce((acc, item) => acc + item.productId.priceProduct * item.quantity, 0)

  const productDiscount = cart?.products.reduce((acc, item) => {
    const discount = (item.productId.priceProduct * item.productId.discountProduct) / 100
    return acc + discount * item.quantity
  }, 0)

  const afterProductDiscount = subtotal - productDiscount

  const couponDiscount = selectedCoupon ? (afterProductDiscount * selectedCoupon.discount) / 100 : 0

  const total = afterProductDiscount - couponDiscount
  const handleChangeCart = async (productId, quantity) => {
    try {
      const data = {
        productId,
        newQuantity: quantity
      }
      const res = await requestUpdateCart(data)
      toast.success(res.message)
      await getCart()
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const handleDeleteCart = async (productId) => {
    try {
      const res = await requestDeleteCart(productId)
      toast.success(res.message)
      await getCart()
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  const handleChangeCoupon = async (coupon) => {
    setSelectedCoupon(coupon)
    const data = {
      couponId: coupon._id
    }
    const res = await applyCoupon(data)
    toast.success(res.message)
  }
  return (
    <div className='min-h-screen bg-muted/30 py-8'>
      <div className='container mx-auto max-w-6xl px-4'>
        <div className='mb-8 flex items-center gap-3'>
          <ShoppingCart className='h-8 w-8 text-primary' />
          <h1 className='text-2xl font-bold text-foreground'>Giỏ hàng của bạn</h1>
          <span className='rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground'>
            {cart?.products.length} sản phẩm
          </span>
        </div>

        <div className='grid gap-8 lg:grid-cols-3'>
          <div className='lg:col-span-2'>
            <Card>
              <CardHeader>
                <CardTitle>Sản phẩm</CardTitle>
              </CardHeader>
              <CardContent>
                {cart?.products.map((item) => (
                  <CartItem
                    key={item._id}
                    product={item.productId}
                    quantity={item.quantity}
                    cartId={cart._id}
                    handleChangeCart={handleChangeCart}
                    handleDeleteCart={handleDeleteCart}
                  />
                ))}
              </CardContent>
            </Card>
          </div>

          <div className='space-y-6'>
            <Card>
              <CardHeader>
                <CardTitle>Mã giảm giá</CardTitle>
              </CardHeader>
              <CardContent>
                <CouponSection
                  coupons={coupons}
                  selectedCoupon={selectedCoupon}
                  onSelectCoupon={handleChangeCoupon}
                  cartTotal={afterProductDiscount}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tổng đơn hàng</CardTitle>
              </CardHeader>
              <CardContent>
                <CartSummary
                  subtotal={subtotal}
                  discount={productDiscount}
                  couponDiscount={couponDiscount}
                  total={total}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
