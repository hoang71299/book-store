import { useState } from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({ onLogin, dataLogin }) => {
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    await onLogin(data)
  }

  return (
    <form className='space-y-4' onSubmit={handleLogin}>
      {/* Email */}
      <div className='space-y-1'>
        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          name='email'
          type='email'
          placeholder='Nhập email'
          value={data.email}
          onChange={handleChange}
        />
      </div>

      {/* Password */}
      <div className='space-y-1'>
        <Label htmlFor='password'>Mật khẩu</Label>
        <div className='relative'>
          <Input
            id='password'
            name='password'
            type={isVisible ? 'text' : 'password'}
            placeholder='••••••••••'
            className='pr-9'
            value={data.password}
            onChange={handleChange}
          />
          <Button
            type='button'
            variant='ghost'
            size='icon'
            onClick={() => setIsVisible((prev) => !prev)}
            className='absolute inset-y-0 right-0'
          >
            {isVisible ? <EyeOffIcon /> : <EyeIcon />}
          </Button>
        </div>
      </div>
      <div className='flex justify-end'>
        <button
          type='button'
          onClick={() => navigate('/forgot-password')}
          className='text-sm text-primary hover:underline'
        >
          Quên mật khẩu?
        </button>
      </div>
      <Button className='w-full' type='submit'>
        Đăng nhập
      </Button>
    </form>
  )
}

export default LoginForm
