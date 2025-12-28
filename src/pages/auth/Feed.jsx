import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { GetTeams } from "../../services/api/endpoints"

const Feed = ({ user }) => {
  const navigate = useNavigate()
  const [teams, setTeams] = useState([])

  useEffect(() => {
    const obtainTeams = async () => {
      try {
        const data = await GetTeams()
        setTeams(data)
      } catch (error) {
        console.log("Failed to load teams", error)
      }
    }

    obtainTeams()
  }, [])

  if (!user) {
    return (
      <div className="protected">
        <h3> You must be signed in to do that </h3>
        <button onClick={() => navigate("/signin")}>Sign In</button>
      </div>
    )
  }

  return (
    <div>
      <h1>Welcome {user.name}</h1>
      <h2>Teams Overview</h2>

      {teams.length === 0 ? (
        <p>No teams available</p>
      ) : (
        <div className="grid col-3">
          {teams.map((team) => (
            <div className="card" key={team._id}>
              <h3>{team.name}</h3>

              <p>Members: {team.members ? team.members.length : 0}</p>

              <button onClick={() => navigate(`/teams/${team._id}`)}>
                View Team
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Feed
