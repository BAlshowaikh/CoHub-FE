 import { Link } from "react-router-dom"
 const TeamRole = ({user,team,handleDelete})=> {
  return (
    <>
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
    </>
  )
}
export default TeamRole
