"use client"

import React from "react"
import { Line } from "react-chartjs-2"
import { Chart, LineElement, PointElement, LinearScale, TimeScale, Tooltip, Legend, CategoryScale } from "chart.js"
import "chartjs-adapter-date-fns"

Chart.register(LineElement, PointElement, LinearScale, TimeScale, Tooltip, Legend, CategoryScale)

type ValueChartProps = {
  data: {
    poolValueHistory: { timestamp: number; value: number }[]
    dailyNewUsers: { timestamp: number; value: number }[]
    chartType: "pool" | "users"
  }
  onClick: () => void
}

export function ValueChart({ data, onClick }: ValueChartProps) {
  const chartData =
    data.chartType === "pool"
      ? {
          labels: data.poolValueHistory.map((d) => new Date(d.timestamp)),
          datasets: [
            {
              label: "Pool Value (XsGD)",
              data: data.poolValueHistory.map((d) => d.value),
              borderColor: "#a78bfa",
              backgroundColor: "rgba(167,139,250,0.2)",
              pointRadius: 2,
              tension: 0.3,
              fill: true,
            },
          ],
        }
      : {
          labels: data.dailyNewUsers.map((d) => new Date(d.timestamp)),
          datasets: [
            {
              label: "Daily New Users",
              data: data.dailyNewUsers.map((d) => d.value),
              borderColor: "#34d399",
              backgroundColor: "rgba(52,211,153,0.2)",
              pointRadius: 2,
              tension: 0.3,
              fill: true,
            },
          ],
        }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: "#cbd5e1", font: { size: 13 } },
        display: true,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        type: "time" as const,
        time: { unit: "month" as const, tooltipFormat: "PP" },
        grid: { color: "#334155" },
        ticks: { color: "#cbd5e1" },
      },
      y: {
        beginAtZero: true,
        grid: { color: "#334155" },
        ticks: { color: "#cbd5e1" },
      },
    },
  }

  return (
    <div
      className="flex-1 min-h-[280px] bg-slate-800/50 border border-slate-700 rounded-lg flex items-center justify-center cursor-pointer p-2"
      onClick={onClick}
      style={{ minWidth: 0 }}
    >
      <div className="w-full h-64">
        <Line data={chartData} options={options} />
      </div>
    </div>
  )
}