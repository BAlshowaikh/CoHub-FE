import Client from "../api"


export const GetTeams = async () => {
  const res = await Client.get("/teams")
  return res.data
}


export const GetTeamById = async (teamId) => {
  const res = await Client.get(`/teams/${teamId}`)
  return res.data
}


export const CreateTeam = async (data) => {
  const res = await Client.post("/teams", data)
  return res.data
}


export const UpdateTeam = async (teamId, data) => {
  const res = await Client.put(`/teams/${teamId}`, data)
  return res.data
}


export const DeleteTeam = async (teamId) => {
  const res = await Client.delete(`/teams/${teamId}`)
  return res.data
}


export const GetEditTeamData = async (teamId) => {
  const res = await Client.get(`/teams/${teamId}/edit`)
  return res.data
}
