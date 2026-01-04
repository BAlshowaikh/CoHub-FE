import { useEffect, useState } from "react"
import { tasksApi } from "../../services/api/tasks.api"

/**
 * TaskDetailsModal
 * - Controlled modal: show + onClose from parent
 * - Fetches task details when opened
 */
const TaskDetailsModal = ({ show, taskId, onClose }) => {
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState("")
  const [task, setTask] = useState(null)

  useEffect(() => {
    const load = async () => {
      if (!show || !taskId) return

      try {
        setErr("")
        setLoading(true)

        const res = await tasksApi.getTaskDetails(taskId)
        // backend returns: { data: task }
        setTask(res?.data || null)
      } catch (e) {
        setErr(e?.response?.data?.message || e.message || "Failed to load task details")
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [show, taskId])

  if (!show) return null

  const title = task?.title || "Task"
  const description = task?.description || "—"
  const dueDate = formatDueDate(task?.dueDate)
  const status = (task?.status || "todo").toLowerCase()
  const assignedTo = formatAssignedTo(task?.assignedTo)

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop fade show"></div>

      {/* Modal */}
      <div className="modal fade show" style={{ display: "block" }} role="dialog" aria-modal="true">
        <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: 720 }}>
          <div className="modal-content rounded-4" style={{ border: "2px solid rgba(0,0,0,0.35)" }}>
            {/* Header row with edit icon (left) and close (right) */}
            <div className="d-flex align-items-center justify-content-between px-3 pt-3">
              <button type="button" className="btn btn-link text-dark p-0" onClick={onClose} title="Close">
                <i className="bi bi-x-lg fs-4"></i>
              </button>
            </div>

            <hr className="my-2" />

            <div className="modal-body px-4 pb-4">
              {loading ? (
                <div className="py-4">Loading...</div>
              ) : err ? (
                <div className="alert alert-danger">{err}</div>
              ) : (
                <>
                  <h2 className="fw-bold mb-4">{title}</h2>

                  {/* Description */}
                  <Field label="Description">
                    <p className="mb-0" style={{ lineHeight: 1.6 }}>
                      {description}
                    </p>
                  </Field>

                  {/* Due Date */}
                  <Field label="Due Date">
                    <div className="fw-semibold">{dueDate}</div>
                  </Field>

                  {/* Status */}
                  <Field label="Status">
                    <span className={`badge rounded-pill px-3 py-2 ${statusBadgeClass(status)}`}>
                      {statusLabel(status)}
                    </span>
                  </Field>

                  {/* Assigned To */}
                  <Field label="Assigned To">
                    <div className="fw-semibold">{assignedTo}</div>
                  </Field>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

/** Small layout helper to match your screenshot spacing */
const Field = ({ label, children }) => {
  return (
    <div className="row mb-4">
      <div className="col-4 col-md-3 text-muted fw-semibold">{label}</div>
      <div className="col">{children}</div>
    </div>
  )
}

const formatDueDate = (dueDate) => {
  if (!dueDate) return "—"
  const d = new Date(dueDate)
  if (Number.isNaN(d.getTime())) return "—"
  return d.toLocaleDateString(undefined, { day: "2-digit", month: "short" })
}

const statusLabel = (status) => {
  if (status === "todo") return "To Do"
  if (status === "doing") return "In Progress"
  if (status === "done") return "Done"
  return status;
}

const statusBadgeClass = (status) => {
  if (status === "doing") return "text-bg-primary-subtle text-primary"
  if (status === "todo") return "text-bg-secondary-subtle text-secondary"
  if (status === "done") return "text-bg-success-subtle text-success"
  return "text-bg-light"
}

const formatAssignedTo = (assignedTo) => {
  if (!assignedTo) return "—"
  if (typeof assignedTo === "string") return assignedTo
  return assignedTo.fullname || assignedTo.username || assignedTo.email || "—"
}

export default TaskDetailsModal