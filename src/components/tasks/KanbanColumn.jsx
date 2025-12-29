// This file will serve building a column in the kanban board 
// It will be used in the KanbanBoard.jsx file to build 3 columns ("todo", "doing", "done ")

// -------- Imports --------
import TaskCard from "./TaskCard"

const KanbanColumn = (title, tasks, onChangeStatus) => {
    return(
        <>
        <div className="kanban-col p-3">
            <div className="kanban-col-header mb-3">
                {title}
                <span className="kanban-count">{tasks.length}</span>
            </div>

            <div className="d-flex flex-column gap-3">
                {tasks.length === 0 ? (
                <div className="text-center text-muted py-4">No tasks</div>
                ) : (
                tasks.map((task, index) => (
                    <TaskCard
                    key={task._id || task.id}
                    task={task}
                    index={index + 1}
                    onChangeStatus={onChangeStatus}
                    />
                ))
                )}
            </div>
        </div>
        </>
    )
}

export default KanbanColumn