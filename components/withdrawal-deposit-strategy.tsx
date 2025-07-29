"use client"

import { useState, useEffect } from "react"
import { useAuth } from "./auth-provider"
import { ref, onValue, update } from "firebase/database"
import { database } from "./auth-provider"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/footer"
import { Overlay } from "@/components/overlay"
import { TabbedTables } from "@/components/tabbed-tables"
import { Modal } from "@/components/modal-component"

interface VaultDetails {
  id: string;
  name: string;
  apr: number;
  tvl: number;
  balance: number;
  points: number;
  leader: string;
  rewards: number;         // Assume available
  rewardsAvailable: number;// Assume available
  strategy: string;        // Assume available
  risk: string;            // Assume available
  ltv: number;             // Assume available
  minCollateral: number;   // Assume available
  liquidationPenalty: number;// Assume available
  borrowRate: number;      // Assume available
  snapshot?: number[];     // Make sure snapshot is optional
  // Add more fields as needed
}

// Helper for formatting
function fmt(val: number, decimals = 2) {
  return val !== undefined && val !== null
    ? val.toLocaleString(undefined, {minimumFractionDigits: decimals, maximumFractionDigits: decimals})
    : "-"
}

export function WithdrawalDepositStrategy({ vaultId }: { vaultId: string }) {
  const { user } = useAuth()
  const [vault, setVault] = useState<VaultDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [depositOpen, setDepositOpen] = useState(false)
  const [withdrawOpen, setWithdrawOpen] = useState(false)
  const [amount, setAmount] = useState("");  
  const [receiptOpen, setReceiptOpen] = useState(false); 
  const [txnDetails, setTxnDetails] = useState<{type: "deposit" | "withdraw", amount: number, balance: number} | null>(null);

  useEffect(() => {
    if (!vaultId) {
      console.error("vaultId is required");
      return;
    }
    if (!user) {
      console.warn("User not logged in. Cannot fetch vault data.");
      setVault(null);
      setLoading(false);
      return;
    }
    const vaultRef = ref(database, `users/${user.uid}/vaults/${vaultId}`);
    setLoading(true);
    const unsub = onValue(vaultRef, (snapshot) => {
      const data = snapshot.val();
      setVault(data || null);
      setLoading(false);
      console.log(`Loaded vault data for ${vaultId}:`, data);
    });
    return () => unsub();
  }, [vaultId, user]);  // include user in deps

  const [xsgdBalance, setXsgdBalance] = useState<number | null>(null);
  useEffect(() => {
    if (!user) {
      setXsgdBalance(null);
      return;
    }
    const xsgdRef = ref(database, `users/${user.uid}/portfolio/xsgd`);
    const unsub = onValue(xsgdRef, (snapshot) => {
      const balance = snapshot.val();
      setXsgdBalance(typeof balance === "number" ? balance : 0);
    });
    return () => unsub();
  }, [user]);

  // Confirm Deposit Logic
  const onConfirmDeposit = async () => {
    const depositAmount = parseFloat(amount);
    if (isNaN(depositAmount) || depositAmount <= 0) {
      alert("Please enter a valid deposit amount greater than zero.");
      return;
    }
    if (!user) return;

    try {
      // Update xsgd balance atomically: Here a simple update; for atomic transactions you might want runTransaction()
      const newBalance = (xsgdBalance || 0) + depositAmount;
      await update(ref(database, `users/${user.uid}/portfolio`), {
        xsgd: newBalance,
      });
      
      setTxnDetails({ type: "deposit", amount: depositAmount, balance: newBalance });
      setDepositOpen(false);
      setReceiptOpen(true);
      setAmount(""); // reset input
    } catch (error) {
      console.error("Deposit failed:", error);
      alert("Deposit failed. Please try again later.");
    }
  };

  // Confirm Withdraw Logic
  const onConfirmWithdraw = async () => {
    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      alert("Please enter a valid withdrawal amount greater than zero.");
      return;
    }
    if (!user) return;

    // Prevent withdrawing if balance insufficient
    if (!xsgdBalance || withdrawAmount > xsgdBalance) {
      alert("Insufficient balance to withdraw that amount.");
      return;
    }

    try {
      const newBalance = xsgdBalance - withdrawAmount;
      await update(ref(database, `users/${user.uid}/portfolio`), {
        xsgd: newBalance,
      });

      setTxnDetails({ type: "withdraw", amount: withdrawAmount, balance: newBalance });
      setWithdrawOpen(false);
      setReceiptOpen(true);
      setAmount(""); // reset input
    } catch (error) {
      console.error("Withdraw failed:", error);
      alert("Withdrawal failed. Please try again later.");
    }
  };

  // UI skeleton while loading
  if (loading) {
    return (
      <div className="w-full max-w-3xl mx-auto mt-10 p-8 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-900 rounded-2xl shadow-lg border border-slate-700 flex flex-col gap-6 animate-pulse text-white">
        {/* Loading message */}
        <div className="text-center text-lg font-semibold select-none">
          Loading...
        </div>
        <div className="flex flex-col gap-4">
          <div className="h-6 w-2/3 bg-slate-800 rounded"></div>
          <div className="grid grid-cols-2 gap-8">
            <div className="h-7 bg-slate-800 rounded w-full"></div>
            <div className="h-7 bg-slate-800 rounded w-full"></div>
          </div>
          <div className="h-10 bg-slate-800 rounded w-full my-2"></div>
          <div className="grid grid-cols-2 gap-4 my-4">
            <div className="h-6 bg-slate-800 rounded w-full"></div>
            <div className="h-6 bg-slate-800 rounded w-full"></div>
          </div>
        </div>
      </div>
    )
  }

  const showValues = !!user
  const getOrDash = (v: any, decimals = 2) => showValues && (v !== undefined && v !== null) ? fmt(v, decimals) : "-"
  const chartData = vault?.snapshot
    ? vault.snapshot.map((value, index) => ({
        name: `Day ${index + 1}`,
        value,
      }))
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Fixed Header always on top */}
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
              <Link href="/" className="text-slate-300 hover:text-purple-300 transition-colors">
                Dashboard
              </Link>
              <Link href="/vaults" className="text-white hover:text-purple-300 transition-colors">
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

      {/* Wider responsive card with two columns */}
      <div className="w-full max-w-5xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {!user && <Overlay>Please log in to view your vaults</Overlay>}
        <div className="p-8 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-900 rounded-2xl shadow-lg border border-slate-700 flex flex-col">

          {/* Performance Snapshot + Overlay */}
          <div className="mb-6 flex flex-col items-center justify-center">
            {vault?.snapshot && vault.snapshot.length > 0 && (
              <div className="w-full h-64 mb-6 md:mb-0">
                <h3 className="text-white mb-2 font-semibold text-center md:text-left">
                  Performance Snapshot
                </h3>
                <ResponsiveContainer width="100%" height="90%">
                  <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <XAxis dataKey="name" tick={{ fill: '#94a3b8' }} />
                    <YAxis tick={{ fill: '#94a3b8' }} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderRadius: '6px' }} />
                    <Line type="monotone" dataKey="value" stroke="#a78bfa" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">

          {/* Right column: Vault details and controls */}
       {/* Title and subtitle */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">{vault?.name ?? "-"}</h2>
            <div className="text-xs text-slate-400 mt-1">
              Strategy: <span className="font-semibold text-purple-300">{vault?.strategy || "-"}</span>
            </div>
          </div>
          {showValues && (
            <div className="flex flex-col items-end text-right text-slate-400 text-xs">
              Leader: <span className="font-mono text-sm text-slate-200">{vault?.leader ?? "-"}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-2 gap-5 mb-5">
        <div>
          <div className="text-xs text-slate-400 mb-0.5">Your Deposit</div>
          <div className="font-semibold text-lg text-white">
            {getOrDash(vault?.balance, 2)} {showValues && "USD"}
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-400 mb-0.5">Rewards</div>
          <div className="font-semibold text-lg text-white">
            {getOrDash(vault?.rewardsAvailable, 2)} {showValues && "USD"}
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-400 mb-0.5">APR</div>
          <div className="font-semibold text-lg text-green-400">
            {getOrDash(vault?.apr, 2)}%
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-400 mb-0.5">TVL</div>
          <div className="font-semibold text-lg text-white">
            {getOrDash(vault?.tvl, 2)} {showValues && "USD"}
          </div>
        </div>
      </div>

      {/* Strategy + Risk */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-slate-400 mb-0.5">Strategy</div>
          <div className="font-semibold text-slate-200">
            {showValues ? (vault?.strategy ?? "-") : "-"}
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-400 mb-0.5">Risk</div>
          <div className="font-semibold text-slate-200">
            {showValues ? (vault?.risk ?? "-") : "-"}
          </div>
        </div>
      </div>

      {/* LTV, Collateral, Penalty, Borrow Rate */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-7">
        <div>
          <div className="text-xs text-slate-400 mb-0.5">LTV</div>
          <div className="font-semibold text-slate-100">
            {getOrDash(vault?.ltv, 0)}%
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-400 mb-0.5">Min Collateral</div>
          <div className="font-semibold text-slate-100">
            {getOrDash(vault?.minCollateral, 2)}
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-400 mb-0.5">Penalty</div>
          <div className="font-semibold text-slate-100">
            {getOrDash(vault?.liquidationPenalty, 2)}%
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-400 mb-0.5">Borrow Rate</div>
          <div className="font-semibold text-slate-100">
            {getOrDash(vault?.borrowRate, 2)}%
          </div>
        </div>
      </div>

      {/* Deposit/Withdraw Buttons */}
      <div className="flex items-center justify-center gap-5 mt-6">
        {!user && (
          <button
            className="bg-purple-700 hover:bg-purple-600 text-white rounded-lg px-8 py-3 font-bold transition text-lg"
            disabled
          >
            Connect Wallet
          </button>
        )}

        {user && (
          <>
            <button
              className="bg-gradient-to-br from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white rounded-lg px-8 py-3 font-bold transition text-lg"
              onClick={() => setDepositOpen(true)}
            >
              Deposit
            </button>
            <button
              className="bg-gradient-to-br from-slate-800 to-slate-700 hover:from-purple-700 hover:to-slate-900 text-white rounded-lg px-8 py-3 font-bold transition text-lg border border-purple-400"
              onClick={() => setWithdrawOpen(true)}
            >
              Withdraw
            </button>
          </>
        )}
      </div>

      {/* ===== END existing vault details and controls ===== */}

    </div>

  </div> 
  <div>
    <TabbedTables vaultId={vaultId} user={user} />
  </div>
      {/* Deposit Modal */}
      <Modal open={depositOpen} onClose={() => {setDepositOpen(false); setAmount("")}}>
        <h3 className="text-lg font-bold mb-2 text-white">Deposit</h3>
        <div className="mb-3 text-slate-200">
          Deposit to <span className="font-mono">{vault?.name}</span>
        </div>
        <input
          type="number"
          min={0}
          step="any"
          placeholder="Amount"
          className="w-full mb-3 px-3 py-2 rounded border bg-slate-800 text-white"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="flex justify-end gap-4">
          <button
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
            onClick={() => { setDepositOpen(false); setAmount(""); }}
          >
            Cancel
          </button>
          <button
            className="bg-purple-700 text-white px-6 py-2 rounded hover:bg-purple-800"
            onClick={onConfirmDeposit}
          >
            Confirm
          </button>
        </div>
      </Modal>

      {/* Withdraw Modal */}
      <Modal open={withdrawOpen} onClose={() => {setWithdrawOpen(false); setAmount("")}}>
        <h3 className="text-lg font-bold mb-2 text-white">Withdraw</h3>
        <div className="mb-3 text-slate-200">
          Withdraw from <span className="font-mono">{vault?.name}</span>
        </div>
        <input
          type="number"
          min={0}
          step="any"
          placeholder="Amount"
          className="w-full mb-3 px-3 py-2 rounded border bg-slate-800 text-white"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="flex justify-end gap-4">
          <button
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
            onClick={() => { setWithdrawOpen(false); setAmount(""); }}
          >
            Cancel
          </button>
          <button
            className="bg-purple-700 text-white px-6 py-2 rounded hover:bg-purple-800"
            onClick={onConfirmWithdraw}
            disabled={!xsgdBalance || parseFloat(amount) <= 0 || parseFloat(amount) > xsgdBalance}
            title={(!xsgdBalance || parseFloat(amount) > xsgdBalance) ? "Insufficient balance" : ""}
          >
            Confirm
          </button>
        </div>
      </Modal>

      {/* Transaction Receipt Modal */}
      <Modal open={receiptOpen} onClose={() => setReceiptOpen(false)}>
        {txnDetails && (
          <div className="text-white space-y-3">
            <h3 className="text-lg font-bold">
              Transaction Receipt
            </h3>
            <div>
              <strong>Type: </strong>
              {txnDetails.type === "deposit" ? "Deposit" : "Withdraw"}
            </div>
            <div>
              <strong>Amount: </strong>
              {fmt(txnDetails.amount)} xsgd
            </div>
            <div>
              <strong>New Balance: </strong>
              {fmt(txnDetails.balance)} xsgd
            </div>
            <button
              className="mt-4 bg-purple-700 text-white px-6 py-2 rounded hover:bg-purple-800"
              onClick={() => setReceiptOpen(false)}
            >
              Close
            </button>
          </div>
        )}
      </Modal>
      </div>
      <Footer />
    </div>
  )
}