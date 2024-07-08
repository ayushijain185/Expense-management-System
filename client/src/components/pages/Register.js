import React,{useState,useEffect} from 'react'
import {Form , Input} from 'antd';
import {Link,useNavigate} from 'react-router-dom'
import axios from "axios";
import Spinner from '../Spinner';
import {Avatar ,  message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
const Register = () => {

  const navigate = useNavigate();
  const [loading , setLoading]=useState(false);

  const submitHandler = async(values)=>{
        try{
          setLoading(true)
          await axios.post('http://localhost:8000/api/v1/users/register',values)
          setLoading(false)
          navigate('/login')
          message.success("Regiter Successfully") 
        }catch(err){
          message.error("Something Went Wronge",err.response)
          setLoading(false)
        }
  }
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
    <div className="register-page bg-body-secondary">
     
      {loading  && <Spinner />}
        <Form layout='vertical' className="page" onFinish={submitHandler}>
          <div className="d-flex flex-row m-3 align-item-center justify-content-center"> <Avatar size={120} src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" /></div>
          <Form.Item  name = 'name' rules={[{ required: true, message: 'Please input your name!' }]}><Input placeholder='Username'/></Form.Item>
          <Form.Item  name = 'email' rules={[{ required: true, message: 'Please input your email!' }]}><Input type='Email' placeholder='Email' /></Form.Item>
          <Form.Item  name = 'password' rules={[{ required: true, message: 'Please input your password!' }]}><Input type='password' placeholder='Password'/></Form.Item>
          <div className='d-flex flex-column justify-content-between'>
            <button className='btn btn-pink'>Register</button>
            <Link to='/login' className='p-2'>Already Register ? click here</Link>
          </div>
        </Form>
    </div>
    </>
  )
}

export default Register;
