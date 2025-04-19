import Login from './Components/Login'
import Home from './Components/Home'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './HOC/ProtectedRoute'

function App() {

  return (
    <div className=''>
        <Router>
           <Routes>
              <Route path='/auth' element={<Login/>}/>
              <Route path='/' element={<ProtectedRoute>
                  <Home/>
                </ProtectedRoute>}/>
              <Route path='/*' element={<Login/>}/>
           </Routes>
        </Router>
    </div>
  )
}

export default App
