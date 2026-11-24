import { useState } from "react";
import { Link,useParams,useNavigate } from "react-router-dom";
import { motion } from 'framer-motion'
import { BookOpen,Eye,EyeOff } from "lucide-react";
import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";

function ResetPassword(){
     {/* Get token from the URL */}
        const {token}=useParams()
        const navigate = useNavigate()

        const [password,setPassword]=useState('')
        const [confirmPassword,setConfirmPassword]=useState('')
        const [showPassword,setShowPassword]=useState(false)
        const [showConfirmPassword,setShowConfirmPassword]=useState(false)
        const handleSubmit = async(e)=>{
            e.preventDefault()
            if(password !== confirmPassword){
                return toast.error('Passwords do not match')
            }
            try{
                const response = await axiosInstance.post(`/reset-password/${token}`,{password})
                toast.success(response.data.message || 'Password reset Successful!')
                navigate('/login')
            }catch(error){
                toast.error(error.response?.data?.message || 'Unable to reset Password')
            }
        }   
         return(
        <>
         <main className="auth-page">
            <motion.div
                className="auth-container"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <section className="auth-left">
                    <Link to="/" className="auth-brand">
                        <span className="auth-brand-icon">
                            <BookOpen size={20} />
                        </span>
                        SkillWeave
                    </Link>

                    <div className="auth-form-content">
                        <h1>Reset Password</h1>

                        <p className="auth-subtitle">
                            Create a new password for your SkillWeave account.
                        </p>

                        <form onSubmit={handleSubmit}>
                            <div className="auth-field">
                                <label>New Password</label>

                                <div className="password-wrapper">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter new password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />

                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword
                                            ? <EyeOff size={18} />
                                            : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="auth-field">
                                <label>Confirm Password</label>

                                <div className="password-wrapper">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="Confirm new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />

                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword
                                            ? <EyeOff size={18} />
                                            : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                            <button type="submit"  className="auth-submit">
                                Submit
                            </button>
                        </form>

                        <p className="auth-login-link">
                            Remember your password? <Link to="/login">Login</Link>
                        </p>
                    </div>

                    <p className="auth-bottom-text">
                        © 2026 SkillWeave. All rights reserved.
                    </p>
                </section>
            </motion.div>
        </main>
    
        </>
    )
}
export default ResetPassword