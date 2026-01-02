'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { User, Mail } from 'lucide-react'
import { useStore } from '@/hooks/useStore'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateUser } from '@/config/UserRequest'
import { toast } from 'sonner'

export default function UpdateProfilePage() {
  const navigate = useNavigate()
  const { dataUser, setDataUser } = useStore()
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    isAdmin: ''
  })
  useEffect(() => {
    if (dataUser) {
      setUser(dataUser)
    }
  }, [dataUser])
  // console.log(user)
  const handleChange = (event) => {
    setUser((prevUser) => ({
      ...prevUser,
      [event.target.name]: event.target.value
    }))
  }
  const handleUpdate = async () => {
    const res = await updateUser(dataUser._id, user)
    toast.success(res.message)
    setTimeout(() => {
      window.location.reload()
    }, 500)
  }
  return (
    <div className='mx-auto max-w-2xl space-y-6 p-6 pt-30'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold'>Cập nhật hồ sơ</h1>
        <Badge variant='secondary'>{user?.isAdmin ? 'ADMIN' : 'USER'}</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin cá nhân</CardTitle>
        </CardHeader>

        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <Label className='flex items-center gap-2'>
              <User className='h-4 w-4' />
              Họ tên
            </Label>
            <Input name='fullName' defaultValue={user?.fullName} placeholder='Nhập họ tên' onChange={handleChange} />
          </div>

          <div className='space-y-2'>
            <Label className='flex items-center gap-2'>
              <Mail className='h-4 w-4' />
              Email
            </Label>
            <Input name='email' defaultValue={user?.email} disabled />
          </div>

          <div className='flex justify-end gap-3 pt-4'>
            <Button variant='outline' onClick={() => navigate('/profile')}>
              Quay lại
            </Button>
            <Button onClick={handleUpdate}>Cập nhật</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
