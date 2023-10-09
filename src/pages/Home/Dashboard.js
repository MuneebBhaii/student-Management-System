
import React, { useEffect, useState } from 'react'
import { Content } from 'antd/es/layout/layout';
import { collection, getDocs, } from "firebase/firestore";
import { firestore } from "config/firebase";
import { BookOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Chart } from "react-google-charts";
export default function Dashboard() {
  const [studentList, setStudentList] = useState([])
  const [course, setCourse] = useState([])
  
  const getStudent = async () => {
    const querySnapshot = await getDocs(collection(firestore, "students"));
    const studentArray = []
    querySnapshot.forEach((doc) => {
      studentArray.push(doc.data());
      let numberlist = studentArray.length
      setStudentList(numberlist)
    });
  }

  const getCourse = async () => {
    const querySnapshot = await getDocs(collection(firestore, "newcourses"));
    const courseArray = []
    querySnapshot.forEach((doc) => {
      courseArray.push(doc.data());
      let numberlist = courseArray.length
      setCourse(numberlist)
    });
  }

  useEffect(() => {
    getStudent()
    getCourse()
  }, [])

  const data = [
    ["Year", "Students", "Courses"],
    ["2022", 50, 3],
    ["2023", studentList, course],
    ["2024", 0 ,0],
    ["2025" , 0 ,0],
  ];

  const options = {
    chart: {
      title: "institute details",
      subtitle: "student and course: 2022-2025",
    },
  };
  return (
    <>

      <Content className='px-3'>
        <h1 className='text-center'>Dashboard</h1>
        <div className="container mt-5 d-flex justify-content-between align-items-center">
          <div className="studentNumber">
            <h2>Total Students</h2>
            <div className="counter h1">
              <UsergroupAddOutlined /> <span>{studentList}</span>
            </div>
          </div>
          <div className="courseNumber">
            <h2>Total Courses</h2>
            <div className="counter m-0 h1">
              <BookOutlined /> <span>{course}</span>
            </div>
          </div>
        </div>
        <div className="container w-lg-100 w-md-75 w-sm-50">
          <Chart
            chartType="Bar"
            width="100%"
            height="400px"
            data={data}
            options={options}
          />
        </div>
      </Content>
    </>
  )
}
