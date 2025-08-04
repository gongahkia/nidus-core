"use client"

import { useActionState, useState } from "react"
import { submitInterest } from "@/app/landing/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function JoinForm() {
  const [state, formAction, isPending] = useActionState(submitInterest, null)
  const [showDialog, setShowDialog] = useState(false)

  // Effect to show dialog when submission is successful
  useState(() => {
    if (state?.success) {
      setShowDialog(true)
    }
  }, [state])

  const handleDialogClose = () => {
    setShowDialog(false)
    // Optionally reset the form here if needed
  }

  return (
    <>
      <form action={formAction} className="space-y-6 max-w-md mx-auto">
        <div>
          <Label htmlFor="email" className="text-lg">
            Email Address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your@example.com"
            required
            className="mt-2 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
            disabled={isPending}
          />
        </div>
        <div>
          <Label htmlFor="bitcoinWallet" className="text-lg">
            Bitcoin Wallet Address
          </Label>
          <Input
            id="bitcoinWallet"
            name="bitcoinWallet"
            type="text"
            placeholder="bc1q..."
            required
            className="mt-2 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
            disabled={isPending}
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-full"
          disabled={isPending}
        >
          {isPending ? "Submitting..." : "Indicate Interest"}
        </Button>
        {state && !state.success && <p className="text-red-500 text-center mt-4">{state.message}</p>}
      </form>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent className="bg-gray-800 text-white border-gray-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-green-400">Interest Confirmed!</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              {state?.message || "Thank you for your interest. We will be in touch soon!"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleDialogClose} className="bg-purple-600 hover:bg-purple-700 text-white">
              Got it!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}