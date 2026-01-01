import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { GetAllProjects } from "../../services/api/Projects.api"
import ProjectCard from "../../components/projects/ProjectCard"
import ProjectsGridSection from "../../components/projects/ProjectsGridSection"
import ProjectFormModal from "../../components/projects/ProjectFormModal"

import "../../assets/styles/projects.css"

const ProjectsList = ({ user }) => {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState("")
  const [showCreate, setShowCreate] = useState(false)


  const isPM = (user?.role || "").toLowerCase() === "pm"

  const loadProjects = async () => {
    try {
      setErr("")
      setLoading(true)

      const res = await GetAllProjects()
      const list = res?.data || res || []
      setProjects(list)
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || "Failed to load projects")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProjects()
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return projects
    return projects.filter((p) => String(p?.name || "").toLowerCase().includes(q))
  }, [projects, query])

  if (loading) return <div className="container py-4">Loading projects...</div>
  if (err) return <div className="container py-4 text-danger">{err}</div>

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
        <div>
          <h2 className="fw-bold mb-2">Projects</h2>

          <div className="projects-stats">
            <div>
              <div className="stat-num">{projects.length}</div>
              <div className="stat-label">Total Projects</div>
            </div>
          </div>
        </div>

        {/* PM only */}
        {isPM ? (
          <button className="btn btn-outline-dark" onClick={() => setShowCreate(true)}>
            + Add Project
          </button>
        ) : null}
      </div>

      {/* Search (no filter button) */}
      <div className="d-flex justify-content-end mb-4">
        <div className="projects-search">
          <span className="projects-search__icon">🔍</span>
          <input
            className="form-control projects-search__input"
            placeholder="Search for a project ..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <ProjectsGridSection>
        {filtered.length === 0 ? (
          <div className="text-muted p-3">No projects found.</div>
        ) : (
          <div className="projects-grid">
            {filtered.map((p) => (
              <ProjectCard
                key={p._id}
                project={p}
                canEdit={isPM}
                onOpenKanban={() => navigate(`/project/tasks/${p._id}`)}   // go to project tasks/kanban
                onEdit={() => navigate(`/projects/${p._id}/edit`)}
              />
            ))}
          </div>
        )}
      </ProjectsGridSection>
      <ProjectFormModal show={showCreate} onClose={() => setShowCreate(false)} onSaved={loadProjects}/>
    </div>
  )
}

export default ProjectsList
