"use client"

import { useState, useEffect } from "react"
import { useAuth } from "./auth-provider"
import { ref, onValue, off } from "firebase/database"
import { database } from "./auth-provider"
import { Overlay } from "@/components/overlay"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"

// Modal placeholder - use your actual Modal component!
function Modal({ open, onClose, children }: { open: boolean, onClose: () => void, children: React.ReactNode }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70">
      <div className="relative bg-slate-900 border border-purple-600 rounded-lg shadow-lg px-6 py-6 min-w-[320px] max-w-[90vw]">
        <button className="absolute top-2 right-3 text-xl text-slate-400" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  )
}

interface VaultDetails {
  id: string;
  name: string;
  apr: number;
  tvl: number;
  balance: number;
  points: number;
  leader: string;
  rewards: number;         // Assume available
  rewardsAvailable: number;// Assume available
  strategy: string;        // Assume available
  risk: string;            // Assume available
  ltv: number;             // Assume available
  minCollateral: number;   // Assume available
  liquidationPenalty: number;// Assume available
  borrowRate: number;      // Assume available
  // Add more fields as needed
}

// Helper for formatting
function fmt(val: number, decimals = 2) {
  return val !== undefined && val !== null
    ? val.toLocaleString(undefined, {minimumFractionDigits: decimals, maximumFractionDigits: decimals})
    : "-"
}

export function WithdrawalDepositComponent({ vaultId }: { vaultId: string }) {
  const { user } = useAuth()
  const [vault, setVault] = useState<VaultDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [depositOpen, setDepositOpen] = useState(false)
  const [withdrawOpen, setWithdrawOpen] = useState(false)

  useEffect(() => {
    if (!vaultId) return
    const vaultRef = ref(database, `vaults/${vaultId}`)
    setLoading(true)
    const unsub = onValue(vaultRef, (snapshot) => {
      const data = snapshot.val()
      setVault(data || null)
      setLoading(false)
    })
    return () => { off(vaultRef); unsub() }
  }, [vaultId])

  // UI skeleton while loading
  if (loading) {
    return (
      <div className="w-full max-w-xl mx-auto mt-10 p-8 bg-slate-900 rounded-lg text-white flex flex-col gap-4 animate-pulse opacity-60">
        <div className="h-6 w-2/3 bg-slate-800 rounded"></div>
        <div className="grid grid-cols-2 gap-8">
          <div className="h-7 bg-slate-800 rounded w-full"></div>
          <div className="h-7 bg-slate-800 rounded w-full"></div>
        </div>
        <div className="h-10 bg-slate-800 rounded w-full my-2"></div>
        <div className="grid grid-cols-2 gap-4 my-4">
          <div className="h-6 bg-slate-800 rounded w-full"></div>
          <div className="h-6 bg-slate-800 rounded w-full"></div>
        </div>
      </div>
    )
  }

  // If not logged in, obfuscate values
  const showValues = !!user
  const getOrDash = (v: any, decimals = 2) => showValues && (v !== undefined && v !== null) ? fmt(v, decimals) : "-"

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">NIDUS</h1>
              <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
                v1.0
              </Badge>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-slate-300 hover:text-purple-300 transition-colors">
                Dashboard
              </Link>
              <Link href="/vaults" className="text-white hover:text-purple-300 transition-colors">
                Vaults
              </Link>
              <Link href="/points" className="text-slate-300 hover:text-purple-300 transition-colors">
                Points
              </Link>
              {!user && (
                <Link href="/about-nidus" className="text-slate-300 hover:text-purple-300 transition-colors">
                  Mission
                </Link>
              )}
              <Link href="/account" className="text-slate-300 hover:text-purple-300 transition-colors">
                Account
              </Link>
            </nav>
          </div>
        </div>
      </header>
      {/* Title and subtitle */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">{vault?.name ?? "-"}</h2>
            <div className="text-xs text-slate-400 mt-1">
              Strategy: <span className="font-semibold text-purple-300">{vault?.strategy || "-"}</span>
            </div>
          </div>
          {showValues && (
            <div className="flex flex-col items-end text-right text-slate-400 text-xs">
              Leader: <span className="font-mono text-sm text-slate-200">{vault?.leader ?? "-"}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-2 gap-5 mb-5">
        <div>
          <div className="text-xs text-slate-400 mb-0.5">Your Deposit</div>
          <div className="font-semibold text-lg text-white">
            {getOrDash(vault?.balance, 2)} {showValues && "USD"}
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-400 mb-0.5">Rewards</div>
          <div className="font-semibold text-lg text-white">
            {getOrDash(vault?.rewardsAvailable, 2)} {showValues && "USD"}
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-400 mb-0.5">APR</div>
          <div className="font-semibold text-lg text-green-400">
            {getOrDash(vault?.apr, 2)}%
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-400 mb-0.5">TVL</div>
          <div className="font-semibold text-lg text-white">
            {getOrDash(vault?.tvl, 2)} {showValues && "USD"}
          </div>
        </div>
      </div>

      {/* Strategy + Risk */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-slate-400 mb-0.5">Strategy</div>
          <div className="font-semibold text-slate-200">
            {showValues ? (vault?.strategy ?? "-") : "-"}
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-400 mb-0.5">Risk</div>
          <div className="font-semibold text-slate-200">
            {showValues ? (vault?.risk ?? "-") : "-"}
          </div>
        </div>
      </div>

      {/* LTV, Collateral, Penalty, Borrow Rate */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-7">
        <div>
          <div className="text-xs text-slate-400 mb-0.5">LTV</div>
          <div className="font-semibold text-slate-100">
            {getOrDash(vault?.ltv, 0)}%
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-400 mb-0.5">Min Collateral</div>
          <div className="font-semibold text-slate-100">
            {getOrDash(vault?.minCollateral, 2)}
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-400 mb-0.5">Penalty</div>
          <div className="font-semibold text-slate-100">
            {getOrDash(vault?.liquidationPenalty, 2)}%
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-400 mb-0.5">Borrow Rate</div>
          <div className="font-semibold text-slate-100">
            {getOrDash(vault?.borrowRate, 2)}%
          </div>
        </div>
      </div>

      {/* Deposit/Withdraw Buttons or Connect */}
      <div className="flex items-center justify-center gap-5 mt-6">
        {!user && (
          // Not logged in: Show connect-style button
          <button
            className="bg-purple-700 hover:bg-purple-600 text-white rounded-lg px-8 py-3 font-bold transition text-lg"
            disabled
          >
            Connect Wallet
          </button>
        )}

        {user && (
          <>
            <button
              className="bg-gradient-to-br from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white rounded-lg px-8 py-3 font-bold transition text-lg"
              onClick={() => setDepositOpen(true)}
            >
              Deposit
            </button>
            <button
              className="bg-gradient-to-br from-slate-800 to-slate-700 hover:from-purple-700 hover:to-slate-900 text-white rounded-lg px-8 py-3 font-bold transition text-lg border border-purple-400"
              onClick={() => setWithdrawOpen(true)}
            >
              Withdraw
            </button>
          </>
        )}
      </div>

      {/* Withdraw / Deposit Modal */}
      <Modal open={depositOpen} onClose={() => setDepositOpen(false)}>
        <h3 className="text-lg font-bold mb-2 text-white">Deposit</h3>
        <div className="mb-3 text-slate-200">
          Deposit to <span className="font-mono">{vault?.name}</span>
        </div>
        {/* You can build out more elaborate forms here */}
        <input
          type="number"
          min={0}
          placeholder="Amount"
          className="w-full mb-3 px-3 py-2 rounded border bg-slate-800 text-white"
        />
        <div className="flex justify-end">
          <button
            className="bg-purple-700 text-white px-6 py-2 rounded hover:bg-purple-800"
            onClick={() => setDepositOpen(false)}
          >
            Confirm
          </button>
        </div>
      </Modal>
      <Modal open={withdrawOpen} onClose={() => setWithdrawOpen(false)}>
        <h3 className="text-lg font-bold mb-2 text-white">Withdraw</h3>
        <div className="mb-3 text-slate-200">
          Withdraw from <span className="font-mono">{vault?.name}</span>
        </div>
        {/* Build real logic/form as needed */}
        <input
          type="number"
          min={0}
          placeholder="Amount"
          className="w-full mb-3 px-3 py-2 rounded border bg-slate-800 text-white"
        />
        <div className="flex justify-end">
          <button
            className="bg-purple-700 text-white px-6 py-2 rounded hover:bg-purple-800"
            onClick={() => setWithdrawOpen(false)}
          >
            Confirm
          </button>
        </div>
      </Modal>
      <Footer />
    </div>
  )
}