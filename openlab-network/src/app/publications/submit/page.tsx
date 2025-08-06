"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Upload, Plus, X, Check, FileText, Users, Settings, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
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
  "Research Article",
  "Review Paper",
  "Case Study",
  "Technical Report",
  "Conference Paper",
  "Preprint",
  "Dataset",
  "Protocol",
]

const steps = [
  { id: 1, name: "Manuscript Details", icon: FileText },
  { id: 2, name: "Authors & Contributors", icon: Users },
  { id: 3, name: "Files & Supplementary", icon: Upload },
  { id: 4, name: "Ethics & Compliance", icon: Settings },
  { id: 5, name: "Review & Submit", icon: Send },
]

export default function SubmitPublicationPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    abstract: "",
    keywords: [] as string[],
    category: "",
    type: "",
    journal: "",
    fundingSource: "",
    ethicsApproval: "",
    clinicalTrialId: "",
    dataAvailability: "",
    conflictOfInterest: "",
    openAccess: false,
    authors: [
      {
        name: "",
        email: "",
        institution: "",
        orcid: "",
        role: "Principal Investigator",
        corresponding: true,
      },
    ],
    files: {
      manuscript: null as File | null,
      supplementary: [] as File[],
    },
    agreements: {
      terms: false,
      ethics: false,
      originality: false,
      copyright: false,
    },
  })

  const [newKeyword, setNewKeyword] = useState("")

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAuthorChange = (index: number, field: string, value: any) => {
    const updatedAuthors = [...formData.authors]
    updatedAuthors[index] = { ...updatedAuthors[index], [field]: value }
    setFormData((prev) => ({
      ...prev,
      authors: updatedAuthors,
    }))
  }

  const addAuthor = () => {
    setFormData((prev) => ({
      ...prev,
      authors: [
        ...prev.authors,
        {
          name: "",
          email: "",
          institution: "",
          orcid: "",
          role: "Co-Investigator",
          corresponding: false,
        },
      ],
    }))
  }

  const removeAuthor = (index: number) => {
    if (formData.authors.length > 1) {
      const updatedAuthors = formData.authors.filter((_, i) => i !== index)
      setFormData((prev) => ({
        ...prev,
        authors: updatedAuthors,
      }))
    }
  }

  const addKeyword = () => {
    if (newKeyword.trim() && !formData.keywords.includes(newKeyword.trim())) {
      setFormData((prev) => ({
        ...prev,
        keywords: [...prev.keywords, newKeyword.trim()],
      }))
      setNewKeyword("")
    }
  }

  const removeKeyword = (keyword: string) => {
    setFormData((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((k) => k !== keyword),
    }))
  }

  const handleFileUpload = (type: string, file: File) => {
    if (type === "manuscript") {
      setFormData((prev) => ({
        ...prev,
        files: { ...prev.files, manuscript: file },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        files: {
          ...prev.files,
          supplementary: [...prev.files.supplementary, file],
        },
      }))
    }
  }

  const handleAgreementChange = (field: string, checked: boolean | string) => {
    setFormData((prev) => ({
      ...prev,
      agreements: { ...prev.agreements, [field]: !!checked },
    }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log("Submitting publication:", formData)
    // Handle submission logic here
  }

  const isStepComplete = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return formData.title && formData.abstract && formData.category && formData.type
      case 2:
        return formData.authors.every((author) => author.name && author.email && author.institution)
      case 3:
        return formData.files.manuscript
      case 4:
        return formData.ethicsApproval && formData.dataAvailability && formData.conflictOfInterest
      case 5:
        return Object.values(formData.agreements).every((agreement) => agreement)
      default:
        return false
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="title" className="text-dark-50">
                Publication Title *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter the title of your publication"
                className="mt-2 bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
              />
            </div>

            <div>
              <Label htmlFor="abstract" className="text-dark-50">
                Abstract *
              </Label>
              <Textarea
                id="abstract"
                value={formData.abstract}
                onChange={(e) => handleInputChange("abstract", e.target.value)}
                placeholder="Provide a comprehensive abstract of your research"
                rows={8}
                className="mt-2 bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
              />
              <p className="text-sm text-dark-400 mt-1">{formData.abstract.length}/3000 characters</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="category" className="text-dark-50">
                  Research Category *
                </Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger className="mt-2 bg-dark-700 border-dark-600 text-dark-50">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-700 border-dark-600">
                    {categories.map((category) => (
                      <SelectItem key={category} value={category} className="text-dark-50 focus:bg-dark-600">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="type" className="text-dark-50">
                  Publication Type *
                </Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                  <SelectTrigger className="mt-2 bg-dark-700 border-dark-600 text-dark-50">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-700 border-dark-600">
                    {publicationTypes.map((type) => (
                      <SelectItem key={type} value={type} className="text-dark-50 focus:bg-dark-600">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="journal" className="text-dark-50">
                Target Journal (Optional)
              </Label>
              <Input
                id="journal"
                value={formData.journal}
                onChange={(e) => handleInputChange("journal", e.target.value)}
                placeholder="e.g., Nature, Science, Cell"
                className="mt-2 bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
              />
            </div>

            <div>
              <Label className="text-dark-50">Keywords</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  placeholder="Add keyword"
                  className="bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addKeyword())}
                />
                <Button type="button" onClick={addKeyword} className="bg-primary-600 hover:bg-primary-700 text-white">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.keywords.map((keyword, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-accent-500/20 text-accent-300 border-accent-500/30 pr-1"
                  >
                    {keyword}
                    <button
                      onClick={() => removeKeyword(keyword)}
                      className="ml-2 hover:text-red-400 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="funding" className="text-dark-50">
                Funding Source
              </Label>
              <Input
                id="funding"
                value={formData.fundingSource}
                onChange={(e) => handleInputChange("fundingSource", e.target.value)}
                placeholder="e.g., NIH Grant R01-HD089458"
                className="mt-2 bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="openAccess"
                checked={formData.openAccess}
                onCheckedChange={(checked) => handleInputChange("openAccess", checked)}
                className="border-dark-600 data-[state=checked]:bg-primary-600 data-[state=checked]:border-primary-600"
              />
              <Label htmlFor="openAccess" className="text-dark-50">
                Make this publication open access
              </Label>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-dark-50">Authors & Contributors</h3>
              <Button type="button" onClick={addAuthor} className="bg-primary-600 hover:bg-primary-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Author
              </Button>
            </div>

            <div className="space-y-6">
              {formData.authors.map((author, index) => (
                <Card key={index} className="bg-dark-800/50 border-dark-700">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-dark-50">Author {index + 1}</CardTitle>
                      {formData.authors.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAuthor(index)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-dark-50">Full Name *</Label>
                        <Input
                          value={author.name}
                          onChange={(e) => handleAuthorChange(index, "name", e.target.value)}
                          placeholder="Dr. Jane Smith"
                          className="mt-2 bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
                        />
                      </div>
                      <div>
                        <Label className="text-dark-50">Email Address *</Label>
                        <Input
                          type="email"
                          value={author.email}
                          onChange={(e) => handleAuthorChange(index, "email", e.target.value)}
                          placeholder="jane.smith@university.edu"
                          className="mt-2 bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-dark-50">Institution/Affiliation *</Label>
                      <Input
                        value={author.institution}
                        onChange={(e) => handleAuthorChange(index, "institution", e.target.value)}
                        placeholder="Stanford University School of Medicine"
                        className="mt-2 bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-dark-50">ORCID ID</Label>
                        <Input
                          value={author.orcid}
                          onChange={(e) => handleAuthorChange(index, "orcid", e.target.value)}
                          placeholder="0000-0000-0000-0000"
                          className="mt-2 bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
                        />
                      </div>
                      <div>
                        <Label className="text-dark-50">Role</Label>
                        <Select value={author.role} onValueChange={(value) => handleAuthorChange(index, "role", value)}>
                          <SelectTrigger className="mt-2 bg-dark-700 border-dark-600 text-dark-50">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-dark-700 border-dark-600">
                            <SelectItem value="Principal Investigator" className="text-dark-50 focus:bg-dark-600">
                              Principal Investigator
                            </SelectItem>
                            <SelectItem value="Co-Investigator" className="text-dark-50 focus:bg-dark-600">
                              Co-Investigator
                            </SelectItem>
                            <SelectItem value="Research Scientist" className="text-dark-50 focus:bg-dark-600">
                              Research Scientist
                            </SelectItem>
                            <SelectItem value="Graduate Student" className="text-dark-50 focus:bg-dark-600">
                              Graduate Student
                            </SelectItem>
                            <SelectItem value="Postdoctoral Fellow" className="text-dark-50 focus:bg-dark-600">
                              Postdoctoral Fellow
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`corresponding-${index}`}
                        checked={author.corresponding}
                        onCheckedChange={(checked) => handleAuthorChange(index, "corresponding", checked)}
                        className="border-dark-600 data-[state=checked]:bg-primary-600 data-[state=checked]:border-primary-600"
                      />
                      <Label htmlFor={`corresponding-${index}`} className="text-dark-50">
                        Corresponding author
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-dark-50 mb-4">Manuscript File</h3>
              <Card className="bg-dark-800/50 border-dark-700">
                <CardContent className="p-6">
                  <div className="border-2 border-dashed border-dark-600 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-dark-400 mx-auto mb-4" />
                    <p className="text-dark-300 mb-2">Upload your manuscript file</p>
                    <p className="text-sm text-dark-400 mb-4">Supported formats: PDF, DOC, DOCX (Max 50MB)</p>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload("manuscript", e.target.files[0])}
                      className="hidden"
                      id="manuscript-upload"
                    />
                    <Label
                      htmlFor="manuscript-upload"
                      className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md cursor-pointer transition-colors"
                    >
                      Choose File
                    </Label>
                  </div>
                  {formData.files.manuscript && (
                    <div className="mt-4 p-3 bg-dark-700/30 rounded-lg flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-primary-400 mr-2" />
                        <span className="text-dark-50">{formData.files.manuscript.name}</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleInputChange("files", { ...formData.files, manuscript: null })}
                        className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-dark-50 mb-4">Supplementary Materials (Optional)</h3>
              <Card className="bg-dark-800/50 border-dark-700">
                <CardContent className="p-6">
                  <div className="border-2 border-dashed border-dark-600 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-dark-400 mx-auto mb-4" />
                    <p className="text-dark-300 mb-2">Upload supplementary files</p>
                    <p className="text-sm text-dark-400 mb-4">
                      Figures, tables, datasets, videos, etc. (Max 100MB per file)
                    </p>
                    <input
                      type="file"
                      multiple
                      onChange={(e) => {
                        if (e.target.files) {
                          Array.from(e.target.files).forEach((file) => handleFileUpload("supplementary", file))
                        }
                      }}
                      className="hidden"
                      id="supplementary-upload"
                    />
                    <Label
                      htmlFor="supplementary-upload"
                      className="inline-flex items-center px-4 py-2 bg-accent-600 hover:bg-accent-700 text-white rounded-md cursor-pointer transition-colors"
                    >
                      Add Files
                    </Label>
                  </div>
                  {formData.files.supplementary.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {formData.files.supplementary.map((file, index) => (
                        <div key={index} className="p-3 bg-dark-700/30 rounded-lg flex items-center justify-between">
                          <div className="flex items-center">
                            <FileText className="w-5 h-5 text-accent-400 mr-2" />
                            <span className="text-dark-50">{file.name}</span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const updatedFiles = formData.files.supplementary.filter((_, i) => i !== index)
                              handleInputChange("files", { ...formData.files, supplementary: updatedFiles })
                            }}
                            className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="ethics" className="text-dark-50">
                Ethics Approval *
              </Label>
              <Textarea
                id="ethics"
                value={formData.ethicsApproval}
                onChange={(e) => handleInputChange("ethicsApproval", e.target.value)}
                placeholder="Provide details about ethics approval, IRB protocol number, or explain why ethics approval is not applicable"
                rows={4}
                className="mt-2 bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
              />
            </div>

            <div>
              <Label htmlFor="clinical-trial" className="text-dark-50">
                Clinical Trial Registration (if applicable)
              </Label>
              <Input
                id="clinical-trial"
                value={formData.clinicalTrialId}
                onChange={(e) => handleInputChange("clinicalTrialId", e.target.value)}
                placeholder="e.g., NCT04567890"
                className="mt-2 bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
              />
            </div>

            <div>
              <Label htmlFor="data-availability" className="text-dark-50">
                Data Availability Statement *
              </Label>
              <Textarea
                id="data-availability"
                value={formData.dataAvailability}
                onChange={(e) => handleInputChange("dataAvailability", e.target.value)}
                placeholder="Describe how readers can access the data supporting the conclusions of this article"
                rows={4}
                className="mt-2 bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
              />
            </div>

            <div>
              <Label htmlFor="conflict" className="text-dark-50">
                Conflict of Interest Declaration *
              </Label>
              <Textarea
                id="conflict"
                value={formData.conflictOfInterest}
                onChange={(e) => handleInputChange("conflictOfInterest", e.target.value)}
                placeholder="Declare any potential conflicts of interest or state 'The authors declare no competing interests'"
                rows={4}
                className="mt-2 bg-dark-700 border-dark-600 text-dark-50 placeholder:text-dark-400 focus:border-primary-500"
              />
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-dark-50 mb-4">Review Your Submission</h3>
              <Card className="bg-dark-800/50 border-dark-700">
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h4 className="font-medium text-dark-50 mb-2">Publication Details</h4>
                    <p className="text-sm text-dark-300">
                      <strong>Title:</strong> {formData.title}
                    </p>
                    <p className="text-sm text-dark-300">
                      <strong>Category:</strong> {formData.category}
                    </p>
                    <p className="text-sm text-dark-300">
                      <strong>Type:</strong> {formData.type}
                    </p>
                    <p className="text-sm text-dark-300">
                      <strong>Keywords:</strong> {formData.keywords.join(", ")}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-dark-50 mb-2">Authors</h4>
                    {formData.authors.map((author, index) => (
                      <p key={index} className="text-sm text-dark-300">
                        {author.name} ({author.institution}) - {author.role}
                        {author.corresponding && " (Corresponding)"}
                      </p>
                    ))}
                  </div>
                  <div>
                    <h4 className="font-medium text-dark-50 mb-2">Files</h4>
                    <p className="text-sm text-dark-300">
                      <strong>Manuscript:</strong> {formData.files.manuscript?.name || "Not uploaded"}
                    </p>
                    <p className="text-sm text-dark-300">
                      <strong>Supplementary:</strong> {formData.files.supplementary.length} files
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-dark-50 mb-4">Terms and Agreements</h3>
              <Card className="bg-dark-800/50 border-dark-700">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      checked={formData.agreements.terms}
                      onCheckedChange={(checked) => handleAgreementChange("terms", checked)}
                      className="border-dark-600 data-[state=checked]:bg-primary-600 data-[state=checked]:border-primary-600 mt-1"
                    />
                    <Label htmlFor="terms" className="text-dark-50 leading-relaxed">
                      I agree to the OpenLab Network Terms of Service and Publication Guidelines
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="ethics-agreement"
                      checked={formData.agreements.ethics}
                      onCheckedChange={(checked) => handleAgreementChange("ethics", checked)}
                      className="border-dark-600 data-[state=checked]:bg-primary-600 data-[state=checked]:border-primary-600 mt-1"
                    />
                    <Label htmlFor="ethics-agreement" className="text-dark-50 leading-relaxed">
                      I confirm that this research was conducted in accordance with ethical standards and all necessary
                      approvals were obtained
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="originality"
                      checked={formData.agreements.originality}
                      onCheckedChange={(checked) => handleAgreementChange("originality", checked)}
                      className="border-dark-600 data-[state=checked]:bg-primary-600 data-[state=checked]:border-primary-600 mt-1"
                    />
                    <Label htmlFor="originality" className="text-dark-50 leading-relaxed">
                      I certify that this work is original and has not been published elsewhere
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="copyright"
                      checked={formData.agreements.copyright}
                      onCheckedChange={(checked) => handleAgreementChange("copyright", checked)}
                      className="border-dark-600 data-[state=checked]:bg-primary-600 data-[state=checked]:border-primary-600 mt-1"
                    />
                    <Label htmlFor="copyright" className="text-dark-50 leading-relaxed">
                      I understand the copyright and licensing terms for this publication
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-dark-50">
      <ParticleBackground />

      <div className="container mx-auto px-4 py-8 pt-24">
        <motion.div className="max-w-4xl mx-auto" initial="initial" animate="animate" variants={staggerContainer}>
          {/* Back Button */}
          <motion.div className="mb-6" variants={fadeInUp}>
            <Link href="/publications" className="inline-flex items-center text-accent-400 hover:text-accent-300">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Publications
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div className="mb-8" variants={fadeInUp}>
            <h1 className="text-4xl font-bold mb-2">Submit Publication</h1>
            <p className="text-dark-400 text-lg">Share your research with the global scientific community</p>
          </motion.div>

          {/* Progress Steps */}
          <motion.div className="mb-8" variants={fadeInUp}>
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon
                const isActive = currentStep === step.id
                const isCompleted = currentStep > step.id || isStepComplete(step.id)

                return (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                        isCompleted
                          ? "bg-success border-success text-white"
                          : isActive
                            ? "bg-primary-600 border-primary-600 text-white"
                            : "border-dark-600 text-dark-400"
                      }`}
                    >
                      {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <div className="ml-3 hidden md:block">
                      <p
                        className={`text-sm font-medium ${
                          isActive ? "text-primary-400" : isCompleted ? "text-success" : "text-dark-400"
                        }`}
                      >
                        {step.name}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-12 h-0.5 mx-4 ${
                          currentStep > step.id ? "bg-success" : "bg-dark-600"
                        } hidden md:block`}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Form Content */}
          <motion.div variants={fadeInUp}>
            <Card className="bg-dark-800/50 border-dark-700">
              <CardHeader>
                <CardTitle className="text-2xl text-dark-50">
                  {steps.find((step) => step.id === currentStep)?.name}
                </CardTitle>
                <CardDescription className="text-dark-400">
                  {currentStep === 1 && "Provide basic information about your publication"}
                  {currentStep === 2 && "Add all authors and contributors to this research"}
                  {currentStep === 3 && "Upload your manuscript and supplementary materials"}
                  {currentStep === 4 && "Provide ethics and compliance information"}
                  {currentStep === 5 && "Review your submission and agree to terms"}
                </CardDescription>
              </CardHeader>
              <CardContent>{renderStepContent()}</CardContent>
            </Card>
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div className="mt-8 flex justify-between" variants={fadeInUp}>
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="border-dark-600 text-dark-400 hover:bg-dark-700 bg-transparent disabled:opacity-50"
            >
              Previous
            </Button>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="border-dark-600 text-dark-400 hover:bg-dark-700 bg-transparent"
              >
                Save Draft
              </Button>
              {currentStep < steps.length ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepComplete(currentStep)}
                  className="bg-primary-600 hover:bg-primary-700 text-white disabled:opacity-50"
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!isStepComplete(currentStep)}
                  className="bg-success hover:bg-success/90 text-white disabled:opacity-50"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Publication
                </Button>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
