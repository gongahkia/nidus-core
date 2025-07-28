"use client"

import { useState, useEffect } from "react"
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

  // const [isWindowTooSmall, setIsWindowTooSmall] = useState(false)

  // useEffect(() => {
  //   const handleResize = () => {
  //     const isTooSmall =
  //       window.innerWidth < window.screen.width * 0.95 ||
  //       window.innerHeight < window.screen.height * 0.9

  //     setIsWindowTooSmall(isTooSmall)
  //   }
  //   handleResize()
  //   window.addEventListener("resize", handleResize)
  //   return () => window.removeEventListener("resize", handleResize)
  // }, [])

  // useEffect(() => {
  //   if (isWindowTooSmall) {
  //     document.body.style.overflow = "hidden";
  //     const preventDefault = (e: Event) => { e.preventDefault(); };
  //     window.addEventListener("keydown", preventDefault, { passive: false });
  //     window.addEventListener("wheel", preventDefault, { passive: false });
  //     window.addEventListener("touchmove", preventDefault, { passive: false });
  //     window.addEventListener("mousedown", preventDefault, { passive: false });
  //     return () => {
  //       document.body.style.overflow = "";
  //       window.removeEventListener("keydown", preventDefault);
  //       window.removeEventListener("wheel", preventDefault);
  //       window.removeEventListener("touchmove", preventDefault);
  //       window.removeEventListener("mousedown", preventDefault);
  //     };
  //   } else {
  //     document.body.style.overflow = "";
  //   }
  // }, [isWindowTooSmall]);

  const { user } = useAuth()
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    tvl: 0,
    announcements: [],
  })
  const [poolValueHistory, setPoolValueHistory] = useState<
    { timestamp: number; value: number }[]
  >([]);
  const [userPortfolio, setUserPortfolio] = useState<UserPortfolio | null>(null)
  const [vaults, setVaults] = useState<Vault[]>([])
  const [searchInput, setSearchInput] = useState("")

  // Dashboard, Pool Value History and Announcements fetch
  useEffect(() => {
    const dashboardRef = ref(database, "dashboard");
    const announcementsRef = ref(database, "announcements");
    const poolValueRef = ref(database, "poolValueHistory");

    // Set up listeners (no assignment needed)
    onValue(poolValueRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const arr = Object.entries(data).map(([timestamp, value]) => ({
          timestamp: Number(timestamp),
          value: Number(value),
        })).sort((a, b) => a.timestamp - b.timestamp)  // ✅ Ensure correct chronological order
        setPoolValueHistory(arr);
      }
    });

    onValue(dashboardRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setDashboardData((prev) => ({ ...prev, tvl: data.tvl || 0 }));
    });

    onValue(announcementsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const announcements = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setDashboardData((prev) => ({ ...prev, announcements }));
      }
    });

    // Clean up with .off(ref) ONLY, do not try to call unsub functions
    return () => {
      off(poolValueRef);
      off(dashboardRef);
      off(announcementsRef);
    };
  }, []);

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

  // useEffect(() => {
  //   if (!user) {
  //     console.log("user not logged in")
  //     return
  //   } else {
  //     console.log("user logged in")
  //     console.log("user", user);
  //     console.log("vaults", vaults);
  //     console.log("userPortfolio", userPortfolio);
  //     console.log("dashboardData", dashboardData);
  //     console.log("poolValueHistory", poolValueHistory);
  //   }
  // })

  const filteredVaults = vaults.filter(
    (v) =>
      !searchInput ||
      v.name.toLowerCase().includes(searchInput.toLowerCase())
  )

  // Portfolio card content (dynamic)
  const PortfolioCard = (
    <Card className="bg-slate-800/50 border-slate-700 relative min-h-[505px] max-h-[505px] h-[505px]">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-white mb-2">
          Portfolio
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full flex flex-col">
        {/* Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-300 mb-4">
          <div>
            <div className="text-xs text-slate-400 mb-1">Balance</div>
            <div className="font-semibold text-lg text-white">
              {userPortfolio ? `$${userPortfolio.xsgd.toLocaleString()}` : "$0"}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-1">Outstanding rewards</div>
            <div className="font-semibold text-lg text-white">
              {userPortfolio ? `$${userPortfolio.outstandingRewards.toLocaleString()}` : "$0"}
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
        {/* Chart Block - moved up, direct succession */}
        <div className="relative bg-slate-900/40 rounded-lg p-3 pt-2 pb-4 flex flex-col" style={{height: "330px"}}>
          <div className="text-xs text-slate-400 mb-2 w-full text-left">Performance</div>
          <div className="w-full h-full min-h-[140px]">
            <ValueChart
              data={{
                poolValueHistory,
                dailyNewUsers: [],
                chartType: "pool",
              }}
              onClick={() => {}}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const vaultProtocols = Array.from(
    new Set(
      (vaults || []).map((v) => v.name) 
    )
  );

  // Vaults card content (dynamic)
  const VaultsCard = (
  // <Card className="bg-slate-800/50 border-slate-700 relative h-full flex flex-col">
  <Card className="bg-slate-800/50 border-slate-700 relative min-h-[505px] max-h-[505px] h-[505px]">
    <CardHeader className="pb-3">
      <CardTitle className="flex items-center justify-between text-white mb-2">
        Vaults
      </CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col flex-1">
      {/* Search + Filter Row */}
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
      {/* Dynamic Protocol Filter Bubbles */}
      <div className="flex gap-2 mb-3 flex-wrap">
        {vaultProtocols.map((protocol) => (
          <button
            key={protocol}
            className="bg-slate-700 px-3 py-1 rounded-full text-xs text-purple-200 cursor-not-allowed"
            disabled
          >
            {protocol}
          </button>
        ))}
      </div>
      {/* Vaults List - fixed height, scrollable */}
      <div className="flex-1 min-h-[305px] max-h-[305px] overflow-y-auto"> 
        {user
          ? filteredVaults.length > 0
            ? filteredVaults.map(v => (
                <div
                  key={v.id}
                  className="flex items-center justify-between bg-slate-900/80 rounded-lg px-4 py-3 mb-2"
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
    </CardContent>
  </Card>
  )

  const NidusCard = (
    <Card className="relative overflow-hidden bg-gradient-to-tr from-purple-700/60 to-slate-800/80 border-none min-w-[220px] max-w-xs mx-auto mb-6 flex-col items-start">
      <CardHeader className="pb-2 flex flex-row items-center gap-3">
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
              <Link href="/vaults" className="text-slate-300 hover:text-purple-300 transition-colors">
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

      <main className="container mx-auto px-4 py-8">

        {/* Portfolio + Vaults in same row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-7 items-stretch">
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
            <Card className="bg-slate-800/50 border-slate-700 h-[400px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  Announcements {dashboardData.announcements.length > 0 && `(${dashboardData.announcements.length})`}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto space-y-4">
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

          <div className="relative">
            {NidusCard}
          </div>
        </div>

      </main>
      <Footer/>
      {/* {isWindowTooSmall && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center text-center p-4">
          <div className="bg-slate-900 border border-purple-600 p-6 rounded-lg max-w-md text-white space-y-2 shadow-lg">
            <h2 className="text-xl font-bold text-purple-300">Please Maximise Window</h2>
            <p className="text-sm text-slate-300">
              NIDUS is optimised for full-screen viewing. Please maximise your browser window for the best experience.
            </p>
          </div>
        </div>
      )} */}
    </div>
  )
}