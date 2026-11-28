import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/axiosInstance'

import {
  Search,
  Plus,
  BookOpen,
  Pencil,
  Eye,
  Clock
} from 'lucide-react'

function InstructorCourses() {
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get(
          '/instructor/my-courses'
        )

        setCourses(response.data.courses || [])
      } catch (err) {
        setError(
          err.response?.data?.message || 'Failed to load courses'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const formatStatus = (status) =>
    status.charAt(0).toUpperCase() + status.slice(1)

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

        <button
          className="instructor-primary-btn"
          onClick={() => navigate('/instructor/create-course')}
        >
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
            <h3>{courses.filter(c => c.status === 'published').length}</h3>
          </div>
        </div>

        <div className="instructor-course-overview-card">
          <div className="instructor-course-overview-icon orange">
            <Pencil size={21} />
          </div>
          <div>
            <span>Drafts</span>
            <h3>{courses.filter(c => c.status === 'draft').length}</h3>
          </div>
        </div>

        <div className="instructor-course-overview-card">
          <div className="instructor-course-overview-icon green">
            <Clock size={21} />
          </div>
          <div>
            <span>Pending Approval</span>
            <h3>{courses.filter(c => c.status === 'pending').length}</h3>
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
          {['All', 'published', 'draft', 'pending', 'rejected'].map(item => (
            <button
              key={item}
              className={filter === item ? 'active' : ''}
              onClick={() => setFilter(item)}
            >
              {item === 'All' ? 'All' : formatStatus(item)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p role="status">Loading courses...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : (
        <div className="instructor-course-grid">
          {filteredCourses.length > 0 ? (
            filteredCourses.map(course => (
              <div className="instructor-course-card" key={course._id}>
                <div className="instructor-course-image">
                  <BookOpen size={40} />

                  <span
                    className={`instructor-course-status ${course.status}`}
                  >
                    {formatStatus(course.status)}
                  </span>
                </div>

                <div className="instructor-course-card-body">
                  <span className="instructor-course-category">
                    {course.category}
                  </span>

                  <h3>{course.title}</h3>
                  <p>{course.description}</p>

                  <div className="instructor-course-meta">
                    <span>
                      <BookOpen size={15} />
                      {course.level}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="instructor-course-empty">
              <BookOpen size={35} />
              <h3>No courses found</h3>
              <p>Create a course or change your search and filters.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default InstructorCourses