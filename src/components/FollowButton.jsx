import React, { useState, useEffect } from 'react'
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'

export default function FollowButton({ targetUid }){
  const { user } = useAuth()
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(()=>{
    if(!user) return
    (async ()=>{
      const meRef = doc(db, 'users', user.uid)
      const snap = await getDoc(meRef)
      const following = snap.exists() ? snap.data().following || [] : []
      setIsFollowing(following.includes(targetUid))
    })()
  }, [user, targetUid])

  async function toggle(){
    if(!user) return
    const meRef = doc(db, 'users', user.uid)
    if(isFollowing){
      await updateDoc(meRef, { following: arrayRemove(targetUid) })
    } else {
      await updateDoc(meRef, { following: arrayUnion(targetUid) })
    }
    setIsFollowing(!isFollowing)
  }

  return (
    <button onClick={toggle} className={`text-xs p-2 rounded ${isFollowing ? 'bg-white/10' : 'glass'}`}>
      {isFollowing ? 'Following' : 'Follow'}
    </button>
  )
}
