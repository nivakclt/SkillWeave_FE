
import { ArrowUpRight, BookOpen, Sparkles, Play, Code2, Brain, Rocket, Star, Quote } from 'lucide-react'
import './Hero.css'

const Hero = () => {
    const showcaseItems = [
        {
            number: '01',
            title: 'Learn with structure',
            description: 'Follow organized learning paths designed to help you build knowledge step by step.',
            icon: <BookOpen size={25} />,
            tag: 'PERSONALIZED LEARNING'
        },
        {
            number: '02',
            title: 'Build real skills',
            description: 'Turn what you learn into practical projects and gain hands-on experience.',
            icon: <Code2 size={25} />,
            tag: 'PRACTICAL EXPERIENCE'
        },
        {
            number: '03',
            title: 'Learn smarter',
            description: 'Discover learning recommendations that help you focus on the skills that matter.',
            icon: <Brain size={25} />,
            tag: 'SMART RECOMMENDATIONS'
        },
        {
            number: '04',
            title: 'Grow with confidence',
            description: 'Track your progress, achieve your goals and keep moving towards your future.',
            icon: <Rocket size={25} />,
            tag: 'TRACK YOUR GROWTH'
        }
    ]

    const testimonials = [
        {
            name: 'Alex Morgan',
            role: 'Frontend Learner',
            initials: 'AM',
            review: 'A structured way to learn new skills and keep track of my progress. The learning paths make everything easier to follow.'
        },
        {
            name: 'Sarah Johnson',
            role: 'Computer Science Student',
            initials: 'SJ',
            review: 'I like having courses, practical projects and progress tracking in one place. It makes learning feel more organized.'
        },
        {
            name: 'Daniel Thomas',
            role: 'Aspiring Developer',
            initials: 'DT',
            review: 'SkillWeave gives me a clear direction for learning and building projects. It helps me stay focused on my goals.'
        }
    ]

    return (
        <>
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

            {/* SCROLL SHOWCASE */}

            <section className="showcase-section" id="platform">

                <div className="showcase-heading">
                    <span className="showcase-eyebrow">
                        <Sparkles size={15} /> THE SKILLWEAVE EXPERIENCE
                    </span>

                    <h2>
                        Everything you need.
                        <span>One learning journey.</span>
                    </h2>

                    <p>
                        A smarter way to learn, practice and grow.
                        Everything comes together in one place.
                    </p>
                </div>

                <div className="showcase-list">

                    {showcaseItems.map((item) => (
                        <div className="showcase-card" key={item.number}>

                            <div className="showcase-card-top">
                                <span className="showcase-number">
                                    {item.number}
                                </span>

                                <span className="showcase-icon">
                                    {item.icon}
                                </span>
                            </div>

                            <span className="showcase-tag">
                                {item.tag}
                            </span>

                            <h3>{item.title}</h3>

                            <p>{item.description}</p>

                            <div className="showcase-card-line" />

                        </div>
                    ))}

                </div>

            </section>

            {/* TESTIMONIALS */}

            <section className="testimonial-section" id="testimonials">

                <div className="testimonial-heading">

                    <span className="testimonial-eyebrow">
                        <Quote size={15} /> LEARNING EXPERIENCES
                    </span>

                    <h2>
                        Growing together.
                        <span>Learning every day.</span>
                    </h2>

                    <p>
                        A learning experience designed to keep you motivated
                        throughout your journey.
                    </p>

                </div>

                <div className="testimonial-grid">

                    {testimonials.map((item) => (
                        <article className="testimonial-card" key={item.name}>

                            <div className="testimonial-stars">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        size={16}
                                        fill="currentColor"
                                    />
                                ))}
                            </div>

                            <p className="testimonial-review">
                                "{item.review}"
                            </p>

                            <div className="testimonial-person">

                                <div className="testimonial-avatar">
                                    {item.initials}
                                </div>

                                <div>
                                    <h4>{item.name}</h4>
                                    <span>{item.role}</span>
                                </div>

                            </div>

                        </article>
                    ))}

                </div>

            </section>
        </>
    )
}

export default Hero
