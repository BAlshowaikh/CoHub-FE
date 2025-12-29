// This file will serve building the whole board container of the tasks 

// ---------- Imports --------
import KanbanColumn from "./KanbanColumn";

const KanbanBoard = (grouped, onChangeStatus) => {
    return(
        <>
        <div className="row g-4">
            <div className="col-12 col-lg-4">
                <KanbanColumn
                title="To Do"
                statusKey="todo"
                tasks={grouped.todo}
                onChangeStatus={onChangeStatus}
                />
            </div>

            <div className="col-12 col-lg-4">
                <KanbanColumn
                title="Doing"
                statusKey="doing"
                tasks={grouped.doing}
                onChangeStatus={onChangeStatus}
                />
            </div>

            <div className="col-12 col-lg-4">
                <KanbanColumn
                title="Done"
                statusKey="done"
                tasks={grouped.done}
                onChangeStatus={onChangeStatus}
                />
            </div>
        </div>
        </>
    )
}

export default KanbanBoard