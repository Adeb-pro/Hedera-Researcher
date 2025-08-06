"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Download, FileText, Star, Save, Send, Clock, MessageSquare, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
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

// Mock publication data
const publication = {
  id: 1,
  title: "CRISPR-Cas9 Gene Editing for Duchenne Muscular Dystrophy: A Phase I Clinical Trial",
  authors: [
    { name: "Dr. Sarah Chen", institution: "Stanford University", email: "s.chen@stanford.edu" },
    { name: "Dr. Michael Rodriguez", institution: "MIT", email: "m.rodriguez@mit.edu" },
    { name: "Dr. Emily Watson", institution: "UC Berkeley", email: "e.watson@berkeley.edu" },
  ],
  abstract:
    "This study presents the first Phase I clinical trial results for CRISPR-Cas9 gene editing therapy in patients with Duchenne Muscular Dystrophy (DMD). We demonstrate significant improvements in muscle function and dystrophin expression with minimal adverse effects. The trial enrolled 12 patients aged 8-16 years with confirmed DMD diagnosis. Primary endpoints included safety assessment and dystrophin expression levels. Secondary endpoints evaluated muscle function improvements and quality of life measures. Results showed a 65% increase in dystrophin expression and significant improvements in 6-minute walk test scores with no serious adverse events reported.",
  journal: "Nature Medicine",
  category: "Medicine & Health Sciences",
  submittedDate: "2024-02-01",
  assignedDate: "2024-02-20",
  dueDate: "2024-03-20",
  keywords: ["CRISPR", "Gene Therapy", "Clinical Trial", "Muscular Dystrophy", "Biotechnology"],
  fundingSource: "NIH Grant R01-HD089458",
  ethicsApproval: "Stanford IRB Protocol #54321",
  clinicalTrialId: "NCT04567890",
  manuscriptFile: "manuscript.pdf",
  supplementaryFiles: ["supplementary_data.xlsx", "figures.pdf", "methods.pdf"],
  wordCount: 8450,
  figureCount: 6,
  tableCount: 3,
  referenceCount: 45,
}

const reviewCriteria = [
  {
    id: "novelty",
    name: "Novelty and Significance",
    description: "How novel and significant is the research contribution?",
    weight: 25,
  },
  {
    id: "methodology",
    name: "Methodology and Design",
    description: "Are the methods appropriate and well-designed?",
    weight: 25,
  },
  {
    id: "results",
    name: "Results and Analysis",
    description: "Are the results clearly presented and properly analyzed?",
    weight: 20,
  },
  {
    id: "writing",
    name: "Writing and Presentation",
    description: "Is the manuscript well-written and clearly presented?",
    weight: 15,
  },
  {
    id: "ethics",
    name: "Ethics and Reproducibility",
    description: "Are ethical standards met and is the work reproducible?",
    weight: 15,
  },
]

export default function ReviewInterface() {
  const [activeTab, setActiveTab] = useState("manuscript")
  const [reviewData, setReviewData] = useState({
    overallRating: [4],
    recommendation: "",
    strengths: "",
    weaknesses: "",
    majorConcerns: "",
    minorConcerns: "",
    confidentialComments: "",
    publicComments: "",
    criteriaRatings: {} as Record<string, number[]>,
    timeSpent: 0,
    completed: false,
  })
  const [comments, setComments] = useState<Array<{
    id: number;
    text: string;
    timestamp: string;
    type: string;
  }>>([])
  const [newComment, setNewComment] = useState("")

  const handleCriteriaRating = (criteriaId: string, rating: number[]) => {
    setReviewData((prev) => ({
      ...prev,
      criteriaRatings: { ...prev.criteriaRatings, [criteriaId]: rating },
    }))
  }

  const handleInputChange = (field: string, value: any) => {
    setReviewData((prev) => ({ ...prev, [field]: value }))
  }

  const addComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        text: newComment,
        timestamp: new Date().toISOString(),
        type: "reviewer_note",
      }
      setComments((prev) => [...prev, comment])
      setNewComment("")
    }
  }

  const saveReview = () => {
    console.log("Saving review:", reviewData)
    // Handle save logic
  }

  const submitReview = () => {
    console.log("Submitting review:", reviewData)
    // Handle submit logic
  }

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case "accept":
        return "bg-success/20 text-success border-success/30"
      case "minor_revisions":
        return "bg-warning/20 text-warning border-warning/30"
      case "major_revisions":
        return "bg-error/20 text-error border-error/30"
      case "reject":
        return "bg-error/20 text-error border-error/30"
      default:
        return "bg-dark-700 text-dark-400 border-dark-600"
    }
  }

  const calculateProgress = () => {
    const totalFields = 8 // Number of required fields
    let completedFields = 0

    if (reviewData.overallRating[0] > 0) completedFields++
    if (reviewData.recommendation) completedFields++
    if (reviewData.strengths) completedFields++
    if (reviewData.weaknesses) completedFields++
    if (reviewData.majorConcerns) completedFields++
    if (reviewData.publicComments) completedFields++
    if (Object.keys(reviewData.criteriaRatings).length >= 3) completedFields++
    if (reviewData.timeSpent > 0) completedFields++

    return Math.round((completedFields / totalFields) * 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-dark-50">
      <ParticleBackground />

      <div className="container mx-auto px-4 py-8 pt-24">
        <motion.div className="max-w-7xl mx-auto" initial="initial" animate="animate" variants={staggerContainer}>
          {/* Header */}
          <motion.div className="mb-8" variants={fadeInUp}>
            <Link
              href="/publications/review"
              className="inline-flex items-center text-accent-400 hover:text-accent-300 mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Review Dashboard
            </Link>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2 line-clamp-2">{publication.title}</h1>
                <div className="flex items-center gap-4 text-sm text-dark-400 mb-4">
                  <span className="text-accent-400 font-medium">{publication.journal}</span>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    Due: {new Date(publication.dueDate).toLocaleDateString()}
                  </div>
                  <Badge className="bg-secondary-500/20 text-secondary-300 border-secondary-500/30">
                    {publication.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm text-dark-400">Authors:</span>
                  <span className="text-sm text-primary-400">
                    {publication.authors.map((author) => author.name).join(", ")}
                  </span>
                </div>
              </div>

              <div className="lg:w-80 space-y-4">
                <Card className="bg-dark-800/50 border-dark-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-dark-50">Review Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-dark-400">Completion</span>
                        <span className="text-primary-400">{calculateProgress()}%</span>
                      </div>
                      <div className="w-full bg-dark-700 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${calculateProgress()}%` }}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-center text-xs">
                        <div>
                          <div className="text-lg font-bold text-warning">{reviewData.timeSpent || 0}h</div>
                          <div className="text-dark-400">Time Spent</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-accent-400">
                            {Math.max(
                              0,
                              Math.ceil((new Date(publication.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
                            )}
                          </div>
                          <div className="text-dark-400">Days Left</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex flex-col gap-2">
                  <Button
                    onClick={saveReview}
                    variant="outline"
                    className="border-accent-500 text-accent-400 hover:bg-accent-500/10 bg-transparent"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Draft
                  </Button>
                  <Button
                    onClick={submitReview}
                    disabled={calculateProgress() < 80}
                    className="bg-success hover:bg-success/90 text-white disabled:opacity-50"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit Review
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div variants={fadeInUp}>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 bg-dark-800 border-dark-700 mb-8">
                <TabsTrigger value="manuscript" className="data-[state=active]:bg-primary-600">
                  Manuscript
                </TabsTrigger>
                <TabsTrigger value="review" className="data-[state=active]:bg-primary-600">
                  Review Form
                </TabsTrigger>
                <TabsTrigger value="criteria" className="data-[state=active]:bg-primary-600">
                  Criteria
                </TabsTrigger>
                <TabsTrigger value="comments" className="data-[state=active]:bg-primary-600">
                  Comments
                </TabsTrigger>
              </TabsList>

              {/* Manuscript Tab */}
              <TabsContent value="manuscript" className="space-y-6">
                <Card className="bg-dark-800/50 border-dark-700">
                  <CardHeader>
                    <CardTitle className="text-xl text-dark-50">Manuscript Details</CardTitle>
                    <CardDescription className="text-dark-400">
                      Review the manuscript details and download files for evaluation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-dark-50 mb-3">Abstract</h3>
                      <p className="text-dark-300 leading-relaxed">{publication.abstract}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-md font-semibold text-dark-50 mb-3">Publication Info</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-dark-400">Submitted:</span>
                            <span className="text-dark-300">
                              {new Date(publication.submittedDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-dark-400">Word Count:</span>
                            <span className="text-dark-300">{publication.wordCount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-dark-400">Figures:</span>
                            <span className="text-dark-300">{publication.figureCount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-dark-400">Tables:</span>
                            <span className="text-dark-300">{publication.tableCount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-dark-400">References:</span>
                            <span className="text-dark-300">{publication.referenceCount}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-md font-semibold text-dark-50 mb-3">Research Details</h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-dark-400">Funding:</span>
                            <p className="text-dark-300">{publication.fundingSource}</p>
                          </div>
                          <div>
                            <span className="text-dark-400">Ethics:</span>
                            <p className="text-dark-300">{publication.ethicsApproval}</p>
                          </div>
                          <div>
                            <span className="text-dark-400">Clinical Trial:</span>
                            <p className="text-dark-300">{publication.clinicalTrialId}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-md font-semibold text-dark-50 mb-3">Keywords</h4>
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

                    <div>
                      <h4 className="text-md font-semibold text-dark-50 mb-3">Files</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-dark-700/30 rounded-lg">
                          <div className="flex items-center">
                            <FileText className="w-5 h-5 text-primary-400 mr-3" />
                            <div>
                              <p className="font-medium text-dark-50">Main Manuscript</p>
                              <p className="text-sm text-dark-400">{publication.manuscriptFile}</p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-primary-500 text-primary-400 hover:bg-primary-500/10 bg-transparent"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>

                        {publication.supplementaryFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-dark-700/30 rounded-lg">
                            <div className="flex items-center">
                              <FileText className="w-5 h-5 text-accent-400 mr-3" />
                              <div>
                                <p className="font-medium text-dark-50">Supplementary File {index + 1}</p>
                                <p className="text-sm text-dark-400">{file}</p>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-accent-500 text-accent-400 hover:bg-accent-500/10 bg-transparent"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Review Form Tab */}
              <TabsContent value="review" className="space-y-6">
                <Card className="bg-dark-800/50 border-dark-700">
                  <CardHeader>
                    <CardTitle className="text-xl text-dark-50">Review Assessment</CardTitle>
                    <CardDescription className="text-dark-400">
                      Provide your overall assessment and recommendation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="text-dark-50 text-lg mb-4 block">Overall Rating</Label>
                      <div className="space-y-4">
                        <Slider
                          value={reviewData.overallRating}
                          onValueChange={(value) => handleInputChange("overallRating", value)}
                          max={5}
                          min={1}
                          step={0.5}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-dark-400">
                          <span>Poor (1)</span>
                          <span>Fair (2)</span>
                          <span>Good (3)</span>
                          <span>Very Good (4)</span>
                          <span>Excellent (5)</span>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Star className="w-5 h-5 text-warning fill-current" />
                            <span className="text-xl font-bold text-warning">{reviewData.overallRating[0]}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="recommendation" className="text-dark-50 text-lg mb-3 block">
                        Recommendation
                      </Label>
                      <Select
                        value={reviewData.recommendation}
                        onValueChange={(value) => handleInputChange("recommendation", value)}
                      >
                        <SelectTrigger className="bg-dark-700 border-dark-600 text-dark-50">
                          <SelectValue placeholder="Select your recommendation" />
                        </SelectTrigger>
                        <SelectContent className="bg-dark-700 border-dark-600">
                          <SelectItem value="accept" className="text-dark-50 focus:bg-dark-600">
                            Accept
                          </SelectItem>
                          <SelectItem value="minor_revisions" className="text-dark-50 focus:bg-dark-600">
                            Accept with Minor Revisions
                          </SelectItem>
                          <SelectItem value="major_revisions" className="text-dark-50 focus:bg-dark-600">
                            Major Revisions Required
                          </SelectItem>
                          <SelectItem value="reject" className="text-dark-50 focus:bg-dark-600">
                            Reject
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {reviewData.recommendation && (
                        <Badge className={`mt-2 ${getRecommendationColor(reviewData.recommendation)}`}>
                          {reviewData.recommendation === "accept" && "Accept"}
                          {reviewData.recommendation === "minor_revisions" && "Minor Revisions"}
                          {reviewData.recommendation === "major_revisions" && "Major Revisions"}
                          {reviewData.recommendation === "reject" && "Reject"}
                        </Badge>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="strengths" className="text-dark-50 text-lg mb-3 block">
                        Strengths
                      </Label>
                      <Textarea
                        id="strengths"
                        value={reviewData.strengths}
                        onChange={(e) => handleInputChange("strengths", e.target.value)}
                        placeholder="Describe the main strengths of this work..."
                        rows={4}
                        className="bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="weaknesses" className="text-dark-50 text-lg mb-3 block">
                        Weaknesses
                      </Label>
                      <Textarea
                        id="weaknesses"
                        value={reviewData.weaknesses}
                        onChange={(e) => handleInputChange("weaknesses", e.target.value)}
                        placeholder="Describe the main weaknesses or areas for improvement..."
                        rows={4}
                        className="bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="majorConcerns" className="text-dark-50 text-lg mb-3 block">
                        Major Concerns
                      </Label>
                      <Textarea
                        id="majorConcerns"
                        value={reviewData.majorConcerns}
                        onChange={(e) => handleInputChange("majorConcerns", e.target.value)}
                        placeholder="List any major concerns that need to be addressed..."
                        rows={4}
                        className="bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="minorConcerns" className="text-dark-50 text-lg mb-3 block">
                        Minor Concerns & Suggestions
                      </Label>
                      <Textarea
                        id="minorConcerns"
                        value={reviewData.minorConcerns}
                        onChange={(e) => handleInputChange("minorConcerns", e.target.value)}
                        placeholder="List minor concerns, suggestions for improvement, or editorial comments..."
                        rows={4}
                        className="bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="publicComments" className="text-dark-50 text-lg mb-3 block">
                        Comments to Authors
                      </Label>
                      <Textarea
                        id="publicComments"
                        value={reviewData.publicComments}
                        onChange={(e) => handleInputChange("publicComments", e.target.value)}
                        placeholder="Comments that will be shared with the authors..."
                        rows={6}
                        className="bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="confidentialComments" className="text-dark-50 text-lg mb-3 block">
                        Confidential Comments to Editor
                      </Label>
                      <Textarea
                        id="confidentialComments"
                        value={reviewData.confidentialComments}
                        onChange={(e) => handleInputChange("confidentialComments", e.target.value)}
                        placeholder="Confidential comments for the editor only..."
                        rows={4}
                        className="bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="timeSpent" className="text-dark-50 text-lg mb-3 block">
                        Time Spent (hours)
                      </Label>
                      <Input
                        id="timeSpent"
                        type="number"
                        value={reviewData.timeSpent}
                        onChange={(e) => handleInputChange("timeSpent", Number.parseFloat(e.target.value) || 0)}
                        placeholder="0"
                        min="0"
                        step="0.5"
                        className="bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Criteria Tab */}
              <TabsContent value="criteria" className="space-y-6">
                <Card className="bg-dark-800/50 border-dark-700">
                  <CardHeader>
                    <CardTitle className="text-xl text-dark-50">Detailed Evaluation Criteria</CardTitle>
                    <CardDescription className="text-dark-400">
                      Rate each aspect of the manuscript on a scale of 1-5
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {reviewCriteria.map((criteria) => (
                      <div key={criteria.id} className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-dark-50">{criteria.name}</h3>
                            <p className="text-sm text-dark-400">{criteria.description}</p>
                            <p className="text-xs text-accent-400 mt-1">Weight: {criteria.weight}%</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-warning fill-current" />
                              <span className="text-lg font-bold text-warning">
                                {reviewData.criteriaRatings[criteria.id]?.[0] || 0}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Slider
                            value={reviewData.criteriaRatings[criteria.id] || [3]}
                            onValueChange={(value) => handleCriteriaRating(criteria.id, value)}
                            max={5}
                            min={1}
                            step={0.5}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-dark-400">
                            <span>Poor (1)</span>
                            <span>Fair (2)</span>
                            <span>Good (3)</span>
                            <span>Very Good (4)</span>
                            <span>Excellent (5)</span>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="mt-8 p-4 bg-dark-700/30 rounded-lg">
                      <h3 className="text-lg font-semibold text-dark-50 mb-2">Weighted Average Score</h3>
                      <div className="flex items-center gap-2">
                        <Star className="w-6 h-6 text-warning fill-current" />
                        <span className="text-2xl font-bold text-warning">
                          {Object.keys(reviewData.criteriaRatings).length > 0
                            ? reviewCriteria
                                .reduce((sum, criteria) => {
                                  const rating = reviewData.criteriaRatings[criteria.id]?.[0] || 0
                                  return sum + rating * (criteria.weight / 100)
                                }, 0)
                                .toFixed(1)
                            : "0.0"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Comments Tab */}
              <TabsContent value="comments" className="space-y-6">
                <Card className="bg-dark-800/50 border-dark-700">
                  <CardHeader>
                    <CardTitle className="text-xl text-dark-50">Review Notes & Comments</CardTitle>
                    <CardDescription className="text-dark-400">
                      Add private notes and comments during your review process
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="newComment" className="text-dark-50 mb-3 block">
                        Add Note
                      </Label>
                      <div className="flex gap-3">
                        <Textarea
                          id="newComment"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Add a note or comment..."
                          rows={3}
                          className="flex-1 bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
                        />
                        <Button
                          onClick={addComment}
                          disabled={!newComment.trim()}
                          className="bg-primary-600 hover:bg-primary-700 text-white self-end"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-dark-50">Review Notes</h3>
                      {comments.length === 0 ? (
                        <div className="text-center py-8 text-dark-400">
                          <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>No notes added yet. Add notes as you review the manuscript.</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {comments.map((comment) => (
                            <div key={comment.id} className="p-4 bg-dark-700/30 rounded-lg">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <p className="text-dark-300">{comment.text}</p>
                                  <p className="text-xs text-dark-400 mt-2">
                                    {new Date(comment.timestamp).toLocaleString()}
                                  </p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setComments((prev) => prev.filter((c) => c.id !== comment.id))}
                                  className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
