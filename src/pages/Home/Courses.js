import dayjs from 'dayjs'
import { Button, Col, Form, Input, Modal, Row, Space, Tooltip, message } from 'antd'
import { useForm } from 'antd/es/form/Form';
import { firestore } from 'config/firebase';
import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore/lite";
import React, { useState, useEffect } from 'react'
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"

const { TextArea } = Input;
const initialState = { name: "", courseCode: "", description: "" }
export default function Courses() {
    const [open, setOpen] = useState(false);
    const [editModel, setEditModel] = useState(false);
    const [state, setState] = useState(initialState)
    const [editCourse, setEditCourse] = useState({})
    const [course, setCourse] = useState([])
    const [form] = useForm()
    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))
    const handleEdit = e => setEditCourse(s => ({ ...s, [e.target.name]: e.target.value }))

    const getCourse = async () => {
        const querySnapshot = await getDocs(collection(firestore, "newcourses"));
        const courseArray = []
        querySnapshot.forEach((doc) => {
            courseArray.push(doc.data());
            setCourse(courseArray)
        });
    }
    useEffect(() => {
        getCourse()
    }, [])

    const handleDelete = async (id) => {
        await deleteDoc(doc(firestore, "newcourses", id));
        getCourse()
        message.success("coures deleted successfully")
    }


    const uploadCourse = async (e) => {
        e.preventDefault()
        let { name, courseCode, description } = state
        const newcourse = {
            name, courseCode, description,
            dateCreated: new Date().getFullYear(),
            id: Math.random().toString(26).slice(2)
        }
        try {
            await setDoc(doc(firestore, "newcourses", newcourse.id), newcourse);
            onClose(false);
        }
        catch (e) {
            message.error("try again ", e);
        }
        form.resetFields()
        message.success("Successfully created new course")
        getCourse()
    }
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const editCourseModel = (id) => {
        setEditModel(true);
        let edit = course.find((coures) => coures.id === id)
        setEditCourse(edit)
    }

    const updateCourse = async(e)=>{
        e.preventDefault()
        let { name, courseCode, description ,id } = editCourse
        const newcourse = {
            name, courseCode, description,id,
            dateCreated: new Date().getFullYear(),
        }
        try {
            await setDoc(doc(firestore, "newcourses", newcourse.id), newcourse);
            onClose(false);
        }
        catch (e) {
            message.error("try again ", e);
        }
        message.success("successfully edit course")
        setEditModel(false)
        getCourse()
    }
    const editClose = () => {
        setEditModel(false);
    }
    return (
        <>
            <div className='course-main'>
                <div className="course-top">
                    <Button type="dashed" onClick={showDrawer} size='middle' icon={<i class="bi bi-clipboard2-plus"></i>}>
                        Add New Course
                    </Button>
                </div>
                {/* <Drawer
                    title="Add a new course"
                    width={620}
                    onClose={onClose}
                    open={open}
                    bodyStyle={{
                        paddingBottom: 80,
                    }}
                    extra={
                        <Space>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button onClick={uploadCourse} type="dashed">
                                Submit
                            </Button>
                        </Space>
                    }
                >
                    <Form layout="vertical"
                        form={form}
                    >
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="name"
                                    label="Course Name"
                                    rules={[
                                        {
                                            required: true,
                                            message: "enter course name",
                                        },
                                    ]}
                                >
                                    <Input name='name' placeholder="Please enter course name" onChange={handleChange} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="courseCode"
                                    label="Course Code"
                                    rules={[
                                        {
                                            required: true,
                                            message: "enter course code",
                                        },
                                    ]}
                                >
                                    <Input name='courseCode' placeholder="Please enter course id" onChange={handleChange} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="description"
                                    label="Description"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'please enter course description',
                                        },
                                    ]}
                                >
                                    <TextArea name="description" rows={4} placeholder="please enter course description" onChange={handleChange} />
                                </Form.Item>
                            </Col>
                        </Row>

                    </Form>
                </Drawer> */}
                <Modal title="Add a new course"
                    open={open} onOk={uploadCourse} onCancel={onClose}>
                    <Form layout="vertical"
                        form={form}
                    >
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="name"
                                    label="Course Name"
                                    rules={[
                                        {
                                            required: true,
                                            message: "enter course name",
                                        },
                                    ]}
                                >
                                    <Input name='name' placeholder="Please enter course name" onChange={handleChange} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="courseCode"
                                    label="Course Code"
                                    rules={[
                                        {
                                            required: true,
                                            message: "enter course code",
                                        },
                                    ]}
                                >
                                    <Input name='courseCode' placeholder="Please enter course id" onChange={handleChange} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="description"
                                    label="Description"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'please enter course description',
                                        },
                                    ]}
                                >
                                    <TextArea name="description" rows={4} placeholder="please enter course description" onChange={handleChange} />
                                </Form.Item>
                            </Col>
                        </Row>

                    </Form>
                </Modal>
            </div>

            <h2 className="text-center mt-3">Courses Details</h2>
            {/* table */}

            <div className="row mt-2">
                <div className="col">
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr className="tr">
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Course Code</th>
                                    <th>Description</th>
                                    {/* <th>Date</th> */}
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {course.map((list, i) => {
                                    return (
                                        <tr key={i} className="tr">
                                            <th>{i + 1}</th>
                                            <td>{list.name}</td>
                                            <td>{list.courseCode}</td>
                                            <td>{list.description}</td>
                                            {/* <td>{list.dateCreated ? dayjs(list.dateCreated).format("dddd, DD/MM/YYYY") : ""}</td> */}
                                            <td>
                                                <Space>
                                                    <Tooltip title="Delete" color='red'><Button danger icon={<DeleteOutlined />}
                                                        onClick={() => { handleDelete(list.id) }}
                                                    /></Tooltip>
                                                    <Tooltip title="Edit"><Button type="primary" icon={<EditOutlined />}
                                                        onClick={() => { editCourseModel(list.id) }}
                                                    // onClick={()=>{handleEdit(list.id )}}
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

            <Modal title="Edit course"
                open={editModel} onOk={updateCourse} onCancel={editClose}>
                <Form layout="vertical"
                    form={form}
                >
                    <Row gutter={16} className='my-3'>
                        <Col span={12}>
                            <label>Course Name</label>
                            <Input name='name' placeholder="Please enter course name" value={editCourse.name} onChange={handleEdit} />
                        </Col>
                        <Col span={12}>
                            <label>Course Code</label>
                            <Input name='courseCode' placeholder="Please enter course id" value={editCourse.courseCode} onChange={handleEdit} />
                        </Col>
                    </Row>
                    <Row gutter={16} className='mb-3'>
                        <Col span={24}>
                            <label>Description</label>
                            <TextArea name="description" rows={4} placeholder="please enter course description" value={editCourse.description} onChange={handleEdit} />
                        </Col>
                    </Row>

                </Form>
            </Modal>
        </>
    )
}
