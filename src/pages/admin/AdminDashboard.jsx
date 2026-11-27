import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  LayoutDashboard, Users, GraduationCap, BookOpen,
  ClipboardCheck, ShieldCheck, LogOut,
  Menu, ArrowUpRight
} from 'lucide-react'
import { useState } from 'react'

function AdminDashboard() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const navItems = [
    { title: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    {
      title: 'Instructor Applications',
      path: '/admin/instructor-applications',
      icon: ClipboardCheck
    }
  ]

  const stats = [
    { title: 'Total Users', icon: Users },
    { title: 'Students', icon: GraduationCap },
    { title: 'Instructors', icon: ShieldCheck },
    { title: 'Courses', icon: BookOpen }
  ]

  const s = {
    shell: {
      display: 'flex',
      minHeight: '100vh',
      background: '#f7f7f5',
      fontFamily: 'Arial, sans-serif',
      color: '#181818'
    },
    sidebar: {
      width: 230,
      flexShrink: 0,
      background: '#fff',
      borderRight: '1px solid #e5e5e5',
      padding: 20,
      boxSizing: 'border-box'
    },
    nav: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '12px',
      borderRadius: 10,
      textDecoration: 'none',
      color: '#333',
      marginBottom: 5
    },
    main: { flex: 1, minWidth: 0 },
    topbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 24px',
      background: '#fff',
      borderBottom: '1px solid #e5e5e5'
    },
    content: { padding: 28 },
    welcome: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      padding: 32,
      borderRadius: 20,
      background: 'linear-gradient(120deg, #e8edff, #f2efff)',
      border: '1px solid #dce1fa'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: 16
    },
    card: {
      background: '#fff',
      border: '1px solid #e4e4e4',
      borderRadius: 16,
      padding: 20
    }
  }

  return (
    <div style={s.shell}>
      <style>{`
        @media (max-width: 900px) {
          .admin-side {
            display: none;
            position: fixed;
            inset: 0 auto 0 0;
            z-index: 1001;
            overflow-y: auto;
          }
          .admin-side.open { display: block; }
          .admin-menu { display: inline-flex !important; }
          .admin-content { padding: 16px !important; }
        }
      `}</style>

      <aside
        className={`admin-side ${menuOpen ? 'open' : ''}`}
        style={s.sidebar}
      >
        <h2 style={{ fontFamily: 'Georgia, serif' }}>SkillWeave</h2>
        <p style={{ fontSize: 11, color: '#777' }}>ADMIN WORKSPACE</p>

        {navItems.map(({ title, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            onClick={() => setMenuOpen(false)}
            style={({ isActive }) => ({
              ...s.nav,
              background: isActive ? '#e9edff' : 'transparent',
              color: isActive ? '#315bd8' : '#333'
            })}
          >
            <Icon size={18} />
            {title}
          </NavLink>
        ))}
      </aside>

      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'fixed', inset: 0,
            background: '#0005', zIndex: 1000
          }}
        />
      )}

      <main style={s.main}>
        <header style={s.topbar}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              className="admin-menu"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ display: 'none', cursor: 'pointer' }}
              aria-label="Toggle admin menu"
            >
              <Menu size={21} />
            </button>

            <div>
              <small>ADMIN PORTAL</small>
              <h3 style={{ margin: 0 }}>Administration Workspace</h3>
            </div>
          </div>

          <button
            onClick={handleLogout}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: '#181818', color: '#fff', border: 0,
              padding: '10px 16px', borderRadius: 20, cursor: 'pointer'
            }}
          >
            <LogOut size={17} /> Logout
          </button>
        </header>

        <div className="admin-content" style={s.content}>
          <section style={s.welcome}>
            <div>
              <small style={{ color: '#315bd8' }}>
                ADMIN OVERVIEW
              </small>
              <h1 style={{ fontFamily: 'Georgia, serif', margin: '12px 0' }}>
                Welcome back, Admin!
              </h1>
              <p>Manage your platform and monitor its activity.</p>
            </div>
            <ShieldCheck size={48} color="#315bd8" />
          </section>

          <section style={{ ...s.grid, marginTop: 24 }}>
            {stats.map(({ title, icon: Icon }) => (
              <article key={title} style={s.card}>
                <Icon size={24} color="#315bd8" />
                <p>{title}</p>
                <h2 style={{ fontFamily: 'Georgia, serif' }}>—</h2>
                <small>Awaiting data</small>
              </article>
            ))}
          </section>

          <section style={{ ...s.card, marginTop: 24 }}>
            <h2 style={{ fontFamily: 'Georgia, serif' }}>
              Platform Management
            </h2>
            <h3>Instructor Applications</h3>
            <p>Review and approve instructor applications.</p>
            <Link
              to="/admin/instructor-applications"
              style={{ color: '#315bd8', textDecoration: 'none' }}
            >
              View Applications <ArrowUpRight size={15} />
            </Link>
          </section>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard