"use client"

import React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { LogIn, ArrowLeft, Eye, EyeOff, Wallet } from "lucide-react"
import Link from "next/link"

// Enhanced UI Components with better styling and accessibility
const Button = ({ 
  children, 
  className = "", 
  disabled = false, 
  type = "button",
  onClick,
  variant = "primary",
  size = "md",
  ...props 
}: {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  type?: "button" | "submit"
  onClick?: () => void
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500",
    outline: "border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white hover:bg-gray-700 focus:ring-gray-500"
  }
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-xl shadow-2xl border ${className}`}>{children}</div>
)

const CardHeader = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`px-6 py-6 ${className}`}>{children}</div>
)

const CardTitle = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h2 className={`text-2xl font-bold tracking-tight ${className}`}>{children}</h2>
)

const CardDescription = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-sm mt-2 ${className}`}>{children}</p>
)

const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`px-6 pb-6 ${className}`}>{children}</div>
)

const Input = ({ 
  className = "", 
  type = "text",
  error = false,
  ...props 
}: React.InputHTMLAttributes<HTMLInputElement> & { 
  className?: string
  error?: boolean
}) => {
  const baseClasses = "w-full px-3 py-2.5 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900"
  const errorClasses = error ? "border-red-500 focus:ring-red-500" : ""
  
  return (
    <input
      type={type}
      className={`${baseClasses} ${errorClasses} ${className}`}
      {...props}
    />
  )
}

const Label = ({ 
  children, 
  className = "", 
  htmlFor,
  required = false
}: { 
  children: React.ReactNode
  className?: string
  htmlFor?: string
  required?: boolean
}) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium ${className}`}>
    {children}
    {required && <span className="text-red-400 ml-1">*</span>}
  </label>
)

// Enhanced ParticleBackground with animated particles
const ParticleBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20" />
      
      {/* Animated Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
    </div>
  )
}

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.4 },
}

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({})
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  })

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    
    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate random success/failure for demo
          if (Math.random() > 0.3) {
            resolve("success")
          } else {
            reject(new Error("Invalid credentials"))
          }
        }, 2000)
      })

      // Success - redirect to dashboard
      console.log("Sign in successful:", formData)
      // window.location.href = "/dashboard"
      
      setErrors({ general: "Invalid email or password. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Clear field-specific error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleWalletConnect = () => {
    // Placeholder for wallet connection logic
    console.log("Connecting wallet...")
    // This would typically open a wallet selection modal
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-50 flex items-center justify-center px-4 py-8">
      <ParticleBackground />

      <motion.div 
        className="w-full max-w-md" 
        initial="initial" 
        animate="animate" 
        variants={staggerChildren}
      >
        {/* Back Navigation */}
        <motion.div className="mb-8" variants={fadeIn}>
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </motion.div>

        {/* Main Card */}
        <motion.div variants={fadeInUp}>
          <Card className="bg-gray-800/80 border-gray-700 backdrop-blur-xl shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-50 mb-2">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-gray-400 text-base">
                Sign in to your OpenLab Network account
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Error Message */}
              {errors.general && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm"
                >
                  {errors.general}
                </motion.div>
              )}

              {/* Wallet Sign In Option */}
              <div className="space-y-4">
                <Button
                  onClick={handleWalletConnect}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                  size="lg"
                >
                  <Wallet className="w-5 h-5 mr-3" />
                  Sign In with Wallet
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-600" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-gray-800 px-3 text-gray-400 font-medium">
                      Or continue with email
                    </span>
                  </div>
                </div>
              </div>

              {/* Email Sign In Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300" required>
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="researcher@university.edu"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={!!errors.email}
                    className="bg-gray-700/50 border-gray-600 text-gray-50 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300" required>
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
                      error={!!errors.password}
                      className="bg-gray-700/50 border-gray-600 text-gray-50 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 pr-12"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <input
                      id="remember"
                      name="remember"
                      type="checkbox"
                      checked={formData.remember}
                      onChange={handleInputChange}
                      className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800"
                    />
                    <Label htmlFor="remember" className="text-sm text-gray-400">
                      Remember me for 30 days
                    </Label>
                  </div>
                  <Link 
                    href="/auth/forgot-password" 
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                  disabled={loading}
                  size="lg"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5 mr-3" />
                      Sign In
                    </>
                  )}
                </Button>
              </form>

              {/* Sign Up Link */}
              <div className="text-center pt-4 border-t border-gray-700">
                <p className="text-gray-400 text-sm">
                  Don&apos;t have an account?{" "}
                  <Link 
                    href="/auth/signup" 
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors hover:underline"
                  >
                    Create one now
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Additional Features */}
        <motion.div 
          className="mt-8 text-center text-gray-500 text-sm"
          variants={fadeIn}
        >
          <p>Secure authentication powered by Hedera Hashgraph</p>
        </motion.div>
      </motion.div>
    </div>
  )
}