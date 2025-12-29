import Header from '@/components/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/theme-provider'
export default function MainLayout() {
  return (
    <>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <div>
          <header>
            <Header />
          </header>
          <main>
            <Outlet />
            <Toaster position='top-right' richColors />
          </main>
        </div>
      </ThemeProvider>
    </>
  )
}
