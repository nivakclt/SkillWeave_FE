
import './Footer.css'

function Footer() {
  return (
    <footer className="footer" id="footer">

      <div className="footer-content">

        {/* Left column */}
        <div className="footer-intro">

          <a href="#home" className="footer-brand">
            <span className="footer-logo">S</span>
            <span>SkillWeave</span>
            <span className="footer-label">Learning platform</span>
          </a>

          <h2>
            Learn smarter.
            <br />
            <span>Grow further.</span>
          </h2>

          <p className="footer-description">
            SkillWeave brings learning and career readiness together.
            Discover courses, develop your skills, track your progress
            and prepare for your future.
          </p>

          <a href="#get-started" className="footer-download">
            Get Started
          </a>

          <p className="footer-copyright">
            © 2026 SkillWeave. All rights reserved.
          </p>

          <p className="footer-credit">
            Built with <span>♥</span> for learners.
          </p>

        </div>

        {/* Menu column */}
        <div className="footer-column">
          <h4>Menu</h4>
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#courses">Courses</a>
          <a href="#how-it-works">How It Works</a>
        </div>

        {/* Navigation column */}
        <div className="footer-column">
          <h4>Navigation</h4>
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
          <a href="#roadmap">Roadmap</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
        </div>

        {/* Explore column */}
        <div className="footer-column">
          <h4>Explore</h4>
          <a href="#courses">Explore Courses</a>
          <a href="#learning-paths">Learning Paths</a>
          <a href="#assessments">Assessments</a>
          <a href="#progress">Track Progress</a>
          <a href="#career">Career Readiness</a>
        </div>

      </div>

      {/* Large background brand */}
      <div className="footer-background-text">
        SkillWeave
      </div>

    </footer>
  )
}

export default Footer
