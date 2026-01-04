// ----------- Imports -----------
import { useEffect, useMemo, useState } from "react"
import { useParams, Link } from "react-router-dom"

import { tasksApi } from "../../services/api/tasks.api" 
import { getProject } from "../../services/api/projects.api" 
import { groupByStatus } from "../../utils/tasks.utils" 
import { getStoredUser, isPMUser } from "../../utils/user.utils"

import KanbanBoard from "../../components/tasks/KanbanBoard"
import TaskDetailsModal from "../../components/tasks/TaskDetailsModal"
import TaskFormModal from "../../components/tasks/TaskFormModal"

import "../../assets/styles/kanban.css"

const ProjectKanbanPage = () => {
  const { projectId } = useParams() 

  const [projectName, setProjectName] = useState("Project")
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState("")

  // Handle details modal
  const [selectedTaskId, setSelectedTaskId] = useState(null)
  const [detailsOpen, setDetailsOpen] = useState(false)

  const openDetails = (taskId) => {
    setSelectedTaskId(taskId);
    setDetailsOpen(true);
  }

  const closeDetails = () => {
    setDetailsOpen(false);
    setSelectedTaskId(null);
  }

  // Handle Create/Edit form modal
  const [formOpen, setFormOpen] = useState(false)
  const [formMode, setFormMode] = useState("create") 

  const user = getStoredUser()
  const isPM = isPMUser(user)

  const openCreateTask = () => {
    if (!isPM) {
      setErr("Only PM can add tasks")
      return
    }
    setFormMode("create")
    setSelectedTaskId(null)
    setFormOpen(true)
  }

  const openEditTask = (taskId) => {
    if (!isPM) {
      setErr("PM only")
      return
    }
    setFormMode("edit")
    setSelectedTaskId(taskId)
    setFormOpen(true)
  }

  const closeForm = () => {
    setFormOpen(false)
    setSelectedTaskId(null)
  }

  // ---------- Function 1 : Fetch project details (for Name) -------------
  const loadProjectData = async () => {
    try {
      // Fetch project details to get the name
      const projectRes = await getProject(projectId)
      setProjectName(projectRes?.name || "Project")
    } catch (e) {
      console.error("Failed to load project details", e)
    }
  }

  // ---------- Function 2 : Fetch tasks for project -------------
  const loadProjectTasks = async (showLoading = true, keepError = false) => {
    try {
      if (!keepError) setErr("") 
      if (showLoading) setLoading(true)

      const res = await tasksApi.getTasksByProject(projectId)
      setTasks(res?.data || [])
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || "Failed to load tasks")
    } finally {
      if (showLoading) setLoading(false)
    }
  }

  // Effect to load everything on mount
  useEffect(() => {
    loadProjectData()
    loadProjectTasks()
  }, [projectId])

  // Group tasks for Kanban columns
  const grouped = useMemo(() => groupByStatus(tasks), [tasks])

  // ------ Function 3: Update status (Drag and Drop) ------
  const onDropTask = async (taskId, nextStatus) => {
    const currentTask = tasks.find(
      task => String(task._id || task.id) === String(taskId)
    )

    if (!currentTask) {
      await loadProjectTasks()
      return
    }

    const currentStatus = String(currentTask.status || "").toLowerCase();

    if (currentStatus === nextStatus) {
      return
    }

    try {
      setErr("")
      await tasksApi.updateTaskStatus(taskId, nextStatus)
      await loadProjectTasks(false)
    } catch (e) {
      const msg = e?.response?.data?.message || e.message || "Failed to update status"
      setErr(msg)

      // Snap card back but keep the error visible
      await loadProjectTasks(false, true)

      // Auto-clear error after 5s
      setTimeout(() => setErr(""), 5000)
    }
  }

  if (loading) return <div className="p-4">Loading Kanban...</div>

  return (
    <div className="p-4">
      {/* Navigation and Header Row */}
      <div className="mb-2">
        <Link to="/project" className="text-decoration-none text-muted d-flex align-items-center gap-1">
          <i className="bi bi-arrow-left"></i>
          <span>Back to projects</span>
        </Link>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
        <h2 className="fw-bold mb-0">{projectName} Kanban</h2>
        {isPM && (
          <button 
            className="btn text-white px-4" 
            style={{ backgroundColor: "#20222F" }}
            onClick={openCreateTask}
          >
            <i className="bi bi-plus-lg me-2"></i>
            Add Task
          </button>
        )}
      </div>

      {/* Error Banner */}
      {err && (
        <div className="alert alert-danger alert-dismissible fade show mb-4 shadow-sm" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          <strong>Invalid Move: </strong>{err}
          <button type="button" className="btn-close" onClick={() => setErr("")}></button>
        </div>
      )}

      <div className="kanban-wrapper">
        <KanbanBoard 
          grouped={grouped} 
          onDropTask={onDropTask} 
          onViewDetails={openDetails} 
          onEditTask={openEditTask} 
          isPM={isPM}
        />
      </div>

      {/* Modals */}
      <TaskDetailsModal 
        show={detailsOpen} 
        taskId={selectedTaskId} 
        onClose={closeDetails} 
      />
      <TaskFormModal 
        show={formOpen} 
        mode={formMode} 
        projectId={projectId} 
        taskId={selectedTaskId} 
        onClose={closeForm} 
        onSaved={() => loadProjectTasks(false)}
      />
    </div>
  )
}

export default ProjectKanbanPage