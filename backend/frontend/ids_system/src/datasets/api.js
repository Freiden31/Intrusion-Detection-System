import axios from 'axios';

// no.01
// send token to backend 
export const loginWithGoogle = async (credential) => {
  return await axios.post('http://127.0.0.1:8000/google/login/', { 
      access_token: credential 
    }
  );
};


// no.02
// send login data to backend
export const loginAccount = async (username, password) =>{
  const response =  await axios.post('http://127.0.0.1:8000/login/', {
      username,
      password,
  });
  return response.data;
};


// no.03
// send register data to backend
export const registerAccount = async (first_name, last_name, email, username, password, confirm_password) => {
  const response = await axios.post('http://127.0.0.1:8000/register/', {
    first_name,
    last_name,
    email,
    username,
    password,
    confirm_password,
  }, 
    {
    headers: {
    'Content-Type': 'application/json',
  }
  })
  return response.data;
};

// no.04
// send reset request data to backend
export const resetPasswordRequest = async (email) =>{
  const response =  await axios.post('http://127.0.0.1:8000/password-reset/', {
      email,
  });
  return response.data;
};

// no.05
// confirm new password
export const newPassword = async (password, confirm_password) => {
  const response = await axios.post('', {
    password,
    confirm_password
  });
  return response.data;
};

// no.06
// send server credentials in the backend
export const serServer = async (hostname, username, password) => {
  const response = await axios.post('', {
    hostname,
    username,
    password
  });
  return response.data;
};