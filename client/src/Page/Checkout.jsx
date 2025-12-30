import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Truck, Wallet, CreditCard, ShoppingCart, Package, Tag, User } from 'lucide-react'
import { requestUpdateInfoCart } from '@/config/CartRequest'
import { requestPayment } from '@/config/paymentRequest'
import { useStore } from '@/hooks/useStore'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const paymentMethods = [
  {
    id: 'cod',
    name: 'Thanh toán khi nhận hàng (COD)',
    description: 'Thanh toán bằng tiền mặt khi nhận hàng',
    icon: Truck,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50'
  },
  {
    id: 'momo',
    name: 'Ví MoMo',
    description: 'Thanh toán qua ví điện tử MoMo',
    icon: Wallet,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50'
  },
  {
    id: 'vnpay',
    name: 'VNPay',
    description: 'Thanh toán qua cổng VNPay',
    icon: CreditCard,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  }
]

function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}

export default function Checkout() {
  const { cart1 } = useStore()
  const navigate = useNavigate()
  const [selectedPayment, setSelectedPayment] = useState('cod')
  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    address: ''
  })

  const discountAmount = cart1.cart?.totalPrice - cart1.cart?.finalPrice

  const handleCustomerInfoChange = (field, value) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }))
  }
  const handleCheckout = async () => {
    try {
      const data = {
        fullName: customerInfo.fullName,
        phoneNumber: customerInfo.phoneNumber,
        email: customerInfo.email,
        address: customerInfo.address
      }
      await requestUpdateInfoCart(data)
      const typePayment = selectedPayment
      if (selectedPayment === 'cod') {
        const res = await requestPayment({ typePayment: typePayment })
        toast.success('Đặt hàng thành công!')
        navigate(`/payment-success/${res.metadata._id}`)
      } else if (selectedPayment === 'momo') {
        const res = await requestPayment({ typePayment: typePayment })
        window.open(res.metadata.payUrl, '_blank')
      } else if (selectedPayment === 'vnpay') {
        const res = await requestPayment({ typePayment: typePayment })
        window.open(res.metadata, '_blank')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi đặt hàng')
    }
  }
  return (
    <div className='min-h-screen bg-muted/30 py-8'>
      <div className='container mx-auto px-4 max-w-6xl'>
        <div className='flex items-center gap-3 mb-8'>
          <ShoppingCart className='h-8 w-8 text-primary' />
          <h1 className='text-3xl font-bold'>Thanh toán đơn hàng</h1>
        </div>

        <div className='grid lg:grid-cols-3 gap-6'>
          {/* LEFT */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Thông tin nhận hàng */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <User className='h-5 w-5' />
                  Thông tin nhận hàng
                </CardTitle>
                <CardDescription>Vui lòng điền đầy đủ thông tin để nhận hàng</CardDescription>
              </CardHeader>

              <CardContent className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label>Họ và tên *</Label>
                  <Input
                    value={customerInfo.fullName}
                    onChange={(e) => handleCustomerInfoChange('fullName', e.target.value)}
                  />
                </div>

                <div className='space-y-2'>
                  <Label>Số điện thoại *</Label>
                  <Input
                    value={customerInfo.phoneNumber}
                    onChange={(e) => handleCustomerInfoChange('phoneNumber', e.target.value)}
                  />
                </div>

                <div className='space-y-2 sm:col-span-2'>
                  <Label>Email</Label>
                  <Input
                    type='email'
                    value={customerInfo.email}
                    onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
                  />
                </div>

                <div className='space-y-2 sm:col-span-2'>
                  <Label>Địa chỉ nhận hàng *</Label>
                  <Input
                    value={customerInfo.address}
                    onChange={(e) => handleCustomerInfoChange('address', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Phương thức thanh toán */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <CreditCard className='h-5 w-5' />
                  Phương thức thanh toán
                </CardTitle>
                <CardDescription>Chọn phương thức thanh toán phù hợp với bạn</CardDescription>
              </CardHeader>

              <CardContent>
                <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment} className='space-y-3'>
                  {paymentMethods.map((method) => {
                    const Icon = method.icon
                    return (
                      <Label
                        key={method.id}
                        className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer ${
                          selectedPayment === method.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <RadioGroupItem value={method.id} />
                        <div className={`p-2 rounded-lg ${method.bgColor}`}>
                          <Icon className={`h-6 w-6 ${method.color}`} />
                        </div>
                        <div>
                          <p className='font-medium'>{method.name}</p>
                          <p className='text-sm text-muted-foreground'>{method.description}</p>
                        </div>
                      </Label>
                    )
                  })}
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT */}
          <div className='space-y-6'>
            {/* Sản phẩm */}
            <Card>
              <CardHeader className='pb-3'>
                <CardTitle className='flex items-center gap-2 text-base'>
                  <Package className='h-5 w-5' />
                  Sản phẩm ({cart1.cart?.products.length})
                </CardTitle>
              </CardHeader>

              <CardContent className='space-y-4'>
                {cart1.cart?.products.map((item) => (
                  <div key={item._id} className='flex gap-3 p-3 rounded-lg border bg-card'>
                    <img
                      src={item.productId.imagesProduct[0]}
                      alt={item.productId.nameProduct}
                      className='w-16 h-20 rounded-md object-cover'
                    />

                    <div className='flex-1 space-y-1'>
                      <div className='flex justify-between'>
                        <h3 className='text-sm font-medium line-clamp-2'>{item.productId.nameProduct}</h3>
                        <Badge>-{item.productId.discountProduct}%</Badge>
                      </div>

                      <p className='text-xs text-muted-foreground'>{item.productId.descriptionProduct}</p>

                      <div className='flex justify-between'>
                        <span className='font-bold text-primary'>
                          {formatCurrency(item.productId.priceProduct * (1 - item.productId.discountProduct / 100))}
                        </span>
                        <span className='text-xs'>x{item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* \ kết */}
            <Card className='sticky top-8'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Tag className='h-5 w-5' />
                  Tổng kết đơn hàng
                </CardTitle>
              </CardHeader>

              <CardContent className='space-y-4'>
                <div className='flex justify-between text-sm'>
                  <span>Tạm tính</span>
                  <span>{formatCurrency(cart1.cart?.totalPrice)}</span>
                </div>

                <div className='flex justify-between text-sm text-emerald-600'>
                  <span>Giảm giá</span>
                  <span>-{formatCurrency(discountAmount)}</span>
                </div>

                <Separator />

                <div className='flex justify-between items-center'>
                  <span className='font-semibold'>Tổng thanh toán</span>
                  <span className='text-2xl font-bold text-primary'>
                    {formatCurrency(cart1.cart?.couponId ? cart1.cart?.finalPrice : cart1.cart?.totalPrice)}
                  </span>
                </div>

                <Button size='lg' className='w-full' onClick={handleCheckout}>
                  Đặt hàng ngay
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
