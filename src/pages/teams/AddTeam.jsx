import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { CreateTeam } from "../../services/api/endpoints"
import PATH from "../../routes/paths"

const AddTeam = () => {
  const navigate = useNavigate()

  const [team, setTeam] = useState({
    name: "",
    members: [],
  })

  const handleChange = (e) => {
    setTeam({ ...team, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await CreateTeam(team)
    navigate(PATH.TEAMS)
  }

  return (
    <div>
      <h1>Create Team</h1>

      <form onSubmit={handleSubmit}>
        <label>Team Name</label>
        <input name="name" value={team.name} onChange={handleChange} required />

        <button type="submit">Create Team</button>
      </form>
    </div>
  )
}

export default AddTeam
