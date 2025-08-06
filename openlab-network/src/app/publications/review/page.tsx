"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Search,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  User,
  Calendar,
  Star,
  MessageSquare,
  Download,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

const reviewAssignments = [
  {
    id: 1,
    title: "CRISPR-Cas9 Gene Editing for Duchenne Muscular Dystrophy: A Phase I Clinical Trial",
    authors: ["Dr. Sarah Chen", "Dr. Michael Rodriguez", "Dr. Emily Watson"],
    journal: "Nature Medicine",
    category: "Medicine & Health Sciences",
    assignedDate: "2024-02-20",
    dueDate: "2024-03-20",
    status: "pending",
    priority: "high",
    estimatedTime: "4-6 hours",
    abstract:
      "This study presents the first Phase I clinical trial results for CRISPR-Cas9 gene editing therapy in patients with Duchenne Muscular Dystrophy...",
    keywords: ["CRISPR", "Gene Therapy", "Clinical Trial", "Muscular Dystrophy"],
    conflictCheck: "no_conflict",
    expertise: 85,
    previousReviews: 12,
  },
  {
    id: 2,
    title: "Quantum Machine Learning Algorithms for Drug Discovery: A Comprehensive Review",
    authors: ["Dr. Michael Rodriguez", "Dr. James Liu"],
    journal: "Nature Reviews Drug Discovery",
    category: "Computer Science",
    assignedDate: "2024-02-15",
    dueDate: "2024-03-15",
    status: "in_progress",
    priority: "medium",
    estimatedTime: "6-8 hours",
    abstract:
      "We provide a comprehensive review of quantum machine learning algorithms and their applications in drug discovery...",
    keywords: ["Quantum Computing", "Machine Learning", "Drug Discovery"],
    conflictCheck: "no_conflict",
    expertise: 92,
    previousReviews: 8,
    progress: 65,
  },
  {
    id: 3,
    title: "Sustainable Nanomaterials for Next-Generation Battery Technology",
    authors: ["Dr. Emily Watson", "Dr. Maria Santos"],
    journal: "Advanced Materials",
    category: "Materials Science",
    assignedDate: "2024-02-10",
    dueDate: "2024-03-10",
    status: "completed",
    priority: "low",
    estimatedTime: "3-4 hours",
    abstract: "This research presents novel sustainable nanomaterials for advanced battery applications...",
    keywords: ["Nanomaterials", "Battery Technology", "Sustainability"],
    conflictCheck: "no_conflict",
    expertise: 78,
    previousReviews: 15,
    completedDate: "2024-03-05",
    rating: 4,
  },
]

const reviewHistory = [
  {
    id: 1,
    title: "AI-Powered Early Cancer Detection Using Medical Imaging",
    journal: "The Lancet Digital Health",
    completedDate: "2024-01-15",
    rating: 5,
    recommendation: "Accept",
    timeSpent: "5.5 hours",
  },
  {
    id: 2,
    title: "Ocean Plastic Cleanup: Autonomous Robotic Systems",
    journal: "Science Robotics",
    completedDate: "2024-01-08",
    rating: 4,
    recommendation: "Minor Revisions",
    timeSpent: "4.2 hours",
  },
  {
    id: 3,
    title: "Brain-Computer Interface for Motor Function Recovery",
    journal: "Nature Neuroscience",
    completedDate: "2023-12-20",
    rating: 4,
    recommendation: "Accept",
    timeSpent: "6.1 hours",
  },
]

const availableReviews = [
  {
    id: 1,
    title: "Novel Approaches to Alzheimer's Disease Treatment Using Nanotechnology",
    authors: ["Dr. Jennifer Park", "Dr. Robert Kim"],
    journal: "Nature Nanotechnology",
    category: "Medicine & Health Sciences",
    submittedDate: "2024-02-25",
    deadline: "2024-03-25",
    estimatedTime: "4-5 hours",
    expertise: 88,
    abstract:
      "This study explores innovative nanotechnology approaches for targeted drug delivery in Alzheimer's disease treatment...",
    keywords: ["Nanotechnology", "Alzheimer's", "Drug Delivery", "Neuroscience"],
    urgency: "medium",
  },
  {
    id: 2,
    title: "Climate Change Impact on Marine Biodiversity: A Global Analysis",
    authors: ["Dr. Maria Santos", "Dr. David Chen"],
    journal: "Nature Climate Change",
    category: "Environmental Science",
    submittedDate: "2024-02-22",
    deadline: "2024-03-22",
    estimatedTime: "5-6 hours",
    expertise: 72,
    abstract: "We present a comprehensive global analysis of climate change impacts on marine biodiversity patterns...",
    keywords: ["Climate Change", "Marine Biology", "Biodiversity", "Conservation"],
    urgency: "high",
  },
]

export default function PeerReviewPage() {
  const [activeTab, setActiveTab] = useState("assignments")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-warning/20 text-warning border-warning/30"
      case "in_progress":
        return "bg-primary-500/20 text-primary-400 border-primary-500/30"
      case "completed":
        return "bg-success/20 text-success border-success/30"
      case "overdue":
        return "bg-error/20 text-error border-error/30"
      default:
        return "bg-dark-700 text-dark-400 border-dark-600"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-error/20 text-error border-error/30"
      case "medium":
        return "bg-warning/20 text-warning border-warning/30"
      case "low":
        return "bg-success/20 text-success border-success/30"
      default:
        return "bg-dark-700 text-dark-400 border-dark-600"
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "bg-error/20 text-error border-error/30"
      case "medium":
        return "bg-warning/20 text-warning border-warning/30"
      case "low":
        return "bg-success/20 text-success border-success/30"
      default:
        return "bg-dark-700 text-dark-400 border-dark-600"
    }
  }

  const getDaysRemaining = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-dark-50">
      <ParticleBackground />

      <div className="container mx-auto px-4 py-8 pt-24">
        <motion.div className="max-w-7xl mx-auto" initial="initial" animate="animate" variants={staggerContainer}>
          {/* Header */}
          <motion.div className="mb-8" variants={fadeInUp}>
            <Link href="/publications" className="inline-flex items-center text-accent-400 hover:text-accent-300 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Publications
            </Link>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">Peer Review Dashboard</h1>
                <p className="text-dark-400 text-lg">
                  Manage your review assignments and contribute to scientific quality
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex gap-3">
                <Button className="bg-primary-600 hover:bg-primary-700 text-white">
                  <FileText className="w-4 h-4 mr-2" />
                  Review Guidelines
                </Button>
                <Button
                  variant="outline"
                  className="border-accent-500 text-accent-400 hover:bg-accent-500/10 bg-transparent"
                >
                  <User className="w-4 h-4 mr-2" />
                  Reviewer Profile
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-dark-800/50 rounded-lg p-4 border border-dark-700">
                <div className="text-2xl font-bold text-primary-400">
                  {reviewAssignments.filter((r) => r.status === "pending").length}
                </div>
                <div className="text-dark-400 text-sm">Pending Reviews</div>
              </div>
              <div className="bg-dark-800/50 rounded-lg p-4 border border-dark-700">
                <div className="text-2xl font-bold text-warning">
                  {reviewAssignments.filter((r) => r.status === "in_progress").length}
                </div>
                <div className="text-dark-400 text-sm">In Progress</div>
              </div>
              <div className="bg-dark-800/50 rounded-lg p-4 border border-dark-700">
                <div className="text-2xl font-bold text-success">
                  {reviewAssignments.filter((r) => r.status === "completed").length}
                </div>
                <div className="text-dark-400 text-sm">Completed</div>
              </div>
              <div className="bg-dark-800/50 rounded-lg p-4 border border-dark-700">
                <div className="text-2xl font-bold text-accent-400">
                  {reviewHistory.reduce((sum, r) => sum + Number.parseFloat(r.timeSpent), 0).toFixed(1)}h
                </div>
                <div className="text-dark-400 text-sm">Total Time</div>
              </div>
            </div>
          </motion.div>

          {/* Search and Filters */}
          <motion.div className="mb-8" variants={fadeInUp}>
            <Card className="bg-dark-800/50 border-dark-700">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 w-4 h-4" />
                    <Input
                      placeholder="Search reviews by title, author, or journal..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full lg:w-48 bg-dark-700 border-dark-600 text-dark-50">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-700 border-dark-600">
                      <SelectItem value="all" className="text-dark-50 focus:bg-dark-600">
                        All Status
                      </SelectItem>
                      <SelectItem value="pending" className="text-dark-50 focus:bg-dark-600">
                        Pending
                      </SelectItem>
                      <SelectItem value="in_progress" className="text-dark-50 focus:bg-dark-600">
                        In Progress
                      </SelectItem>
                      <SelectItem value="completed" className="text-dark-50 focus:bg-dark-600">
                        Completed
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="w-full lg:w-48 bg-dark-700 border-dark-600 text-dark-50">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-700 border-dark-600">
                      <SelectItem value="all" className="text-dark-50 focus:bg-dark-600">
                        All Priority
                      </SelectItem>
                      <SelectItem value="high" className="text-dark-50 focus:bg-dark-600">
                        High
                      </SelectItem>
                      <SelectItem value="medium" className="text-dark-50 focus:bg-dark-600">
                        Medium
                      </SelectItem>
                      <SelectItem value="low" className="text-dark-50 focus:bg-dark-600">
                        Low
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tabs */}
          <motion.div variants={fadeInUp}>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 bg-dark-800 border-dark-700 mb-8">
                <TabsTrigger value="assignments" className="data-[state=active]:bg-primary-600">
                  My Assignments
                </TabsTrigger>
                <TabsTrigger value="available" className="data-[state=active]:bg-primary-600">
                  Available Reviews
                </TabsTrigger>
                <TabsTrigger value="history" className="data-[state=active]:bg-primary-600">
                  Review History
                </TabsTrigger>
              </TabsList>

              {/* My Assignments Tab */}
              <TabsContent value="assignments" className="space-y-6">
                {reviewAssignments.map((assignment) => (
                  <motion.div key={assignment.id} variants={fadeInUp}>
                    <Card className="bg-dark-800/50 border-dark-700 hover:bg-dark-800/70 transition-all duration-300 hover:border-primary-500/30">
                      <CardHeader>
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-3">
                              <Badge className={`text-xs ${getStatusColor(assignment.status)}`}>
                                {assignment.status === "pending" && "Pending Review"}
                                {assignment.status === "in_progress" && "In Progress"}
                                {assignment.status === "completed" && "Completed"}
                              </Badge>
                              <Badge className={`text-xs ${getPriorityColor(assignment.priority)}`}>
                                {assignment.priority} Priority
                              </Badge>
                              <Badge className="bg-secondary-500/20 text-secondary-300 border-secondary-500/30 text-xs">
                                {assignment.category}
                              </Badge>
                            </div>

                            <CardTitle className="text-xl text-dark-50 mb-2 line-clamp-2">{assignment.title}</CardTitle>

                            <div className="flex items-center gap-4 text-sm text-dark-400 mb-3">
                              <span className="text-accent-400 font-medium">{assignment.journal}</span>
                              <div className="flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                Due: {new Date(assignment.dueDate).toLocaleDateString()}
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {assignment.estimatedTime}
                              </div>
                            </div>

                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-sm text-dark-400">Authors:</span>
                              <span className="text-sm text-primary-400">{assignment.authors.join(", ")}</span>
                            </div>

                            <CardDescription className="text-dark-400 line-clamp-2 mb-4">
                              {assignment.abstract}
                            </CardDescription>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {assignment.keywords.slice(0, 4).map((keyword, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="text-xs bg-dark-700 text-dark-300 border-dark-600"
                                >
                                  {keyword}
                                </Badge>
                              ))}
                            </div>

                            {assignment.status === "in_progress" && assignment.progress && (
                              <div className="mb-4">
                                <div className="flex items-center justify-between text-sm mb-1">
                                  <span className="text-dark-400">Progress</span>
                                  <span className="text-primary-400">{assignment.progress}%</span>
                                </div>
                                <div className="w-full bg-dark-700 rounded-full h-2">
                                  <div
                                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${assignment.progress}%` }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="lg:w-80 space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                              <div className="text-center p-3 bg-dark-700/30 rounded-lg">
                                <div className="text-lg font-bold text-accent-400">{assignment.expertise}%</div>
                                <div className="text-xs text-dark-400">Expertise Match</div>
                              </div>
                              <div className="text-center p-3 bg-dark-700/30 rounded-lg">
                                <div className="text-lg font-bold text-secondary-400">{assignment.previousReviews}</div>
                                <div className="text-xs text-dark-400">Previous Reviews</div>
                              </div>
                              <div className="text-center p-3 bg-dark-700/30 rounded-lg">
                                <div className="text-lg font-bold text-warning">
                                  {getDaysRemaining(assignment.dueDate)}
                                </div>
                                <div className="text-xs text-dark-400">Days Remaining</div>
                              </div>
                              <div className="text-center p-3 bg-dark-700/30 rounded-lg">
                                <div className="flex items-center justify-center">
                                  {assignment.conflictCheck === "no_conflict" ? (
                                    <CheckCircle className="w-5 h-5 text-success" />
                                  ) : (
                                    <AlertCircle className="w-5 h-5 text-warning" />
                                  )}
                                </div>
                                <div className="text-xs text-dark-400">Conflict Check</div>
                              </div>
                            </div>

                            {assignment.status === "completed" && (
                              <div className="p-3 bg-dark-700/30 rounded-lg">
                                <div className="flex items-center justify-center gap-1 mb-1">
                                  <Star className="w-4 h-4 text-warning fill-current" />
                                  <span className="text-lg font-bold text-warning">{assignment.rating}</span>
                                </div>
                                <div className="text-xs text-dark-400 text-center">
                                  Completed: {new Date(assignment.completedDate!).toLocaleDateString()}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <div className="flex flex-col sm:flex-row gap-3">
                          {assignment.status === "pending" && (
                            <>
                              <Link href={`/publications/review/${assignment.id}`} className="flex-1">
                                <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white">
                                  <Eye className="w-4 h-4 mr-2" />
                                  Start Review
                                </Button>
                              </Link>
                              <Button
                                variant="outline"
                                className="border-warning/30 text-warning hover:bg-warning/10 bg-transparent"
                              >
                                Request Extension
                              </Button>
                              <Button
                                variant="outline"
                                className="border-error/30 text-error hover:bg-error/10 bg-transparent"
                              >
                                Decline
                              </Button>
                            </>
                          )}
                          {assignment.status === "in_progress" && (
                            <>
                              <Link href={`/publications/review/${assignment.id}`} className="flex-1">
                                <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white">
                                  <FileText className="w-4 h-4 mr-2" />
                                  Continue Review
                                </Button>
                              </Link>
                              <Button
                                variant="outline"
                                className="border-accent-500 text-accent-400 hover:bg-accent-500/10 bg-transparent"
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Download PDF
                              </Button>
                            </>
                          )}
                          {assignment.status === "completed" && (
                            <>
                              <Link href={`/publications/review/${assignment.id}`} className="flex-1">
                                <Button
                                  variant="outline"
                                  className="w-full border-success/30 text-success hover:bg-success/10 bg-transparent"
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Review
                                </Button>
                              </Link>
                              <Button
                                variant="outline"
                                className="border-accent-500 text-accent-400 hover:bg-accent-500/10 bg-transparent"
                              >
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Discuss
                              </Button>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </TabsContent>

              {/* Available Reviews Tab */}
              <TabsContent value="available" className="space-y-6">
                <div className="mb-6">
                  <p className="text-dark-400">
                    Browse available review opportunities that match your expertise and interests.
                  </p>
                </div>

                {availableReviews.map((review) => (
                  <motion.div key={review.id} variants={fadeInUp}>
                    <Card className="bg-dark-800/50 border-dark-700 hover:bg-dark-800/70 transition-all duration-300 hover:border-primary-500/30">
                      <CardHeader>
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-3">
                              <Badge className={`text-xs ${getUrgencyColor(review.urgency)}`}>
                                {review.urgency} Urgency
                              </Badge>
                              <Badge className="bg-secondary-500/20 text-secondary-300 border-secondary-500/30 text-xs">
                                {review.category}
                              </Badge>
                            </div>

                            <CardTitle className="text-xl text-dark-50 mb-2 line-clamp-2">{review.title}</CardTitle>

                            <div className="flex items-center gap-4 text-sm text-dark-400 mb-3">
                              <span className="text-accent-400 font-medium">{review.journal}</span>
                              <div className="flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                Deadline: {new Date(review.deadline).toLocaleDateString()}
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {review.estimatedTime}
                              </div>
                            </div>

                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-sm text-dark-400">Authors:</span>
                              <span className="text-sm text-primary-400">{review.authors.join(", ")}</span>
                            </div>

                            <CardDescription className="text-dark-400 line-clamp-2 mb-4">
                              {review.abstract}
                            </CardDescription>

                            <div className="flex flex-wrap gap-2">
                              {review.keywords.slice(0, 4).map((keyword, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="text-xs bg-dark-700 text-dark-300 border-dark-600"
                                >
                                  {keyword}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="lg:w-60 space-y-4">
                            <div className="text-center p-4 bg-dark-700/30 rounded-lg">
                              <div className="text-2xl font-bold text-accent-400 mb-1">{review.expertise}%</div>
                              <div className="text-sm text-dark-400">Expertise Match</div>
                            </div>

                            <div className="text-center p-3 bg-dark-700/30 rounded-lg">
                              <div className="text-lg font-bold text-warning">{getDaysRemaining(review.deadline)}</div>
                              <div className="text-xs text-dark-400">Days to Deadline</div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white">
                            <FileText className="w-4 h-4 mr-2" />
                            Accept Review
                          </Button>
                          <Button
                            variant="outline"
                            className="border-accent-500 text-accent-400 hover:bg-accent-500/10 bg-transparent"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                          <Button
                            variant="outline"
                            className="border-dark-600 text-dark-400 hover:bg-dark-700 bg-transparent"
                          >
                            Not Interested
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </TabsContent>

              {/* Review History Tab */}
              <TabsContent value="history" className="space-y-6">
                <div className="mb-6">
                  <p className="text-dark-400">
                    Your completed peer review history and contributions to the community.
                  </p>
                </div>

                {reviewHistory.map((review) => (
                  <motion.div key={review.id} variants={fadeInUp}>
                    <Card className="bg-dark-800/50 border-dark-700">
                      <CardHeader>
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-lg text-dark-50 mb-2">{review.title}</CardTitle>
                            <div className="flex items-center gap-4 text-sm text-dark-400">
                              <span className="text-accent-400 font-medium">{review.journal}</span>
                              <div className="flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {new Date(review.completedDate).toLocaleDateString()}
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {review.timeSpent}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-6">
                            <div className="text-center">
                              <div className="flex items-center justify-center gap-1 mb-1">
                                <Star className="w-4 h-4 text-warning fill-current" />
                                <span className="text-lg font-bold text-warning">{review.rating}</span>
                              </div>
                              <div className="text-xs text-dark-400">Quality Rating</div>
                            </div>

                            <div className="text-center">
                              <Badge
                                className={`text-xs ${
                                  review.recommendation === "Accept"
                                    ? "bg-success/20 text-success border-success/30"
                                    : review.recommendation === "Minor Revisions"
                                      ? "bg-warning/20 text-warning border-warning/30"
                                      : "bg-error/20 text-error border-error/30"
                                }`}
                              >
                                {review.recommendation}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            className="border-accent-500 text-accent-400 hover:bg-accent-500/10 bg-transparent"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Review
                          </Button>
                          <Button
                            variant="outline"
                            className="border-dark-600 text-dark-400 hover:bg-dark-700 bg-transparent"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download Report
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
