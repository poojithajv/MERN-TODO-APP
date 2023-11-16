import React, { useState,useEffect } from 'react'
import Todo from '../../assets/images/todo.jpg'
import moment from 'moment/moment'
import { FaCheckCircle, FaCircle,FaTrash,FaEdit } from 'react-icons/fa';
import api from '../../util/api'
import { useNavigate } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";
import Tooltip from "@mui/material/Tooltip"; 
import {toast} from 'react-hot-toast'
import '../../Styles/Todo.scss'

function AllTodos() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    try{
      api.get(`/getAllTodos/${localStorage.getItem('todoUserId')}`)
      .then((res)=>{
        setTodos(res.data)
        console.log(res.data)
      })
      .catch(err=>{
        console.log(err)
      })
    }catch(err){
      toast.error(err.response.data.message);
    }
  },[])

  // Function to handle user logout
  const handleLogout = () => {
    let token = localStorage.getItem("accessToken");
    if (token) {
      localStorage.clear();
      navigate("/login"); // Redirect user to the login page
    }
  };

  const handleMarkStatus=(id,isComplete)=>{
    try{
      let isCompleted;
      isComplete ? isCompleted=false : isCompleted=true
      api.put(`/markTodo/${id}`,{isCompleted:isCompleted})
      .then((res)=>{
        if (res.status===200){
          toast.success('Todo Status updated Successfully')
          window.location.reload()
        }
      })
      .catch(err=>{
        console.log(err)
      })
    }catch(err){
      toast.error(err.response.data.message);
    }
  }
  const handleDelete=(id)=>{
    if (window.confirm('Are you sure you want to delete this todo?')){
      try{
        api.delete(`/deleteTodo/${id}`)
        .then((res)=>{
          if (res.status===200){
            toast.success('Todo Deleted Successfully')
            window.location.reload()
          }
        })
        .catch(err=>{
          console.log(err)
        })
      }catch(err){
        toast.error(err.response.data.message);
      }
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
        <button className='add-btn' onClick={()=>navigate('/create_todo')}>Add</button>
      </div>
      <div className='todos-container'>
        {todos.map((todo) => (
            <div className='card my-5 alert bg-light'>
              <div className={todo.isCompleted ? 'complete' :'incomplete'}>
              {todo.isCompleted ? <FaCheckCircle color="green" /> : <FaCircle color="gray" />}
              </div>
              <div className='card-body'>
                  <h4 className='card-title'>{todo.description}</h4>
                  <p className='card-date'>{moment(todo.date).fromNow()}</p>
              </div>
              <div className='delete-mark-buttons'>
                <Tooltip title="Delete" placement="bottom">
                  <p className='delete' onClick={()=>handleDelete(todo.todoId)}>
                  <FaTrash />
                  </p>
                </Tooltip>
                <Tooltip title="Edit" placement="bottom">
                  <p className='edit' onClick={()=>navigate('/update_todo',{state:todo})}>
                  <FaEdit />
                  </p>
                </Tooltip>
                  <button className='markbtn' onClick={()=>handleMarkStatus(todo.todoId,todo.isCompleted)}>Mark Complete</button>
              </div>
          </div>
          ))}
      </div>
    </div>
  );
}

export default AllTodos;
