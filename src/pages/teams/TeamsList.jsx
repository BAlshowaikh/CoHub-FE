import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { GetTeams } from "../../services/api/endpoints"


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
    <div>
      <h1>Teams</h1>

      <Link to={"/teams/add"}>
        <button>Create New Team</button>
      </Link>

      {teams.length === 0 && <p>No teams </p>}

<ul>
  {teams.map((team) => (
    <li key={team._id}>
      <Link to={`/teams/${team._id}`}>{team.name}</Link>

      {user.role === "Manager" && (
        <>
          <Link to={`/teams/${team._id}/edit`}>
            <button>Edit</button>
          </Link>
        </>
      )}
    </li>
  ))}
</ul>
    </div>
  )
}

export default TeamsList
