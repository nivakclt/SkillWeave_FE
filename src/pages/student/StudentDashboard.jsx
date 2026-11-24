
import {
  BookOpen,
  Clock3,
  Trophy,
  Flame,
  ArrowUpRight,
  Play,
  MoreHorizontal,
  CheckCircle2,
  Target,
  CalendarDays
} from 'lucide-react'


function StudentDashboard() {
  const stats = [
    {
      title: 'Enrolled Courses',
      value: '08',
      change: '+2 this month',
      icon: BookOpen,
      color: 'purple'
    },
    {
      title: 'Learning Hours',
      value: '24.5h',
      change: '+12% this week',
      icon: Clock3,
      color: 'blue'
    },
    {
      title: 'Completed Lessons',
      value: '36',
      change: 'Keep going!',
      icon: CheckCircle2,
      color: 'green'
    },
    {
      title: 'Current Streak',
      value: '07 Days',
      change: 'Personal best: 12',
      icon: Flame,
      color: 'orange'
    }
  ]

  const courses = [
    {
      title: 'Complete React Development',
      category: 'FRONTEND DEVELOPMENT',
      instructor: 'Sarah Johnson',
      progress: 75,
      lessons: '18 / 24 lessons',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600'
    },
    {
      title: 'JavaScript Masterclass',
      category: 'PROGRAMMING',
      instructor: 'David Miller',
      progress: 45,
      lessons: '12 / 27 lessons',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600'
    }
  ]

  return (
    <div className="student-dashboard">

      {/* Welcome */}
      <section className="dashboard-welcome">
        <div>
          <p className="welcome-date">
            <CalendarDays size={14} /> MONDAY, NOVEMBER 25, 2026
          </p>

          <h1>Welcome back, Niva!</h1>

          <p className="welcome-description">
            Keep building your skills. You're making great progress.
          </p>
        </div>

        <div className="welcome-decoration">
          <div className="welcome-decoration-icon">
            <Trophy size={43} />
          </div>
          <span>Keep growing!</span>
        </div>
      </section>

      {/* Statistics */}
      <section className="dashboard-stats">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <article className="stat-card" key={stat.title}>
              <div className={`stat-icon ${stat.color}`}>
                <Icon size={21} />
              </div>

              <p>{stat.title}</p>
              <h2>{stat.value}</h2>
              <span>{stat.change}</span>
            </article>
          )
        })}
      </section>

      {/* Courses */}
      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <p className="section-eyebrow">YOUR LEARNING JOURNEY</p>
            <h2>Continue Learning</h2>
          </div>

          <a href="/student/courses" className="view-all">
            View all courses <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="dashboard-course-grid">
          {courses.map((course) => (
            <article className="dashboard-course-card" key={course.title}>
              <div className="course-image">
                <img src={course.image} alt={course.title} />

                <span className="course-category">
                  {course.category}
                </span>

                <button className="course-more">
                  <MoreHorizontal size={20} />
                </button>
              </div>

              <div className="course-card-content">
                <p className="course-instructor">
                  Instructor: {course.instructor}
                </p>

                <h3>{course.title}</h3>

                <div className="course-progress-info">
                  <span>Course Progress</span>
                  <strong>{course.progress}%</strong>
                </div>

                <div className="course-progress-track">
                  <div
                    className="course-progress-fill"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>

                <div className="course-card-footer">
                  <span>{course.lessons}</span>

                  <button className="continue-btn">
                    <Play size={14} fill="currentColor" />
                    Continue
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Learning Goal */}
      <section className="dashboard-bottom-grid">

        <article className="learning-goal-card">
          <div className="section-heading">
            <div>
              <p className="section-eyebrow">STAY CONSISTENT</p>
              <h2>Weekly Learning Goal</h2>
            </div>

            <Target size={22} />
          </div>

          <div className="goal-progress">
            <div className="goal-circle">
              <div>
                <strong>75%</strong>
                <span>Completed</span>
              </div>
            </div>

            <div className="goal-details">
              <h3>6 of 8 hours</h3>
              <p>You're almost there! Just 2 more hours to reach your weekly target.</p>
            </div>
          </div>
        </article>

        <article className="activity-card">
          <div className="section-heading">
            <div>
              <p className="section-eyebrow">YOUR PROGRESS</p>
              <h2>Recent Activity</h2>
            </div>

            <MoreHorizontal size={22} />
          </div>

          <div className="activity-item">
            <div className="activity-icon purple">
              <BookOpen size={18} />
            </div>

            <div>
              <h4>React Hooks</h4>
              <p>Completed a lesson</p>
            </div>

            <span>2h ago</span>
          </div>

          <div className="activity-item">
            <div className="activity-icon green">
              <CheckCircle2 size={18} />
            </div>

            <div>
              <h4>JavaScript Quiz</h4>
              <p>Scored 85%</p>
            </div>

            <span>Yesterday</span>
          </div>

          <div className="activity-item">
            <div className="activity-icon orange">
              <Flame size={18} />
            </div>

            <div>
              <h4>Learning Streak</h4>
              <p>7-day streak achieved</p>
            </div>

            <span>2 days ago</span>
          </div>
        </article>

      </section>

    </div>
  )
}

export default StudentDashboard
