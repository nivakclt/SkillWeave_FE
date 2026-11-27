import { createContext,useState,useEffect,useContext } from "react"
import axiosInstance from "../api/axiosInstance"

// create authetication context
const AuthContext = createContext()

// Provider Component
export function AuthProvider({children}){
    const[user,setUser]=useState(null)
    const[loading,setLoading]=useState(true)

    // check whether the user is already logged in
    useEffect(()=>{
        const verifyUser = async ()=>{
            const token = localStorage.getItem('token')
            if(!token){
                return
            }
            try {
                const response = await axiosInstance.get('/profile')
                setUser(response.data.user)
                localStorage.setItem('user',JSON.stringify(response.data.user))
            } catch (error) {
                console.log('Authentication error :',error.response?.data)
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                setUser(null)
            }
            finally {
            setLoading(false)
            }
        }
        verifyUser()
    },[])

    // store user details after successful login
    const login =(token,userData)=>{
        localStorage.setItem("token",token)
        localStorage.setItem("user",JSON.stringify(userData))
        setUser(userData)
    }
    // clear authetication data during logout
    const logout=()=>{
        localStorage.removeItem("token")
        localStorage.removeItem('user')
        setUser(null)
    }
    return(
        <AuthContext.Provider value={{user,setUser,login,logout,isAutheticated:!!user,loading}}>
            {children}
        </AuthContext.Provider>
    )
}
{/* // Custom hook to access authentication data */}
export function useAuth() {
    return useContext(AuthContext)
}