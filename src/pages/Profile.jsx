import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function Profile(){
  const { user, logout } = useAuth()
  if(!user) return <div className="opacity-60">Not signed in</div>

  return (
    <div className="glass p-4 rounded-md">
      <div className="flex items-center gap-4">
        <img src={user.photoURL} className="w-20 h-20 rounded-full object-cover"/>
        <div>
          <div className="font-semibold">{user.displayName}</div>
          <div className="text-xs opacity-70">{user.email}</div>
        </div>
      </div>
      <div className="mt-4">
        <button onClick={logout} className="glass p-2 rounded">Logout</button>
      </div>
    </div>
  )
}
