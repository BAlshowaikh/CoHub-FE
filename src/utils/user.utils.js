// --------- File to act as a helper for user managemnet ---------

// Get the
export const getStoredUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Check if logged in user is pm
export const isPMUser = (user) => {
  if (!user) return false
  const role = (user.user_role || "").toLowerCase()
  return role === "pm"
}
