"use client"
import { motion } from "framer-motion"
import { Users, FileText, DollarSign, Plus, ArrowUpRight, Beaker } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import ParticleBackground from "@/components/ui/particle-background"
import StatsCounter from "@/components/ui/stats-counter"

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

const dashboardStats = [
  {
    title: "Active Projects",
    value: 3,
    change: "+2 this month",
    icon: Beaker,
    color: "text-primary-400",
  },
  {
    title: "Total Funding Raised",
    value: 45000,
    prefix: "$",
    change: "+$12,000 this month",
    icon: DollarSign,
    color: "text-success",
  },
  {
    title: "Collaborators",
    value: 12,
    change: "+3 new",
    icon: Users,
    color: "text-accent-400",
  },
  {
    title: "Publications",
    value: 8,
    change: "+1 pending review",
    icon: FileText,
    color: "text-secondary-400",
  },
]

const recentProjects = [
  {
    id: 1,
    title: "CRISPR Gene Therapy Research",
    status: "Active",
    funding: 25000,
    goal: 50000,
    contributors: 8,
    lastUpdate: "2 days ago",
  },
  {
    id: 2,
    title: "Quantum Computing Applications",
    status: "Funding",
    funding: 15000,
    goal: 30000,
    contributors: 4,
    lastUpdate: "1 week ago",
  },
  {
    id: 3,
    title: "Sustainable Energy Storage",
    status: "Completed",
    funding: 40000,
    goal: 40000,
    contributors: 15,
    lastUpdate: "1 month ago",
  },
]

const recentActivity = [
  {
    type: "funding",
    message: "Received $2,500 funding for CRISPR Gene Therapy Research",
    time: "2 hours ago",
  },
  {
    type: "collaboration",
    message: "Dr. Sarah Chen joined your Quantum Computing project",
    time: "1 day ago",
  },
  {
    type: "milestone",
    message: "Completed Phase 2 milestone for Energy Storage project",
    time: "3 days ago",
  },
  {
    type: "review",
    message: "Your paper 'Novel Gene Editing Techniques' received peer review",
    time: "1 week ago",
  },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-dark-50">
      <ParticleBackground />

      <div className="container mx-auto px-4 py-8 pt-24">
        <motion.div className="max-w-7xl mx-auto" initial="initial" animate="animate" variants={staggerContainer}>
          {/* Header */}
          <motion.div className="mb-8" variants={fadeInUp}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">Welcome back, Dr. Smith</h1>
                <p className="text-dark-400 text-lg">Here&apos;s what&apos;s happening with your research projects</p>
              </div>
              <div className="mt-4 md:mt-0 flex gap-3">
                <Link href="/projects/create">
                  <Button className="bg-primary-600 hover:bg-primary-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    New Project
                  </Button>
                </Link>
                <Link href="/funding">
                  <Button
                    variant="outline"
                    className="border-accent-500 text-accent-400 hover:bg-accent-500/10 bg-transparent"
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    Browse Funding
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" variants={staggerContainer}>
            {dashboardStats.map((stat, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="bg-dark-800/50 border-dark-700 hover:bg-dark-800/70 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-dark-400 text-sm font-medium">{stat.title}</p>
                        <div className="flex items-baseline">
                          <StatsCounter
                            value={stat.value}
                            prefix={stat.prefix}
                            className={`text-2xl font-bold ${stat.color}`}
                          />
                        </div>
                        <p className="text-dark-500 text-xs mt-1">{stat.change}</p>
                      </div>
                      <div className={`p-3 rounded-lg bg-dark-700/50`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Projects */}
            <motion.div className="lg:col-span-2" variants={fadeInUp}>
              <Card className="bg-dark-800/50 border-dark-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-dark-50">Recent Projects</CardTitle>
                    <Link href="/dashboard/projects">
                      <Button variant="ghost" className="text-accent-400 hover:text-accent-300">
                        View All
                        <ArrowUpRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentProjects.map((project) => (
                    <div
                      key={project.id}
                      className="p-4 bg-dark-700/30 rounded-lg border border-dark-600 hover:border-primary-500/30 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-dark-50 mb-1">{project.title}</h3>
                          <div className="flex items-center gap-2">
                            <Badge
                              className={`text-xs ${
                                project.status === "Active"
                                  ? "bg-success/20 text-success border-success/30"
                                  : project.status === "Funding"
                                    ? "bg-warning/20 text-warning border-warning/30"
                                    : "bg-primary-500/20 text-primary-400 border-primary-500/30"
                              }`}
                            >
                              {project.status}
                            </Badge>
                            <span className="text-dark-400 text-xs">{project.lastUpdate}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-dark-400">Funding Progress</span>
                          <span className="text-dark-50">
                            ${project.funding.toLocaleString()} / ${project.goal.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full bg-dark-600 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(project.funding / project.goal) * 100}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-xs text-dark-400">
                          <span>{project.contributors} contributors</span>
                          <span>{Math.round((project.funding / project.goal) * 100)}% funded</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-dark-800/50 border-dark-700">
                <CardHeader>
                  <CardTitle className="text-xl text-dark-50">Recent Activity</CardTitle>
                  <CardDescription className="text-dark-400">Latest updates from your projects</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === "funding"
                            ? "bg-success"
                            : activity.type === "collaboration"
                              ? "bg-accent-400"
                              : activity.type === "milestone"
                                ? "bg-primary-500"
                                : "bg-secondary-500"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-dark-300">{activity.message}</p>
                        <p className="text-xs text-dark-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div className="mt-8" variants={fadeInUp}>
            <Card className="bg-dark-800/50 border-dark-700">
              <CardHeader>
                <CardTitle className="text-xl text-dark-50">Quick Actions</CardTitle>
                <CardDescription className="text-dark-400">
                  Common tasks to help you manage your research
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Link href="/projects/create">
                    <Button
                      variant="outline"
                      className="w-full h-20 flex-col border-primary-500/30 text-primary-400 hover:bg-primary-500/10 bg-transparent"
                    >
                      <Plus className="w-6 h-6 mb-2" />
                      Create Project
                    </Button>
                  </Link>
                  <Link href="/funding">
                    <Button
                      variant="outline"
                      className="w-full h-20 flex-col border-success/30 text-success hover:bg-success/10 bg-transparent"
                    >
                      <DollarSign className="w-6 h-6 mb-2" />
                      Find Funding
                    </Button>
                  </Link>
                  <Link href="/researchers">
                    <Button
                      variant="outline"
                      className="w-full h-20 flex-col border-accent-500/30 text-accent-400 hover:bg-accent-500/10 bg-transparent"
                    >
                      <Users className="w-6 h-6 mb-2" />
                      Find Collaborators
                    </Button>
                  </Link>
                  <Link href="/publications">
                    <Button
                      variant="outline"
                      className="w-full h-20 flex-col border-secondary-500/30 text-secondary-400 hover:bg-secondary-500/10 bg-transparent"
                    >
                      <FileText className="w-6 h-6 mb-2" />
                      Publish Research
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
