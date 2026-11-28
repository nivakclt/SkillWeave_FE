import {
  createContext,
  useState,
  useEffect,
  useContext
} from "react"
import axiosInstance from "../api/axiosInstance"

// Create authentication context
const AuthContext = createContext(null)

// Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check whether the user is already logged in
  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token")

      if (!token) {
        setLoading(false)
        return
      }

      try {
        const response = await axiosInstance.get("/profile")
        const userData = response.data.user

        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
      } catch (error) {
        console.log(
          "Authentication error:",
          error.response?.data || error.message
        )

        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    verifyUser()
  }, [])

  // Store user details after successful login
  const login = (token, userData) => {
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(userData))
    setUser(userData)
  }

  // Clear authentication data during logout
  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
  }

  // Refresh user profile after instructor approval
  const refreshProfile = async () => {
    try {
      const response = await axiosInstance.get("/profile")
      const updatedUser = response.data.user

      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))

      return updatedUser
    } catch (error) {
      console.error(
        "Profile refresh failed:",
        error.response?.data || error.message
      )

      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        refreshProfile,
        isAutheticated: !!user,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to access authentication data
export function useAuth() {
  return useContext(AuthContext)
}