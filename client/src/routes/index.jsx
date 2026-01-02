import MainLayout from '../layout/MainLayout'
import App from '../App'
import DetailProduct from '../Page/DetailProduct'
import { createBrowserRouter } from 'react-router-dom'
import AuthenticationLayout from '@/layout/AuthenticationLayout'
import LoginUser from '../Page/LoginUser'
import RegisterUser from '@/Page/RegisterUser'
import CartUser from '../Page/CartUser'
import Checkout from '@/Page/Checkout'
import PaymentSuccess from '../Page/PaymentSuccess'
import PaymentFailed from '@/Page/PaymentFailed'
import MyOrderPage from '@/Page/MyOrderPage'
import ProfilePage from '@/Page/ProfilePage'
import ChangePasswordPage from '@/Page/ChangePasswordPage'
import UpdateProfilePage from '@/Page/UpdateProfilePage'
import ForgotPasswordPage from '@/Page/ForgotPasswordPage'
import VerifyPasswordPage from '@/Page/VerifyPasswordPage'
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
      },
      {
        path: '/checkout',
        element: <Checkout />
      },
      {
        path: '/payment-success/:orderId',
        element: <PaymentSuccess />
      },
      {
        path: '/payment-failed/:id',
        element: <PaymentFailed />
      },
      {
        path: '/my-order',
        element: <MyOrderPage />
      },
      {
        path: '/profile',
        element: <ProfilePage />
      },
      {
        path: '/profile/change-password',
        element: <ChangePasswordPage />
      },
      {
        path: '/profile/update',
        element: <UpdateProfilePage />
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
      },
      {
        path: '/forgot-password',
        element: <ForgotPasswordPage />
      },
      {
        path: '/verify-forgot-password',
        element: <VerifyPasswordPage />
      }
    ]
  }
])

export default router
