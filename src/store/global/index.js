import { createSlice } from '@reduxjs/toolkit';

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    loading: {
      flag: false,
      message: ''
    }
  },
  reducers: {
    setLoadingState: (state, action) => {
      const {flag, message} = action.payload;
      state = {
        ...state, 
        loading: {
          flag, message
        }};
      return state;
    },
  },
})

export const { setLoadingState } = globalSlice.actions

export default globalSlice.reducer