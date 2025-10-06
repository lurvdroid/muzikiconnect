import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import AuthProvider from './context/AuthContext'
import Login from './pages/Login'
import Feed from './pages/Feed'
import Messages from './pages/Messages'
import Profile from './pages/Profile'
import Player from './components/Player'
import './index.css'

export default function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen p-6">
          <nav className="flex items-center justify-between mb-6">
            <div className="text-xl font-bold">Muziki Connect</div>
            <div className="flex gap-3">
              <Link to="/" className="text-sm">Feed</Link>
              <Link to="/messages" className="text-sm">Messages</Link>
              <Link to="/profile" className="text-sm">Profile</Link>
            </div>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Routes>
                <Route path="/" element={<Feed/>} />
                <Route path="/messages" element={<Messages/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/login" element={<Login/>} />
              </Routes>
            </div>
            <aside className="lg:col-span-1">
              <Player/>
            </aside>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}
