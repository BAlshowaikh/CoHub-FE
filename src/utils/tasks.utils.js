
// -------------- Function 1: Grouping tasks for kanabn -------------
// This file helps grouping a list of tasks by their status
export const STATUSES = ["todo", "doing", "done"]

// Accepts an array of tasks and group them into predefined status, then each task is placed into the correct buckets
//The returned object always contains all status keys, even if no tasks
// exist for a given status
export const groupByStatus = (tasks = []) => {
    // Start with empty bucket
    const initialBuckets = { todo: [], doing: [], done: [] };
    return tasks.reduce(
        (organizedMap, currentTask) => {
            const key = STATUSES.includes(currentTask.status) ? currentTask.status : "todo";
            organizedMap[key].push(currentTask)
            return organizedMap
        },initialBuckets)
}
