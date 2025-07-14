"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Wallet } from "lucide-react"
import Link from "next/link"
import { useAuth } from "./auth-provider"
import { ref, onValue, off } from "firebase/database"
import { database } from "./auth-provider"

interface MarketData {
  asset: string
  symbol: string
  supplyAPY: number
  variableSupplyAPY: number 
  borrowAPY: number
  totalSupply: number
  totalBorrow: number
  liquidity: number
  collateralFactor: number
  icon: string
}

export function LendingBorrowingPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [xsgdMarket, setXsgdMarket] = useState<MarketData | null>(null)

  // Fetch XSGD market data from Firebase
  useEffect(() => {
    const marketRef = ref(database, "markets/XSGD")
    const unsub = onValue(marketRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        setXsgdMarket({
          asset: "XSGD",
          symbol: "XSGD",
          supplyAPY: data.supplyAPY || 0,
          variableSupplyAPY: data.variableSupplyAPY || 0, 
          borrowAPY: data.borrowAPY || 0,
          totalSupply: data.totalSupply || 0,
          totalBorrow: data.totalBorrow || 0,
          liquidity: data.liquidity || 0,
          collateralFactor: data.collateralFactor || 0.8,
          icon: "🇸🇬",
        })
      }
    })
    return () => off(marketRef)
  }, [])

  // Gatekept handler for all actions
  const handleGatekept = (action: string) => {
    if (!user) {
      router.push("/account")
      return
    }
    // Add actual logic for logged-in users here in the future
    alert(`Action: ${action} (functionality coming soon)`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Lending & Borrowing</h1>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-slate-300 hover:text-purple-300 transition-colors">
                Dashboard
              </Link>
              <Link href="/lending" className="text-white hover:text-purple-300 transition-colors">
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
                  Connect
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!user ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <Card className="w-full max-w-lg bg-slate-800/50 border-slate-700 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-white text-2xl gap-3">
                  <span className="text-3xl">{xsgdMarket?.icon || "🇸🇬"}</span>
                  Lend XSGD
                  <Badge variant="secondary" className="ml-2 bg-purple-600/20 text-purple-300">
                    {xsgdMarket ? `${xsgdMarket.collateralFactor * 100}% LTV` : "--"}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-400">Supply APY</p>
                    <p className="text-lg font-semibold text-green-400 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {xsgdMarket ? `${xsgdMarket.supplyAPY}%` : "--"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Supply APY (Variable)</p>
                    <p className="text-lg font-semibold text-yellow-400 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {xsgdMarket ? `${xsgdMarket.variableSupplyAPY}%` : "--"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Borrow APY</p>
                    <p className="text-lg font-semibold text-red-400 flex items-center">
                      <TrendingDown className="h-4 w-4 mr-1" />
                      {xsgdMarket ? `${xsgdMarket.borrowAPY}%` : "--"}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-400">Total Supplied</p>
                    <p className="text-lg font-semibold text-white">
                      {xsgdMarket ? `$${xsgdMarket.totalSupply.toLocaleString()}` : "--"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Available</p>
                    <p className="text-lg font-semibold text-white">
                      {xsgdMarket ? `$${xsgdMarket.liquidity.toLocaleString()}` : "--"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-4 mt-4">
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => handleGatekept("Lend XSGD")}
                  >
                    Lend XSGD
                  </Button>
                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={() => handleGatekept("Borrow XSGD")}
                  >
                    Borrow XSGD
                  </Button>
                  <Button
                    className="w-full bg-slate-700 hover:bg-slate-800"
                    onClick={() => handleGatekept("Withdraw XSGD")}
                  >
                    Withdraw XSGD
                  </Button>
                </div>
                <div className="mt-4 text-center text-slate-400 text-sm">
                  <span>
                    Please <span className="text-purple-400 font-semibold">log in</span> to lend, borrow, or withdraw.
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <Card className="w-full max-w-lg bg-slate-800/50 border-slate-700 shadow-lg">
              <CardHeader>
                <CardTitle className="text-white text-2xl">You're logged in</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 mt-2">
                  Lending and borrowing features will be available here soon.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}