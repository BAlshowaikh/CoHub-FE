import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { GetTeamById, DeleteTeam } from "../../services/api/teams.api"
import "../../../src/assets/styles/teams.css"
import TeamMembers from "../../components/teams/TeamMembers"
import TeamRole from "../../components/teams/TeamRole"

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

      <TeamMembers team={team} />
<TeamRole user={user} team={team} handleDelete={handleDelete} />


    </div>
  )
}

export default TeamDetails

