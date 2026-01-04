import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { createProject } from "../../services/api/Projects.api"
import { GetTeams } from "../../services/api/teams.api"

const NewProject = () => {
  const navigate = useNavigate()

  const [teams, setTeams] = useState([])
  const [project, setProject] = useState({
    name: "",
    description: "",
    deadline: "",
    Team_id: "",
  })

  useEffect(() => {
    const allTeams = async () => {
      try {
        const group = await GetTeams()
        setTeams(group)
      } catch (err) {
        console.error(err)
      }
    }
    allTeams()
  }, [])

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const createdProject = await createProject(project)
    navigate(`/project/${createdProject._id}`)
  }

  return (
    <div className="createProject">
      <h1>create a new project</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Project name
          <input
            type="text"
            name="name"
            value={project.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description
          <textarea
            name="description"
            value={project.description}
            onChange={handleChange}
            required
          ></textarea>
        </label>
        <label>
          Deadline
          <input
            type="date"
            name="deadline"
            value={project.deadline}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Team
          <select
            name="Team_id"
            value={project.Team_id}
            onChange={handleChange}
            required
          >
            <option value="">select a team</option>
            {teams.map((t) => (
              <option key={t._id} value={t._id}>
                {t.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">create project</button>
      </form>
    </div>
  )
}

export default NewProject
