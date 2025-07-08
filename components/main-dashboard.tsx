"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { TrendingUp, DollarSign, Users, Bell, Menu, Wallet } from "lucide-react"
import Link from "next/link"
import { useAuth } from "./auth-provider"

// Firebase database functions (commented out)
// import { ref, onValue, off } from 'firebase/database'
// import { database } from './auth-provider'

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
  const { user, signIn } = useAuth()
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalStaked: 0,
    currentYield: 0,
    tvl: 0,
    announcements: [],
  })

  useEffect(() => {
    // Firebase real-time data fetching (commented out)
    // const dashboardRef = ref(database, 'dashboard')
    // const announcementsRef = ref(database, 'announcements')

    // const unsubscribeDashboard = onValue(dashboardRef, (snapshot) => {
    //   const data = snapshot.val()
    //   if (data) {
    //     setDashboardData(prev => ({ ...prev, ...data }))
    //   }
    // })

    // const unsubscribeAnnouncements = onValue(announcementsRef, (snapshot) => {
    //   const data = snapshot.val()
    //   if (data) {
    //     const announcements = Object.keys(data).map(key => ({
    //       id: key,
    //       ...data[key]
    //     }))
    //     setDashboardData(prev => ({ ...prev, announcements }))
    //   }
    // })

    // return () => {
    //   off(dashboardRef)
    //   off(announcementsRef)
    // }

    // Placeholder data
    setDashboardData({
      totalStaked: 125000,
      currentYield: 8.5,
      tvl: 2500000,
      announcements: [
        {
          id: "1",
          title: "New Lending Pool Available",
          content: "XsGD lending pool is now live with competitive rates",
          timestamp: Date.now() - 3600000,
          type: "success",
        },
        {
          id: "2",
          title: "Maintenance Window",
          content: "Scheduled maintenance on Sunday 2AM-4AM UTC",
          timestamp: Date.now() - 7200000,
          type: "warning",
        },
      ],
    })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-apple-gray-50 via-white to-apple-gray-100 dark:from-apple-gray-950 dark:via-black dark:to-apple-gray-900">
      {/* Header */}
      <header className="border-b border-apple-gray-200 dark:border-apple-gray-800 apple-glass">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-apple-blue">Veritas Insurance</h1>
              <Badge variant="secondary" className="bg-apple-blue/10 text-apple-blue border-apple-blue/20">
                v2.0
              </Badge>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-foreground hover:text-apple-blue transition-colors font-medium">
                Dashboard
              </Link>
              <Link href="/lending" className="text-muted-foreground hover:text-apple-blue transition-colors">
                Lending
              </Link>
              <Link href="/account" className="text-muted-foreground hover:text-apple-blue transition-colors">
                Account
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-2">
                  <Wallet className="h-4 w-4 text-apple-blue" />
                  <span className="text-sm font-medium">{user.displayName}</span>
                </div>
              ) : (
                <Button
                  onClick={signIn}
                  variant="outline"
                  size="sm"
                  className="btn-apple border-apple-blue text-apple-blue hover:bg-apple-blue hover:text-white bg-transparent"
                >
                  Connect Wallet
                </Button>
              )}
              <Button variant="ghost" size="sm">
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="apple-glass-card card-apple border-apple-gray-200 dark:border-apple-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Staked</CardTitle>
              <DollarSign className="h-4 w-4 text-apple-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${dashboardData.totalStaked.toLocaleString()}</div>
              <p className="text-xs text-apple-green mt-1">+12.5% from last month</p>
            </CardContent>
          </Card>

          <Card className="apple-glass-card card-apple border-apple-gray-200 dark:border-apple-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Current Yield</CardTitle>
              <TrendingUp className="h-4 w-4 text-apple-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.currentYield}%</div>
              <p className="text-xs text-muted-foreground mt-1">APY on staked assets</p>
            </CardContent>
          </Card>

          <Card className="apple-glass-card card-apple border-apple-gray-200 dark:border-apple-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Value Locked</CardTitle>
              <Users className="h-4 w-4 text-apple-indigo" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(dashboardData.tvl / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-muted-foreground mt-1">Across all pools</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Staking Overview */}
          <div className="lg:col-span-2">
            <Card className="apple-glass-card card-apple border-apple-gray-200 dark:border-apple-gray-800">
              <CardHeader>
                <CardTitle className="text-apple-blue">Staking Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-apple-gray-50 dark:bg-apple-gray-900/50 rounded-xl border border-apple-gray-200 dark:border-apple-gray-800">
                  <div>
                    <h3 className="font-semibold">XsGD Pool</h3>
                    <p className="text-sm text-muted-foreground">Singapore Dollar Stablecoin</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-apple-green">8.5% APY</p>
                    <p className="text-sm text-muted-foreground">$85,000 staked</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-apple-gray-50 dark:bg-apple-gray-900/50 rounded-xl border border-apple-gray-200 dark:border-apple-gray-800">
                  <div>
                    <h3 className="font-semibold">Annuity Pool</h3>
                    <p className="text-sm text-muted-foreground">Insurance-backed annuities</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-apple-blue">12.3% APY</p>
                    <p className="text-sm text-muted-foreground">$40,000 staked</p>
                  </div>
                </div>

                <Separator className="bg-apple-gray-200 dark:bg-apple-gray-800" />

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Portfolio Value</span>
                  <span className="text-xl font-bold">$125,000</span>
                </div>

                <div className="flex space-x-4">
                  <Link href="/lending" className="flex-1">
                    <Button className="w-full bg-apple-blue hover:bg-apple-blue/90 btn-apple">Start Lending</Button>
                  </Link>
                  <Link href="/lending" className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full border-apple-gray-300 dark:border-apple-gray-700 hover:bg-apple-gray-50 dark:hover:bg-apple-gray-900 bg-transparent"
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
            <Card className="apple-glass-card card-apple border-apple-gray-200 dark:border-apple-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center text-apple-blue">
                  <Bell className="h-4 w-4 mr-2" />
                  Announcements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {dashboardData.announcements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="p-3 bg-apple-gray-50 dark:bg-apple-gray-900/50 rounded-xl border border-apple-gray-200 dark:border-apple-gray-800"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{announcement.title}</h4>
                      <Badge
                        variant={announcement.type === "success" ? "default" : "secondary"}
                        className={`text-xs ${
                          announcement.type === "success"
                            ? "bg-apple-green/10 text-apple-green border-apple-green/20"
                            : announcement.type === "warning"
                              ? "bg-apple-orange/10 text-apple-orange border-apple-orange/20"
                              : "bg-apple-blue/10 text-apple-blue border-apple-blue/20"
                        }`}
                      >
                        {announcement.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{announcement.content}</p>
                    <p className="text-xs text-muted-foreground">
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