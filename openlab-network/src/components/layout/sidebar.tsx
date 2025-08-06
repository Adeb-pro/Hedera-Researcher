"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  User,
  Settings,
  LogIn,
  UserPlus,
  Wallet,
  LogOut,
  ChevronRight,
  Bell,
  HelpCircle,
  FileText,
  DollarSign,
  Users,
  Beaker,
  X,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { useBlockchain } from "@/contexts/blockchain-context"
import Link from "next/link"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Beaker,
    description: "Overview & Analytics",
    color: "text-primary-400",
  },
  {
    name: "Projects",
    href: "/projects",
    icon: FileText,
    description: "Research Projects",
    color: "text-secondary-400",
  },
  {
    name: "Researchers",
    href: "/researchers",
    icon: Users,
    description: "Global Network",
    color: "text-accent-400",
  },
  {
    name: "Funding",
    href: "/funding",
    icon: DollarSign,
    description: "Investment Pools",
    color: "text-success",
  },
  {
    name: "Publications",
    href: "/publications",
    icon: FileText,
    description: "Research Papers",
    color: "text-warning",
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: Bell,
    description: "Updates & Alerts",
    color: "text-purple-400",
  },
  {
    name: "Help Center",
    href: "/help",
    icon: HelpCircle,
    description: "Support & Docs",
    color: "text-pink-400",
  },
]

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { isConnected, account, connect, disconnect, isLoading, platformStats } = useBlockchain()

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const handleConnectWallet = async () => {
    await connect()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -400, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
              opacity: { duration: 0.2 },
            }}
            className="fixed left-0 top-0 h-full w-96 bg-gradient-to-b from-dark-900/98 via-dark-900/95 to-dark-800/98 backdrop-blur-xl border-r border-dark-700/50 z-50 overflow-y-auto shadow-2xl"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <motion.div
                  className="flex items-center space-x-3"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="relative">
                    <Beaker className="w-10 h-10 text-primary-500" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full animate-pulse" />
                  </div>
                  <div>
                    <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                      OpenLab
                    </span>
                    <p className="text-xs text-dark-400 font-mono">v2.0.1</p>
                  </div>
                </motion.div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-dark-400 hover:text-dark-50 hover:bg-dark-800/50 lg:hidden rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* User Profile Section */}
              <motion.div
                className="mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {isConnected ? (
                  <div className="relative bg-gradient-to-br from-dark-800/80 via-dark-800/60 to-dark-700/80 rounded-2xl p-6 border border-dark-600/50 backdrop-blur-sm overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5" />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary-500/10 to-transparent rounded-full blur-2xl" />

                    <div className="relative">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="relative">
                          <Avatar className="w-16 h-16 ring-2 ring-primary-500/30">
                            <AvatarImage src="/placeholder.svg?height=64&width=64" />
                            <AvatarFallback className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white text-lg font-bold">
                              {account?.slice(2, 4).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-dark-800 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-dark-50 mb-1">Dr. Researcher</h3>
                          <p className="text-sm text-dark-400 font-mono truncate">{formatAddress(account || "")}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="secondary" className="bg-success/10 text-success border-success/20 text-xs">
                              <Zap className="w-3 h-3 mr-1" />
                              Connected
                            </Badge>
                            <Badge variant="outline" className="border-primary-500/30 text-primary-400 text-xs">
                              <Star className="w-3 h-3 mr-1" />
                              850 Rep
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Reputation Progress */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-dark-300">Reputation Level</span>
                          <span className="text-sm text-primary-400 font-bold">Level 8</span>
                        </div>
                        <Progress value={75} className="h-2 bg-dark-700" />
                        <p className="text-xs text-dark-400 mt-1">150 points to next level</p>
                      </div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center">
                          <div className="text-lg font-bold text-primary-400">12</div>
                          <div className="text-xs text-dark-400">Projects</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-success">$24K</div>
                          <div className="text-xs text-dark-400">Funded</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-accent-400">89</div>
                          <div className="text-xs text-dark-400">Reviews</div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Link href="/profile" className="flex-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-dark-600/50 text-dark-300 hover:bg-dark-700/50 bg-transparent backdrop-blur-sm"
                          >
                            <User className="w-4 h-4 mr-2" />
                            Profile
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={disconnect}
                          className="border-red-500/30 text-red-400 hover:bg-red-500/10 bg-transparent backdrop-blur-sm"
                        >
                          <LogOut className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative bg-gradient-to-br from-dark-800/80 via-dark-800/60 to-dark-700/80 rounded-2xl p-6 border border-dark-600/50 backdrop-blur-sm overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 via-transparent to-primary-500/5" />

                    <div className="relative text-center mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-dark-700 to-dark-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-dark-600/50">
                        <User className="w-10 h-10 text-dark-400" />
                      </div>
                      <h3 className="text-xl font-bold text-dark-50 mb-2">Welcome to OpenLab</h3>
                      <p className="text-sm text-dark-400 leading-relaxed">
                        Connect your wallet to access the decentralized research network
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Button
                        onClick={handleConnectWallet}
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Wallet className="w-4 h-4 mr-2" />
                        {isLoading ? "Connecting..." : "Connect Wallet"}
                      </Button>

                      <div className="flex space-x-2">
                        <Link href="/auth/signin" className="flex-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-accent-500/30 text-accent-400 hover:bg-accent-500/10 bg-transparent backdrop-blur-sm"
                          >
                            <LogIn className="w-4 h-4 mr-2" />
                            Sign In
                          </Button>
                        </Link>
                        <Link href="/auth/signup" className="flex-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-secondary-500/30 text-secondary-400 hover:bg-secondary-500/10 bg-transparent backdrop-blur-sm"
                          >
                            <UserPlus className="w-4 h-4 mr-2" />
                            Sign Up
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>

              <Separator className="bg-gradient-to-r from-transparent via-dark-600 to-transparent mb-6" />

              {/* Platform Stats */}
              {platformStats && (
                <motion.div
                  className="mb-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="bg-gradient-to-br from-dark-800/60 to-dark-700/60 rounded-xl p-4 border border-dark-600/30 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-semibold text-dark-200">Platform Stats</h4>
                      <TrendingUp className="w-4 h-4 text-success" />
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div>
                        <div className="text-lg font-bold text-primary-400">{platformStats.totalProjects}</div>
                        <div className="text-xs text-dark-400">Projects</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-success">${platformStats.totalFunding}M</div>
                        <div className="text-xs text-dark-400">Funded</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation Menu */}
              <motion.nav
                className="space-y-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                  >
                    <Link href={item.href}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-dark-300 hover:text-dark-50 hover:bg-dark-800/50 rounded-xl p-4 h-auto group transition-all duration-300"
                        onClick={onClose}
                      >
                        <div
                          className={`w-10 h-10 rounded-lg bg-dark-700/50 flex items-center justify-center mr-4 group-hover:bg-dark-600/50 transition-colors`}
                        >
                          <item.icon className={`w-5 h-5 ${item.color}`} />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-dark-400 group-hover:text-dark-300 transition-colors">
                            {item.description}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      </Button>
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              <Separator className="bg-gradient-to-r from-transparent via-dark-600 to-transparent my-6" />

              {/* Settings */}
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }}>
                <Link href="/settings">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-dark-300 hover:text-dark-50 hover:bg-dark-800/50 rounded-xl p-4 h-auto group transition-all duration-300"
                    onClick={onClose}
                  >
                    <div className="w-10 h-10 rounded-lg bg-dark-700/50 flex items-center justify-center mr-4 group-hover:bg-dark-600/50 transition-colors">
                      <Settings className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium">Settings</div>
                      <div className="text-xs text-dark-400 group-hover:text-dark-300 transition-colors">
                        Preferences & Config
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}