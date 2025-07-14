"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../../components/auth-provider"; 

export default function AboutVeritasPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">About Veritas</h1>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-slate-300 hover:text-purple-300 transition-colors">
                Dashboard
              </Link>
              <Link href="/lending" className="text-slate-300 hover:text-purple-300 transition-colors">
                Lending
              </Link>
              <Link href="/about-veritas" className="text-white hover:text-purple-300 transition-colors">
                About
              </Link>
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
                <Link href="/account">
                  <button className="bg-transparent border border-purple-600 text-white rounded px-3 py-1 hover:bg-purple-700">
                    Connect
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto bg-slate-800/50 border-slate-700">
          <CardHeader className="flex items-center space-x-3">
            <Shield className="h-6 w-6 text-purple-400" />
            <CardTitle className="text-white">About Veritas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-300">
              <strong>Veritas</strong> is a next-generation decentralized lending platform. We bring transparency, security, and flexibility to the world of digital asset protection and yield generation.
            </p>
            <ul className="list-disc ml-5 text-slate-400">
              <li>Competitive lending and borrowing rates</li>
              <li>Secure and user-friendly dashboard</li>
              <li>Transparent, on-chain liquidity pools</li>
              <li>Decentralized, non-custodial platform</li>
            </ul>
            <div className="mt-6">
              <p className="text-slate-300 font-semibold">Our Mission</p>
              <p className="text-slate-400">
                Empower users to manage and protect their digital wealth with confidence and ease.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Meet the Team Section */}
        <Card className="max-w-2xl mx-auto bg-slate-800/50 border-slate-700 mt-10">
          <CardHeader>
            <CardTitle className="text-white text-xl">Meet the Team</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-8">
              {/* Richard Lei */}
              <div className="flex flex-col items-center text-center flex-1">
                <Image
                  src="https://media.licdn.com/dms/image/v2/D5603AQGo_xyOewTB7g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1695662262332?e=1757548800&v=beta&t=5p4MBBme3K6j8Gn74XZ6J94D9qPa_PZBYLVAtQEl0jA"
                  alt="Richard Lei"
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-full object-cover mb-3 border-4 border-purple-600 shadow-lg"
                />
                <div className="text-white font-semibold text-lg">Richard Lei</div>
                <div className="text-slate-400 text-sm mb-2">Chief Executive Officer</div>
                <p className="text-slate-400 text-xs">
                  Richard leads Veritas with a vision for transparent, secure, and innovative DeFi lending solutions.
                </p>
              </div>
              {/* Gabriel Ong */}
              <div className="flex flex-col items-center text-center flex-1">
                <Image
                  src="https://media.licdn.com/dms/image/v2/D5603AQFwwQ70upxVLQ/profile-displayphoto-shrink_400_400/B56ZN9ThfrGwAg-/0/1732974090931?e=1757548800&v=beta&t=DlPQfVhmtwpxN2GBPX57teX77GTOtzyW7d-4nkUPbTk"
                  alt="Gabriel Ong"
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-full object-cover mb-3 border-4 border-purple-600 shadow-lg"
                />
                <div className="text-white font-semibold text-lg">Gabriel Ong</div>
                <div className="text-slate-400 text-sm mb-2">Chief Technology Officer</div>
                <p className="text-slate-400 text-xs">
                  Gabriel leads the technical development and engineering at Veritas, ensuring robust, scalable, and user-focused DeFi infrastructure.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}