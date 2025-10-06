import React, { useRef, useState, useEffect } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'

const initialPlaylist = [
  { id: 1, title: 'Sample Track 1', artist: 'Demo', src: '/songs/sample-1.mp3', cover: '/images/cover1.jpg' },
  { id: 2, title: 'Sample Track 2', artist: 'Demo', src: '/songs/sample-2.mp3', cover: '/images/cover2.jpg' }
]

export default function Player(){
  const { user } = useAuth()
  const [playlist] = useState(initialPlaylist)
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(new Audio(playlist[0].src))

  useEffect(()=>{
    audioRef.current.pause()
    audioRef.current = new Audio(playlist[index].src)
    const timeUpdate = ()=>{}
    const onEnd = ()=> setPlaying(false)
    audioRef.current.addEventListener('ended', onEnd)
    if(playing) audioRef.current.play().catch(()=>{})
    return ()=>{
      audioRef.current.removeEventListener('ended', onEnd)
    }
  }, [index])

  useEffect(()=>{
    if(playing){
      audioRef.current.play().catch(()=>{})
      if(user){
        const now = {
          trackId: playlist[index].id,
          title: playlist[index].title,
          artist: playlist[index].artist,
          cover: playlist[index].cover,
          startedAt: Date.now()
        }
        const ref = doc(db, 'users', user.uid)
        updateDoc(ref, { activity: now }).catch(()=>{})
      }
    } else audioRef.current.pause()
  }, [playing])

  function togglePlay(){ setPlaying(p=>!p) }
  function next(){ setIndex(i => (i+1) % playlist.length); setPlaying(true) }
  function prev(){ setIndex(i => (i-1 + playlist.length) % playlist.length); setPlaying(true) }

  return (
    <div className="glass p-4 rounded-2xl">
      <div className="flex gap-4">
        <div className="w-28 h-28 rounded-lg overflow-hidden">
          <img src={playlist[index].cover} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <div className="font-semibold">{playlist[index].title}</div>
          <div className="text-xs opacity-70">{playlist[index].artist}</div>
          <div className="mt-4 flex items-center gap-2">
            <button onClick={prev} className="glass p-2 rounded">◀◀</button>
            <button onClick={togglePlay} className="p-3 rounded-full bg-white text-black">{playing ? '❚❚' : '▶'}</button>
            <button onClick={next} className="glass p-2 rounded">▶▶</button>
          </div>
        </div>
      </div>
    </div>
  )
}
