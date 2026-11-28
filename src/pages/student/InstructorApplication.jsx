import { useEffect, useState } from 'react'
import axiosInstance from '../../api/axiosInstance'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const initialForm = {
  teachingDomain: '',
  qualifications: '',
  experience: '',
  portfolioUrl: '',
  teachingIntroduction: ''
}

function InstructorApplication() {
  const [application, setApplication] = useState(null)
  const [assessment, setAssessment] = useState(null)
  const [answers, setAnswers] = useState([])
  const [demoUrl, setDemoUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [assessmentLoading, setAssessmentLoading] = useState(false)
  const [applicationLoadError, setApplicationLoadError] = useState('')
  const [actionLoading, setActionLoading] = useState(false)
  const [retaking, setRetaking] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [form, setForm] = useState(initialForm)

  const { refreshProfile } = useAuth()
  const navigate = useNavigate()

  const getError = (err, fallback) => {
    const data = err.response?.data

    if (typeof data === 'string') return data
    return data?.message || fallback
  }

  const clearFeedback = () => {
    setMessage('')
    setError('')
  }

  // Fetch the current application
  useEffect(() => {
    let active = true

    async function fetchApplication() {
      try {
        const res = await axiosInstance.get(
          '/instructor/my-application'
        )

        if (active) {
          setApplication(res.data.application || null)
        }
      } catch (err) {
        if (active && err.response?.status !== 404) {
          setApplicationLoadError(
            getError(err, 'Unable to load application')
          )
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    fetchApplication()

    return () => {
      active = false
    }
  }, [])

  // Fetch the assessment for a pending application
  useEffect(() => {
    if (application?.status !== 'pending') {
      setAssessment(null)
      return
    }

    let active = true

    async function fetchAssessment() {
      setAssessmentLoading(true)

      try {
        const res = await axiosInstance.get(
          '/instructor/my-assessment'
        )

        if (active) {
          setAssessment(res.data.assessment ?? res.data)
        }
      } catch (err) {
        if (active) {
          setAssessment(null)

          if (err.response?.status !== 404) {
            setError(
              getError(err, 'Unable to load assessment')
            )
          }
        }
      } finally {
        if (active) setAssessmentLoading(false)
      }
    }

    fetchAssessment()

    return () => {
      active = false
    }
  }, [application?.status])

  // Refresh the authenticated user's role
  const handleRefresh = async () => {
    clearFeedback()
    setActionLoading(true)

    try {
      const updatedUser = await refreshProfile()

      if (updatedUser?.role === 'instructor') {
        navigate('/instructor/dashboard', { replace: true })
        return
      }

      setMessage('Your account is still a student account.')
    } catch (err) {
      setError(getError(err, 'Unable to refresh account status'))
    } finally {
      setActionLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Submit instructor application
  const handleSubmit = async (e) => {
    e.preventDefault()
    clearFeedback()
    setActionLoading(true)

    try {
      const res = await axiosInstance.post(
        '/instructor/apply',
        form
      )

      if (!res.data.application) {
        throw new Error('Application missing from server response')
      }

      setApplication(res.data.application)
      setMessage('Application submitted successfully')
    } catch (err) {
      setError(getError(err, err.message || 'Application submission failed'))
    } finally {
      setActionLoading(false)
    }
  }

  // Select an assessment answer
  const selectAnswer = (questionIndex, optionIndex) => {
    setAnswers(prev => {
      const updated = [...prev]
      updated[questionIndex] = optionIndex
      return updated
    })
  }

  // Submit assessment answers
  const handleAssessmentSubmit = async (e) => {
    e.preventDefault()
    clearFeedback()

    const questions = assessment?.questions || []

    if (
      !questions.length ||
      !questions.every((_, index) =>
        Number.isInteger(answers[index])
      )
    ) {
      setError('Please answer all questions')
      return
    }

    setActionLoading(true)

    try {
      const res = await axiosInstance.post(
        '/instructor/submit-assessment',
        { answers }
      )

      setAssessment(prev => ({
        ...prev,
        score: res.data.score,
        status: res.data.status,
        attempts: res.data.attempts
      }))

      setRetaking(false)
      setAnswers([])
      setMessage('Assessment submitted successfully')
    } catch (err) {
      setError(getError(err, 'Assessment submission failed'))
    } finally {
      setActionLoading(false)
    }
  }

  // Submit teaching demo
  const handleDemoSubmit = async (e) => {
    e.preventDefault()
    clearFeedback()
    setActionLoading(true)

    try {
      const res = await axiosInstance.post(
        '/instructor/submit-demo',
        { teachingDemoUrl: demoUrl.trim() }
      )

      setApplication(prev => ({
        ...prev,
        teachingDemoUrl: res.data.teachingDemoUrl
      }))

      setMessage('Teaching demo submitted successfully')
    } catch (err) {
      setError(getError(err, 'Teaching demo submission failed'))
    } finally {
      setActionLoading(false)
    }
  }

  if (loading) {
    return <div className="ia-loading">Loading application...</div>
  }

  const attempts = assessment?.attempts ?? 0
  const submitted = assessment?.status === 'submitted'
  const passed = submitted && assessment?.score >= 80

  const canRetake =
    submitted &&
    assessment?.score < 80 &&
    attempts < 3

  return (
    <div className="ia-page">
      <style>{`
        .ia-page {
          min-height: 100vh;
          background: #f4f7fc;
          padding: 40px 20px;
          font-family: Manrope, Arial, sans-serif;
          color: #17233c;
        }

        .ia-page * {
          box-sizing: border-box;
        }

        .ia-container {
          max-width: 850px;
          margin: auto;
        }

        .ia-hero {
          background: linear-gradient(120deg, #172c70, #345ee9);
          color: white;
          padding: 32px;
          border-radius: 20px;
          margin-bottom: 24px;
        }

        .ia-hero h1 {
          color: white;
          margin: 10px 0;
        }

        .ia-hero p {
          color: #e0e8ff;
          line-height: 1.6;
        }

        .ia-card {
          background: white;
          border: 1px solid #e0e6f0;
          border-radius: 20px;
          padding: 28px;
          margin-bottom: 20px;
          box-shadow: 0 8px 28px rgba(30, 50, 90, 0.06);
        }

        .ia-field {
          margin-bottom: 20px;
        }

        .ia-field label {
          display: block;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .ia-field input,
        .ia-field select,
        .ia-field textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #d7dfeb;
          border-radius: 10px;
          font: inherit;
          background: #f9fbfe;
        }

        .ia-field textarea {
          min-height: 100px;
          resize: vertical;
        }

        .ia-button {
          width: 100%;
          padding: 14px;
          border: 0;
          border-radius: 10px;
          background: #3158df;
          color: white;
          font-weight: 700;
          cursor: pointer;
          margin-top: 10px;
        }

        .ia-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .ia-message,
        .ia-error {
          padding: 12px;
          border-radius: 10px;
          margin-bottom: 16px;
        }

        .ia-message {
          background: #e8f6ed;
          color: #17653a;
        }

        .ia-error {
          background: #ffe8e8;
          color: #a52222;
        }

        .ia-status-row {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          padding: 14px 0;
          border-bottom: 1px solid #e8edf5;
        }

        .ia-status-row span {
          text-align: right;
          overflow-wrap: anywhere;
        }

        .ia-question {
          padding: 18px;
          border: 1px solid #e0e6f0;
          border-radius: 12px;
          margin-bottom: 16px;
        }

        .ia-option {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 0;
          cursor: pointer;
        }

        .ia-loading {
          padding: 40px;
          text-align: center;
        }

        @media (max-width: 600px) {
          .ia-page {
            padding: 16px 10px;
          }

          .ia-card,
          .ia-hero {
            padding: 20px;
          }
        }
      `}</style>

      <div className="ia-container">
        <header className="ia-hero">
          <small>SKILLWEAVE · INSTRUCTOR</small>
          <h1>Become an Instructor</h1>
          <p>
            Apply to share your knowledge and help SkillWeave
            learners build their careers.
          </p>
        </header>

        {message && (
          <div className="ia-message" role="status">
            {message}
          </div>
        )}

        {error && (
          <div className="ia-error" role="alert">
            {error}
          </div>
        )}

        {applicationLoadError && (
          <div className="ia-error" role="alert">
            {applicationLoadError}
          </div>
        )}

        {!applicationLoadError && !application ? (
          <section className="ia-card">
            <h2>Instructor Application</h2>

            <form onSubmit={handleSubmit}>
              <div className="ia-field">
                <label htmlFor="teachingDomain">
                  Teaching Domain
                </label>

                <select
                  id="teachingDomain"
                  name="teachingDomain"
                  value={form.teachingDomain}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select teaching domain</option>
                  <option>Software & Web Development</option>
                  <option>Cybersecurity</option>
                  <option>Networking & Infrastructure</option>
                  <option>Cloud Computing & DevOps</option>
                  <option>Data Science & AI</option>
                  <option>UI/UX Design</option>
                  <option>Database Management</option>
                  <option>Software Testing & QA</option>
                </select>
              </div>

              <div className="ia-field">
                <label htmlFor="qualifications">
                  Qualifications
                </label>

                <input
                  id="qualifications"
                  name="qualifications"
                  value={form.qualifications}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="ia-field">
                <label htmlFor="experience">
                  Teaching or Professional Experience
                </label>

                <textarea
                  id="experience"
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="ia-field">
                <label htmlFor="portfolioUrl">
                  Portfolio URL
                </label>

                <input
                  id="portfolioUrl"
                  name="portfolioUrl"
                  type="url"
                  value={form.portfolioUrl}
                  onChange={handleChange}
                />
              </div>

              <div className="ia-field">
                <label htmlFor="teachingIntroduction">
                  Teaching Approach
                </label>

                <textarea
                  id="teachingIntroduction"
                  name="teachingIntroduction"
                  value={form.teachingIntroduction}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                className="ia-button"
                type="submit"
                disabled={actionLoading}
              >
                {actionLoading
                  ? 'Submitting...'
                  : 'Submit Application'}
              </button>
            </form>
          </section>
        ) : application ? (
          <>
            <section className="ia-card">
              <h2>Application Status</h2>

              <div className="ia-status-row">
                <strong>Teaching Domain</strong>
                <span>{application.teachingDomain}</span>
              </div>

              <div className="ia-status-row">
                <strong>Status</strong>
                <span>{application.status}</span>
              </div>

              <div className="ia-status-row">
                <strong>Admin Feedback</strong>
                <span>
                  {application.adminFeedback || 'No feedback yet'}
                </span>
              </div>

              <button
                type="button"
                className="ia-button"
                onClick={handleRefresh}
                disabled={actionLoading}
              >
                {actionLoading
                  ? 'Refreshing...'
                  : 'Refresh Account Status'}
              </button>
            </section>

            {application.status === 'pending' && (
              <>
                <section className="ia-card">
                  <h2>Instructor Assessment</h2>

                  {assessmentLoading ? (
                    <p>Loading assessment...</p>
                  ) : !assessment ? (
                    <p>
                      Assessment not created yet. Please wait for
                      the admin to create an assessment.
                    </p>
                  ) : submitted && !retaking ? (
                    <>
                      <p>Assessment submitted successfully.</p>
                      <h3>Score: {assessment.score}%</h3>
                      <p>Attempts used: {attempts} / 3</p>

                      {canRetake && (
                        <>
                          <p>
                            A minimum score of 80% is required.
                          </p>

                          <button
                            type="button"
                            className="ia-button"
                            disabled={actionLoading}
                            onClick={() => {
                              setAnswers([])
                              setRetaking(true)
                              clearFeedback()
                            }}
                          >
                            Retake Assessment
                          </button>
                        </>
                      )}

                      {assessment.score < 80 && attempts >= 3 && (
                        <p>
                          Maximum attempts reached. Contact the
                          admin for further assistance.
                        </p>
                      )}
                    </>
                  ) : !assessment.questions?.length ? (
                    <p>No assessment questions available.</p>
                  ) : (
                    <form onSubmit={handleAssessmentSubmit}>
                      {retaking && (
                        <p>Retake attempt: {attempts + 1} / 3</p>
                      )}

                      {assessment.questions.map(
                        (question, index) => (
                          <div
                            className="ia-question"
                            key={question._id || index}
                          >
                            <h3>
                              {index + 1}. {question.questionText}
                            </h3>

                            {question.options?.map(
                              (option, optionIndex) => (
                                <label
                                  className="ia-option"
                                  key={optionIndex}
                                >
                                  <input
                                    type="radio"
                                    name={`question-${index}`}
                                    checked={
                                      answers[index] === optionIndex
                                    }
                                    onChange={() =>
                                      selectAnswer(index, optionIndex)
                                    }
                                    required
                                  />
                                  {option}
                                </label>
                              )
                            )}
                          </div>
                        )
                      )}

                      <button
                        className="ia-button"
                        type="submit"
                        disabled={actionLoading}
                      >
                        {actionLoading
                          ? 'Submitting...'
                          : 'Submit Assessment'}
                      </button>

                      {retaking && (
                        <button
                          type="button"
                          className="ia-button"
                          disabled={actionLoading}
                          onClick={() => {
                            setRetaking(false)
                            setAnswers([])
                            clearFeedback()
                          }}
                        >
                          Cancel Retake
                        </button>
                      )}
                    </form>
                  )}
                </section>

                {passed && (
                  <section className="ia-card">
                    <h2>Teaching Demo</h2>

                    {application.teachingDemoUrl ? (
                      <>
                        <p>
                          Teaching demo submitted successfully.
                          Waiting for admin review.
                        </p>

                        <a
                          href={application.teachingDemoUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View submitted teaching demo
                        </a>
                      </>
                    ) : (
                      <form onSubmit={handleDemoSubmit}>
                        <div className="ia-field">
                          <label htmlFor="demoUrl">
                            Teaching Demo URL
                          </label>

                          <input
                            id="demoUrl"
                            type="url"
                            value={demoUrl}
                            onChange={e =>
                              setDemoUrl(e.target.value)
                            }
                            placeholder="https://your-demo-link.com"
                            required
                          />
                        </div>

                        <button
                          className="ia-button"
                          type="submit"
                          disabled={actionLoading}
                        >
                          {actionLoading
                            ? 'Submitting...'
                            : 'Submit Teaching Demo'}
                        </button>
                      </form>
                    )}
                  </section>
                )}
              </>
            )}
          </>
        ) : null}
      </div>
    </div>
  )
}

export default InstructorApplication