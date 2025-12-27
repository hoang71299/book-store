import React from 'react'
import logo from '../assets/logo.svg'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Search } from 'lucide-react'

export default function Header() {
  return (
    <header className='w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-6 py-4'>
        <div className='flex flex-row items-center justify-between gap-8'>
          {/* Logo Section */}
          <div className='flex items-center gap-3 flex-shrink-0'>
            <div className='h-12 w-12 rounded-lg flex items-center justify-center'>
              <img src={logo} alt='Logo' className='h-12 w-12' />
            </div>
            <span className='text-xl font-bold text-gray-900'>L2Shop</span>
          </div>

          {/* Search Bar */}
          <div className='flex-1 max-w-md'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
              <Input
                placeholder='Tìm kiếm sản phẩm...'
                className='w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm'
              />
            </div>
          </div>

          {/* Auth Buttons */}
          <div className='flex gap-2 flex-shrink-0'>
            <Button variant='ghost'>Đăng nhập</Button>
            <Button>Đăng ký</Button>
          </div>
        </div>
      </div>
    </header>
  )
}
