
import { useState } from 'react'
import {
  UserRound, Mail, Phone, MapPin, CalendarDays,
  GraduationCap, Edit3, Camera, ShieldCheck,
  BookOpen, Clock3, Trophy, X, Save
} from 'lucide-react'

function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false)

  const [profile, setProfile] = useState({
    name: 'Niva K',
    email: 'niva@example.com',
    phone: '',
    location: 'Kozhikode, Kerala',
    bio: 'Passionate learner interested in web development and building creative digital experiences.',
    education: 'Bachelor of Computer Applications',
    joined: 'November 2026'
  })

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = () => {
    setIsEditing(false)
  }

  return (
    <div className="student-profile-page">

      <div className="profile-page-heading">
        <div>
          <p className="section-eyebrow">ACCOUNT SETTINGS</p>
          <h1>My Profile</h1>
          <p>Manage your personal information and learning identity.</p>
        </div>
        <span className="profile-verified">
          <ShieldCheck size={15} /> Student Account
        </span>
      </div>

      <section className="profile-cover">
        <div className="profile-cover-pattern" />
        <div className="profile-cover-content">
          <div className="profile-main-avatar">
            <span>{profile.name.charAt(0).toUpperCase()}</span>
            <button aria-label="Change profile picture">
              <Camera size={15} />
            </button>
          </div>

          <div className="profile-cover-info">
            <h2>{profile.name}</h2>
            <p><Mail size={14} /> {profile.email}</p>
            <span>Student at SkillWeave</span>
          </div>

          <div className="profile-member-badge">
            <GraduationCap size={18} />
            <span>LEARNER</span>
          </div>
        </div>
      </section>

      <div className="profile-body-grid">

        <section className="profile-info-panel">
          <div className="profile-panel-heading">
            <div>
              <h2>Personal Information</h2>
              <p>Keep your profile information up to date.</p>
            </div>

            {isEditing ? (
              <button className="profile-edit-btn cancel" onClick={() => setIsEditing(false)}>
                <X size={15} /> Cancel
              </button>
            ) : (
              <button className="profile-edit-btn" onClick={() => setIsEditing(true)}>
                <Edit3 size={15} /> Edit Profile
              </button>
            )}
          </div>

          <div className="profile-fields-grid">

            <div className="profile-field">
              <label>Full Name</label>
              <div className="profile-input-wrap">
                <UserRound size={16} />
                <input
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="profile-field">
              <label>Email Address</label>
              <div className="profile-input-wrap">
                <Mail size={16} />
                <input
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="profile-field">
              <label>Phone Number</label>
              <div className="profile-input-wrap">
                <Phone size={16} />
                <input
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  placeholder="Add phone number"
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="profile-field">
              <label>Location</label>
              <div className="profile-input-wrap">
                <MapPin size={16} />
                <input
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="profile-field full-width">
              <label>Education</label>
              <div className="profile-input-wrap">
                <GraduationCap size={16} />
                <input
                  name="education"
                  value={profile.education}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="profile-field full-width">
              <label>About Me</label>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                disabled={!isEditing}
                rows="4"
              />
            </div>

          </div>

          {isEditing && (
            <div className="profile-save-area">
              <button className="profile-save-btn" onClick={handleSave}>
                <Save size={16} /> Save Changes
              </button>
            </div>
          )}
        </section>

        <aside className="profile-side-column">

          <section className="profile-info-panel profile-activity-panel">
            <h2>Learning Overview</h2>
            <p>Your learning journey at a glance.</p>

            <div className="profile-overview-item">
              <div className="overview-icon purple"><BookOpen size={18} /></div>
              <div><strong>08</strong><span>Enrolled Courses</span></div>
            </div>

            <div className="profile-overview-item">
              <div className="overview-icon blue"><Clock3 size={18} /></div>
              <div><strong>24.5h</strong><span>Learning Hours</span></div>
            </div>

            <div className="profile-overview-item">
              <div className="overview-icon gold"><Trophy size={18} /></div>
              <div><strong>02</strong><span>Courses Completed</span></div>
            </div>
          </section>

          <section className="profile-info-panel profile-account-panel">
            <h2>Account Information</h2>

            <div>
              <CalendarDays size={16} />
              <span>Member since</span>
              <strong>{profile.joined}</strong>
            </div>

            <div>
              <ShieldCheck size={16} />
              <span>Account type</span>
              <strong>Student</strong>
            </div>
          </section>

        </aside>
      </div>

    </div>
  )
}

export default StudentProfile
