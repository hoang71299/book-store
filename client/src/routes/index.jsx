import DetailProduct from '@/pages/DetailProduct'
import App from '../App'
const routes = [
  {
    path: '/',
    component: <App />
  },
  {
    path: 'product/:id',
    component: <DetailProduct />
  }
]

export default routes
