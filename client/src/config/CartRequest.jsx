import request from './request'

import { apiClient } from './axiosClient'

const apiCart = '/api/cart'

export const requestAddToCart = async (data) => {
  const res = await apiClient.post(`${apiCart}/create`, data)
  return res.data
}
