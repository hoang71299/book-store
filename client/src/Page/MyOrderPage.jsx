'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useEffect, useState } from 'react'
import { getAllPayment } from '@/config/paymentRequest'
import { useNavigate } from 'react-router-dom'

export default function MyOrdersPage() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  useEffect(() => {
    const fetchOrders = async () => {
      const res = await getAllPayment()
      setOrders(res.metadata)
    }
    fetchOrders()
  }, [])
  console.log(orders)
  const statusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-300'
      case 'completed':
        return 'bg-green-100 text-green-800 border border-green-300'
      case 'failed':
        return 'bg-red-100 text-red-800 border border-red-300'
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 border border-gray-300'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }
  return (
    <div className='mx-auto max-w-5xl space-y-6 p-6 pt-30'>
      <h1 className='text-2xl font-semibold'>Đơn hàng của tôi</h1>

      {orders.map((order) => (
        <Card key={order._id}>
          <CardHeader className='space-y-1'>
            <div className='flex items-center justify-between'>
              <CardTitle className='text-base'>Mã đơn: {order._id}</CardTitle>
              <Badge className={statusClass(order.status)}>{order.status.toUpperCase()}</Badge>{' '}
            </div>
            <p className='text-sm text-muted-foreground'>Ngày đặt: {new Date(order.createdAt).toLocaleString()}</p>
          </CardHeader>

          <CardContent className='space-y-3 text-sm'>
            <Separator />

            <div className='flex justify-between'>
              <span>Phương thức thanh toán</span>
              <span className='font-medium'>{order.paymentMethod.toUpperCase()}</span>
            </div>

            <div className='flex justify-between'>
              <span>Tổng tiền</span>
              <span>{order.totalPrice.toLocaleString()} đ</span>
            </div>

            <div className='flex justify-between font-semibold'>
              <span>Thanh toán</span>
              <span>{order.finalPrice.toLocaleString()} đ</span>
            </div>

            <div className='flex justify-end'>
              {order.status === 'pending' ? (
                <Button onClick={() => navigate(`/payment-success/${order._id}`)}>xem chi tiết</Button>
              ) : (
                <Button onClick={() => navigate(`/payment-failed//${order._id}`)}>xem chi tiết</Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
