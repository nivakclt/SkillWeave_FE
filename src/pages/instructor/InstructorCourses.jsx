
import { useState } from 'react'
import {
  Search,
  Plus,
  BookOpen,
  Users,
  Star,
  MoreHorizontal,
  Pencil,
  Eye
} from 'lucide-react'

function InstructorCourses() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const courses = [
    {
      id: 1,
      title: 'Complete React.js Development',
      category: 'Web Development',
      students: 245,
      rating: 4.8,
      lessons: 32,
      status: 'Published',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600'
    },
    {
      id: 2,
      title: 'JavaScript Fundamentals',
      category: 'Programming',
      students: 186,
      rating: 4.7,
      lessons: 24,
      status: 'Published',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600'
    },
    {
      id: 3,
      title: 'UI/UX Design Masterclass',
      category: 'Design',
      students: 124,
      rating: 4.9,
      lessons: 18,
      status: 'Published',
      image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600'
    },
    {
      id: 4,
      title: 'Node.js and Express',
      category: 'Backend Development',
      students: 0,
      rating: 0,
      lessons: 20,
      status: 'Draft',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600'
    },
    {
      id: 5,
      title: 'MongoDB for Beginners',
      category: 'Database',
      students: 0,
      rating: 0,
      lessons: 15,
      status: 'Draft',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600'
    }
  ]

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesFilter =
      filter === 'All' || course.status === filter

    return matchesSearch && matchesFilter
  })

  return (
    <div className="instructor-courses-page">

      <div className="instructor-courses-heading">
        <div>
          <span className="instructor-eyebrow">COURSE MANAGEMENT</span>
          <h1>My Courses</h1>
          <p>Create, manage and track all your learning programs.</p>
        </div>

        <button className="instructor-primary-btn">
          <Plus size={18} />
          Create New Course
        </button>
      </div>

      <div className="instructor-course-overview">
        <div className="instructor-course-overview-card">
          <div className="instructor-course-overview-icon purple">
            <BookOpen size={21} />
          </div>
          <div>
            <span>Total Courses</span>
            <h3>{courses.length}</h3>
          </div>
        </div>

        <div className="instructor-course-overview-card">
          <div className="instructor-course-overview-icon blue">
            <Eye size={21} />
          </div>
          <div>
            <span>Published</span>
            <h3>{courses.filter(c => c.status === 'Published').length}</h3>
          </div>
        </div>

        <div className="instructor-course-overview-card">
          <div className="instructor-course-overview-icon orange">
            <Pencil size={21} />
          </div>
          <div>
            <span>Drafts</span>
            <h3>{courses.filter(c => c.status === 'Draft').length}</h3>
          </div>
        </div>

        <div className="instructor-course-overview-card">
          <div className="instructor-course-overview-icon green">
            <Users size={21} />
          </div>
          <div>
            <span>Total Students</span>
            <h3>
              {courses.reduce((total, course) => total + course.students, 0)}
            </h3>
          </div>
        </div>
      </div>

      <div className="instructor-course-toolbar">
        <div className="instructor-course-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search your courses..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="instructor-course-filters">
          {['All', 'Published', 'Draft'].map(item => (
            <button
              key={item}
              className={filter === item ? 'active' : ''}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="instructor-course-grid">
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <div className="instructor-course-card" key={course.id}>
              <div className="instructor-course-image">
                <img src={course.image} alt={course.title} />

                <span className={`instructor-course-status ${
                  course.status === 'Published' ? 'published' : 'draft'
                }`}>
                  {course.status}
                </span>

                <button
                  className="instructor-course-more"
                  aria-label={`More options for ${course.title}`}
                >
                  <MoreHorizontal size={20} />
                </button>
              </div>

              <div className="instructor-course-card-body">
                <span className="instructor-course-category">
                  {course.category}
                </span>

                <h3>{course.title}</h3>

                <div className="instructor-course-meta">
                  <span>
                    <BookOpen size={15} />
                    {course.lessons} Lessons
                  </span>

                  <span>
                    <Users size={15} />
                    {course.students} Students
                  </span>
                </div>

                <div className="instructor-course-card-footer">
                  <div className="instructor-course-rating">
                    <Star size={15} fill="currentColor" />
                    {course.rating ? course.rating : 'No ratings'}
                  </div>

                  <button className="instructor-course-manage">
                    Manage Course
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="instructor-course-empty">
            <BookOpen size={35} />
            <h3>No courses found</h3>
            <p>Try another search term or change the filter.</p>
          </div>
        )}
      </div>

    </div>
  )
}

export default InstructorCourses
