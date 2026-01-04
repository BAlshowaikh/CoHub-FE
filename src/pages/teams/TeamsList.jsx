import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { GetTeams } from "../../services/api/teams.api"
import "../../../src/assets/styles/teams.css"
import TeamRole from "../../components/teams/TeamEditList"
import TeamEditList from "../../components/teams/TeamEditList"
const TeamsList = ({ user }) => {
  const [teams, setTeams] = useState([])

  useEffect(() => {
    const getTeams = async () => {
      const data = await GetTeams()
      setTeams(data)
    }
    getTeams()
  }, [])

  return (
    <div className="teams-page">
      <h1>Teams</h1>

      <Link to={"/teams/add"}>
        <button>Create New Team</button>
      </Link>

      {teams.length === 0 && <p>No teams </p>}

<ul>
  {teams.map((team) => (
    <TeamEditList key={team._id} team={team} user={user}
        />
  ))}
    </ul>
  </div>
)}

export default TeamsList

