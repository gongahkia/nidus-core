"use client"

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { TrendingUp, DollarSign, Users, Bell, Menu, Wallet } from "lucide-react"
import Link from "next/link"
import { useAuth } from "./auth-provider"
import { ref, onValue, off } from 'firebase/database'
import { database } from './auth-provider'

interface DashboardData {
  totalStaked: number
  currentYield: number
  tvl: number
  announcements: Array<{
    id: string
    title: string
    content: string
    timestamp: number
    type: "info" | "warning" | "success"
  }>
}

export function MainDashboard() {
  const router = useRouter()
  const { user, signIn } = useAuth()
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalStaked: 0,
    currentYield: 0,
    tvl: 0,
    announcements: [],
  })

  useEffect(() => {
    const dashboardRef = ref(database, 'dashboard')
    const announcementsRef = ref(database, 'announcements')

    const unsubscribeDashboard = onValue(dashboardRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        setDashboardData(prev => ({ ...prev, ...data }))
      }
    })

    const unsubscribeAnnouncements = onValue(announcementsRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const announcements = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }))
        setDashboardData(prev => ({ ...prev, announcements }))
      }
    })

    return () => {
      off(dashboardRef)
      off(announcementsRef)
    }

  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">Veritas Insurance</h1>
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
                <Button onClick={() => router.push("/account")} variant="outline" size="sm">
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Total Staked</CardTitle>
              <DollarSign className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${dashboardData.totalStaked.toLocaleString()}</div>
              <p className="text-xs text-slate-400 mt-1">+12.5% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Current Yield</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{dashboardData.currentYield}%</div>
              <p className="text-xs text-slate-400 mt-1">APY on staked assets</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Total Value Locked</CardTitle>
              <Users className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${(dashboardData.tvl / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-slate-400 mt-1">Across all pools</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Staking Overview */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Staking Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-white">XsGD Pool</h3>
                    <p className="text-sm text-slate-400">Singapore Dollar Stablecoin</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-400">8.5% APY</p>
                    <p className="text-sm text-slate-400">$85,000 staked</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-white">Annuity Pool</h3>
                    <p className="text-sm text-slate-400">Insurance-backed annuities</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-purple-400">12.3% APY</p>
                    <p className="text-sm text-slate-400">$40,000 staked</p>
                  </div>
                </div>

                <Separator className="bg-slate-700" />

                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Total Portfolio Value</span>
                  <span className="text-xl font-bold text-white">$125,000</span>
                </div>

                <div className="flex space-x-4">
                  <Link href="/lending" className="flex-1">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">Start Lending</Button>
                  </Link>
                  <Link href="/lending" className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full border-slate-600 text-white hover:bg-slate-700 bg-transparent"
                    >
                      Borrow Assets
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Announcements */}
          <div>
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Bell className="h-4 w-4 mr-2" />
                  Announcements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {dashboardData.announcements.map((announcement) => (
                  <div key={announcement.id} className="p-3 bg-slate-700/30 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-white text-sm">{announcement.title}</h4>
                      <Badge variant={announcement.type === "success" ? "default" : "secondary"} className="text-xs">
                        {announcement.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-400 mb-2">{announcement.content}</p>
                    <p className="text-xs text-slate-500">{new Date(announcement.timestamp).toLocaleDateString()}</p>
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