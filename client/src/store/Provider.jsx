import Context from './Context'
import { requestAuth } from '../config/UserRequest'

import cookie from 'js-cookie'
import { useEffect, useState } from 'react'

export function Provider({ children }) {
  const [dataUser, setDataUser] = useState(null)

  const logged = cookie.get('logged')

  const fetchAuth = async () => {
    const res = await requestAuth()
    setDataUser(res.metadata)
  }

  useEffect(() => {
    if (logged) {
      fetchAuth()
    }
  }, [logged])

  return <Context.Provider value={{ dataUser }}>{children}</Context.Provider>
}
