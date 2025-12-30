import { useEffect, useMemo, useState } from "react"
import { createProject } from "../../services/api/Projects.api"
import { GetTeams } from "../../services/api/teams.api"
import { getStoredUser, isPMUser } from "../../utils/user.utils"

const initialState = {
  name: "",
  description: "",
  deadline: "",
  status: "pending",
  Team_id: "",
}

const toDateInputValue = (value) => {
  if (!value) return ""
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return ""
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, "0")
  const dd = String(d.getDate()).padStart(2, "0")
  return `${yyyy}-${mm}-${dd}`
}

const ProjectFormModal = ({ show, onClose, onSaved }) => {
  const user = getStoredUser()
  const isPM = isPMUser(user)

  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState("")
  const [form, setForm] = useState(initialState)
  const [teams, setTeams] = useState([])

  // Load teams when modal opens
  useEffect(() => {
    const loadTeams = async () => {
      if (!show) return
      try {
        setErr("")
      const list = await GetTeams()
      setTeams(Array.isArray(list) ? list : (list?.data || []))

        setTeams(list)
      } catch (e) {
        setErr(e?.response?.data?.message || e.message || "Failed to load teams")
      }
    }

    loadTeams()
  }, [show])

  // Reset form on open
  useEffect(() => {
    if (!show) return
    setErr("")
    setForm({ ...initialState, deadline: toDateInputValue(null) })
  }, [show])

  const canSubmit = useMemo(() => {
    return Boolean(form.name.trim() && form.description.trim() && form.Team_id)
  }, [form])

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!isPM) {
      setErr("PM only can create projects")
      return
    }

    try {
      setErr("")
      setLoading(true)

      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        status: form.status,
        Team_id: form.Team_id,
        deadline: form.deadline ? new Date(form.deadline).toISOString() : null,
      }

      await createProject(payload)

      onSaved?.()
      onClose?.()
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || "Failed to create project")
    } finally {
      setLoading(false)
    }
  }

  if (!show) return null

  return (
    <div className="modal d-block" tabIndex="-1" role="dialog" onMouseDown={onClose}>
      <div className="modal-dialog modal-dialog-centered" role="document" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Project</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>

          <form onSubmit={onSubmit}>
            <div className="modal-body">
              {err ? (
                <div className="alert alert-danger py-2" role="alert">
                  {err}
                </div>
              ) : null}

              {!isPM ? (
                <div className="alert alert-warning py-2" role="alert">
                  PM only can add new projects.
                </div>
              ) : null}

              <div className="mb-3">
                <label className="form-label fw-semibold">Project Name</label>
                <input
                  className="form-control"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="e.g. E-commerce"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={form.description}
                  onChange={onChange}
                  placeholder="Write a short description..."
                  rows={4}
                  required
                />
              </div>

              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold">Deadline</label>
                  <input
                    className="form-control"
                    type="date"
                    name="deadline"
                    value={form.deadline}
                    onChange={onChange}
                  />
                  <div className="form-text">Optional</div>
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold">Status</label>
                  <select className="form-select" name="status" value={form.status} onChange={onChange}>
                    <option value="pending">pending</option>
                    <option value="On progress">On progress</option>
                    <option value="completed">completed</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold">Team</label>
                  <select className="form-select" name="Team_id" value={form.Team_id} onChange={onChange} required>
                    <option value="">Select team</option>
                    {teams.map((t) => (
                      <option key={t._id} value={t._id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                  <div className="form-text">
                    Only team members will be available as assignees when creating tasks in this project.
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" onClick={onClose} disabled={loading}>
                Cancel
              </button>
              <button type="submit" className="btn btn-dark" disabled={!canSubmit || loading || !isPM}>
                {loading ? "Saving..." : "Create Project"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProjectFormModal
