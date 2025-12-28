// Import the backend api
import Client from "./api"

export const tasksApi = {
    // When receive a /tasks?projectId URI
    async getTasksByProject(projectId){
        const res = await Client.get("/tasks", { params: { projectId } })
        return res.data
    },

    // When user filters the tasks to show only his taskd
     async getTasksByUser(userId) {
        const res = await Client.get(`/tasks/user/${userId}`)
        return res.data 
    },

    // When a task card is being clicked
    async getTaskDetails(taskId) {
        const res = await Client.get(`/tasks/${taskId}`)
        return res.data
    },

    // When a PM clicks edit a task
    async updateTask(taskId, payload) {
        const res = await Client.put(`/tasks/${taskId}`, payload)
        return res.data
    },  
    
    // Update only the task status (for PM and emp)
    async updateTaskStatus(taskId, status) {
        const res = await Client.put(`/tasks/${taskId}/status`, { status })
        return res.data
    },

    async deleteTask(taskId) {
        const res = await Client.delete(`/tasks/${taskId}`)
        return res.data
    },
}