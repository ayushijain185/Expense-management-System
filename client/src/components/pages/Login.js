import React,{useState,useEffect} from 'react'
import {Form , Input} from 'antd';
import {Link,useNavigate} from 'react-router-dom'
import axios from "axios";
import Spinner from '../Spinner';
import { message ,Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
const Login = () => {
    const navigate = useNavigate();
    const [loading , setLoading]=useState(false);
    const submitHandler = async(values)=>{
        try{
          setLoading(true)
          const {data} = await axios.post('http://localhost:8000/api/v1/users/login',values)
          setLoading(false)
          localStorage.setItem('user',JSON.stringify({...data.user ,password:""}))
          navigate('/')
          message.success("Logged In Successfully")
          
        }
        catch(err){
          message.error("Something Went Wronge")
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
        <Form layout='vertical' className="page" onFinish={submitHandler}>
            {loading &&  <Spinner />}
          <div className="d-flex flex-row m-3 align-item-center justify-content-center"> <Avatar size={120} src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" /></div>
          <Form.Item name = 'email' rules={[{ required: true, message: 'Email is required!' }]}><Input type='email' placeholder='Email'/></Form.Item>
          <Form.Item name = 'password' rules={[{ required: true, message: 'password is required!' }]}><Input type='password'  placeholder='Password'/></Form.Item>
          <div className='d-flex flex-column justify-content-between'>
          <button className='btn btn-pink'>Submit</button>
          <Link to='/register' className='p-2 m-1 text-xxl'>Not Registered ? click here</Link>
            
           
          </div>
        </Form>
    </div>
      
    </>
  )
}

export default Login
