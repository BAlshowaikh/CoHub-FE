import { useState, useEffect } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.css"
import { Routes, Route } from "react-router-dom"
import { CheckSession } from "./services/Auth"
import Nav from "./components/common/Navbar"

import Home from "./pages/auth/Home"
import SignIn from "./pages/auth/SignIn"
import Register from "./pages/auth/Register"
import Feed from "./pages/auth/Feed"

import ProjectList from "./pages/projects/ProjectsList"
import NewProject from "./pages/projects/ProjectNew"
import ProjectDetails from "./pages/projects/ProjectDetails"
import TeamsList from "./pages/teams/TeamsList"
import TeamDetails from "./pages/teams/TeamDetails"
import AddTeam from "./pages/teams/AddTeam"
import EditTeam from "./pages/teams/EditTeam"
// --------- Project Imports -----------
import ProjectKanbanPage from "./pages/tasks/projectKanbanPage"

const App = () => {
  const [user, setUser] = useState(null)

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
  }

  const checkToken = async () => {
    const userData = await CheckSession()
    setUser(userData)
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <>
      <Nav user={user} handleLogOut={handleLogOut} />
      <main>
        <h1>Welcome to CoHub Website</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/register" element={<Register />} />

          <Route path="/feed" element={<Feed user={user} />} />

          <Route path="/project" element={<ProjectList />} />
          <Route path="/project/add" element={<NewProject />} />
          <Route path="/project/:projectId" element={<ProjectDetails />} />
          <Route path="/teams" element={<TeamsList user={user} />} />
          <Route path="/teams/add" element={<AddTeam />} />

          <Route path="/teams/:teamId" element={<TeamDetails user={user} />} />

          <Route
            path="/teams/:teamId/edit"
            element={<EditTeam user={user} />}
          />

          <Route path="/projects/:projectId" element={<ProjectKanbanPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
