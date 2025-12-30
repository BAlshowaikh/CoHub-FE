// This modal will handle both states (add and edit for a task)

// ---------- Imports -------------
import { useEffect, useMemo, useState } from "react"
import { tasksApi } from "../../services/api/tasks.api"
import { getStoredUser, isPMUser } from "../../utils/user.utils"
import {getProjectAssignees} from "../../services/api/Projects.api"

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
      if (!show) {return}

      setErr("")

      // Load the assigned project's memebrs usernames
      const loadAssignees = async () => {
        const res = await getProjectAssignees(projectId)
        setAssignees(res.data || [])
      }

      if (mode === "create") {
        setTask(null)
        setForm(initialState)
        // Load the members
        await loadAssignees()
        return
      }

      if (mode === "edit" && taskId) {
        try {
          setLoading(true)
          const res = await tasksApi.getTaskDetails(taskId)
          const t = res?.data || null
          setTask(t)
          await loadAssignees()

          setForm({
            title: t?.title || "",
            description: t?.description || "",
            dueDate: toDateInputValue(t?.dueDate),
            assignedTo:
              typeof t?.assignedTo === "string"
                ? t.assignedTo
                : t?.assignedTo?._id || "",
          })
        } catch (e) {
          setErr(e?.response?.data?.message || e.message || "Failed to load task")
        } finally {
          setLoading(false)
        }
      }
    }

    load()
  }, [show, mode, taskId, projectId])

  // ---------- Constraints: can edit only if PM + status todo ----------
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

    // Allow only PM to create and edit  a task 
    if (mode === "create" && !isPM) {
      setErr("Only PM can create tasks")
      return
    }
    if (mode === "edit" && !canEdit) {
      setErr("Only PM can edit, and only when status is TODO")
      return
    }

    const cleanTitle = form.title.trim()
    if (cleanTitle.length < 2) {
      setErr("Title must be at least 2 characters")
      return
    }

    try {
        setLoading(true)
        if (mode === "create") {
            await tasksApi.createTask({
                title: cleanTitle,
                description: form.description.trim(),
                dueDate: form.dueDate || null,
                assignedTo: form.assignedTo || null,
                projectId,
            })
        }
        if (mode === "edit") {
            await tasksApi.updateTask(taskId, {
                title: cleanTitle,
                description: form.description.trim(),
                dueDate: form.dueDate || null,
                assignedTo: form.assignedTo || null,
            })
        }

      if (onSaved) await onSaved()
      onClose()
    } catch (e2) {
      setErr(e2?.response?.data?.message || e2.message || "Failed to save task")
      if (onSaved) await onSaved()
    } finally {
      setLoading(false)
    }
  }

  if (!show) return null

  return (
    <>
      <div className="modal-backdrop fade show"></div>

      <div
        className="modal fade show"
        style={{ display: "block" }}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: 760 }}>
          <div
            className="modal-content rounded-4"
            style={{ border: "2px solid rgba(0,0,0,0.35)" }}
          >
            {/* Header */}
            <div className="d-flex align-items-center justify-content-between px-3 pt-3">
              <div className="fw-bold fs-4">{modalTitle}</div>

              <button
                type="button"
                className="btn btn-link text-dark p-0"
                onClick={onClose}
                title="Close"
              >
                <i className="bi bi-x-lg fs-4"></i>
              </button>
            </div>

            <hr className="my-2" />

            {/* Body */}
            <div className="modal-body px-4 pb-4">
              {/* Errors */}
              {err ? <div className="alert alert-danger">{err}</div> : null}

              {/* Mode constraints message */}
              {mode === "create" && !isPM ? (
                <div className="alert alert-warning">
                  Only PM can create tasks
                </div>
              ) : null}

              {mode === "edit" && !canEdit ? (
                <div className="alert alert-warning">
                  Only PM can edit and only when the task status is TODO
                </div>
              ) : null}

              {/* Form */}
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
                      placeholder="Enter task title"
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
                      placeholder="Enter task description"
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

                {/* Assigned To */}
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
                      Current assignee:{" "}
                      <b>
                        {typeof task?.assignedTo === "string"
                          ? task.assignedTo
                          : task?.assignedTo?.username || "Unassigned"}
                      </b>
                    </div>
                  </div>
                </div>

                {/* Footer buttons */}
                <div className="d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={onClose}
                    disabled={loading}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-dark"
                    disabled={isDisabled}
                  >
                    {loading ? "Saving..." : mode === "create" ? "Create Task" : "Save Changes"}
                  </button>
                </div>

                {/* Show current status in edit mode */}
                {mode === "edit" ? (
                  <div className="mt-3 text-muted">
                    Current status: <b className="text-uppercase">{task?.status || "—"}</b>
                  </div>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TaskFormModal
