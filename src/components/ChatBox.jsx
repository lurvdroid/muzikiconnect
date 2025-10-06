import React, { useEffect, useState } from 'react'
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

export default function ChatBox({ chatId, currentUid }){
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')

  useEffect(()=>{
    if(!chatId) return
    const q = query(collection(db, 'chats', chatId, 'messages'), orderBy('createdAt', 'asc'))
    const unsub = onSnapshot(q, snap =>{
      setMessages(snap.docs.map(d=>({ id: d.id, ...d.data() })))
    })
    return ()=>unsub()
  }, [chatId])

  async function send(){
    if(!text.trim()) return
    await addDoc(collection(db, 'chats', chatId, 'messages'), {
      sender: currentUid,
      text: text.trim(),
      createdAt: Date.now()
    })
    setText('')
  }

  return (
    <div className="flex flex-col h-full">
      <div className="overflow-auto p-2 space-y-2 flex-1">
        {messages.map(m => (
          <div key={m.id} className={`p-2 rounded ${m.sender===currentUid ? 'self-end bg-white/10' : 'self-start bg-white/5'}`}>
            <div className="text-sm">{m.text}</div>
            <div className="text-xs opacity-60">{new Date(m.createdAt).toLocaleTimeString()}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 p-2">
        <input value={text} onChange={e=>setText(e.target.value)} className="flex-1 p-2 rounded text-black" placeholder="Message..." />
        <button onClick={send} className="p-2 glass rounded">Send</button>
      </div>
    </div>
  )
}
