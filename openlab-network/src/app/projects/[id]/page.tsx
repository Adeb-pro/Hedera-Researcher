"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Clock,
  DollarSign,
  Share2,
  Heart,
  Calendar,
  MapPin,
  MessageCircle,
  Star,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Target,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

// Mock project data - in real app, this would come from API
const project = {
  id: 1,
  title: "CRISPR Gene Therapy for Rare Diseases",
  description:
    "Developing targeted gene therapies using CRISPR-Cas9 technology for treating rare genetic disorders affecting children worldwide. Our research focuses on creating precise, safe, and effective treatments that can address the root causes of genetic diseases.",
  category: "Biology & Life Sciences",
  institution: "Stanford University",
  researcher: {
    name: "Dr. Sarah Chen",
    avatar: "/placeholder.svg?height=80&width=80",
    title: "Professor of Genetics",
    bio: "Leading researcher in gene therapy with 15+ years of experience in CRISPR technology and rare disease treatment.",
    publications: 47,
    citations: 2340,
    hIndex: 28,
  },
  funding: { raised: 145000, goal: 200000 },
  contributors: 23,
  timeLeft: "45 days",
  image: "/crispr-lab.png",
  tags: ["Gene Therapy", "CRISPR", "Rare Diseases", "Pediatric", "Biotechnology"],
  progress: 72.5,
  featured: true,
  trending: true,
  createdAt: "2024-01-15",
  location: "Stanford, CA",
  duration: "24 months",
  status: "Active Funding",
  likes: 156,
  shares: 43,
  comments: 28,
  milestones: [
    {
      id: 1,
      title: "Research Design & Ethics Approval",
      description: "Complete study design and obtain institutional review board approval",
      status: "completed",
      dueDate: "2024-02-15",
      funding: 25000,
    },
    {
      id: 2,
      title: "CRISPR System Development",
      description: "Develop and optimize CRISPR-Cas9 delivery systems for target genes",
      status: "in-progress",
      dueDate: "2024-04-30",
      funding: 75000,
    },
    {
      id: 3,
      title: "Preclinical Testing",
      description: "Conduct safety and efficacy testing in laboratory models",
      status: "pending",
      dueDate: "2024-08-15",
      funding: 60000,
    },
    {
      id: 4,
      title: "Clinical Trial Preparation",
      description: "Prepare for Phase I clinical trials and regulatory submissions",
      status: "pending",
      dueDate: "2024-12-01",
      funding: 40000,
    },
  ],
  team: [
    {
      name: "Dr. Sarah Chen",
      role: "Principal Investigator",
      avatar: "/placeholder.svg?height=40&width=40",
      institution: "Stanford University",
    },
    {
      name: "Dr. Michael Rodriguez",
      role: "Co-Investigator",
      avatar: "/placeholder.svg?height=40&width=40",
      institution: "UCSF",
    },
    {
      name: "Dr. Emily Watson",
      role: "Research Scientist",
      avatar: "/placeholder.svg?height=40&width=40",
      institution: "Stanford University",
    },
    {
      name: "Dr. James Liu",
      role: "Biostatistician",
      avatar: "/placeholder.svg?height=40&width=40",
      institution: "Harvard Medical",
    },
  ],
  recentUpdates: [
    {
      id: 1,
      title: "Milestone 1 Completed Successfully",
      content: "We've successfully completed our research design and received ethics approval from the IRB.",
      date: "2024-02-20",
      author: "Dr. Sarah Chen",
    },
    {
      id: 2,
      title: "New Team Member Joins Project",
      content: "Dr. Emily Watson has joined our team as a Research Scientist, bringing expertise in gene delivery.",
      date: "2024-02-15",
      author: "Dr. Sarah Chen",
    },
    {
      id: 3,
      title: "Research Paper Published",
      content: "Our preliminary findings have been published in Nature Genetics, validating our approach.",
      date: "2024-02-10",
      author: "Dr. Sarah Chen",
    },
  ],
  contributors: [
    { name: "BioTech Ventures", amount: 25000, type: "organization", avatar: "/placeholder.svg?height=32&width=32" },
    { name: "Dr. Alex Thompson", amount: 5000, type: "individual", avatar: "/placeholder.svg?height=32&width=32" },
    {
      name: "Genetic Research Fund",
      amount: 15000,
      type: "organization",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    { name: "Anonymous", amount: 2500, type: "individual", avatar: "/placeholder.svg?height=32&width=32" },
  ],
}

export default function ProjectDetail() {
  const [activeTab, setActiveTab] = useState("overview")
  const [liked, setLiked] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-dark-50">
      <ParticleBackground />

      <div className="container mx-auto px-4 py-8 pt-24">
        <motion.div className="max-w-7xl mx-auto" initial="initial" animate="animate" variants={staggerContainer}>
          {/* Back Button */}
          <motion.div className="mb-6" variants={fadeInUp}>
            <Link href="/projects" className="inline-flex items-center text-accent-400 hover:text-accent-300">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>
          </motion.div>

          {/* Project Header */}
          <motion.div className="mb-8" variants={fadeInUp}>
            <div className="relative rounded-xl overflow-hidden mb-6">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-primary-600 text-white">{project.category}</Badge>
                  {project.featured && (
                    <Badge className="bg-warning/20 text-warning border-warning/30">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  {project.trending && (
                    <Badge className="bg-success/20 text-success border-success/30">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Trending
                    </Badge>
                  )}
                  <Badge className="bg-accent-500/20 text-accent-400 border-accent-500/30">{project.status}</Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{project.title}</h1>
                <div className="flex items-center space-x-4 text-dark-300">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {project.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {project.duration}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Project Actions */}
              <motion.div variants={fadeInUp}>
                <div className="flex flex-wrap gap-3 mb-6">
                  <Button className="bg-primary-600 hover:bg-primary-700 text-white flex-1 sm:flex-none">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Fund This Project
                  </Button>
                  <Button
                    variant="outline"
                    className="border-accent-500 text-accent-400 hover:bg-accent-500/10 bg-transparent"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact Researcher
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setLiked(!liked)}
                    className={`border-dark-600 hover:bg-dark-700 bg-transparent ${
                      liked ? "text-red-400 border-red-400" : "text-dark-400"
                    }`}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${liked ? "fill-current" : ""}`} />
                    {project.likes + (liked ? 1 : 0)}
                  </Button>
                  <Button variant="outline" className="border-dark-600 text-dark-400 hover:bg-dark-700 bg-transparent">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </motion.div>

              {/* Tabs */}
              <motion.div variants={fadeInUp}>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4 bg-dark-800 border-dark-700">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-primary-600">
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="milestones" className="data-[state=active]:bg-primary-600">
                      Milestones
                    </TabsTrigger>
                    <TabsTrigger value="team" className="data-[state=active]:bg-primary-600">
                      Team
                    </TabsTrigger>
                    <TabsTrigger value="updates" className="data-[state=active]:bg-primary-600">
                      Updates
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-6">
                    <Card className="bg-dark-800/50 border-dark-700">
                      <CardHeader>
                        <CardTitle className="text-xl text-dark-50">Project Description</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <p className="text-dark-300 leading-relaxed">{project.description}</p>

                        <div>
                          <h3 className="text-lg font-semibold mb-3 text-dark-50">Research Objectives</h3>
                          <ul className="space-y-2 text-dark-300">
                            <li className="flex items-start">
                              <Target className="w-4 h-4 mr-2 mt-1 text-primary-400 flex-shrink-0" />
                              Develop precise CRISPR-Cas9 delivery systems for rare genetic disorders
                            </li>
                            <li className="flex items-start">
                              <Target className="w-4 h-4 mr-2 mt-1 text-primary-400 flex-shrink-0" />
                              Conduct comprehensive safety and efficacy testing
                            </li>
                            <li className="flex items-start">
                              <Target className="w-4 h-4 mr-2 mt-1 text-primary-400 flex-shrink-0" />
                              Prepare for clinical trials and regulatory approval
                            </li>
                            <li className="flex items-start">
                              <Target className="w-4 h-4 mr-2 mt-1 text-primary-400 flex-shrink-0" />
                              Establish treatment protocols for pediatric patients
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-3 text-dark-50">Expected Impact</h3>
                          <p className="text-dark-300 leading-relaxed">
                            This research has the potential to revolutionize treatment for rare genetic diseases,
                            providing hope for thousands of families worldwide. By developing precise gene editing
                            techniques, we aim to address the root causes of these conditions rather than just managing
                            symptoms.
                          </p>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-3 text-dark-50">Tags</h3>
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="bg-accent-500/20 text-accent-300 border-accent-500/30"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="milestones" className="mt-6">
                    <Card className="bg-dark-800/50 border-dark-700">
                      <CardHeader>
                        <CardTitle className="text-xl text-dark-50">Project Milestones</CardTitle>
                        <CardDescription className="text-dark-400">
                          Track progress through key research phases
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {project.milestones.map((milestone, index) => (
                            <div key={milestone.id} className="relative">
                              {index < project.milestones.length - 1 && (
                                <div className="absolute left-4 top-8 w-0.5 h-16 bg-dark-600" />
                              )}
                              <div className="flex items-start space-x-4">
                                <div
                                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                    milestone.status === "completed"
                                      ? "bg-success text-white"
                                      : milestone.status === "in-progress"
                                        ? "bg-primary-600 text-white"
                                        : "bg-dark-600 text-dark-400"
                                  }`}
                                >
                                  {milestone.status === "completed" ? (
                                    <CheckCircle className="w-4 h-4" />
                                  ) : milestone.status === "in-progress" ? (
                                    <AlertCircle className="w-4 h-4" />
                                  ) : (
                                    <Clock className="w-4 h-4" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-semibold text-dark-50">{milestone.title}</h3>
                                    <div className="flex items-center space-x-2">
                                      <Badge
                                        className={`text-xs ${
                                          milestone.status === "completed"
                                            ? "bg-success/20 text-success border-success/30"
                                            : milestone.status === "in-progress"
                                              ? "bg-primary-500/20 text-primary-400 border-primary-500/30"
                                              : "bg-dark-700 text-dark-400 border-dark-600"
                                        }`}
                                      >
                                        {milestone.status.replace("-", " ")}
                                      </Badge>
                                      <span className="text-sm text-dark-400">
                                        ${milestone.funding.toLocaleString()}
                                      </span>
                                    </div>
                                  </div>
                                  <p className="text-dark-400 text-sm mb-2">{milestone.description}</p>
                                  <p className="text-dark-500 text-xs">Due: {milestone.dueDate}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="team" className="mt-6">
                    <Card className="bg-dark-800/50 border-dark-700">
                      <CardHeader>
                        <CardTitle className="text-xl text-dark-50">Research Team</CardTitle>
                        <CardDescription className="text-dark-400">
                          Meet the experts behind this groundbreaking research
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {project.team.map((member, index) => (
                            <div
                              key={index}
                              className="flex items-start space-x-4 p-4 bg-dark-700/30 rounded-lg border border-dark-600"
                            >
                              <Avatar className="w-12 h-12">
                                <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                <AvatarFallback>
                                  {member.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <h3 className="font-semibold text-dark-50">{member.name}</h3>
                                <p className="text-sm text-primary-400 mb-1">{member.role}</p>
                                <p className="text-sm text-dark-400">{member.institution}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="updates" className="mt-6">
                    <Card className="bg-dark-800/50 border-dark-700">
                      <CardHeader>
                        <CardTitle className="text-xl text-dark-50">Recent Updates</CardTitle>
                        <CardDescription className="text-dark-400">
                          Latest news and progress from the research team
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {project.recentUpdates.map((update) => (
                            <div key={update.id} className="border-b border-dark-700 pb-6 last:border-b-0">
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="font-semibold text-dark-50">{update.title}</h3>
                                <span className="text-sm text-dark-400">{update.date}</span>
                              </div>
                              <p className="text-dark-300 mb-2">{update.content}</p>
                              <p className="text-sm text-dark-500">By {update.author}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Funding Progress */}
              <motion.div variants={fadeInUp}>
                <Card className="bg-dark-800/50 border-dark-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-dark-50">Funding Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary-400 mb-1">
                        ${project.funding.raised.toLocaleString()}
                      </div>
                      <div className="text-dark-400">of ${project.funding.goal.toLocaleString()} goal</div>
                    </div>

                    <Progress value={project.progress} className="h-3" />

                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-xl font-bold text-accent-400">{project.contributors}</div>
                        <div className="text-sm text-dark-400">Contributors</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-warning">{project.timeLeft}</div>
                        <div className="text-sm text-dark-400">Remaining</div>
                      </div>
                    </div>

                    <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Fund This Project
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Researcher Profile */}
              <motion.div variants={fadeInUp}>
                <Card className="bg-dark-800/50 border-dark-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-dark-50">Principal Investigator</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage
                          src={project.researcher.avatar || "/placeholder.svg"}
                          alt={project.researcher.name}
                        />
                        <AvatarFallback>
                          {project.researcher.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-dark-50">{project.researcher.name}</h3>
                        <p className="text-sm text-primary-400">{project.researcher.title}</p>
                        <p className="text-sm text-dark-400">{project.institution}</p>
                      </div>
                    </div>

                    <p className="text-sm text-dark-300">{project.researcher.bio}</p>

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-accent-400">{project.researcher.publications}</div>
                        <div className="text-xs text-dark-400">Publications</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-secondary-400">{project.researcher.citations}</div>
                        <div className="text-xs text-dark-400">Citations</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-success">{project.researcher.hIndex}</div>
                        <div className="text-xs text-dark-400">H-Index</div>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full border-accent-500 text-accent-400 hover:bg-accent-500/10 bg-transparent"
                    >
                      View Full Profile
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recent Contributors */}
              <motion.div variants={fadeInUp}>
                <Card className="bg-dark-800/50 border-dark-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-dark-50">Recent Contributors</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {project.contributors.map((contributor, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={contributor.avatar || "/placeholder.svg"} alt={contributor.name} />
                            <AvatarFallback>{contributor.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-dark-50">{contributor.name}</p>
                            <p className="text-xs text-dark-400 capitalize">{contributor.type}</p>
                          </div>
                        </div>
                        <div className="text-sm font-medium text-success">${contributor.amount.toLocaleString()}</div>
                      </div>
                    ))}
                    <Button
                      variant="ghost"
                      className="w-full text-accent-400 hover:text-accent-300 hover:bg-accent-500/10"
                    >
                      View All Contributors
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
