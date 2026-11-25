
import { useState } from 'react'
import {
  Plus,
  Search,
  ClipboardList,
  Clock,
  Users,
  MoreVertical,
  Pencil,
  Trash2,
  Eye
} from 'lucide-react'

function InstructorQuizzes() {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')

  const quizzes = [
    {
      id: 1,
      title: 'React Fundamentals Quiz',
      course: 'Complete React Development',
      questions: 15,
      attempts: 124,
      averageScore: 86,
      status: 'Published',
      duration: '20 min'
    },
    {
      id: 2,
      title: 'JavaScript Basics Assessment',
      course: 'JavaScript Masterclass',
      questions: 20,
      attempts: 98,
      averageScore: 78,
      status: 'Published',
      duration: '30 min'
    },
    {
      id: 3,
      title: 'UI Design Principles',
      course: 'UI/UX Design Essentials',
      questions: 10,
      attempts: 0,
      averageScore: 0,
      status: 'Draft',
      duration: '15 min'
    },
    {
      id: 4,
      title: 'Node.js Final Assessment',
      course: 'Backend Development with Node',
      questions: 25,
      attempts: 76,
      averageScore: 91,
      status: 'Published',
      duration: '40 min'
    }
  ]

  const filters = ['All', 'Published', 'Draft']

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch =
      quiz.title.toLowerCase().includes(search.toLowerCase()) ||
      quiz.course.toLowerCase().includes(search.toLowerCase())

    const matchesFilter =
      activeFilter === 'All' || quiz.status === activeFilter

    return matchesSearch && matchesFilter
  })

  return (
    <div className="instructor-quizzes">
      <div className="instructor-page-heading">
        <div>
          <span className="instructor-eyebrow">ASSESSMENTS</span>
          <h1>Quiz Management</h1>
          <p>Create and manage assessments for your courses.</p>
        </div>

        <button className="instructor-primary-btn">
          <Plus size={18} />
          Create Quiz
        </button>
      </div>

      <div className="quiz-stats-grid">
        <div className="quiz-stat-card">
          <div className="quiz-stat-icon purple">
            <ClipboardList size={21} />
          </div>
          <div>
            <span>Total Quizzes</span>
            <h2>12</h2>
          </div>
        </div>

        <div className="quiz-stat-card">
          <div className="quiz-stat-icon blue">
            <Users size={21} />
          </div>
          <div>
            <span>Total Attempts</span>
            <h2>298</h2>
          </div>
        </div>

        <div className="quiz-stat-card">
          <div className="quiz-stat-icon green">
            <ClipboardList size={21} />
          </div>
          <div>
            <span>Average Score</span>
            <h2>85%</h2>
          </div>
        </div>

        <div className="quiz-stat-card">
          <div className="quiz-stat-icon orange">
            <Clock size={21} />
          </div>
          <div>
            <span>Draft Quizzes</span>
            <h2>3</h2>
          </div>
        </div>
      </div>

      <div className="quiz-management-panel">
        <div className="quiz-toolbar">
          <div className="quiz-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search quizzes or courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="quiz-filter-tabs">
            {filters.map((filter) => (
              <button
                key={filter}
                className={activeFilter === filter ? 'active' : ''}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="quiz-list">
          {filteredQuizzes.length > 0 ? (
            filteredQuizzes.map((quiz) => (
              <div className="instructor-quiz-card" key={quiz.id}>
                <div className="quiz-card-main">
                  <div className="quiz-card-icon">
                    <ClipboardList size={22} />
                  </div>

                  <div className="quiz-card-info">
                    <h3>{quiz.title}</h3>
                    <p>{quiz.course}</p>

                    <div className="quiz-card-meta">
                      <span>{quiz.questions} Questions</span>
                      <span>{quiz.duration}</span>
                      <span>{quiz.attempts} Attempts</span>
                    </div>
                  </div>
                </div>

                <div className="quiz-card-results">
                  <div>
                    <span>Average Score</span>
                    <strong>{quiz.attempts ? `${quiz.averageScore}%` : '—'}</strong>
                  </div>

                  <span className={`quiz-status ${quiz.status.toLowerCase()}`}>
                    {quiz.status}
                  </span>
                </div>

                <div className="quiz-card-actions">
                  <button title="View quiz">
                    <Eye size={17} />
                  </button>
                  <button title="Edit quiz">
                    <Pencil size={17} />
                  </button>
                  <button title="More options">
                    <MoreVertical size={17} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="quiz-empty-state">
              <ClipboardList size={32} />
              <h3>No quizzes found</h3>
              <p>Try changing your search or filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default InstructorQuizzes
