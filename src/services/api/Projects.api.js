import Client from "../api"

export const GetAllProjects = async () => {
  try {
    const res = await Client.get("/project")
    return res.data
  } catch (error) {
    throw error
  }
}

export const getProject = async (projectId) => {
  try {
    const res = await Client.get(`/project/${projectId}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const updateProject = async (projectId,data) => {
  try {
    const res = await Client.put(`/project/${projectId}`,data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const deleteProject = async (projectId) => {
  try {
    const res = await Client.delete(`/project/${projectId}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const createProject = async (data) => {
  try {
    const res = await Client.post("/project",data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const getProjectAssignees = async (projectId) => {
  try {
    const res = await Client.get(`/project/${projectId}/assignees`)
    res.data
  } catch (error) {
    throw error
  }
}