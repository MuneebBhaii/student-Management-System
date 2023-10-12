import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import Auth from './Auth'

import PrivateRoute from './PrivateRoutes'

export default function Index() {

  return (
    <>
      <Routes>
        <Route path="/*" element={<PrivateRoute Component={Home} />} />
        {/* <Route path='/Auth/*' element={<Auth/>}/> */}

      </Routes>
    </>
  )
}
