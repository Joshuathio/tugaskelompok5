"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  CheckCircle,
  Clock,
  Brain,
  Code,
  Palette,
  PenTool,
  TrendingUp,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react"
import { Navigation } from "@/components/navigation"

type AssessmentStep = "intro" | "category" | "questions" | "practical" | "results"
type SkillCategory = "web-development" | "design" | "content" | "marketing"

interface Question {
  id: number
  type: "multiple-choice" | "practical" | "code"
  question: string
  options?: string[]
  correctAnswer?: number
  timeLimit?: number
}

const skillCategories = [
  {
    id: "web-development",
    name: "Web Development",
    icon: Code,
    description: "Frontend, Backend, Full-stack development",
    duration: "45 menit",
    questions: 25,
  },
  {
    id: "design",
    name: "UI/UX Design",
    icon: Palette,
    description: "User Interface, User Experience, Visual Design",
    duration: "40 menit",
    questions: 20,
  },
  {
    id: "content",
    name: "Content Writing",
    icon: PenTool,
    description: "Copywriting, Blog writing, Technical writing",
    duration: "35 menit",
    questions: 18,
  },
  {
    id: "marketing",
    name: "Digital Marketing",
    icon: TrendingUp,
    description: "SEO, Social Media, Content Marketing",
    duration: "30 menit",
    questions: 15,
  },
]

const sampleQuestions: Record<SkillCategory, Question[]> = {
  "web-development": [
    {
      id: 1,
      type: "multiple-choice",
      question: "Apa yang dimaksud dengan React Hooks?",
      options: [
        "Fungsi yang memungkinkan penggunaan state dalam functional components",
        "Library untuk styling React components",
        "Tool untuk debugging React applications",
        "Framework untuk building React apps",
      ],
      correctAnswer: 0,
      timeLimit: 60,
    },
    {
      id: 2,
      type: "code",
      question: "Tulis fungsi JavaScript untuk membalik string:",
      timeLimit: 300,
    },
    {
      id: 3,
      type: "multiple-choice",
      question: "Manakah yang bukan merupakan HTTP method?",
      options: ["GET", "POST", "FETCH", "DELETE"],
      correctAnswer: 2,
      timeLimit: 45,
    },
  ],
  design: [
    {
      id: 1,
      type: "multiple-choice",
      question: "Apa prinsip utama dalam User-Centered Design?",
      options: [
        "Fokus pada kebutuhan dan pengalaman pengguna",
        "Menggunakan warna yang menarik",
        "Membuat design yang kompleks",
        "Mengikuti trend terbaru",
      ],
      correctAnswer: 0,
      timeLimit: 60,
    },
  ],
  content: [
    {
      id: 1,
      type: "practical",
      question: 'Tulis artikel pendek (200 kata) tentang "Manfaat Teknologi AI dalam Kehidupan Sehari-hari"',
      timeLimit: 900,
    },
  ],
  marketing: [
    {
      id: 1,
      type: "multiple-choice",
      question: "Apa yang dimaksud dengan SEO?",
      options: [
        "Search Engine Optimization",
        "Social Engine Optimization",
        "Site Engine Operation",
        "Search Engine Operation",
      ],
      correctAnswer: 0,
      timeLimit: 45,
    },
  ],
}

export function SkillAssessment() {
  const [currentStep, setCurrentStep] = useState<AssessmentStep>("intro")
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, any>>({})
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [assessmentResults, setAssessmentResults] = useState<any>(null)

  const currentQuestions = selectedCategory ? sampleQuestions[selectedCategory] : []
  const currentQuestion = currentQuestions[currentQuestionIndex]
  const progress = currentQuestions.length > 0 ? ((currentQuestionIndex + 1) / currentQuestions.length) * 100 : 0

  const handleCategorySelect = (category: SkillCategory) => {
    setSelectedCategory(category)
    setCurrentStep("questions")
    setCurrentQuestionIndex(0)
    setAnswers({})
  }

  const handleAnswerSelect = (answer: any) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }))
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      // Simulate AI assessment results
      const mockResults = {
        category: selectedCategory,
        score: Math.floor(Math.random() * 30) + 70, // 70-100
        level: "Intermediate",
        strengths: ["Problem Solving", "Technical Knowledge", "Best Practices"],
        improvements: ["Performance Optimization", "Advanced Patterns"],
        recommendations: [
          'Ikuti course "Advanced React Patterns"',
          "Praktik dengan project real-world",
          "Pelajari testing frameworks",
        ],
      }
      setAssessmentResults(mockResults)
      setCurrentStep("results")
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const renderIntro = () => (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Brain className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">AI Skill Assessment</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Evaluasi kemampuan Anda dengan teknologi AI untuk mendapatkan rekomendasi proyek yang tepat dan jalur
            pengembangan skill yang personal.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">AI-Powered</h3>
              <p className="text-sm text-muted-foreground">Penilaian otomatis dengan teknologi machine learning</p>
            </Card>

            <Card className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Efisien</h3>
              <p className="text-sm text-muted-foreground">Selesai dalam 30-45 menit dengan hasil akurat</p>
            </Card>

            <Card className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Komprehensif</h3>
              <p className="text-sm text-muted-foreground">Evaluasi menyeluruh dengan rekomendasi personal</p>
            </Card>
          </div>

          <Button size="lg" onClick={() => setCurrentStep("category")}>
            Mulai Assessment
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )

  const renderCategorySelection = () => (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Pilih Kategori Skill</h1>
            <p className="text-muted-foreground">Pilih area keahlian yang ingin Anda evaluasi</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {skillCategories.map((category) => {
              const Icon = category.icon
              return (
                <Card
                  key={category.id}
                  className="p-6 cursor-pointer hover:shadow-lg transition-all hover:border-primary/50"
                  onClick={() => handleCategorySelect(category.id as SkillCategory)}
                >
                  <CardContent className="p-0">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                        <p className="text-muted-foreground mb-4">{category.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {category.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Brain className="w-4 h-4" />
                            {category.questions} pertanyaan
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )

  const renderQuestions = () => (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">
                {skillCategories.find((c) => c.id === selectedCategory)?.name} Assessment
              </h1>
              <Badge variant="secondary">
                {currentQuestionIndex + 1} dari {currentQuestions.length}
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Pertanyaan {currentQuestionIndex + 1}</CardTitle>
                {currentQuestion?.timeLimit && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>
                      {Math.floor(currentQuestion.timeLimit / 60)}:
                      {(currentQuestion.timeLimit % 60).toString().padStart(2, "0")}
                    </span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg">{currentQuestion?.question}</p>

              {currentQuestion?.type === "multiple-choice" && currentQuestion.options && (
                <RadioGroup
                  value={answers[currentQuestion.id]?.toString() || ""}
                  onValueChange={(value) => handleAnswerSelect(Number.parseInt(value))}
                >
                  {currentQuestion.options.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-accent"
                    >
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {currentQuestion?.type === "code" && (
                <div className="space-y-4">
                  <Textarea
                    placeholder="Tulis kode Anda di sini..."
                    className="min-h-[200px] font-mono"
                    value={answers[currentQuestion.id] || ""}
                    onChange={(e) => handleAnswerSelect(e.target.value)}
                  />
                </div>
              )}

              {currentQuestion?.type === "practical" && (
                <div className="space-y-4">
                  <Textarea
                    placeholder="Tulis jawaban Anda di sini..."
                    className="min-h-[300px]"
                    value={answers[currentQuestion.id] || ""}
                    onChange={(e) => handleAnswerSelect(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Minimum 200 kata. Fokus pada struktur, kejelasan, dan relevansi konten.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Sebelumnya
            </Button>

            <Button onClick={handleNextQuestion} disabled={!answers[currentQuestion?.id]}>
              {currentQuestionIndex === currentQuestions.length - 1 ? "Selesai" : "Selanjutnya"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderResults = () => (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Assessment Selesai!</h1>
            <p className="text-muted-foreground">Berikut hasil evaluasi AI untuk skill Anda</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Score Card */}
            <Card className="lg:col-span-1">
              <CardHeader className="text-center">
                <CardTitle>Skor Anda</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{assessmentResults?.score}</div>
                <p className="text-muted-foreground mb-4">dari 100</p>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  {assessmentResults?.level}
                </Badge>
              </CardContent>
            </Card>

            {/* Detailed Results */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    Kekuatan Anda
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {assessmentResults?.strengths.map((strength: string, index: number) => (
                      <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                        {strength}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-blue-500" />
                    Area Pengembangan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {assessmentResults?.improvements.map((improvement: string, index: number) => (
                      <Badge key={index} variant="outline" className="border-blue-200 text-blue-700">
                        {improvement}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    Rekomendasi AI
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {assessmentResults?.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-12">
            <Button size="lg">
              Lihat Proyek Rekomendasi
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline">
              Mulai Learning Module
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  switch (currentStep) {
    case "intro":
      return renderIntro()
    case "category":
      return renderCategorySelection()
    case "questions":
      return renderQuestions()
    case "results":
      return renderResults()
    default:
      return renderIntro()
  }
}
