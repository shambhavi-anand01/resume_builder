import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Navbar from './components/Navbar.jsx'
import ResumeFresher from './components/ResumeFresher.jsx'
import ResumeProfessional from './components/ResumeProfessional.jsx'
import { AuthProvider } from './AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>  {/* Wrap everything in AuthProvider */}
      
        <BrowserRouter>
          <Navbar />
          <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/resume-fresher" element={<ResumeFresher />} />
            <Route path="/resume-professional" element={<ResumeProfessional />} />
          </Routes>
        </BrowserRouter>
      
    </AuthProvider>
  </React.StrictMode>
);