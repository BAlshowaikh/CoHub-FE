// This file will serve building the whole board container of the tasks 

// ---------- Imports --------
import { DndContext } from "@dnd-kit/core"
import KanbanColumn from "./KanbanColumn"

const KanbanBoard = ({grouped, onDropTask, onViewDetails, onEditTask } ) => {
    // ------ Functions -------

    // ----------- Function 1: To handle the dragging of tasks between the columns
    const handleDragEnd = (event) =>{
        const {active, over } = event

        // If there is no droppable col return
        if (!over){
            return
        }

        const taskId = String(active.id)
        const nextStatus = String(over.id)

        // Send the info to the function 
        onDropTask(taskId, nextStatus)

    }

    return(
        <>
        <DndContext onDragEnd={handleDragEnd}>
            <div className="row g-4">
                <div className="col-12 col-lg-4">
                    <KanbanColumn
                    title="To Do"
                    statusKey="todo"
                    tasks={grouped.todo}
                    onViewDetails={onViewDetails}
                    onEditTask={onEditTask}
                    />
                </div>

                <div className="col-12 col-lg-4">
                    <KanbanColumn
                    title="Doing"
                    statusKey="doing"
                    tasks={grouped.doing}
                    onViewDetails={onViewDetails}
                    onEditTask={onEditTask}
                    />
                </div>

                <div className="col-12 col-lg-4">
                    <KanbanColumn
                    title="Done"
                    statusKey="done"
                    tasks={grouped.done}
                    onViewDetails={onViewDetails}
                    onEditTask={onEditTask}
                    />
                </div>
            </div>
        </DndContext>
        </>
    )
}

export default KanbanBoard