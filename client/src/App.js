import { useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './pages/login/LoginController'
import Layout from './layout/Layout'
import HomeController from './pages/home/HomeController'
import Attendance from './pages/attendance/AttendanceController'
import Search from './pages/search/SearchController'
import Covid19 from './pages/covid19/Covid19Controller'

function App() {
  const Authorization = useSelector((state) => state.authReducer?.Authorization)
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path='/' element={Authorization ? <Navigate to = 'home'/> : <Navigate to = 'login' />} />
          <Route path='/home' element={Authorization ? <HomeController /> : <Navigate to = '../login' />} />
          <Route path='/login' element={Authorization ? <Navigate to = '../home' /> : <Login />} />
          <Route path='/attendance' element={Authorization ? <Attendance /> : <Navigate to = '../login' />} />
          <Route path='/search' element={Authorization ? <Search /> : <Navigate to = '../login' />} />
          <Route path='/covid_19' element={Authorization ? <Covid19 /> : <Navigate to = '../login' />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
