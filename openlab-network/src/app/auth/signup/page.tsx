"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { UserPlus, ArrowLeft, Eye, EyeOff, Wallet, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import ParticleBackground from "@/components/ui/particle-background"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const researchFields = [
  "Biology & Life Sciences",
  "Chemistry",
  "Physics",
  "Medicine & Health Sciences",
  "Computer Science",
  "Engineering",
  "Environmental Science",
  "Materials Science",
  "Mathematics",
  "Psychology",
  "Other",
]

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    institution: "",
    researchField: "",
    bio: "",
    orcid: "",
    agreeToTerms: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (step < 3) {
      setStep(step + 1)
    } else {
      // Complete registration
      console.log("Registration complete:", formData)
    }

    setLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-dark-300">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-dark-300">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
                  required
                />
              </div>
            </div>

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
                  placeholder="Create a strong password"
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-dark-300">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500 pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-dark-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-dark-400" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="institution" className="text-dark-300">
                Institution
              </Label>
              <Input
                id="institution"
                name="institution"
                placeholder="University of Science"
                value={formData.institution}
                onChange={handleInputChange}
                className="bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="researchField" className="text-dark-300">
                Research Field
              </Label>
              <Select onValueChange={(value) => handleSelectChange("researchField", value)}>
                <SelectTrigger className="bg-dark-700 border-dark-600 text-dark-50">
                  <SelectValue placeholder="Select your primary research field" />
                </SelectTrigger>
                <SelectContent className="bg-dark-700 border-dark-600">
                  {researchFields.map((field) => (
                    <SelectItem key={field} value={field} className="text-dark-50 focus:bg-dark-600">
                      {field}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="orcid" className="text-dark-300">
                ORCID ID (Optional)
              </Label>
              <Input
                id="orcid"
                name="orcid"
                placeholder="0000-0000-0000-0000"
                value={formData.orcid}
                onChange={handleInputChange}
                className="bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-dark-300">
                Bio
              </Label>
              <Textarea
                id="bio"
                name="bio"
                placeholder="Tell us about your research interests and background..."
                value={formData.bio}
                onChange={handleInputChange}
                className="bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500 min-h-[100px]"
                rows={4}
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6 text-center">
            <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Registration Complete!</h3>
              <p className="text-dark-400">
                Welcome to OpenLab Network, {formData.firstName}! Your account has been created successfully.
              </p>
            </div>
            <div className="space-y-4">
              <Link href="/connect">
                <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white">
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Your Wallet
                </Button>
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
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-dark-50 flex items-center justify-center px-4 py-8">
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
            <CardTitle className="text-2xl font-bold text-dark-50">
              {step === 3 ? "Welcome!" : "Join OpenLab Network"}
            </CardTitle>
            <CardDescription className="text-dark-400">
              {step === 1 && "Create your researcher account"}
              {step === 2 && "Tell us about your research"}
              {step === 3 && "Your account is ready!"}
            </CardDescription>
            {step < 3 && (
              <div className="flex justify-center mt-4">
                <div className="flex space-x-2">
                  {[1, 2].map((i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${i <= step ? "bg-primary-500" : "bg-dark-600"}`} />
                  ))}
                </div>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {step < 3 ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {renderStep()}

                {step < 3 && (
                  <div className="flex items-center space-x-2">
                    <input
                      id="agreeToTerms"
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={(e) => setFormData((prev) => ({ ...prev, agreeToTerms: e.target.checked }))}
                      className="rounded border-dark-600 bg-dark-700 text-primary-600 focus:ring-primary-500"
                      required
                    />
                    <Label htmlFor="agreeToTerms" className="text-sm text-dark-400">
                      I agree to the{" "}
                      <Link href="/terms" className="text-accent-400 hover:text-accent-300">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-accent-400 hover:text-accent-300">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      {step === 1 ? "Creating Account..." : "Saving..."}
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" />
                      {step === 1 ? "Continue" : "Complete Registration"}
                    </>
                  )}
                </Button>

                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-dark-600 text-dark-400 hover:bg-dark-700 bg-transparent"
                    onClick={() => setStep(step - 1)}
                  >
                    Back
                  </Button>
                )}
              </form>
            ) : (
              renderStep()
            )}

            {step === 1 && (
              <div className="mt-6 text-center">
                <p className="text-dark-400 text-sm">
                  Already have an account?{" "}
                  <Link href="/auth/signin" className="text-accent-400 hover:text-accent-300 font-medium">
                    Sign in
                  </Link>
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
