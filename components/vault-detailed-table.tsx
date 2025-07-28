"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Filter } from "lucide-react"
import Link from "next/link"
import { useAuth } from "./auth-provider"
import { ref, onValue, off } from "firebase/database"
import { database } from "./auth-provider"
import { ValueChart } from "@/components/value-chart"
import { Overlay } from "@/components/overlay"
import { Footer } from "@/components/footer"

interface Vault {
  id: string
  name: string
  apr: number
  type: string
  balance: number
  points: number
}

type SortField = "name" | "apr" | "balance" | "points"
type SortDirection = "asc" | "desc"

export function Vaults() {
  const { user } = useAuth()
  const router = useRouter()
  const [vaults, setVaults] = useState<Vault[]>([])
  const [searchInput, setSearchInput] = useState("")
  const [sortField, setSortField] = useState<SortField>("name")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

  useEffect(() => {
    if (!user) {
      setVaults([])
      return
    }
    const vaultsRef = ref(database, `users/${user.uid}/vaults`)
    const unsub = onValue(vaultsRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const vaultsArr = Object.keys(data).map((id) => ({
          id,
          ...data[id],
        }))
        setVaults(vaultsArr)
      } else {
        setVaults([])
      }
    })

    return () => {
      off(vaultsRef)
      unsub()
    }
  }, [user])

  // Filter vaults by search
  const filteredVaults = vaults.filter((v) =>
    !searchInput || v.name.toLowerCase().includes(searchInput.toLowerCase())
  )

  // Sort vaults based on current sortField and sortDirection
  const sortedVaults = [...filteredVaults].sort((a, b) => {
    let compare = 0
    switch (sortField) {
      case "name":
        compare = a.name.localeCompare(b.name)
        break
      case "apr":
        compare = (b.apr ?? 0) - (a.apr ?? 0)
        break
      case "balance":
        compare = (b.balance ?? 0) - (a.balance ?? 0)
        break
      case "points":
        compare = (b.points ?? 0) - (a.points ?? 0)
        break
    }
    return sortDirection === "asc" ? compare * -1 : compare
  })

  // Toggle sort direction if same field clicked, else set new field asc default
  const onSortChange = (field: SortField) => {
    if (field === sortField) {
      setSortDirection((dir) => (dir === "asc" ? "desc" : "asc"))
    } else {
      setSortField(field)
      setSortDirection(field === "name" ? "asc" : "desc")
    }
  }

  // Handle vault click to navigate to placeholder page
  const handleVaultClick = (vaultId: string) => {
    router.push(`/vaults/${vaultId}`)
  }

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

      <div className="relative max-w-4xl mx-auto">
        <Card className="bg-slate-800/50 border-slate-700 flex flex-col min-h-[600px]">
          <CardHeader className="pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <CardTitle className="flex items-center text-white mb-2 sm:mb-0">
              Your Vaults
            </CardTitle>

            <div className="flex flex-wrap gap-3 sm:gap-4 items-center">
              <div className="relative w-full max-w-xs">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-slate-900/70 text-slate-200 placeholder:text-slate-400 border border-slate-700 focus:ring-2 focus:ring-purple-400 transition"
                  placeholder="Search by token, address, or protocol"
                  disabled={!user}
                />
                <Search className="absolute right-2 top-2 w-4 h-4 text-slate-400" />
              </div>

              <div className="flex items-center space-x-2">
                <label htmlFor="sort-select" className="text-slate-300 text-sm whitespace-nowrap">
                  Sort by:
                </label>
                <select
                  id="sort-select"
                  className="bg-slate-900/70 border border-slate-700 rounded-md text-slate-200 px-3 py-2 focus:ring-2 focus:ring-purple-400"
                  value={sortField}
                  onChange={(e) => onSortChange(e.target.value as SortField)}
                  disabled={!user}
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="apr">APR (High-Low)</option>
                  <option value="balance">Balance (High-Low)</option>
                  <option value="points">Points (High-Low)</option>
                </select>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 min-h-[480px] max-h-[480px] overflow-y-auto">
            {user && sortedVaults.length === 0 && (
              <div className="text-center text-slate-500 py-20">No vaults found.</div>
            )}
            {user && sortedVaults.length > 0 && sortedVaults.map((v) => (
              <button
                key={v.id}
                onClick={() => handleVaultClick(v.id)}
                className="w-full text-left flex items-center justify-between bg-slate-900/80 rounded-lg px-4 py-3 mb-2 cursor-pointer hover:bg-purple-800/70 transition-colors"
                type="button"
                aria-label={`Open vault ${v.name}`}
              >
                <div className="flex-1 text-slate-100">{v.name}</div>
                <div className="flex gap-6 items-center text-slate-300 text-xs whitespace-nowrap">
                  <span>APR: {v.apr != null ? `${v.apr}%` : "-"}</span>
                  <span>Points: {v.points != null ? v.points : "-"}</span>
                  <span>Balance: {v.balance != null ? `$${v.balance}` : "-"}</span>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {!user && (
          <Overlay>Please log in to view your vaults.</Overlay>
        )}
      </div>
    <Footer />
    </div>
  )
}