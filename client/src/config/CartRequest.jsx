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
export const requestUpdateCart = async (data) => {
  const res = await apiClient.put(`${apiCart}/update`, data)
  return res.data
}
export const requestDeleteCart = async (id) => {
  const res = await apiClient.delete(`${apiCart}/delete/${id}`)
  return res.data
}
