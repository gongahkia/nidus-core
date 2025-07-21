"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, User, Medal } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { ref, query, orderByChild, limitToLast, onValue, off } from "firebase/database";
import { database } from "./auth-provider";

interface LeaderboardEntry {
  userId: string;
  score: number;
  displayName?: string;
  walletAddress?: string;
  lastUpdated?: number;
}

export default function PointLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {

    const leaderboardRef = query(
      ref(database, "leaderboard"),
      orderByChild("score"),
      limitToLast(10)
    );

    const handler = onValue(leaderboardRef, (snapshot) => {
      const entries: LeaderboardEntry[] = [];
      snapshot.forEach(childSnap => {
        entries.push({
          userId: childSnap.key!,
          ...childSnap.val(),
        });
      });
      entries.sort(
        (a, b) =>
          b.score - a.score ||
          (b.lastUpdated ?? 0) - (a.lastUpdated ?? 0)
      );
      entries.forEach((entry, idx) => (entry['rank'] = idx + 1));
      setLeaderboard(entries);
    });

    return () => off(leaderboardRef, "value", handler);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
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
              <Link href="/points" className="text-white hover:text-purple-300 transition-colors">
                Points
              </Link>
              <Link href="/about-nidus" className="text-slate-300 hover:text-purple-300 transition-colors">
                Mission
              </Link>
              <Link href="/account" className="text-slate-300 hover:text-purple-300 transition-colors">
                Account
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="bg-slate-800/50 border-slate-700 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center text-white gap-2">
              <TrendingUp className="text-purple-400 w-6 h-6" />
              Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-lg">
              <table className="w-full text-left min-w-[700px]">
                <thead>
                  <tr className="text-xs uppercase text-slate-400 border-b border-slate-700">
                    <th className="py-3 px-4 font-semibold w-16">Rank</th>
                    <th className="py-3 px-4 font-semibold">User</th>
                    <th className="py-3 px-4 font-semibold">Wallet</th>
                    <th className="py-3 px-4 font-semibold">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-4 text-center text-slate-400">
                        No leaderboard data.
                      </td>
                    </tr>
                  )}
                  {leaderboard.map((entry, idx) => (
                    <tr
                      key={entry.userId}
                      className={`${
                        idx === 0
                          ? "bg-gradient-to-r from-yellow-500/10 via-yellow-300/5 to-transparent"
                          : idx === 1
                          ? "bg-gradient-to-r from-slate-300/5 via-slate-400/5 to-transparent"
                          : idx === 2
                          ? "bg-gradient-to-r from-amber-700/5 via-amber-500/5 to-transparent"
                          : "odd:bg-slate-900/10"
                      }`}
                    >
                      <td className="py-2 px-4 align-middle text-center font-bold text-white">
                        {idx === 0 ? (
                          <Medal className="text-yellow-400 w-5 h-5 mx-auto" />
                        ) : idx === 1 ? (
                          <Medal className="text-slate-300 w-5 h-5 mx-auto" />
                        ) : idx === 2 ? (
                          <Medal className="text-amber-700 w-5 h-5 mx-auto" />
                        ) : (
                          entry['rank']
                        )}
                      </td>
                      <td className="py-2 px-4 align-middle font-mono text-slate-300 text-xs">
                        <span className="inline-flex items-center gap-1">
                          <User className="inline-block w-4 h-4 text-slate-500" />
                          <span className="tracking-wide">
                            {entry.displayName && entry.displayName.length > 0
                              ? entry.displayName
                              : entry.userId.slice(0, 6) + "..." + entry.userId.slice(-4)}
                          </span>
                        </span>
                      </td>
                      <td className="py-2 px-4 align-middle text-slate-500 text-xs font-mono">
                        {entry.walletAddress
                          ? entry.walletAddress.slice(0, 6) + "..." + entry.walletAddress.slice(-4)
                          : "--"}
                      </td>
                      <td className="py-2 px-4 align-middle font-semibold text-white">
                        {entry.score.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}