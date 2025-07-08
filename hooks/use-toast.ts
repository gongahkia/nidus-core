"use client"

import * as React from "react"

import type { ToastActionElement, ToastProps } from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t,
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

// DeFi-specific toast utilities for Veritas Insurance
export function useVeritasToast() {
  const { toast } = useToast()

  return {
    // Transaction success toast
    transactionSuccess: (message: string, txHash?: string) => {
      toast({
        title: "✅ Transaction Successful",
        description: message,
        variant: "default",
        duration: 5000,
        action: txHash
          ? React.createElement(
              "button",
              {
                onClick: () => window.open(`https://etherscan.io/tx/${txHash}`, "_blank"),
                className: "text-sm text-green-400 hover:text-green-300 underline",
              },
              "View on Explorer",
            )
          : undefined,
      })
    },

    // Transaction error toast
    transactionError: (message: string) => {
      toast({
        title: "❌ Transaction Failed",
        description: message,
        variant: "destructive",
        duration: 7000,
      })
    },

    // Transaction pending toast
    transactionPending: (message: string) => {
      return toast({
        title: "⏳ Transaction Pending",
        description: message,
        variant: "default",
        duration: 30000,
      })
    },

    // Wallet connection toast
    walletConnected: (address: string) => {
      toast({
        title: "🔗 Wallet Connected",
        description: `Connected to ${address.slice(0, 6)}...${address.slice(-4)}`,
        variant: "default",
        duration: 3000,
      })
    },

    // Wallet disconnection toast
    walletDisconnected: () => {
      toast({
        title: "🔌 Wallet Disconnected",
        description: "Your wallet has been disconnected",
        variant: "default",
        duration: 3000,
      })
    },

    // NFT minted toast
    nftMinted: (tokenId: string, asset: string) => {
      toast({
        title: "🎨 NFT Minted",
        description: `${asset} NFT #${tokenId} has been credited to your wallet`,
        variant: "default",
        duration: 5000,
      })
    },

    // Yield earned toast
    yieldEarned: (amount: string, asset: string) => {
      toast({
        title: "💰 Yield Earned",
        description: `You've earned ${amount} ${asset} in yield rewards`,
        variant: "default",
        duration: 4000,
      })
    },

    // Position liquidation warning
    liquidationWarning: (healthFactor: number) => {
      toast({
        title: "⚠️ Liquidation Risk",
        description: `Your health factor is ${healthFactor.toFixed(2)}. Consider adding collateral.`,
        variant: "destructive",
        duration: 10000,
      })
    },

    // Market update toast
    marketUpdate: (message: string) => {
      toast({
        title: "📊 Market Update",
        description: message,
        variant: "default",
        duration: 4000,
      })
    },

    // Generic success toast
    success: (title: string, description?: string) => {
      toast({
        title: `✅ ${title}`,
        description,
        variant: "default",
        duration: 4000,
      })
    },

    // Generic error toast
    error: (title: string, description?: string) => {
      toast({
        title: `❌ ${title}`,
        description,
        variant: "destructive",
        duration: 6000,
      })
    },

    // Generic info toast
    info: (title: string, description?: string) => {
      toast({
        title: `ℹ️ ${title}`,
        description,
        variant: "default",
        duration: 4000,
      })
    },
  }
}

export { useToast, toast }