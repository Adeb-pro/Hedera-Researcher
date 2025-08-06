"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  ArrowRight,
  DollarSign,
  Users,
  FileCheck,
  BookOpen,
  Play,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Shield,
  Globe,
  Zap,
  Star,
  Award,
  Clock,
  Target,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useBlockchain } from "@/contexts/blockchain-context"
import Link from "next/link"
import Header from "@/components/layout/header"
import ParticleBackground from "@/components/ui/particle-background"
import StatsCounter from "@/components/ui/stats-counter"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const features = [
  {
    title: "Decentralized Funding",
    description:
      "Access global funding pools through smart contracts. Transparent, automated, and efficient research funding with real-time tracking.",
    icon: DollarSign,
    gradient: "from-emerald-500 to-green-600",
    bgGradient: "from-emerald-500/10 to-green-600/10",
    borderGradient: "from-emerald-500/20 to-green-600/20",
    href: "/funding",
    stats: "$2.4M+ Funded",
  },
  {
    title: "Global Collaboration",
    description:
      "Connect with researchers worldwide. Share knowledge, resources, and collaborate on breakthrough discoveries across disciplines.",
    icon: Users,
    gradient: "from-blue-500 to-cyan-600",
    bgGradient: "from-blue-500/10 to-cyan-600/10",
    borderGradient: "from-blue-500/20 to-cyan-600/20",
    href: "/researchers",
    stats: "12K+ Researchers",
  },
  {
    title: "Peer Review System",
    description:
      "Transparent peer review process with reputation-based validation. Ensure research quality and integrity through blockchain verification.",
    icon: FileCheck,
    gradient: "from-purple-500 to-pink-600",
    bgGradient: "from-purple-500/10 to-pink-600/10",
    borderGradient: "from-purple-500/20 to-pink-600/20",
    href: "/publications/review",
    stats: "8.7K+ Reviews",
  },
  {
    title: "Research Publications",
    description:
      "Publish and discover cutting-edge research. Immutable records with proper attribution, citations, and permanent accessibility.",
    icon: BookOpen,
    gradient: "from-orange-500 to-red-600",
    bgGradient: "from-orange-500/10 to-red-600/10",
    borderGradient: "from-orange-500/20 to-red-600/20",
    href: "/publications",
    stats: "3.2K+ Papers",
  },
]

const benefits = [
  {
    icon: Shield,
    title: "Blockchain Security",
    description: "Immutable records and cryptographic proof of authenticity for all research data and publications.",
  },
  {
    icon: Globe,
    title: "Global Access",
    description:
      "Researchers from anywhere can participate, collaborate, and access funding opportunities without barriers.",
  },
  {
    icon: Zap,
    title: "Instant Payments",
    description: "Smart contracts automatically release funding based on milestone completion and peer validation.",
  },
  {
    icon: TrendingUp,
    title: "Reputation System",
    description:
      "Build your research reputation through successful projects, quality reviews, and community contributions.",
  },
]

const featuredProjects = [
  {
    id: 1,
    title: "CRISPR Gene Therapy for Rare Diseases",
    category: "Biotechnology",
    description:
      "Developing targeted gene therapies using CRISPR-Cas9 technology for treating rare genetic disorders affecting millions worldwide.",
    funding: { raised: 145000, goal: 200000 },
    contributors: 23,
    timeLeft: "45 days",
    image: "/crispr-lab.png",
    tags: ["Gene Therapy", "CRISPR", "Rare Diseases"],
    progress: 72.5,
    principal: "Dr. Sarah Chen",
    institution: "Stanford University",
  },
  {
    id: 2,
    title: "Quantum Computing for Drug Discovery",
    category: "Quantum Physics",
    description:
      "Leveraging quantum algorithms to accelerate molecular simulation and drug discovery processes by 1000x.",
    funding: { raised: 89000, goal: 150000 },
    contributors: 18,
    timeLeft: "62 days",
    image: "/quantum-computing-laboratory.png",
    tags: ["Quantum Computing", "Drug Discovery", "AI"],
    progress: 59.3,
    principal: "Dr. Michael Zhang",
    institution: "MIT",
  },
  {
    id: 3,
    title: "Sustainable Energy Storage Solutions",
    category: "Materials Science",
    description:
      "Developing next-generation battery technologies using novel nanomaterials for renewable energy storage systems.",
    funding: { raised: 203000, goal: 250000 },
    contributors: 31,
    timeLeft: "28 days",
    image: "/placeholder-z8cv1.png",
    tags: ["Energy Storage", "Nanomaterials", "Sustainability"],
    progress: 81.2,
    principal: "Dr. Elena Rodriguez",
    institution: "Berkeley Lab",
  },
]

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { isConnected, platformStats } = useBlockchain()
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const displayStats = platformStats || {
    totalProjects: 3291,
    activeProjects: 1847,
    totalFunding: "2.4",
    totalResearchers: 12847,
    completedProjects: 892,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-dark-50 overflow-hidden">
      <ParticleBackground />
      <Header />

      <main className="relative">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5" />
          <motion.div
            className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-full blur-3xl"
            style={{ y: y1 }}
          />
          <motion.div
            className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-accent-500/10 to-primary-500/10 rounded-full blur-3xl"
            style={{ y: y2 }}
          />

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div className="text-center" initial="initial" animate="animate" variants={staggerContainer}>
              <motion.div variants={fadeInUp} className="mb-8">
                <Badge
                  variant="secondary"
                  className="bg-gradient-to-r from-primary-500/10 to-secondary-500/10 text-primary-400 border border-primary-500/20 px-4 py-2 text-sm font-medium backdrop-blur-sm"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Powered by Hedera Blockchain
                </Badge>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
                  The Future of
                </span>
                <br />
                <span className="bg-gradient-to-r from-accent-400 via-primary-400 to-secondary-400 bg-clip-text text-transparent">
                  Scientific Research
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-xl md:text-2xl text-dark-300 mb-12 max-w-4xl mx-auto leading-relaxed"
              >
                Connect with researchers globally, secure transparent funding, and publish breakthrough discoveries on
                the blockchain. Welcome to the decentralized research revolution.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                {isConnected ? (
                  <>
                    <Link href="/dashboard">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white shadow-2xl hover:shadow-primary-500/25 transition-all duration-300 px-8 py-4 text-lg rounded-2xl"
                      >
                        <Target className="mr-2 w-5 h-5" />
                        Go to Dashboard
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                    <Link href="/projects/create">
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-2 border-accent-500/30 text-accent-400 hover:bg-accent-500/10 bg-dark-800/50 backdrop-blur-sm px-8 py-4 text-lg rounded-2xl"
                      >
                        <Play className="mr-2 w-5 h-5" />
                        Create Project
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/projects">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white shadow-2xl hover:shadow-primary-500/25 transition-all duration-300 px-8 py-4 text-lg rounded-2xl"
                      >
                        <Target className="mr-2 w-5 h-5" />
                        Explore Projects
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                    <Link href="/researchers">
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-2 border-accent-500/30 text-accent-400 hover:bg-accent-500/10 bg-dark-800/50 backdrop-blur-sm px-8 py-4 text-lg rounded-2xl"
                      >
                        <Users className="mr-2 w-5 h-5" />
                        Join Network
                      </Button>
                    </Link>
                  </>
                )}
              </motion.div>

              {/* Platform Stats */}
              <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                {[
                  {
                    label: "Total Projects",
                    value: displayStats.totalProjects,
                    icon: FileCheck,
                    color: "text-primary-400",
                  },
                  {
                    label: "Funding Raised",
                    value: `$${displayStats.totalFunding}M`,
                    icon: DollarSign,
                    color: "text-success",
                  },
                  { label: "Researchers", value: displayStats.totalResearchers, icon: Users, color: "text-accent-400" },
                  {
                    label: "Completed",
                    value: displayStats.completedProjects,
                    icon: Award,
                    color: "text-secondary-400",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="relative group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <div className="bg-gradient-to-br from-dark-800/60 to-dark-700/60 backdrop-blur-sm rounded-2xl p-6 border border-dark-600/30 group-hover:border-primary-500/30 transition-all duration-300">
                      <div className="flex items-center justify-center mb-3">
                        <stat.icon className={`w-8 h-8 ${stat.color}`} />
                      </div>
                      <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2 text-center`}>
                        {typeof stat.value === "number" ? <StatsCounter value={stat.value} /> : stat.value}
                      </div>
                      <div className="text-dark-400 text-sm text-center font-medium">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-800/50 to-transparent" />
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-20"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent"
              >
                Revolutionizing Research
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-xl text-dark-300 max-w-3xl mx-auto leading-relaxed">
                Experience the power of decentralized science with our comprehensive platform built for the future of
                research collaboration and innovation.
              </motion.p>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {features.map((feature, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Link href={feature.href}>
                    <Card className="bg-gradient-to-br from-dark-800/60 to-dark-700/60 border border-dark-600/30 hover:border-primary-500/30 transition-all duration-500 group cursor-pointer h-full backdrop-blur-sm overflow-hidden relative">
                      {/* Background gradient */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                      />

                      <CardContent className="p-8 relative z-10">
                        <div
                          className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}
                        >
                          <feature.icon className="w-10 h-10 text-white" />
                        </div>

                        <h3 className="text-2xl font-bold text-dark-50 mb-4 group-hover:text-primary-400 transition-colors duration-300">
                          {feature.title}
                        </h3>

                        <p className="text-dark-400 mb-6 leading-relaxed group-hover:text-dark-300 transition-colors duration-300">
                          {feature.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="bg-dark-700/50 text-dark-300 border-dark-600/50">
                            {feature.stats}
                          </Badge>
                          <div className="flex items-center text-primary-400 group-hover:text-primary-300 transition-colors">
                            <span className="text-sm font-medium mr-2">Explore</span>
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-20"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-accent-400 via-primary-400 to-secondary-400 bg-clip-text text-transparent"
              >
                Featured Research
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-xl text-dark-300 max-w-3xl mx-auto">
                Discover groundbreaking research projects seeking funding and collaboration from leading institutions
                worldwide.
              </motion.p>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {featuredProjects.map((project) => (
                <motion.div key={project.id} variants={fadeInUp}>
                  <Link href={`/projects/${project.id}`}>
                    <Card className="bg-gradient-to-br from-dark-800/60 to-dark-700/60 border border-dark-600/30 hover:border-primary-500/30 transition-all duration-500 overflow-hidden group cursor-pointer backdrop-blur-sm">
                      <div className="relative overflow-hidden">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent" />
                        <Badge className="absolute top-4 left-4 bg-primary-600/90 text-white backdrop-blur-sm">
                          {project.category}
                        </Badge>
                        <div className="absolute bottom-4 left-4 text-white">
                          <p className="text-sm font-medium">{project.principal}</p>
                          <p className="text-xs opacity-80">{project.institution}</p>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-dark-50 mb-3 line-clamp-2 group-hover:text-primary-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-dark-400 mb-4 line-clamp-3 leading-relaxed">{project.description}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs bg-accent-500/10 text-accent-300 border-accent-500/20"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="space-y-3 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-dark-400">Funding Progress</span>
                            <span className="text-dark-50 font-semibold">{project.progress}%</span>
                          </div>
                          <div className="w-full bg-dark-700 rounded-full h-3 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full transition-all duration-1000 shadow-lg"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-sm text-dark-400">
                            <span>${project.funding.raised.toLocaleString()} raised</span>
                            <span>${project.funding.goal.toLocaleString()} goal</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-dark-400 mb-4">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {project.contributors} contributors
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {project.timeLeft}
                          </div>
                        </div>

                        <Button className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl">
                          View Project
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-dark-800/30 via-dark-800/50 to-dark-800/30" />
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-20"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-secondary-400 via-accent-400 to-primary-400 bg-clip-text text-transparent"
              >
                Blockchain-Powered Research
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-xl text-dark-300 max-w-3xl mx-auto">
                Experience the advantages of decentralized scientific collaboration with unprecedented transparency and
                security.
              </motion.p>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="flex items-start space-x-6 p-8 bg-gradient-to-br from-dark-800/60 to-dark-700/60 rounded-2xl border border-dark-600/30 hover:border-primary-500/30 transition-all duration-500 backdrop-blur-sm group"
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <benefit.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-dark-50 mb-3 group-hover:text-primary-400 transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-dark-400 leading-relaxed group-hover:text-dark-300 transition-colors">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-secondary-500/10" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer}>
              <motion.div variants={fadeInUp} className="mb-8">
                <Badge
                  variant="secondary"
                  className="bg-gradient-to-r from-accent-500/10 to-primary-500/10 text-accent-400 border border-accent-500/20 px-6 py-3 text-lg font-medium backdrop-blur-sm"
                >
                  <Star className="w-5 h-5 mr-2" />
                  Join the Revolution
                </Badge>
              </motion.div>

              <motion.h2
                variants={fadeInUp}
                className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-accent-400 via-primary-400 to-secondary-400 bg-clip-text text-transparent"
              >
                Ready to Transform Research?
              </motion.h2>

              <motion.p variants={fadeInUp} className="text-xl text-dark-300 mb-12 leading-relaxed">
                Join thousands of researchers already using OpenLab Network to accelerate scientific discovery through
                blockchain technology and global collaboration.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6 justify-center">
                {!isConnected ? (
                  <>
                    <Link href="/auth/signup">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 hover:from-primary-700 hover:via-secondary-700 hover:to-accent-700 text-white shadow-2xl hover:shadow-primary-500/25 transition-all duration-300 px-10 py-5 text-xl rounded-2xl"
                      >
                        <Sparkles className="mr-2 w-6 h-6" />
                        Get Started Today
                        <ArrowRight className="ml-2 w-6 h-6" />
                      </Button>
                    </Link>
                    <Link href="/help">
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-2 border-accent-500/30 text-accent-400 hover:bg-accent-500/10 bg-dark-800/50 backdrop-blur-sm px-10 py-5 text-xl rounded-2xl"
                      >
                        Learn More
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Link href="/dashboard">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 hover:from-primary-700 hover:via-secondary-700 hover:to-accent-700 text-white shadow-2xl hover:shadow-primary-500/25 transition-all duration-300 px-10 py-5 text-xl rounded-2xl"
                    >
                      <Target className="mr-2 w-6 h-6" />
                      Go to Dashboard
                      <ArrowRight className="ml-2 w-6 h-6" />
                    </Button>
                  </Link>
                )}
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}
