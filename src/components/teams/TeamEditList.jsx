import { Link } from "react-router-dom"
const TeamEditList = ({team,user}) => {

return (
<li key={team._id}>
      <Link to={`/teams/${team._id}`}>{team.name}</Link>

      {user.role === "Manager" || user.role === "PM" && (
        <>
          <Link to={`/teams/${team._id}/edit`}>
            <button>Edit</button>
          </Link>
        </>
      )}
    </li>
)}
export default TeamEditList
