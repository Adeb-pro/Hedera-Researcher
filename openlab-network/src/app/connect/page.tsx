"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Wallet, Shield, Zap, ArrowLeft, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import ParticleBackground from "@/components/ui/particle-background"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const wallets = [
  {
    id: "metamask",
    name: "MetaMask",
    description: "Connect using MetaMask browser extension",
    icon: "🦊",
    popular: true,
    supported: true,
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    description: "Connect with WalletConnect protocol",
    icon: "🔗",
    popular: true,
    supported: true,
  },
  {
    id: "hashpack",
    name: "HashPack",
    description: "Native Hedera wallet with full HBAR support",
    icon: "📦",
    popular: true,
    supported: true,
  },
]

export default function ConnectWallet() {
  const [connecting, setConnecting] = useState<string | null>(null)
  const [connected, setConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleConnect = async (walletId: string) => {
    setConnecting(walletId)
    setError(null)

    try {
      // Simulate wallet connection
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock connection logic - in real app, integrate with actual wallet SDKs
      if (walletId === "metamask") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (typeof window !== "undefined" && (window as Window & { ethereum?: { request: (params: any) => Promise<any> } }).ethereum) {
          // Real MetaMask connection would go here
          setConnected(true)
        } else {
          throw new Error("MetaMask not installed")
        }
      } else {
        // Mock successful connection for other wallets
        setConnected(true)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect wallet")
    } finally {
      setConnecting(null)
    }
  }

  if (connected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-dark-50 flex items-center justify-center px-4">
        <ParticleBackground />
        <motion.div
          className="max-w-md w-full text-center"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Wallet Connected!</h1>
            <p className="text-dark-400 mb-8">Your wallet has been successfully connected to OpenLab Network.</p>
            <div className="space-y-4">
              <Link href="/auth/signup">
                <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white">Complete Registration</Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="w-full border-accent-500 text-accent-400 hover:bg-accent-500/10 bg-transparent"
                >
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-dark-50">
      <ParticleBackground />

      <div className="container mx-auto px-4 py-8">
        <motion.div className="max-w-4xl mx-auto" initial="initial" animate="animate" variants={staggerContainer}>
          {/* Header */}
          <motion.div className="mb-8" variants={fadeInUp}>
            <Link href="/" className="inline-flex items-center text-accent-400 hover:text-accent-300 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Connect Your Wallet</h1>
            <p className="text-xl text-dark-400 max-w-2xl">
              Choose your preferred wallet to connect to OpenLab Network and start your research journey.
            </p>
          </motion.div>

          {/* Security Notice */}
          <motion.div variants={fadeInUp}>
            <Card className="bg-primary-500/10 border-primary-500/20 mb-8">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Shield className="w-6 h-6 text-primary-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-primary-300 mb-2">Secure Connection</h3>
                    <p className="text-dark-300 text-sm">
                      Your wallet connection is encrypted and secure. We never store your private keys or seed phrases.
                      Only connect wallets you trust and verify the URL before proceeding.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div variants={fadeInUp}>
              <Card className="bg-error/10 border-error/20 mb-8">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <AlertCircle className="w-6 h-6 text-error mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-error mb-2">Connection Failed</h3>
                      <p className="text-dark-300 text-sm">{error}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Wallet Options */}
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={staggerContainer}>
            {wallets.map((wallet) => (
              <motion.div key={wallet.id} variants={fadeInUp}>
                <Card
                  className={`bg-dark-800/50 border-dark-700 hover:bg-dark-800/70 transition-all duration-300 ${
                    !wallet.supported ? "opacity-50" : "hover:border-primary-500/30 cursor-pointer"
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{wallet.icon}</div>
                        <div>
                          <CardTitle className="text-lg text-dark-50 flex items-center gap-2">
                            {wallet.name}
                            {wallet.popular && (
                              <Badge className="bg-secondary-500/20 text-secondary-400 text-xs">Popular</Badge>
                            )}
                          </CardTitle>
                          <CardDescription className="text-dark-400 text-sm">{wallet.description}</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className={`w-full ${
                        wallet.supported
                          ? "bg-primary-600 hover:bg-primary-700 text-white"
                          : "bg-dark-700 text-dark-400 cursor-not-allowed"
                      }`}
                      onClick={() => wallet.supported && handleConnect(wallet.id)}
                      disabled={!wallet.supported || connecting === wallet.id}
                    >
                      {connecting === wallet.id ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Connecting...
                        </>
                      ) : wallet.supported ? (
                        <>
                          <Wallet className="w-4 h-4 mr-2" />
                          Connect {wallet.name}
                        </>
                      ) : (
                        "Coming Soon"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Features */}
          <motion.div className="mt-16" variants={fadeInUp}>
            <h2 className="text-2xl font-bold mb-8 text-center">Why Connect Your Wallet?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Instant Transactions</h3>
                <p className="text-dark-400 text-sm">
                  Fund research projects and receive payments instantly with low transaction fees.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-accent-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-accent-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Secure Identity</h3>
                <p className="text-dark-400 text-sm">
                  Your wallet serves as your secure digital identity on the platform.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Wallet className="w-6 h-6 text-success" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Full Control</h3>
                <p className="text-dark-400 text-sm">Maintain complete control over your funds and research data.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
