"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Grid3X3, List, MapPin, Star, Users, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

const researchFields = [
  "All Fields",
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
]

const locations = [
  "All Locations",
  "United States",
  "United Kingdom",
  "Canada",
  "Germany",
  "France",
  "Japan",
  "Australia",
  "Switzerland",
  "Netherlands",
  "Other",
]

const sortOptions = [
  { value: "reputation", label: "Reputation Score" },
  { value: "publications", label: "Most Publications" },
  { value: "citations", label: "Most Citations" },
  { value: "projects", label: "Active Projects" },
  { value: "recent", label: "Recently Joined" },
]

const researchers = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    title: "Professor of Genetics",
    institution: "Stanford University",
    location: "Stanford, CA",
    avatar: "/placeholder.svg?height=80&width=80",
    coverImage: "/stanford-genetics-lab.png",
    field: "Biology & Life Sciences",
    specializations: ["Gene Therapy", "CRISPR", "Rare Diseases", "Pediatric Genetics"],
    bio: "Leading researcher in gene therapy with 15+ years of experience in CRISPR technology and rare disease treatment. Published over 50 papers in top-tier journals.",
    stats: {
      publications: 47,
      citations: 2340,
      hIndex: 28,
      projects: 3,
      collaborators: 156,
      funding: 450000,
    },
    reputationScore: 94,
    verified: true,
    featured: true,
    joinedDate: "2019-03-15",
    lastActive: "2 hours ago",
    availability: "Available for collaboration",
    languages: ["English", "Mandarin"],
    awards: ["NIH Early Career Award", "Genetics Society Medal"],
  },
  {
    id: 2,
    name: "Dr. Michael Rodriguez",
    title: "Associate Professor of Computer Science",
    institution: "MIT",
    location: "Cambridge, MA",
    avatar: "/placeholder.svg?height=80&width=80",
    coverImage: "/mit-quantum-lab.png",
    field: "Computer Science",
    specializations: ["Quantum Computing", "Machine Learning", "Drug Discovery", "Algorithms"],
    bio: "Quantum computing researcher focused on applications in drug discovery and molecular simulation. Expert in quantum algorithms and machine learning.",
    stats: {
      publications: 32,
      citations: 1890,
      hIndex: 24,
      projects: 2,
      collaborators: 89,
      funding: 320000,
    },
    reputationScore: 89,
    verified: true,
    featured: true,
    joinedDate: "2020-01-20",
    lastActive: "1 day ago",
    availability: "Limited availability",
    languages: ["English", "Spanish"],
    awards: ["ACM Early Career Award", "NSF CAREER Award"],
  },
  {
    id: 3,
    name: "Dr. Emily Watson",
    title: "Research Scientist",
    institution: "UC Berkeley",
    location: "Berkeley, CA",
    avatar: "/placeholder.svg?height=80&width=80",
    coverImage: "/berkeley-materials-lab.png",
    field: "Materials Science",
    specializations: ["Nanomaterials", "Energy Storage", "Battery Technology", "Sustainability"],
    bio: "Materials scientist developing next-generation battery technologies for renewable energy applications. Focus on sustainable and scalable solutions.",
    stats: {
      publications: 28,
      citations: 1456,
      hIndex: 19,
      projects: 4,
      collaborators: 67,
      funding: 280000,
    },
    reputationScore: 86,
    verified: true,
    featured: false,
    joinedDate: "2020-08-10",
    lastActive: "3 hours ago",
    availability: "Available for collaboration",
    languages: ["English", "German"],
    awards: ["Materials Research Society Award"],
  },
  {
    id: 4,
    name: "Dr. James Liu",
    title: "Professor of Medicine",
    institution: "Johns Hopkins",
    location: "Baltimore, MD",
    avatar: "/placeholder.svg?height=80&width=80",
    coverImage: "/johns-hopkins-medical.png",
    field: "Medicine & Health Sciences",
    specializations: ["Medical AI", "Cancer Detection", "Radiology", "Computer Vision"],
    bio: "Medical researcher combining AI and medical imaging for early cancer detection. Pioneering work in computer-aided diagnosis systems.",
    stats: {
      publications: 41,
      citations: 2100,
      hIndex: 26,
      projects: 2,
      collaborators: 134,
      funding: 380000,
    },
    reputationScore: 91,
    verified: true,
    featured: false,
    joinedDate: "2019-11-05",
    lastActive: "5 hours ago",
    availability: "Available for collaboration",
    languages: ["English", "Mandarin"],
    awards: ["Radiological Society Award", "Medical AI Innovation Prize"],
  },
  {
    id: 5,
    name: "Dr. Maria Santos",
    title: "Marine Biologist",
    institution: "Ocean Institute",
    location: "San Diego, CA",
    avatar: "/placeholder.svg?height=80&width=80",
    coverImage: "/ocean-research-institute.png",
    field: "Environmental Science",
    specializations: ["Marine Biology", "Ocean Cleanup", "Robotics", "Environmental Conservation"],
    bio: "Environmental scientist developing autonomous systems for ocean plastic cleanup. Expert in marine ecosystems and conservation technology.",
    stats: {
      publications: 23,
      citations: 987,
      hIndex: 16,
      projects: 3,
      collaborators: 45,
      funding: 180000,
    },
    reputationScore: 82,
    verified: true,
    featured: false,
    joinedDate: "2021-02-14",
    lastActive: "1 day ago",
    availability: "Available for collaboration",
    languages: ["English", "Spanish", "Portuguese"],
    awards: ["Ocean Conservation Award"],
  },
  {
    id: 6,
    name: "Dr. Alex Thompson",
    title: "Neuroscientist",
    institution: "Harvard Medical",
    location: "Boston, MA",
    avatar: "/placeholder.svg?height=80&width=80",
    coverImage: "/harvard-neuroscience-lab.png",
    field: "Medicine & Health Sciences",
    specializations: ["Neuroscience", "Brain-Computer Interface", "Neural Engineering", "Paralysis Recovery"],
    bio: "Neuroscientist developing brain-computer interfaces for paralysis recovery. Leading research in neural signal processing and motor control restoration.",
    stats: {
      publications: 35,
      citations: 1678,
      hIndex: 22,
      projects: 2,
      collaborators: 78,
      funding: 420000,
    },
    reputationScore: 88,
    verified: true,
    featured: true,
    joinedDate: "2018-09-12",
    lastActive: "4 hours ago",
    availability: "Limited availability",
    languages: ["English", "French"],
    awards: ["Neuroscience Innovation Award", "NIH Director's Award"],
  },
]

export default function ResearchersPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedField, setSelectedField] = useState("All Fields")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")
  const [sortBy, setSortBy] = useState("reputation")

  const filteredResearchers = researchers.filter((researcher) => {
    const matchesSearch =
      researcher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      researcher.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      researcher.specializations.some((spec) => spec.toLowerCase().includes(searchQuery.toLowerCase())) ||
      researcher.bio.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesField = selectedField === "All Fields" || researcher.field === selectedField
    const matchesLocation = selectedLocation === "All Locations" || researcher.location.includes(selectedLocation)

    return matchesSearch && matchesField && matchesLocation
  })

  const sortedResearchers = [...filteredResearchers].sort((a, b) => {
    switch (sortBy) {
      case "publications":
        return b.stats.publications - a.stats.publications
      case "citations":
        return b.stats.citations - a.stats.citations
      case "projects":
        return b.stats.projects - a.stats.projects
      case "recent":
        return new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime()
      case "reputation":
      default:
        return b.reputationScore - a.reputationScore
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
                <h1 className="text-4xl font-bold mb-2">Research Community</h1>
                <p className="text-dark-400 text-lg">
                  Connect with leading researchers and experts from around the world
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link href="/researchers/join">
                  <Button className="bg-primary-600 hover:bg-primary-700 text-white">
                    <Users className="w-4 h-4 mr-2" />
                    Join Community
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-dark-800/50 rounded-lg p-4 border border-dark-700">
                <div className="text-2xl font-bold text-primary-400">{researchers.length}</div>
                <div className="text-dark-400 text-sm">Active Researchers</div>
              </div>
              <div className="bg-dark-800/50 rounded-lg p-4 border border-dark-700">
                <div className="text-2xl font-bold text-success">
                  {researchers.reduce((sum, r) => sum + r.stats.publications, 0)}
                </div>
                <div className="text-dark-400 text-sm">Total Publications</div>
              </div>
              <div className="bg-dark-800/50 rounded-lg p-4 border border-dark-700">
                <div className="text-2xl font-bold text-accent-400">
                  {researchers.reduce((sum, r) => sum + r.stats.collaborators, 0)}
                </div>
                <div className="text-dark-400 text-sm">Collaborations</div>
              </div>
              <div className="bg-dark-800/50 rounded-lg p-4 border border-dark-700">
                <div className="text-2xl font-bold text-secondary-400">{researchFields.length - 1}</div>
                <div className="text-dark-400 text-sm">Research Fields</div>
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
                      placeholder="Search researchers, institutions, or specializations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
                    />
                  </div>

                  {/* Field Filter */}
                  <Select value={selectedField} onValueChange={setSelectedField}>
                    <SelectTrigger className="w-full lg:w-64 bg-dark-700 border-dark-600 text-dark-50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-700 border-dark-600">
                      {researchFields.map((field) => (
                        <SelectItem key={field} value={field} className="text-dark-50 focus:bg-dark-600">
                          {field}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Location Filter */}
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="w-full lg:w-48 bg-dark-700 border-dark-600 text-dark-50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-700 border-dark-600">
                      {locations.map((location) => (
                        <SelectItem key={location} value={location} className="text-dark-50 focus:bg-dark-600">
                          {location}
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
                Showing {sortedResearchers.length} of {researchers.length} researchers
              </p>
            </div>

            {/* Researchers Grid/List */}
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}>
              {sortedResearchers.map((researcher) => (
                <motion.div key={researcher.id} variants={fadeInUp} className={viewMode === "list" ? "w-full" : ""}>
                  <Card
                    className={`bg-dark-800/50 border-dark-700 hover:bg-dark-800/70 transition-all duration-300 overflow-hidden group hover:border-primary-500/30 ${
                      viewMode === "list" ? "flex" : ""
                    }`}
                  >
                    {/* Cover Image */}
                    <div className={`relative ${viewMode === "list" ? "w-64 flex-shrink-0" : ""}`}>
                      <img
                        src={researcher.coverImage || "/placeholder.svg"}
                        alt={`${researcher.name} lab`}
                        className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                          viewMode === "list" ? "w-full h-full" : "w-full h-32"
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
                      <div className="absolute top-4 left-4 flex gap-2">
                        {researcher.featured && (
                          <Badge className="bg-warning/20 text-warning border-warning/30">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                        {researcher.verified && (
                          <Badge className="bg-success/20 text-success border-success/30">Verified</Badge>
                        )}
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="bg-dark-900/80 rounded-full px-2 py-1 text-xs font-medium text-primary-400">
                          {researcher.reputationScore}/100
                        </div>
                      </div>
                    </div>

                    <div className="flex-1">
                      <CardHeader className={`relative ${viewMode === "list" ? "pb-2" : "-mt-12"} z-10`}>
                        <div className="flex items-start gap-4">
                          <Avatar className="w-16 h-16 border-2 border-dark-700">
                            <AvatarImage src={researcher.avatar || "/placeholder.svg"} alt={researcher.name} />
                            <AvatarFallback>
                              {researcher.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <CardTitle className="text-lg text-dark-50 mb-1">{researcher.name}</CardTitle>
                            <p className="text-sm text-primary-400 mb-1">{researcher.title}</p>
                            <div className="flex items-center text-sm text-dark-400 mb-2">
                              <MapPin className="w-3 h-3 mr-1" />
                              {researcher.institution} • {researcher.location}
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-accent-500/20 text-accent-300 border-accent-500/30 text-xs">
                                {researcher.field}
                              </Badge>
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  researcher.availability === "Available for collaboration"
                                    ? "bg-success"
                                    : "bg-warning"
                                }`}
                              />
                              <span className="text-xs text-dark-400">{researcher.availability}</span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <CardDescription className="text-dark-400 line-clamp-3">{researcher.bio}</CardDescription>

                        <div className="flex flex-wrap gap-2">
                          {researcher.specializations.slice(0, viewMode === "list" ? 6 : 3).map((spec, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs bg-secondary-500/20 text-secondary-300 border-secondary-500/30"
                            >
                              {spec}
                            </Badge>
                          ))}
                          {researcher.specializations.length > (viewMode === "list" ? 6 : 3) && (
                            <Badge variant="secondary" className="text-xs bg-dark-700 text-dark-400">
                              +{researcher.specializations.length - (viewMode === "list" ? 6 : 3)} more
                            </Badge>
                          )}
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-lg font-bold text-accent-400">{researcher.stats.publications}</div>
                            <div className="text-xs text-dark-400">Publications</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-secondary-400">{researcher.stats.citations}</div>
                            <div className="text-xs text-dark-400">Citations</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-success">{researcher.stats.hIndex}</div>
                            <div className="text-xs text-dark-400">H-Index</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-dark-400">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {researcher.stats.collaborators} collaborators
                          </div>
                          <div className="flex items-center">
                            <FileText className="w-4 h-4 mr-1" />
                            {researcher.stats.projects} active projects
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Link href={`/researchers/${researcher.id}`} className="flex-1">
                            <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white">
                              View Profile
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            className="border-accent-500 text-accent-400 hover:bg-accent-500/10 bg-transparent"
                          >
                            <Users className="w-4 h-4" />
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
                Load More Researchers
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
