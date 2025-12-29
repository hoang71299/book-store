import request from './request'

import { apiClient } from './axiosClient'

const apiCounpon = '/api/cart'

export const applyCoupon = async (data) => {
  const res = await apiClient.put(`${apiCounpon}/apply-coupon`, data)
  return res.data
}
