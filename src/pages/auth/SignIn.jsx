import { useState } from 'react'
import { SignInUser } from '../../services/Auth'
import { useNavigate } from 'react-router-dom'


import "../../assets/styles/auth.css"

const SignIn = ({setUser}) => {
  let navigate = useNavigate()
  const initialState = { email: '', password: '' }

  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

 const handleSubmit = async (e) => {
  e.preventDefault()
  const userData = await SignInUser(formValues)
  setFormValues(initialState)
  setUser(userData)
  navigate('/projects') // Once sign in redirect to project paeg
}

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Welcome to CoHub</h1>
        <p className="auth-subtitle">
          Your favourite platform for managing tasks & projects
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
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
              placeholder="••••••••"
              onChange={handleChange}
              value={formValues.password}
              required
            />
          </div>

          <button disabled={!formValues.email || !formValues.password}>
            Login
          </button>
        </form>

        <div className="auth-footer">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/register")}>Sign Up</span>
        </div>
      </div>
    </div>
  )
}

export default SignIn
