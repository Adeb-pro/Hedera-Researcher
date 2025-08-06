"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, FileText, Eye, Download, Star, MessageCircle, Calendar } from "lucide-react"
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
  "Psychology",
]

const publicationTypes = [
  "All Types",
  "Research Article",
  "Review Paper",
  "Case Study",
  "Technical Report",
  "Conference Paper",
  "Preprint",
  "Dataset",
  "Protocol",
]

const sortOptions = [
  { value: "recent", label: "Most Recent" },
  { value: "citations", label: "Most Cited" },
  { value: "views", label: "Most Viewed" },
  { value: "downloads", label: "Most Downloaded" },
  { value: "rating", label: "Highest Rated" },
]

const statusOptions = ["All Status", "Published", "Under Review", "Preprint", "Accepted", "Revision Required"]

const publications = [
  {
    id: 1,
    title: "CRISPR-Cas9 Gene Editing for Duchenne Muscular Dystrophy: A Phase I Clinical Trial",
    authors: [
      { name: "Dr. Sarah Chen", institution: "Stanford University", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Dr. Michael Rodriguez", institution: "MIT", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Dr. Emily Watson", institution: "UC Berkeley", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    abstract:
      "This study presents the first Phase I clinical trial results for CRISPR-Cas9 gene editing therapy in patients with Duchenne Muscular Dystrophy (DMD). We demonstrate significant improvements in muscle function and dystrophin expression with minimal adverse effects.",
    journal: "Nature Medicine",
    category: "Medicine & Health Sciences",
    type: "Research Article",
    status: "Published",
    publishedDate: "2024-02-15",
    doi: "10.1038/s41591-024-0001-1",
    stats: {
      views: 2847,
      downloads: 1234,
      citations: 45,
      rating: 4.8,
      reviews: 12,
    },
    tags: ["CRISPR", "Gene Therapy", "Clinical Trial", "Muscular Dystrophy", "Biotechnology"],
    openAccess: true,
    featured: true,
    trending: true,
    peerReviewed: true,
    fundingSource: "NIH Grant R01-HD089458",
    keywords: ["CRISPR-Cas9", "Duchenne Muscular Dystrophy", "Gene Editing", "Clinical Trial", "Dystrophin"],
  },
  {
    id: 2,
    title: "Quantum Machine Learning Algorithms for Drug Discovery: A Comprehensive Review",
    authors: [
      { name: "Dr. Michael Rodriguez", institution: "MIT", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Dr. James Liu", institution: "Johns Hopkins", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    abstract:
      "We provide a comprehensive review of quantum machine learning algorithms and their applications in drug discovery, highlighting recent advances and future prospects in quantum-enhanced pharmaceutical research.",
    journal: "Nature Reviews Drug Discovery",
    category: "Computer Science",
    type: "Review Paper",
    status: "Published",
    publishedDate: "2024-01-28",
    doi: "10.1038/s41573-024-0001-2",
    stats: {
      views: 1923,
      downloads: 876,
      citations: 28,
      rating: 4.6,
      reviews: 8,
    },
    tags: ["Quantum Computing", "Machine Learning", "Drug Discovery", "Pharmaceutical", "AI"],
    openAccess: false,
    featured: true,
    trending: false,
    peerReviewed: true,
    fundingSource: "NSF Grant CCF-2048319",
    keywords: ["Quantum Machine Learning", "Drug Discovery", "Pharmaceutical Research", "Quantum Algorithms"],
  },
  {
    id: 3,
    title: "Sustainable Nanomaterials for Next-Generation Battery Technology",
    authors: [
      { name: "Dr. Emily Watson", institution: "UC Berkeley", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Dr. Maria Santos", institution: "Ocean Institute", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    abstract:
      "This research presents novel sustainable nanomaterials for advanced battery applications, demonstrating improved energy density and environmental compatibility compared to conventional materials.",
    journal: "Advanced Materials",
    category: "Materials Science",
    type: "Research Article",
    status: "Under Review",
    publishedDate: "2024-02-20",
    doi: "10.1002/adma.202400123",
    stats: {
      views: 1456,
      downloads: 623,
      citations: 12,
      rating: 4.4,
      reviews: 6,
    },
    tags: ["Nanomaterials", "Battery Technology", "Sustainability", "Energy Storage", "Green Chemistry"],
    openAccess: true,
    featured: false,
    trending: true,
    peerReviewed: true,
    fundingSource: "DOE Grant DE-SC0021234",
    keywords: ["Sustainable Nanomaterials", "Battery Technology", "Energy Storage", "Green Materials"],
  },
  {
    id: 4,
    title: "AI-Powered Early Cancer Detection Using Medical Imaging: A Multi-Center Study",
    authors: [
      { name: "Dr. James Liu", institution: "Johns Hopkins", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Dr. Alex Thompson", institution: "Harvard Medical", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    abstract:
      "We present a comprehensive multi-center study on AI-powered cancer detection systems, achieving 99.2% accuracy in early-stage cancer identification across multiple imaging modalities.",
    journal: "The Lancet Digital Health",
    category: "Medicine & Health Sciences",
    type: "Research Article",
    status: "Accepted",
    publishedDate: "2024-03-01",
    doi: "10.1016/S2589-7500(24)00001-3",
    stats: {
      views: 3241,
      downloads: 1567,
      citations: 67,
      rating: 4.9,
      reviews: 15,
    },
    tags: ["Artificial Intelligence", "Cancer Detection", "Medical Imaging", "Machine Learning", "Healthcare"],
    openAccess: true,
    featured: true,
    trending: true,
    peerReviewed: true,
    fundingSource: "NIH Grant R01-CA234567",
    keywords: ["AI", "Cancer Detection", "Medical Imaging", "Machine Learning", "Early Diagnosis"],
  },
  {
    id: 5,
    title: "Ocean Plastic Cleanup: Autonomous Robotic Systems for Marine Conservation",
    authors: [
      { name: "Dr. Maria Santos", institution: "Ocean Institute", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Dr. Emily Watson", institution: "UC Berkeley", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    abstract:
      "This study introduces autonomous robotic systems designed for large-scale ocean plastic cleanup, demonstrating effective debris collection and processing capabilities in marine environments.",
    journal: "Science Robotics",
    category: "Environmental Science",
    type: "Research Article",
    status: "Preprint",
    publishedDate: "2024-02-10",
    doi: "10.1126/scirobotics.abcd1234",
    stats: {
      views: 987,
      downloads: 445,
      citations: 8,
      rating: 4.3,
      reviews: 4,
    },
    tags: ["Robotics", "Ocean Cleanup", "Environmental Conservation", "Marine Biology", "Sustainability"],
    openAccess: true,
    featured: false,
    trending: false,
    peerReviewed: false,
    fundingSource: "Ocean Conservation Grant OC-2023-456",
    keywords: ["Ocean Cleanup", "Autonomous Robotics", "Marine Conservation", "Environmental Technology"],
  },
  {
    id: 6,
    title: "Brain-Computer Interface for Motor Function Recovery in Paralyzed Patients",
    authors: [
      { name: "Dr. Alex Thompson", institution: "Harvard Medical", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Dr. Sarah Chen", institution: "Stanford University", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    abstract:
      "We report successful implementation of advanced brain-computer interfaces that enable paralyzed patients to control robotic limbs with unprecedented precision and natural movement patterns.",
    journal: "Nature Neuroscience",
    category: "Medicine & Health Sciences",
    type: "Research Article",
    status: "Revision Required",
    publishedDate: "2024-01-15",
    doi: "10.1038/s41593-024-0001-4",
    stats: {
      views: 2156,
      downloads: 934,
      citations: 34,
      rating: 4.7,
      reviews: 9,
    },
    tags: ["Brain-Computer Interface", "Neuroscience", "Paralysis Recovery", "Neural Engineering", "Rehabilitation"],
    openAccess: false,
    featured: false,
    trending: true,
    peerReviewed: true,
    fundingSource: "NIH Grant R01-NS098765",
    keywords: ["Brain-Computer Interface", "Motor Recovery", "Neural Engineering", "Paralysis Treatment"],
  },
]

export default function PublicationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedType, setSelectedType] = useState("All Types")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [sortBy, setSortBy] = useState("recent")
  const [showFilters, setShowFilters] = useState(false)

  const filteredPublications = publications.filter((publication) => {
    const matchesSearch =
      publication.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      publication.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      publication.authors.some((author) => author.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      publication.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      publication.keywords.some((keyword) => keyword.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "All Categories" || publication.category === selectedCategory
    const matchesType = selectedType === "All Types" || publication.type === selectedType
    const matchesStatus = selectedStatus === "All Status" || publication.status === selectedStatus

    return matchesSearch && matchesCategory && matchesType && matchesStatus
  })

  const sortedPublications = [...filteredPublications].sort((a, b) => {
    switch (sortBy) {
      case "citations":
        return b.stats.citations - a.stats.citations
      case "views":
        return b.stats.views - a.stats.views
      case "downloads":
        return b.stats.downloads - a.stats.downloads
      case "rating":
        return b.stats.rating - a.stats.rating
      case "recent":
      default:
        return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-success/20 text-success border-success/30"
      case "Under Review":
        return "bg-warning/20 text-warning border-warning/30"
      case "Accepted":
        return "bg-primary-500/20 text-primary-400 border-primary-500/30"
      case "Preprint":
        return "bg-accent-500/20 text-accent-400 border-accent-500/30"
      case "Revision Required":
        return "bg-error/20 text-error border-error/30"
      default:
        return "bg-dark-700 text-dark-400 border-dark-600"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-dark-50">
      <ParticleBackground />

      <div className="container mx-auto px-4 py-8 pt-24">
        <motion.div className="max-w-7xl mx-auto" initial="initial" animate="animate" variants={staggerContainer}>
          {/* Header */}
          <motion.div className="mb-8" variants={fadeInUp}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">Research Publications</h1>
                <p className="text-dark-400 text-lg">
                  Discover the latest research papers, preprints, and academic publications
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex gap-3">
                <Link href="/publications/submit">
                  <Button className="bg-primary-600 hover:bg-primary-700 text-white">
                    <FileText className="w-4 h-4 mr-2" />
                    Submit Paper
                  </Button>
                </Link>
                <Link href="/publications/review">
                  <Button
                    variant="outline"
                    className="border-accent-500 text-accent-400 hover:bg-accent-500/10 bg-transparent"
                  >
                    Peer Review
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-dark-800/50 rounded-lg p-4 border border-dark-700">
                <div className="text-2xl font-bold text-primary-400">{publications.length}</div>
                <div className="text-dark-400 text-sm">Total Publications</div>
              </div>
              <div className="bg-dark-800/50 rounded-lg p-4 border border-dark-700">
                <div className="text-2xl font-bold text-success">
                  {publications.reduce((sum, p) => sum + p.stats.citations, 0)}
                </div>
                <div className="text-dark-400 text-sm">Total Citations</div>
              </div>
              <div className="bg-dark-800/50 rounded-lg p-4 border border-dark-700">
                <div className="text-2xl font-bold text-accent-400">
                  {publications.filter((p) => p.openAccess).length}
                </div>
                <div className="text-dark-400 text-sm">Open Access</div>
              </div>
              <div className="bg-dark-800/50 rounded-lg p-4 border border-dark-700">
                <div className="text-2xl font-bold text-secondary-400">
                  {Math.round((publications.reduce((sum, p) => sum + p.stats.rating, 0) / publications.length) * 10) /
                    10}
                </div>
                <div className="text-dark-400 text-sm">Avg Rating</div>
              </div>
            </div>
          </motion.div>

          {/* Search and Filters */}
          <motion.div className="mb-8" variants={fadeInUp}>
            <Card className="bg-dark-800/50 border-dark-700">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 w-4 h-4" />
                    <Input
                      placeholder="Search publications, authors, keywords, or DOI..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
                    />
                  </div>

                  {/* Filters */}
                  <div className="flex flex-col lg:flex-row gap-4">
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

                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger className="w-full lg:w-48 bg-dark-700 border-dark-600 text-dark-50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-dark-700 border-dark-600">
                        {publicationTypes.map((type) => (
                          <SelectItem key={type} value={type} className="text-dark-50 focus:bg-dark-600">
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-full lg:w-48 bg-dark-700 border-dark-600 text-dark-50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-dark-700 border-dark-600">
                        {statusOptions.map((status) => (
                          <SelectItem key={status} value={status} className="text-dark-50 focus:bg-dark-600">
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full lg:w-48 bg-dark-700 border-dark-600 text-dark-50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-dark-700 border-dark-600">
                        {sortOptions.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            className="text-dark-50 focus:bg-dark-600"
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results */}
          <motion.div variants={fadeInUp}>
            <div className="flex items-center justify-between mb-6">
              <p className="text-dark-400">
                Showing {sortedPublications.length} of {publications.length} publications
              </p>
            </div>

            {/* Publications List */}
            <div className="space-y-6">
              {sortedPublications.map((publication) => (
                <motion.div key={publication.id} variants={fadeInUp}>
                  <Card className="bg-dark-800/50 border-dark-700 hover:bg-dark-800/70 transition-all duration-300 hover:border-primary-500/30">
                    <CardHeader>
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                {publication.featured && (
                                  <Badge className="bg-warning/20 text-warning border-warning/30">Featured</Badge>
                                )}
                                {publication.trending && (
                                  <Badge className="bg-success/20 text-success border-success/30">Trending</Badge>
                                )}
                                {publication.openAccess && (
                                  <Badge className="bg-accent-500/20 text-accent-400 border-accent-500/30">
                                    Open Access
                                  </Badge>
                                )}
                                {publication.peerReviewed && (
                                  <Badge className="bg-primary-500/20 text-primary-400 border-primary-500/30">
                                    Peer Reviewed
                                  </Badge>
                                )}
                              </div>
                              <CardTitle className="text-xl text-dark-50 mb-2 line-clamp-2">
                                {publication.title}
                              </CardTitle>
                              <div className="flex items-center gap-2 mb-3">
                                <Badge className={`text-xs ${getStatusColor(publication.status)}`}>
                                  {publication.status}
                                </Badge>
                                <Badge className="bg-primary-600 text-white text-xs">{publication.type}</Badge>
                                <Badge className="bg-secondary-500/20 text-secondary-300 border-secondary-500/30 text-xs">
                                  {publication.category}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          {/* Authors */}
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-sm text-dark-400">Authors:</span>
                            <div className="flex items-center gap-2">
                              {publication.authors.slice(0, 3).map((author, index) => (
                                <div key={index} className="flex items-center gap-1">
                                  <Avatar className="w-6 h-6">
                                    <AvatarImage src={author.avatar || "/placeholder.svg"} alt={author.name} />
                                    <AvatarFallback className="text-xs">
                                      {author.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm text-primary-400">{author.name}</span>
                                  {index < Math.min(publication.authors.length, 3) - 1 && (
                                    <span className="text-dark-500">,</span>
                                  )}
                                </div>
                              ))}
                              {publication.authors.length > 3 && (
                                <span className="text-sm text-dark-400">+{publication.authors.length - 3} more</span>
                              )}
                            </div>
                          </div>

                          {/* Journal and Date */}
                          <div className="flex items-center gap-4 text-sm text-dark-400 mb-3">
                            <span className="text-accent-400 font-medium">{publication.journal}</span>
                            <div className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {new Date(publication.publishedDate).toLocaleDateString()}
                            </div>
                            <span>DOI: {publication.doi}</span>
                          </div>

                          {/* Abstract */}
                          <CardDescription className="text-dark-400 line-clamp-3 mb-4">
                            {publication.abstract}
                          </CardDescription>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {publication.tags.slice(0, 5).map((tag, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs bg-dark-700 text-dark-300 border-dark-600"
                              >
                                {tag}
                              </Badge>
                            ))}
                            {publication.tags.length > 5 && (
                              <Badge variant="secondary" className="text-xs bg-dark-700 text-dark-400">
                                +{publication.tags.length - 5} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Stats Sidebar */}
                        <div className="lg:w-80 space-y-4">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="text-center p-3 bg-dark-700/30 rounded-lg">
                              <div className="text-lg font-bold text-accent-400">{publication.stats.views}</div>
                              <div className="text-xs text-dark-400">Views</div>
                            </div>
                            <div className="text-center p-3 bg-dark-700/30 rounded-lg">
                              <div className="text-lg font-bold text-success">{publication.stats.downloads}</div>
                              <div className="text-xs text-dark-400">Downloads</div>
                            </div>
                            <div className="text-center p-3 bg-dark-700/30 rounded-lg">
                              <div className="text-lg font-bold text-secondary-400">{publication.stats.citations}</div>
                              <div className="text-xs text-dark-400">Citations</div>
                            </div>
                            <div className="text-center p-3 bg-dark-700/30 rounded-lg">
                              <div className="flex items-center justify-center gap-1">
                                <Star className="w-4 h-4 text-warning fill-current" />
                                <span className="text-lg font-bold text-warning">{publication.stats.rating}</span>
                              </div>
                              <div className="text-xs text-dark-400">{publication.stats.reviews} reviews</div>
                            </div>
                          </div>

                          {publication.fundingSource && (
                            <div className="p-3 bg-dark-700/30 rounded-lg">
                              <div className="text-xs text-dark-400 mb-1">Funding</div>
                              <div className="text-sm text-dark-300">{publication.fundingSource}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link href={`/publications/${publication.id}`} className="flex-1">
                          <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white">
                            <Eye className="w-4 h-4 mr-2" />
                            View Full Paper
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          className="border-success/30 text-success hover:bg-success/10 bg-transparent"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </Button>
                        <Button
                          variant="outline"
                          className="border-accent-500 text-accent-400 hover:bg-accent-500/10 bg-transparent"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Discuss
                        </Button>
                        <Button
                          variant="outline"
                          className="border-dark-600 text-dark-400 hover:bg-dark-700 bg-transparent"
                        >
                          Cite
                        </Button>
                      </div>
                    </CardContent>
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
                Load More Publications
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
