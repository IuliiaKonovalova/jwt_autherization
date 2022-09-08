import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_URL } from 'config'


const initialState = { 
  isAuthenticated: false,
  user: null,
  loading: false,
  registered: false,
}

const register = createAsyncThunk('users/register', async({first_name, last_name, email, password}, thunkAPI) => {
  const body = JSON.stringify({ first_name, last_name, email, password })

  try {
    const res = await fetch(`${API_URL}/api/users/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    })

    const data = await res.json()

    if (res.status === 201) {
      return data;
    } else {
      return thunkAPI.rejectWithValue(data)
    }
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data)
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetRegistered: (state) => {
      state.registered = false
    }
  },
  
})

export const { resetRegistered } = userSlice.actions
export default userSlice.reducer