import { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import NewPassword from './pages/NewPassword';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Account from './pages/Account';
import Alert from './pages/Alert';
import Server from './pages/Server';
import Monitor from './pages/Monitor';
import Report from './pages/Report';

function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/confirm" element={<NewPassword />} />

        {/* Home */}
        <Route path="/" element={<Home />} />
        <Route path="/server" element={<Server />} />
        <Route path="/account" element={<Account />} />
        <Route path="/settings" element={<Settings />} />

        {/* Monitor Dashboard */}
        <Route path="/monitor" element={<Monitor />} />
        <Route path="/alert" element={<Alert />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </Router>
  );
}

export default App;
