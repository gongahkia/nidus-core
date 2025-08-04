"use client" // Added this line

import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { JoinForm } from "@/components/join-form"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0a2a] to-[#0a0a0a] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gradient-to-r from-[#1a0a2a] to-[#0a0a0a] py-4">
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold tracking-tight">NIDUS</h1>
            <span className="text-sm text-gray-400">v1.0</span>
          </div>
          <nav className="hidden space-x-6 md:flex">
            <Link href="#about" className="text-sm font-medium text-gray-300 hover:text-white">
              About
            </Link>
            <Link href="#team" className="text-sm font-medium text-gray-300 hover:text-white">
              Team
            </Link>
            <Link href="#join" className="text-sm font-medium text-gray-300 hover:text-white">
              Join
            </Link>
          </nav>
          <Button variant="secondary" className="hidden md:block">
            Connect Wallet
          </Button>
          {/* Mobile menu button would go here */}
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32 lg:py-40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
              NIDUS PROTOCOL
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10">
              Unlocking predictable, real-world yield from Singaporean insurance policies, bridging traditional finance
              with DeFi.
            </p>
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-full"
            >
              Get Started
            </Button>
            <div className="mt-16 md:mt-24">
              <Image
                src="/images/nidus-dashboard.png"
                alt="NIDUS Dashboard Screenshot"
                width={1200}
                height={700}
                className="rounded-xl shadow-2xl border border-gray-800 mx-auto"
              />
            </div>
            <div className="mt-16 text-sm text-gray-400">
              <p>Presented by Richard Lei</p>
              <p>
                Verus Co |{" "}
                <Link href="https://www.veritas.com" className="underline hover:text-white">
                  www.veritas.com
                </Link>
              </p>
              <p>leirichard58@gmail.com | +65 96476459</p>
            </div>
          </div>
          {/* Abstract background elements */}
          <div className="absolute inset-0 z-0 opacity-20">
            <Image
              src="/placeholder.svg?height=800&width=1600"
              alt="Abstract background"
              layout="fill"
              objectFit="cover"
              className="pointer-events-none"
            />
          </div>
        </section>

        {/* About Section - Combined */}
        <section id="about" className="py-20 md:py-32 bg-gray-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-16">About NIDUS</h3>

            {/* The Problem Sub-section */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
              <div className="relative h-96 w-full">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Abstract swirling ribbon"
                  layout="fill"
                  objectFit="contain"
                  className="pointer-events-none"
                />
              </div>
              <div>
                <h4 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">THE PROBLEM</h4>
                <ul className="space-y-8">
                  <li>
                    <h5 className="text-2xl font-semibold mb-2 flex items-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-yellow-500 text-black mr-3">
                        ●
                      </span>
                      Locked Value
                    </h5>
                    <p className="text-gray-300">
                      S$33 billion sits idle in Singapore endowment & annuity policies. $840M in annual surrender claims
                      with 20-40% value loss. Massive secondary market opportunity.
                    </p>
                  </li>
                  <li>
                    <h5 className="text-2xl font-semibold mb-2 flex items-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-yellow-500 text-black mr-3">
                        ●
                      </span>
                      Manual Market
                    </h5>
                    <p className="text-gray-300">
                      Secondary-policy brokers (e.g., REPs, TES) still rely on paper processes; settlement takes days.
                      Physical presence required at insurer offices for policy transfer.
                    </p>
                  </li>
                  <li>
                    <h5 className="text-2xl font-semibold mb-2 flex items-center">
                      <span className="inline-flex items-center justify-2 w-6 h-6 rounded-full bg-yellow-500 text-black mr-3">
                        ●
                      </span>
                      Yield Gap
                    </h5>
                    <p className="text-gray-300">
                      Retail cash products pay 1.8 - 2.0%; crypto users holding XSGD earn almost zero.
                    </p>
                  </li>
                  <li>
                    <h5 className="text-2xl font-semibold mb-2 flex items-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-yellow-500 text-black mr-3">
                        ●
                      </span>
                      No Digital Bridge
                    </h5>
                    <p className="text-gray-300">
                      There is no regulated, on-chain product that converts these predictable insurance coupons into
                      liquid SGD yield.
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            {/* Why It Matters Sub-section */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
              <div>
                <h4 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">WHY IT MATTERS</h4>
                <ul className="space-y-6 text-lg text-gray-300">
                  <li>
                    <p>
                      <span className="font-semibold text-white">Trapped Liquidity ≠ Singapore's FinTech Vision.</span>{" "}
                      Unlocking even 5% of the resale-endowment market releases S$42M for productive use.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className="font-semibold text-white">Investors Want Real-World Yield.</span> 78% of APAC
                      crypto holders surveyed (MAS Project Guardian, 2025) prefer tokenised assets with stable cash
                      flow.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className="font-semibold text-white">First-Mover Moat:</span> Whoever digitises insurance
                      coupons at scale sets the reference yield curve for SGD DeFi.
                    </p>
                  </li>
                </ul>
              </div>
              <div className="relative h-96 w-full">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Professionals collaborating"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
            </div>

            {/* Competitive Landscape Sub-section */}
            <div className="mb-24">
              <h4 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-16">COMPETITIVE LANDSCAPE</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                <Card className="bg-gray-800 border-gray-700 text-white">
                  <CardHeader>
                    <CardTitle className="text-xl">REPS HOLDINGS / TES CAPITAL</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-gray-300">
                    <p>• Insurance Resale</p>
                    <p>• 5-7% Yield</p>
                    <p>• 15-30 min + a few days of processing time</p>
                    <p>• Traditional investors</p>
                    <p>• No instant liquidity, paper-based</p>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700 text-white">
                  <CardHeader>
                    <CardTitle className="text-xl">TIGER BROKERS</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-gray-300">
                    <p>• Money Market Funds</p>
                    <p>• 1.8-2.3% Yield</p>
                    <p>• Instant withdrawal for small volumes</p>
                    <p>• Traditional investors</p>
                    <p>• Low yields, no crypto integration</p>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700 text-white">
                  <CardHeader>
                    <CardTitle className="text-xl">BLUEJAY FINANCE [CLOSED]</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-gray-300">
                    <p>• XSGD Staking</p>
                    <p>• 3-5% Yield</p>
                    <p>• 3-6 Months Lockup</p>
                    <p>• Crypto Natives</p>
                    <p>• Large LP minimums, limited yield sources</p>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700 text-white">
                  <CardHeader>
                    <CardTitle className="text-xl">AAVE</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-gray-300">
                    <p>• Global DeFi Lending</p>
                    <p>• 5-10% (but in USD)</p>
                    <p>• Instant withdrawal for small volumes</p>
                    <p>• Global crypto users</p>
                    <p>• No Singapore focus, little traditional finance</p>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center mb-12">
                <h5 className="text-2xl font-semibold mb-4">Market Reality: No SGD stablecoin Yield Option</h5>
                <ul className="list-disc list-inside space-y-2 text-gray-300 max-w-2xl mx-auto">
                  <li>No existing platform with XSGD yields</li>
                  <li>Traditional players (REPS/TES) focus purely on policy resale without lending features</li>
                  <li>Global protocols lack RWA integration and Singapore regulatory compliance</li>
                  <li>Insurance companies don't offer digital lending against policy portfolios</li>
                </ul>
              </div>

              <div className="text-center">
                <h5 className="text-2xl font-semibold mb-4">Blue Ocean Opportunity:</h5>
                <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                  We're creating an entirely new category - XSGD yields - rather than competing in existing segments.
                </p>
              </div>
            </div>

            {/* Solution Architecture Sub-section */}
            <div className="mb-24">
              <h4 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-16">
                OUR SOLUTION ARCHITECTURE
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <Card className="bg-gray-800 border-gray-700 text-white">
                  <CardHeader>
                    <CardTitle className="text-2xl">XSGD YIELD VAULT ARCHITECTURE</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-gray-300">
                    <p>• Rebase token system automatically distributing daily yield to holders</p>
                    <p>• Three-tier liquidity management: 5% instant, 7% same-day, 3% T+2 processing</p>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700 text-white">
                  <CardHeader>
                    <CardTitle className="text-2xl">INSURANCE MANAGEMENT LAYER</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-gray-300">
                    <p>• Optimal allocation strategy: 75-80% policies, 20-25% enhanced cash buffer</p>
                    <p>• Staggered maturity ladder ensuring regular liquidity events</p>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700 text-white">
                  <CardHeader>
                    <CardTitle className="text-2xl">REVENUE GENERATION MECHANISM</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-gray-300">
                    <p>• Yield margin: Earn 7-9% from policies, distribute 3-4% to XSGD LP providers</p>
                    <p>• Fee structure: 0.5-1% TVL locked when deposited with swap fees</p>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700 text-white">
                  <CardHeader>
                    <CardTitle className="text-2xl">TECHNICAL INFRASTRUCTURE</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-gray-300">
                    <p>• Automated rebalancing triggered by utilization thresholds</p>
                    <p>• Emergency circuit breakers for liquidity stress management</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Key Competitive Advantages Sub-section */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
              <div className="relative h-96 w-full">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Person raising fist in victory"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
              <div>
                <h4 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">KEY COMPETITIVE ADVANTAGES</h4>
                <ul className="space-y-8">
                  <li>
                    <h5 className="text-2xl font-semibold mb-2">Technology Leadership</h5>
                    <p className="text-gray-300">
                      • Only XSGD-native protocol with institutional-grade insurance backing
                      <br />• Tiered liquidity management with instant access to 12% of deposits
                    </p>
                  </li>
                  <li>
                    <h5 className="text-2xl font-semibold mb-2">Superior User Experience</h5>
                    <p className="text-gray-300">
                      • 3-4% SGD yields vs 2% money market funds and 1.8% T-bills
                      <br />• No lock-up periods for majority of users
                    </p>
                  </li>
                  <li>
                    <h5 className="text-2xl font-semibold mb-2">Regulatory Compliance & Trust</h5>
                    <p className="text-gray-300">
                      • MAS-compliant stablecoin (XSGD) as foundation
                      <br />• Base asset for tradeable endowments is unregulated by MAS
                    </p>
                  </li>
                  <li>
                    <h5 className="text-2xl font-semibold mb-2">Asset-Backed Stability</h5>
                    <p className="text-gray-300">
                      • Real insurance policies as backing vs purely crypto volatility
                      <br />• Scalable revenue model with increasing margins as AUM grows
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            {/* Business Model Sub-section */}
            <div className="mb-24">
              <h4 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-16">BUSINESS MODEL</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-800">
                      <th className="p-4 font-semibold text-gray-200">Revenue Stream</th>
                      <th className="p-4 font-semibold text-gray-200">Rate</th>
                      <th className="p-4 font-semibold text-gray-200">Year 1 (500K TVL)</th>
                      <th className="p-4 font-semibold text-gray-200">Year 3 (6M TVL)</th>
                      <th className="p-4 font-semibold text-gray-200">Year 5 (25M TVL)</th>
                      <th className="p-4 font-semibold text-gray-200">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="p-4">Yield Margin</td>
                      <td className="p-4">3.2%</td>
                      <td className="p-4">16 K</td>
                      <td className="p-4">192 K</td>
                      <td className="p-4">800 K</td>
                      <td className="p-4 text-gray-300">
                        Spread between policy yield and deposit APY paid to XSGD liquidity providers
                      </td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-4">Policy Discount</td>
                      <td className="p-4">0.8%</td>
                      <td className="p-4">4 K</td>
                      <td className="p-4">48 K</td>
                      <td className="p-4">200 K</td>
                      <td className="p-4 text-gray-300">
                        Interest paid by borrowers on XSGD loans, enhanced by rehypothecation
                      </td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-4">Withdrawal Fees</td>
                      <td className="p-4">0.5%</td>
                      <td className="p-4">2 K</td>
                      <td className="p-4">30 K</td>
                      <td className="p-4">125 K</td>
                      <td className="p-4 text-gray-300">Annual fee on total assets under management</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-4">Liquidity Premium</td>
                      <td className="p-4">0.3%</td>
                      <td className="p-4">1 K</td>
                      <td className="p-4">18 K</td>
                      <td className="p-4">75 K</td>
                      <td className="p-4 text-gray-300">
                        Fee on value of liquidated collateral when borrower is undercollateralized
                      </td>
                    </tr>
                    <tr className="bg-gray-800 font-semibold">
                      <td className="p-4">Total Revenue</td>
                      <td className="p-4"></td>
                      <td className="p-4">24 K</td>
                      <td className="p-4">288 K</td>
                      <td className="p-4">1.2 M</td>
                      <td className="p-4 text-gray-300">Combined revenue from all streams</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Financial Projections Sub-section */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h4 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">FINANCIAL PROJECTIONS</h4>
                <p className="text-lg text-gray-300 mb-6">
                  The XSGD lending protocol's financial projections highlight a strong growth trajectory, with revenue
                  and profitability scaling rapidly as assets under management expand.
                </p>
                <ul className="space-y-4 text-lg text-gray-300">
                  <li>
                    <span className="font-semibold text-white">Interest Paid to LPs (SGD)</span>
                  </li>
                  <li>
                    <span className="font-semibold text-white">Total Revenue (SGD)</span>
                  </li>
                  <li>
                    <span className="font-semibold text-white">Net Profit (SGD)</span>
                  </li>
                  <li>
                    <span className="font-semibold text-white">AUM Compound Annual Growth Rate (CAGR):</span> ~123%
                  </li>
                  <li>
                    <span className="font-semibold text-white">AUM Compound Annual Growth Rate (CAGR):</span> ~138%
                  </li>
                  <li>
                    <span className="font-semibold text-white">Breakeven:</span> Month 12 with ≤ S$1.5 M TVL.
                  </li>
                </ul>
              </div>
              <div className="relative h-96 w-full">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Financial Projections Graph"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-20 md:py-32 bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-16">MEET THE TEAM</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <Card className="bg-gray-800 border-gray-700 text-white p-6">
                <div className="flex flex-col items-center">
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    alt="Richard Lei"
                    width={200}
                    height={200}
                    className="rounded-full mb-4 object-cover w-48 h-48"
                  />
                  <h4 className="text-2xl font-semibold">RICHARD LEI</h4>
                  <p className="text-gray-300 mb-4">Chief Executive Officer</p>
                  <p className="text-sm text-gray-400 mb-4">
                    Richard is a visionary leader with extensive experience in fintech and blockchain, driving NIDUS's
                    strategic direction and market adoption.
                  </p>
                  <div className="flex space-x-4 text-gray-300">
                    <Link href="#" className="hover:text-white">
                      LinkedIn
                    </Link>
                    <Link href="#" className="hover:text-white">
                      GitHub
                    </Link>
                    <Link href="#" className="hover:text-white">
                      Website
                    </Link>
                  </div>
                </div>
              </Card>
              <Card className="bg-gray-800 border-gray-700 text-white p-6">
                <div className="flex flex-col items-center">
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    alt="Gabriel Ong"
                    width={200}
                    height={200}
                    className="rounded-full mb-4 object-cover w-48 h-48"
                  />
                  <h4 className="text-2xl font-semibold">GABRIEL ONG</h4>
                  <p className="text-gray-300 mb-4">Chief Technology Officer</p>
                  <p className="text-sm text-gray-400 mb-4">
                    Gabriel is a blockchain architect and smart contract expert, responsible for building the robust and
                    secure NIDUS protocol infrastructure.
                  </p>
                  <div className="flex space-x-4 text-gray-300">
                    <Link href="#" className="hover:text-white">
                      LinkedIn
                    </Link>
                    <Link href="#" className="hover:text-white">
                      GitHub
                    </Link>
                    <Link href="#" className="hover:text-white">
                      Website
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
            <p className="mt-16 text-lg text-gray-300">Thank you for your time! Reach out to us for questions.</p>
          </div>
        </section>

        {/* Join Section */}
        <section id="join" className="py-20 md:py-32 bg-gray-950 text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">Join the NIDUS Community</h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12">
              Indicate your interest to receive updates and early access to the NIDUS Protocol.
            </p>
            <JoinForm />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-gray-950 border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <h4 className="text-2xl font-bold tracking-tight text-white mb-4">Verus Co</h4>
          <p className="text-lg mb-2">THANK YOU for your time and attention</p>
          <p className="mb-1">Presented by Richard Lei</p>
          <p className="mb-1">
            <Link href="https://www.veritas.com" className="underline hover:text-white">
              www.veritas.com
            </Link>
          </p>
          <p className="mb-1">leirichard58@gmail.com</p>
          <p>+65 96476459</p>
        </div>
      </footer>
    </div>
  )
}