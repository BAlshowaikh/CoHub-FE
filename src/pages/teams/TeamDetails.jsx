import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { GetTeamById, DeleteTeam } from "../../services/api/teams.api"
import "../../../src/assets/styles/teams.css"


const TeamDetails = ({ user }) => {
  const { teamId } = useParams()
  const navigate = useNavigate()

  const [team, setTeam] = useState(null)

  useEffect(() => {
    const getTeam = async () => {
      const data = await GetTeamById(teamId)
      setTeam(data)
    }
    getTeam()
  }, [teamId])

  const handleDelete = async () => {
    await DeleteTeam(teamId)
    navigate("/teams")
  }

  if (!team) return <p>Loading...</p>

  return (
    <div className="teams-page">
      <h1>Team Details</h1>

      <h2>{team.name}</h2>

      <h3>Members</h3>

      {team.members && team.members.length > 0 ? (
        <ul>
          {team.members.map((mem) => (
            <li key={mem._id}>
              {mem.fullname} — {mem.email} — {mem.user_role} — {mem.department}
            </li>
          ))}
        </ul>
      ) : (
        <p>No members assigned.</p>
      )}


      {user.role === "Manager" || user.role === "PM" && (
        <>
          <Link to={`/teams/${team._id}/edit`}>
            <button>Edit Team</button>
          </Link>

          <button onClick={handleDelete} style={{ color: "red" }}>
            Delete Team
          </button>
        </>
      )}
    </div>
  )
}

export default TeamDetails
