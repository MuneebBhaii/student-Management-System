import { Button, Select } from 'antd'
import { firestore } from 'config/firebase';
import dayjs from 'dayjs';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
const { Option } = Select;

export default function Attendance() {
  const [courses, setCourses] = useState([])
  const [Attendance, setAttendance] = useState([])
  const [studentstatus, setStudentstatus] = useState([])
  const [studentList, setStudentList] = useState([])
  const [studentCourse, setStudentCourse] = useState([])
  const getCourse = async () => {
    const querySnapshot = await getDocs(collection(firestore, "newcourses"));
    const courseArray = []
    querySnapshot.forEach((doc) => {
      courseArray.push(doc.data());
      setCourses(courseArray)
    });

  }
  const getAttendance = async () => {
    const querySnapshot = await getDocs(collection(firestore, "attendance"));
    const courseArray = []
    querySnapshot.forEach((doc) => {
      courseArray.push(doc.data());
      setAttendance(courseArray)
    });

  }
  const getStudent = async () => {
    const querySnapshot = await getDocs(collection(firestore, "students"));
    const studentArray = []
    querySnapshot.forEach((doc) => {
      studentArray.push(doc.data());
      if(studentCourse === ""){
        setStudentList(studentArray)
      }else if(studentCourse){
        studentArray.find(student => student.studentCourse === studentCourse)
        setStudentList(studentArray)
      }
    });
  }

  useEffect(() => {
    getStudent()
    getCourse()
    getAttendance()
  }, [])
  return (
    <div className="row mt-2">
      <div className="col text-center">
        <h1 className=' mb-4'>Attendance</h1>
        <Select onChange={(value) => setStudentCourse(value)} placeholder="Please choose the course status">
          {
            courses.map((course, i) => {
              return <Option value={course.name}>{course.name}</Option>
            })
          }
        </Select>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr className="tr">
                <th>#</th>
                <th>Name</th>
                <th>Id</th>
                <th>Course</th>
                <th>Attendance</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {studentList.map((list, i) => {
                return (
                  <tr key={i} className="tr">
                    <th>{i + 1}</th>
                    <td>{list.name}</td>
                    <td>{list.studentId}</td>
                    <td>{list.studentCourse}</td>
                    <td>{<Button>{studentstatus}</Button>}</td>
                    <td>
                      <Select onChange={(value) => setStudentstatus(value)} placeholder="Please choose the course status">
                        {
                          Attendance.map((info, i) => {
                            return <Option value={info.status}>{info.status}</Option>
                          })
                        }
                      </Select>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
