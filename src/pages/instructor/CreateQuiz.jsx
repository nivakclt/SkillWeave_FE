
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ClipboardList,
  Clock,
  BookOpen,
  Target,
  Save,
  Plus,
  Trash2,
  CheckCircle2,
  Tag
} from 'lucide-react'

const IT_CATEGORIES = [
  'Software & Web Development',
  'Cybersecurity',
  'Networking & Infrastructure',
  'Cloud Computing & DevOps',
  'Data Science & AI',
  'UI/UX Design',
  'Database Management',
  'Software Testing & QA'
]

const TOPICS_BY_CATEGORY = {
  'Software & Web Development': [
    'JavaScript',
    'React',
    'Node.js',
    'Express.js',
    'Next.js',
    'HTML & CSS',
    'Python',
    'Java',
    'API Development'
  ],
  Cybersecurity: [
    'Network Security',
    'Ethical Hacking Fundamentals',
    'Cryptography',
    'Web Security',
    'Security Fundamentals'
  ],
  'Networking & Infrastructure': [
    'OSI Model',
    'TCP/IP',
    'DNS & DHCP',
    'Routing & Switching',
    'Linux Fundamentals'
  ],
  'Cloud Computing & DevOps': [
    'AWS',
    'Azure',
    'Docker',
    'Kubernetes',
    'CI/CD',
    'Cloud Fundamentals'
  ],
  'Data Science & AI': [
    'Python for Data Science',
    'SQL Analytics',
    'Machine Learning',
    'Generative AI',
    'Data Visualization'
  ],
  'UI/UX Design': [
    'Figma',
    'Wireframing',
    'Prototyping',
    'Design Principles',
    'Accessibility'
  ],
  'Database Management': [
    'MongoDB',
    'MySQL',
    'PostgreSQL',
    'Database Design',
    'SQL Queries'
  ],
  'Software Testing & QA': [
    'Manual Testing',
    'Automation Testing',
    'Test Cases',
    'API Testing',
    'Bug Reporting'
  ]
}

const createEmptyQuestion = () => ({
  id: Date.now() + Math.random(),
  questionText: '',
  options: ['', '', '', ''],
  correctAnswer: 0,
  marks: 1,
  topic: '',
  misconceptionTags: []
})

function CreateQuiz() {
  const navigate = useNavigate()

  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    category: '',
    course: '',
    duration: 20,
    passingScore: 50,
    questions: []
  })

  const [currentQuestion, setCurrentQuestion] = useState(
    createEmptyQuestion()
  )

  const [newMisconception, setNewMisconception] = useState('')

  const availableTopics = TOPICS_BY_CATEGORY[quizData.category] || []

  const handleQuizChange = (e) => {
    const { name, value } = e.target

    setQuizData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'category' ? { course: '' } : {})
    }))
  }

  const handleQuestionChange = (field, value) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const handleOptionChange = (index, value) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      options: prev.options.map((option, i) =>
        i === index ? value : option
      )
    }))
  }

  const addMisconceptionTag = () => {
    const tag = newMisconception.trim()

    if (!tag) return

    if (
      currentQuestion.misconceptionTags.some(
        (item) => item.toLowerCase() === tag.toLowerCase()
      )
    ) {
      return
    }

    setCurrentQuestion((prev) => ({
      ...prev,
      misconceptionTags: [...prev.misconceptionTags, tag]
    }))

    setNewMisconception('')
  }

  const removeMisconceptionTag = (tagToRemove) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      misconceptionTags: prev.misconceptionTags.filter(
        (tag) => tag !== tagToRemove
      )
    }))
  }

  const addQuestion = () => {
    const validOptions = currentQuestion.options.every(
      (option) => option.trim() !== ''
    )

    if (
      !currentQuestion.questionText.trim() ||
      !currentQuestion.topic ||
      !validOptions
    ) {
      alert('Please complete the question, all options and topic.')
      return
    }

    setQuizData((prev) => ({
      ...prev,
      questions: [...prev.questions, currentQuestion]
    }))

    setCurrentQuestion(createEmptyQuestion())
    setNewMisconception('')
  }

  const removeQuestion = (id) => {
    setQuizData((prev) => ({
      ...prev,
      questions: prev.questions.filter((question) => question.id !== id)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (quizData.questions.length === 0) {
      alert('Please add at least one question.')
      return
    }

    console.log('Complete Quiz Data:', quizData)
    alert('Quiz saved. Backend integration will be added later.')
    navigate('/instructor/quizzes')
  }

  return (
    <div className="create-quiz-page">
      <button
        type="button"
        className="quiz-back-btn"
        onClick={() => navigate('/instructor/quizzes')}
      >
        <ArrowLeft size={17} />
        Back to Quizzes
      </button>

      <div className="create-quiz-heading">
        <div>
          <span className="instructor-eyebrow">ASSESSMENTS</span>
          <h1>Create New Quiz</h1>
          <p>Build assessments across different IT learning domains.</p>
        </div>
      </div>

      <form className="create-quiz-form" onSubmit={handleSubmit}>
        <div className="create-quiz-section">
          <div className="create-quiz-section-heading">
            <div className="create-quiz-section-icon">
              <ClipboardList size={20} />
            </div>
            <div>
              <h2>Quiz Information</h2>
              <p>Set up the basic details of your assessment.</p>
            </div>
          </div>

          <div className="create-quiz-fields">
            <div className="create-quiz-field full">
              <label>Quiz Title</label>
              <input
                type="text"
                name="title"
                placeholder="e.g. React Fundamentals Assessment"
                value={quizData.title}
                onChange={handleQuizChange}
                required
              />
            </div>

            <div className="create-quiz-field full">
              <label>Description</label>
              <textarea
                name="description"
                rows="3"
                placeholder="Describe the purpose of this assessment..."
                value={quizData.description}
                onChange={handleQuizChange}
                required
              />
            </div>

            <div className="create-quiz-field">
              <label>IT Domain</label>
              <select
                name="category"
                value={quizData.category}
                onChange={handleQuizChange}
                required
              >
                <option value="">Select IT domain</option>
                {IT_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="create-quiz-field">
              <label>Course</label>
              <input
                type="text"
                name="course"
                placeholder="Enter course name"
                value={quizData.course}
                onChange={handleQuizChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="create-quiz-section">
          <div className="create-quiz-section-heading">
            <div className="create-quiz-section-icon">
              <Target size={20} />
            </div>
            <div>
              <h2>Quiz Settings</h2>
              <p>Configure the assessment rules.</p>
            </div>
          </div>

          <div className="create-quiz-fields settings">
            <div className="create-quiz-field">
              <label>
                <Clock size={15} />
                Time Limit (minutes)
              </label>
              <input
                type="number"
                name="duration"
                min="1"
                value={quizData.duration}
                onChange={handleQuizChange}
                required
              />
            </div>

            <div className="create-quiz-field">
              <label>
                <Target size={15} />
                Passing Score (%)
              </label>
              <input
                type="number"
                name="passingScore"
                min="1"
                max="100"
                value={quizData.passingScore}
                onChange={handleQuizChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="create-quiz-section">
          <div className="create-quiz-section-heading">
            <div className="create-quiz-section-icon">
              <Plus size={20} />
            </div>
            <div>
              <h2>Question Builder</h2>
              <p>Add questions, topics and possible misconception tags.</p>
            </div>
          </div>

          <div className="create-question-editor">
            <div className="create-quiz-field full">
              <label>Question</label>
              <textarea
                rows="3"
                placeholder="Enter your question..."
                value={currentQuestion.questionText}
                onChange={(e) =>
                  handleQuestionChange('questionText', e.target.value)
                }
              />
            </div>

            <div className="create-quiz-field full">
              <label>Answer Options</label>

              {currentQuestion.options.map((option, index) => (
                <div className="quiz-option-input" key={index}>
                  <span>{String.fromCharCode(65 + index)}</span>
                  <input
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(index, e.target.value)
                    }
                  />

                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={currentQuestion.correctAnswer === index}
                    onChange={() =>
                      handleQuestionChange('correctAnswer', index)
                    }
                    title="Mark as correct answer"
                  />
                </div>
              ))}
              <small>Select the radio button beside the correct answer.</small>
            </div>

            <div className="create-quiz-fields">
              <div className="create-quiz-field">
                <label>Learning Topic</label>
                <select
                  value={currentQuestion.topic}
                  onChange={(e) =>
                    handleQuestionChange('topic', e.target.value)
                  }
                  disabled={!quizData.category}
                >
                  <option value="">Select topic</option>
                  {availableTopics.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>

              <div className="create-quiz-field">
                <label>Marks</label>
                <input
                  type="number"
                  min="1"
                  value={currentQuestion.marks}
                  onChange={(e) =>
                    handleQuestionChange('marks', Number(e.target.value))
                  }
                />
              </div>
            </div>

            <div className="create-quiz-field full misconception-field">
              <label>
                <Tag size={15} />
                Possible Misconception Tags
              </label>

              <p>
                Add common misunderstandings this question can help identify.
              </p>

              <div className="misconception-input-row">
                <input
                  type="text"
                  placeholder="e.g. State changes immediately"
                  value={newMisconception}
                  onChange={(e) => setNewMisconception(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addMisconceptionTag()
                    }
                  }}
                />
                <button type="button" onClick={addMisconceptionTag}>
                  Add Tag
                </button>
              </div>

              <div className="misconception-tags">
                {currentQuestion.misconceptionTags.map((tag) => (
                  <span key={tag}>
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeMisconceptionTag(tag)}
                      aria-label={`Remove ${tag}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="add-quiz-question-btn"
              onClick={addQuestion}
            >
              <Plus size={17} />
              Add Question
            </button>
          </div>

          <div className="added-questions-list">
            <h3>Added Questions ({quizData.questions.length})</h3>

            {quizData.questions.length === 0 ? (
              <p className="no-questions-message">
                Your added questions will appear here.
              </p>
            ) : (
              quizData.questions.map((question, index) => (
                <div className="added-question-card" key={question.id}>
                  <div>
                    <strong>Question {index + 1}</strong>
                    <p>{question.questionText}</p>
                    <small>
                      {question.topic} · {question.marks} marks ·{' '}
                      {question.misconceptionTags.length} misconception tags
                    </small>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeQuestion(question.id)}
                    title="Remove question"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="create-quiz-footer">
          <button
            type="button"
            className="quiz-cancel-btn"
            onClick={() => navigate('/instructor/quizzes')}
          >
            Cancel
          </button>

          <button type="submit" className="quiz-save-btn">
            <Save size={17} />
            Save Quiz
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateQuiz
