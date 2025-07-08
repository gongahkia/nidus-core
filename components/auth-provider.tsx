"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

// Firebase imports (commented out for now)
// import { initializeApp } from 'firebase/app'
// import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
// import { getDatabase } from 'firebase/database'

// const firebaseConfig = {
//   apiKey: "your-api-key",
//   authDomain: "veritas-insurance.firebaseapp.com",
//   databaseURL: "https://veritas-insurance-default-rtdb.firebaseio.com/",
//   projectId: "veritas-insurance",
//   storageBucket: "veritas-insurance.appspot.com",
//   messagingSenderId: "123456789",
//   appId: "your-app-id"
// }

// const app = initializeApp(firebaseConfig)
// export const auth = getAuth(app)
// export const database = getDatabase(app)

interface User {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Firebase auth state listener (commented out)
    // const unsubscribe = onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     setUser({
    //       uid: user.uid,
    //       email: user.email,
    //       displayName: user.displayName,
    //       photoURL: user.photoURL
    //     })
    //   } else {
    //     setUser(null)
    //   }
    //   setLoading(false)
    // })

    // return () => unsubscribe()

    // Placeholder auth state
    setLoading(false)
  }, [])

  const signIn = async () => {
    // Firebase Google sign in (commented out)
    // const provider = new GoogleAuthProvider()
    // await signInWithPopup(auth, provider)

    // Placeholder sign in
    setUser({
      uid: "placeholder-uid",
      email: "user@example.com",
      displayName: "John Doe",
      photoURL: null,
    })
  }

  const handleSignOut = async () => {
    // Firebase sign out (commented out)
    // await signOut(auth)

    // Placeholder sign out
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut: handleSignOut }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}