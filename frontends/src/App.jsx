import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router'
import axios from 'axios'

import RegisterBuyer from './pages/auth/RegisterBuyer'
import LoginBuyer from './pages/auth/LoginBuyer'
import RegisterSeller from './pages/auth/RegisterSeller'

import HomePage from './pages/buyer/HomePage'

import MainPage from './pages/seller/MainPage'
import SellerProductsPage from './pages/seller/Products'

function App() {
  const apiUrl = import.meta.env.VITE_API_URL
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [currentUserType, setCurrentUserType] = useState(null)

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/get-current-user`, {
        method: "GET",
        credentials: "include"
      });

      if (!response.ok) {
        console.log("No user session found");
        return;
      }

      const data = await response.json();
      setCurrentUser(data.user);
      setCurrentUserType(data.type);
      setIsLoggedIn(data.isLoggedIn)
    } catch (error) {
      console.error("Error fetching current user", error);
    }
  };

  const initialiseApp = async () => {
    await fetchCurrentUser()
  }

  useEffect(() => {
    initialiseApp()
  }, [apiUrl])

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
        { !isLoggedIn ? (
            <>
              <Route path="/user/register" element={<RegisterBuyer fetchCurrentUser={fetchCurrentUser}/>} />
              <Route path="/seller/register" element={<RegisterSeller fetchCurrentUser={fetchCurrentUser}/>} />
              <Route path="/user/login" element={<LoginBuyer fetchCurrentUser={fetchCurrentUser} />} />
            </>
          ) : (
            <>
              <Route path="/seller/dashboard" element={<MainPage isLoggedIn={isLoggedIn} />} />
              <Route path="/seller/products" element={<SellerProductsPage isLoggedIn={isLoggedIn} />} />
            </>
          )}
      </Routes>
    </>
  )
}

export default App
