"use server"

import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

export async function submitInterest(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const bitcoinWallet = formData.get("bitcoinWallet") as string

  if (!email || !bitcoinWallet) {
    return { success: false, message: "Email and Bitcoin Wallet are required." }
  }

  try {
    await addDoc(collection(db, "interest_submissions"), {
      email,
      bitcoinWallet,
      timestamp: serverTimestamp(),
    })
    return { success: true, message: "Your interest has been successfully recorded!" }
  } catch (error) {
    console.error("Error submitting interest:", error)
    return { success: false, message: "Failed to record interest. Please try again." }
  }
}
