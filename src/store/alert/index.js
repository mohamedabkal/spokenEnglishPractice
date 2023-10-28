import { createSlice } from '@reduxjs/toolkit';
import 'react-native-get-random-values';
import uuid from 'react-native-uuid';


const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    data: []
  },
  reducers: {
    pushAlert: (state, action) => {
      const uid = uuid.v4();
      state.data.push({uid, ...action.payload});
    },
    takeAlert: (state, action) => {
      state.data = state.data.filter(item => {
        return item.uid != action.payload;
      })
    },
    clearAlert: (state, action) => {
      state.data = [];
    }
  },
})

export const { pushAlert, takeAlert, clearAlert } = alertSlice.actions

export default alertSlice.reducer