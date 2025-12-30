'use client'

import { useState } from 'react'
import { Tag, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { toast } from 'sonner'
export default function CouponSection({ coupons, onSelectCoupon, selectedCoupon, cartTotal }) {
  const [couponCode, setCouponCode] = useState('')

  const handleApplyCoupon = () => {
    const found = coupons.find((c) => c.nameCoupon === couponCode)
    if (!found) {
      toast.error('Mã giảm giá không tồn tại. Vui lý nhập lại.')
    }
    if (found.minPrice) {
      onSelectCoupon(found)
    }
  }

  return (
    <div className='space-y-4'>
      <div className='flex gap-2'>
        <Input
          placeholder='Nhập mã giảm giá'
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className='flex-1'
        />
        <Button onClick={handleApplyCoupon} variant='secondary'>
          Áp dụng
        </Button>
      </div>

      <div className='space-y-2'>
        <p className='text-sm font-medium text-muted-foreground'>Mã giảm giá có sẵn:</p>

        <ScrollArea className='h-48'>
          <div className='space-y-2 pr-4'>
            {coupons &&
              coupons.map((coupon) => {
                const isEligible = cartTotal >= coupon.minPrice
                const isSelected = selectedCoupon?._id === coupon._id

                return (
                  <div
                    key={coupon._id}
                    className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors ${
                      isSelected
                        ? 'border-primary bg-primary/5'
                        : isEligible
                        ? 'border-border hover:border-primary/50'
                        : 'border-border opacity-50'
                    }`}
                    onClick={() => isEligible && onSelectCoupon(isSelected ? null : coupon)}
                  >
                    <div className='flex items-center gap-3'>
                      <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10'>
                        <Tag className='h-5 w-5 text-primary' />
                      </div>
                      <div>
                        <div className='flex items-center gap-2'>
                          <span className='font-semibold'>{coupon.nameCoupon}</span>
                          <Badge variant='secondary'>-{coupon.discount}%</Badge>
                        </div>
                        <p className='text-xs text-muted-foreground'>
                          Đơn tối thiểu {coupon.minPrice.toLocaleString('vi-VN')}đ
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <div className='flex h-6 w-6 items-center justify-center rounded-full bg-primary'>
                        <Check className='h-4 w-4 text-primary-foreground' />
                      </div>
                    )}
                  </div>
                )
              })}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
