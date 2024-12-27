// Archivo que maneja el estado global de UI

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  user: any | null
  token: string | null
  isAuthenticated: boolean
}

const loadAuthState = (): AuthState => {
  try {
    const serializedAuth = localStorage.getItem('auth')
    if (serializedAuth === null) {
      return { user: null, token: null, isAuthenticated: false }
    }
    return JSON.parse(serializedAuth)
  } catch (error) {
    return { user: null, token: null, isAuthenticated: false }
  }
}

// Guardamos la sesion
const saveAuthState = (state: any) => {
  try {
    const serializeAuth = JSON.stringify(state)
    localStorage.setItem('auth', serializeAuth)
  } catch (error) {
    return undefined
  }
}

// Inicializamos el state con loadAuthState
const initialState = loadAuthState() || {
  user: null,
  token: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: any; token: string }>) => {
      const { user } = action.payload // Asumiendo que 'user' es el campo que necesitas
      state.user = user
      state.token = user.token
      state.isAuthenticated = true
      saveAuthState(state)
    },
    logout: state => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('auth') // Removemos la sesión, cuando cerramos sesión
    },
  },
})
 
export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer