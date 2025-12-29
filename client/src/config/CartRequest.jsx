import request from './request'

import { apiClient } from './axiosClient'

const apiCart = '/api/cart'

export const requestAddToCart = async (data) => {
  const res = await apiClient.post(`${apiCart}/create`, data)
  return res.data
}
export const requestGetCart = async () => {
  const res = await apiClient.get(`${apiCart}/get`)
  return res.data
}
