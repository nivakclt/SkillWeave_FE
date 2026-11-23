import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <a href="#home" className="navbar-brand">
        <span className="navbar-logo">
          <span className="navbar-logo-inner">S</span>
        </span>
        <span className="navbar-brand-name">SkillWeave</span>
      </a>

      <div className="navbar-links">
        <a href="#features">Features</a>
        <a href="#courses">Courses</a>
        <a href="#how-it-works">How It Works</a>
        <a href="#about">About</a>
        <a href="#pricing">Contact</a>
      </div>

      <a href="#get-started" className="navbar-cta">
        Get Started
      </a>
    </nav>
  )
}

export default Navbar