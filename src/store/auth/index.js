import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
  },
  reducers: {
    updateToken: (state, action) => {
      state = {...state, token: action.payload};
      return state;
    },
  },
})

export const { updateToken } = authSlice.actions

export default authSlice.reducer