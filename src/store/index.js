// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import profile from './profile'
import auth from './auth'
import global from './global'
import alert from './alert'

export const store = configureStore({
  reducer: {
    global,
    alert,
    profile,
    auth
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

