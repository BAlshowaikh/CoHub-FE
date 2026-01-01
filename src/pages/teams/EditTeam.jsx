import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { GetEditTeamData, UpdateTeam } from "../../services/api/teams.api"
import "../../../src/assets/styles/teams.css"

const EditTeam = ({ user }) => {
  const { teamId } = useParams()
  const navigate = useNavigate()

  const [team, setTeam] = useState(null)
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getData = async () => {
      const data = await GetEditTeamData(teamId)
      setTeam(data.team)
      setUsers(data.users)
    }

    getData()
  }, [teamId])

  const handleChange = (e) => {
    setTeam({ ...team, [e.target.name]: e.target.value })
  }

  const handleMembersChange = (e) => {
    const selected = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    )

// https://stackoverflow.com/questions/5866169/how-to-get-all-selected-values-of-a-multiple-select-box

    setTeam({ ...team, members: selected })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await UpdateTeam(teamId, team)
    navigate(`/teams/${teamId}`)
  }

  if (!team) return <p>Loading...</p>

  return (
    <div className="teams-page">
      <h1>Edit Team</h1>

      <form onSubmit={handleSubmit}>
        <label>Team Name</label>
        <input name="name" value={team.name} onChange={handleChange} required />

        <label>Members</label>
        <select
          multiple
          value={team.members.map((mem) => mem._id || mem)}
          onChange={handleMembersChange}
        >
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.fullname} ({user.user_role})
            </option>
          ))}
        </select>

        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default EditTeam
