import { useState } from 'react'
import{RegisterUser} from '../../services/Auth'
import { useNavigate } from 'react-router-dom'

import "../../assets/styles/auth.css"

const Register = () => {
  let navigate = useNavigate()

    const initialState = {
    username: '',
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
    user_role: '',
    department: ''
  }

  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

const handleSubmit = async (e) => {
  e.preventDefault()
    await RegisterUser({
      username: formValues.username,
      fullname: formValues.fullname,
      email: formValues.email,
      password: formValues.password,
      user_role: formValues.user_role,
      department: formValues.department
    })
  setFormValues(initialState)
  navigate('/signin')
}

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">
          Join CoHub and start managing your projects
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input
              name="username"
              type="text"
              placeholder="username"
              onChange={handleChange}
              value={formValues.username}
              required
            />
          </div>

          <div>
            <label>Full Name</label>
            <input
              name="fullname"
              type="text"
              placeholder="full name"
              onChange={handleChange}
              value={formValues.fullname}
              required
            />
          </div>

          <div>
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="example@example.com"
              onChange={handleChange}
              value={formValues.email}
              required
            />
          </div>

          <div>
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="password"
              onChange={handleChange}
              value={formValues.password}
              required
            />
          </div>

          <div>
            <label>Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="confirm password"
              onChange={handleChange}
              value={formValues.confirmPassword}
              required
              autoComplete="off"
            />
          </div>

          <div>
            <label>User Role</label>
            <select
              name="user_role"
              onChange={handleChange}
              value={formValues.user_role}
              required
            >
              <option value="">Select Role</option>
              <option value="Manager">Manager</option>
              <option value="PM">PM</option>
              <option value="Employee">Employee</option>
            </select>
          </div>

          <div>
            <label>Department</label>
            <select
              name="department"
              onChange={handleChange}
              value={formValues.department}
              required
            >
              <option value="">Select Department</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>

          <button
            disabled={
              !formValues.email ||
              !formValues.password ||
              formValues.password !== formValues.confirmPassword
            }
          >
            Register
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{" "}
          <span onClick={() => navigate("/signin")}>Login</span>
        </div>
      </div>
    </div>
  )
}

export default Register
