
import { BookOpen, Search, SlidersHorizontal, Play, Clock3, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

function MyCourses() {
  const [activeFilter, setActiveFilter] = useState('All Courses')

  const filters = ['All Courses', 'In Progress', 'Completed']

  const courses = [
    {
      title: 'Complete React Development',
      category: 'Frontend Development',
      instructor: 'Sarah Johnson',
      progress: 75,
      lessons: '18 / 24 lessons',
      duration: '12 hours',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600',
      status: 'In Progress'
    },
    {
      title: 'JavaScript Masterclass',
      category: 'Programming',
      instructor: 'David Miller',
      progress: 45,
      lessons: '12 / 27 lessons',
      duration: '16 hours',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600',
      status: 'In Progress'
    },
    {
      title: 'UI/UX Design Fundamentals',
      category: 'Design',
      instructor: 'Emily Carter',
      progress: 100,
      lessons: '20 / 20 lessons',
      duration: '10 hours',
      image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600',
      status: 'Completed'
    },
    {
      title: 'Node.js Backend Development',
      category: 'Backend Development',
      instructor: 'Michael Smith',
      progress: 25,
      lessons: '5 / 20 lessons',
      duration: '14 hours',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600',
      status: 'In Progress'
    }
  ]

  const filteredCourses = courses.filter(course => {
    if (activeFilter === 'All Courses') return true
    return course.status === activeFilter
  })

  return (
    <div className="my-courses-page">

      <div className="my-courses-header">
        <div>
          <p className="section-eyebrow">YOUR LEARNING LIBRARY</p>
          <h1>My Courses</h1>
          <p>Keep learning and move closer to your goals.</p>
        </div>

        <div className="my-courses-count">
          <BookOpen size={20} />
          <div>
            <strong>04</strong>
            <span>Enrolled courses</span>
          </div>
        </div>
      </div>

      <div className="courses-toolbar">
        <div className="courses-filters">
          {filters.map(filter => (
            <button
              key={filter}
              className={activeFilter === filter ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="courses-search">
          <Search size={17} />
          <input type="text" placeholder="Search your courses..." />
          <SlidersHorizontal size={17} />
        </div>
      </div>

      <div className="my-courses-grid">
        {filteredCourses.map(course => (
          <article className="my-course-card" key={course.title}>

            <div className="my-course-image">
              <img src={course.image} alt={course.title} />
              <span className={`my-course-status ${course.status === 'Completed' ? 'completed' : ''}`}>
                {course.status}
              </span>
            </div>

            <div className="my-course-content">
              <span className="my-course-category">{course.category}</span>

              <h3>{course.title}</h3>
              <p className="my-course-instructor">By {course.instructor}</p>

              <div className="my-course-meta">
                <span><BookOpen size={14} /> {course.lessons}</span>
                <span><Clock3 size={14} /> {course.duration}</span>
              </div>

              <div className="my-course-progress-label">
                <span>Progress</span>
                <strong>{course.progress}%</strong>
              </div>

              <div className="my-course-progress">
                <div style={{ width: `${course.progress}%` }} />
              </div>

              <button className={`my-course-action ${course.status === 'Completed' ? 'review' : ''}`}>
                {course.status === 'Completed' ? (
                  <><CheckCircle2 size={15} /> Review Course</>
                ) : (
                  <><Play size={15} fill="currentColor" /> Continue Learning</>
                )}
              </button>
            </div>

          </article>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="empty-courses">
          <BookOpen size={35} />
          <h3>No courses found</h3>
          <p>There are no courses in this category yet.</p>
        </div>
      )}

    </div>
  )
}

export default MyCourses
