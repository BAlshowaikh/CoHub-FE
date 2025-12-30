import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { CreateTeam } from "../../services/api/teams.api"

const AddTeam = () => {
  const navigate = useNavigate()

  const [team, setTeam] = useState({
    name: "",
    description: "",
    members: [],
  })

  const handleChange = (e) => {
    setTeam({ ...team, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const created = await CreateTeam(team)
  navigate(`/teams/${created._id}`)
  }
  return (
    <div>
      <h1>Create Team</h1>

      <form onSubmit={handleSubmit}>
        <label>Team Name</label>
        <input name="name" value={team.name} onChange={handleChange} required />

        <label>Description</label>
        <input name="description" value={team.description} onChange={handleChange} required />

        <button type="submit">Create Team</button>
      </form>
    </div>
  )
}

export default AddTeam
