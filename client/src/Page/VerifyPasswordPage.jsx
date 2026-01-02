'use client'

import { useState } from 'react'
import { KeyRound, EyeIcon, EyeOffIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp'
import { requestVerifyPassword } from '@/config/UserRequest'

export default function VerifyPasswordPage() {
  const navigate = useNavigate()

  const [otp, setOtp] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const isOtpValid = otp.length === 6
  const isPasswordValid = password.length >= 6
  const isMatch = password === confirmPassword
  const isFormValid = isOtpValid && isPasswordValid && isMatch

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isFormValid) {
      toast.error('Thông tin không hợp lệ')
      return
    }

    try {
      setLoading(true)
      const res = await requestVerifyPassword({ otp, password })
      toast.success(res.message)
      setTimeout(() => {
        navigate('/login')
      }, 1000)
    } catch {
      toast.error('Xác thực OTP thất bại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex min-h-screen items-center justify-center px-4'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <KeyRound className='h-5 w-5' />
            Xác thực & đặt lại mật khẩu
          </CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            /* ===== Skeleton ===== */
            <div className='space-y-4'>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-10 w-full' />
            </div>
          ) : (
            /* ===== Form ===== */
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='space-y-2'>
                <Label>Mã OTP</Label>

                <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>

                  <InputOTPSeparator />

                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>

                {otp && otp.length < 6 && <p className='text-xs text-destructive'>Vui lòng nhập đủ 6 chữ số OTP</p>}
              </div>
              {/* Password */}
              <div className='space-y-1'>
                <Label>Mật khẩu mới</Label>
                <div className='relative'>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Nhập mật khẩu mới'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='pr-9'
                  />
                  <Button
                    type='button'
                    variant='ghost'
                    size='icon'
                    className='absolute inset-y-0 right-0'
                    onClick={() => setShowPassword((p) => !p)}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </Button>
                </div>
                {!isPasswordValid && password && <p className='text-xs text-destructive'>Mật khẩu tối thiểu 6 ký tự</p>}
              </div>

              {/* Confirm password */}
              <div className='space-y-1'>
                <Label>Xác nhận mật khẩu</Label>
                <Input
                  type='password'
                  placeholder='Nhập lại mật khẩu'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {confirmPassword && !isMatch && <p className='text-xs text-destructive'>Mật khẩu không khớp</p>}
              </div>

              <Button type='submit' className='w-full' disabled={!isFormValid}>
                Xác nhận & đổi mật khẩu
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
