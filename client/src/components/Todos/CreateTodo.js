import React, { useState,useEffect } from 'react'
import Todo from '../../assets/images/todo.jpg'
import 'bootstrap-icons/font/bootstrap-icons.css';
import api from '../../util/api'
import { useNavigate,useLocation } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";
import "bootstrap/dist/css/bootstrap.min.css";
import Tooltip from "@mui/material/Tooltip"; 
import {toast} from 'react-hot-toast'
import { format } from 'date-fns';
import '../../Styles/Todo.scss'

const initialState={description:"",isCompleted:false,date:new Date().toISOString().split('T')[0]}
function CreateTodo() {
  const navigate=useNavigate()
  const [todo,setTodo]=useState(initialState)
  const changeHandler = (e) => {
    const {name,value,type,checked}=e.target
    if (type === 'checkbox') {
      setTodo({ ...todo, [name]: checked });
    }else {
      setTodo({ ...todo, [name]: value });
    }
  };
  console.log(todo.date)

  const handleAdd=(e)=>{
    console.log(todo)
    e.preventDefault()
    try{
      api.post('/createTodo',{...todo,userId:localStorage.getItem('todoUserId')})
      .then((res)=>{
        console.log(res)
        if (res.status===201){
          toast.success('Todo Created Successfully')
          navigate('/all_todos')
          setTodo(initialState)
      }
      })  
      .catch(err=> {
        toast.error(err);
      })
  }catch (error) {
    toast.error(error.res.data.message);
    }
  }

   // Function to handle user logout
   const handleLogout = () => {
    let token = localStorage.getItem("accessToken");
    if (token) {
      localStorage.clear();
      navigate("/login"); // Redirect user to the login page
    }
  };
  return (
    <div>
      <div className='todo-container'>
        <Tooltip title="Logout" placement="top">
          <img
            src={Todo}
            alt="logo"
            className="logo"
            onClick={handleLogout}
          />
        </Tooltip>
        <div className='right-content'>
          <p className='welcome'>Welcome, <span className='logout'>{localStorage.getItem('name')} </span> !</p>
          <Tooltip title="Logout">
          <p onClick={handleLogout} className="logout">
            <RiLogoutCircleRLine size={16} />
          </p>
        </Tooltip>
        </div>
      </div>
      <div className='btn'>
        <button className='add-btn' onClick={()=>navigate('/all_todos')}>All Todos</button>
      </div>
      <div className="container">
      <div className="row d-flex justify-content-center align-center">
        <div className="col-md-6 mt-4 col-sm-6">
            <div className="card-header">
              <h2 className='user-main-heading'>Add Todo</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleAdd} className='user_form'>
                <div className="form-group mt-4">
                  <label className='label' htmlFor="description">Description</label>
                  <input type="text" name="description" placeholder="Enter your Description" id="description" value={todo.description} onChange={changeHandler} className='form-control'  />
                </div>
                <div className="form-group mt-4">
                  <label className='label' htmlFor="date">Email <span className='required'>*</span></label>
                  <input type="date" placeholder='Enter your date' name="date" id="date" value={todo.date} onChange={changeHandler} className='form-control' disabled />
                </div>
                <div className="checkbox mt-4">
                  <label className='label' htmlFor="isCompleted">Is Completed</label>
                  <input type="checkbox" name="isCompleted" id="isCompleted" checked={todo.isCompleted} onChange={changeHandler} className='checkbox1'  />
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-3">Add</button>
              </form>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default CreateTodo