import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function Login(){
  const { user, signInWithGoogle } = useAuth()
  if(user) return <Navigate to="/" replace />

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Sign in to Muziki Connect</h2>
        <button onClick={signInWithGoogle} className="p-3 rounded bg-white text-black">Sign in with Google</button>
      </div>
    </div>
  )
}
