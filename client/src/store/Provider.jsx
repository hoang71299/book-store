import Context from './Context'
import { requestAuth } from '../config/UserRequest'

import cookie from 'js-cookie'
import { useEffect, useState } from 'react'
import { requestGetCart } from '@/config/CartRequest'
import { listProduct } from '@/config/ProductRequest'

export function Provider({ children }) {
  const [dataUser, setDataUser] = useState(null)
  const [cart1, setCart1] = useState({})
  const [dataProduct, setDataProduct] = useState([])

  const logged = cookie.get('logged')

  const fetchAuth = async () => {
    const res = await requestAuth()
    setDataUser(res.metadata)
  }
  const getCart = async () => {
    const res = await requestGetCart()
    setCart1(res.metadata)
  }
  const fetchProduct = async () => {
    try {
      const res = await listProduct()
      setDataProduct(res?.metadata || [])
    } catch (error) {
      console.error('Fetch product error:', error)
    }
  }
  useEffect(() => {
    if (logged) {
      fetchAuth()
      getCart()
      fetchProduct()
    }
  }, [logged])

  return (
    <Context.Provider value={{ dataUser, cart1, getCart, fetchProduct, dataProduct, setDataProduct }}>
      {children}
    </Context.Provider>
  )
}
