import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './Home'
import Auth from './Auth'

import PrivateRoute from '../contexts/PrivateRoutes'
import { useAuthContext } from '../contexts/AuthContext'
export default function Index() {
  const { isAuthenticated} = useAuthContext()
  return (
    <>
      <Routes>
        <Route path="/*" element={<PrivateRoute Component={Home} />} />
        {/* <Route path="/Auth/*" element={!isAuthenticated ? <Auth/> : <Navigate to ="/" replace/>} /> */}
        <Route path='*' element ={<h1 className='text-center'>page not found <br /> 404</h1>} />
      </Routes>
    </>
  )
}
