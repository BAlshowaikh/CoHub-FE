import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from "react-router-dom"

// --------- Project Imports -----------
// import ProjectKanbanPage from "./pages/tasks/ProjectKanbanPage"


function App() {

  return (
    <>
      <main>
        <h1>Welcome to CoHub Website</h1>
        <Routes>
          <Route path="/projects/:projectId" element={<ProjectKanbanPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
