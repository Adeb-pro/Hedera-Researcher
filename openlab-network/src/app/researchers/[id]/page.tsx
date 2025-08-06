"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Globe,
  MessageCircle,
  UserPlus,
  Share2,
  Award,
  BookOpen,
  Users,
  Beaker,
  Star,
  ExternalLink,
  Mail,
  Phone,
  Linkedin,
  Twitter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

// Mock researcher data - in real app, this would come from API
const researcher = {
  id: 1,
  name: "Dr. Sarah Chen",
  title: "Professor of Genetics",
  institution: "Stanford University",
  department: "Department of Genetics",
  location: "Stanford, CA",
  avatar: "/placeholder.svg?height=120&width=120",
  coverImage: "/stanford-genetics-lab.png",
  field: "Biology & Life Sciences",
  specializations: ["Gene Therapy", "CRISPR", "Rare Diseases", "Pediatric Genetics", "Molecular Biology"],
  bio: "Dr. Sarah Chen is a leading researcher in gene therapy with over 15 years of experience in CRISPR technology and rare disease treatment. Her groundbreaking work has led to several breakthrough therapies currently in clinical trials. She has published over 50 papers in top-tier journals and has been recognized with numerous awards for her contributions to genetics research.",
  detailedBio: `Dr. Chen received her Ph.D. in Genetics from Harvard University in 2008 and completed her postdoctoral training at the Broad Institute. She joined Stanford University in 2012 and was promoted to full professor in 2020.

Her research focuses on developing precise gene editing techniques using CRISPR-Cas9 technology to treat rare genetic disorders. Her lab has made significant contributions to understanding the mechanisms of gene editing and developing safer, more effective therapeutic approaches.

Dr. Chen is particularly passionate about translating basic research into clinical applications that can help patients with rare diseases. She has been involved in several clinical trials and has worked closely with patient advocacy groups to ensure that research priorities align with patient needs.`,
  stats: {
    publications: 47,
    citations: 2340,
    hIndex: 28,
    projects: 3,
    collaborators: 156,
    funding: 450000,
    students: 12,
    patents: 8,
  },
  reputationScore: 94,
  verified: true,
  featured: true,
  joinedDate: "2019-03-15",
  lastActive: "2 hours ago",
  availability: "Available for collaboration",
  languages: ["English", "Mandarin"],
  awards: [
    {
      name: "NIH Early Career Award",
      year: "2015",
      description: "For outstanding contributions to gene therapy research",
    },
    {
      name: "Genetics Society Medal",
      year: "2020",
      description: "Recognition for excellence in genetic research",
    },
    {
      name: "Stanford Teaching Excellence Award",
      year: "2019",
      description: "For exceptional teaching in graduate genetics courses",
    },
  ],
  education: [
    {
      degree: "Ph.D. in Genetics",
      institution: "Harvard University",
      year: "2008",
      description: "Dissertation: 'Mechanisms of DNA Repair in Rare Genetic Disorders'",
    },
    {
      degree: "B.S. in Biology",
      institution: "MIT",
      year: "2003",
      description: "Magna Cum Laude, Phi Beta Kappa",
    },
  ],
  experience: [
    {
      position: "Professor of Genetics",
      institution: "Stanford University",
      period: "2020 - Present",
      description: "Leading research in gene therapy and CRISPR technology",
    },
    {
      position: "Associate Professor",
      institution: "Stanford University",
      period: "2016 - 2020",
      description: "Established independent research program in gene editing",
    },
    {
      position: "Assistant Professor",
      institution: "Stanford University",
      period: "2012 - 2016",
      description: "Started research lab focusing on rare disease genetics",
    },
    {
      position: "Postdoctoral Fellow",
      institution: "Broad Institute",
      period: "2008 - 2012",
      description: "Research in CRISPR technology and gene editing mechanisms",
    },
  ],
  recentPublications: [
    {
      title: "CRISPR-Cas9 Gene Editing for Duchenne Muscular Dystrophy: A Phase I Clinical Trial",
      journal: "Nature Medicine",
      year: "2024",
      citations: 45,
      doi: "10.1038/s41591-024-0001-1",
    },
    {
      title: "Improved Delivery Systems for Gene Therapy in Rare Diseases",
      journal: "Cell",
      year: "2023",
      citations: 128,
      doi: "10.1016/j.cell.2023.01.001",
    },
    {
      title: "Safety and Efficacy of CRISPR-Based Therapies: A Comprehensive Review",
      journal: "Science",
      year: "2023",
      citations: 89,
      doi: "10.1126/science.abc1234",
    },
  ],
  activeProjects: [
    {
      id: 1,
      title: "CRISPR Gene Therapy for Rare Diseases",
      role: "Principal Investigator",
      funding: 200000,
      status: "Active",
      collaborators: 8,
    },
    {
      id: 2,
      title: "Novel Gene Delivery Systems",
      role: "Co-Investigator",
      funding: 150000,
      status: "Active",
      collaborators: 12,
    },
    {
      id: 3,
      title: "Pediatric Gene Therapy Clinical Trial",
      role: "Principal Investigator",
      funding: 100000,
      status: "Planning",
      collaborators: 6,
    },
  ],
  collaborators: [
    {
      name: "Dr. Michael Rodriguez",
      institution: "MIT",
      field: "Computer Science",
      avatar: "/placeholder.svg?height=40&width=40",
      projects: 2,
    },
    {
      name: "Dr. Emily Watson",
      institution: "UC Berkeley",
      field: "Materials Science",
      avatar: "/placeholder.svg?height=40&width=40",
      projects: 1,
    },
    {
      name: "Dr. James Liu",
      institution: "Johns Hopkins",
      field: "Medicine",
      avatar: "/placeholder.svg?height=40&width=40",
      projects: 3,
    },
  ],
  contact: {
    email: "sarah.chen@stanford.edu",
    phone: "+1 (650) 123-4567",
    office: "Genetics Building, Room 301",
    website: "https://genetics.stanford.edu/chen-lab",
    linkedin: "https://linkedin.com/in/sarahchen-genetics",
    twitter: "https://twitter.com/DrSarahChen",
  },
  interests: [
    "Gene Therapy",
    "CRISPR Technology",
    "Rare Disease Research",
    "Clinical Translation",
    "Pediatric Genetics",
    "Molecular Biology",
    "Bioethics",
    "Science Communication",
  ],
}

export default function ResearcherProfile() {
  const [activeTab, setActiveTab] = useState("overview")
  const [following, setFollowing] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-dark-50">
      <ParticleBackground />

      <div className="container mx-auto px-4 py-8 pt-24">
        <motion.div className="max-w-7xl mx-auto" initial="initial" animate="animate" variants={staggerContainer}>
          {/* Back Button */}
          <motion.div className="mb-6" variants={fadeInUp}>
            <Link href="/researchers" className="inline-flex items-center text-accent-400 hover:text-accent-300">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Researchers
            </Link>
          </motion.div>

          {/* Profile Header */}
          <motion.div className="mb-8" variants={fadeInUp}>
            <div className="relative rounded-xl overflow-hidden mb-6">
              <img
                src={researcher.coverImage || "/placeholder.svg"}
                alt={`${researcher.name} lab`}
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex flex-col md:flex-row md:items-end gap-6">
                  <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-dark-700">
                    <AvatarImage src={researcher.avatar || "/placeholder.svg"} alt={researcher.name} />
                    <AvatarFallback className="text-2xl">
                      {researcher.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {researcher.featured && (
                        <Badge className="bg-warning/20 text-warning border-warning/30">
                          <Star className="w-3 h-3 mr-1" />
                          Featured Researcher
                        </Badge>
                      )}
                      {researcher.verified && (
                        <Badge className="bg-success/20 text-success border-success/30">Verified</Badge>
                      )}
                      <Badge className="bg-primary-600 text-white">{researcher.field}</Badge>
                      <Badge className="bg-accent-500/20 text-accent-400 border-accent-500/30">
                        Reputation: {researcher.reputationScore}/100
                      </Badge>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">{researcher.name}</h1>
                    <p className="text-xl text-primary-400 mb-2">{researcher.title}</p>
                    <div className="flex flex-wrap items-center gap-4 text-dark-300">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {researcher.institution} • {researcher.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Joined {new Date(researcher.joinedDate).getFullYear()}
                      </div>
                      <div className="flex items-center">
                        <div
                          className={`w-2 h-2 rounded-full mr-2 ${
                            researcher.availability === "Available for collaboration" ? "bg-success" : "bg-warning"
                          }`}
                        />
                        {researcher.availability}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Action Buttons */}
              <motion.div variants={fadeInUp}>
                <div className="flex flex-wrap gap-3 mb-6">
                  <Button className="bg-primary-600 hover:bg-primary-700 text-white">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setFollowing(!following)}
                    className={`${
                      following
                        ? "border-success text-success hover:bg-success/10"
                        : "border-accent-500 text-accent-400 hover:bg-accent-500/10"
                    } bg-transparent`}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    {following ? "Following" : "Follow"}
                  </Button>
                  <Button
                    variant="outline"
                    className="border-secondary-500 text-secondary-400 hover:bg-secondary-500/10 bg-transparent"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Collaborate
                  </Button>
                  <Button variant="outline" className="border-dark-600 text-dark-400 hover:bg-dark-700 bg-transparent">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Profile
                  </Button>
                </div>
              </motion.div>

              {/* Tabs */}
              <motion.div variants={fadeInUp}>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-5 bg-dark-800 border-dark-700">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-primary-600">
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="research" className="data-[state=active]:bg-primary-600">
                      Research
                    </TabsTrigger>
                    <TabsTrigger value="publications" className="data-[state=active]:bg-primary-600">
                      Publications
                    </TabsTrigger>
                    <TabsTrigger value="collaborations" className="data-[state=active]:bg-primary-600">
                      Network
                    </TabsTrigger>
                    <TabsTrigger value="background" className="data-[state=active]:bg-primary-600">
                      Background
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-6">
                    <Card className="bg-dark-800/50 border-dark-700">
                      <CardHeader>
                        <CardTitle className="text-xl text-dark-50">About</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <p className="text-dark-300 leading-relaxed">{researcher.bio}</p>

                        <div>
                          <h3 className="text-lg font-semibold mb-3 text-dark-50">Research Interests</h3>
                          <div className="flex flex-wrap gap-2">
                            {researcher.interests.map((interest, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="bg-accent-500/20 text-accent-300 border-accent-500/30"
                              >
                                {interest}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-3 text-dark-50">Specializations</h3>
                          <div className="flex flex-wrap gap-2">
                            {researcher.specializations.map((spec, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="bg-secondary-500/20 text-secondary-300 border-secondary-500/30"
                              >
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-3 text-dark-50">Languages</h3>
                          <div className="flex gap-2">
                            {researcher.languages.map((language, index) => (
                              <Badge key={index} className="bg-primary-600 text-white">
                                {language}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="research" className="mt-6">
                    <div className="space-y-6">
                      <Card className="bg-dark-800/50 border-dark-700">
                        <CardHeader>
                          <CardTitle className="text-xl text-dark-50">Active Research Projects</CardTitle>
                          <CardDescription className="text-dark-400">
                            Current research initiatives and collaborations
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {researcher.activeProjects.map((project) => (
                              <div
                                key={project.id}
                                className="p-4 bg-dark-700/30 rounded-lg border border-dark-600 hover:border-primary-500/30 transition-all duration-300"
                              >
                                <div className="flex items-start justify-between mb-3">
                                  <div>
                                    <h3 className="font-semibold text-dark-50 mb-1">{project.title}</h3>
                                    <p className="text-sm text-primary-400">{project.role}</p>
                                  </div>
                                  <Badge
                                    className={`text-xs ${
                                      project.status === "Active"
                                        ? "bg-success/20 text-success border-success/30"
                                        : "bg-warning/20 text-warning border-warning/30"
                                    }`}
                                  >
                                    {project.status}
                                  </Badge>
                                </div>
                                <div className="flex items-center justify-between text-sm text-dark-400">
                                  <span>Funding: ${project.funding.toLocaleString()}</span>
                                  <span>{project.collaborators} collaborators</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-dark-800/50 border-dark-700">
                        <CardHeader>
                          <CardTitle className="text-xl text-dark-50">Awards & Recognition</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {researcher.awards.map((award, index) => (
                              <div key={index} className="flex items-start space-x-4">
                                <div className="w-10 h-10 bg-warning/20 rounded-full flex items-center justify-center flex-shrink-0">
                                  <Award className="w-5 h-5 text-warning" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-semibold text-dark-50">{award.name}</h3>
                                  <p className="text-sm text-primary-400 mb-1">{award.year}</p>
                                  <p className="text-sm text-dark-400">{award.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="publications" className="mt-6">
                    <Card className="bg-dark-800/50 border-dark-700">
                      <CardHeader>
                        <CardTitle className="text-xl text-dark-50">Recent Publications</CardTitle>
                        <CardDescription className="text-dark-400">
                          Latest research publications and papers
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {researcher.recentPublications.map((publication, index) => (
                            <div key={index} className="border-b border-dark-700 pb-6 last:border-b-0">
                              <h3 className="font-semibold text-dark-50 mb-2">{publication.title}</h3>
                              <div className="flex items-center gap-4 text-sm text-dark-400 mb-2">
                                <span className="text-primary-400">{publication.journal}</span>
                                <span>{publication.year}</span>
                                <span>{publication.citations} citations</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="bg-dark-700 text-dark-300 text-xs">
                                  DOI: {publication.doi}
                                </Badge>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-accent-400 hover:text-accent-300 hover:bg-accent-500/10"
                                >
                                  <ExternalLink className="w-3 h-3 mr-1" />
                                  View Paper
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="collaborations" className="mt-6">
                    <Card className="bg-dark-800/50 border-dark-700">
                      <CardHeader>
                        <CardTitle className="text-xl text-dark-50">Research Network</CardTitle>
                        <CardDescription className="text-dark-400">
                          Key collaborators and research partners
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {researcher.collaborators.map((collaborator, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-4 p-4 bg-dark-700/30 rounded-lg border border-dark-600 hover:border-primary-500/30 transition-all duration-300"
                            >
                              <Avatar className="w-12 h-12">
                                <AvatarImage src={collaborator.avatar || "/placeholder.svg"} alt={collaborator.name} />
                                <AvatarFallback>
                                  {collaborator.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <h3 className="font-semibold text-dark-50">{collaborator.name}</h3>
                                <p className="text-sm text-primary-400 mb-1">{collaborator.institution}</p>
                                <div className="flex items-center justify-between">
                                  <Badge className="bg-accent-500/20 text-accent-300 border-accent-500/30 text-xs">
                                    {collaborator.field}
                                  </Badge>
                                  <span className="text-xs text-dark-400">{collaborator.projects} projects</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="background" className="mt-6">
                    <div className="space-y-6">
                      <Card className="bg-dark-800/50 border-dark-700">
                        <CardHeader>
                          <CardTitle className="text-xl text-dark-50">Education</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {researcher.education.map((edu, index) => (
                              <div key={index} className="flex items-start space-x-4">
                                <div className="w-10 h-10 bg-primary-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                  <BookOpen className="w-5 h-5 text-primary-400" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-semibold text-dark-50">{edu.degree}</h3>
                                  <p className="text-sm text-primary-400 mb-1">
                                    {edu.institution} • {edu.year}
                                  </p>
                                  <p className="text-sm text-dark-400">{edu.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-dark-800/50 border-dark-700">
                        <CardHeader>
                          <CardTitle className="text-xl text-dark-50">Professional Experience</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {researcher.experience.map((exp, index) => (
                              <div key={index} className="flex items-start space-x-4">
                                <div className="w-10 h-10 bg-secondary-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                  <Beaker className="w-5 h-5 text-secondary-400" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-semibold text-dark-50">{exp.position}</h3>
                                  <p className="text-sm text-secondary-400 mb-1">
                                    {exp.institution} • {exp.period}
                                  </p>
                                  <p className="text-sm text-dark-400">{exp.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Stats */}
              <motion.div variants={fadeInUp}>
                <Card className="bg-dark-800/50 border-dark-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-dark-50">Research Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-accent-400">{researcher.stats.publications}</div>
                        <div className="text-xs text-dark-400">Publications</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-secondary-400">{researcher.stats.citations}</div>
                        <div className="text-xs text-dark-400">Citations</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-success">{researcher.stats.hIndex}</div>
                        <div className="text-xs text-dark-400">H-Index</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-warning">{researcher.stats.patents}</div>
                        <div className="text-xs text-dark-400">Patents</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary-400">{researcher.stats.projects}</div>
                        <div className="text-xs text-dark-400">Active Projects</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-accent-400">{researcher.stats.students}</div>
                        <div className="text-xs text-dark-400">Students</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Information */}
              <motion.div variants={fadeInUp}>
                <Card className="bg-dark-800/50 border-dark-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-dark-50">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-primary-400" />
                      <a
                        href={`mailto:${researcher.contact.email}`}
                        className="text-sm text-dark-300 hover:text-accent-400 transition-colors"
                      >
                        {researcher.contact.email}
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-primary-400" />
                      <span className="text-sm text-dark-300">{researcher.contact.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-primary-400" />
                      <span className="text-sm text-dark-300">{researcher.contact.office}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Globe className="w-4 h-4 text-primary-400" />
                      <a
                        href={researcher.contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-dark-300 hover:text-accent-400 transition-colors"
                      >
                        Lab Website
                      </a>
                    </div>
                    <div className="flex space-x-3 pt-2">
                      <a
                        href={researcher.contact.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-400 hover:text-primary-300 transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a
                        href={researcher.contact.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-400 hover:text-primary-300 transition-colors"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Activity Status */}
              <motion.div variants={fadeInUp}>
                <Card className="bg-dark-800/50 border-dark-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-dark-50">Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-dark-400">Last Active</span>
                      <span className="text-sm text-dark-300">{researcher.lastActive}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-dark-400">Response Rate</span>
                      <span className="text-sm text-success">95%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-dark-400">Avg. Response Time</span>
                      <span className="text-sm text-dark-300">2 hours</span>
                    </div>
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
