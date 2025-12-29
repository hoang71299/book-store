'use client'

import { useState } from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const RegisterForm = ({ onRegister }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
  const navigate = useNavigate()
  const [data, setData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [passwordError, setPasswordError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      [name]: value
    }))

    if (name === 'confirmPassword' || name === 'password') {
      const newPassword = name === 'password' ? value : data.password
      const newConfirmPassword = name === 'confirmPassword' ? value : data.confirmPassword

      if (newConfirmPassword && newPassword !== newConfirmPassword) {
        setPasswordError('Mật khẩu không khớp')
      } else if (newConfirmPassword === newPassword && newConfirmPassword !== '') {
        setPasswordError('')
      }
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    if (data.password !== data.confirmPassword) {
      toast.error('Mật khẩu không khớp')
      return
    }
    await onRegister(data)
  }

  const isPasswordMatch = data.password && data.confirmPassword && data.password === data.confirmPassword
  const isFormValid = data.fullName && data.email && isPasswordMatch

  return (
    <form className='space-y-4' onSubmit={handleRegister}>
      {/* Full Name */}
      <div className='space-y-1'>
        <Label htmlFor='fullName'>Họ và tên</Label>
        <Input
          id='fullName'
          name='fullName'
          type='text'
          placeholder='Nhập họ và tên'
          value={data.fullName}
          onChange={handleChange}
          required
        />
      </div>

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
          required
        />
      </div>

      {/* Password */}
      <div className='space-y-1'>
        <Label htmlFor='password'>Mật khẩu</Label>
        <div className='relative'>
          <Input
            id='password'
            name='password'
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder='••••••••••'
            className='pr-9'
            value={data.password}
            onChange={handleChange}
            required
          />
          <Button
            type='button'
            variant='ghost'
            size='icon'
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            className='absolute inset-y-0 right-0'
          >
            {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
          </Button>
        </div>
      </div>

      {/* Confirm Password */}
      <div className='space-y-1'>
        <Label htmlFor='confirmPassword'>Xác nhận mật khẩu</Label>
        <div className='relative'>
          <Input
            id='confirmPassword'
            name='confirmPassword'
            type={isConfirmPasswordVisible ? 'text' : 'password'}
            placeholder='••••••••••'
            className={`pr-9 ${passwordError ? 'border-red-500' : ''}`}
            value={data.confirmPassword}
            onChange={handleChange}
            required
          />
          <Button
            type='button'
            variant='ghost'
            size='icon'
            onClick={() => setIsConfirmPasswordVisible((prev) => !prev)}
            className='absolute inset-y-0 right-0'
          >
            {isConfirmPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
          </Button>
        </div>
        {passwordError && <p className='text-xs text-red-500 mt-1'>{passwordError}</p>}
      </div>

      <Button className='w-full' type='submit' disabled={!isFormValid}>
        Đăng kí
      </Button>
    </form>
  )
}

export default RegisterForm
