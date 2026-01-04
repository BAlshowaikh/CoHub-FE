// --------- File to act as a helper for user managemnet ---------

// Get the

export const getStoredUser = () => {
  try {
    const raw = localStorage.getItem("user")
    return raw ? JSON.parse(raw) : null
  } catch (e) {
    return null
  }
}

// Check if logged in user is pm
export const isPMUser = (user) => {
  const role = String(user?.role || user?.user_role || "").toLowerCase()
  return role === "pm"
}

