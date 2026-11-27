import { useEffect, useState } from 'react'
import axiosInstance from '../../api/axiosInstance'

function InstructorApplication() {
  const [application, setApplication] = useState(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    teachingDomain: '',
    qualifications: '',
    experience: '',
    portfolioUrl: '',
    teachingIntroduction: ''
  })

  const[assessment,setAssessment]=useState(null)
  const[answers,setAnswers]=useState([])
  const[demoUrl,setDemoUrl]=useState('')
  const[actionloading,setActionLoading]=useState(false)

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await axiosInstance.get('/instructor/my-application')
        setApplication(res.data.application)
      } catch (error) {
        if (error.response?.status !== 404) {
          setMessage('Unable to load application')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchApplication()
  }, [])

  useEffect(()=>{
    if(!application || application.status!=='pending')return
    const fetchAssessment = async()=>{
        try{
            const res = await axiosInstance.get('/instructor/my-assessment')
            setAssessment(res.data)
        }catch(error){
            if(error.response?.status!==404){
                setMessage('Unable to Load Assessment')
            }
        }
    }
    fetchAssessment()
  },[application])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axiosInstance.post('/instructor/apply', form)
      setApplication(res.data.application)
      setMessage('Application submitted successfully')
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        error.response?.data ||
        'Application submission failed'
      )
    }
  }

  const handleAssessmentSubmit = async(e)=>{
    e.preventDefault()
    if(answers.length!==assessment.questions.length||
        !assessment.questions.every((_,i)=>
    Number.isInteger(answers[i]))){
        setMessage('Please answer all questions')
        return
    }
    setActionLoading(true)
    try {
        const res = await axiosInstance.post('/instructor/submit-assessment',{answers})
        setAssessment((prev)=>({
            ...prev,score:res.data.score,
            status:res.data.status
        }))
        setMessage('Assessment Submitted Successfully')
    } catch (error) {
        setMessage(error.response?.data?.message
            ||error.response?.data ||
            'Assessment submission failed'
        )
    }finally{
        setActionLoading(false)
    }
  }
  const handleDemoSubmit = async(e)=>{
    e.preventDefault()
    setActionLoading(true)
     try {
    const res = await axiosInstance.post(
      '/instructor/submit-demo',
      { teachingDemoUrl: demoUrl }
    )

    setApplication((prev) => ({
      ...prev,
      teachingDemoUrl: res.data.teachingDemoUrl
    }))

    setMessage('Teaching demo submitted successfully')
  } catch (error) {
    setMessage(
      error.response?.data?.message ||
      error.response?.data ||
      'Teaching demo submission failed'
    )
  } finally {
    setActionLoading(false)
  }
}
  }

  if (loading) {
    return <div className="ia-loading">Loading application...</div>
  }

  return (
    <div className="ia-page">
      <style>{`
        .ia-page {
          min-height: 100vh;
          background: #f4f7fc;
          padding: 48px 20px;
          font-family: 'Manrope', Arial, sans-serif;
          color: #17233c;
          box-sizing: border-box;
        }

        .ia-page * {
          box-sizing: border-box;
        }

        .ia-container {
          max-width: 850px;
          margin: 0 auto;
        }

        .ia-hero {
          background: linear-gradient(120deg, #172c70, #345ee9);
          color: white;
          padding: 34px 36px;
          border-radius: 20px;
          margin-bottom: 24px;
          box-shadow: 0 12px 30px rgba(37, 71, 160, 0.15);
        }

        .ia-tag {
          display: inline-block;
          background: rgba(255, 255, 255, 0.16);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 30px;
          padding: 6px 13px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          margin-bottom: 14px;
        }

        .ia-hero h1 {
          font-size: clamp(26px, 4vw, 38px);
          margin: 0 0 10px;
          color: white;
          line-height: 1.2;
        }

        .ia-hero p {
          margin: 0;
          color: #e0e8ff;
          line-height: 1.7;
          font-size: 15px;
        }

        .ia-card {
          background: white;
          border: 1px solid #e0e6f0;
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 8px 28px rgba(30, 50, 90, 0.06);
        }

        .ia-card h2 {
          font-size: 23px;
          margin: 0 0 8px;
          color: #17233c;
        }

        .ia-description {
          margin: 0 0 26px;
          color: #65738a;
          font-size: 14px;
          line-height: 1.6;
        }

        .ia-field {
          margin-bottom: 20px;
        }

        .ia-field label {
          display: block;
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 8px;
          color: #263650;
        }

        .ia-field input,
        .ia-field select,
        .ia-field textarea {
          display: block;
          width: 100%;
          padding: 13px 15px;
          border: 1px solid #d7dfeb;
          border-radius: 10px;
          background: #f9fbfe;
          color: #17233c;
          font: inherit;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .ia-field textarea {
          min-height: 105px;
          resize: vertical;
        }

        .ia-field input:focus,
        .ia-field select:focus,
        .ia-field textarea:focus {
          border-color: #345ee9;
          box-shadow: 0 0 0 3px rgba(52, 94, 233, 0.12);
          background: white;
        }

        .ia-field input::placeholder,
        .ia-field textarea::placeholder {
          color: #8995a8;
        }

        .ia-button {
          width: 100%;
          border: 0;
          border-radius: 11px;
          padding: 15px 20px;
          background: #3158df;
          color: white;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }

        .ia-button:hover {
          background: #2446c2;
          transform: translateY(-1px);
        }

        .ia-message {
          background: #eef3ff;
          color: #2544a3;
          border: 1px solid #d4e0ff;
          padding: 13px 16px;
          border-radius: 10px;
          margin-bottom: 20px;
          font-size: 14px;
        }

        .ia-status-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 16px 0;
          border-bottom: 1px solid #e8edf5;
        }

        .ia-status-row:last-child {
          border-bottom: 0;
        }

        .ia-status-label {
          font-size: 14px;
          font-weight: 700;
          color: #53627a;
        }

        .ia-status-value {
          text-align: right;
          font-size: 14px;
          color: #17233c;
          overflow-wrap: anywhere;
        }

        .ia-badge {
          display: inline-block;
          padding: 6px 13px;
          border-radius: 30px;
          font-size: 12px;
          font-weight: 700;
          text-transform: capitalize;
        }

        .ia-badge.pending {
          background: #fff3d6;
          color: #946000;
        }

        .ia-badge.approved {
          background: #dcf7e8;
          color: #137443;
        }

        .ia-badge.rejected {
          background: #ffe4e6;
          color: #b42338;
        }

        .ia-loading {
          min-height: 50vh;
          display: grid;
          place-items: center;
          color: #3158df;
          font: 600 16px Arial, sans-serif;
        }

        @media (max-width: 600px) {
          .ia-page {
            padding: 20px 12px;
          }

          .ia-hero, .ia-card {
            padding: 22px 18px;
            border-radius: 14px;
          }

          .ia-status-row {
            align-items: flex-start;
          }
        }
      `}</style>

      <div className="ia-container">
        <header className="ia-hero">
          <span className="ia-tag">SKILLWEAVE · INSTRUCTOR</span>
          <h1>Become an Instructor</h1>
          <p>
            Apply to share your knowledge and help SkillWeave learners
            build their careers.
          </p>
        </header>

        <section className="ia-card">
          {message && (
            <div className="ia-message" role="status">
              {typeof message === 'string'
                ? message
                : 'An unexpected error occurred'}
            </div>
          )}

          {application ? (
            <>
              <h2>Application Status</h2>
              <p className="ia-description">
                Track your instructor application and admin feedback.
              </p>

              <div className="ia-status-row">
                <span className="ia-status-label">Teaching Domain</span>
                <span className="ia-status-value">
                  {application.teachingDomain}
                </span>
              </div>

              <div className="ia-status-row">
                <span className="ia-status-label">Status</span>
                <span className={`ia-badge ${application.status}`}>
                  {application.status}
                </span>
              </div>

              <div className="ia-status-row">
                <span className="ia-status-label">Admin Feedback</span>
                <span className="ia-status-value">
                  {application.adminFeedback || 'No feedback yet'}
                </span>
              </div>
              <div className="ia-status-row">
                <span className="ia-status-label">Admin Feedback</span>
                <span className="ia-status-value">
                    {application.adminFeedback || 'No feedback yet'}
                </span>
                </div>
            </>
          ) : (
            <>
              <h2>Instructor Application</h2>
              <p className="ia-description">
                Complete the details below to submit your application.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="ia-field">
                  <label htmlFor="teachingDomain">Teaching Domain</label>
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
                  <label htmlFor="qualifications">Qualifications</label>
                  <input
                    id="qualifications"
                    name="qualifications"
                    placeholder="Your educational qualifications"
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
                    placeholder="Describe your relevant experience"
                    value={form.experience}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="ia-field">
                  <label htmlFor="portfolioUrl">Portfolio URL</label>
                  <input
                    id="portfolioUrl"
                    name="portfolioUrl"
                    type="url"
                    placeholder="https://your-portfolio.com"
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
                    placeholder="Introduce your teaching approach"
                    value={form.teachingIntroduction}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button className="ia-button" type="submit">
                  Submit Application
                </button>
              </form>
            </>
          )}
        </section>
      </div>
    </div>
  )
}

export default InstructorApplication