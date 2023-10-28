import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    mobile_number: '',
    university_institution_name: '',
    undergraduate_admission_year:  (new Date()).getFullYear(),
    graduation_year:  (new Date()).getFullYear(),
    department: '',
    height: 170,
    weight: 80,
    
    home_address: '',
    office_address: '',
    selfie_photo: '',
    face_video: '',
    body_video: '',
    private_key: '',
    public_key: ''
    
  },
  reducers: {
    updateProfile: (state, action) => {
      state = {...state, ...action.payload};
      return state;
    },
  },
})

export const { updateProfile } = profileSlice.actions

export default profileSlice.reducer