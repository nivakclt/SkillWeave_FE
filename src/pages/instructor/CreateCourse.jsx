
import { useState } from 'react'
import {
  ArrowLeft,
  ImagePlus,
  Plus,
  X,
  BookOpen,
  Save,
  Send
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function CreateCourse() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    category: '',
    level: 'Beginner',
    language: 'English',
    price: '',
    objectives: [''],
    requirements: ['']
  })

  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailPreview, setThumbnailPreview] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleListChange = (type, index, value) => {
    const updatedList = [...formData[type]]
    updatedList[index] = value

    setFormData(prev => ({
      ...prev,
      [type]: updatedList
    }))
  }

  const addListItem = (type) => {
    setFormData(prev => ({
      ...prev,
      [type]: [...prev[type], '']
    }))
  }

  const removeListItem = (type, index) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }))
  }

  const handleThumbnail = (e) => {
    const file = e.target.files[0]

    if (file) {
      setThumbnail(file)
      setThumbnailPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log('Course form data:', formData)
    console.log('Course thumbnail:', thumbnail)

    alert('UI completed! Backend integration will be added later.')
  }

  return (
    <div className="instructor-create-page">

      <button
        className="instructor-back-btn"
        onClick={() => navigate('/instructor/courses')}
      >
        <ArrowLeft size={17} />
        Back to Courses
      </button>

      <div className="instructor-create-heading">
        <div>
          <span className="instructor-eyebrow">COURSE MANAGEMENT</span>
          <h1>Create New Course</h1>
          <p>Share your knowledge by creating a new learning experience.</p>
        </div>

        <div className="instructor-create-heading-icon">
          <BookOpen size={28} />
        </div>
      </div>

      <form onSubmit={handleSubmit}>

        <div className="instructor-create-grid">

          <div className="instructor-create-main">

            <section className="instructor-create-card">
              <div className="instructor-section-heading">
                <div>
                  <h2>Basic Information</h2>
                  <p>Give your course a clear title and description.</p>
                </div>
                <span>01</span>
              </div>

              <div className="instructor-form-group">
                <label>Course Title *</label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Complete React.js Development"
                  required
                />
              </div>

              <div className="instructor-form-group">
                <label>Course Subtitle</label>
                <input
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  placeholder="A short description of your course"
                />
              </div>

              <div className="instructor-form-group">
                <label>Course Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="What will students learn from this course?"
                  rows={6}
                  required
                />
              </div>
            </section>

            <section className="instructor-create-card">
              <div className="instructor-section-heading">
                <div>
                  <h2>Learning Objectives</h2>
                  <p>What will students be able to do after this course?</p>
                </div>
                <span>02</span>
              </div>

              {formData.objectives.map((item, index) => (
                <div className="instructor-dynamic-row" key={index}>
                  <input
                    value={item}
                    onChange={e =>
                      handleListChange('objectives', index, e.target.value)
                    }
                    placeholder={`Learning objective ${index + 1}`}
                  />

                  {formData.objectives.length > 1 && (
                    <button
                      type="button"
                      className="instructor-remove-btn"
                      onClick={() => removeListItem('objectives', index)}
                    >
                      <X size={17} />
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                className="instructor-add-item-btn"
                onClick={() => addListItem('objectives')}
              >
                <Plus size={16} />
                Add Objective
              </button>
            </section>

            <section className="instructor-create-card">
              <div className="instructor-section-heading">
                <div>
                  <h2>Requirements</h2>
                  <p>What should students know before starting?</p>
                </div>
                <span>03</span>
              </div>

              {formData.requirements.map((item, index) => (
                <div className="instructor-dynamic-row" key={index}>
                  <input
                    value={item}
                    onChange={e =>
                      handleListChange('requirements', index, e.target.value)
                    }
                    placeholder={`Requirement ${index + 1}`}
                  />

                  {formData.requirements.length > 1 && (
                    <button
                      type="button"
                      className="instructor-remove-btn"
                      onClick={() => removeListItem('requirements', index)}
                    >
                      <X size={17} />
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                className="instructor-add-item-btn"
                onClick={() => addListItem('requirements')}
              >
                <Plus size={16} />
                Add Requirement
              </button>
            </section>

          </div>

          <div className="instructor-create-sidebar">

            <section className="instructor-create-card">
              <div className="instructor-section-heading">
                <div>
                  <h2>Course Thumbnail</h2>
                  <p>Upload a cover image.</p>
                </div>
                <span>04</span>
              </div>

              <label className="instructor-thumbnail-upload">
                {thumbnailPreview ? (
                  <img src={thumbnailPreview} alt="Course thumbnail preview" />
                ) : (
                  <>
                    <ImagePlus size={30} />
                    <strong>Upload Thumbnail</strong>
                    <span>PNG, JPG or WEBP</span>
                    <small>Recommended: 1280 × 720 px</small>
                  </>
                )}

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleThumbnail}
                  hidden
                />
              </label>
            </section>

            <section className="instructor-create-card">
              <div className="instructor-section-heading">
                <div>
                  <h2>Course Settings</h2>
                  <p>Configure your course details.</p>
                </div>
                <span>05</span>
              </div>

              <div className="instructor-form-group">
                <label>Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select category</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Programming">Programming</option>
                  <option value="Design">Design</option>
                  <option value="Database">Database</option>
                  <option value="Business">Business</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="instructor-form-group">
                <label>Difficulty Level</label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>All Levels</option>
                </select>
              </div>

              <div className="instructor-form-group">
                <label>Language</label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                >
                  <option>English</option>
                  <option>Malayalam</option>
                  <option>Hindi</option>
                </select>
              </div>

              <div className="instructor-form-group">
                <label>Course Price (₹) *</label>
                <input
                  type="number"
                  name="price"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter course price"
                  required
                />
              </div>
            </section>

          </div>

        </div>

        <div className="instructor-create-actions">
          <button
            type="button"
            className="instructor-save-draft-btn"
            onClick={handleSubmit}
          >
            <Save size={17} />
            Save as Draft
          </button>

          <button type="submit" className="instructor-publish-btn">
            <Send size={16} />
            Publish Course
          </button>
        </div>

      </form>
    </div>
  )
}

export default CreateCourse
