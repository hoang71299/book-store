import MainLayout from '../layout/MainLayout'
import App from '../App'
import DetailProduct from '../Page/DetailProduct'
import { createBrowserRouter } from 'react-router-dom'
import AuthenticationLayout from '@/layout/AuthenticationLayout'
import LoginUser from '../Page/LoginUser'
import RegisterUser from '@/Page/RegisterUser'
import CartUser from '../Page/CartUser'
const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <App />
      },
      {
        path: 'product/:id',
        element: <DetailProduct />
      },
      {
        path: '/cart',
        element: <CartUser />
      }
    ]
  },
  {
    element: <AuthenticationLayout />,
    children: [
      {
        path: '/login',
        element: <LoginUser />
      },
      {
        path: '/register',
        element: <RegisterUser />
      }
    ]
  }
])

export default router
