import React,{useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'react-hot-toast'
import axios from 'axios'
import '../Styles/Register.scss'

const initialState={userName:'',email:'',password:'',mobileNo:''}
function Register() {
  const navigate=useNavigate()
  const [user,setUser]=useState(initialState)

  const changeHandler = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const handleRegister=async(e)=>{
    e.preventDefault()
    try{
      const response=await axios.post('http://localhost:5000/api/register',user)
      console.log(response)
      if (response.status===201){
          toast.success('User registered successfully')
          navigate('/login')
          setUser(initialState)
      }else {
        toast.error(response.data.message);
      }
  }catch (error) {
    toast.error(error.response.data.message);
    }
  }

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
  return (
    <div>
      <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-md-6 col-10 my-5 login">
              <div className="card-header">
								<h2 className='user-main-heading'>Todo App Register</h2>
							</div>
            <div className="card-body">
              <form onSubmit={handleRegister} className='user_form'>
                <div className="form-group mt-4">
                  <label className='label' htmlFor="userName">Name <span className='required'>*</span></label>
                  <input type="text" name="userName" placeholder="Enter your Name" id="userName" value={user.userName} onChange={changeHandler} className='form-control' pattern='[A-Z a-z]{3,}' title="Name should contain alphabets only and minimum three characters" required />
                </div>
                <div className="form-group mt-4">
                  <label className='label' htmlFor="email">Email <span className='required'>*</span></label>
                  <input type="email" placeholder='Enter your email' name="email" id="email" value={user.email} onChange={changeHandler} className='form-control' pattern='[a-z0-9._%+\-]+@[a-z0-9\-]+\.(in|com)$' title="Please enter valid email address" required />
                </div>
                <div className="form-group mt-4">
                  <label className='label' htmlFor="password">Password <span className='required'>*</span></label>
                  <input type="password"  placeholder="Enter your password" name="password" id="password" value={user.password} onChange={changeHandler} className='form-control' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number, one uppercase and one lowercase and at least 8 or more characters" required />
                  <span type='button' onClick={() => showPassword('password')}><i id='eye-symbol' className="bi bi-eye-fill"></i></span>
                </div>
                <div className="form-group mt-2">
                    <label className='label' htmlFor="number">Mobile Number <span className='required'>*</span></label>
										<input type="number" name="mobileNo" id="number" placeholder="Enter your mobile number" value={user.mobileNo} onChange={changeHandler} className='form-control' pattern='[6-9]\d{9}' title='Please enter valid mobileNo number' required />
                </div>
                <div className='register'>
                  <button type="submit" className="btn btn-primary btn-block mt-3">Register</button>
                </div>
              </form>
              <hr />
              <p className="text-center mt-3">Already have an account? <Link to="/login">Login</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register