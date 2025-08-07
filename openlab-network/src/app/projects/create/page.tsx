"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Plus, X, DollarSign, Target, FileText, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

const categories = [
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

const durations = [
  { value: "6", label: "6 months" },
  { value: "12", label: "1 year" },
  { value: "18", label: "18 months" },
  { value: "24", label: "2 years" },
  { value: "36", label: "3 years" },
  { value: "48", label: "4 years" },
  { value: "60", label: "5+ years" },
]

export default function CreateProject() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: [] as string[],
    fundingGoal: "",
    duration: "",
    location: "",
    objectives: [""],
    milestones: [{ title: "", description: "", funding: "", dueDate: "" }],
    teamMembers: [{ name: "", role: "", email: "", institution: "" }],
    expectedImpact: "",
    ethicsApproval: false,
    previousWork: "",
    references: "",
  })
  const [newTag, setNewTag] = useState("")
  const [loading, setLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const addObjective = () => {
    setFormData((prev) => ({
      ...prev,
      objectives: [...prev.objectives, ""],
    }))
  }

  const updateObjective = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      objectives: prev.objectives.map((obj, i) => (i === index ? value : obj)),
    }))
  }

  const removeObjective = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      objectives: prev.objectives.filter((_, i) => i !== index),
    }))
  }

  const addMilestone = () => {
    setFormData((prev) => ({
      ...prev,
      milestones: [...prev.milestones, { title: "", description: "", funding: "", dueDate: "" }],
    }))
  }

  const updateMilestone = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      milestones: prev.milestones.map((milestone, i) => (i === index ? { ...milestone, [field]: value } : milestone)),
    }))
  }

  const removeMilestone = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index),
    }))
  }

  const addTeamMember = () => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: [...prev.teamMembers, { name: "", role: "", email: "", institution: "" }],
    }))
  }

  const updateTeamMember = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.map((member, i) => (i === index ? { ...member, [field]: value } : member)),
    }))
  }

  const removeTeamMember = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("Project created:", formData)
    setLoading(false)
    // Redirect to project page
  }

  const steps = [
    { id: 1, title: "Basic Information", description: "Project title, description, and category" },
    { id: 2, title: "Funding & Timeline", description: "Budget, duration, and milestones" },
    { id: 3, title: "Team & Objectives", description: "Research team and project goals" },
    { id: 4, title: "Review & Submit", description: "Review your project before submission" },
  ]

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-dark-300">
                Project Title *
              </Label>
              <Input
                id="title"
                placeholder="Enter a compelling project title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-dark-300">
                Project Description *
              </Label>
              <Textarea
                id="description"
                placeholder="Provide a detailed description of your research project, its significance, and potential impact..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500 min-h-[120px]"
                rows={6}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-dark-300">
                Research Category *
              </Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger className="bg-dark-700 border-dark-600 text-dark-50">
                  <SelectValue placeholder="Select your research category" />
                </SelectTrigger>
                <SelectContent className="bg-dark-700 border-dark-600">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category} className="text-dark-50 focus:bg-dark-600">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-dark-300">Research Tags</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a tag (e.g., CRISPR, AI, Sustainability)"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  className="bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
                />
                <Button type="button" onClick={addTag} className="bg-primary-600 hover:bg-primary-700 text-white">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} className="bg-accent-500/20 text-accent-300 border-accent-500/30 pr-1">
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)} className="ml-2 hover:text-accent-200">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-dark-300">
                Research Location
              </Label>
              <Input
                id="location"
                placeholder="e.g., Stanford University, CA"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fundingGoal" className="text-dark-300">
                  Funding Goal (USD) *
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 w-4 h-4" />
                  <Input
                    id="fundingGoal"
                    type="number"
                    placeholder="50000"
                    value={formData.fundingGoal}
                    onChange={(e) => handleInputChange("fundingGoal", e.target.value)}
                    className="pl-10 bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration" className="text-dark-300">
                  Project Duration *
                </Label>
                <Select value={formData.duration} onValueChange={(value) => handleInputChange("duration", value)}>
                  <SelectTrigger className="bg-dark-700 border-dark-600 text-dark-50">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-700 border-dark-600">
                    {durations.map((duration) => (
                      <SelectItem
                        key={duration.value}
                        value={duration.value}
                        className="text-dark-50 focus:bg-dark-600"
                      >
                        {duration.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-dark-300">Project Milestones *</Label>
                <Button
                  type="button"
                  onClick={addMilestone}
                  variant="outline"
                  size="sm"
                  className="border-primary-500 text-primary-400 hover:bg-primary-500/10 bg-transparent"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Milestone
                </Button>
              </div>

              {formData.milestones.map((milestone, index) => (
                <Card key={index} className="bg-dark-700/30 border-dark-600">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="text-sm font-medium text-dark-300">Milestone {index + 1}</h4>
                      {formData.milestones.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => removeMilestone(index)}
                          variant="ghost"
                          size="sm"
                          className="text-error hover:text-error hover:bg-error/10"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-dark-400 text-sm">Title</Label>
                        <Input
                          placeholder="Milestone title"
                          value={milestone.title}
                          onChange={(e) => updateMilestone(index, "title", e.target.value)}
                          className="bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-dark-400 text-sm">Due Date</Label>
                        <Input
                          type="date"
                          value={milestone.dueDate}
                          onChange={(e) => updateMilestone(index, "dueDate", e.target.value)}
                          className="bg-dark-700 border-dark-600 text-dark-50 focus:border-primary-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-dark-400 text-sm">Funding Amount ($)</Label>
                        <Input
                          type="number"
                          placeholder="10000"
                          value={milestone.funding}
                          onChange={(e) => updateMilestone(index, "funding", e.target.value)}
                          className="bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-1">
                        <Label className="text-dark-400 text-sm">Description</Label>
                        <Textarea
                          placeholder="Describe this milestone..."
                          value={milestone.description}
                          onChange={(e) => updateMilestone(index, "description", e.target.value)}
                          className="bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
                          rows={2}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-dark-300">Research Objectives *</Label>
                <Button
                  type="button"
                  onClick={addObjective}
                  variant="outline"
                  size="sm"
                  className="border-primary-500 text-primary-400 hover:bg-primary-500/10 bg-transparent"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Objective
                </Button>
              </div>

              {formData.objectives.map((objective, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      placeholder={`Research objective ${index + 1}`}
                      value={objective}
                      onChange={(e) => updateObjective(index, e.target.value)}
                      className="bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
                    />
                  </div>
                  {formData.objectives.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => removeObjective(index)}
                      variant="outline"
                      size="sm"
                      className="border-error text-error hover:bg-error/10 bg-transparent"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-dark-300">Research Team</Label>
                <Button
                  type="button"
                  onClick={addTeamMember}
                  variant="outline"
                  size="sm"
                  className="border-primary-500 text-primary-400 hover:bg-primary-500/10 bg-transparent"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Team Member
                </Button>
              </div>

              {formData.teamMembers.map((member, index) => (
                <Card key={index} className="bg-dark-700/30 border-dark-600">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="text-sm font-medium text-dark-300">Team Member {index + 1}</h4>
                      {formData.teamMembers.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => removeTeamMember(index)}
                          variant="ghost"
                          size="sm"
                          className="text-error hover:text-error hover:bg-error/10"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-dark-400 text-sm">Full Name</Label>
                        <Input
                          placeholder="Dr. John Smith"
                          value={member.name}
                          onChange={(e) => updateTeamMember(index, "name", e.target.value)}
                          className="bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-dark-400 text-sm">Role</Label>
                        <Input
                          placeholder="Principal Investigator"
                          value={member.role}
                          onChange={(e) => updateTeamMember(index, "role", e.target.value)}
                          className="bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-dark-400 text-sm">Email</Label>
                        <Input
                          type="email"
                          placeholder="john.smith@university.edu"
                          value={member.email}
                          onChange={(e) => updateTeamMember(index, "email", e.target.value)}
                          className="bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-dark-400 text-sm">Institution</Label>
                        <Input
                          placeholder="Stanford University"
                          value={member.institution}
                          onChange={(e) => updateTeamMember(index, "institution", e.target.value)}
                          className="bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="expectedImpact" className="text-dark-300">
                Expected Impact *
              </Label>
              <Textarea
                id="expectedImpact"
                placeholder="Describe the potential impact of your research on the scientific community and society..."
                value={formData.expectedImpact}
                onChange={(e) => handleInputChange("expectedImpact", e.target.value)}
                className="bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500 min-h-[100px]"
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="previousWork" className="text-dark-300">
                Previous Work & Publications
              </Label>
              <Textarea
                id="previousWork"
                placeholder="List relevant previous work, publications, or preliminary results..."
                value={formData.previousWork}
                onChange={(e) => handleInputChange("previousWork", e.target.value)}
                className="bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
                rows={3}
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <Card className="bg-dark-800/50 border-dark-700">
              <CardHeader>
                <CardTitle className="text-xl text-dark-50">Project Summary</CardTitle>
                <CardDescription className="text-dark-400">
                  Review your project details before submission
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-dark-50 mb-2">{formData.title}</h3>
                  <p className="text-dark-300 mb-4">{formData.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-primary-600 text-white">{formData.category}</Badge>
                    {formData.tags.map((tag) => (
                      <Badge key={tag} className="bg-accent-500/20 text-accent-300 border-accent-500/30">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-dark-700/30 rounded-lg">
                    <div className="text-2xl font-bold text-success">
                      ${Number.parseInt(formData.fundingGoal || "0").toLocaleString()}
                    </div>
                    <div className="text-sm text-dark-400">Funding Goal</div>
                  </div>
                  <div className="text-center p-4 bg-dark-700/30 rounded-lg">
                    <div className="text-2xl font-bold text-primary-400">
                      {durations.find((d) => d.value === formData.duration)?.label || "N/A"}
                    </div>
                    <div className="text-sm text-dark-400">Duration</div>
                  </div>
                  <div className="text-center p-4 bg-dark-700/30 rounded-lg">
                    <div className="text-2xl font-bold text-accent-400">{formData.milestones.length}</div>
                    <div className="text-sm text-dark-400">Milestones</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-semibold text-dark-50 mb-3">Research Team</h4>
                  <div className="space-y-2">
                    {formData.teamMembers
                      .filter((member) => member.name)
                      .map((member, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-dark-700/30 rounded-lg">
                          <div>
                            <p className="font-medium text-dark-50">{member.name}</p>
                            <p className="text-sm text-dark-400">
                              {member.role} • {member.institution}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-semibold text-dark-50 mb-3">Research Objectives</h4>
                  <ul className="space-y-2">
                    {formData.objectives
                      .filter((obj) => obj.trim())
                      .map((objective, index) => (
                        <li key={index} className="flex items-start">
                          <Target className="w-4 h-4 mr-2 mt-1 text-primary-400 flex-shrink-0" />
                          <span className="text-dark-300">{objective}</span>
                        </li>
                      ))}
                  </ul>
                </div>

                {formData.expectedImpact && (
                  <div>
                    <h4 className="text-md font-semibold text-dark-50 mb-3">Expected Impact</h4>
                    <p className="text-dark-300">{formData.expectedImpact}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-dark-50">
      <ParticleBackground />

      <div className="container mx-auto px-4 py-8 pt-24">
        <motion.div className="max-w-4xl mx-auto" initial="initial" animate="animate" variants={staggerContainer}>
          {/* Header */}
          <motion.div className="mb-8" variants={fadeInUp}>
            <Link href="/projects" className="inline-flex items-center text-accent-400 hover:text-accent-300 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>
            <h1 className="text-4xl font-bold mb-2">Create Research Project</h1>
            <p className="text-dark-400 text-lg">
              Share your research with the global scientific community and secure funding
            </p>
          </motion.div>

          {/* Progress Steps */}
          <motion.div className="mb-8" variants={fadeInUp}>
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= step.id
                        ? "bg-primary-600 text-white"
                        : "bg-dark-700 text-dark-400 border border-dark-600"
                    }`}
                  >
                    {step.id}
                  </div>
                  <div className="ml-3 hidden md:block">
                    <p className={`text-sm font-medium ${currentStep >= step.id ? "text-dark-50" : "text-dark-400"}`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-dark-500">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${currentStep > step.id ? "bg-primary-600" : "bg-dark-700"}`} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div variants={fadeInUp}>
            <Card className="bg-dark-800/50 border-dark-700">
              <CardHeader>
                <CardTitle className="text-xl text-dark-50">{steps[currentStep - 1].title}</CardTitle>
                <CardDescription className="text-dark-400">{steps[currentStep - 1].description}</CardDescription>
              </CardHeader>
              <CardContent>{renderStep()}</CardContent>
            </Card>
          </motion.div>

          {/* Navigation */}
          <motion.div className="mt-8 flex justify-between" variants={fadeInUp}>
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="border-dark-600 text-dark-400 hover:bg-dark-700 bg-transparent disabled:opacity-50"
            >
              Previous
            </Button>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-accent-500 text-accent-400 hover:bg-accent-500/10 bg-transparent"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>

              {currentStep < 4 ? (
                <Button
                  onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                  className="bg-primary-600 hover:bg-primary-700 text-white"
                >
                  Next
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={loading} className="bg-success hover:bg-success/90 text-white">
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 mr-2" />
                      Submit Project
                    </>
                  )}
                </Button>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
