import dayjs from 'dayjs'
import { Button, Col, Drawer, Form, Input, Row, Space, Tooltip, message } from 'antd'
import { useForm } from 'antd/es/form/Form';
import { firestore } from 'config/firebase';
import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import React, { useState ,useEffect } from 'react'
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"


const { TextArea } = Input;
const initialState = { name: "", courseCode: "", description: "" }
export default function Courses() {
    const [open, setOpen] = useState(false);
    const [state, setState] = useState(initialState)
    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))
    const [form] = useForm()
    const [course , setCourse] = useState([])

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
        message.success("Todo deleted successfully")
    }

    const uploadCourse = async (e) => {
        e.preventDefault()
        let { name, courseCode, description } = state
        const newcourse = {
            name, courseCode, description,
            dateCreated: new Date().getTime(),
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
        getCourse()
    }
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    return (
        <>
            <div className='course-main'>
                <div className="course-top">
                    <Button type="dashed" onClick={showDrawer} size='middle' icon={<i class="bi bi-clipboard2-plus"></i>}>
                        Add New Course
                    </Button>
                </div>
                <Drawer
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
                </Drawer>
            </div>
            {/* table */}

            <div className="row mt-3">
                <div className="col">
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr className="tr">
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Course Code</th>
                                    <th>Description</th>
                                    <th>Date</th>
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
                                            <td>{list.dateCreated ? dayjs(list.dateCreated).format("dddd, DD/MM/YYYY") : ""}</td>
                                            <td>
                                                <Space>
                                                    <Tooltip title="Delete" color='red'><Button danger icon={<DeleteOutlined />}
                                                        onClick={() => { handleDelete(list.id) }}
                                                    /></Tooltip>
                                                    <Tooltip title="Edit"><Button type="primary" icon={<EditOutlined />}
                                                    //    onClick={() => { navigate(`/dashboard/todos/${todo.id}`) }}
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
        </>
    )
}
