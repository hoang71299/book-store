'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react'
import { ModeToggle } from './mode-toggle'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '@/hooks/useStore'
import { UserNav } from './UserNav'
import { requestLogout } from '@/config/UserRequest'
import { toast } from 'sonner'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { dataUser } = useStore()
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      const res = await requestLogout()
      setTimeout(() => {
        navigate('/login')
      }, 1000)
      toast.success(res.message)
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }
  return (
    <header className='w-full bg-background border-b border-border fixed top-0 left-0 z-50'>
      {/* Top Bar */}
      <div className='w-full bg-foreground/5 px-6 py-2 text-xs text-muted-foreground hidden sm:block'>
        <div className='max-w-7xl mx-auto flex justify-between items-center'>
          <span>Miễn phí vận chuyển cho đơn hàng trên 50.000đ</span>
          <span>Hỗ trợ khách hàng 24/7</span>
        </div>
      </div>

      {/* Main Header */}
      <div className='max-w-7xl mx-auto px-6 py-4'>
        <div className='flex items-center justify-between gap-4'>
          {/* Logo */}
          <Link to='/'>
            <div className='flex items-center gap-2 flex-shrink-0'>
              <div className='h-10 w-10 rounded-lg bg-primary flex items-center justify-center'>
                <span className='text-primary-foreground font-bold text-lg'>L2</span>
              </div>
              <span className='text-xl font-bold hidden sm:inline'>L2Shop</span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className='flex-1 max-w-md hidden sm:block'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
              <Input
                placeholder='Tìm kiếm...'
                className='w-full pl-10 pr-4 py-2 rounded-full bg-muted border-0 focus:ring-2 focus:ring-primary/20 text-sm'
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className='flex items-center gap-2 flex-shrink-0'>
            <ModeToggle />

            <Button variant='ghost' size='icon' className='relative cursor-pointer'>
              <ShoppingCart className='h-5 w-5' />
              <span className='absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold'>
                0
              </span>
            </Button>

            <Button variant='ghost' size='icon' className='hidden sm:flex'>
              <User className='h-5 w-5' />
            </Button>

            {/* Login and Signup Buttons */}
            {dataUser && dataUser?._id ? (
              <UserNav user={dataUser} onLogout={handleLogout} />
            ) : (
              <div className='hidden sm:flex gap-2'>
                <Link to='/login'>
                  <Button variant='outline' size='sm'>
                    Đăng nhập
                  </Button>
                </Link>
                <Button size='sm'>Đăng ký</Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button variant='ghost' size='icon' className='lg:hidden' onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className='sm:hidden px-6 pb-4'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
          <Input
            placeholder='Tìm kiếm...'
            className='w-full pl-10 pr-4 py-2 rounded-full bg-muted border-0 focus:ring-2 focus:ring-primary/20 text-sm'
          />
        </div>
      </div>
    </header>
  )
}
