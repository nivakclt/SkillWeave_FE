
import {
  BookOpen,
  Users,
  IndianRupee,
  Star,
  Plus,
  ArrowUpRight,
  MoreHorizontal,
  Clock,
  GraduationCap,
  TrendingUp
} from 'lucide-react'

function InstructorDashboard() {
  const stats = [
    {
      title: 'Total Courses',
      value: '08',
      change: '+2 this month',
      icon: BookOpen,
      color: 'purple'
    },
    {
      title: 'Total Students',
      value: '1,248',
      change: '+12.5% this month',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Total Revenue',
      value: '₹24,500',
      change: '+8.2% this month',
      icon: IndianRupee,
      color: 'green'
    },
    {
      title: 'Average Rating',
      value: '4.8',
      change: 'From 320 reviews',
      icon: Star,
      color: 'orange'
    }
  ]

  const courses = [
    {
      title: 'Complete React.js Development',
      category: 'Web Development',
      students: 420,
      progress: 85,
      rating: 4.9,
      color: 'purple'
    },
    {
      title: 'JavaScript Fundamentals',
      category: 'Programming',
      students: 315,
      progress: 68,
      rating: 4.8,
      color: 'blue'
    },
    {
      title: 'UI/UX Design Essentials',
      category: 'Design',
      students: 280,
      progress: 52,
      rating: 4.7,
      color: 'orange'
    }
  ]

  const enrollments = [
    {
      name: 'Ananya Sharma',
      course: 'Complete React.js Development',
      date: 'Today, 10:30 AM',
      initials: 'AS',
      color: 'purple'
    },
    {
      name: 'Rahul Menon',
      course: 'JavaScript Fundamentals',
      date: 'Today, 09:15 AM',
      initials: 'RM',
      color: 'blue'
    },
    {
      name: 'Meera Nair',
      course: 'UI/UX Design Essentials',
      date: 'Yesterday',
      initials: 'MN',
      color: 'pink'
    },
    {
      name: 'Arjun Das',
      course: 'Complete React.js Development',
      date: 'Yesterday',
      initials: 'AD',
      color: 'green'
    }
  ]

  const activities = [
    {
      title: 'New student enrolled',
      description: 'Ananya joined Complete React.js Development',
      time: '10 minutes ago',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'New course review',
      description: 'You received a 5-star review',
      time: '2 hours ago',
      icon: Star,
      color: 'orange'
    },
    {
      title: 'Quiz completed',
      description: '35 students completed React Basics Quiz',
      time: 'Yesterday',
      icon: GraduationCap,
      color: 'purple'
    }
  ]

  return (
    <div className="instructor-dashboard">

      {/* Welcome Section */}
      <section className="instructor-welcome">
        <div className="instructor-welcome-content">
          <p className="instructor-welcome-label">
            INSTRUCTOR OVERVIEW
          </p>

          <h1>
            Welcome back, <span>Instructor!</span>
          </h1>

          <p>
            Here's what's happening with your courses and students today.
          </p>

          <button
            className="instructor-create-btn"
            onClick={() => {
              window.location.href = '/instructor/create-course'
            }}
          >
            <Plus size={17} />
            Create New Course
          </button>
        </div>

        <div className="instructor-welcome-decoration">
          <div className="instructor-welcome-circle circle-one" />
          <div className="instructor-welcome-circle circle-two" />

          <div className="instructor-welcome-icon">
            <GraduationCap size={65} strokeWidth={1.3} />
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="instructor-stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <article className="instructor-stat-card" key={stat.title}>
              <div className="instructor-stat-top">
                <div className={`instructor-stat-icon ${stat.color}`}>
                  <Icon size={20} />
                </div>

                <MoreHorizontal size={19} className="instructor-stat-more" />
              </div>

              <p>{stat.title}</p>

              <h2>{stat.value}</h2>

              <span className="instructor-stat-change">
                <TrendingUp size={13} />
                {stat.change}
              </span>
            </article>
          )
        })}
      </section>

      {/* Course Performance */}
      <section className="instructor-dashboard-section">

        <div className="instructor-section-heading">
          <div>
            <h2>Course Performance</h2>
            <p>Monitor how your courses are performing.</p>
          </div>

          <button
            className="instructor-view-all"
            onClick={() => {
              window.location.href = '/instructor/courses'
            }}
          >
            View all courses <ArrowUpRight size={15} />
          </button>
        </div>

        <div className="instructor-course-list">
          {courses.map((course) => (
            <article className="instructor-course-item" key={course.title}>

              <div className={`instructor-course-symbol ${course.color}`}>
                <BookOpen size={22} />
              </div>

              <div className="instructor-course-details">
                <div className="instructor-course-title-row">
                  <div>
                    <h3>{course.title}</h3>
                    <span>{course.category}</span>
                  </div>

                  <button
                    className="instructor-course-more"
                    aria-label={`More options for ${course.title}`}
                  >
                    <MoreHorizontal size={20} />
                  </button>
                </div>

                <div className="instructor-course-meta">
                  <span>
                    <Users size={14} /> {course.students} Students
                  </span>

                  <span>
                    <Star size={14} /> {course.rating}
                  </span>
                </div>

                <div className="instructor-course-progress-row">
                  <div className="instructor-course-progress">
                    <div
                      className={course.color}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>

                  <span>{course.progress}% completion</span>
                </div>
              </div>

            </article>
          ))}
        </div>
      </section>

      {/* Bottom Dashboard */}
      <div className="instructor-dashboard-bottom">

        {/* Recent Enrollments */}
        <section className="instructor-dashboard-panel">

          <div className="instructor-section-heading">
            <div>
              <h2>Recent Enrollments</h2>
              <p>Students who recently joined your courses.</p>
            </div>

            <button className="instructor-small-view">
              View all
            </button>
          </div>

          <div className="instructor-enrollment-list">
            {enrollments.map((student) => (
              <div className="instructor-enrollment-item" key={student.name}>

                <div className={`instructor-student-avatar ${student.color}`}>
                  {student.initials}
                </div>

                <div className="instructor-enrollment-info">
                  <h4>{student.name}</h4>
                  <p>{student.course}</p>
                </div>

                <span className="instructor-enrollment-date">
                  <Clock size={12} />
                  {student.date}
                </span>

              </div>
            ))}
          </div>

        </section>

        {/* Recent Activity */}
        <section className="instructor-dashboard-panel">

          <div className="instructor-section-heading">
            <div>
              <h2>Recent Activity</h2>
              <p>Your latest teaching updates.</p>
            </div>
          </div>

          <div className="instructor-activity-list">
            {activities.map((activity) => {
              const Icon = activity.icon

              return (
                <div className="instructor-activity-item" key={activity.title}>

                  <div className={`instructor-activity-icon ${activity.color}`}>
                    <Icon size={17} />
                  </div>

                  <div className="instructor-activity-info">
                    <h4>{activity.title}</h4>
                    <p>{activity.description}</p>
                    <span>{activity.time}</span>
                  </div>

                </div>
              )
            })}
          </div>

        </section>

      </div>

    </div>
  )
}

export default InstructorDashboard
