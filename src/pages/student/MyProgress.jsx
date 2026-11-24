
import {
  TrendingUp, Clock3, BookOpen, Trophy, Target,
  CalendarDays, CheckCircle2, Award, Flame
} from 'lucide-react'

function MyProgress() {
  const stats = [
    { label: 'Learning Hours', value: '24.5h', change: '+12%', icon: Clock3 },
    { label: 'Lessons Completed', value: '36', change: '+8 this week', icon: BookOpen },
    { label: 'Courses Completed', value: '02', change: 'Out of 08', icon: Trophy },
    { label: 'Current Streak', value: '07 Days', change: 'Personal best: 12', icon: Flame }
  ]

  const weeklyActivity = [
    { day: 'Mon', hours: 1.5 },
    { day: 'Tue', hours: 2.5 },
    { day: 'Wed', hours: 1 },
    { day: 'Thu', hours: 3 },
    { day: 'Fri', hours: 2 },
    { day: 'Sat', hours: 3.5 },
    { day: 'Sun', hours: 1.5 }
  ]

  const courses = [
    { name: 'Complete React Development', progress: 75, completed: 18, total: 24 },
    { name: 'JavaScript Masterclass', progress: 45, completed: 12, total: 27 },
    { name: 'Node.js Backend Development', progress: 25, completed: 5, total: 20 },
    { name: 'UI/UX Design Fundamentals', progress: 100, completed: 20, total: 20 }
  ]

  const achievements = [
    { title: 'First Step', description: 'Completed your first lesson', icon: BookOpen, earned: true },
    { title: '7-Day Streak', description: 'Learned for 7 days in a row', icon: Flame, earned: true },
    { title: 'Quick Learner', description: 'Completed 10 lessons', icon: TrendingUp, earned: true },
    { title: 'Course Master', description: 'Completed 5 courses', icon: Award, earned: false }
  ]

  return (
    <div className="progress-page">

      <div className="progress-heading">
        <div>
          <p className="section-eyebrow">YOUR LEARNING JOURNEY</p>
          <h1>My Progress</h1>
          <p>Track your growth and celebrate every milestone.</p>
        </div>
        <div className="progress-date">
          <CalendarDays size={17} />
          <span>This Week</span>
        </div>
      </div>

      <div className="progress-stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <div className="progress-stat-card" key={stat.label}>
              <div className="progress-stat-top">
                <div className="progress-stat-icon">
                  <Icon size={20} />
                </div>
                <span><TrendingUp size={13} /> {stat.change}</span>
              </div>
              <h2>{stat.value}</h2>
              <p>{stat.label}</p>
            </div>
          )
        })}
      </div>

      <div className="progress-main-grid">

        <section className="progress-panel weekly-panel">
          <div className="progress-panel-heading">
            <div>
              <h2>Weekly Learning Activity</h2>
              <p>Your study hours throughout the week.</p>
            </div>
            <span className="weekly-total">15h total</span>
          </div>

          <div className="weekly-chart">
            {weeklyActivity.map((item) => (
              <div className="weekly-bar-item" key={item.day}>
                <span className="weekly-hours">{item.hours}h</span>
                <div className="weekly-bar-track">
                  <div
                    className="weekly-bar-fill"
                    style={{ height: `${(item.hours / 4) * 100}%` }}
                  />
                </div>
                <span className="weekly-day">{item.day}</span>
              </div>
            ))}
          </div>

          <div className="weekly-chart-note">
            <span />
            Daily learning hours
          </div>
        </section>

        <section className="progress-panel goal-panel">
          <div className="progress-panel-heading">
            <div>
              <h2>Weekly Goal</h2>
              <p>Keep your learning consistent.</p>
            </div>
            <Target size={21} color="#8067dc" />
          </div>

          <div className="goal-circle-wrap">
            <div className="goal-circle">
              <div>
                <strong>75%</strong>
                <span>Completed</span>
              </div>
            </div>
          </div>

          <h3>6 of 8 hours</h3>
          <p className="goal-message">You're doing great! Just 2 more hours to reach your weekly goal.</p>
        </section>

      </div>

      <section className="progress-panel course-progress-panel">
        <div className="progress-panel-heading">
          <div>
            <h2>Course Completion</h2>
            <p>See how far you've progressed in each course.</p>
          </div>
          <BookOpen size={21} color="#8067dc" />
        </div>

        <div className="course-progress-list">
          {courses.map(course => (
            <div className="course-progress-item" key={course.name}>
              <div className="course-progress-info">
                <div>
                  <h3>{course.name}</h3>
                  <p>{course.completed} of {course.total} lessons completed</p>
                </div>
                <strong>{course.progress}%</strong>
              </div>

              <div className="course-progress-track">
                <div style={{ width: `${course.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="progress-panel achievements-panel">
        <div className="progress-panel-heading">
          <div>
            <h2>Achievements</h2>
            <p>Milestones you've earned along your journey.</p>
          </div>
          <Trophy size={21} color="#d9a441" />
        </div>

        <div className="achievements-grid">
          {achievements.map((item) => {
            const Icon = item.icon

            return (
              <div
                className={`achievement-card ${item.earned ? 'earned' : 'locked'}`}
                key={item.title}
              >
                <div className="achievement-icon">
                  {item.earned ? <Icon size={23} /> : <Award size={23} />}
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span>
                    {item.earned ? (
                      <><CheckCircle2 size={12} /> Earned</>
                    ) : (
                      'Not unlocked yet'
                    )}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

    </div>
  )
}

export default MyProgress
