// This file will serve the creation of a task card shown in the kanban board

// ------------ Imports --------------
import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"

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
  return d.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
}

const TaskCard = ({task, index}) => {
    const id = String(task._id || task.id)
    const status = (task.status || "todo").toLowerCase()
    
    // Make the card draggable object
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({id})

    // Styling for the dragged card
    const style = {
        transform: CSS.Translate.toString(transform),
        cursor: "grab",
        opacity: isDragging ? 0.6 : 1,}

    return (
    <>
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
        <div className={`task-card ${getBgClass(status)}`}>
            <div className="task-card-body">
                <div className="d-flex align-items-start justify-content-between gap-2">
                    <div className="task-pill">
                        <i className="bi bi-person-circle fs-4"></i>
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
                    <span className="badge text-bg-dark text-uppercase">{status}</span>

                </div>
            </div>
        </div>  
    </div>  
    </>
    )
}