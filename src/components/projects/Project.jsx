
import { Link } from "react-router-dom"
const Project = ({ project }) => {
  return (
    <Link to={`/project/tasks/${project._id}`} className="project-card">
      <div className="Aproject">
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <p>{project.deadline}</p>
      </div>
    </Link>
  )
}

export default Project
