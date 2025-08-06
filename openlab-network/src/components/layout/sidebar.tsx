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
  ChevronLeft,
  
} from "lucide-react"
import { Button } from "../../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useBlockchain } from "@/contexts/blockchain-context"
import { useState } from "react"
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
    color: "text-blue-400",
  },
  {
    name: "Projects",
    href: "/projects",
    icon: FileText,
    description: "Research Projects",
    color: "text-emerald-400",
  },
  {
    name: "Researchers",
    href: "/researchers",
    icon: Users,
    description: "Global Network",
    color: "text-violet-400",
  },
  {
    name: "Funding",
    href: "/funding",
    icon: DollarSign,
    description: "Investment Pools",
    color: "text-green-400",
  },
  {
    name: "Publications",
    href: "/publications",
    icon: FileText,
    description: "Research Papers",
    color: "text-orange-400",
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: Bell,
    description: "Updates & Alerts",
    color: "text-purple-400",
    badge: 3,
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
  const [isCollapsed, setIsCollapsed] = useState(false)

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const handleConnectWallet = async () => {
    await connect()
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - only on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: -400, opacity: 0 }}
            animate={{ 
              x: 0, 
              opacity: 1,
              width: isCollapsed ? 80 : 320
            }}
            exit={{ x: -400, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
              opacity: { duration: 0.2 },
              width: { duration: 0.3, ease: "easeInOut" }
            }}
            className="fixed left-0 top-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-50 overflow-hidden shadow-xl"
          >
            <div className="h-full flex flex-col">
              {/* Header with Close Button */}
              <div className={`flex items-center justify-between ${isCollapsed ? 'px-3 py-4' : 'px-6 py-4'} border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50`}>
                {!isCollapsed && (
                  <motion.div
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                        <Beaker className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <span className="text-xl font-bold text-gray-900 dark:text-white">
                        OpenLab
                      </span>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">v2.0.1</p>
                    </div>
                  </motion.div>
                )}

                <div className="flex items-center space-x-2">
                  {/* Collapse Toggle - Desktop */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleCollapse}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg hidden lg:flex w-8 h-8 p-0"
                  >
                    {isCollapsed ? (
                      <ChevronRight className="w-4 h-4" />
                    ) : (
                      <ChevronLeft className="w-4 h-4" />
                    )}
                  </Button>

                  {/* Close Button - Always Visible */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg w-8 h-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                <div className={`${isCollapsed ? 'px-3 py-4' : 'px-6 py-6'}`}>
                  {/* User Profile Section */}
                  <motion.div
                    className="mb-6"
                    layout
                    transition={{ duration: 0.3 }}
                  >
                    {isConnected ? (
                      <div className={`bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden ${
                        isCollapsed ? 'p-3' : 'p-5'
                      }`}>
                        <div className={`flex items-center ${isCollapsed ? 'justify-center mb-3' : 'space-x-3 mb-4'}`}>
                          <div className="relative">
                            <Avatar className={`ring-2 ring-blue-500/30 ${isCollapsed ? 'w-10 h-10' : 'w-12 h-12'}`}>
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold">
                                {account?.slice(2, 4).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className={`absolute -bottom-1 -right-1 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 ${
                              isCollapsed ? 'w-4 h-4' : 'w-5 h-5'
                            }`}>
                            </div>
                          </div>
                          
                          {!isCollapsed && (
                            <motion.div 
                              className="flex-1 min-w-0"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Dr. Researcher</h3>
                              <p className="text-xs text-gray-500 dark:text-gray-400 font-mono truncate">{formatAddress(account || "")}</p>
                              <div className="flex items-center space-x-2 mt-2">
                                <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800 text-xs px-2 py-0.5">
                                  <Zap className="w-2.5 h-2.5 mr-1" />
                                  Online
                                </Badge>
                                <Badge variant="outline" className="border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs px-2 py-0.5">
                                  <Star className="w-2.5 h-2.5 mr-1" />
                                  850
                                </Badge>
                              </div>
                            </motion.div>
                          )}
                        </div>

                        {!isCollapsed && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-3"
                          >
                            {/* Quick Stats */}
                            <div className="grid grid-cols-3 gap-3 text-center">
                              <div>
                                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">12</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Projects</div>
                              </div>
                              <div>
                                <div className="text-lg font-bold text-green-600 dark:text-green-400">$24K</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Funded</div>
                              </div>
                              <div>
                                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">89</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Reviews</div>
                              </div>
                            </div>

                            <div className="flex space-x-2">
                              <Link href="/profile" className="flex-1">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full text-xs h-8"
                                >
                                  <User className="w-3 h-3 mr-1.5" />
                                  Profile
                                </Button>
                              </Link>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={disconnect}
                                className="border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 px-2 h-8"
                              >
                                <LogOut className="w-3 h-3" />
                              </Button>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    ) : (
                      <div className={`bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden ${
                        isCollapsed ? 'p-3' : 'p-5'
                      }`}>
                        <div className="text-center">
                          <div className={`bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center mx-auto mb-3 ${
                            isCollapsed ? 'w-10 h-10' : 'w-16 h-16'
                          }`}>
                            <User className={`text-gray-500 dark:text-gray-400 ${isCollapsed ? 'w-5 h-5' : 'w-8 h-8'}`} />
                          </div>
                          
                          {!isCollapsed && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="space-y-3"
                            >
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Welcome</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Connect to access the research network
                                </p>
                              </div>

                              <Button
                                onClick={handleConnectWallet}
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white h-10"
                              >
                                <Wallet className="w-4 h-4 mr-2" />
                                {isLoading ? "Connecting..." : "Connect Wallet"}
                              </Button>

                              <div className="flex space-x-2">
                                <Link href="/auth/signin" className="flex-1">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full text-xs h-8"
                                  >
                                    <LogIn className="w-3 h-3 mr-1.5" />
                                    Sign In
                                  </Button>
                                </Link>
                                <Link href="/auth/signup" className="flex-1">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full text-xs h-8"
                                  >
                                    <UserPlus className="w-3 h-3 mr-1.5" />
                                    Sign Up
                                  </Button>
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>

                  {/* Separator */}
                  {!isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="mb-6"
                    >
                      <Separator className="bg-gray-200 dark:bg-gray-700" />
                    </motion.div>
                  )}

                  {/* Platform Stats */}
                  {!isCollapsed && platformStats && (
                    <motion.div
                      className="mb-6"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Platform Stats</h4>
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-center">
                          <div>
                            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{platformStats.totalProjects}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Projects</div>
                          </div>
                          <div>
                            <div className="text-xl font-bold text-green-600 dark:text-green-400">${platformStats.totalFunding}M</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Funded</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Navigation Menu */}
                  <nav className="space-y-2">
                    {menuItems.map((item) => (
                      <motion.div
                        key={item.name}
                        layout
                        transition={{ duration: 0.2 }}
                      >
                        <Link href={item.href}>
                          <Button
                            variant="ghost"
                            className={`w-full justify-start text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg group transition-all duration-200 relative ${
                              isCollapsed ? 'px-2 py-2 h-10' : 'px-3 py-2.5 h-auto'
                            }`}
                            onClick={onClose}
                          >
                            <div
                              className={`rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors ${
                                isCollapsed ? 'w-6 h-6 mr-0' : 'w-8 h-8 mr-3'
                              }`}
                            >
                              <item.icon className={`${item.color} ${isCollapsed ? 'w-4 h-4' : 'w-4 h-4'}`} />
                            </div>
                            
                            {!isCollapsed && (
                              <motion.div 
                                className="flex-1 text-left"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              >
                                <div className="font-medium text-sm flex items-center">
                                  {item.name}
                                  {item.badge && (
                                    <Badge className="ml-2 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800 text-xs px-1.5 py-0">
                                      {item.badge}
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                                  {item.description}
                                </div>
                              </motion.div>
                            )}
                            
                            {!isCollapsed && (
                              <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200 text-gray-400" />
                            )}

                            {/* Tooltip for collapsed state */}
                            {isCollapsed && (
                              <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                                {item.name}
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 dark:bg-gray-100 rotate-45" />
                              </div>
                            )}
                          </Button>
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  {/* Separator */}
                  {!isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="my-6"
                    >
                      <Separator className="bg-gray-200 dark:bg-gray-700" />
                    </motion.div>
                  )}

                  {/* Settings */}
                  <motion.div layout transition={{ duration: 0.2 }}>
                    <Link href="/settings">
                      <Button
                        variant="ghost"
                        className={`w-full justify-start text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg group transition-all duration-200 relative ${
                          isCollapsed ? 'px-2 py-2 h-10' : 'px-3 py-2.5 h-auto'
                        }`}
                        onClick={onClose}
                      >
                        <div className={`rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors ${
                          isCollapsed ? 'w-6 h-6 mr-0' : 'w-8 h-8 mr-3'
                        }`}>
                          <Settings className={`text-gray-500 dark:text-gray-400 ${isCollapsed ? 'w-4 h-4' : 'w-4 h-4'}`} />
                        </div>
                        
                        {!isCollapsed && (
                          <motion.div 
                            className="flex-1 text-left"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <div className="font-medium text-sm">Settings</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                              Preferences & Config
                            </div>
                          </motion.div>
                        )}
                        
                        {!isCollapsed && (
                          <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200 text-gray-400" />
                        )}

                        {/* Tooltip for collapsed state */}
                        {isCollapsed && (
                          <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                            Settings
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 dark:bg-gray-100 rotate-45" />
                          </div>
                        )}
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}