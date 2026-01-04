// ------------------ Imports --------------
import { useState, useEffect } from "react"
import "./App.css"
import { Routes, Route, Navigate } from "react-router-dom"
import { CheckSession } from "./services/Auth"
import Nav from "./components/common/Navbar"

// ------------- Auth pages -------------
import Home from "./pages/auth/Home"
import SignIn from "./pages/auth/SignIn"
import Register from "./pages/auth/Register"
import Feed from "./pages/auth/Feed"


import ProjectList from "./pages/projects/ProjectsList"
import NewProject from "./pages/projects/ProjectNew"
import ProjectDetails from "./pages/projects/ProjectDetails"

// ------------ Team pages -----------
import TeamsList from "./pages/teams/TeamsList"
import TeamDetails from "./pages/teams/TeamDetails"
import AddTeam from "./pages/teams/AddTeam"
import EditTeam from "./pages/teams/EditTeam"

// ------------------ Project list page -------------
import ProjectsList from "./pages/projects/ProjectsList"

// -------------- Project's Tasks pages -----------
import ProjectKanbanPage from "./pages/tasks/projectKanbanPage"


const App = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const handleLogOut = () => {
    setUser(null)
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }


  const checkToken = async () => {
  try {
    const user = await CheckSession()
    setUser(user)
    // We don't re-save the token here because it's already in localStorage
    localStorage.setItem("user", JSON.stringify(user))
  } catch (e) {
    handleLogOut()
  } finally {
    setLoading(false)
  }
}

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      checkToken()
    } else {
      setLoading(false)
    }
  }, [])

  if (loading) return <div className="p-4">Loading...</div>


  return (
    <>
      <Nav user={user} handleLogOut={handleLogOut} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/register" element={<Register />} />

          {/* Feed */}
          <Route
            path="/feed"
            element={user ? <Feed user={user} /> : <Navigate to="/signin" replace />}
          />


          <Route path="/project" element={<ProjectList />} />
          <Route path="/project/add" element={<NewProject />} />
          <Route path="/project/:projectId" element={<ProjectDetails />} />
          <Route path="/teams" element={<TeamsList user={user} />} />
          <Route path="/teams/add" element={<AddTeam />} />

          {/* Teams pages */}
          <Route
            path="/teams"
            element={user ? <TeamsList user={user} /> : <Navigate to="/signin" replace />}
          />

          <Route
            path="/teams/add"
            element={user ? <AddTeam user={user} /> : <Navigate to="/signin" replace />}
          />
          <Route
            path="/teams/:teamId"
            element={user ? <TeamDetails user={user} /> : <Navigate to="/signin" replace />}
          />
          <Route
            path="/teams/:teamId/edit"
            element={user ? <EditTeam user={user} /> : <Navigate to="/signin" replace />}
          />

          {/* Project's tasks page */}
          <Route
            path="/project/tasks/:projectId"
            element={user ? <ProjectKanbanPage user={user} /> : <Navigate to="/signin" replace />}
          />
        </Routes>

      </main>
    </>
  )
}

export default App
