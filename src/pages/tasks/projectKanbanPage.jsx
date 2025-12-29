// ----------- Imports -----------
// Notes: useMemo is a hook used for performance optimization. It memoizes (caches) the result of a 
// calculation so that it isn't re-run on every render
import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"

import { tasksApi } from "../../services/api/tasks.api" // Imports all attached BE endpoints
import { groupByStatus } from "../../utils/tasks.utils" // For kanban grouping
import KanbanBoard from "../../components/tasks/KanbanBoard"

import "../../assets/styles/kanban.css";

const ProjectKanbanPage = () => {
  const { projectId } = useParams() // to get the project's tasks

  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState("")

  // ---------- Function 1 : Fetch tasks for project -------------
  const loadProjectTasks = async () => {
    try {
      // Clear any previous errors and change the loading state
      setErr("")
      setLoading(true)

      // Call the FE endpoint that communicates witb the BE by sending "/tasks" endpoint to the BE
      const res = await tasksApi.getTasksByProject(projectId)

      setTasks(res?.data || [])
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || "Failed to load tasks")
    } finally {
      setLoading(false)
    }
  }

  // If the projectId query is being passed call the function 
  useEffect(() => {
    loadProjectTasks()
  }, [projectId])

  // Group tasks for Kanban columns
  const grouped = useMemo(() => groupByStatus(tasks), [tasks])

  // ------ Function 2: Update status ------
  const onDropTask  = async (taskId, nextStatus) => {
    // Find the dragged task
    const currentTask = tasks.find(
      task => String(task._id || task.id) === String(taskId)
    )
    // Safe exit if not found
    if (!currentTask){
      await loadProjectTasks()
      return
    }

    const currentStatus = String(currentTask.status || "").toLowerCase()

    // If dragged in the same column (the task status isn't changed)
    if (currentStatus === nextStatus){
      return
    }

    try {
      setErr("");
      await tasksApi.updateTaskStatus(taskId, nextStatus)
      // reload tasks after update
      await loadProjectTasks()
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || "Failed to update status")
      await loadProjectTasks()
    }
  }

  if (loading) return <div className="p-4">Loading tasks...</div>
  if (err) return <div className="alert alert-danger m-4">{err}</div>


  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Project Kanban</h2>
      <KanbanBoard grouped={grouped} onDropTask={onDropTask} />
    </div>
  )
}

export default ProjectKanbanPage
