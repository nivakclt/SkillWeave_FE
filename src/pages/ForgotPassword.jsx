
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'
import axiosInstance from '../api/axiosInstance'
import toast from 'react-hot-toast'

function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)

            const response = await axiosInstance.post('/forgot-password', {
                email
            })

            toast.success(response.data.message || 'Reset link sent to your email!')
            setEmail('')
        } catch (error) {
            toast.error(
                error.response?.data?.message || 'Unable to send reset link.'
            )
        } finally {
            setLoading(false)
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
                        <h1>Forgot Password?</h1>

                        <p className="auth-subtitle">
                            Don't worry! Enter your registered email address
                            and we'll send you a password reset link.
                        </p>

                        <form onSubmit={handleSubmit}>
                            <div className="auth-field">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    placeholder="Enter your registered email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="auth-submit"
                                disabled={loading}
                            >
                                {loading ? 'Sending...' : 'Send Reset Link'}
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
    )
}

export default ForgotPassword
