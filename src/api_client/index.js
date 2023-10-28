import { store } from '../store';
import URL from './url';

const getAuthToken = () => {
  return store.getState().auth.token;
}

const login = async ({email, password, device_id, public_key}) => {
  return await fetch(URL.LOGIN, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },body: JSON.stringify({
      email, password, device_id, public_key
    })}).then(async (response) => {
      try {
        data = await response.json();
        if(response.status == 200)
          return {data: data.data}
        return {error: data.msg ?? ''}
      } catch(error) {
        return {error: 'Server Error'}
      }
    })
    .catch(error => {
      console.log('Login Error')
      return {error}
    })
}

const login_with_fingerprint = async ({signed_data, device_id}) => {
  return await fetch(URL.LOGIN, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },body: JSON.stringify({
      signed_data, device_id
    })}).then(async (response) => {
      try {
        data = await response.json();
        if(response.status == 200)
          return {data: data.data}
        return {error: data.msg ?? ''}
      } catch(error) {
        return {error: 'Server Error'}
      }
    })
    .catch(error => {
      console.log('Login Error')
      return {error}
    })
}

const register = async ({
  email, password, first_name, last_name, university_name, undergraduate_admission_year,
  grduation_year, department, height, weight, selfie_photo, home_address, office_address, device_id, public_key
}) => {
  console.log("start register")

  const formData = new FormData();
  console.log(selfie_photo)
  formData.append('selfie_photo', {
    uri: selfie_photo,
    type: 'image/png', // Adjust the file type accordingly
    name: 'SELFIE_PHOTO.png', // Provide a suitable name for the file
  });

  formData.append("email", email);
  formData.append("password", password);
  formData.append("first_name", first_name);
  formData.append("last_name", last_name);
  formData.append("university_name", university_name);
  formData.append("undergraduate_admission_year", undergraduate_admission_year);
  formData.append("grduation_year", grduation_year);
  formData.append("department", department);
  formData.append("height", height);
  formData.append("weight", weight);
  formData.append("home_address", home_address);
  formData.append("office_address", office_address);
  formData.append("device_id", device_id);
  formData.append("public_key", public_key);

  console.log(formData);
  const response = await fetch(URL.REGISTER, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    }, body: formData}).then(async response => {
      try {
        data = await response.json();
        if(response.status == 200)
          return {data: data.data}
        return {error: data.msg ?? ''}
      } catch(error) {
        return {error: 'Server Error'}
      }
    }).catch(error => {
      console.log('Register Error')
      return {error}
    })
  return response;
}

const upload_media = async ({
  file, type
}) => {
  console.log("start upload media")

  const formData = new FormData();
  formData.append('file', {
    uri: file,
    type: 'image/png',
    name: 'resume.png',
  });
  console.log(formData);
  formData.append("type", type);
  const response = await fetch(URL.UPLOAD_PROFILE, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${getAuthToken()}` 
    }, body: formData}).then(response => {
      console.log(response.status);
      return response.json()
    }).catch(error => {
      console.error("upload", error)
    })
  return response;
}

export default {
  login,
  login_with_fingerprint,
  register,
  upload_media
}
