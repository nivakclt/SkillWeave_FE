import { useEffect, useState } from 'react'
import axiosInstance from '../../api/axiosInstance'

const newQuestion = () => ({
  questionText: '',
  options: ['', '', '', ''],
  correctAnswer: 0
})

function InstructorApplications() {
  const [applications, setApplications] = useState([])
  const [questions, setQuestions] = useState({})
  const [assessments, setAssessments] = useState({})
  const [feedback, setFeedback] = useState({})
  const [demoApproved, setDemoApproved] = useState({})

  const [loading, setLoading] = useState(true)
  const [creatingId, setCreatingId] = useState(null)
  const [reviewingId, setReviewingId] = useState(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  function getError(err, fallback) {
    const data = err.response?.data
    return typeof data === 'string'
      ? data
      : data?.message || fallback
  }

  async function fetchAssessment(id) {
    try {
      const res = await axiosInstance.get(
        `/admin/assessment/${id}`
      )

      setAssessments(prev => ({
        ...prev,
        [id]: res.data
      }))
    } catch (err) {
      if (err.response?.status !== 404) {
        setError(getError(err, 'Failed to load assessment'))
      }
    }
  }

  useEffect(() => {
    async function fetchApplications() {
      try {
        const res = await axiosInstance.get(
          '/admin/instructor-applications'
        )

        const list = res.data.applications || []
        setApplications(list)

        await Promise.all(
          list.map(async app => {
            try {
              const result = await axiosInstance.get(
                `/admin/assessment/${app._id}`
              )

              setAssessments(prev => ({
                ...prev,
                [app._id]: result.data
              }))
            } catch (err) {
              if (err.response?.status !== 404) {
                setError(
                  getError(err, 'Failed to load assessment')
                )
              }
            }
          })
        )
      } catch (err) {
        setError(getError(err, 'Failed to load applications'))
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [])

  function getQuestions(id) {
    return questions[id] || [newQuestion()]
  }

  function updateQuestion(id, index, field, value) {
    setQuestions(prev => {
      const list = prev[id] || [newQuestion()]

      return {
        ...prev,
        [id]: list.map((q, i) =>
          i === index ? { ...q, [field]: value } : q
        )
      }
    })
  }

  function updateOption(id, questionIndex, optionIndex, value) {
    setQuestions(prev => {
      const list = prev[id] || [newQuestion()]

      return {
        ...prev,
        [id]: list.map((q, i) =>
          i === questionIndex
            ? {
                ...q,
                options: q.options.map((option, oi) =>
                  oi === optionIndex ? value : option
                )
              }
            : q
        )
      }
    })
  }

  function addQuestion(id) {
    setQuestions(prev => ({
      ...prev,
      [id]: [...(prev[id] || [newQuestion()]), newQuestion()]
    }))
  }

  function removeQuestion(id, index) {
    setQuestions(prev => {
      const list = prev[id] || [newQuestion()]

      if (list.length <= 1) return prev

      return {
        ...prev,
        [id]: list.filter((_, i) => i !== index)
      }
    })
  }

  async function createAssessment(id) {
    setError('')
    setMessage('')

    const list = getQuestions(id)

    if (
      list.some(q =>
        !q.questionText.trim() ||
        q.options.some(option => !option.trim())
      )
    ) {
      setError('Enter every question and all four options.')
      return
    }

    try {
      setCreatingId(id)

      await axiosInstance.post('/admin/create-assessment', {
        applicationId: id,
        questions: list.map(q => ({
          questionText: q.questionText.trim(),
          options: q.options.map(option => option.trim()),
          correctAnswer: Number(q.correctAnswer)
        }))
      })

      setMessage('Assessment created successfully.')
      await fetchAssessment(id)
    } catch (err) {
      setError(getError(err, 'Failed to create assessment'))
    } finally {
      setCreatingId(null)
    }
  }

  async function reviewApplication(id, status) {
    setError('')
    setMessage('')

    const adminFeedback = (feedback[id] || '').trim()
    const app = applications.find(item => item._id === id)
    const assessment = assessments[id]

    if (status === 'rejected' && !adminFeedback) {
      setError('Please provide rejection feedback.')
      return
    }

    if (
      status === 'approved' &&
      (
        assessment?.status !== 'submitted' ||
        assessment.score < 80 ||
        !app?.teachingDemoUrl ||
        !demoApproved[id]
      )
    ) {
      setError('A score of at least 80% and an approved teaching demo are required.')
      return
    }

    try {
      setReviewingId(id)

      const res = await axiosInstance.patch(
        `/admin/instructor-applications/${id}`,
        {
          status,
          adminFeedback,
          teachingDemoApproved: status === 'approved'
        }
      )

      setApplications(prev =>
        prev.map(item =>
          item._id === id
            ? {
                ...item,
                ...(res.data.application || {}),
                status,
                adminFeedback
              }
            : item
        )
      )

      setMessage(`Application ${status} successfully.`)
    } catch (err) {
      setError(getError(err, 'Review failed'))
    } finally {
      setReviewingId(null)
    }
  }

  const count = status =>
    applications.filter(app => app.status === status).length

  return (
    <section className="admin-applications">
      <style>{`
        .admin-applications {
          padding: 28px;
          background: #f5f7fb;
          color: #191b2b;
          font-family: Arial, sans-serif;
          min-height: 100vh;
        }

        .admin-applications * {
          box-sizing: border-box;
        }

        .admin-applications .hero,
        .admin-applications .card {
          background: white;
          border: 1px solid #e1e5ef;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 20px;
        }

        .admin-applications .hero {
          background: linear-gradient(120deg, #e8edff, #f2efff);
        }

        .admin-applications .stats,
        .admin-applications .details {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 12px;
          margin-bottom: 20px;
        }

        .admin-applications .stat,
        .admin-applications .detail,
        .admin-applications .question,
        .admin-applications .assessment {
          padding: 14px;
          background: #f7f8fc;
          border-radius: 10px;
        }

        .admin-applications .stat strong {
          display: block;
          font-size: 25px;
          margin-top: 8px;
        }

        .admin-applications .question {
          margin-bottom: 15px;
        }

        .admin-applications input:not([type="checkbox"]),
        .admin-applications textarea,
        .admin-applications select {
          width: 100%;
          padding: 10px;
          margin: 6px 0 10px;
          border: 1px solid #d7ddeb;
          border-radius: 8px;
          background: white;
          color: #191b2b;
          font: inherit;
        }

        .admin-applications textarea {
          min-height: 80px;
          resize: vertical;
        }

        .admin-applications button {
          padding: 11px 18px;
          border: 0;
          border-radius: 8px;
          background: #315bd8;
          color: white;
          cursor: pointer;
          margin: 5px 8px 5px 0;
          font-weight: 700;
        }

        .admin-applications button:disabled {
          opacity: .5;
          cursor: not-allowed;
        }

        .admin-applications .reject {
          background: #b42323;
        }

        .admin-applications .notice {
          padding: 12px;
          background: #e7f6ed;
          color: #17653a;
          border-radius: 8px;
          margin-bottom: 15px;
        }

        .admin-applications .error {
          background: #fff0f0;
          color: #b42323;
        }

        .admin-applications .review {
          border-top: 1px solid #e1e5ef;
          margin-top: 20px;
          padding-top: 16px;
        }

        .admin-applications .status {
          display: inline-block;
          padding: 5px 12px;
          border-radius: 20px;
          background: #fff4db;
          text-transform: capitalize;
        }

        .admin-applications .check {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 12px 0;
        }

        .admin-applications a {
          color: #315bd8;
          overflow-wrap: anywhere;
        }

        @media (max-width: 600px) {
          .admin-applications {
            padding: 12px;
          }

          .admin-applications .hero,
          .admin-applications .card {
            padding: 16px;
          }
        }
      `}</style>

      <header className="hero">
        <small>SKILLWEAVE ADMIN</small>
        <h1>Instructor Applications</h1>
        <p>Create assessments and review instructor applications.</p>
      </header>

      <div className="stats">
        {[
          ['Total', applications.length],
          ['Pending', count('pending')],
          ['Approved', count('approved')],
          ['Rejected', count('rejected')]
        ].map(([label, value]) => (
          <div className="stat" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>

      {error && (
        <p className="notice error" role="alert">{error}</p>
      )}

      {message && (
        <p className="notice" role="status">{message}</p>
      )}

      {loading ? (
        <p>Loading applications...</p>
      ) : applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        applications.map(app => {
          const assessment = assessments[app._id]
          const passed =
            assessment?.status === 'submitted' &&
            assessment.score >= 80

          return (
            <article className="card" key={app._id}>
              <h2>{app.teachingDomain}</h2>
              <span className="status">{app.status}</span>

              <div className="details">
                <div className="detail">
                  <strong>Qualifications</strong>
                  <p>{app.qualifications}</p>
                </div>

                <div className="detail">
                  <strong>Experience</strong>
                  <p>{app.experience}</p>
                </div>

                <div className="detail">
                  <strong>Teaching Approach</strong>
                  <p>{app.teachingIntroduction}</p>
                </div>

                <div className="detail">
                  <strong>Admin Feedback</strong>
                  <p>{app.adminFeedback || 'No feedback yet'}</p>
                </div>
              </div>

              {app.teachingDemoUrl && (
                <p>
                  <a
                    href={app.teachingDemoUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View teaching demonstration
                  </a>
                </p>
              )}

              <div className="review">
                <h3>Assessment Result</h3>

                {assessment ? (
                  <div className="assessment">
                    <p>
                      <strong>Status:</strong> {assessment.status}
                    </p>

                    {assessment.status === 'submitted' ? (
                      <>
                        <p>
                          <strong>Score:</strong> {assessment.score}%
                        </p>
                        <p>{passed ? 'Passed' : 'Below 80% requirement'}</p>
                      </>
                    ) : (
                      <p>Waiting for student submission.</p>
                    )}

                    {app.status === 'pending' && (
                      <button
                        onClick={() => fetchAssessment(app._id)}
                      >
                        Refresh Result
                      </button>
                    )}
                  </div>
                ) : (
                  <p>No assessment found.</p>
                )}
              </div>

              {app.status === 'pending' && (
                <>
                  {!assessment && (
                    <div className="review">
                      <h3>Create Assessment</h3>

                      {getQuestions(app._id).map((q, qi) => (
                        <div className="question" key={qi}>
                          <h4>Question {qi + 1}</h4>

                          <textarea
                            placeholder="Enter question"
                            value={q.questionText}
                            onChange={e =>
                              updateQuestion(
                                app._id,
                                qi,
                                'questionText',
                                e.target.value
                              )
                            }
                          />

                          {q.options.map((option, oi) => (
                            <input
                              key={oi}
                              placeholder={`Option ${oi + 1}`}
                              value={option}
                              onChange={e =>
                                updateOption(
                                  app._id,
                                  qi,
                                  oi,
                                  e.target.value
                                )
                              }
                            />
                          ))}

                          <label>
                            Correct answer
                            <select
                              value={q.correctAnswer}
                              onChange={e =>
                                updateQuestion(
                                  app._id,
                                  qi,
                                  'correctAnswer',
                                  Number(e.target.value)
                                )
                              }
                            >
                              {[0, 1, 2, 3].map(oi => (
                                <option key={oi} value={oi}>
                                  Option {oi + 1}
                                </option>
                              ))}
                            </select>
                          </label>

                          {getQuestions(app._id).length > 1 && (
                            <button
                              className="reject"
                              onClick={() =>
                                removeQuestion(app._id, qi)
                              }
                            >
                              Remove Question
                            </button>
                          )}
                        </div>
                      ))}

                      <button
                        onClick={() => addQuestion(app._id)}
                      >
                        Add Question
                      </button>

                      <button
                        disabled={creatingId !== null}
                        onClick={() => createAssessment(app._id)}
                      >
                        {creatingId === app._id
                          ? 'Creating...'
                          : 'Create Assessment'}
                      </button>
                    </div>
                  )}

                  <div className="review">
                    <h3>Review Application</h3>

                    <textarea
                      placeholder="Admin feedback"
                      value={feedback[app._id] || ''}
                      onChange={e =>
                        setFeedback(prev => ({
                          ...prev,
                          [app._id]: e.target.value
                        }))
                      }
                    />

                    <label className="check">
                      <input
                        type="checkbox"
                        checked={!!demoApproved[app._id]}
                        disabled={!app.teachingDemoUrl}
                        onChange={e =>
                          setDemoApproved(prev => ({
                            ...prev,
                            [app._id]: e.target.checked
                          }))
                        }
                      />
                      Teaching demo reviewed and approved
                    </label>

                    <button
                      disabled={
                        reviewingId !== null ||
                        !passed ||
                        !app.teachingDemoUrl ||
                        !demoApproved[app._id]
                      }
                      onClick={() =>
                        reviewApplication(app._id, 'approved')
                      }
                    >
                      {reviewingId === app._id
                        ? 'Processing...'
                        : 'Approve'}
                    </button>

                    <button
                      className="reject"
                      disabled={reviewingId !== null}
                      onClick={() =>
                        reviewApplication(app._id, 'rejected')
                      }
                    >
                      Reject
                    </button>
                  </div>
                </>
              )}
            </article>
          )
        })
      )}
    </section>
  )
}

export default InstructorApplications