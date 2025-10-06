import React, { useEffect, useState } from 'react'
import { collection, query, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'
import ChatBox from '../components/ChatBox'

export default function Messages(){
  const { user } = useAuth()
  const [chats, setChats] = useState([])
  const [activeChat, setActiveChat] = useState(null)

  useEffect(()=>{
    if(!user) return
    const q = query(collection(db, 'chats'))
    const unsub = onSnapshot(q, snap =>{
      setChats(snap.docs.map(d=>({ id: d.id, ...d.data() })).filter(c => c.members && c.members.includes(user.uid)))
    })
    return ()=>unsub()
  }, [user])

  return (
    <div className="flex gap-4">
      <div className="w-72 glass p-3 rounded-md">
        <h3 className="text-sm font-semibold mb-2">Chats</h3>
        <div className="space-y-2">
          {chats.map(c => (
            <div key={c.id} onClick={()=>setActiveChat(c.id)} className="p-2 cursor-pointer rounded hover:bg-white/5">{c.id}</div>
          ))}
        </div>
      </div>
      <div className="flex-1 glass p-3 rounded-md">
        {activeChat ? <ChatBox chatId={activeChat} currentUid={user.uid} /> : <div className="opacity-60">Select a chat</div>}
      </div>
    </div>
  )
}
