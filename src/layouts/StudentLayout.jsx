
import { NavLink, Outlet, Link } from 'react-router-dom'
import {
  LayoutDashboard,
  BookOpen,
  Compass,
  ChartNoAxesCombined,
  Brain,
  UserRound,
  LogOut,
  GraduationCap,
  Bell,
  Search,
  Menu,
  ClipboardCheck
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState } from "react";


function StudentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const menuItems = [
  { name: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
  { name: 'My Courses', path: '/student/courses', icon: BookOpen },
  { name: 'Explore Courses', path: '/student/browse', icon: Compass },
  { name: 'My Progress', path: '/student/progress', icon: ChartNoAxesCombined },
  { name: 'Learning Recovery', path: '/student/recovery', icon: Brain },
  { name: 'Become an Instructor', path: '/student/instructor-application', icon: ClipboardCheck },
  { name: 'My Profile', path: '/student/profile', icon: UserRound }
]
  const {logout}=useAuth()
  const navigate = useNavigate()
  const handleLogout = () =>{
    logout()
    navigate('/login',{replace:true})
  }

  return (
    <div className="student-layout">

      {/* Sidebar */}
      <aside className={`student-sidebar ${sidebarOpen ? 'open' : ''}`}>

        <Link to="/" className="student-brand">
          <span className="student-brand-icon">
            <GraduationCap size={25} />
          </span>
          <span>SkillWeave</span>
        </Link>

        <div className="sidebar-label">LEARNING SPACE</div>

        <nav className="student-nav">
          {menuItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? 'student-nav-link active' : 'student-nav-link'
                }
              >
                <Icon size={19} strokeWidth={1.8} />
                <span>{item.name}</span>
              </NavLink>
            )
          })}
        </nav>

        <div className="sidebar-help">
          <div className="help-icon">
            <Brain size={22} />
          </div>
          <h4>Keep learning!</h4>
          <p>Small steps today lead to big achievements tomorrow.</p>
          <Link to="/student/browse">Explore courses <span>→</span></Link>
        </div>

        <div className="student-sidebar-bottom">
          <div className="student-user">
            <div className="student-avatar">N</div>
            <div className="student-user-info">
              <h4>Niva K</h4>
              <p>Student Account</p>
            </div>
          </div>

          <button onClick={handleLogout}
           className="student-logout">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>

      </aside>

      {/* Main area */}
      <main className="student-main">

        <header className="student-topbar">
          <div className="topbar-left">
            <button onClick={()=>setSidebarOpen(!sidebarOpen)}
             className="mobile-menu">
              <Menu size={21} />
            </button>
            <div>
              <p className="topbar-subtitle">STUDENT PORTAL</p>
              <h3>My Learning Space</h3>
            </div>
          </div>

          <div className="topbar-right">
            <div className="topbar-search">
              <Search size={17} />
              <input type="text" placeholder="Search anything..." />
            </div>

            <button className="notification-btn">
              <Bell size={20} />
              <span></span>
            </button>

            <div className="topbar-avatar">N</div>
          </div>
        </header>

        <section className="student-content">
          <Outlet />
        </section>

      </main>

    </div>
  )
}

export default StudentLayout
