import { doc, setDoc, collection, getDocs, deleteDoc } from "firebase/firestore/lite";
import { Button, Row, Col, Form, Input, Modal, message, Select, Space, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { firestore } from "config/firebase";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import dayjs from 'dayjs'
import { useForm } from "antd/es/form/Form";
const { TextArea } = Input;
const { Option } = Select;
const initialState = { name: "", studentId: "", number: "", email: "", course: "", address: "" }
export default function Students() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [state, setState] = useState(initialState)
    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))
    const editChange = e => setEditStudent(s => ({ ...s, [e.target.name]: e.target.value }))
    const [form] = useForm()
    const [courses, setCourses] = useState([])
    const [studentList, setStudentList] = useState([])
    const [studentCourse, setStudentCourse] = useState([])
    const [editStudent, setEditStudent] = useState({})
    const getCourse = async () => {
        const querySnapshot = await getDocs(collection(firestore, "newcourses"));
        const courseArray = []
        querySnapshot.forEach((doc) => {
            courseArray.push(doc.data());
            setCourses(courseArray)
        });

    }
    const getStudent = async () => {
        const querySnapshot = await getDocs(collection(firestore, "students"));
        const studentArray = []
        querySnapshot.forEach((doc) => {
            studentArray.push(doc.data());
            setStudentList(studentArray)
        });
    }

    useEffect(() => {
        getStudent()
        getCourse()
    }, [])

    const handleDelete = async (studentId) => {
        await deleteDoc(doc(firestore, "students", studentId));
        getStudent()
        message.success("Todo deleted successfully")
    }


    const editModal = async (studentId) => {
        setEditModalOpen(true);
        let editStudent = studentList.find(student => student.id === studentId)
        setEditStudent(editStudent)
    }
    const updateStudent = async(e)=>{
        e.preventDefault()

        let { name, studentId,id, number, email, address } = editStudent
        const student = {
            name, studentId, number, email, studentCourse, address,id,
            dateCreated: new Date().getFullYear(),
        }
        if (!name || !studentId || !number || !email || !studentCourse || !address) {
            message.error("Please fill all input field")
            return
        }
        try {
            await setDoc(doc(firestore, "students", student.id), student);
            setIsModalOpen(false);
        }
        catch (e) {
            message.error("try again ", e);
        }
        form.resetFields()
        message.success("Successfully edited student")
        setEditModalOpen(false);
        getStudent() 
    }

    const closeEdit = () => {
        setEditModalOpen(false);
    }

    const showModal = () => {
        setIsModalOpen(true);
        getCourse()
    };
    const handleOk = async (e) => {
        e.preventDefault()

        let { name, studentId, number, email, address } = state
        const student = {
            name, studentId, number, email, studentCourse, address,
            id: Math.random().toString(36).slice(2),
            dateCreated: dayjs().format("dddd, DD/MM/YYYY"),
        }
        if (!name || !studentId || !number || !email || !studentCourse || !address) {
            message.error("Please fill all input field")
            return
        }
        try {
            await setDoc(doc(firestore, "students", student.id), student);
            message.success("Successfully added student")
            setIsModalOpen(false);
        }
        catch (e) {
            message.error("try again ", e);
        }
        form.resetFields()
        getStudent()
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className='student-main'>
                <div className="top-side">
                    <div className="search"></div>
                    <div className="add">
                        <Button type="dashes" onClick={showModal} size='middle' icon={<i class="bi bi-person-plus"></i>}>
                            Add New Student
                        </Button>
                        <Modal title="Student data" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            <Form layout="vertical"
                                form={form}
                            >

                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            name="name"
                                            label="Name"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                        >
                                            <Input name="name" placeholder="Please enter student name" onChange={handleChange} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="studentId"
                                            label="Student ID"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                        >
                                            <Input name="studentId" placeholder="Please enter student id" onChange={handleChange} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            name="number"
                                            label="Number"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                        >
                                            <Input name="number" className='w-100' placeholder="Please enter phone number" onChange={handleChange} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="email"
                                            label="Email"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                        >
                                            <Input name="email" placeholder="Please enter email" onChange={handleChange} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Form.Item
                                            name="course"
                                            label="Course"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please choose the type',
                                                },
                                            ]}
                                        >
                                            <Select onChange={(value) => setStudentCourse(value)} placeholder="Please choose the course status">
                                                {
                                                    courses.map((course, i) => {
                                                        return <Option value={course.name}>{course.name}</Option>
                                                    })
                                                }
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Form.Item
                                            name="address"
                                            label="address"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'please enter address',
                                                },
                                            ]}
                                        >
                                            <TextArea name="address" rows={4} placeholder="please enter address" onChange={handleChange} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Modal>
                    </div>
                </div>
            </div>

            <h2 className="text-center mt-3">Students Details</h2>
            {/* table */}

            <div className="row mt-2">
                <div className="col">
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr className="tr">
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Id</th>
                                    <th>Course</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    {/* <th>Date</th> */}
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
                                            <td>{list.email}</td>
                                            <td>{list.address}</td>
                                            {/* <td>{list.dateCreated}</td> */}
                                            <td>
                                                <Space>
                                                    <Tooltip title="Delete" color='red'><Button danger icon={<DeleteOutlined />}
                                                        onClick={() => { handleDelete(list.studentId) }}
                                                    /></Tooltip>
                                                    <Tooltip title="Edit"><Button type="primary" icon={<EditOutlined />}
                                                        onClick={() => { editModal(list.id) }}
                                                    /></Tooltip>
                                                </Space>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Modal title="UpDate Student Data" open={editModalOpen} onOk={updateStudent} onCancel={closeEdit}>
                <Form layout="vertical"
                    form={form}
                >

                    <Row gutter={16}>
                        <Col span={12}>
                            <label>Student Name</label>
                            <Input name="name" placeholder="Please enter student name" value={editStudent.name} onChange={editChange} />

                        </Col>
                        <Col span={12}>
                            <label>StudentId</label>
                            <Input name="studentId" placeholder="Please enter student id" value={editStudent.studentId} onChange={editChange} />
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <label>Number</label>
                            <Input name="number" className='w-100' placeholder="Please enter phone number" value={editStudent.number} onChange={editChange} />
                        </Col>
                        <Col span={12}>
                            <label>Email</label>
                            <Input name="email" placeholder="Please enter email" value={editStudent.email} onChange={editChange} />
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <label className="mt-3">Select Course</label>
                            <Select className="w-50 ms-3" onChange={(value) => setStudentCourse(value)} placeholder="Please choose the course status">
                                {
                                    courses.map((course, i) => {
                                        return <Option value={course.name}>{course.name}</Option>
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <label>Address</label>
                            <TextArea name="address" className="form-control" rows={4} placeholder="please enter address" value={editStudent.address} onChange={editChange} />
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}
