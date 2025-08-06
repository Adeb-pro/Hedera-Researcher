"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Download,
  Share2,
  Star,
  MessageCircle,
  Calendar,
  ExternalLink,
  Users,
  Quote,
  ThumbsUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
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

// Mock publication data - in real app, this would come from API
const publication = {
  id: 1,
  title: "CRISPR-Cas9 Gene Editing for Duchenne Muscular Dystrophy: A Phase I Clinical Trial",
  authors: [
    {
      name: "Dr. Sarah Chen",
      institution: "Stanford University",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Principal Investigator",
      orcid: "0000-0002-1234-5678",
    },
    {
      name: "Dr. Michael Rodriguez",
      institution: "MIT",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Co-Investigator",
      orcid: "0000-0002-2345-6789",
    },
    {
      name: "Dr. Emily Watson",
      institution: "UC Berkeley",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Research Scientist",
      orcid: "0000-0002-3456-7890",
    },
  ],
  abstract:
    "This study presents the first Phase I clinical trial results for CRISPR-Cas9 gene editing therapy in patients with Duchenne Muscular Dystrophy (DMD). We demonstrate significant improvements in muscle function and dystrophin expression with minimal adverse effects. The trial enrolled 12 patients aged 8-16 years with confirmed DMD diagnosis. Primary endpoints included safety assessment and dystrophin expression levels. Secondary endpoints evaluated muscle function improvements and quality of life measures. Results showed a 65% increase in dystrophin expression and significant improvements in 6-minute walk test scores with no serious adverse events reported.",
  fullText: `
# Introduction

Duchenne Muscular Dystrophy (DMD) is a severe X-linked recessive disorder affecting approximately 1 in 3,500 male births worldwide. The condition is caused by mutations in the dystrophin gene, leading to progressive muscle degeneration and weakness. Current treatments are largely supportive, with limited therapeutic options available to address the underlying genetic cause.

CRISPR-Cas9 gene editing technology has emerged as a promising therapeutic approach for genetic disorders. This study represents the first clinical application of CRISPR-Cas9 gene editing for DMD treatment in humans.

# Methods

## Study Design
This Phase I clinical trial was designed as a single-arm, open-label study to evaluate the safety and preliminary efficacy of CRISPR-Cas9 gene editing in DMD patients.

## Participants
Twelve male patients aged 8-16 years with genetically confirmed DMD were enrolled. All participants had documented dystrophin gene mutations and were ambulatory at study entry.

## Intervention
Participants received a single intramuscular injection of CRISPR-Cas9 components targeting the dystrophin gene. The treatment was designed to restore the reading frame and enable dystrophin protein production.

## Outcome Measures
Primary outcomes included safety assessment and dystrophin expression levels measured by immunofluorescence and Western blot analysis. Secondary outcomes evaluated functional improvements using the 6-minute walk test and quality of life assessments.

# Results

## Safety Profile
No serious adverse events were reported during the 12-month follow-up period. Mild injection site reactions occurred in 3 patients (25%) and resolved within 48 hours.

## Dystrophin Expression
Significant increases in dystrophin expression were observed in all treated patients. Mean dystrophin levels increased by 65% compared to baseline (p < 0.001).

## Functional Outcomes
The 6-minute walk test showed significant improvements, with patients walking an average of 45 meters further at 6 months post-treatment (p < 0.01).

# Discussion

These results demonstrate the potential of CRISPR-Cas9 gene editing as a therapeutic approach for DMD. The safety profile was favorable, and the observed improvements in dystrophin expression and functional outcomes are encouraging.

# Conclusion

This Phase I trial provides proof-of-concept evidence for CRISPR-Cas9 gene editing in DMD treatment. Larger Phase II trials are warranted to further evaluate efficacy and long-term safety.
  `,
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
    altmetric: 156,
  },
  tags: ["CRISPR", "Gene Therapy", "Clinical Trial", "Muscular Dystrophy", "Biotechnology"],
  keywords: ["CRISPR-Cas9", "Duchenne Muscular Dystrophy", "Gene Editing", "Clinical Trial", "Dystrophin"],
  openAccess: true,
  featured: true,
  trending: true,
  peerReviewed: true,
  fundingSource: "NIH Grant R01-HD089458",
  ethicsApproval: "Stanford IRB Protocol #54321",
  clinicalTrialId: "NCT04567890",
  dataAvailability: "Data available upon reasonable request",
  conflictOfInterest: "Authors declare no competing interests",
  references: [
    {
      id: 1,
      citation:
        "Hoffman, E. P., Brown, R. H. & Kunkel, L. M. Dystrophin: the protein product of the Duchenne muscular dystrophy locus. Cell 51, 919–928 (1987).",
      doi: "10.1016/0092-8674(87)90579-4",
    },
    {
      id: 2,
      citation:
        "Jinek, M. et al. A programmable dual-RNA–guided DNA endonuclease in adaptive bacterial immunity. Science 337, 816–821 (2012).",
      doi: "10.1126/science.1225829",
    },
    {
      id: 3,
      citation:
        "Long, C. et al. Postnatal genome editing partially restores dystrophin expression in a mouse model of muscular dystrophy. Science 351, 400–403 (2016).",
      doi: "10.1126/science.aad5725",
    },
  ],
  supplementaryMaterials: [
    { name: "Supplementary Figure 1", description: "Dystrophin expression analysis", file: "supp_fig1.pdf" },
    { name: "Supplementary Table 1", description: "Patient demographics", file: "supp_table1.xlsx" },
    { name: "Supplementary Methods", description: "Detailed methodology", file: "supp_methods.pdf" },
  ],
  peerReviews: [
    {
      id: 1,
      reviewer: "Anonymous Reviewer 1",
      rating: 5,
      date: "2024-01-20",
      summary: "Excellent study design and execution. The results are compelling and well-presented.",
      strengths: [
        "Rigorous clinical trial design",
        "Clear demonstration of safety",
        "Significant functional improvements",
      ],
      weaknesses: ["Small sample size", "Short follow-up period"],
      recommendation: "Accept",
    },
    {
      id: 2,
      reviewer: "Anonymous Reviewer 2",
      rating: 4,
      date: "2024-01-25",
      summary: "Important contribution to the field with promising results.",
      strengths: ["Novel therapeutic approach", "Comprehensive outcome measures"],
      weaknesses: ["Limited long-term data", "Need for larger cohort"],
      recommendation: "Accept with minor revisions",
    },
  ],
  discussions: [
    {
      id: 1,
      user: "Dr. James Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
      date: "2024-02-20",
      comment:
        "Fascinating results! Have you considered the potential for off-target effects in long-term follow-up studies?",
      replies: [
        {
          id: 1,
          user: "Dr. Sarah Chen",
          avatar: "/placeholder.svg?height=32&width=32",
          date: "2024-02-21",
          comment:
            "Thank you for the excellent question. We are conducting comprehensive genomic analysis to assess off-target effects and will report these findings in our upcoming long-term follow-up study.",
        },
      ],
    },
    {
      id: 2,
      user: "Dr. Maria Garcia",
      avatar: "/placeholder.svg?height=32&width=32",
      date: "2024-02-18",
      comment:
        "The functional improvements are impressive. What was the mechanism of delivery for the CRISPR components?",
      replies: [],
    },
  ],
  relatedPublications: [
    {
      id: 2,
      title: "Long-term Safety of CRISPR Gene Editing in Muscular Dystrophy",
      authors: ["Dr. Sarah Chen", "Dr. Michael Rodriguez"],
      journal: "Cell Therapy",
      year: "2023",
      citations: 23,
    },
    {
      id: 3,
      title: "Advances in Gene Therapy for Neuromuscular Disorders",
      authors: ["Dr. Emily Watson", "Dr. James Liu"],
      journal: "Nature Reviews Neurology",
      year: "2023",
      citations: 67,
    },
  ],
}

export default function PublicationDetail() {
  const [activeTab, setActiveTab] = useState("abstract")
  const [liked, setLiked] = useState(false)
  const [newComment, setNewComment] = useState("")

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      // Handle comment submission
      console.log("New comment:", newComment)
      setNewComment("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-dark-50">
      <ParticleBackground />

      <div className="container mx-auto px-4 py-8 pt-24">
        <motion.div className="max-w-7xl mx-auto" initial="initial" animate="animate" variants={staggerContainer}>
          {/* Back Button */}
          <motion.div className="mb-6" variants={fadeInUp}>
            <Link href="/publications" className="inline-flex items-center text-accent-400 hover:text-accent-300">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Publications
            </Link>
          </motion.div>

          {/* Publication Header */}
          <motion.div className="mb-8" variants={fadeInUp}>
            <Card className="bg-dark-800/50 border-dark-700">
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-4">
                  {publication.featured && (
                    <Badge className="bg-warning/20 text-warning border-warning/30">Featured</Badge>
                  )}
                  {publication.trending && (
                    <Badge className="bg-success/20 text-success border-success/30">Trending</Badge>
                  )}
                  {publication.openAccess && (
                    <Badge className="bg-accent-500/20 text-accent-400 border-accent-500/30">Open Access</Badge>
                  )}
                  {publication.peerReviewed && (
                    <Badge className="bg-primary-500/20 text-primary-400 border-primary-500/30">Peer Reviewed</Badge>
                  )}
                  <Badge className="bg-primary-600 text-white">{publication.type}</Badge>
                  <Badge className="bg-secondary-500/20 text-secondary-300 border-secondary-500/30">
                    {publication.category}
                  </Badge>
                </div>

                <CardTitle className="text-3xl md:text-4xl font-bold mb-4">{publication.title}</CardTitle>

                {/* Authors */}
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  {publication.authors.map((author, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={author.avatar || "/placeholder.svg"} alt={author.name} />
                        <AvatarFallback>
                          {author.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-primary-400 font-medium">{author.name}</p>
                        <p className="text-xs text-dark-400">{author.institution}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Publication Info */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-dark-400 mb-4">
                  <span className="text-accent-400 font-medium">{publication.journal}</span>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(publication.publishedDate).toLocaleDateString()}
                  </div>
                  <span>DOI: {publication.doi}</span>
                  {publication.clinicalTrialId && <span>Trial ID: {publication.clinicalTrialId}</span>}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-primary-600 hover:bg-primary-700 text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setLiked(!liked)}
                    className={`${
                      liked
                        ? "border-red-400 text-red-400 hover:bg-red-400/10"
                        : "border-accent-500 text-accent-400 hover:bg-accent-500/10"
                    } bg-transparent`}
                  >
                    <ThumbsUp className={`w-4 h-4 mr-2 ${liked ? "fill-current" : ""}`} />
                    {liked ? "Liked" : "Like"}
                  </Button>
                  <Button
                    variant="outline"
                    className="border-secondary-500 text-secondary-400 hover:bg-secondary-500/10 bg-transparent"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" className="border-dark-600 text-dark-400 hover:bg-dark-700 bg-transparent">
                    <Quote className="w-4 h-4 mr-2" />
                    Cite
                  </Button>
                </div>
              </CardHeader>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Tabs */}
              <motion.div variants={fadeInUp}>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-5 bg-dark-800 border-dark-700">
                    <TabsTrigger value="abstract" className="data-[state=active]:bg-primary-600">
                      Abstract
                    </TabsTrigger>
                    <TabsTrigger value="fulltext" className="data-[state=active]:bg-primary-600">
                      Full Text
                    </TabsTrigger>
                    <TabsTrigger value="reviews" className="data-[state=active]:bg-primary-600">
                      Reviews
                    </TabsTrigger>
                    <TabsTrigger value="discussion" className="data-[state=active]:bg-primary-600">
                      Discussion
                    </TabsTrigger>
                    <TabsTrigger value="references" className="data-[state=active]:bg-primary-600">
                      References
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="abstract" className="mt-6">
                    <Card className="bg-dark-800/50 border-dark-700">
                      <CardHeader>
                        <CardTitle className="text-xl text-dark-50">Abstract</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-dark-300 leading-relaxed">{publication.abstract}</p>

                        <div className="mt-6">
                          <h3 className="text-lg font-semibold mb-3 text-dark-50">Keywords</h3>
                          <div className="flex flex-wrap gap-2">
                            {publication.keywords.map((keyword, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="bg-accent-500/20 text-accent-300 border-accent-500/30"
                              >
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="mt-6">
                          <h3 className="text-lg font-semibold mb-3 text-dark-50">Tags</h3>
                          <div className="flex flex-wrap gap-2">
                            {publication.tags.map((tag, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="bg-secondary-500/20 text-secondary-300 border-secondary-500/30"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="fulltext" className="mt-6">
                    <Card className="bg-dark-800/50 border-dark-700">
                      <CardHeader>
                        <CardTitle className="text-xl text-dark-50">Full Text</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="prose prose-invert max-w-none">
                          <div
                            className="text-dark-300 leading-relaxed whitespace-pre-line"
                            dangerouslySetInnerHTML={{ __html: publication.fullText }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="reviews" className="mt-6">
                    <Card className="bg-dark-800/50 border-dark-700">
                      <CardHeader>
                        <CardTitle className="text-xl text-dark-50">Peer Reviews</CardTitle>
                        <CardDescription className="text-dark-400">
                          Expert reviews from the peer review process
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {publication.peerReviews.map((review) => (
                            <div key={review.id} className="border-b border-dark-700 pb-6 last:border-b-0">
                              <div className="flex items-center justify-between mb-3">
                                <h3 className="font-semibold text-dark-50">{review.reviewer}</h3>
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-4 h-4 ${
                                          i < review.rating ? "text-warning fill-current" : "text-dark-600"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm text-dark-400">{review.date}</span>
                                </div>
                              </div>
                              <p className="text-dark-300 mb-4">{review.summary}</p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h4 className="text-sm font-semibold text-success mb-2">Strengths</h4>
                                  <ul className="space-y-1">
                                    {review.strengths.map((strength, index) => (
                                      <li key={index} className="text-sm text-dark-400">
                                        • {strength}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="text-sm font-semibold text-warning mb-2">Areas for Improvement</h4>
                                  <ul className="space-y-1">
                                    {review.weaknesses.map((weakness, index) => (
                                      <li key={index} className="text-sm text-dark-400">
                                        • {weakness}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                              <div className="mt-3">
                                <Badge
                                  className={`text-xs ${
                                    review.recommendation === "Accept"
                                      ? "bg-success/20 text-success border-success/30"
                                      : "bg-warning/20 text-warning border-warning/30"
                                  }`}
                                >
                                  {review.recommendation}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="discussion" className="mt-6">
                    <Card className="bg-dark-800/50 border-dark-700">
                      <CardHeader>
                        <CardTitle className="text-xl text-dark-50">Discussion</CardTitle>
                        <CardDescription className="text-dark-400">Community discussion and comments</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {/* Add Comment */}
                        <div className="mb-6">
                          <Textarea
                            placeholder="Share your thoughts on this publication..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500 mb-3"
                            rows={3}
                          />
                          <Button
                            onClick={handleSubmitComment}
                            className="bg-primary-600 hover:bg-primary-700 text-white"
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Post Comment
                          </Button>
                        </div>

                        {/* Comments */}
                        <div className="space-y-6">
                          {publication.discussions.map((discussion) => (
                            <div key={discussion.id} className="border-b border-dark-700 pb-6 last:border-b-0">
                              <div className="flex items-start space-x-4">
                                <Avatar className="w-10 h-10">
                                  <AvatarImage src={discussion.avatar || "/placeholder.svg"} alt={discussion.user} />
                                  <AvatarFallback>
                                    {discussion.user
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-semibold text-dark-50">{discussion.user}</h3>
                                    <span className="text-sm text-dark-400">{discussion.date}</span>
                                  </div>
                                  <p className="text-dark-300 mb-3">{discussion.comment}</p>
                                  <div className="flex items-center gap-3">
                                    <Button variant="ghost" size="sm" className="text-dark-400 hover:text-accent-400">
                                      <ThumbsUp className="w-3 h-3 mr-1" />
                                      Like
                                    </Button>
                                    <Button variant="ghost" size="sm" className="text-dark-400 hover:text-accent-400">
                                      Reply
                                    </Button>
                                  </div>
                                  {/* Replies */}
                                  {discussion.replies.length > 0 && (
                                    <div className="mt-4 ml-6 space-y-4">
                                      {discussion.replies.map((reply) => (
                                        <div key={reply.id} className="flex items-start space-x-3">
                                          <Avatar className="w-8 h-8">
                                            <AvatarImage src={reply.avatar || "/placeholder.svg"} alt={reply.user} />
                                            <AvatarFallback>
                                              {reply.user
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                            </AvatarFallback>
                                          </Avatar>
                                          <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                              <h4 className="text-sm font-semibold text-dark-50">{reply.user}</h4>
                                              <span className="text-xs text-dark-400">{reply.date}</span>
                                            </div>
                                            <p className="text-sm text-dark-300">{reply.comment}</p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="references" className="mt-6">
                    <Card className="bg-dark-800/50 border-dark-700">
                      <CardHeader>
                        <CardTitle className="text-xl text-dark-50">References</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {publication.references.map((reference) => (
                            <div key={reference.id} className="border-b border-dark-700 pb-4 last:border-b-0">
                              <p className="text-dark-300 mb-2">
                                {reference.id}. {reference.citation}
                              </p>
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="bg-dark-700 text-dark-300 text-xs">
                                  DOI: {reference.doi}
                                </Badge>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-accent-400 hover:text-accent-300 hover:bg-accent-500/10"
                                >
                                  <ExternalLink className="w-3 h-3 mr-1" />
                                  View
                                </Button>
                              </div>
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
              {/* Publication Metrics */}
              <motion.div variants={fadeInUp}>
                <Card className="bg-dark-800/50 border-dark-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-dark-50">Publication Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-accent-400">{publication.stats.views}</div>
                        <div className="text-xs text-dark-400">Views</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-success">{publication.stats.downloads}</div>
                        <div className="text-xs text-dark-400">Downloads</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-secondary-400">{publication.stats.citations}</div>
                        <div className="text-xs text-dark-400">Citations</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-warning">{publication.stats.altmetric}</div>
                        <div className="text-xs text-dark-400">Altmetric</div>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Star className="w-4 h-4 text-warning fill-current" />
                        <span className="text-lg font-bold text-warning">{publication.stats.rating}</span>
                      </div>
                      <div className="text-xs text-dark-400">{publication.stats.reviews} peer reviews</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Publication Details */}
              <motion.div variants={fadeInUp}>
                <Card className="bg-dark-800/50 border-dark-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-dark-50">Publication Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <span className="text-sm text-dark-400">Status:</span>
                      <Badge className="ml-2 bg-success/20 text-success border-success/30">{publication.status}</Badge>
                    </div>
                    <div>
                      <span className="text-sm text-dark-400">Type:</span>
                      <span className="text-sm text-dark-300 ml-2">{publication.type}</span>
                    </div>
                    <div>
                      <span className="text-sm text-dark-400">Category:</span>
                      <span className="text-sm text-dark-300 ml-2">{publication.category}</span>
                    </div>
                    <div>
                      <span className="text-sm text-dark-400">Funding:</span>
                      <span className="text-sm text-dark-300 ml-2">{publication.fundingSource}</span>
                    </div>
                    <div>
                      <span className="text-sm text-dark-400">Ethics:</span>
                      <span className="text-sm text-dark-300 ml-2">{publication.ethicsApproval}</span>
                    </div>
                    <div>
                      <span className="text-sm text-dark-400">Data:</span>
                      <span className="text-sm text-dark-300 ml-2">{publication.dataAvailability}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Supplementary Materials */}
              <motion.div variants={fadeInUp}>
                <Card className="bg-dark-800/50 border-dark-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-dark-50">Supplementary Materials</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {publication.supplementaryMaterials.map((material, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-dark-700/30 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-dark-50">{material.name}</p>
                            <p className="text-xs text-dark-400">{material.description}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-accent-400 hover:text-accent-300 hover:bg-accent-500/10"
                          >
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Related Publications */}
              <motion.div variants={fadeInUp}>
                <Card className="bg-dark-800/50 border-dark-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-dark-50">Related Publications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {publication.relatedPublications.map((related) => (
                        <div key={related.id} className="border-b border-dark-700 pb-4 last:border-b-0">
                          <h3 className="text-sm font-semibold text-dark-50 mb-1 line-clamp-2">{related.title}</h3>
                          <p className="text-xs text-primary-400 mb-1">{related.authors.join(", ")}</p>
                          <div className="flex items-center justify-between text-xs text-dark-400">
                            <span>
                              {related.journal} • {related.year}
                            </span>
                            <span>{related.citations} citations</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Author Information */}
              <motion.div variants={fadeInUp}>
                <Card className="bg-dark-800/50 border-dark-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-dark-50">Authors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {publication.authors.map((author, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={author.avatar || "/placeholder.svg"} alt={author.name} />
                            <AvatarFallback>
                              {author.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-dark-50">{author.name}</p>
                            <p className="text-xs text-primary-400">{author.role}</p>
                            <p className="text-xs text-dark-400">{author.institution}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-accent-400 hover:text-accent-300 hover:bg-accent-500/10"
                          >
                            <Users className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
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
