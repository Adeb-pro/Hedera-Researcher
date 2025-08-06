"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Grid3X3, List, Clock, Users, DollarSign, Beaker, Star, TrendingUp } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  "All Categories",
  "Biology & Life Sciences",
  "Chemistry",
  "Physics",
  "Medicine & Health Sciences",
  "Computer Science",
  "Engineering",
  "Environmental Science",
  "Materials Science",
  "Mathematics",
]

const sortOptions = [
  { value: "trending", label: "Trending" },
  { value: "newest", label: "Newest" },
  { value: "funding", label: "Most Funded" },
  { value: "deadline", label: "Ending Soon" },
  { value: "contributors", label: "Most Contributors" },
]

const projects = [
  {
    id: 1,
    title: "CRISPR Gene Therapy for Rare Diseases",
    description:
      "Developing targeted gene therapies using CRISPR-Cas9 technology for treating rare genetic disorders affecting children worldwide.",
    category: "Biology & Life Sciences",
    institution: "Stanford University",
    researcher: "Dr. Sarah Chen",
    researcherAvatar: "/placeholder.svg?height=40&width=40",
    funding: { raised: 145000, goal: 200000 },
    contributors: 23,
    timeLeft: "45 days",
    image: "/crispr-lab.png",
    tags: ["Gene Therapy", "CRISPR", "Rare Diseases", "Pediatric"],
    progress: 72.5,
    featured: true,
    trending: true,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    title: "Quantum Computing for Drug Discovery",
    description:
      "Leveraging quantum algorithms to accelerate molecular simulation and drug discovery processes, reducing time from decades to years.",
    category: "Computer Science",
    institution: "MIT",
    researcher: "Dr. Michael Rodriguez",
    researcherAvatar: "/placeholder.svg?height=40&width=40",
    funding: { raised: 89000, goal: 150000 },
    contributors: 18,
    timeLeft: "62 days",
    image: "/quantum-computing-laboratory.png",
    tags: ["Quantum Computing", "Drug Discovery", "AI", "Molecular Simulation"],
    progress: 59.3,
    featured: false,
    trending: true,
    createdAt: "2024-01-20",
  },
  {
    id: 3,
    title: "Sustainable Energy Storage Solutions",
    description:
      "Developing next-generation battery technologies using novel nanomaterials for renewable energy storage and electric vehicles.",
    category: "Materials Science",
    institution: "UC Berkeley",
    researcher: "Dr. Emily Watson",
    researcherAvatar: "/placeholder.svg?height=40&width=40",
    funding: { raised: 203000, goal: 250000 },
    contributors: 31,
    timeLeft: "28 days",
    image: "/placeholder-z8cv1.png",
    tags: ["Energy Storage", "Nanomaterials", "Sustainability", "Electric Vehicles"],
    progress: 81.2,
    featured: true,
    trending: false,
    createdAt: "2024-01-10",
  },
  {
    id: 4,
    title: "AI-Powered Cancer Detection",
    description:
      "Using machine learning and computer vision to detect early-stage cancer from medical imaging with 99% accuracy.",
    category: "Medicine & Health Sciences",
    institution: "Johns Hopkins",
    researcher: "Dr. James Liu",
    researcherAvatar: "/placeholder.svg?height=40&width=40",
    funding: { raised: 67000, goal: 120000 },
    contributors: 15,
    timeLeft: "73 days",
    image: "/medical-ai-cancer-detection.png",
    tags: ["AI", "Cancer Detection", "Medical Imaging", "Machine Learning"],
    progress: 55.8,
    featured: false,
    trending: true,
    createdAt: "2024-01-25",
  },
  {
    id: 5,
    title: "Ocean Plastic Cleanup Technology",
    description:
      "Developing autonomous underwater vehicles that can collect and process ocean plastic waste into useful materials.",
    category: "Environmental Science",
    institution: "Ocean Institute",
    researcher: "Dr. Maria Santos",
    researcherAvatar: "/placeholder.svg?height=40&width=40",
    funding: { raised: 34000, goal: 80000 },
    contributors: 12,
    timeLeft: "91 days",
    image: "/placeholder-edqru.png",
    tags: ["Ocean Cleanup", "Robotics", "Sustainability", "Marine Biology"],
    progress: 42.5,
    featured: false,
    trending: false,
    createdAt: "2024-01-30",
  },
  {
    id: 6,
    title: "Neural Interface for Paralysis Recovery",
    description:
      "Brain-computer interface technology to help paralyzed patients regain motor control through neural signal processing.",
    category: "Medicine & Health Sciences",
    institution: "Harvard Medical",
    researcher: "Dr. Alex Thompson",
    researcherAvatar: "/placeholder.svg?height=40&width=40",
    funding: { raised: 178000, goal: 300000 },
    contributors: 27,
    timeLeft: "56 days",
    image: "/brain-computer-interface-neural.png",
    tags: ["Neural Interface", "BCI", "Paralysis", "Neuroscience"],
    progress: 59.3,
    featured: true,
    trending: true,
    createdAt: "2024-01-12",
  },
]

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [sortBy, setSortBy] = useState("trending")
  const [showFilters, setShowFilters] = useState(false)

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "All Categories" || project.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case "funding":
        return b.funding.raised - a.funding.raised
      case "deadline":
        return Number.parseInt(a.timeLeft) - Number.parseInt(b.timeLeft)
      case "contributors":
        return b.contributors - a.contributors
      case "trending":
      default:
        return (b.trending ? 1 : 0) - (a.trending ? 1 : 0) || b.funding.raised - a.funding.raised
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-dark-50">
      <ParticleBackground />

      <div className="container mx-auto px-4 py-8 pt-24">
        <motion.div className="max-w-7xl mx-auto" initial="initial" animate="animate" variants={staggerContainer}>
          {/* Header */}
          <motion.div className="mb-8" variants={fadeInUp}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">Research Projects</h1>
                <p className="text-dark-400 text-lg">
                  Discover groundbreaking research projects seeking funding and collaboration
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link href="/projects/create">
                  <Button className="bg-primary-600 hover:bg-primary-700 text-white">
                    <Beaker className="w-4 h-4 mr-2" />
                    Create Project
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-dark-800/50 rounded-lg p-4 border border-dark-700">
                <div className="text-2xl font-bold text-primary-400">{projects.length}</div>
                <div className="text-dark-400 text-sm">Active Projects</div>
              </div>
              <div className="bg-dark-800/50 rounded-lg p-4 border border-dark-700">
                <div className="text-2xl font-bold text-success">
                  ${projects.reduce((sum, p) => sum + p.funding.raised, 0).toLocaleString()}
                </div>
                <div className="text-dark-400 text-sm">Total Funding</div>
              </div>
              <div className="bg-dark-800/50 rounded-lg p-4 border border-dark-700">
                <div className="text-2xl font-bold text-accent-400">
                  {projects.reduce((sum, p) => sum + p.contributors, 0)}
                </div>
                <div className="text-dark-400 text-sm">Contributors</div>
              </div>
              <div className="bg-dark-800/50 rounded-lg p-4 border border-dark-700">
                <div className="text-2xl font-bold text-secondary-400">{categories.length - 1}</div>
                <div className="text-dark-400 text-sm">Categories</div>
              </div>
            </div>
          </motion.div>

          {/* Search and Filters */}
          <motion.div className="mb-8" variants={fadeInUp}>
            <Card className="bg-dark-800/50 border-dark-700">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 w-4 h-4" />
                    <Input
                      placeholder="Search projects, researchers, or keywords..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
                    />
                  </div>

                  {/* Category Filter */}
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full lg:w-64 bg-dark-700 border-dark-600 text-dark-50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-700 border-dark-600">
                      {categories.map((category) => (
                        <SelectItem key={category} value={category} className="text-dark-50 focus:bg-dark-600">
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Sort */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full lg:w-48 bg-dark-700 border-dark-600 text-dark-50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-700 border-dark-600">
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="text-dark-50 focus:bg-dark-600">
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* View Mode */}
                  <div className="flex border border-dark-600 rounded-md overflow-hidden">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className={`rounded-none ${
                        viewMode === "grid"
                          ? "bg-primary-600 text-white"
                          : "text-dark-400 hover:text-dark-300 hover:bg-dark-700"
                      }`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className={`rounded-none ${
                        viewMode === "list"
                          ? "bg-primary-600 text-white"
                          : "text-dark-400 hover:text-dark-300 hover:bg-dark-700"
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results */}
          <motion.div variants={fadeInUp}>
            <div className="flex items-center justify-between mb-6">
              <p className="text-dark-400">
                Showing {sortedProjects.length} of {projects.length} projects
              </p>
            </div>

            {/* Projects Grid/List */}
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}>
              {sortedProjects.map((project) => (
                <motion.div key={project.id} variants={fadeInUp} className={viewMode === "list" ? "w-full" : ""}>
                  <Card
                    className={`bg-dark-800/50 border-dark-700 hover:bg-dark-800/70 transition-all duration-300 overflow-hidden group hover:border-primary-500/30 ${
                      viewMode === "list" ? "flex" : ""
                    }`}
                  >
                    <div className={`relative ${viewMode === "list" ? "w-64 flex-shrink-0" : ""}`}>
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                          viewMode === "list" ? "w-full h-full" : "w-full h-48"
                        }`}
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
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
                      </div>
                    </div>

                    <div className="flex-1">
                      <CardHeader className={viewMode === "list" ? "pb-2" : ""}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg text-dark-50 line-clamp-2 mb-2">{project.title}</CardTitle>
                            <div className="flex items-center space-x-2 mb-2">
                              <img
                                src={project.researcherAvatar || "/placeholder.svg"}
                                alt={project.researcher}
                                className="w-6 h-6 rounded-full"
                              />
                              <span className="text-sm text-dark-400">{project.researcher}</span>
                              <span className="text-dark-600">•</span>
                              <span className="text-sm text-dark-400">{project.institution}</span>
                            </div>
                            <CardDescription className="text-dark-400 line-clamp-3">
                              {project.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, viewMode === "list" ? 6 : 3).map((tag, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs bg-accent-500/20 text-accent-300 border-accent-500/30"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {project.tags.length > (viewMode === "list" ? 6 : 3) && (
                            <Badge variant="secondary" className="text-xs bg-dark-700 text-dark-400">
                              +{project.tags.length - (viewMode === "list" ? 6 : 3)} more
                            </Badge>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-dark-400">Funding Progress</span>
                            <span className="text-dark-50">{project.progress}%</span>
                          </div>
                          <div className="w-full bg-dark-700 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-sm text-dark-400">
                            <span>${project.funding.raised.toLocaleString()} raised</span>
                            <span>${project.funding.goal.toLocaleString()} goal</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-dark-400">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {project.contributors} contributors
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {project.timeLeft}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Link href={`/projects/${project.id}`} className="flex-1">
                            <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white">
                              View Project
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            className="border-success/30 text-success hover:bg-success/10 bg-transparent"
                          >
                            <DollarSign className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button
                variant="outline"
                className="border-accent-500 text-accent-400 hover:bg-accent-500/10 bg-transparent px-8"
              >
                Load More Projects
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
