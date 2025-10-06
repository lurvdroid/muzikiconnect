import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, provider, db } from '../firebase'
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'

const AuthContext = createContext()
export function useAuth(){ return useContext(AuthContext) }

export default function AuthProvider({ children }){
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, async firebaseUser =>{
      if(firebaseUser){
        const userRef = doc(db, 'users', firebaseUser.uid)
        const snap = await getDoc(userRef)
        if(!snap.exists()){
          await setDoc(userRef, {
            uid: firebaseUser.uid,
            displayName: firebaseUser.displayName,
            email: firebaseUser.email,
            photoURL: firebaseUser.photoURL,
            createdAt: Date.now(),
            following: [],
          })
        }
        setUser(firebaseUser)
      } else setUser(null)
      setLoading(false)
    })
    return ()=>unsub()
  },[])

  async function signInWithGoogle(){ return await signInWithPopup(auth, provider) }
  async function logout(){ await signOut(auth) }

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
