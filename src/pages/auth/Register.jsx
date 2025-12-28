import { useState } from 'react'
import{RegisterUser} from '../../services/Auth'
import { useNavigate } from 'react-router-dom'
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
    <div className="col register">
      <img src="/images/register.png" alt="Register Title Image" />
      <form onSubmit={handleSubmit}>
              <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input
            name="username"
            type="text"
            placeholder="username"
            onChange={handleChange}
            value={formValues.username}
            required
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="fullname">Full Name</label>
          <input
            name="fullname"
            type="text"
            placeholder="full name"
            onChange={handleChange}
            value={formValues.fullname}
            required
          />
        </div>
         <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            placeholder="example@example.com"
            onChange={handleChange}
            value={formValues.email}
            required
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="confirmPassword">Confirm Password</label>
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

                <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="password"
            onChange={handleChange}
            value={formValues.password}
            required
          />
        </div>


                <div className="input-wrapper">
          <label>User Role</label>
          <select name="user_role" onChange={handleChange} required>
            <option value="">Select Role</option>
            <option value="Manager">Manager</option>
            <option value="PM">PM</option>
            <option value="Employee">Employee</option>
          </select>
        </div>

                <div className="input-wrapper">
          <label>Department</label>
          <select name="department" onChange={handleChange} required>
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
    </div>
  )
}

export default Register
