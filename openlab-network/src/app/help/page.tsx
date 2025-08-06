"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Search, Book, MessageCircle, Mail, Phone, ExternalLink, FileText, Video, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
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

const faqData = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "How do I create an account on OpenLab Network?",
        answer:
          "To create an account, click 'Sign Up' on the homepage, connect your wallet (MetaMask, WalletConnect, or HashPack), and complete the registration form with your research profile information.",
      },
      {
        question: "What wallets are supported?",
        answer:
          "We support MetaMask, WalletConnect, and HashPack wallets. These provide secure access to the Hedera network for transactions and identity verification.",
      },
      {
        question: "Is OpenLab Network free to use?",
        answer:
          "Basic features like browsing research, creating a profile, and joining discussions are free. Premium features like project funding and advanced collaboration tools may require payment.",
      },
      {
        question: "How do I verify my researcher credentials?",
        answer:
          "Upload your academic credentials, publications, and institutional affiliations in your profile settings. Our verification team reviews submissions within 2-3 business days.",
      },
    ],
  },
  {
    category: "Research Projects",
    questions: [
      {
        question: "How do I create a research project?",
        answer:
          "Navigate to the Projects section, click 'Create Project', fill in your project details, set funding goals, and publish. Projects are reviewed before going live.",
      },
      {
        question: "Can I collaborate with other researchers?",
        answer:
          "Yes! Use our collaboration tools to invite researchers, share resources, and work together on projects. You can also join existing projects that match your expertise.",
      },
      {
        question: "How does project funding work?",
        answer:
          "Projects can receive funding through our decentralized funding system. Backers can contribute HBAR or other supported tokens. Funds are released based on milestone completion.",
      },
      {
        question: "What happens to my intellectual property?",
        answer:
          "You retain full ownership of your intellectual property. Our platform provides tools to document and protect your research through blockchain-based timestamps and verification.",
      },
    ],
  },
  {
    category: "Publications & Peer Review",
    questions: [
      {
        question: "How does the peer review process work?",
        answer:
          "Submit your paper through our publication system. It's assigned to qualified reviewers based on expertise matching. Reviews are conducted transparently with blockchain verification.",
      },
      {
        question: "Can I review papers in my field?",
        answer:
          "Yes! Complete your reviewer profile and indicate your areas of expertise. You'll receive review assignments based on your qualifications and availability.",
      },
      {
        question: "Are publications open access?",
        answer:
          "We support both open access and traditional publishing models. Authors can choose their preferred licensing and access terms when submitting.",
      },
      {
        question: "How are reviewers compensated?",
        answer:
          "Reviewers earn tokens for quality reviews. Compensation is based on review thoroughness, timeliness, and community feedback through our reputation system.",
      },
    ],
  },
  {
    category: "Technical Support",
    questions: [
      {
        question: "I'm having trouble connecting my wallet",
        answer:
          "Ensure your wallet extension is installed and unlocked. Clear your browser cache, disable ad blockers, and try connecting again. Contact support if issues persist.",
      },
      {
        question: "How do I recover my account?",
        answer:
          "Account recovery is tied to your wallet. If you lose access to your wallet, you'll need to use your wallet's recovery phrase. We cannot recover accounts without wallet access.",
      },
      {
        question: "Why are my transactions failing?",
        answer:
          "Common causes include insufficient HBAR balance, network congestion, or wallet connectivity issues. Check your balance and network status, then retry the transaction.",
      },
      {
        question: "How do I update my profile information?",
        answer:
          "Go to Settings > Profile, make your changes, and save. Some changes (like institutional affiliation) may require re-verification.",
      },
    ],
  },
]

const quickLinks = [
  {
    title: "User Guide",
    description: "Complete guide to using OpenLab Network",
    icon: <Book className="w-5 h-5" />,
    href: "/help/guide",
    badge: "Popular",
  },
  {
    title: "Video Tutorials",
    description: "Step-by-step video walkthroughs",
    icon: <Video className="w-5 h-5" />,
    href: "/help/videos",
    badge: "New",
  },
  {
    title: "API Documentation",
    description: "Developer resources and API reference",
    icon: <FileText className="w-5 h-5" />,
    href: "/help/api",
    badge: null,
  },
  {
    title: "Community Forum",
    description: "Connect with other researchers",
    icon: <Users className="w-5 h-5" />,
    href: "/community",
    badge: null,
  },
]

const supportChannels = [
  {
    title: "Live Chat",
    description: "Get instant help from our support team",
    icon: <MessageCircle className="w-6 h-6 text-primary-400" />,
    action: "Start Chat",
    available: "24/7",
  },
  {
    title: "Email Support",
    description: "Send us a detailed message",
    icon: <Mail className="w-6 h-6 text-accent-400" />,
    action: "Send Email",
    available: "Response within 24h",
  },
  {
    title: "Phone Support",
    description: "Speak directly with our team",
    icon: <Phone className="w-6 h-6 text-secondary-400" />,
    action: "Call Now",
    available: "Mon-Fri 9AM-6PM EST",
  },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("Getting Started")

  const filteredFAQs = faqData
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

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
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Help Center</h1>
              <p className="text-xl text-dark-400 max-w-2xl mx-auto">
                Find answers to your questions and get the support you need
              </p>
            </div>
          </motion.div>

          {/* Search */}
          <motion.div className="mb-8" variants={fadeInUp}>
            <Card className="bg-dark-800/50 border-dark-700">
              <CardContent className="p-6">
                <div className="relative max-w-2xl mx-auto">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-400" />
                  <Input
                    placeholder="Search for help articles, FAQs, or topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 bg-dark-700 border-dark-600 text-dark-50 text-lg"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Links */}
          <motion.div className="mb-12" variants={fadeInUp}>
            <h2 className="text-2xl font-bold mb-6">Quick Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickLinks.map((link, index) => (
                <Card
                  key={index}
                  className="bg-dark-800/50 border-dark-700 hover:bg-dark-800/70 transition-colors cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2 bg-primary-500/20 rounded-lg">{link.icon}</div>
                      {link.badge && (
                        <Badge
                          className={`text-xs ${
                            link.badge === "Popular"
                              ? "bg-success/20 text-success"
                              : "bg-primary-500/20 text-primary-400"
                          }`}
                        >
                          {link.badge}
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-semibold mb-2">{link.title}</h3>
                    <p className="text-sm text-dark-400 mb-3">{link.description}</p>
                    <div className="flex items-center text-accent-400 text-sm">
                      Learn more <ExternalLink className="w-3 h-3 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div className="mb-12" variants={fadeInUp}>
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-dark-800 border-dark-700 mb-6">
                {faqData.map((category) => (
                  <TabsTrigger
                    key={category.category}
                    value={category.category}
                    className="data-[state=active]:bg-primary-600 text-xs lg:text-sm"
                  >
                    {category.category}
                  </TabsTrigger>
                ))}
              </TabsList>

              {filteredFAQs.map((category) => (
                <TabsContent key={category.category} value={category.category}>
                  <Card className="bg-dark-800/50 border-dark-700">
                    <CardContent className="p-6">
                      <Accordion type="single" collapsible className="w-full">
                        {category.questions.map((faq, index) => (
                          <AccordionItem key={index} value={`item-${index}`} className="border-dark-600">
                            <AccordionTrigger className="text-left hover:text-primary-400">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-dark-400">{faq.answer}</AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>

          {/* Support Channels */}
          <motion.div className="mb-12" variants={fadeInUp}>
            <h2 className="text-2xl font-bold mb-6">Get Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {supportChannels.map((channel, index) => (
                <Card key={index} className="bg-dark-800/50 border-dark-700">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-dark-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                      {channel.icon}
                    </div>
                    <h3 className="font-semibold mb-2">{channel.title}</h3>
                    <p className="text-dark-400 text-sm mb-4">{channel.description}</p>
                    <p className="text-xs text-dark-500 mb-4">{channel.available}</p>
                    <Button className="w-full bg-primary-600 hover:bg-primary-700">{channel.action}</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Additional Resources */}
          <motion.div variants={fadeInUp}>
            <Card className="bg-gradient-to-r from-primary-500/10 to-accent-500/10 border-primary-500/20">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Still need help?</h3>
                <p className="text-dark-400 mb-6 max-w-2xl mx-auto">
                  Our community of researchers and support team are here to help you succeed. Join our community forum
                  or contact us directly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-primary-600 hover:bg-primary-700">
                    <Users className="w-4 h-4 mr-2" />
                    Join Community
                  </Button>
                  <Button
                    variant="outline"
                    className="border-accent-500 text-accent-400 hover:bg-accent-500/10 bg-transparent"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
