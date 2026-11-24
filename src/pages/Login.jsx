import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from 'framer-motion'
import { BookOpen, Eye, EyeOff, GraduationCap, Sparkles } from 'lucide-react'
import { useNavigate } from "react-router-dom"
import axiosInstance from "../api/axiosInstance"
import toast from "react-hot-toast"
import { useAuth } from "../context/AuthContext"

function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const[formData,setFormData]=useState({
    email:"",password:""
  })
  const[showPassword,setShowPassword]=useState(false)
  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })
}
  const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
      const response = await axiosInstance.post('/login',formData)
      // save authentication details
      localStorage.setItem('token',response.data.token)
      localStorage.setItem('user',JSON.stringify(response.data.user))
      toast.success(response.data.message || "Login Successfull")
      navigate('/')
    }catch(error){
      toast.error(
        error.response?.data?.message || 'Login Failed. Please try again.')
    }
  }
  return (
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
                        <h1>Welcome Back!</h1>

                        <p className="auth-subtitle">
                            Continue your learning journey with SkillWeave.
                        </p>

                        <form onSubmit={handleSubmit}>
                            <div className="auth-field">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required  />
                            </div>

                            <div className="auth-field">
                                <label>Password</label>

                                <div className="password-wrapper">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
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

                            <div className="auth-forgot-link">
                                <Link to="/forgot-password">
                                    Forgot Password?
                                </Link>
                            </div>

                            <button type="submit" className="auth-submit">
                                Login
                            </button>
                        </form>

                        <p className="auth-login-link">
                            Don't have an account? <Link to="/register">Register</Link>
                        </p>
                    </div>

                    <p className="auth-bottom-text">
                        © 2026 SkillWeave. All rights reserved.
                    </p>
                </section>

                <section className="auth-right">
                    <div className="auth-promo-content">
                        <span className="auth-promo-icon">
                            <GraduationCap size={25} />
                        </span>

                        <h2>
                            Learn smarter.
                            <br />
                            Grow further.
                        </h2>

                        <p>
                            Pick up where you left off.
                            Keep learning, improving and achieving your goals.
                        </p>

                        <div className="auth-3d-scene">
                            <div className="auth-orbit auth-orbit-one"></div>
                            <div className="auth-orbit auth-orbit-two"></div>

                            <div className="auth-floating-card auth-card-left">
                                <Sparkles size={20} />
                                <span>Learn. Grow. Achieve.</span>
                            </div>

                            <div className="auth-floating-card auth-card-right">
                                <BookOpen size={22} />
                                <span>Keep learning</span>
                            </div>

                            <div className="auth-book">
                                <BookOpen size={115} strokeWidth={1} />
                            </div>

                            <div className="auth-cap">
                                <GraduationCap size={95} strokeWidth={1.2} />
                            </div>

                            <span className="auth-glow auth-glow-one"></span>
                            <span className="auth-glow auth-glow-two"></span>
                            <span className="auth-glow auth-glow-three"></span>
                        </div>
                    </div>

                    <span className="auth-promo-footer">
                        YOUR JOURNEY. YOUR PROGRESS. YOUR FUTURE.
                    </span>
                </section>
            </motion.div>
        </main>
  )
}

export default Login