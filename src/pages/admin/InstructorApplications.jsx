import { useEffect, useState } from 'react'
import axiosInstance from '../../api/axiosInstance'

function InstructorApplications() {
  const [applications, setApplications] = useState([])
  const [feedback, setFeedback] = useState({})
  const [demoApproved, setDemoApproved] = useState({})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [reviewingId, setReviewingId] = useState(null)

  const getErrorMessage = (err, fallback) => {
    const data = err.response?.data

    if (typeof data === 'string') return data
    return data?.message || fallback
  }

  useEffect(() => {
    async function fetchApplications() {
      try {
        const res = await axiosInstance.get(
          '/admin/instructor-applications'
        )

        setApplications(res.data.applications || [])
      } catch (err) {
        setError(getErrorMessage(err, 'Failed to load applications'))
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [])

  async function reviewApplication(id, status) {
    const adminFeedback = (feedback[id] || '').trim()

    setError('')

    if (status === 'rejected' && !adminFeedback) {
      setError('Please provide rejection feedback')
      return
    }

    if (status === 'approved' && !demoApproved[id]) {
      setError('Please review and approve the teaching demo')
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
        prev.map(app =>
          app._id === id
            ? res.data.application || { ...app, status, adminFeedback }
            : app
        )
      )
    } catch (err) {
      setError(getErrorMessage(err, 'Review failed'))
    } finally {
      setReviewingId(null)
    }
  }

  const pendingCount = applications.filter(
    app => app.status === 'pending'
  ).length

  const approvedCount = applications.filter(
    app => app.status === 'approved'
  ).length

  const rejectedCount = applications.filter(
    app => app.status === 'rejected'
  ).length

  return (
    <section className="admin-applications">
      <style>{`
        .admin-applications {
          --ia-text: #191b2b;
          --ia-muted: #62677b;
          --ia-border: #e1e4ec;
          --ia-blue: #315bd8;

          width: 100%;
          min-height: 100%;
          padding: 28px;
          box-sizing: border-box;
          background: #f7f7f5;
          color: var(--ia-text);
          font-family: Arial, sans-serif;
        }

        .admin-applications *,
        .admin-applications *::before,
        .admin-applications *::after {
          box-sizing: border-box;
        }

        .admin-applications .ia-hero {
          padding: 30px;
          margin-bottom: 24px;
          border: 1px solid #dce1fa;
          border-radius: 20px;
          background: linear-gradient(120deg, #e8edff, #f2efff);
        }

        .admin-applications .ia-eyebrow {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 20px;
          background: #fff;
          color: var(--ia-blue);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .admin-applications .ia-hero h1 {
          margin: 14px 0 8px;
          font-family: Georgia, serif;
          font-size: clamp(28px, 4vw, 40px);
          line-height: 1.15;
        }

        .admin-applications .ia-hero p {
          margin: 0;
          color: var(--ia-muted);
          line-height: 1.6;
        }

        .admin-applications .ia-stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
          margin-bottom: 28px;
        }

        .admin-applications .ia-stat {
          padding: 20px;
          border: 1px solid var(--ia-border);
          border-radius: 16px;
          background: #fff;
        }

        .admin-applications .ia-stat span {
          color: var(--ia-muted);
          font-size: 13px;
        }

        .admin-applications .ia-stat strong {
          display: block;
          margin-top: 8px;
          font-family: Georgia, serif;
          font-size: 28px;
        }

        .admin-applications .ia-list-title {
          margin: 0 0 16px;
          font-family: Georgia, serif;
          font-size: 24px;
        }

        .admin-applications .admin-application-card {
          padding: 24px;
          margin-bottom: 18px;
          border: 1px solid var(--ia-border);
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
        }

        .admin-applications .ia-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 18px;
        }

        .admin-applications .ia-card-header h3 {
          margin: 0;
          font-family: Georgia, serif;
          font-size: 22px;
        }

        .admin-applications .ia-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          text-transform: capitalize;
        }

        .admin-applications .ia-pending {
          background: #fff4db;
          color: #946200;
        }

        .admin-applications .ia-approved {
          background: #e5f7ed;
          color: #187747;
        }

        .admin-applications .ia-rejected {
          background: #ffeded;
          color: #b42323;
        }

        .admin-applications .ia-details {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .admin-applications .ia-detail {
          padding: 14px;
          border-radius: 10px;
          background: #f7f8fc;
        }

        .admin-applications .ia-detail strong {
          display: block;
          margin-bottom: 6px;
          color: var(--ia-text);
          font-size: 13px;
        }

        .admin-applications .ia-detail p {
          margin: 0;
          color: var(--ia-muted);
          font-size: 14px;
          line-height: 1.6;
          overflow-wrap: anywhere;
        }

        .admin-applications .ia-review {
          margin-top: 20px;
          padding-top: 18px;
          border-top: 1px solid var(--ia-border);
        }

        .admin-applications .ia-review textarea {
          display: block;
          width: 100%;
          min-height: 90px;
          padding: 12px;
          border: 1px solid var(--ia-border);
          border-radius: 10px;
          background: #fafbff;
          color: var(--ia-text);
          font: inherit;
          resize: vertical;
        }

        .admin-applications .ia-review textarea:focus {
          outline: 2px solid #b9c5ff;
          border-color: var(--ia-blue);
        }

        .admin-applications .ia-check {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 16px 0;
          color: var(--ia-muted);
          font-size: 14px;
        }

        .admin-applications .ia-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .admin-applications .ia-actions button {
          padding: 11px 20px;
          border: 0;
          border-radius: 9px;
          font-weight: 700;
          cursor: pointer;
        }

        .admin-applications .ia-approve {
          background: #191b2b;
          color: #fff;
        }

        .admin-applications .ia-reject {
          background: #fff0f0;
          color: #b42323;
        }

        .admin-applications .ia-actions button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .admin-applications .ia-error {
          padding: 12px 16px;
          margin-bottom: 18px;
          border-radius: 10px;
          background: #fff0f0;
          color: #b42323;
        }

        .admin-applications .ia-empty {
          padding: 30px;
          border: 1px dashed var(--ia-border);
          border-radius: 16px;
          background: #fff;
          color: var(--ia-muted);
          text-align: center;
        }

        @media (max-width: 800px) {
          .admin-applications .ia-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 550px) {
          .admin-applications {
            padding: 16px;
          }

          .admin-applications .ia-hero,
          .admin-applications .admin-application-card {
            padding: 18px;
          }

          .admin-applications .ia-details {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <header className="ia-hero">
        <span className="ia-eyebrow">ADMIN WORKSPACE</span>
        <h1>Instructor Applications</h1>
        <p>
          Review teaching applications and manage instructor approvals.
        </p>
      </header>

      <div className="ia-stats">
        <div className="ia-stat">
          <span>Total Applications</span>
          <strong>{applications.length}</strong>
        </div>

        <div className="ia-stat">
          <span>Pending Review</span>
          <strong>{pendingCount}</strong>
        </div>

        <div className="ia-stat">
          <span>Approved</span>
          <strong>{approvedCount}</strong>
        </div>

        <div className="ia-stat">
          <span>Rejected</span>
          <strong>{rejectedCount}</strong>
        </div>
      </div>

      <h2 className="ia-list-title">Application Reviews</h2>

      {error && (
        <p className="ia-error" role="alert">{error}</p>
      )}

      {loading ? (
        <p className="ia-empty">Loading applications...</p>
      ) : (
        <>
          {!error && applications.length === 0 && (
            <p className="ia-empty">No applications found.</p>
          )}

          {applications.map(app => (
            <article
              key={app._id}
              className="admin-application-card"
            >
              <div className="ia-card-header">
                <h3>{app.teachingDomain}</h3>

                <span className={`ia-badge ia-${app.status}`}>
                  {app.status}
                </span>
              </div>

              <div className="ia-details">
                <div className="ia-detail">
                  <strong>Qualifications</strong>
                  <p>{app.qualifications}</p>
                </div>

                <div className="ia-detail">
                  <strong>Experience</strong>
                  <p>{app.experience}</p>
                </div>

                <div className="ia-detail">
                  <strong>Teaching Introduction</strong>
                  <p>{app.teachingIntroduction}</p>
                </div>

                <div className="ia-detail">
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

              {app.status === 'pending' && (
                <div className="ia-review">
                  <textarea
                    placeholder="Enter admin feedback"
                    value={feedback[app._id] || ''}
                    onChange={e =>
                      setFeedback(prev => ({
                        ...prev,
                        [app._id]: e.target.value
                      }))
                    }
                  />

                  <label className="ia-check">
                    <input
                      type="checkbox"
                      checked={!!demoApproved[app._id]}
                      onChange={e =>
                        setDemoApproved(prev => ({
                          ...prev,
                          [app._id]: e.target.checked
                        }))
                      }
                    />
                    Teaching demo reviewed and approved
                  </label>

                  <div className="ia-actions">
                    <button
                      className="ia-approve"
                      disabled={reviewingId !== null}
                      onClick={() =>
                        reviewApplication(app._id, 'approved')
                      }
                    >
                      {reviewingId === app._id
                        ? 'Processing...'
                        : 'Approve'}
                    </button>

                    <button
                      className="ia-reject"
                      disabled={reviewingId !== null}
                      onClick={() =>
                        reviewApplication(app._id, 'rejected')
                      }
                    >
                      Reject
                    </button>
                  </div>
                </div>
              )}
            </article>
          ))}
        </>
      )}
    </section>
  )
}

export default InstructorApplications