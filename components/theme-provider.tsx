"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

interface ExtendedThemeProviderProps extends ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "light", 
  enableSystem = true,
  disableTransitionOnChange = false,
  ...props
}: ExtendedThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
      themes={["light", "dark", "system"]}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

// Custom hook for theme utilities specific to Veritas Insurance
export function useVeritasTheme() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const isDarkMode = mounted && document.documentElement.classList.contains("dark")

  return {
    mounted,
    isDarkMode,
    // DeFi-specific theme utilities
    getStatusColor: (status: "positive" | "negative" | "neutral") => {
      switch (status) {
        case "positive":
          return isDarkMode ? "text-green-400" : "text-green-600"
        case "negative":
          return isDarkMode ? "text-red-400" : "text-red-600"
        case "neutral":
          return isDarkMode ? "text-slate-400" : "text-slate-600"
        default:
          return isDarkMode ? "text-white" : "text-black"
      }
    },
    getCardBackground: () => {
      return isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-white border-slate-200"
    },
    getGradientBackground: () => {
      return isDarkMode
        ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
        : "bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50"
    },
  }
}