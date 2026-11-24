
import { NavLink, Outlet, Link } from 'react-router-dom'
import {
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  Users,
  ClipboardList,
  ChartNoAxesCombined,
  UserRound,
  LogOut,
  GraduationCap,
  Bell,
  Search,
  Menu
} from 'lucide-react'

function InstructorLayout() {
  const menuItems = [
    {
      name: 'Dashboard',
      path: '/instructor/dashboard',
      icon: LayoutDashboard
    },
    {
      name: 'My Courses',
      path: '/instructor/courses',
      icon: BookOpen
    },
    {
      name: 'Create Course',
      path: '/instructor/create-course',
      icon: PlusCircle
    },
    {
      name: 'Students',
      path: '/instructor/students',
      icon: Users
    },
    {
      name: 'Quiz Management',
      path: '/instructor/quizzes',
      icon: ClipboardList
    },
    {
      name: 'Performance',
      path: '/instructor/performance',
      icon: ChartNoAxesCombined
    },
    {
      name: 'My Profile',
      path: '/instructor/profile',
      icon: UserRound
    }
  ]

  return (
    <div className="instructor-layout">

      {/* Sidebar */}
      <aside className="instructor-sidebar">

        <Link to="/" className="instructor-brand">
          <span className="instructor-brand-icon">
            <GraduationCap size={25} />
          </span>
          <span>SkillWeave</span>
        </Link>

        <div className="instructor-sidebar-label">
          TEACHING SPACE
        </div>

        <nav className="instructor-nav">
          {menuItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/instructor/dashboard'}
                className={({ isActive }) =>
                  isActive
                    ? 'instructor-nav-link active'
                    : 'instructor-nav-link'
                }
              >
                <Icon size={19} strokeWidth={1.8} />
                <span>{item.name}</span>
              </NavLink>
            )
          })}
        </nav>

        {/* Help Card */}
        <div className="instructor-sidebar-help">
          <div className="instructor-help-icon">
            <GraduationCap size={22} />
          </div>

          <h4>Inspire learners!</h4>

          <p>
            Share your knowledge and help students achieve their goals.
          </p>

          <Link to="/instructor/create-course">
            Create a course <span>→</span>
          </Link>
        </div>

        {/* Sidebar Bottom */}
        <div className="instructor-sidebar-bottom">

          <div className="instructor-user">
            <div className="instructor-avatar">I</div>

            <div className="instructor-user-info">
              <h4>Instructor</h4>
              <p>Instructor Account</p>
            </div>
          </div>

          <button className="instructor-logout">
            <LogOut size={18} />
            <span>Logout</span>
          </button>

        </div>

      </aside>

      {/* Main Content */}
      <main className="instructor-main">

        {/* Topbar */}
        <header className="instructor-topbar">

          <div className="instructor-topbar-left">

            <button
              className="instructor-mobile-menu"
              aria-label="Open navigation menu"
            >
              <Menu size={21} />
            </button>

            <div>
              <p className="instructor-topbar-subtitle">
                INSTRUCTOR PORTAL
              </p>

              <h3>Teaching Workspace</h3>
            </div>

          </div>

          <div className="instructor-topbar-right">

            <div className="instructor-topbar-search">
              <Search size={17} />

              <input
                type="text"
                placeholder="Search anything..."
              />
            </div>

            <button
              className="instructor-notification-btn"
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span></span>
            </button>

            <div className="instructor-topbar-avatar">
              I
            </div>

          </div>

        </header>

        {/* Nested Pages Render Here */}
        <section className="instructor-content">
          <Outlet />
        </section>

      </main>

    </div>
  )
}

export default InstructorLayout
