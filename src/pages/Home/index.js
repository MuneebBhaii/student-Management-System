
import {Col, Row} from 'antd';
import {Route, Routes, } from 'react-router-dom';
import { Content } from 'antd/es/layout/layout';
// Components
import Sider from '../../Components/Sider';
import Header from '../../Components/Header';
import Dashboard from '../Home/Dashboard'
import Students from './Students';
import Courses from './Courses';
import Attendance from './Attendance';

export default function Home() {
  return (
    <div className="main-app">
     <Row 
     style={{
      height:'100vh',
      // padding:20
    }}
     >
      {/* Sider */}
      <Col xl={4} md={4} sm={24} xs={24} className='sidebar'>
        <Sider/>

        </Col>
        <Col xl={20} lg={20} md={20} sm={24} className='bg-white px-2'>
          {/* Header */}
          <Row className='bg-white border-shadows' 
          style={{
            height:'80px',
            borderRadius:'20px',
            alignItems:'center',
            padding:10,
          }}
          >
            {/* <Col xl={20} md={20} sm={24} xs={24}> */}
            <Header />
            {/* </Col> */}
          </Row>
          <Row className='mt-2 border-shadows scroll-hide'
          style={{
            height:'80vh',
            borderRadius:'20px',
            padding:10,
          }}
          >
          <Content>
          <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='students' element={<Students/>}/>
            <Route path='course' element={<Courses/>}/>
            <Route path='attendance' element={<Attendance/>}/>
          </Routes>
          </Content>
          </Row>
        </Col>
     </Row>
    </div>
  )
}
