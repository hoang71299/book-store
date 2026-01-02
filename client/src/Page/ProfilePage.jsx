'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { User, Mail, ShieldCheck, Calendar } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '@/hooks/useStore'
import { useEffect, useState } from 'react'

export default function ProfilePage() {
  const navigate = useNavigate()
  const { dataUser } = useStore()
  const [user, setUser] = useState()
  useEffect(() => {
    dataUser && setUser(dataUser)
  }, [dataUser])
  console.log(user)

  const roleClass = user?.isAdmin
    ? 'bg-green-100 text-green-800 border border-green-300'
    : 'bg-blue-100 text-blue-800 border border-blue-300'

  return (
    <div className='mx-auto max-w-3xl space-y-6 p-6 pt-30'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold'>Hồ sơ cá nhân</h1>
        <Badge className={roleClass}>{user?.isAdmin ? 'ADMIN' : 'USER'}</Badge>
      </div>

      {/* Thông tin cơ bản */}
      <Card>
        <CardHeader>
          <CardTitle>Thông tin tài khoản</CardTitle>
        </CardHeader>

        <CardContent className='space-y-4 text-sm'>
          <div className='flex items-center gap-3'>
            <User className='h-4 w-4 text-muted-foreground' />
            <span className='w-32 text-muted-foreground'>Họ tên</span>
            <span className='font-medium'>{user?.fullName}</span>
          </div>

          <div className='flex items-center gap-3'>
            <Mail className='h-4 w-4 text-muted-foreground' />
            <span className='w-32 text-muted-foreground'>Email</span>
            <span className='font-medium'>{user?.email}</span>
          </div>

          <div className='flex items-center gap-3'>
            <ShieldCheck className='h-4 w-4 text-muted-foreground' />
            <span className='w-32 text-muted-foreground'>Quyền</span>
            <span className='font-medium'>{user?.isAdmin ? 'Quản trị viên' : 'Người dùng'}</span>
          </div>

          <Separator />

          <div className='flex items-center gap-3'>
            <Calendar className='h-4 w-4 text-muted-foreground' />
            <span className='w-32 text-muted-foreground'>Ngày tạo</span>
            <span>{new Date(user?.createdAt).toLocaleDateString()}</span>
          </div>
        </CardContent>
      </Card>

      {/* Action */}
      <div className='flex justify-end gap-3'>
        <Button variant='outline' onClick={() => navigate('/profile/change-password')}>
          Đổi mật khẩu
        </Button>

        <Button onClick={() => navigate('/profile/update')}>Cập nhật hồ sơ</Button>
      </div>
    </div>
  )
}
