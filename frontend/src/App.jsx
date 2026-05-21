import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { MainLayout } from './components/MainLayout'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Home } from './pages/Home'
import { Dashboard } from './pages/Dashboard'
import { AddWorkout } from './pages/AddWorkout'
import { History } from './pages/History'
import { Progress } from './pages/Progress'
import { ProfileDashboard } from './pages/ProfileDashboard'
import { SchedulesCoach } from './pages/SchedulesCoach'
import { SchedulePlansUser } from './pages/SchedulePlansUser'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/workouts/add" element={<AddWorkout />} />
              <Route path="/history" element={<History />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/profile" element={<ProfileDashboard />} />
              <Route path="/schedules-manage" element={<SchedulesCoach />} />
              <Route path="/schedule-plans" element={<SchedulePlansUser />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}
