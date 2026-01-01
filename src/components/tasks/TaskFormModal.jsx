// ---------- Imports -------------
import { useEffect, useMemo, useState } from "react"
import { tasksApi } from "../../services/api/tasks.api"
import { getStoredUser, isPMUser } from "../../utils/user.utils"
import { getProjectAssignees } from "../../services/api/Projects.api"

// ---------- Initial State ----------
const initialState = {
  title: "",
  description: "",
  dueDate: "",
  assignedTo: "",
}

const TaskFormModal = ({ show, mode, projectId, taskId, onClose, onSaved }) => {
  const user = getStoredUser()
  const isPM = isPMUser(user)

  // ---------- State ----------
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState("")
  const [task, setTask] = useState(null)
  const [form, setForm] = useState(initialState)
  const [assignees, setAssignees] = useState([])

  // ---------- Helpers ----------
  const toDateInputValue = (date) => {
    if (!date) return ""
    const d = new Date(date)
    if (Number.isNaN(d.getTime())) return ""
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, "0")
    const dd = String(d.getDate()).padStart(2, "0")
    return `${yyyy}-${mm}-${dd}`
  }

  const onChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  // ---------- Load task for edit mode ----------
  useEffect(() => {
    const load = async () => {
      if (!show) return

      setErr("")
      setLoading(true)

      try {
        // 1. Load the members FIRST.
        const resMembers = await getProjectAssignees(projectId)
        const membersList = resMembers.data || []
        setAssignees(membersList)

        if (mode === "create") {
          setTask(null)
          setForm(initialState)
        } else if (mode === "edit" && taskId) {
          // 2. Load Task details AFTER assignees are in state
          const resTask = await tasksApi.getTaskDetails(taskId)
          const t = resTask?.data || null
          setTask(t)

          // 3. Extract the ID. Ensure it's a string to match the <option value={u._id}>
          let currentAssigneeId = ""
          if (t?.assignedTo) {
            // Check if it's an object { _id: "..." } or just the string ID
            currentAssigneeId = typeof t.assignedTo === "object" ? (t.assignedTo._id || t.assignedTo.id) : t.assignedTo
          }

          setForm({
            title: t?.title || "",
            description: t?.description || "",
            dueDate: toDateInputValue(t?.dueDate),
            assignedTo: String(currentAssigneeId || ""), // Force to string
          })
        }
      } catch (e) {
        // Only show error if it's NOT just the team warning (since you said members show up)
        const message = e?.response?.data?.message || e.message
        if (!message.includes("team assigned")) {
           setErr(message)
        }
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [show, mode, taskId, projectId])

  // ---------- Constraints ----------
  const canEdit = useMemo(() => {
    if (mode !== "edit") return true
    if (!isPM) return false
    const status = (task?.status || "").toLowerCase()
    return status === "todo"
  }, [mode, isPM, task])

  const modalTitle = mode === "create" ? "Add Task" : "Task Details"

  const isDisabled = useMemo(() => {
    if (loading) return true
    if (mode === "create") return !isPM
    if (mode === "edit") return !canEdit
    return false
  }, [loading, mode, isPM, canEdit])

  // ---------- Submit ----------
  const onSubmit = async (e) => {
    e.preventDefault()
    setErr("")

    try {
      setLoading(true)
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        dueDate: form.dueDate || null,
        assignedTo: form.assignedTo || null,
        projectId,
      }

      if (mode === "create") {
        await tasksApi.createTask(payload)
      } else {
        await tasksApi.updateTask(taskId, payload)
      }

      if (onSaved) await onSaved()
      onClose()
    } catch (e2) {
      setErr(e2?.response?.data?.message || e2.message || "Failed to save task")
    } finally {
      setLoading(false)
    }
  }

  if (!show) return null

  return (
    <>
      <div className="modal-backdrop fade show"></div>

      <div className="modal fade show" style={{ display: "block" }} role="dialog" aria-modal="true">
        <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: 760 }}>
          <div className="modal-content rounded-4" style={{ border: "2px solid rgba(0,0,0,0.35)" }}>
            
            {/* Header */}
            <div className="d-flex align-items-center justify-content-between px-3 pt-3">
              <div className="fw-bold fs-4">{modalTitle}</div>
              <button type="button" className="btn btn-link text-dark p-0" onClick={onClose}>
                <i className="bi bi-x-lg fs-4"></i>
              </button>
            </div>

            <hr className="my-2" />

            <div className="modal-body px-4 pb-4">
              {err && <div className="alert alert-danger">{err}</div>}

              <form onSubmit={onSubmit}>
                {/* Title */}
                <div className="row mb-4">
                  <div className="col-4 col-md-3 text-muted fw-semibold">Title</div>
                  <div className="col">
                    <input
                      className="form-control"
                      value={form.title}
                      onChange={(e) => onChange("title", e.target.value)}
                      disabled={isDisabled}
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="row mb-4">
                  <div className="col-4 col-md-3 text-muted fw-semibold">Description</div>
                  <div className="col">
                    <textarea
                      className="form-control"
                      rows={4}
                      value={form.description}
                      onChange={(e) => onChange("description", e.target.value)}
                      disabled={isDisabled}
                    />
                  </div>
                </div>

                {/* Due Date */}
                <div className="row mb-4">
                  <div className="col-4 col-md-3 text-muted fw-semibold">Due Date</div>
                  <div className="col">
                    <input
                      type="date"
                      className="form-control"
                      value={form.dueDate}
                      onChange={(e) => onChange("dueDate", e.target.value)}
                      disabled={isDisabled}
                    />
                  </div>
                </div>

                {/* Assigned To Dropdown */}
                <div className="row mb-4">
                  <div className="col-4 col-md-3 text-muted fw-semibold">Assigned To</div>
                  <div className="col">
                    <select
                      className="form-select"
                      value={form.assignedTo}
                      onChange={(e) => onChange("assignedTo", e.target.value)}
                      disabled={isDisabled}
                    >
                      <option value="">Unassigned</option>
                      {assignees.map((u) => (
                        <option key={u._id} value={u._id}>
                          {u.username}
                        </option>
                      ))}
                    </select>
                    <div className="form-text">
                      Current assignee: <b>{task?.assignedTo?.username || task?.assignedTo || "Unassigned"}</b>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <button type="button" className="btn btn-outline-dark" onClick={onClose} disabled={loading}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-dark" disabled={isDisabled}>
                    {loading ? "Saving..." : mode === "create" ? "Create Task" : "Save Changes"}
                  </button>
                </div>

                {mode === "edit" && (
                  <div className="mt-3 text-muted">
                    Current status: <b className="text-uppercase">{task?.status || "—"}</b>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TaskFormModal