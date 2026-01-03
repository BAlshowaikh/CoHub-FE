import { useEffect, useState } from "react"
import Project from "../../components/projects/Project"
import { GetAllProjects } from "../../services/api/Projects.api.js"
import { Link } from "react-router-dom"
const ProjectList = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await GetAllProjects()
        setProjects(data)
      } catch (err) {
        setError("Failed to load projects")
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) return <p>Loading projects...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="project-list">
      <h1>project</h1>
      <Link to={"/project/add"}>
        <button>create a project</button>
      </Link>
      {projects.map((project) => (
        <Project
          key={project._id}
          title={project.name}
          role="Member"
          date={new Date(project.createdAt).toDateString()}
        />
      ))}
    </div>
  )
}

export default ProjectList
