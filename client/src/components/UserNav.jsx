'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { User, Settings, LogOut, CreditCard, HelpCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function UserNav({ user, onLogout }) {
  const navigate = useNavigate()
  // Lấy chữ cái đầu của tên để hiển thị fallback
  const getInitials = (name) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button className='relative h-9 w-auto rounded-full px-3'>
          {user.fullName ? user.fullName : 'Người dùng'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'> {user.fullName ? user.fullName : 'Người dùng'}</p>
            <p className='text-xs leading-none text-muted-foreground'>{user.email || 'email@example.com'}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate('/profile')}>
            <User className='mr-2 h-4 w-4' />
            <span>Thông tin cá nhân</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/my-order')}>
            <CreditCard className='mr-2 h-4 w-4' />
            <span>Đơn hàng của tôi</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout} className='text-destructive focus:text-destructive'>
          <LogOut className='mr-2 h-4 w-4' />
          <span>Đăng xuất</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
