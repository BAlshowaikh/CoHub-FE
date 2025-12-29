// This file will serve the kanban toolbar like:
// Add Task + Search for a task + Filter

const KanbanToolbar = ({search, onSearchChange, onMyTasks,onAddTask}) => {
    return(
        <>
            <div className="kanban-toolbar d-flex align-items-center justify-content-between gap-3 flex-wrap mb-4">
            <button type="button" className="btn btn-outline-dark d-inline-flex align-items-center gap-2" onClick={onAddTask}>
                <i className="bi bi-plus-lg"></i>
                Add Task
            </button>

            <div className="d-flex align-items-center gap-3 ms-auto">
                <div className="search-wrap">
                <i className="bi bi-search"></i>
                <input
                    className="form-control kanban-search"
                    placeholder="Search for a task..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    style={{ width: 320 }}
                />
                </div>

                <button type="button" className="btn btn-dark" onClick={onMyTasks}>
                My Tasks
                </button>
            </div>
            </div>       
        </>
    )
}

export default KanbanToolbar