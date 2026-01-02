'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Lock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { changePassword } from '@/config/UserRequest'

export default function ChangePasswordPage() {
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const isMatch = password === confirmPassword
  const isValid = password.length >= 6 && isMatch

  const handleSubmit = async () => {
    if (!isValid) {
      toast.error('Mật khẩu không hợp lệ hoặc không khớp')
      return
    }

    try {
      setLoading(true)
      // giả lập call API
      const res = await changePassword({ newPassword: password })
      toast.success(res.message)
      setTimeout(() => {
        navigate('/verify-forgot-password')
      }, 1000)
    } catch {
      toast.error('Đổi mật khẩu thất bại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='mx-auto max-w-xl space-y-6 p-6 pt-30'>
      <h1 className='text-2xl font-semibold'>Đổi mật khẩu</h1>

      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Lock className='h-5 w-5' />
            Thông tin mật khẩu
          </CardTitle>
        </CardHeader>

        <CardContent className='space-y-4'>
          {loading ? (
            /* ===== Skeleton ===== */
            <>
              <div className='space-y-2'>
                <Skeleton className='h-4 w-32' />
                <Skeleton className='h-10 w-full' />
              </div>

              <div className='space-y-2'>
                <Skeleton className='h-4 w-48' />
                <Skeleton className='h-10 w-full' />
              </div>

              <div className='flex justify-end gap-3 pt-4'>
                <Skeleton className='h-10 w-24' />
                <Skeleton className='h-10 w-32' />
              </div>
            </>
          ) : (
            /* ===== Form ===== */
            <>
              <div className='space-y-2'>
                <Label>Mật khẩu mới</Label>
                <Input
                  type='password'
                  placeholder='Nhập mật khẩu mới'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {password && password.length < 3 && <p className='text-sm text-red-500'>Mật khẩu tối thiểu 3 ký tự</p>}
              </div>

              <div className='space-y-2'>
                <Label>Xác nhận mật khẩu mới</Label>
                <Input
                  type='password'
                  placeholder='Nhập lại mật khẩu mới'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {confirmPassword && !isMatch && <p className='text-sm text-red-500'>Mật khẩu không khớp</p>}
              </div>

              <div className='flex justify-end gap-3 pt-4'>
                <Button variant='outline' onClick={() => navigate('/profile')}>
                  Quay lại
                </Button>
                <Button onClick={handleSubmit} disabled={!isValid}>
                  Đổi mật khẩu
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
