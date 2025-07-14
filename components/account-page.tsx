"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Settings, HelpCircle, Shield, Bell, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useAuth } from "./auth-provider"
import { ref, onValue, set } from 'firebase/database'
import { database } from './auth-provider'

interface UserProfile {
  displayName: string
  email: string
  walletAddress: string
  joinDate: number
  preferences: {
    notifications: boolean
    autoCompound: boolean
  }
  portfolio: {
    annuity: number
    endowment: number
    xsgd: number,
    lp: number
  }
}

export function AccountPage() {
  const { user, signIn, signUp, signOut } = useAuth()
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [authError, setAuthError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return

    const userRef = ref(database, `users/${user.uid}`)

    const unsubscribeUser = onValue(userRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        setUserProfile({
          displayName: data.displayName || "",
          email: data.email || "",
          walletAddress: data.walletAddress || "",
          joinDate: data.joinDate || 0,
          preferences: {
            notifications: data.preferences?.notifications ?? false,
            autoCompound: data.preferences?.autoCompound ?? false,
          },
          portfolio: {
            annuity: data.portfolio?.annuity ?? 0,
            endowment: data.portfolio?.endowment ?? 0,
            xsgd: data.portfolio?.xsgd ?? 0,
            lp: data.portfolio?.lp ?? 0
          }
        })
      }
    })

    return () => {
      unsubscribeUser()
    }
  }, [user])

  const handleSaveProfile = async () => {
    if (!user || !userProfile) return
    const userRef = ref(database, `users/${user.uid}`)
    await set(userRef, {
      ...userProfile,
    })
    setIsEditing(false)
  }

  const handlePreferenceChange = async (key: keyof UserProfile["preferences"], value: boolean) => {
    if (!userProfile || !user) return
    const updatedProfile = {
      ...userProfile,
      preferences: {
        ...userProfile.preferences,
        [key]: value,
      },
    }
    setUserProfile(updatedProfile)
    const userRef = ref(database, `users/${user.uid}`)
    await set(userRef, updatedProfile)
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError(null)
    try {
      if (authMode === "signin") {
        await signIn(email, password)
      } else {
        await signUp(email, password)
      }
      setEmail("")
      setPassword("")
      } catch (err: unknown) {
        if (err instanceof Error) {
          setAuthError(err.message)
        } else {
          setAuthError("Authentication failed")
        }
      }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Card className="bg-slate-800/50 border-slate-700 w-full max-w-md">
          <CardContent className="p-8">
            <User className="h-12 w-12 mx-auto mb-4 text-slate-400" />
            <h3 className="text-xl font-semibold text-white mb-2">
              {authMode === "signin" ? "Sign In" : "Sign Up"}
            </h3>
            <p className="text-slate-400 mb-4">
              {authMode === "signin"
                ? "Sign in to access your account"
                : "Create an account to get started"}
            </p>
            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-slate-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-slate-300">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete={authMode === "signin" ? "current-password" : "new-password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              {authError && (
                <div className="text-red-500 text-sm">{authError}</div>
              )}
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                {authMode === "signin" ? "Sign In" : "Sign Up"}
              </Button>
              <div className="text-slate-400 text-sm text-center mt-2">
                {authMode === "signin" ? (
                  <>
                    Don&#39;t have an account?{" "}
                    <button
                      type="button"
                      className="text-purple-400 underline"
                      onClick={() => setAuthMode("signup")}
                    >
                      Sign Up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      className="text-purple-400 underline"
                      onClick={() => setAuthMode("signin")}
                    >
                      Sign In
                    </button>
                  </>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">Account</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-slate-300 hover:text-purple-300 transition-colors">
                Dashboard
              </Link>
              <Link href="/lending" className="text-slate-300 hover:text-purple-300 transition-colors">
                Lending
              </Link>
              <Link href="/account" className="text-white hover:text-purple-300 transition-colors">
                Account
              </Link>
            </nav>
            <Button onClick={signOut} variant="outline" size="sm">
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-white">
                  {isEditing ? (
                    <Input
                      value={userProfile?.displayName || ""}
                      onChange={e =>
                        userProfile && setUserProfile({ ...userProfile, displayName: e.target.value })
                      }
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  ) : (
                    userProfile?.displayName
                  )}
                </CardTitle>
                <p className="text-slate-400 text-sm">{userProfile?.email}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-slate-400">Total Portfolio Value</p>
                  <p className="text-2xl font-bold text-white">
                    $
                    {(
                      (userProfile?.portfolio.lp || 0) +
                      (userProfile?.portfolio.xsgd || 0)
                    ).toLocaleString()}
                  </p>
                </div>
                <Separator className="bg-slate-700" />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Member since</span>
                    <span className="text-white">
                      {userProfile && new Date(userProfile.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Wallet</span>
                    <span className="text-white font-mono">{userProfile?.walletAddress}</span>
                  </div>
                </div>
                <div className="flex space-x-4 mt-4">
                  {isEditing ? (
                    <>
                      <Button onClick={handleSaveProfile} className="bg-green-600 hover:bg-green-700">
                        Save
                      </Button>
                      <Button
                        onClick={() => setIsEditing(false)}
                        variant="outline"
                        className="border-slate-600 text-white hover:bg-slate-700"
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      className="border-slate-600 text-white hover:bg-slate-700"
                    >
                      Edit Profile
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="bg-slate-800/50 border-slate-700 mt-6">
              <CardHeader>
                <CardTitle className="text-white text-lg">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/help-support" passHref>
                  <Button asChild variant="ghost" className="w-full justify-start text-slate-300 hover:text-white">
                    <span>
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Help & Support
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </span>
                  </Button>
                </Link>
                <Link href="/about-veritas" passHref>
                  <Button asChild variant="ghost" className="w-full justify-start text-slate-300 hover:text-white">
                    <span>
                      <Shield className="h-4 w-4 mr-2" />
                      About Veritas
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </span>
                  </Button>
                </Link>
              </CardContent>
            </Card> 

          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="portfolio" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 bg-slate-800/50">
                <TabsTrigger value="portfolio" className="data-[state=active]:bg-purple-600">
                  Portfolio
                </TabsTrigger>
                <TabsTrigger value="settings" className="data-[state=active]:bg-purple-600">
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="portfolio" className="space-y-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Portfolio Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-yellow-600/20 rounded-lg">
                        <p className="text-sm text-yellow-300">LP</p>
                        <p className="text-2xl font-bold text-white">
                          ${userProfile?.portfolio.lp.toLocaleString()}
                        </p>
                      </div>
                      <div className="p-4 bg-green-600/20 rounded-lg">
                        <p className="text-sm text-green-300">XsGD</p>
                        <p className="text-2xl font-bold text-white">
                          ${userProfile?.portfolio.xsgd.toLocaleString()}
                        </p>
                      </div>
                    </div>

                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white">
                      <Settings className="h-5 w-5 mr-2" />
                      Account Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="displayName" className="text-slate-300">
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
                          className="bg-slate-700 border-slate-600 text-white disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-slate-300">
                          Email
                        </Label>
                        <Input
                          id="email"
                          value={userProfile?.email || ""}
                          disabled
                          className="bg-slate-700 border-slate-600 text-white opacity-50"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white">
                      <Bell className="h-5 w-5 mr-2" />
                      Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">Email Notifications</p>
                        <p className="text-sm text-slate-400">Receive updates about your positions</p>
                      </div>
                      <Switch
                        checked={userProfile?.preferences.notifications || false}
                        onCheckedChange={(checked) => handlePreferenceChange("notifications", checked)}
                      />
                    </div>
                    <Separator className="bg-slate-700" />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">Auto-Compound Rewards</p>
                        <p className="text-sm text-slate-400">Automatically reinvest earned yields</p>
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