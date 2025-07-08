"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, User, Settings, HelpCircle, Shield, Bell, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useAuth } from "./auth-provider"

// Firebase database functions (commented out)
// import { ref, onValue, set } from 'firebase/database'
// import { database } from './auth-provider'

interface UserProfile {
  displayName: string
  email: string
  walletAddress: string
  joinDate: number
  totalValue: number
  preferences: {
    notifications: boolean
    darkMode: boolean
    autoCompound: boolean
  }
}

interface NFTAsset {
  id: string
  tokenId: string
  asset: string
  amount: number
  mintDate: number
  status: "active" | "redeemed"
}

export function AccountPage() {
  const { user, signIn, signOut } = useAuth()
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [nftAssets, setNFTAssets] = useState<NFTAsset[]>([])
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (!user) return

    // Firebase real-time data fetching (commented out)
    // const profileRef = ref(database, `users/${user.uid}`)
    // const nftsRef = ref(database, `nfts/${user.uid}`)

    // const unsubscribeProfile = onValue(profileRef, (snapshot) => {
    //   const data = snapshot.val()
    //   if (data) {
    //     setUserProfile(data)
    //   }
    // })

    // const unsubscribeNFTs = onValue(nftsRef, (snapshot) => {
    //   const data = snapshot.val()
    //   if (data) {
    //     const nftsArray = Object.keys(data).map(key => ({
    //       id: key,
    //       ...data[key]
    //     }))
    //     setNFTAssets(nftsArray)
    //   }
    // })

    // return () => {
    //   unsubscribeProfile()
    //   unsubscribeNFTs()
    // }

    // Placeholder data
    setUserProfile({
      displayName: user.displayName || "John Doe",
      email: user.email || "user@example.com",
      walletAddress: "0x1234...5678",
      joinDate: Date.now() - 30 * 24 * 60 * 60 * 1000, // 30 days ago
      totalValue: 125000,
      preferences: {
        notifications: true,
        darkMode: true,
        autoCompound: false,
      },
    })

    setNFTAssets([
      {
        id: "1",
        tokenId: "VRT-001",
        asset: "Annuity",
        amount: 15000,
        mintDate: Date.now() - 7 * 24 * 60 * 60 * 1000,
        status: "active",
      },
      {
        id: "2",
        tokenId: "VRT-002",
        asset: "Endowment",
        amount: 8000,
        mintDate: Date.now() - 3 * 24 * 60 * 60 * 1000,
        status: "active",
      },
    ])
  }, [user])

  const handleSaveProfile = async () => {
    if (!user || !userProfile) return

    // Firebase update (commented out)
    // const profileRef = ref(database, `users/${user.uid}`)
    // await set(profileRef, userProfile)

    setIsEditing(false)
  }

  const handlePreferenceChange = async (key: keyof UserProfile["preferences"], value: boolean) => {
    if (!userProfile) return

    const updatedProfile = {
      ...userProfile,
      preferences: {
        ...userProfile.preferences,
        [key]: value,
      },
    }
    setUserProfile(updatedProfile)

    // Firebase update (commented out)
    // if (user) {
    //   const profileRef = ref(database, `users/${user.uid}`)
    //   await set(profileRef, updatedProfile)
    // }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-apple-gray-50 via-white to-apple-gray-100 dark:from-apple-gray-950 dark:via-black dark:to-apple-gray-900 flex items-center justify-center">
        <Card className="apple-glass-card border-apple-gray-200 dark:border-apple-gray-800 w-full max-w-md">
          <CardContent className="p-8 text-center">
            <User className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Sign In Required</h3>
            <p className="text-muted-foreground mb-4">Please sign in to access your account</p>
            <Button onClick={signIn} className="w-full bg-apple-blue hover:bg-apple-blue/90 btn-apple">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-apple-gray-50 via-white to-apple-gray-100 dark:from-apple-gray-950 dark:via-black dark:to-apple-gray-900">
      {/* Header */}
      <header className="border-b border-apple-gray-200 dark:border-apple-gray-800 apple-glass">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="hover:bg-apple-gray-100 dark:hover:bg-apple-gray-900">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-apple-blue">Account</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-muted-foreground hover:text-apple-blue transition-colors">
                Dashboard
              </Link>
              <Link href="/lending" className="text-muted-foreground hover:text-apple-blue transition-colors">
                Lending
              </Link>
              <Link href="/account" className="text-foreground hover:text-apple-blue transition-colors font-medium">
                Account
              </Link>
            </nav>
            <Button
              onClick={signOut}
              variant="outline"
              size="sm"
              className="border-apple-gray-300 dark:border-apple-gray-700 hover:bg-apple-gray-50 dark:hover:bg-apple-gray-900 bg-transparent"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Summary */}
          <div className="lg:col-span-1">
            <Card className="apple-glass-card card-apple border-apple-gray-200 dark:border-apple-gray-800">
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-apple-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-white" />
                </div>
                <CardTitle>{userProfile?.displayName}</CardTitle>
                <p className="text-muted-foreground text-sm">{userProfile?.email}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
                  <p className="text-2xl font-bold">${userProfile?.totalValue.toLocaleString()}</p>
                </div>
                <Separator className="bg-apple-gray-200 dark:bg-apple-gray-800" />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Member since</span>
                    <span className="font-medium">
                      {userProfile && new Date(userProfile.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Wallet</span>
                    <span className="font-mono font-medium">{userProfile?.walletAddress}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="apple-glass-card card-apple border-apple-gray-200 dark:border-apple-gray-800 mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-muted-foreground hover:text-apple-blue hover:bg-apple-gray-50 dark:hover:bg-apple-gray-900"
                >
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Help & Support
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-muted-foreground hover:text-apple-blue hover:bg-apple-gray-50 dark:hover:bg-apple-gray-900"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  About Veritas
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="portfolio" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-apple-gray-100 dark:bg-apple-gray-900">
                <TabsTrigger
                  value="portfolio"
                  className="data-[state=active]:bg-apple-blue data-[state=active]:text-white"
                >
                  Portfolio
                </TabsTrigger>
                <TabsTrigger value="nfts" className="data-[state=active]:bg-apple-blue data-[state=active]:text-white">
                  NFT Assets
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="data-[state=active]:bg-apple-blue data-[state=active]:text-white"
                >
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="portfolio" className="space-y-6">
                <Card className="apple-glass-card card-apple border-apple-gray-200 dark:border-apple-gray-800">
                  <CardHeader>
                    <CardTitle className="text-apple-blue">Portfolio Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-apple-green/10 rounded-lg border border-apple-green/20">
                        <p className="text-sm text-apple-green">Total Supplied</p>
                        <p className="text-2xl font-bold">$85,000</p>
                        <p className="text-sm text-apple-green">Earning 8.5% APY</p>
                      </div>
                      <div className="p-4 bg-apple-red/10 rounded-lg border border-apple-red/20">
                        <p className="text-sm text-apple-red">Total Borrowed</p>
                        <p className="text-2xl font-bold">$25,000</p>
                        <p className="text-sm text-apple-red">Paying 12.3% APY</p>
                      </div>
                      <div className="p-4 bg-apple-blue/10 rounded-lg border border-apple-blue/20">
                        <p className="text-sm text-apple-blue">Net Worth</p>
                        <p className="text-2xl font-bold">$125,000</p>
                        <p className="text-sm text-apple-blue">+15.2% this month</p>
                      </div>
                    </div>

                    <Separator className="bg-apple-gray-200 dark:bg-apple-gray-800" />

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Asset Breakdown</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-apple-gray-50 dark:bg-apple-gray-900/50 rounded-lg border border-apple-gray-200 dark:border-apple-gray-800">
                          <div className="flex items-center space-x-3">
                            <div className="text-xl">💰</div>
                            <div>
                              <p className="font-medium">XsGD</p>
                              <p className="text-sm text-muted-foreground">Singapore Dollar</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">$60,000</p>
                            <p className="text-sm text-apple-green">+8.5% APY</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-apple-gray-50 dark:bg-apple-gray-900/50 rounded-lg border border-apple-gray-200 dark:border-apple-gray-800">
                          <div className="flex items-center space-x-3">
                            <div className="text-xl">🛡️</div>
                            <div>
                              <p className="font-medium">Annuity</p>
                              <p className="text-sm text-muted-foreground">Insurance Annuity</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">$40,000</p>
                            <p className="text-sm text-apple-blue">+12.8% APY</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-apple-gray-50 dark:bg-apple-gray-900/50 rounded-lg border border-apple-gray-200 dark:border-apple-gray-800">
                          <div className="flex items-center space-x-3">
                            <div className="text-xl">📈</div>
                            <div>
                              <p className="font-medium">Endowment</p>
                              <p className="text-sm text-muted-foreground">Insurance Endowment</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">$25,000</p>
                            <p className="text-sm text-apple-indigo">+15.2% APY</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="nfts" className="space-y-6">
                <Card className="apple-glass-card card-apple border-apple-gray-200 dark:border-apple-gray-800">
                  <CardHeader>
                    <CardTitle className="text-apple-blue">Your NFT Assets</CardTitle>
                    <p className="text-muted-foreground">Collateralized insurance assets as NFTs</p>
                  </CardHeader>
                  <CardContent>
                    {nftAssets.length === 0 ? (
                      <div className="text-center py-8">
                        <Shield className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground">No NFT assets yet</p>
                        <p className="text-sm text-muted-foreground">Supply annuities or endowments to mint NFTs</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {nftAssets.map((nft) => (
                          <div
                            key={nft.id}
                            className="p-4 bg-apple-gray-50 dark:bg-apple-gray-900/50 rounded-lg border border-apple-gray-200 dark:border-apple-gray-800"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-2">
                                <div className="text-xl">{nft.asset === "Annuity" ? "🛡️" : "📈"}</div>
                                <div>
                                  <p className="font-medium">{nft.asset} NFT</p>
                                  <p className="text-xs text-muted-foreground">#{nft.tokenId}</p>
                                </div>
                              </div>
                              <Badge
                                variant={nft.status === "active" ? "default" : "secondary"}
                                className={`text-xs ${
                                  nft.status === "active"
                                    ? "bg-apple-green/10 text-apple-green border-apple-green/20"
                                    : "bg-apple-gray-200 text-apple-gray-600 border-apple-gray-300"
                                }`}
                              >
                                {nft.status}
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Value</span>
                                <span className="font-medium">${nft.amount.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Minted</span>
                                <span>{new Date(nft.mintDate).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card className="apple-glass-card card-apple border-apple-gray-200 dark:border-apple-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center text-apple-blue">
                      <Settings className="h-5 w-5 mr-2" />
                      Account Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="displayName" className="text-muted-foreground">
                          Display Name
                        </Label>
                        <Input
                          id="displayName"
                          value={userProfile?.displayName || ""}
                          onChange={(e) =>
                            userProfile &&
                            setUserProfile({
                              ...userProfile,
                              displayName: e.target.value,
                            })
                          }
                          disabled={!isEditing}
                          className="bg-apple-gray-50 dark:bg-apple-gray-900 border-apple-gray-200 dark:border-apple-gray-800 disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-muted-foreground">
                          Email
                        </Label>
                        <Input
                          id="email"
                          value={userProfile?.email || ""}
                          disabled
                          className="bg-apple-gray-50 dark:bg-apple-gray-900 border-apple-gray-200 dark:border-apple-gray-800 opacity-50"
                        />
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      {isEditing ? (
                        <>
                          <Button
                            onClick={handleSaveProfile}
                            className="bg-apple-green hover:bg-apple-green/90 btn-apple"
                          >
                            Save Changes
                          </Button>
                          <Button
                            onClick={() => setIsEditing(false)}
                            variant="outline"
                            className="border-apple-gray-300 dark:border-apple-gray-700 hover:bg-apple-gray-50 dark:hover:bg-apple-gray-900"
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Button
                          onClick={() => setIsEditing(true)}
                          variant="outline"
                          className="border-apple-gray-300 dark:border-apple-gray-700 hover:bg-apple-gray-50 dark:hover:bg-apple-gray-900"
                        >
                          Edit Profile
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="apple-glass-card card-apple border-apple-gray-200 dark:border-apple-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center text-apple-blue">
                      <Bell className="h-5 w-5 mr-2" />
                      Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive updates about your positions</p>
                      </div>
                      <Switch
                        checked={userProfile?.preferences.notifications || false}
                        onCheckedChange={(checked) => handlePreferenceChange("notifications", checked)}
                      />
                    </div>
                    <Separator className="bg-apple-gray-200 dark:bg-apple-gray-800" />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Auto-Compound Rewards</p>
                        <p className="text-sm text-muted-foreground">Automatically reinvest earned yields</p>
                      </div>
                      <Switch
                        checked={userProfile?.preferences.autoCompound || false}
                        onCheckedChange={(checked) => handlePreferenceChange("autoCompound", checked)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}