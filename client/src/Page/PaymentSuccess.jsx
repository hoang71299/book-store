import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Package, MapPin, Phone, Mail, CreditCard } from 'lucide-react'
import { requestPaymentById } from '@/config/paymentRequest'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router-dom'

export default function PaymentSuccess() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const [dataPayment, setDataPayment] = useState(null)
  const orderData = {
    _id: '6953a0a7a95bb2422b2ddeb7',
    userId: {
      _id: '692093316f4c9d39d33fc892',
      fullName: 'Trần Luân',
      email: 'huynhhoang712014@gmail.com'
    },
    products: [{ id: '1', name: 'Premium Product', price: 146880, quantity: 1 }],
    totalPrice: 146880,
    fullName: 'Đâs',
    email: 'huynhhoang712003@gmail.com',
    phoneNumber: 'adasdas',
    address: '21313213',
    couponId: { nameCoupon: 'SALE2026', discount: 25 },
    finalPrice: 110160,
    paymentMethod: 'momo',
    status: 'pending',
    createdAt: '2025-12-30T09:51:35.124Z'
  }

  const discountAmount = orderData.totalPrice - orderData.finalPrice
  const discountPercentage = orderData.couponId?.discount || 0
  useEffect(() => {
    const fetchDataPayment = async () => {
      try {
        const res = await requestPaymentById(orderId)
        setDataPayment(res.metadata)
      } catch (error) {
        toast.error('Không thể tải thông tin đơn hàng')
      }
    }
    fetchDataPayment()
  }, [orderId])
  return (
    <main className='min-h-screen bg-gradient-to-br from-background to-muted/20 py-8 px-4 pt-26'>
      <div className='max-w-4xl mx-auto space-y-8'>
        {/* Success Header */}
        <div className='text-center space-y-4 mt-8'>
          <div className='flex justify-center'>
            <div className='w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center'>
              <Check className='w-8 h-8 text-emerald-600' />
            </div>
          </div>
          <h1 className='text-3xl font-bold'>Đơn hàng đã xác nhận!</h1>
          <p className='text-muted-foreground'>Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được đặt thành công.</p>
        </div>

        {/* Order Code */}
        <div className='text-center'>
          <p className='text-sm text-muted-foreground'>Mã đơn hàng</p>
          <p className='text-xl font-mono font-semibold break-all'>{orderData._id}</p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Left */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Products */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Package size={18} /> Sản phẩm
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                {orderData.products.map((product) => (
                  <div key={product.id} className='flex justify-between p-4 border rounded-lg'>
                    <div>
                      <h3 className='font-semibold'>{product.name}</h3>
                      <p className='text-sm text-muted-foreground'>Số lượng: {product.quantity}</p>
                    </div>
                    <p className='font-semibold'>₫{product.price.toLocaleString('vi-VN')}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Shipping */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <MapPin size={18} /> Giao hàng
                </CardTitle>
              </CardHeader>
              <CardContent className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                  <p className='text-sm text-muted-foreground'>Họ tên</p>
                  <p className='font-semibold'>{orderData.fullName}</p>
                </div>
                <div>
                  <p className='text-sm text-muted-foreground'>Địa chỉ</p>
                  <p className='font-semibold'>{orderData.address}</p>
                </div>
                <div className='flex gap-2'>
                  <Phone size={14} className='mt-1' />
                  <div>
                    <p className='text-sm text-muted-foreground'>Điện thoại</p>
                    <p className='font-semibold'>{orderData.phoneNumber}</p>
                  </div>
                </div>
                <div className='flex gap-2'>
                  <Mail size={14} className='mt-1' />
                  <div>
                    <p className='text-sm text-muted-foreground'>Email</p>
                    <p className='font-semibold break-all'>{orderData.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <CreditCard size={18} /> Thanh toán
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='flex justify-between'>
                  <span>Phương thức</span>
                  <Badge variant='secondary'>{orderData.paymentMethod}</Badge>
                </div>
                <div className='flex justify-between'>
                  <span>Trạng thái</span>
                  <Badge variant='outline'>{orderData.status === 'pending' ? 'Đang chờ' : orderData.status}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right */}
          <Card className='lg:col-span-1 h-fit sticky top-4'>
            <CardHeader>
              <CardTitle>Tóm tắt</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div className='flex justify-between text-sm'>
                <span>Tổng tiền</span>
                <span>₫{orderData.totalPrice.toLocaleString('vi-VN')}</span>
              </div>

              {discountAmount > 0 && (
                <div className='flex justify-between text-sm text-emerald-600'>
                  <span>Giảm giá ({discountPercentage}%)</span>
                  <span>-₫{discountAmount.toLocaleString('vi-VN')}</span>
                </div>
              )}

              {orderData.couponId && (
                <div className='flex justify-between text-sm'>
                  <span>Mã giảm</span>
                  <Badge variant='outline' className='font-mono'>
                    {orderData.couponId.nameCoupon}
                  </Badge>
                </div>
              )}

              <div className='flex justify-between text-lg font-bold pt-2 border-t'>
                <span>Thành tiền</span>
                <span className='text-primary'>₫{orderData.finalPrice.toLocaleString('vi-VN')}</span>
              </div>

              <p className='text-xs text-muted-foreground'>
                Đặt lúc{' '}
                {new Date(orderData.createdAt).toLocaleDateString('vi-VN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <button onClick={() => navigate('/')} className='px-8 py-3 bg-primary text-primary-foreground rounded-lg'>
            Tiếp tục mua hàng
          </button>
        </div>
      </div>
    </main>
  )
}
