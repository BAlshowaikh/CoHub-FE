const TeamMembers =({team}) => {
  return (
    <>

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
      </>
  )}

  export default TeamMembers
