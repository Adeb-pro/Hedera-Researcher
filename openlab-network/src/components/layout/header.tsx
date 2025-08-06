"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Beaker, Menu, X, Wallet, ChevronDown, Zap } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useBlockchain } from "@/contexts/blockchain-context"
import Link from "next/link"
import Sidebar from "./sidebar"

const navigation = [
  { name: "Projects", href: "/projects", description: "Research Projects" },
  { name: "Researchers", href: "/researchers", description: "Global Network" },
  { name: "Funding", href: "/funding", description: "Investment Pools" },
  { name: "Publications", href: "/publications", description: "Research Papers" },
  { name: "Help", href: "/help", description: "Support Center" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isConnected, account, connect, isLoading } = useBlockchain()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleConnectWallet = async () => {
    await connect()
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-dark-900/95 backdrop-blur-xl border-b border-dark-700/50 shadow-2xl"
            : "bg-dark-900/80 backdrop-blur-md border-b border-dark-800/50"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
          <div className="flex items-center space-x-4">
            {/* Sidebar Toggle */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="text-dark-400 hover:text-dark-50 hover:bg-dark-800/50 rounded-xl"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </motion.div>

            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div className="relative" whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                <Beaker className="w-8 h-8 text-primary-500 group-hover:text-primary-400 transition-colors" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse" />
              </motion.div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
                  OpenLab Network
                </span>
                <div className="flex items-center space-x-2 mt-0.5">
                  <Badge
                    variant="secondary"
                    className="bg-primary-500/10 text-primary-400 border-primary-500/20 text-xs px-2 py-0"
                  >
                    <Zap className="w-2.5 h-2.5 mr-1" />
                    Beta
                  </Badge>
                </div>
              </div>
            </Link>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-dark-400 hover:text-dark-50 transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group relative px-3 py-2 rounded-lg transition-all duration-300 hover:bg-dark-800/50"
              >
                <span className="text-sm font-semibold text-dark-300 group-hover:text-accent-400 transition-colors">
                  {item.name}
                </span>
                <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-accent-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            {!isConnected ? (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleConnectWallet}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  {isLoading ? "Connecting..." : "Connect Wallet"}
                </Button>
              </motion.div>
            ) : (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  className="border-primary-500/30 text-primary-400 hover:bg-primary-500/10 bg-dark-800/50 backdrop-blur-sm rounded-xl"
                >
                  <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse" />
                  {formatAddress(account || "")}
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            )}
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-dark-900/98 backdrop-blur-xl px-6 py-6 sm:max-w-sm border-l border-dark-700/50">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                  <Beaker className="w-8 h-8 text-primary-500" />
                  <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                    OpenLab
                  </span>
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-dark-400 hover:text-dark-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-dark-700/50">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-xl px-3 py-3 text-base font-semibold text-dark-300 hover:bg-dark-800/50 hover:text-accent-400 transition-all duration-300"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div>{item.name}</div>
                        <div className="text-sm text-dark-400 font-normal">{item.description}</div>
                      </Link>
                    ))}
                  </div>
                  <div className="py-6">
                    {!isConnected ? (
                      <Button
                        onClick={handleConnectWallet}
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white rounded-xl"
                      >
                        <Wallet className="w-4 h-4 mr-2" />
                        {isLoading ? "Connecting..." : "Connect Wallet"}
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        className="w-full border-primary-500/30 text-primary-400 hover:bg-primary-500/10 bg-transparent rounded-xl"
                      >
                        <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse" />
                        {formatAddress(account || "")}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  )
}