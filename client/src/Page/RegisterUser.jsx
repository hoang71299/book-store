import React from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

// import AuthBackgroundShape from '@/assets/svg/auth-background-shape'
import LoginForm from '@/components/LoginForm'
import { requestLogin, requestRegister } from '@/config/UserRequest'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import RegisterForm from '@/components/RegisterForm'
import { useStore } from '@/hooks/useStore'

const RegisterUser = () => {
  const navigate = useNavigate()
  const [dataRegister, setDataRegister] = React.useState({})

  const { dataUser } = useStore()
  if (dataUser) navigate('/')
  const handleRegister = async (data) => {
    try {
      const res = await requestRegister(data)

      setDataRegister(res)
      setTimeout(() => {
        navigate('/')
      }, 1000)
      toast.success(res.message)
    } catch (err) {
      toast.error(err.response.data.message)
    }
  }
  return (
    <div className='relative flex h-auto min-h-screen items-center justify-center overflow-x-hidden px-4 py-10 sm:px-6 lg:px-8'>
      {/* <div className='absolute'>
        <AuthBackgroundShape />
      </div> */}

      <Card className='z-1 w-full border-none shadow-md sm:max-w-lg'>
        <CardHeader className='gap-6'>
          <span className='text-xl font-bold hidden sm:inline'>L2Shop</span>

          <div>
            <CardTitle className='mb-1.5 text-2xl'>Đăng ký vào cửa hàng sách</CardTitle>
            <CardDescription className='text-base'> Mua sắm sách dễ dàng – Tri thức trong tầm tay.</CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          {/* Login Form */}
          <div className='space-y-4'>
            <RegisterForm onRegister={handleRegister} />
            <p className='text-muted-foreground text-center'>
              Đã có tài khoản ?{' '}
              <Link to={'/login'} className='text-card-foreground hover:underline'>
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default RegisterUser
