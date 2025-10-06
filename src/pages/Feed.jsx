import React, { useEffect, useState } from 'react'
import { collection, query, onSnapshot, doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'
import ProfileCard from '../components/ProfileCard'

export default function Feed(){
  const { user } = useAuth()
  const [friends, setFriends] = useState([])

  useEffect(()=>{
    if(!user) return
    (async ()=>{
      const meRef = doc(db, 'users', user.uid)
      const meSnap = await getDoc(meRef)
      const following = meSnap.exists() ? meSnap.data().following || [] : []
      if(following.length===0) return
      const q = query(collection(db, 'users'))
      const unsub = onSnapshot(q, snap =>{
        const arr = snap.docs.map(d=>d.data()).filter(u=> following.includes(u.uid))
        setFriends(arr)
      })
      return ()=>unsub()
    })()
  }, [user])

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Feed — What your following are listening to</h2>
      <div className="space-y-3">
        {friends.map(f => (<ProfileCard key={f.uid} user={f}/>))}
      </div>
    </div>
  )
}
