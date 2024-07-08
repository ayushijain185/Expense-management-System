import React ,{useState,useEffect} from 'react'
import Layout from '../layout/Layout'
import axios from "axios";
import {UnorderedListOutlined , AreaChartOutlined,EditOutlined,DeleteOutlined} from '@ant-design/icons'
import Spinner from '../Spinner'
import moment from 'moment';
import {Form, Input, Modal ,Table, Select,message , DatePicker} from 'antd';
import Analytics from '../Analytics';
const {RangePicker} = DatePicker;

const HomePage = () => {
  const [showModal , setShowModal] = useState(false);
  const [loading,setLoading]=useState(false);
  const [allTransection , setAllTransection]=useState([]);
  const [frequency , setFrequency]=useState('7');
  const [selectedDate ,setSelectedDate]=useState([]);
  const [type,setType]=useState('all');
  const [viewData ,setViewData]=useState('table');
  const [editOutlined,setEditOutlined]=useState(null);
  
  //table data
  const columns = [
    {
    title:'Date',
    dataIndex:'date',
    render:(text)=><span>{moment(text).format('YYYY-MM-DD')}</span>
  },
  {
    title:'Amount',
    dataIndex:'amount' 
  },
  {
    title:'Type',
    dataIndex:'type'
  },
  {
    title:'Category',
    dataIndex:'category'
  },
  {
    title:'Refrence',
    dataIndex:'refrence'
  },
  {
    title:'Actions',
    render:(text,record)=>{
      return(
      <div key={record._id}>
        <EditOutlined className='mx-1' onClick={()=>{
          setEditOutlined(record)
          setShowModal(true);
        }}/>
        <DeleteOutlined className='mx-1' onClick={()=>{
          handleDelete(record)
        }}/>
      </div>)
    }
  }
]
  // get all transection
  const getAllTransections= async()=>{
    try{
      const user = JSON.parse(localStorage.getItem('user'));
      setLoading(true);
      const res = await axios.post('http://localhost:8000/api/v1/transection/getAllTransection',{
        userid:user._id,
        frequency,
        selectedDate,
        type
      })
      setLoading(false);
      console.log(res.data);
      setAllTransection(res.data);
    }catch(error){
      setLoading(false);
      console.log(error);
      message.error('fetch issue with transection');
    }
  }

  useEffect(()=>{
    getAllTransections()
  },[frequency,selectedDate,type])

  // delet handler
  const handleDelete=async(record)=>{
    try{
      setLoading(true)
      await axios.post(`http://localhost:8000/api/v1/transection/deleteTransection`,{transectionId:record._id})
      setLoading(false);
      message.success("record deleted successfully");
      getAllTransections();
    }catch(error){
      setLoading(false);
      console.log(error);
      message.error("Unable to Delete")
    }


  }

  const handleSubmit= async(values)=>{
    try{
      const user=JSON.parse(localStorage.getItem('user'))
      setLoading(true)
      if(editOutlined){
        await axios.post(`http://localhost:8000/api/v1/transection/editTransection`,{payload:{...values,userId:user._id} ,transectionId:editOutlined._id})
        message.success('Transection Updated successfully')
        getAllTransections();

      }
      else{
        const res = await axios.post(`http://localhost:8000/api/v1/transection/addTransection`,{...values , userid:user._id})
         message.success('Transection added successfully')
         getAllTransections();
      }
      setLoading(false);
      setShowModal(false);
      setEditOutlined(null);
    }catch(error){
      setLoading(false);
      console.log(error);
      message.error('Something went wronge');
    }
  }

  return (
    <>
        <Layout>
          {loading && <Spinner />}
        <div className="filters m-4 p-3 border border-secondary-subtle">

          <div className='d-flex justify-content-space-between mx-2'>
          <div className='px-1'>
            <h6>Frequency</h6>
            <Select className='p-2' value = {frequency} onChange={(values)=>setFrequency(values)}>
              <Select.Option value="7">Last 1 Week</Select.Option>
              <Select.Option value="30">Last 1 Month</Select.Option>
              <Select.Option value="365">Last 1 Year</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>
            {frequency==='custom' && <RangePicker value = {selectedDate} onChange={(values)=>setSelectedDate(values)} />}
          </div>
          <div className='px-1'>
            <h6>Type</h6>
            <Select className='p-2' value = {type} onChange={(values)=>setType(values)}>
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
            </div>

          </div>
          <div className='mx-1 switch-icons'>
              <UnorderedListOutlined className={`mx-1 ${viewData==='table'? 'active-icon' :'inactive-icon'}`} onClick={()=>setViewData('table')}/>
              <AreaChartOutlined className={`mx-1 ${viewData==='analytics'? 'active-icon' :'inactive-icon'}`} onClick={()=>setViewData('analytics')}/>
            </div>
          <div>
            <button className='btn btn-primary px-4' onClick={()=>setShowModal(true)}>Add New</button></div>
        </div>
        <div className="content mx-2">
          {viewData ==='table'? <Table className="mx-3" columns={columns} dataSource={allTransection} size='small' bordered rowKey={record => record._id}/> : <Analytics allTransection={allTransection}/>}
          
        </div>
        <Modal title={editOutlined ? "Edit Transection " : "Add Transection" }open={showModal} onCancel={()=>setShowModal(false)} footer={false}>
          <Form Layout='vertical' onFinish={handleSubmit} initialValues={editOutlined}>
            <Form.Item label="Amount" name="amount" rules={[{required:true,message:"Amount is required"}]}><Input type='text'/></Form.Item>
            <Form.Item label="Type" name="type" rules={[{required:true,message:"Type is required"}]}>
              <Select>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select></Form.Item>
            <Form.Item label="Category" name="category" rules={[{required:true,message:"Category is required"}]}>
            <Select>
                <Select.Option value="salary">Salary</Select.Option>
                <Select.Option value="tip">Tip</Select.Option>
                <Select.Option value="freelancing">Freelancing</Select.Option>
                <Select.Option value="schoolarship">Schoolarship</Select.Option>
                <Select.Option value="food">Food</Select.Option>
                <Select.Option value="tip">Tip</Select.Option>
                <Select.Option value="rent">Rent</Select.Option>
                <Select.Option value="dailyneeds">Daily Needs</Select.Option>
                <Select.Option value="fees">Fees</Select.Option>
                <Select.Option value="stationary">Stationary</Select.Option>
                <Select.Option value="medical">Medical</Select.Option>
                <Select.Option value="tax">Tax</Select.Option>
                <Select.Option value="trip">Trip</Select.Option>
                <Select.Option value="other">Other</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Date" name="date" rules={[{required:true,message:"Date is required"}]}><Input type='date' /></Form.Item>
            <Form.Item label="Refrence" name="refrence"><Input type='text' /></Form.Item>
            <div className='d-flex justify-content-end'>
              <button type='submit' className='btn btn-primary'>SAVE</button>
            </div>
          </Form>
        </Modal>
        </Layout>
      
    </>
  )
}
export default HomePage;
