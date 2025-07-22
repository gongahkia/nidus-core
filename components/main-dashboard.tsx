"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Users, Wallet, Search, Filter, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useAuth } from "./auth-provider"
import { ref, onValue, off } from "firebase/database"
import { database } from "./auth-provider"
import { ValueChart } from "@/components/value-chart"
import { Overlay } from "@/components/overlay"
import { Footer } from "@/components/footer"
import Image from "next/image"

interface Announcement {
  id: string
  title: string
  content: string
  timestamp: number
  type: "info" | "warning" | "success"
}

interface DashboardData {
  tvl: number
  announcements: Announcement[]
}

interface UserPortfolio {
  lp: number
  ownershipPercent: number
  xsgd: number
  apr: number
  outstandingRewards: number
  points: number
}

interface Vault {
  id: string
  name: string
  apr: number
  type: string
  balance: number
  points: number
}

export function MainDashboard() {
  const router = useRouter()
  const { user } = useAuth()
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    tvl: 0,
    announcements: [],
  })
  const [userPortfolio, setUserPortfolio] = useState<UserPortfolio | null>(null)
  const [vaults, setVaults] = useState<Vault[]>([])
  const [searchInput, setSearchInput] = useState("")

  // Dashboard and Announcements fetch
  useEffect(() => {
    const dashboardRef = ref(database, "dashboard")
    const announcementsRef = ref(database, "announcements")

    const unsubDashboard = onValue(dashboardRef, (snapshot) => {
      const data = snapshot.val()
      if (data) setDashboardData((prev) => ({ ...prev, tvl: data.tvl || 0 }))
    })

    const unsubAnnouncements = onValue(announcementsRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const announcements = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }))
        setDashboardData((prev) => ({ ...prev, announcements }))
      }
    })

    return () => {
      off(dashboardRef)
      off(announcementsRef)
      unsubDashboard()
      unsubAnnouncements()
    }
  }, [])

  // Portfolio fetch
  useEffect(() => {
    if (!user) {
      setUserPortfolio(null)
      return
    }
    const userPortfolioRef = ref(database, `users/${user.uid}/portfolio`)
    const unsubUserPortfolio = onValue(userPortfolioRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        setUserPortfolio({
          lp: data.lp || 0,
          ownershipPercent: data.ownershipPercent || 0,
          xsgd: data.xsgd || 0,
          apr: data.apr || 0,
          outstandingRewards: data.outstandingRewards || 0,
          points: data.points || 0,
        })
      }
    })
    return () => {
      off(userPortfolioRef)
      unsubUserPortfolio()
    }
  }, [user])

  // Vaults fetch
  useEffect(() => {
    if (!user) {
      setVaults([])
      return
    }
    // Assumed DB schema: users/{uid}/vaults/{vaultId}
    const vaultsRef = ref(database, `users/${user.uid}/vaults`)
    const unsubVaults = onValue(vaultsRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const vaultsArr = Object.keys(data).map((id) => ({
          id,
          ...data[id]
        }))
        setVaults(vaultsArr)
      }
    })
    return () => {
      off(vaultsRef)
      unsubVaults()
    }
  }, [user])

  // Vault filters (static, similar to image)
  const vaultFilters = ["iBGT", "iBERA", "HONEY", "WBERA"]

  // Utility: filtered vault list
  const filteredVaults = vaults.filter(
    (v) =>
      !searchInput ||
      v.name.toLowerCase().includes(searchInput.toLowerCase())
  )

  // Portfolio card content (dynamic)
  const PortfolioCard = (
    <Card className="bg-slate-800/50 border-slate-700 relative">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-white mb-2">
          Portfolio
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-slate-300 mb-4">
          <div>
            <div className="text-xs text-slate-400 mb-1">Balance</div>
            <div className="font-semibold text-lg text-white">
              {
                userPortfolio
                  ? `$${userPortfolio.xsgd.toLocaleString()}`
                  : "$0"
              }
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-1">Outstanding rewards</div>
            <div className="font-semibold text-lg text-white">
              {
                userPortfolio
                  ? `$${userPortfolio.outstandingRewards.toLocaleString()}`
                  : "$0"
              }
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-1">Weighted APR</div>
            <div className="font-semibold text-lg text-white">
              {userPortfolio ? `${userPortfolio.apr.toFixed(2)}%` : "0%"}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-1">Points</div>
            <div className="font-semibold text-lg text-white">
              {userPortfolio ? userPortfolio.points : "0"}
            </div>
          </div>
        </div>
        {/* Portfolio chart placeholder (like in the image) */}
        <div className="relative bg-slate-900/40 rounded-lg p-2 h-36 flex flex-col items-center justify-center">
          <div className="text-xs text-slate-400">Performance</div>
          <div className="w-full h-24 mt-2 flex items-center justify-center">
            <span className="text-slate-600 text-xs">Chart coming soon</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  // Vaults card content (dynamic)
  const VaultsCard = (
    <Card className="bg-slate-800/50 border-slate-700 relative">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-white mb-2">
          Vaults
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Search + Filters as in image */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 mb-3">
            <div className="relative flex-1">
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
            <button
              className="flex items-center px-3 py-2 rounded-md bg-slate-900/70 border border-slate-700 text-slate-200"
              disabled
            >
              <Filter className="w-4 h-4 mr-1" /> <span className="hidden md:inline">Filter</span>
            </button>
          </div>
          <div className="flex gap-2 mb-3">
            {vaultFilters.map(f => (
              <button
                key={f}
                className="bg-slate-700 px-3 py-1 rounded-full text-xs text-purple-200 cursor-not-allowed"
                disabled
              >
                {f}
              </button>
            ))}
          </div>
          {/* Vault "table" or list */}
          <div className="flex flex-col gap-3">
            {user
              ? filteredVaults.length > 0
                  ? filteredVaults.map(v => (
                      <div
                        key={v.id}
                        className="flex items-center justify-between bg-slate-900/80 rounded-lg px-4 py-3"
                      >
                        <div className="flex-1 text-slate-100">{v.name}</div>
                        <div className="flex gap-6 items-center text-slate-300 text-xs">
                          <span>APR: {v.apr ? `${v.apr}%` : "-"} </span>
                          <span>Points: {v.points ?? "-"}</span>
                          <span>Balance: {v.balance ? `$${v.balance}` : "-"}</span>
                        </div>
                      </div>
                    ))
                  : (
                    <div className="text-center text-slate-500 py-4">No vaults found</div>
                  )
              : (
                <div className="text-center text-slate-500 py-4">Connect your wallet to see your vaults.</div>
              )
            }
          </div>
        </div>
      </CardContent>
    </Card>
  )

  // NIDUS Card as "coming soon"
  const NidusCard = (
    <Card className="relative overflow-hidden bg-gradient-to-tr from-purple-700/60 to-slate-800/80 border-none min-w-[220px] max-w-xs mx-auto mb-6 flex-col items-start">
      <CardHeader className="pb-2 flex flex-row items-center gap-3">
        {/* "N" in Circle Logo */}
        <div className="w-10 h-10 bg-slate-900 border-2 border-purple-600 rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold text-purple-300">N</span>
        </div>
        <CardTitle className="text-white text-lg font-semibold">NIDUS</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <div className="flex gap-6 items-center">
          <div className="flex flex-col text-xs">
            <span className="text-slate-400">APR</span>
            <span className="text-slate-100">-</span>
          </div>
          <div className="flex flex-col text-xs">
            <span className="text-slate-400">Points</span>
            <span className="text-slate-100">-</span>
          </div>
          <div className="flex flex-col text-xs">
            <span className="text-slate-400">Balance</span>
            <span className="text-slate-100">-</span>
          </div>
        </div>
      </CardContent>
      <Overlay>Coming Soon</Overlay>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header/Navbar */}
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
              <Link href="/" className="text-white hover:text-purple-300 transition-colors">
                Dashboard
              </Link>
              <Link href="/lending" className="text-slate-300 hover:text-purple-300 transition-colors">
                Lending
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

      <main className="container mx-auto px-4 py-8">

        {/* Portfolio + Vaults in same row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-7">
          {/* Portfolio Card */}
          <div className="relative">
            {PortfolioCard}
            {!user && <Overlay>Please log in to view your portfolio</Overlay>}
          </div>

          {/* Vaults Card */}
          <div className="relative">
            {VaultsCard}
            {!user && <Overlay>Please log in to view your vaults</Overlay>}
          </div>
        </div>

        {/* Announcements + NIDUS in next row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Announcements Card spans 2/3 */}
          <div className="md:col-span-2">
            <Card className="bg-slate-800/50 border-slate-700 h-full">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  Announcements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {dashboardData.announcements.length === 0 && (
                  <div className="text-slate-400 text-center">No announcements</div>
                )}
                {dashboardData.announcements.map((announcement) => (
                  <div key={announcement.id} className="p-3 bg-slate-700/30 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-white text-sm">{announcement.title}</h4>
                      <Badge
                        variant={announcement.type === "success" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {announcement.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-400 mb-2">{announcement.content}</p>
                    <p className="text-xs text-slate-500">
                      {new Date(announcement.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* NIDUS Card 1/3 of row */}
          <div className="relative">
            {NidusCard}
          </div>
        </div>

      </main>
      <Footer/>
    </div>
  )
}