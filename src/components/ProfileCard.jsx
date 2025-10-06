import React from 'react'
import FollowButton from './FollowButton'

export default function ProfileCard({ user }){
  return (
    <div className="glass p-3 rounded-md flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img src={user.photoURL} className="w-12 h-12 rounded-full object-cover" />
        <div>
          <div className="font-medium">{user.displayName}</div>
          <div className="text-xs opacity-70">{user.activity ? `Listening to ${user.activity.title}` : 'No activity'}</div>
        </div>
      </div>
      <div>
        <FollowButton targetUid={user.uid} />
      </div>
    </div>
  )
}
