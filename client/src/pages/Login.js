import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link,useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast'
import axios from 'axios'
import '../Styles/Login.scss'

const Login = () => {
  const navigate=useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const showPassword = (inputId) => {
		const input = document.getElementById(inputId)
		const eye = document.getElementById('eye-symbol')
		// alert(input)
		if (input.type === 'password') {
			input.type = 'text'
			eye.classList.remove('bi-eye-fill')
			eye.classList.add('bi-eye-slash-fill')
		}
		else {
			input.type = 'password'
			eye.classList.remove('bi-eye-slash-fill')
			eye.classList.add('bi-eye-fill')
		}
	}
  const handleLogin = async (e) => {
    e.preventDefault();
    // Perform login logic and call onLogin if successful
    try {
      const response=await axios.post('http://localhost:5000/api/login',{email,password})
      console.log(response)
      if (response.status===200){
        localStorage.setItem('todoUserId',response.data.userId)
        localStorage.setItem('name',response.data.userName)
        localStorage.setItem('accessToken',response.data.accessToken)
        toast.success('Login Successful')
        navigate('/all_todos')
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <div className="container">
      <div className="row d-flex justify-content-center align-center">
        <div className="col-md-6 my-5 login">
              <div className="card-header">
								<h2 className='user-main-heading'>Todo App Login</h2>
							</div>
            <div className="card-body">
              <form onSubmit={handleLogin} className='user_form'>
                <div className="form-group mt-4">
                    <label className='label' htmlFor="email">Email <span className='required'>*</span></label>
										<input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} className='form-control' pattern='[a-z0-9._%+\-]+@[a-z0-9\-]+\.(in|com)$' title="Please enter valid email address" required />
                </div>
                <div className="form-group mt-4">
                  <label className='label' htmlFor="password">Password <span className='required'>*</span></label>
                  <input type="password" id="password" className="form-control" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                  <span type='button' onClick={() => showPassword('password')}><i id='eye-symbol' className="bi bi-eye-fill"></i></span>
                </div>
                <div className='register'>
                  <button type="submit" className="btn btn-primary btn-block mt-3">Login</button>
                </div>
              </form>
              <hr />
              <p className="text-center mt-3">Don't have an account? <Link to="/register">Sign Up</Link></p>
            </div>
          </div>
        </div>
    </div>
    </div>
  );
};

export default Login;
