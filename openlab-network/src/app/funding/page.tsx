"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, DollarSign, TrendingUp, Target, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
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

const fundingTypes = [
  "All Types",
  "Research Grants",
  "Innovation Funds",
  "Startup Capital",
  "Equipment Funding",
  "Travel Grants",
  "Conference Support",
  "Publication Fees",
]

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
  { value: "amount", label: "Funding Amount" },
  { value: "deadline", label: "Application Deadline" },
  { value: "success", label: "Success Rate" },
  { value: "recent", label: "Recently Added" },
]

const fundingOpportunities = [
  {
    id: 1,
    title: "NIH Early Career Research Grant",
    organization: "National Institutes of Health",
    type: "Research Grants",
    category: "Medicine & Health Sciences",
    amount: { min: 50000, max: 250000 },
    duration: "3 years",
    deadline: "2024-04-15",
    applicants: 156,
    successRate: 18,
    description:
      "Supporting early-career researchers in biomedical sciences with innovative research projects that have potential for significant impact on human health.",
    requirements: [
      "PhD or equivalent degree",
      "Less than 7 years post-graduation",
      "Independent research position",
      "US citizenship or permanent residency",
    ],
    tags: ["Early Career", "Biomedical", "Innovation", "Health"],
    featured: true,
    trending: true,
  },
  {
    id: 2,
    title: "NSF CAREER Award",
    organization: "National Science Foundation",
    type: "Research Grants",
    category: "All Categories",
    amount: { min: 400000, max: 500000 },
    duration: "5 years",
    deadline: "2024-03-20",
    applicants: 234,
    successRate: 22,
    description:
      "Faculty early career development program that offers prestigious awards in support of junior faculty who exemplify the role of teacher-scholars.",
    requirements: [
      "Tenure-track faculty position",
      "PhD in relevant field",
      "US citizenship or permanent residency",
      "Integrated research and education plan",
    ],
    tags: ["Faculty", "Education", "Research", "Career Development"],
    featured: true,
    trending: false,
  },
  {
    id: 3,
    title: "Gates Foundation Global Health Innovation",
    organization: "Bill & Melinda Gates Foundation",
    type: "Innovation Funds",
    category: "Medicine & Health Sciences",
    amount: { min: 100000, max: 1000000 },
    duration: "2-4 years",
    deadline: "2024-05-30",
    applicants: 89,
    successRate: 12,
    description:
      "Supporting breakthrough innovations that can improve health outcomes for the world's most vulnerable populations in developing countries.",
    requirements: [
      "Innovative health solution",
      "Global health impact potential",
      "Scalable technology or approach",
      "Strong implementation plan",
    ],
    tags: ["Global Health", "Innovation", "Impact", "Developing Countries"],
    featured: true,
    trending: true,
  },
  {
    id: 4,
    title: "DOE Clean Energy Research Initiative",
    organization: "Department of Energy",
    type: "Research Grants",
    category: "Environmental Science",
    amount: { min: 200000, max: 800000 },
    duration: "3-5 years",
    deadline: "2024-06-10",
    applicants: 67,
    successRate: 25,
    description:
      "Funding innovative research projects focused on clean energy technologies, renewable energy systems, and sustainable energy solutions.",
    requirements: [
      "Research institution affiliation",
      "Clean energy focus",
      "Technical feasibility demonstration",
      "Environmental impact assessment",
    ],
    tags: ["Clean Energy", "Sustainability", "Technology", "Environment"],
    featured: false,
    trending: true,
  },
  {
    id: 5,
    title: "European Research Council Starting Grant",
    organization: "European Research Council",
    type: "Research Grants",
    category: "All Categories",
    amount: { min: 1000000, max: 1500000 },
    duration: "5 years",
    deadline: "2024-03-28",
    applicants: 312,
    successRate: 14,
    description:
      "Supporting excellent principal investigators at the career stage at which they are starting their own independent research team or programme.",
    requirements: [
      "2-7 years since PhD completion",
      "European research institution",
      "Independent research project",
      "Excellent track record",
    ],
    tags: ["European", "Independent Research", "Excellence", "Starting Career"],
    featured: false,
    trending: false,
  },
  {
    id: 6,
    title: "DARPA Young Faculty Award",
    organization: "Defense Advanced Research Projects Agency",
    type: "Research Grants",
    category: "Engineering",
    amount: { min: 500000, max: 750000 },
    duration: "2 years",
    deadline: "2024-04-05",
    applicants: 45,
    successRate: 20,
    description:
      "Identifying and engaging rising research stars in junior faculty positions at US academic institutions in areas of interest to DARPA.",
    requirements: [
      "Untenured faculty position",
      "US academic institution",
      "Defense-relevant research",
      "Innovative approach",
    ],
    tags: ["Defense", "Faculty", "Innovation", "Technology"],
    featured: false,
    trending: false,
  },
]

export default function FundingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("All Types")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [sortBy, setSortBy] = useState("amount")

  const filteredOpportunities = fundingOpportunities.filter((opportunity) => {
    const matchesSearch =
      opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opportunity.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opportunity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opportunity.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesType = selectedType === "All Types" || opportunity.type === selectedType
    const matchesCategory = selectedCategory === "All Categories" || opportunity.category === selectedCategory

    return matchesSearch && matchesType && matchesCategory
  })

  const sortedOpportunities = [...filteredOpportunities].sort((a, b) => {
    switch (sortBy) {
      case "amount":
        return b.amount.max - a.amount.max
      case "deadline":
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      case "success":
        return b.successRate - a.successRate
      case "recent":
      default:
        return b.id - a.id
    }
  })

  const calculateDaysLeft = (deadline: string) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - today.getTime()
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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">Funding Opportunities</h1>
                <p className="text-dark-400 text-lg">
                  Discover grants, awards, and funding sources for your research projects
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link href="/funding/submit">
                  <Button className="bg-primary-600 hover:bg-primary-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Submit Opportunity
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-dark-800/50 rounded-lg p-4 border border-dark-700">
                <div className="text-2xl font-bold text-primary-400">{fundingOpportunities.length}</div>
                <div className="text-dark-400 text-sm">Active Opportunities</div>
              </div>
              <div className="bg-dark-800/50 rounded-lg p-4 border border-dark-700">
                <div className="text-2xl font-bold text-success">
                  ${(fundingOpportunities.reduce((sum, f) => sum + f.amount.max, 0) / 1000000).toFixed(1)}M
                </div>
                <div className="text-dark-400 text-sm">Total Available</div>
              </div>
              <div className="bg-dark-800/50 rounded-lg p-4 border border-dark-700">
                <div className="text-2xl font-bold text-accent-400">
                  {Math.round(
                    fundingOpportunities.reduce((sum, f) => sum + f.successRate, 0) / fundingOpportunities.length,
                  )}
                  %
                </div>
                <div className="text-dark-400 text-sm">Avg Success Rate</div>
              </div>
              <div className="bg-dark-800/50 rounded-lg p-4 border border-dark-700">
                <div className="text-2xl font-bold text-secondary-400">{fundingTypes.length - 1}</div>
                <div className="text-dark-400 text-sm">Funding Types</div>
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
                      placeholder="Search funding opportunities, organizations, or keywords..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
                    />
                  </div>

                  {/* Type Filter */}
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-full lg:w-48 bg-dark-700 border-dark-600 text-dark-50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-700 border-dark-600">
                      {fundingTypes.map((type) => (
                        <SelectItem key={type} value={type} className="text-dark-50 focus:bg-dark-600">
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

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
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results */}
          <motion.div variants={fadeInUp}>
            <div className="flex items-center justify-between mb-6">
              <p className="text-dark-400">
                Showing {sortedOpportunities.length} of {fundingOpportunities.length} opportunities
              </p>
            </div>

            {/* Funding Opportunities */}
            <div className="space-y-6">
              {sortedOpportunities.map((opportunity) => {
                const daysLeft = calculateDaysLeft(opportunity.deadline)
                return (
                  <motion.div key={opportunity.id} variants={fadeInUp}>
                    <Card className="bg-dark-800/50 border-dark-700 hover:bg-dark-800/70 transition-all duration-300 hover:border-primary-500/30">
                      <CardHeader>
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <CardTitle className="text-xl text-dark-50 mb-2">{opportunity.title}</CardTitle>
                                <p className="text-primary-400 font-medium mb-2">{opportunity.organization}</p>
                                <CardDescription className="text-dark-400 line-clamp-2">
                                  {opportunity.description}
                                </CardDescription>
                              </div>
                              <div className="flex flex-col gap-2 ml-4">
                                {opportunity.featured && (
                                  <Badge className="bg-warning/20 text-warning border-warning/30">Featured</Badge>
                                )}
                                {opportunity.trending && (
                                  <Badge className="bg-success/20 text-success border-success/30">
                                    <TrendingUp className="w-3 h-3 mr-1" />
                                    Trending
                                  </Badge>
                                )}
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                              <Badge className="bg-primary-600 text-white">{opportunity.type}</Badge>
                              <Badge className="bg-accent-500/20 text-accent-300 border-accent-500/30">
                                {opportunity.category}
                              </Badge>
                              {opportunity.tags.slice(0, 3).map((tag, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="bg-secondary-500/20 text-secondary-300 border-secondary-500/30"
                                >
                                  {tag}
                                </Badge>
                              ))}
                              {opportunity.tags.length > 3 && (
                                <Badge variant="secondary" className="bg-dark-700 text-dark-400">
                                  +{opportunity.tags.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div className="lg:w-80 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="text-center p-3 bg-dark-700/30 rounded-lg">
                                <div className="text-lg font-bold text-success">
                                  ${opportunity.amount.min.toLocaleString()} - $
                                  {opportunity.amount.max.toLocaleString()}
                                </div>
                                <div className="text-xs text-dark-400">Funding Range</div>
                              </div>
                              <div className="text-center p-3 bg-dark-700/30 rounded-lg">
                                <div className="text-lg font-bold text-primary-400">{opportunity.duration}</div>
                                <div className="text-xs text-dark-400">Duration</div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-dark-400">Application Deadline</span>
                                <span
                                  className={`font-medium ${
                                    daysLeft <= 7 ? "text-error" : daysLeft <= 30 ? "text-warning" : "text-dark-50"
                                  }`}
                                >
                                  {daysLeft > 0 ? `${daysLeft} days left` : "Deadline passed"}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-dark-400">Success Rate</span>
                                <span className="text-accent-400 font-medium">{opportunity.successRate}%</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-dark-400">Applicants</span>
                                <span className="text-dark-50">{opportunity.applicants}</span>
                              </div>
                            </div>

                            <Progress value={opportunity.successRate} className="h-2" />
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-semibold text-dark-50 mb-2">Key Requirements</h4>
                            <ul className="space-y-1">
                              {opportunity.requirements.slice(0, 3).map((req, index) => (
                                <li key={index} className="flex items-start text-sm text-dark-400">
                                  <Target className="w-3 h-3 mr-2 mt-1 text-primary-400 flex-shrink-0" />
                                  {req}
                                </li>
                              ))}
                              {opportunity.requirements.length > 3 && (
                                <li className="text-sm text-dark-500 ml-5">
                                  +{opportunity.requirements.length - 3} more requirements
                                </li>
                              )}
                            </ul>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-3">
                            <Link href={`/funding/${opportunity.id}`} className="flex-1">
                              <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white">
                                View Details
                              </Button>
                            </Link>
                            <Button
                              variant="outline"
                              className="border-success/30 text-success hover:bg-success/10 bg-transparent"
                            >
                              <DollarSign className="w-4 h-4 mr-2" />
                              Apply Now
                            </Button>
                            <Button
                              variant="outline"
                              className="border-dark-600 text-dark-400 hover:bg-dark-700 bg-transparent"
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button
                variant="outline"
                className="border-accent-500 text-accent-400 hover:bg-accent-500/10 bg-transparent px-8"
              >
                Load More Opportunities
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
