
import './Navbar.css'
import { Link } from 'react-router-dom'


function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="navbar-logo">
          <span className="navbar-logo-inner">S</span>
        </span>
        <span className="navbar-brand-name">SkillWeave</span>
      </Link>

      <div className="navbar-links">
        <Link to="/#courses">Courses</Link>
        <Link to="/#how-it-works">How It Works</Link>
        <Link to="/about">About</Link>
        <Link to="/about#contact">Contact</Link>
      </div>

      <Link to="/register" className="navbar-cta">
        Get Started
      </Link>
    </nav>
  )
}

export default Navbar
