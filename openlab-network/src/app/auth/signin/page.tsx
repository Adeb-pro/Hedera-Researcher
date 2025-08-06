"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { LogIn, ArrowLeft, Eye, EyeOff, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import ParticleBackground from "@/components/ui/particle-background"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Redirect to dashboard or handle authentication
    console.log("Sign in attempt:", formData)
    setLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-dark-50 flex items-center justify-center px-4">
      <ParticleBackground />

      <motion.div className="w-full max-w-md" initial="initial" animate="animate" variants={fadeInUp}>
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-accent-400 hover:text-accent-300 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <Card className="bg-dark-800/50 border-dark-700 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-dark-50">Welcome Back</CardTitle>
            <CardDescription className="text-dark-400">Sign in to your OpenLab Network account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Wallet Sign In Option */}
            <div className="space-y-4">
              <Link href="/connect">
                <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white">
                  <Wallet className="w-4 h-4 mr-2" />
                  Sign In with Wallet
                </Button>
              </Link>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-dark-600" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-dark-800 px-2 text-dark-400">Or continue with email</span>
                </div>
              </div>
            </div>

            {/* Email Sign In Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-dark-300">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="researcher@university.edu"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-dark-300">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500 pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-dark-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-dark-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="rounded border-dark-600 bg-dark-700 text-primary-600 focus:ring-primary-500"
                  />
                  <Label htmlFor="remember" className="text-sm text-dark-400">
                    Remember me
                  </Label>
                </div>
                <Link href="/auth/forgot-password" className="text-sm text-accent-400 hover:text-accent-300">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-dark-400 text-sm">
                Don't have an account?{" "}
                <Link href="/auth/signup" className="text-accent-400 hover:text-accent-300 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
