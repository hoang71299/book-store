import { useContext } from 'react'

import Context from '../store/Context.jsx'
export const useStore = () => {
  const context = useContext(Context)
  return context
}
