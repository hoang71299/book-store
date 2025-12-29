import React from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/theme-provider'

export default function AuthenticationLayout() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <div>
        <Outlet />
        <Toaster richColors />
      </div>
    </ThemeProvider>
  )
}
