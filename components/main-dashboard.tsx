"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Users, Wallet } from "lucide-react"
import Link from "next/link"
import { useAuth } from "./auth-provider"
import { ref, onValue, off } from "firebase/database"
import { database } from "./auth-provider"
import { ValueChart } from "@/components/value-chart"

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
}

export function MainDashboard() {
  const router = useRouter()
  const { user } = useAuth()
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    tvl: 0,
    announcements: [],
  })
  const [poolValueHistory, setPoolValueHistory] = useState<any[]>([])
  const [userPortfolio, setUserPortfolio] = useState<UserPortfolio | null>(null)

  useEffect(() => {
    const dashboardRef = ref(database, "dashboard")
    const announcementsRef = ref(database, "announcements")
    const poolValueHistoryRef = ref(database, "poolValueHistory")

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

    const unsubHistory = onValue(poolValueHistoryRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const history = Object.keys(data)
          .map((key) => ({
            timestamp: Number(key),
            value: data[key],
          }))
          .sort((a, b) => a.timestamp - b.timestamp)
        setPoolValueHistory(history)
      }
    })

    return () => {
      off(dashboardRef)
      off(announcementsRef)
      off(poolValueHistoryRef)
      unsubDashboard()
      unsubAnnouncements()
      unsubHistory()
    }
  }, [])

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
        })
      }
    })
    return () => {
      off(userPortfolioRef)
      unsubUserPortfolio()
    }
  }, [user])

  const handleChartClick = () => {
    router.push("/analytics/pool-value")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">Veritas</h1>
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
              {!user && (
                <Link href="/about-veritas" className="text-slate-300 hover:text-purple-300 transition-colors">
                  Mission
                </Link>
              )}
              <Link href="/account" className="text-slate-300 hover:text-purple-300 transition-colors">
                Account
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-2">
                  <Wallet className="h-4 w-4 text-purple-300" />
                  <span className="text-sm text-white">{user.displayName}</span>
                </div>
              ) : (
                <Button onClick={() => router.push("/account")} variant="outline" size="sm" />
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Cards for all users */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Total Pool Value (XsGD)</CardTitle>
              <DollarSign className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {dashboardData.tvl ? `\$${dashboardData.tvl.toLocaleString()}` : "-"}
              </div>
            </CardContent>
          </Card>

          {user && userPortfolio && (
            <>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">Your Pool Ownership</CardTitle>
                  <Users className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {userPortfolio.ownershipPercent.toFixed(2)}%
                  </div>
                  <div className="text-sm text-slate-400 mt-1">
                    Value: ${userPortfolio.xsgd.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">Your LP</CardTitle>
                  <Wallet className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {userPortfolio.lp.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Graph for all users */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <PoolValueChart
            data={{
              poolValueHistory, 
              dailyNewUsers: [],
              chartType: "pool",
            }}
            onClick={handleChartClick}
          />
          <PoolValueChart
            data={{
              poolValueHistory: [],
              dailyNewUsers, 
              chartType: "users",
            }}
            onClick={handleChartClick}
          />
        </div>


        {/* Announcements */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2" />
          <div>
            <Card className="bg-slate-800/50 border-slate-700">
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
        </div>
      </main>
    </div>
  )
}