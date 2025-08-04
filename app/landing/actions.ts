"use server"

import { database } from "@/lib/firebase" // Import 'database' (Realtime Database)
import { ref, push, set } from "firebase/database" // Import Realtime Database functions

export async function submitInterest(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const bitcoinWallet = formData.get("bitcoinWallet") as string

  if (!email || !bitcoinWallet) {
    return { success: false, message: "Email and Bitcoin Wallet are required." }
  }

  try {
    // Use Realtime Database to push new data
    await set(push(ref(database, "interest_submissions")), {
      email,
      bitcoinWallet,
      timestamp: Date.now(), // Use Date.now() for Realtime Database timestamp
    })
    return { success: true, message: "Your interest has been successfully recorded!" }
  } catch (error) {
    console.error("Error submitting interest:", error)
    return { success: false, message: "Failed to record interest. Please try again." }
  }
}