"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from "lucide-react"
import Link from "next/link"
import { useAuth } from "./auth-provider"
import { ref, onValue, off } from "firebase/database"
import { database } from "./auth-provider"
import { Overlay } from "@/components/overlay"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"

interface Vault {
  id: string
  name: string
  apr: number
  type: string
  balance: number
  points: number
}

type SortField = "name" | "leader" | "apr" | "tvl" | "balance" | "age" | "points"
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
        compare = (a.apr ?? 0) - (b.apr ?? 0)
        break
      case "balance":
        compare = (a.balance ?? 0) - (b.balance ?? 0)
        break
      case "points":
        compare = (a.points ?? 0) - (b.points ?? 0)
        break
    }
    return sortDirection === "asc" ? compare : -compare
  })

  // UI: Clickable column headers for sorting
  const renderHeader = (
    <div className="flex items-center w-full px-4 pb-2 pt-4 text-xs text-slate-400 font-semibold select-none">
      <HeaderCell
        label="Vault"
        field="name"
        active={sortField === "name"}
        direction={sortDirection}
        onClick={() => handleSort("name")}
        className="flex-1"
      />
      <HeaderCell
        label="APR"
        field="apr"
        active={sortField === "apr"}
        direction={sortDirection}
        onClick={() => handleSort("apr")}
      />
      <HeaderCell
        label="Points"
        field="points"
        active={sortField === "points"}
        direction={sortDirection}
        onClick={() => handleSort("points")}
      />
      <HeaderCell
        label="TVL"
        field="balance"
        active={sortField === "balance"}
        direction={sortDirection}
        onClick={() => handleSort("balance")}
      />
      {/* You can show/hide Deposit column as needed */}
      <div className="w-28 text-right">Deposit</div>
    </div>
  )

  function handleSort(field: SortField) {
    if (sortField === field) {
      setSortDirection(dir => (dir === "asc" ? "desc" : "asc"))
    } else {
      setSortField(field)
      setSortDirection(field === "name" ? "asc" : "desc")
    }
  }

  // Each Vault Row
  function renderVaultRow(v: Vault) {
    return (
      <button
        key={v.id}
        onClick={() => router.push(`/vaults/${v.id}`)}
        className="w-full flex items-center justify-between bg-slate-900/80 rounded-lg px-4 py-3 mb-2 hover:bg-purple-800/70 transition-colors cursor-pointer group"
        type="button"
        aria-label={`Open vault ${v.name}`}
      >
        <div className="flex-1 text-slate-100 text-left">{v.name}</div>
        <div className="w-20 text-slate-300 text-xs text-center">
          {v.apr != null ? `${v.apr}%` : "-"}
        </div>
        <div className="w-20 text-slate-300 text-xs text-center">
          {v.points != null ? v.points : "-"}
        </div>
        <div className="w-20 text-slate-300 text-xs text-center">
          {v.balance != null ? `$${v.balance}` : "-"}
        </div>
        {/* Deposit placeholder */}
        <div className="w-28 text-right">
          <span className="inline-block bg-purple-700/80 text-xs text-white rounded px-3 py-1 opacity-40 group-hover:opacity-90 transition-all cursor-pointer select-none">
            Deposit/Withdraw
          </span>
        </div>
      </button>
    )
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
        <Card className="bg-slate-800/50 border-slate-700 flex flex-col min-h-[600px] mt-8">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-white mb-2">
              Your Vaults
            </CardTitle>
            <div className="relative w-full max-w-xs">
              <input
                type="text"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-slate-900/70 text-slate-200 placeholder:text-slate-400 border border-slate-700 focus:ring-2 focus:ring-purple-400 transition"
                placeholder="Search by token, address, or protocol"
                disabled={!user}
              />
              <Search className="absolute right-2 top-2 w-4 h-4 text-slate-400" />
            </div>
          </CardHeader>

          <CardContent className="flex-1 min-h-[480px] max-h-[480px] overflow-y-auto">
            {/* Table Headers */}
            {renderHeader}

            {user && sortedVaults.length === 0 && (
              <div className="text-center text-slate-500 py-20">No vaults found.</div>
            )}
            {user && sortedVaults.length > 0 && sortedVaults.map(renderVaultRow)}
          </CardContent>
        </Card>
        {!user && (
          <Overlay>Please log in to view your vaults.</Overlay>
        )}
      </div>
      <Footer/>
    </div>
  )
}

// Helper component for sortable column headers
function HeaderCell({
  label,
  field,
  active,
  direction,
  onClick,
  className
}: {
  label: string
  field: SortField
  active: boolean
  direction: SortDirection
  onClick: () => void
  className?: string
}) {
  let icon = (
    <span className="ml-1 opacity-40">⇅</span>
  )
  if (active && direction === "asc") {
    icon = <span className="ml-1 text-purple-300">↑</span>
  } else if (active && direction === "desc") {
    icon = <span className="ml-1 text-purple-300">↓</span>
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className={`bg-transparent border-0 text-xs font-semibold px-0 mx-0 focus:outline-none cursor-pointer flex items-center ${className ?? ""} ${active ? "text-purple-200" : "text-slate-400"} transition-colors`}
      aria-label={`Sort by ${label}`}
    >
      {label} {icon}
    </button>
  )
}