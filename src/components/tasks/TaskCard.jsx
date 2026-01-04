// This file will serve the creation of a task card shown in the kanban board

// ------------ Imports --------------
import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { getStoredUser, isPMUser } from "../../utils/user.utils"


// ----------- Helpers ----------
// ------ Helper 1: Change the task bg color based on the task's status --------
const getBgClass = (status) => {
  if (status === "todo") {
    return "bg-info-subtle"
  }
  if (status === "doing"){
    return "bg-warning-subtle"
  }
  if (status === "done") {
    return "bg-success-subtle"
  }
  return "bg-light"
}

// ---------- Helper 2: Format how the due date will be displayed ---------

const formatDueDate = (dueDate) => {
  if (!dueDate){ 
    return "No due date" 
}
  const d = new Date(dueDate);
  if (Number.isNaN(d.getTime())) return "No due date";
  return d.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" })
}

const TaskCard = ({task, index, onViewDetails, onEdit, onDelete, canEditAndDelete}) => {
    const id = String(task._id || task.id)
    const status = (task.status || "todo").toLowerCase()
    const assigneeName = task.assignedTo?.username || "Unassigned"
    const user = getStoredUser()
    const isPM = isPMUser(user)

    // Make the card draggable object
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({id})

    // Styling for the dragged card
    const style = {
        transform: CSS.Translate.toString(transform),
        cursor: "grab",
        opacity: isDragging ? 0.6 : 1,}

    return (
    <>
    <div ref={setNodeRef} style={style}>
      <div className={`task-card ${getBgClass(status)}`}>
        <div className="task-card-body">
          <div className="d-flex align-items-start justify-content-between gap-2">
            <div className="task-pill d-flex align-items-center gap-2">
              <span
                {...listeners}
                {...attributes}
                style={{ cursor: "grab" }}
                title="Drag"
              >
                <i className="bi bi-grip-vertical fs-4"></i>
              </span>

              <div style={{ fontWeight: 800, lineHeight: 1.2 }}>
                {task.title}
              </div>
            </div>

            <div className="task-number">Task No. {index}</div>
          </div>

          <div className="d-flex align-items-center justify-content-between mt-3">
            <div className="task-date">
              <i className="bi bi-calendar-event"></i>
              {formatDueDate(task.dueDate)}
            </div>
            <div className="text-muted fw-semibold" style={{ fontSize: 12 }}>
              Assignee: {assigneeName}
            </div>
            <span className="badge text-bg-dark text-uppercase">{status}</span>
          </div>

          <button
            type="button"
            className="btn btn-sm btn-outline-dark mt-3 w-100"
            onClick={() => onViewDetails(task._id || task.id)}
            onPointerDown={(e) => e.stopPropagation()}
          >
            View details
          </button>
          {
            // Action items (edit and delete)
          }
          {canEditAndDelete && (
            <div className="d-flex gap-2 mt-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-dark w-50"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onEdit?.(task._id || task.id)
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-danger w-50"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  // Call the delete function
                  onDelete?.(task._id || task.id)
                }}
              >
                Delete
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
    </>
    )
}

export default TaskCard