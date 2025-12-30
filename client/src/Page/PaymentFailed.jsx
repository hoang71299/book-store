import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

import { XCircle, MapPin, Phone, Mail, RefreshCcw, Home } from 'lucide-react'

import { requestPaymentById } from '@/config/paymentRequest'

export default function PaymentFailed() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await requestPaymentById(id)
        setOrder(res.metadata)
      } catch (err) {
        console.error(err)
      }
    }

    fetchOrder()
  }, [id])

  if (!order) {
    return <div className='text-center py-20'>Đang tải dữ liệu...</div>
  }

  return (
    <div className='max-w-5xl mx-auto px-4 py-10 pt-30'>
      <Card className='border-red-500'>
        {/* HEADER */}
        <CardHeader className='text-center'>
          <XCircle className='mx-auto h-16 w-16 text-red-500' />
          <CardTitle className='text-2xl mt-4 text-red-600'>Thanh toán thất bại</CardTitle>

          <Badge variant='destructive' className='mx-auto mt-2 uppercase'>
            {order.paymentMethod}
          </Badge>
        </CardHeader>

        <CardContent className='space-y-6'>
          {/* ORDER ID */}
          <div>
            <p className='text-sm text-muted-foreground'>Mã đơn hàng</p>
            <p className='font-semibold'>{order._id}</p>
          </div>

          <Separator />

          {/* CUSTOMER INFO */}
          <div className='grid md:grid-cols-2 gap-4'>
            <Info label='Người đặt' value={order.userId?.fullName} />
            <Info icon={<Mail size={18} />} label='Email tài khoản' value={order.userId?.email} />
            <Info icon={<Phone size={18} />} label='SĐT nhận hàng' value={order.phoneNumber} />
            <Info icon={<Mail size={18} />} label='Email nhận hàng' value={order.email} />
            <Info icon={<MapPin size={18} />} label='Địa chỉ giao hàng' value={order.address} />
          </div>

          <Separator />

          {/* PRODUCTS */}
          <div>
            <h3 className='font-semibold mb-3'>Sản phẩm</h3>

            <div className='space-y-4'>
              {order.products.map((item) => {
                const product = item.productId
                const priceAfterDiscount = product.priceProduct - (product.priceProduct * product.discountProduct) / 100

                return (
                  <div key={item._id} className='flex items-center justify-between gap-4'>
                    <div className='flex gap-4'>
                      <img
                        src={product.imagesProduct[0]}
                        alt={product.nameProduct}
                        className='w-20 h-20 rounded-md object-cover border'
                      />

                      <div>
                        <p className='font-medium'>{product.nameProduct}</p>
                        <p className='text-sm text-muted-foreground'>Số lượng: {item.quantity}</p>
                        {product.discountProduct > 0 && (
                          <Badge variant='secondary' className='mt-1'>
                            Giảm {product.discountProduct}%
                          </Badge>
                        )}
                      </div>
                    </div>

                    <p className='font-semibold text-right'>{priceAfterDiscount.toLocaleString()} ₫</p>
                  </div>
                )
              })}
            </div>
          </div>

          <Separator />

          {/* PRICE */}
          <div className='space-y-2'>
            <PriceRow label='Tổng tiền' value={order.totalPrice} />
            <PriceRow label='Thành tiền' value={order.couponId ? order.finalPrice : order.totalPrice} highlight />
          </div>

          <Separator />

          {/* ACTIONS */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <Link to='/'>
              <Button variant='outline' className='w-full justify-center gap-2' onClick={() => navigate('/')}>
                <Home className='h-4 w-4' />
                Về trang chủ
              </Button>
            </Link>

            <Link to='/checkout'>
              <Button className='w-full justify-center gap-2' onClick={() => navigate(`/checkout/${order._id}`)}>
                <RefreshCcw className='h-4 w-4' />
                Thanh toán lại
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

/* ================== SUB COMPONENTS ================== */

function Info({ icon, label, value }) {
  return (
    <div className='flex gap-3'>
      {icon && <div className='text-muted-foreground'>{icon}</div>}
      <div>
        <p className='text-sm text-muted-foreground'>{label}</p>
        <p className='font-medium break-all'>{value || '---'}</p>
      </div>
    </div>
  )
}

function PriceRow({ label, value, highlight }) {
  return (
    <div className='flex justify-between'>
      <span className='text-muted-foreground'>{label}</span>
      <span className={highlight ? 'font-bold text-lg text-red-600' : 'font-medium'}>{value.toLocaleString()} ₫</span>
    </div>
  )
}
