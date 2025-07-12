// === INSTALL BEFORE RUNNING ===
// npm install @react-oauth/google axios react react-dom

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

// === API Calls ===
const googleAuthApi = {
  async login(accessToken) {
    const response = await axios.post('http://localhost:8000/api/auth/social/google/login/', {
      access_token: accessToken,
    });
    return response.data;
  },
  async signup(accessToken) {
    const response = await axios.post('http://localhost:8000/api/auth/social/google/login/', {
      access_token: accessToken,
    });
    return response.data;
  },
};

// === Google Sign In Button Component ===
const GoogleSignIn = () => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const data = await googleAuthApi.login(tokenResponse.access_token);
        console.log('✅ Sign In Success:', data);
        alert('Signed in!');
      } catch (err) {
        console.error('❌ Sign In Failed:', err.response?.data || err.message);
      }
    },
    onError: () => alert('Google sign-in failed'),
  });

  return (
    <div
      onClick={login}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #ccc',
        borderRadius: 5,
        padding: '10px 20px',
        cursor: 'pointer',
        width: 240,
        marginBottom: 20,
      }}
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google icon"
        style={{ width: 20, marginRight: 10 }}
      />
      Sign In with Google
    </div>
  );
};

// === Google Sign Up Button Component ===
const GoogleSignUp = () => {
  const signup = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const data = await googleAuthApi.signup(tokenResponse.access_token);
        console.log('✅ Sign Up Success:', data);
        alert('Signed up!');
      } catch (err) {
        console.error('❌ Sign Up Failed:', err.response?.data || err.message);
      }
    },
    onError: () => alert('Google sign-up failed'),
  });

  return (
    <div
      onClick={signup}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #ccc',
        borderRadius: 5,
        padding: '10px 20px',
        cursor: 'pointer',
        width: 240,
      }}
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google icon"
        style={{ width: 20, marginRight: 10 }}
      />
      Sign Up with Google
    </div>
  );
};

// === Main App Component ===
const App = () => {
  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 100,
          fontFamily: 'sans-serif',
        }}
      >
        <h2>React Google Auth Demo</h2>
        <GoogleSignIn />
        <GoogleSignUp />
      </div>
    </GoogleOAuthProvider>
  );
};

// === Mount React App ===
ReactDOM.render(<App />, document.getElementById('root'));
