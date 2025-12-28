// ----------- Imports -----------
import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"

import { tasksApi } from "../../services/api/tasks.api" // Imports all attached BE endpoints
import { groupByStatus } from "../../utils/tasks.utils" // For kanban grouping


export default function ProjectKanbanPage() {
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
  const onChangeStatus = async (taskId, nextStatus) => {
    try {
      setErr("");
      await tasksApi.updateTaskStatus(taskId, nextStatus)
      // simplest approach: reload tasks after update
      await loadProjectTasks()
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || "Failed to update status");
    }
  }

  if (loading) return <div className="p-4">Loading tasks...</div>;
  if (err) return <div className="p-4 text-red-600">{err}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Project Kanban</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KanbanColumn title="To Do" tasks={grouped.todo} onChangeStatus={onChangeStatus} />
        <KanbanColumn title="Doing" tasks={grouped.doing} onChangeStatus={onChangeStatus} />
        <KanbanColumn title="Done" tasks={grouped.done} onChangeStatus={onChangeStatus} />
      </div>
    </div>
  );
}

const KanbanColumn = ({ title, tasks, onChangeStatus }) => {
  return (
    <div className="bg-white rounded-lg border p-3">
      <h3 className="font-semibold mb-3">{title}</h3>

      {tasks.length === 0 ? (
        <p className="text-sm text-gray-500">No tasks</p>
      ) : (
        <div className="space-y-2">
          {tasks.map((t) => (
            <TaskCard key={t._id || t.id} task={t} onChangeStatus={onChangeStatus} />
          ))}
        </div>
      )}
    </div>
  )
}

const TaskCard = ({ task, onChangeStatus }) => {
  const id = task._id || task.id

  return (
    <>
        <div className="rounded-md border p-3">
        <div className="font-medium">{task.title}</div>
        <div className="text-xs text-gray-500 mt-1">status: {task.status}</div>

        <div className="flex flex-wrap gap-2 mt-3">
            <button className="px-2 py-1 text-xs border rounded" onClick={() => onChangeStatus(id, "todo")}>
            To Do
            </button>
            <button className="px-2 py-1 text-xs border rounded" onClick={() => onChangeStatus(id, "doing")}>
            Doing
            </button>
            <button className="px-2 py-1 text-xs border rounded" onClick={() => onChangeStatus(id, "done")}>
            Done
            </button>
        </div>
        </div>
    </>
  )
}
