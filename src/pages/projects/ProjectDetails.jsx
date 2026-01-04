import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getProject } from "../../services/api/Projects.api"

const ProjectDetails = () => {
  const { projectId } = useParams()
  const [project, setProject] = useState()

  useEffect(() => {
    const getProjects = async () => {
      const data = await getProject(projectId)
      setProject(data)
    }
    getProjects()
  }, [projectId])

  return (
    <div className="projectDetails">
      <h1>{project.name}</h1>
      <p>
        <strong>Description:</strong> {project.description}
      </p>
      <p>
        <strong>Status:</strong> {project.status}
      </p>
      <p>
        <strong>Deadline:</strong>{" "}
        {project.deadline
          ? new Date(project.deadline).toLocaleDateString()
          : "No deadline"}
      </p>
      <p>
        <strong>Team:</strong> {project.Team_id?.name || "No team"}
      </p>
      <p>
        <strong>Project Manager:</strong> {project.PM_id?.name || "Unknown"}
      </p>
      <p>
        <strong>Created:</strong>{" "}
        {new Date(project.createdAt).toLocaleDateString()}
      </p>
    </div>
  )
}
export default ProjectDetails
