
import { ArrowUpRight, BookOpen, Sparkles, Play } from 'lucide-react'
import './Hero.css'

const Hero = () => {
    return (
        <section className="home-hero" id="home">

            <div className="hero-content">

                <div className="hero-label">
                    <Sparkles size={19} fill="white" />
                    <span>SkillWeave Learning Platform</span>
                </div>

                <h1>
                    Learn once.
                    <span>Grow everywhere.</span>
                </h1>

                <p className="hero-description">
                    SkillWeave brings your learning goals, courses and
                    practical projects together in one intelligent space.
                    Learn new skills, track your progress and build your future.
                </p>

                <div className="hero-buttons">
                    <a href="/register" className="hero-btn-primary">
                        Get Started
                        <ArrowUpRight size={17} />
                    </a>

                    <a href="#platform" className="hero-btn-secondary">
                        <Play size={15} fill="currentColor" />
                        Explore Platform
                    </a>
                </div>

                <div className="hero-benefits">
                    <span>Personalized learning</span>
                    <span>Practical projects</span>
                    <span>Track your progress</span>
                </div>

            </div>

            {/* Dashboard preview */}

            <div className="hero-dashboard-wrapper">

                <div className="hero-dashboard">

                    <div className="dashboard-header">

                        <div className="dashboard-brand">
                            <span className="dashboard-logo">
                                <BookOpen size={16} />
                            </span>
                            SkillWeave
                        </div>

                        <div className="dashboard-search">
                            <span>⌕</span>
                            Search your learning...
                        </div>

                        <div className="dashboard-profile">N</div>

                    </div>

                    <div className="dashboard-body">

                        <aside className="dashboard-sidebar">
                            <div className="sidebar-active">
                                Overview
                            </div>
                            <div>My Learning</div>
                            <div>Learning Paths</div>
                            <div>Projects</div>
                            <div>My Progress</div>
                        </aside>

                        <div className="dashboard-main">

                            <div className="dashboard-welcome">
                                <div>
                                    <small>YOUR LEARNING SPACE</small>
                                    <h3>Welcome back!</h3>
                                    <p>Ready to make progress today?</p>
                                </div>

                                <span className="dashboard-streak">
                                    ✦ Keep learning
                                </span>
                            </div>

                            <div className="dashboard-stats">

                                <div className="stat-card">
                                    <span>Learning hours</span>
                                    <strong>24.5</strong>
                                    <small>This month</small>
                                </div>

                                <div className="stat-card">
                                    <span>Courses</span>
                                    <strong>08</strong>
                                    <small>In progress</small>
                                </div>

                                <div className="stat-card">
                                    <span>Goals achieved</span>
                                    <strong>72%</strong>
                                    <small>Weekly progress</small>
                                </div>

                            </div>

                            <div className="dashboard-section-title">
                                <strong>Continue learning</strong>
                                <span>View all ↗</span>
                            </div>

                            <div className="dashboard-courses">

                                <div className="dashboard-course">
                                    <div className="course-symbol purple">
                                        {'</>'}
                                    </div>
                                    <div>
                                        <strong>Frontend Development</strong>
                                        <span>12 lessons · 68% completed</span>
                                        <div className="course-progress">
                                            <i style={{ width: '68%' }} />
                                        </div>
                                    </div>
                                </div>

                                <div className="dashboard-course">
                                    <div className="course-symbol blue">
                                        JS
                                    </div>
                                    <div>
                                        <strong>JavaScript Fundamentals</strong>
                                        <span>18 lessons · 42% completed</span>
                                        <div className="course-progress">
                                            <i style={{ width: '42%' }} />
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    )
}

export default Hero
