"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Bell,
  Search,
  Filter,
  MoreHorizontal,
  Check,
  Trash2,
  Archive,
  Star,
  Clock,
  User,
  FileText,
  DollarSign,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import ParticleBackground from "@/components/ui/particle-background"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Mock notification data
const notifications = [
  {
    id: "1",
    type: "review_assignment",
    title: "New Review Assignment",
    message: "You've been assigned to review 'CRISPR Gene Editing in Cancer Treatment'",
    timestamp: "2 minutes ago",
    read: false,
    priority: "high",
    metadata: {
      paper: "CRISPR Gene Editing in Cancer Treatment",
      author: "Dr. Sarah Chen",
      deadline: "Dec 15, 2024",
      field: "Biotechnology",
    },
  },
  {
    id: "2",
    type: "funding_update",
    title: "Funding Milestone Reached",
    message: "Your project 'Quantum Computing Research' has reached 75% funding",
    timestamp: "1 hour ago",
    read: false,
    priority: "medium",
    metadata: {
      project: "Quantum Computing Research",
      amount: "$75,000",
      target: "$100,000",
      backers: 23,
    },
  },
  {
    id: "3",
    type: "collaboration_request",
    title: "Collaboration Request",
    message: "Dr. Michael Rodriguez wants to collaborate on your AI research",
    timestamp: "3 hours ago",
    read: true,
    priority: "medium",
    metadata: {
      requester: "Dr. Michael Rodriguez",
      institution: "MIT",
      expertise: "Machine Learning",
      project: "AI in Healthcare",
    },
  },
  {
    id: "4",
    type: "publication_status",
    title: "Publication Accepted",
    message: "Your paper 'Neural Networks in Drug Discovery' has been accepted",
    timestamp: "1 day ago",
    read: true,
    priority: "high",
    metadata: {
      paper: "Neural Networks in Drug Discovery",
      journal: "Nature Biotechnology",
      status: "Accepted",
      publishDate: "Jan 2025",
    },
  },
  {
    id: "5",
    type: "deadline_reminder",
    title: "Deadline Reminder",
    message: "Review deadline for 'Climate Change Modeling' is in 2 days",
    timestamp: "2 days ago",
    read: false,
    priority: "urgent",
    metadata: {
      task: "Peer Review",
      paper: "Climate Change Modeling",
      deadline: "Dec 12, 2024",
      timeLeft: "2 days",
    },
  },
  {
    id: "6",
    type: "direct_message",
    title: "New Message",
    message: "Dr. Lisa Wang sent you a message about the collaboration proposal",
    timestamp: "3 days ago",
    read: true,
    priority: "low",
    metadata: {
      sender: "Dr. Lisa Wang",
      subject: "Collaboration Proposal",
      preview: "I'd like to discuss the potential collaboration on...",
      hasAttachment: true,
    },
  },
  {
    id: "7",
    type: "system_update",
    title: "System Update",
    message: "New features added: Enhanced peer review dashboard and AI matching",
    timestamp: "1 week ago",
    read: true,
    priority: "low",
    metadata: {
      version: "v2.1.0",
      features: ["Enhanced Dashboard", "AI Matching", "Mobile App"],
      releaseNotes: "https://openlab.network/releases/v2.1.0",
    },
  },
]

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "review_assignment":
      return <FileText className="w-5 h-5 text-primary-400" />
    case "funding_update":
      return <DollarSign className="w-5 h-5 text-success" />
    case "collaboration_request":
      return <User className="w-5 h-5 text-accent-400" />
    case "publication_status":
      return <CheckCircle className="w-5 h-5 text-success" />
    case "deadline_reminder":
      return <Clock className="w-5 h-5 text-warning" />
    case "direct_message":
      return <MessageSquare className="w-5 h-5 text-secondary-400" />
    case "system_update":
      return <AlertTriangle className="w-5 h-5 text-info" />
    default:
      return <Bell className="w-5 h-5 text-dark-400" />
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "urgent":
      return "bg-error/20 text-error border-error/30"
    case "high":
      return "bg-warning/20 text-warning border-warning/30"
    case "medium":
      return "bg-primary-500/20 text-primary-400 border-primary-500/30"
    case "low":
      return "bg-dark-600/20 text-dark-400 border-dark-600/30"
    default:
      return "bg-dark-600/20 text-dark-400 border-dark-600/30"
  }
}

export default function NotificationsPage() {
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterType === "all" || notification.type === filterType
    const matchesTab = activeTab === "all" || (activeTab === "unread" && !notification.read)

    return matchesSearch && matchesFilter && matchesTab
  })

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleSelectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([])
    } else {
      setSelectedNotifications(filteredNotifications.map((n) => n.id))
    }
  }

  const handleSelectNotification = (id: string) => {
    setSelectedNotifications((prev) => (prev.includes(id) ? prev.filter((nId) => nId !== id) : [...prev, id]))
  }

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on notifications:`, selectedNotifications)
    setSelectedNotifications([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-dark-50">
      <ParticleBackground />

      <div className="container mx-auto px-4 py-8">
        <motion.div className="max-w-6xl mx-auto" initial="initial" animate="animate" variants={staggerContainer}>
          {/* Header */}
          <motion.div className="mb-8" variants={fadeInUp}>
            <Link href="/dashboard" className="inline-flex items-center text-accent-400 hover:text-accent-300 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">Notifications</h1>
                <p className="text-dark-400">Stay updated with your research activities</p>
              </div>
              <Link href="/notifications/settings">
                <Button
                  variant="outline"
                  className="border-accent-500 text-accent-400 hover:bg-accent-500/10 bg-transparent"
                >
                  Settings
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Search and Filters */}
          <motion.div className="mb-6" variants={fadeInUp}>
            <Card className="bg-dark-800/50 border-dark-700">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-dark-400" />
                    <Input
                      placeholder="Search notifications..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-dark-700 border-dark-600 text-dark-50"
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="border-dark-600 text-dark-300 bg-transparent">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-dark-800 border-dark-700">
                      <DropdownMenuItem onClick={() => setFilterType("all")}>All Types</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterType("review_assignment")}>Reviews</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterType("funding_update")}>Funding</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterType("collaboration_request")}>
                        Collaborations
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterType("publication_status")}>
                        Publications
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterType("direct_message")}>Messages</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bulk Actions */}
          {selectedNotifications.length > 0 && (
            <motion.div className="mb-6" variants={fadeInUp}>
              <Card className="bg-primary-500/10 border-primary-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-primary-300">
                      {selectedNotifications.length} notification{selectedNotifications.length !== 1 ? "s" : ""}{" "}
                      selected
                    </span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleBulkAction("mark_read")}
                        className="border-primary-500/30 text-primary-400 hover:bg-primary-500/10"
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Mark Read
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleBulkAction("archive")}
                        className="border-accent-500/30 text-accent-400 hover:bg-accent-500/10"
                      >
                        <Archive className="w-4 h-4 mr-1" />
                        Archive
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleBulkAction("delete")}
                        className="border-error/30 text-error hover:bg-error/10"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Notifications Tabs */}
          <motion.div variants={fadeInUp}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-dark-800 border-dark-700">
                <TabsTrigger value="all" className="data-[state=active]:bg-primary-600">
                  All ({notifications.length})
                </TabsTrigger>
                <TabsTrigger value="unread" className="data-[state=active]:bg-primary-600">
                  Unread ({unreadCount})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <NotificationsList
                  notifications={filteredNotifications}
                  selectedNotifications={selectedNotifications}
                  onSelectNotification={handleSelectNotification}
                  onSelectAll={handleSelectAll}
                />
              </TabsContent>

              <TabsContent value="unread" className="mt-6">
                <NotificationsList
                  notifications={filteredNotifications}
                  selectedNotifications={selectedNotifications}
                  onSelectNotification={handleSelectNotification}
                  onSelectAll={handleSelectAll}
                />
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

function NotificationsList({
  notifications,
  selectedNotifications,
  onSelectNotification,
  onSelectAll,
}: {
  notifications: any[]
  selectedNotifications: string[]
  onSelectNotification: (id: string) => void
  onSelectAll: () => void
}) {
  if (notifications.length === 0) {
    return (
      <Card className="bg-dark-800/50 border-dark-700">
        <CardContent className="p-12 text-center">
          <Bell className="w-12 h-12 text-dark-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-dark-300 mb-2">No notifications found</h3>
          <p className="text-dark-500">Try adjusting your search or filter criteria</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Select All */}
      <Card className="bg-dark-800/30 border-dark-700">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Checkbox checked={selectedNotifications.length === notifications.length} onCheckedChange={onSelectAll} />
            <span className="text-sm text-dark-400">Select all notifications</span>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      {notifications.map((notification) => (
        <motion.div key={notification.id} variants={fadeInUp} className="group">
          <Card
            className={`bg-dark-800/50 border-dark-700 hover:bg-dark-800/70 transition-all duration-200 ${
              !notification.read ? "border-l-4 border-l-primary-500" : ""
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Checkbox
                  checked={selectedNotifications.includes(notification.id)}
                  onCheckedChange={() => onSelectNotification(notification.id)}
                />

                <div className="flex-shrink-0">{getNotificationIcon(notification.type)}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <h3 className={`font-semibold ${!notification.read ? "text-dark-50" : "text-dark-300"}`}>
                        {notification.title}
                      </h3>
                      <Badge className={getPriorityColor(notification.priority)}>{notification.priority}</Badge>
                      {!notification.read && <div className="w-2 h-2 bg-primary-500 rounded-full"></div>}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-dark-500">{notification.timestamp}</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-dark-800 border-dark-700">
                          <DropdownMenuItem>
                            <Check className="w-4 h-4 mr-2" />
                            Mark as read
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Star className="w-4 h-4 mr-2" />
                            Star
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Archive className="w-4 h-4 mr-2" />
                            Archive
                          </DropdownMenuItem>
                          <Separator className="my-1" />
                          <DropdownMenuItem className="text-error">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <p className="text-dark-400 mb-3">{notification.message}</p>

                  {/* Metadata */}
                  <div className="bg-dark-900/50 rounded-lg p-3 space-y-2">
                    {Object.entries(notification.metadata).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-dark-500 capitalize">{key.replace("_", " ")}:</span>
                        <span className="text-dark-300">{value as string}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
