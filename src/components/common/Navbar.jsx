import { Link, NavLink, useNavigate } from "react-router-dom"
import "../../assets/styles/navbar.css"

import logo from "../../assets/images/cohub-logo.png"

const Nav = ({ user, handleLogOut }) => {
  const navigate = useNavigate()
  const role = (user?.role || "").toLowerCase()
  const isPM = role === "pm"

  const onLogoutClick = (e) => {
    e.preventDefault()
    handleLogOut()
    navigate("/signin")
  }

  return (
    <header className="cohub-nav">
      <div className="cohub-nav__inner">
        <Link to="/" className="cohub-nav__brand">
          <img className="cohub-nav__logo" src={logo} alt="CoHub" />
          <span className="cohub-nav__title">CoHub</span>
        </Link>

        <nav className="cohub-nav__links">
          {!user ? (
            <>
              <NavLink className="cohub-nav__link" to="/">
                Home
              </NavLink>
              <NavLink className="cohub-nav__link" to="/register">
                Register
              </NavLink>
              <NavLink className="cohub-nav__link cohub-nav__btn" to="/signin">
                Sign In
              </NavLink>
            </>
          ) : (
            <>
              <div className="cohub-nav__user">
                <span className="cohub-nav__hello">Welcome,</span>
                <span className="cohub-nav__name">
                  {user.name} <span className="cohub-nav__role">({user.role})</span>
                </span>
              </div>

              {/* Everyone logged-in sees Projects */}
              <NavLink className="cohub-nav__link" to="/projects">
                Projects
              </NavLink>

              {/* PM only sees Teams */}
              {isPM || user.role === "Manager" ? (
                <NavLink className="cohub-nav__link" to="/teams">
                  Teams
                </NavLink>
              ) : null}

              <a
                className="cohub-nav__link cohub-nav__btn"
                href="/signin"
                onClick={onLogoutClick}
              >
                Sign Out
              </a>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Nav
