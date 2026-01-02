'use client'

import { useState } from 'react'
import { Mail } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { forgotPassword } from '@/config/UserRequest'

export default function ForgotPasswordPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const isValidEmail = /\S+@\S+\.\S+/.test(email)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isValidEmail) {
      toast.error('Email không hợp lệ')
      return
    }

    try {
      setLoading(true)
      // TODO: call API forgot password
      const res = await forgotPassword({ email })
      toast.success(res.message)
      setTimeout(() => {
        navigate('/verify-forgot-password')
      }, 500)
    } catch {
      toast.error('Gửi email thất bại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex min-h-screen items-center justify-center px-4'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Mail className='h-5 w-5' />
            Quên mật khẩu
          </CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            /* Skeleton */
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-10 w-full' />
              </div>
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-4 w-32 mx-auto' />
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='space-y-3'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='Nhập email đã đăng ký'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {!isValidEmail && email && <p className='text-xs text-destructive'>Email không hợp lệ</p>}
              </div>

              <Button type='submit' className='w-full' disabled={!isValidEmail}>
                Gửi link đặt lại mật khẩu
              </Button>

              <Button
                type='button'
                variant='ghost'
                className='w-full text-muted-foreground'
                onClick={() => navigate('/login')}
              >
                Quay lại đăng nhập
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
