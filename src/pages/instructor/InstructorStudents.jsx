
import { useState } from 'react'
import {
  Search,
  Users,
  UserCheck,
  GraduationCap,
  TrendingUp,
  Eye,
  Mail
} from 'lucide-react'

function InstructorStudents() {
  const [search, setSearch] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('All Courses')

  const students = [
    {
      id: 1,
      name: 'Ananya Menon',
      email: 'ananya@example.com',
      course: 'Complete React.js Development',
      progress: 85,
      enrolled: 'Nov 12, 2026',
      status: 'Active',
      initials: 'AM',
      color: 'purple'
    },
    {
      id: 2,
      name: 'Rahul Nair',
      email: 'rahul@example.com',
      course: 'JavaScript Fundamentals',
      progress: 62,
      enrolled: 'Nov 10, 2026',
      status: 'Active',
      initials: 'RN',
      color: 'blue'
    },
    {
      id: 3,
      name: 'Meera Krishnan',
      email: 'meera@example.com',
      course: 'UI/UX Design Masterclass',
      progress: 94,
      enrolled: 'Nov 08, 2026',
      status: 'Active',
      initials: 'MK',
      color: 'pink'
    },
    {
      id: 4,
      name: 'Arjun Das',
      email: 'arjun@example.com',
      course: 'Complete React.js Development',
      progress: 28,
      enrolled: 'Nov 05, 2026',
      status: 'At Risk',
      initials: 'AD',
      color: 'orange'
    },
    {
      id: 5,
      name: 'Sneha Thomas',
      email: 'sneha@example.com',
      course: 'JavaScript Fundamentals',
      progress: 76,
      enrolled: 'Nov 03, 2026',
      status: 'Active',
      initials: 'ST',
      color: 'green'
    },
    {
      id: 6,
      name: 'Vishnu Raj',
      email: 'vishnu@example.com',
      course: 'UI/UX Design Masterclass',
      progress: 15,
      enrolled: 'Oct 28, 2026',
      status: 'At Risk',
      initials: 'VR',
      color: 'cyan'
    }
  ]

  const courses = [
    'All Courses',
    ...new Set(students.map(student => student.course))
  ]

  const filteredStudents = students.filter(student => {
    const matchesSearch =
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase())

    const matchesCourse =
      selectedCourse === 'All Courses' ||
      student.course === selectedCourse

    return matchesSearch && matchesCourse
  })

  const activeStudents = students.filter(
    student => student.status === 'Active'
  ).length

  const averageProgress = Math.round(
    students.reduce((total, student) => total + student.progress, 0) /
    students.length
  )

  return (
    <div className="instructor-students-page">

      <div className="instructor-students-heading">
        <div>
          <span className="instructor-eyebrow">STUDENT MANAGEMENT</span>
          <h1>My Students</h1>
          <p>Track student enrollment, activity and learning progress.</p>
        </div>
      </div>

      <div className="instructor-student-stats">

        <div className="instructor-student-stat-card">
          <div className="instructor-student-stat-icon purple">
            <Users size={21} />
          </div>
          <div>
            <span>Total Students</span>
            <h3>{students.length}</h3>
            <small>Across all courses</small>
          </div>
        </div>

        <div className="instructor-student-stat-card">
          <div className="instructor-student-stat-icon green">
            <UserCheck size={21} />
          </div>
          <div>
            <span>Active Students</span>
            <h3>{activeStudents}</h3>
            <small>Currently learning</small>
          </div>
        </div>

        <div className="instructor-student-stat-card">
          <div className="instructor-student-stat-icon blue">
            <GraduationCap size={21} />
          </div>
          <div>
            <span>Courses</span>
            <h3>{courses.length - 1}</h3>
            <small>With enrolled students</small>
          </div>
        </div>

        <div className="instructor-student-stat-card">
          <div className="instructor-student-stat-icon orange">
            <TrendingUp size={21} />
          </div>
          <div>
            <span>Average Progress</span>
            <h3>{averageProgress}%</h3>
            <small>Across all students</small>
          </div>
        </div>

      </div>

      <div className="instructor-students-content">

        <div className="instructor-students-toolbar">
          <div>
            <h2>Enrolled Students</h2>
            <p>Manage and monitor your learners.</p>
          </div>

          <div className="instructor-students-controls">
            <div className="instructor-student-search">
              <Search size={17} />
              <input
                type="text"
                placeholder="Search students..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <select
              value={selectedCourse}
              onChange={e => setSelectedCourse(e.target.value)}
            >
              {courses.map(course => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="instructor-student-table-wrapper">
          <table className="instructor-student-table">
            <thead>
              <tr>
                <th>STUDENT</th>
                <th>COURSE</th>
                <th>ENROLLED</th>
                <th>PROGRESS</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map(student => (
                  <tr key={student.id}>
                    <td>
                      <div className="instructor-student-info">
                        <div className={`instructor-student-avatar ${student.color}`}>
                          {student.initials}
                        </div>

                        <div>
                          <strong>{student.name}</strong>
                          <span>{student.email}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="instructor-student-course-name">
                        {student.course}
                      </span>
                    </td>

                    <td>{student.enrolled}</td>

                    <td>
                      <div className="instructor-student-progress">
                        <div className="instructor-student-progress-track">
                          <div
                            className="instructor-student-progress-fill"
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                        <span>{student.progress}%</span>
                      </div>
                    </td>

                    <td>
                      <span className={`instructor-student-status ${
                        student.status === 'Active' ? 'active' : 'risk'
                      }`}>
                        {student.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="instructor-student-view-btn"
                        title="View student"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">
                    <div className="instructor-students-empty">
                      <Users size={30} />
                      <strong>No students found</strong>
                      <span>Try another search or course filter.</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="instructor-students-footer">
          <span>
            Showing {filteredStudents.length} of {students.length} students
          </span>
          <span>
            <Mail size={15} />
            Student information
          </span>
        </div>

      </div>
    </div>
  )
}

export default InstructorStudents
