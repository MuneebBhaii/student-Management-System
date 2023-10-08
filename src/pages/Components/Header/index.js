
import { Header } from 'antd/es/layout/layout'
import React from 'react'
export default function index() {
    
  return (
    <Header
          style={{
            padding: 20,
            background: "white",
            position:"sticky",
            display:'flex',
            alignItems:'center',
          }}
    >
    <h5 className='text-center'>Student Management System</h5>
    </Header>
  )
}
