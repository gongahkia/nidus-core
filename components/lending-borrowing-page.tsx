"use client"

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { TrendingUp, TrendingDown, Wallet, Shield, Coins } from "lucide-react"
import Link from "next/link"
import { useAuth } from "./auth-provider"
import { useToast } from "@/hooks/use-toast"
import { ref, push, set, onValue } from 'firebase/database'
import { database } from './auth-provider'

interface MarketData {
  asset: string
  symbol: string
  supplyAPY: number
  borrowAPY: number
  totalSupply: number
  totalBorrow: number
  liquidity: number
  collateralFactor: number
  icon: string
}

interface UserPosition {
  asset: string
  supplied: number
  borrowed: number
  collateral: number
}

export function LendingBorrowingPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [markets, setMarkets] = useState<MarketData[]>([])
  const [userPositions, setUserPositions] = useState<UserPosition[]>([])
  const [selectedAsset, setSelectedAsset] = useState<MarketData | null>(null)
  const [actionAmount, setActionAmount] = useState("")
  const [actionType, setActionType] = useState<"supply" | "borrow" | "withdraw" | "repay">("supply")
  const router = useRouter();

  useEffect(() => {
    const marketsRef = ref(database, 'markets')
    const userPositionsRef = ref(database, `userPositions/${user?.uid}`)

    const unsubscribeMarkets = onValue(marketsRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const marketsArray = Object.keys(data).map(key => ({
          ...data[key],
          asset: key
        }))
        setMarkets(marketsArray)
      }
    })

    const unsubscribePositions = onValue(userPositionsRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const positionsArray = Object.keys(data).map(key => ({
          asset: key,
          ...data[key]
        }))
        setUserPositions(positionsArray)
      }
    })

    return () => {
      unsubscribeMarkets()
      unsubscribePositions()
    }

  }, [user])

  const handleTransaction = async () => {

    if (!user) {
      router.push("/account");
      return;
    }


    if (!selectedAsset || !actionAmount) return

    const transactionRef = ref(database, `transactions/${user.uid}`)
    const newTransactionRef = push(transactionRef)
    await set(newTransactionRef, {
      asset: selectedAsset.asset,
      action: actionType,
      amount: parseFloat(actionAmount),
      timestamp: Date.now(),
      status: 'pending'
    })

    if ((actionType === 'supply') && (selectedAsset.asset === 'Annuity' || selectedAsset.asset === 'Endowment')) {
      const nftRef = ref(database, `nfts/${user.uid}`)
      const newNFTRef = push(nftRef)
      await set(newNFTRef, {
        asset: selectedAsset.asset,
        amount: parseFloat(actionAmount),
        tokenId: `VRT-${Date.now()}`,
        timestamp: Date.now(),
        status: 'minted'
      })
    }

    toast({
      title: "Transaction Submitted",
      description: `${actionType} ${actionAmount} ${selectedAsset.symbol} ${
        (selectedAsset.asset === "Annuity" || selectedAsset.asset === "Endowment") && actionType === "supply"
          ? "(NFT will be credited to your wallet)"
          : ""
      }`,
    })

    setActionAmount("")
    setSelectedAsset(null)
  }

  const requiresAuth = (action: () => void) => {
    if (!user) {
      router.push("/account");
      return;
    }

    action()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">Lending & Borrowing</h1>
            </div>
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
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="markets" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 bg-slate-800/50">
            <TabsTrigger value="markets" className="data-[state=active]:bg-purple-600">
              Markets
            </TabsTrigger>
            <TabsTrigger value="positions" className="data-[state=active]:bg-purple-600">
              Your Positions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="markets" className="space-y-6">
            <div className="grid gap-6">
              {markets.map((market) => (
                <Card key={market.asset} className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">{market.icon}</div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{market.asset}</h3>
                          <p className="text-slate-400">{market.symbol}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
                        {market.collateralFactor * 100}% LTV
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div>
                        <p className="text-sm text-slate-400">Supply APY</p>
                        <p className="text-lg font-semibold text-green-400 flex items-center">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          {market.supplyAPY}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">Borrow APY</p>
                        <p className="text-lg font-semibold text-red-400 flex items-center">
                          <TrendingDown className="h-4 w-4 mr-1" />
                          {market.borrowAPY}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">Total Supply</p>
                        <p className="text-lg font-semibold text-white">${market.totalSupply.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">Available</p>
                        <p className="text-lg font-semibold text-white">${market.liquidity.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            className="flex-1 bg-green-600 hover:bg-green-700"
                            onClick={() =>
                              requiresAuth(() => {
                                setSelectedAsset(market)
                                setActionType("supply")
                              })
                            }
                          >
                            Supply {market.symbol}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-slate-800 border-slate-700">
                          <DialogHeader>
                            <DialogTitle className="text-white">Supply {selectedAsset?.symbol}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="amount" className="text-slate-300">
                                Amount
                              </Label>
                              <Input
                                id="amount"
                                type="number"
                                placeholder="0.00"
                                value={actionAmount}
                                onChange={(e) => setActionAmount(e.target.value)}
                                className="bg-slate-700 border-slate-600 text-white"
                              />
                            </div>
                            {selectedAsset &&
                              (selectedAsset.asset === "Annuity" || selectedAsset.asset === "Endowment") && (
                                <div className="p-3 bg-purple-600/20 rounded-lg">
                                  <div className="flex items-center space-x-2 text-purple-300">
                                    <Shield className="h-4 w-4" />
                                    <span className="text-sm">NFT will be minted and credited to your wallet</span>
                                  </div>
                                </div>
                              )}
                            <Button onClick={handleTransaction} className="w-full bg-green-600 hover:bg-green-700">
                              Supply {selectedAsset?.symbol}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="flex-1 border-slate-600 text-white hover:bg-slate-700 bg-transparent"
                            onClick={() =>
                              requiresAuth(() => {
                                setSelectedAsset(market)
                                setActionType("borrow")
                              })
                            }
                          >
                            Borrow {market.symbol}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-slate-800 border-slate-700">
                          <DialogHeader>
                            <DialogTitle className="text-white">Borrow {selectedAsset?.symbol}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="borrow-amount" className="text-slate-300">
                                Amount
                              </Label>
                              <Input
                                id="borrow-amount"
                                type="number"
                                placeholder="0.00"
                                value={actionAmount}
                                onChange={(e) => setActionAmount(e.target.value)}
                                className="bg-slate-700 border-slate-600 text-white"
                              />
                            </div>
                            <div className="p-3 bg-yellow-600/20 rounded-lg">
                              <p className="text-sm text-yellow-300">
                                Ensure you have sufficient collateral to maintain your health factor
                              </p>
                            </div>
                            <Button onClick={handleTransaction} className="w-full bg-red-600 hover:bg-red-700">
                              Borrow {selectedAsset?.symbol}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="positions" className="space-y-6">
            {!user ? (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-8 text-center">
                  <Wallet className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                  <h3 className="text-xl font-semibold text-white mb-2">Connect Your Wallet</h3>
                  <p className="text-slate-400 mb-4">
                    Connect your wallet to view your lending and borrowing positions
                  </p>
                  <Button onClick={() => router.push("/account")} className="bg-purple-600 hover:bg-purple-700">
                      Connect Wallet
                    </Button>
                  </CardContent>
              </Card>
            ) : userPositions.length === 0 ? (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-8 text-center">
                  <Coins className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                  <h3 className="text-xl font-semibold text-white mb-2">No Positions Yet</h3>
                  <p className="text-slate-400 mb-4">Start by supplying assets to earn yield</p>
                  <Button
                    onClick={() => document.querySelector('[value="markets"]')?.click()}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Explore Markets
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {userPositions.map((position) => {
                  const market = markets.find((m) => m.asset === position.asset)
                  if (!market) return null

                  return (
                    <Card key={position.asset} className="bg-slate-800/50 border-slate-700">
                      <CardHeader>
                        <CardTitle className="flex items-center text-white">
                          <span className="text-xl mr-2">{market.icon}</span>
                          {position.asset} Position
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-4 bg-green-600/20 rounded-lg">
                            <p className="text-sm text-green-300">Supplied</p>
                            <p className="text-xl font-bold text-white">${position.supplied.toLocaleString()}</p>
                            <p className="text-sm text-green-300">Earning {market.supplyAPY}% APY</p>
                          </div>

                          {position.borrowed > 0 && (
                            <div className="p-4 bg-red-600/20 rounded-lg">
                              <p className="text-sm text-red-300">Borrowed</p>
                              <p className="text-xl font-bold text-white">${position.borrowed.toLocaleString()}</p>
                              <p className="text-sm text-red-300">Paying {market.borrowAPY}% APY</p>
                            </div>
                          )}

                          <div className="p-4 bg-purple-600/20 rounded-lg">
                            <p className="text-sm text-purple-300">Collateral</p>
                            <p className="text-xl font-bold text-white">${position.collateral.toLocaleString()}</p>
                            <p className="text-sm text-purple-300">{market.collateralFactor * 100}% LTV</p>
                          </div>
                        </div>

                        <div className="flex space-x-4">
                          <Button
                            variant="outline"
                            className="flex-1 border-slate-600 text-white hover:bg-slate-700 bg-transparent"
                          >
                            Withdraw
                          </Button>
                          {position.borrowed > 0 && (
                            <Button
                              variant="outline"
                              className="flex-1 border-slate-600 text-white hover:bg-slate-700 bg-transparent"
                            >
                              Repay
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}