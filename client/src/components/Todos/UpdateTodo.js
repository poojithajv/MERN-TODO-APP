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

function UpdateTodo() {
  const location=useLocation()
  const navigate = useNavigate();
  const [todo,setTodo]=useState(location.state)
  console.log(todo)

  const changeHandler=(e)=>{
    const {name,value,type,checked}=e.target
    if (type === 'checkbox') {
      setTodo({ ...todo, [name]: checked });
    }else {
      setTodo({ ...todo, [name]: value });
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
  const handleUpdate=(e)=>{
    e.preventDefault()
    try{
      api.put(`/markTodo/${todo.todoId}`,{...todo,date:new Date()})
      .then((res)=>{
        if (res.status===200){
          toast.success('Todo Status updated Successfully')
          navigate('/all_todos')
        }
      })
      .catch(err=>{
        console.log(err)
      })
    }catch(err){
      toast.error(err.response.data.message);
    }
  }
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
              <h2 className='user-main-heading'>Update Todo</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleUpdate} className='user_form'>
                <div className="form-group mt-4">
                  <label className='label' htmlFor="description">Description</label>
                  <input type="text" name="description" placeholder="Enter your Description" id="description" value={todo.description} onChange={changeHandler} className='form-control'  />
                </div>
                <div className="form-group mt-4">
                  <label className='label' htmlFor="date">Email <span className='required'>*</span></label>
                  <input type="date" placeholder='Enter your date' name="date" id="date" value={todo.date.slice(0,10)} className='form-control' disabled />
                </div>
                <div className="checkbox mt-4">
                  <label className='label' htmlFor="isCompleted">Is Completed</label>
                  <input type="checkbox" name="isCompleted" id="isCompleted" checked={todo.isCompleted} onChange={changeHandler} className='checkbox1'  />
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-3">Update</button>
              </form>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default UpdateTodo