import './App.css'
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom'

import Home from './pages/Home'
import AboutContact from './pages/AboutContact'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SmoothScroll from './components/SmoothScroll'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

import { AuthProvider } from './context/AuthContext'

import RoleRoute from './components/RoleRoute'

// student dashboard
import StudentDashboard from './pages/student/StudentDashboard'
import StudentLayout from './layouts/StudentLayout'
import MyCourses from './pages/student/MyCourses'
import ExploreCourses from './pages/student/ExploreCourses'
import MyProgress from './pages/student/MyProgress'
import LearningRecovery from './pages/student/LearningRecovery'
import StudentProfile from './pages/student/StudentProfile'
import InstructorApplication from './pages/student/InstructorApplication'
// instructor
import InstructorLayout from './layouts/InstructorLayout'
import InstructorDashboard from './pages/instructor/InstructorDashboard'
import InstructorCourses from './pages/instructor/InstructorCourses'
import CreateCourse from './pages/instructor/CreateCourse'
import InstructorStudents from './pages/instructor/InstructorStudents'
import InstructorQuizzes from './pages/instructor/InstructorQuizzes'
import CreateQuiz from './pages/instructor/CreateQuiz'
// admin
import InstructorApplications from "./pages/admin/InstructorApplications";
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <SmoothScroll>
        <Routes>
          {/* Authetication routes */}
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path='/login' element={<Login/>}></Route>
          {/* Public website routes */}
          <Route path="/" element={<> <Navbar /><Home /><Footer /> </>} />
          <Route path="/about" element={<><Navbar /><AboutContact /><Footer /></>} />
          
          {/* Student routes */}
          <Route element={<RoleRoute role="student" />}>
              <Route path="/student" element={<StudentLayout />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="courses" element={<MyCourses />} />
                <Route path="browse" element={<ExploreCourses />} />
                <Route path="progress" element={<MyProgress />} />
                <Route path="recovery" element={<LearningRecovery />} />
                <Route path="profile" element={<StudentProfile />} />
                <Route
                  path="instructor-application"
                  element={<InstructorApplication />}
                />
              </Route>
            </Route>

            {/* Instructor routes */}
            <Route element={<RoleRoute role="instructor" />}>
              <Route path="/instructor" element={<InstructorLayout />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<InstructorDashboard />} />
                <Route path="courses" element={<InstructorCourses />} />
                <Route path="create-course" element={<CreateCourse />} />
                <Route path="students" element={<InstructorStudents />} />
                <Route path="quizzes" element={<InstructorQuizzes />} />
                <Route path="create-quiz" element={<CreateQuiz />} />
              </Route>
            </Route>

            {/* Admin routes */}
            <Route element={<RoleRoute role="admin" />}>
              <Route
                path="/admin/dashboard"
                element={<AdminDashboard />}
              />
              <Route
                path="/admin/instructor-applications"
                element={<InstructorApplications />}
              />
            </Route>

        </Routes>
      </SmoothScroll>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App