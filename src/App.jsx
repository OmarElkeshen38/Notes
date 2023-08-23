import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar';
import Register from './Components/Register';
import Home from './Components/Home';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Notfound from './Components/Notfound';

function App() {

  const [userData, setUserData] = useState(null);
  let navigate = useNavigate();

  function saveUserData() {
    let userToken = localStorage.getItem('userToken');
    setUserData(userToken);
  }

  function logout() {
    localStorage.removeItem('userToken');
    setUserData(null);
    navigate('./login');
  }

  useEffect(() => {
    if (localStorage.getItem('userToken') != null) {
      saveUserData();
    }
  }, []);

  function ProtectedRoute(props) {
    if (localStorage.getItem('userToken') === null) {
      return <Navigate to='/login' />
    } else {
      return props.children;
    }
  }

  return (
    <>
      <Navbar userData={userData} logout={logout} />
        <Routes>
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='notes/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/register' element={<Register />}/>
          <Route path='/login' element={<Login saveUserData={saveUserData} />}/>
          <Route path='*' element={<Notfound />}/>
        </Routes>
      <ToastContainer />
    </>
  )
}

export default App
