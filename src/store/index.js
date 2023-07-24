import { configureStore } from '@reduxjs/toolkit'
import Signup from './SignUp'
import User from './User'

export const store = configureStore({
  reducer: {
    signup: Signup,
    user:User,
  },
})