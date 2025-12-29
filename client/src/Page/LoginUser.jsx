import React from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

// import AuthBackgroundShape from '@/assets/svg/auth-background-shape'
import LoginForm from '@/components/LoginForm'
import { requestLogin } from '@/config/UserRequest'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '@/hooks/useStore'

const LoginUser = () => {
  const navigate = useNavigate()
  const [dataLogin, setDataLogin] = React.useState({})
  const { dataUser } = useStore()
  if (dataUser) navigate('/')
  const handleLogin = async (data) => {
    try {
      const res = await requestLogin(data)

      setDataLogin(res)
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
            <CardTitle className='mb-1.5 text-2xl'>Đăng nhập vào cửa hàng sách</CardTitle>
            <CardDescription className='text-base'> Mua sắm sách dễ dàng – Tri thức trong tầm tay.</CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          {/* Login Form */}
          <div className='space-y-4'>
            <LoginForm onLogin={handleLogin} dataLogin={dataLogin} />
            <p className='text-muted-foreground text-center'>
              Chưa có tài khoản ?{' '}
              <Link to='/register' className='text-card-foreground hover:underline'>
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginUser
