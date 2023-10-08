
import {  Menu,  Typography, } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CalendarOutlined, DashboardOutlined,  ReadOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import logo  from '../../../assets/img/logo.png'
export default function Sider() {
    const navigate = useNavigate();
    return (
        <div className='sidebar p-2'>
            <div className="d-flex justify-content-center">
            <img src={logo} alt="logo" className='img-fuild rounded-circle mx-2' style={{width:'70px',}}/>
            </div>
            <Typography.Title level={5}>
                Menu's
            </Typography.Title>
            
            <Menu className='bg-light'
                onClick={({ key }) => {
                    navigate(key)
                }}
                style={{
                    fontSize: '14px',

                }}
                items={[
                    {
                        label: 'Dashboard',
                        key: '/',
                        icon: <DashboardOutlined />,
                    },
                    {
                        label: 'Students',
                        key: '/students',
                        icon: <UsergroupAddOutlined />,
                    },
                    {
                        label: 'Course',
                        key: '/course',
                        icon: <ReadOutlined />,
                    },
                    {
                        label: 'Attendance',
                        key: '/attendance',
                        icon: <CalendarOutlined />,
                    },

                ]} />
        </div>
    )
}
